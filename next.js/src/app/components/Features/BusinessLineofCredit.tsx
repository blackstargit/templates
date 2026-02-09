import React from "react";

const BusinessLineOfCredit: React.FC = () => {
	return (
		<div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6 lg:p-10">
			{/* Left Content */}
			<div className="lg:w-1/2 flex flex-col justify-center">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					Business Line of Credit
				</h2>
				<p className="text-gray-600 mb-6">
					A flexible and convenient way
					to access funds for your
					business needs. Use it as you
					need it and only pay interest
					on what you borrow. Perfect
					for unexpected expenses.
				</p>

				<div className="mb-4 space-y-2">
					<div className="flex items-center space-x-2">
						<svg
							className="w-6 h-6 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						<span className="text-gray-700">
							Easy
							access to
							funds as
							and when
							needed
						</span>
					</div>

					<div className="flex items-center space-x-2">
						<svg
							className="w-6 h-6 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						<span className="text-gray-700">
							Flexible
							repayment
							options
						</span>
					</div>

					<div className="flex items-center space-x-2">
						<svg
							className="w-6 h-6 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						<span className="text-gray-700">
							Interest
							only on
							funds
							borrowed
						</span>
					</div>
				</div>

				<button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300">
					Apply Now
				</button>
			</div>

			{/* Right Content */}
			<div className="lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0">
				<img
					src="/path-to-your-image.jpg"
					alt="Person reviewing finances"
					className="w-full max-w-sm rounded-lg shadow-lg"
				/>
			</div>
		</div>
	);
};

export default BusinessLineOfCredit;
