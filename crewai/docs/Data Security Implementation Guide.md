# Data Security Implementation Guide

## 1. Data in Transit Security

### API Communication Security
```python
# In your FastAPI application (api.py)
from fastapi import FastAPI, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from starlette.config import Config
from starlette.datastructures import Secret

app = FastAPI()

# 1. Configure CORS with strict settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],  # Specify exact domains
    allow_credentials=True,
    allow_methods=["POST", "GET"],  # Restrict to needed methods
    allow_headers=["Authorization", "Content-Type"],
)

# 2. Implement TLS/HTTPS
# In production.py or deployment config
ssl_keyfile = "path/to/key.pem"
ssl_certfile = "path/to/cert.pem"

# 3. Add security headers middleware
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        return response

app.add_middleware(SecurityHeadersMiddleware)
```

### Request/Response Encryption
```python
# utils/encryption.py
from cryptography.fernet import Fernet
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

class DataEncryption:
    def __init__(self, key):
        self.fernet = Fernet(key)
    
    def encrypt_data(self, data: str) -> bytes:
        return self.fernet.encrypt(data.encode())
    
    def decrypt_data(self, encrypted_data: bytes) -> str:
        return self.fernet.decrypt(encrypted_data).decode()

# In your API endpoints
@app.post("/care-plan")
async def generate_care_plan(input_data: CarePlanInput):
    # Decrypt incoming data
    decrypted_data = encryption_service.decrypt_data(input_data.encrypted_content)
    
    # Process the care plan
    result = CarePlanGenerator().crew().kickoff(inputs=decrypted_data)
    
    # Encrypt response
    encrypted_response = encryption_service.encrypt_data(result)
    return {"encrypted_data": encrypted_response}
```

## 2. Data at Rest Security

### Database Encryption
```python
# config/database.py
from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
import sqlite3

# For SQLite (example)
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA key='your-encryption-key'")
        cursor.close()

# For PostgreSQL, use built-in encryption:
DATABASE_URL = "postgresql://user:password@localhost/dbname?sslmode=verify-full"
```

### File System Encryption
```python
# utils/file_encryption.py
from cryptography.fernet import Fernet
import os

class FileEncryption:
    def __init__(self, key_path: str):
        self.key = self._load_or_generate_key(key_path)
        self.fernet = Fernet(self.key)
    
    def _load_or_generate_key(self, key_path: str) -> bytes:
        if os.path.exists(key_path):
            with open(key_path, 'rb') as key_file:
                return key_file.read()
        else:
            key = Fernet.generate_key()
            with open(key_path, 'wb') as key_file:
                key_file.write(key)
            return key
    
    def encrypt_file(self, input_path: str, output_path: str):
        with open(input_path, 'rb') as file:
            data = file.read()
        encrypted_data = self.fernet.encrypt(data)
        with open(output_path, 'wb') as file:
            file.write(encrypted_data)
    
    def decrypt_file(self, input_path: str, output_path: str):
        with open(input_path, 'rb') as file:
            encrypted_data = file.read()
        decrypted_data = self.fernet.decrypt(encrypted_data)
        with open(output_path, 'wb') as file:
            file.write(decrypted_data)

# Implementation in care plan generation
class CarePlanGenerator:
    def __init__(self):
        self.file_encryption = FileEncryption('path/to/key')
    
    def save_care_plan(self, care_plan: str):
        temp_path = "generated/temp_care_plan.md"
        encrypted_path = "generated/care_plan.encrypted"
        
        # Save temporary file
        with open(temp_path, 'w') as f:
            f.write(care_plan)
        
        # Encrypt and save
        self.file_encryption.encrypt_file(temp_path, encrypted_path)
        
        # Remove temporary file
        os.remove(temp_path)
```

## 3. Security Configuration

```yaml
# config/security.yaml
security:
  encryption:
    key_rotation_days: 30
    algorithm: "AES-256-GCM"
    key_derivation: "PBKDF2"
  
  api:
    rate_limit: 100  # requests per minute
    session_timeout: 3600  # seconds
    max_request_size: 1048576  # bytes
  
  audit:
    log_level: "INFO"
    retention_days: 90
    sensitive_fields:
      - "patient_name"
      - "medical_history"
      - "symptoms"
```

## 4. Environment Variables
```bash
# .env
# Generate these securely and store in a secure vault in production
ENCRYPTION_KEY=your-secure-encryption-key
DATABASE_ENCRYPTION_KEY=your-database-encryption-key
JWT_SECRET=your-jwt-secret
SSL_KEY_PASSWORD=your-ssl-key-password
```

## 5. Implementation Steps

1. **Set Up SSL/TLS**:
   ```bash
   # Generate self-signed certificates for development
   openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
   ```

2. **Configure Key Management**:
   ```python
   # utils/key_management.py
   from cryptography.fernet import Fernet
   import schedule
   import time
   
   def rotate_encryption_keys():
       new_key = Fernet.generate_key()
       # Implement key rotation logic
       # Re-encrypt sensitive data with new key
   
   # Schedule key rotation
   schedule.every(30).days.do(rotate_encryption_keys)
   ```

3. **Implement Audit Logging**:
   ```python
   # utils/audit.py
   import logging
   from datetime import datetime
   
   class AuditLogger:
       def __init__(self):
           self.logger = logging.getLogger('audit')
           self.logger.setLevel(logging.INFO)
           
           handler = logging.FileHandler('audit.log')
           formatter = logging.Formatter(
               '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
           )
           handler.setFormatter(formatter)
           self.logger.addHandler(handler)
       
       def log_access(self, user_id: str, action: str, resource: str):
           self.logger.info(
               f"Access: User={user_id}, Action={action}, Resource={resource}"
           )
   ```

4. **Regular Security Checks**:
   ```python
   # utils/security_check.py
   import schedule
   import time
   from datetime import datetime, timedelta
   
   def check_file_integrity():
       # Implement file integrity checks
       pass
   
   def clean_old_logs():
       # Remove logs older than retention period
       pass
   
   def security_maintenance():
       schedule.every().day.at("00:00").do(check_file_integrity)
       schedule.every().day.at("01:00").do(clean_old_logs)
   
       while True:
           schedule.run_pending()
           time.sleep(3600)
   ```

## 6. Additional Security Measures

1. **Implement Rate Limiting**:
```python
from fastapi import FastAPI
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/care-plan")
@limiter.limit("100/minute")
async def generate_care_plan(input_data: CarePlanInput):
    # Your existing code
    pass
```

2. **Implement Request Validation**:
```python
from pydantic import BaseModel, validator
from typing import Optional

class CarePlanInput(BaseModel):
    patient_id: str
    symptoms: str
    medical_history: Optional[str] = None

    @validator('patient_id')
    def validate_patient_id(cls, v):
        if not v.isalnum():
            raise ValueError('Patient ID must be alphanumeric')
        return v
```

These implementations will help ensure HIPAA compliance and protect sensitive patient data throughout your application.

Remember to:
- Regularly update security dependencies
- Conduct security audits
- Monitor logs for suspicious activity
- Maintain backup and recovery procedures
- Document all security measures and procedures
- Train team members on security protocols