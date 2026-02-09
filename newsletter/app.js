const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { constants } = require("buffer");

const app = express();
const port = "8080";

app.use(bodyParser.urlencoded({ extended: true }));
//to use static tools i.e. local images and css, we need
app.use(express.static("resources")); //generally a public folder

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/resources/index.html");
});

app.post("/", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	console.log(firstName, lastName, email);

	const apiKey = "";
	const userKey = "";
	const url = `https://us8.api.mailchimp.com/3.0/lists/${userKey}/members`;

	var parsedData = {};

	//post is important for options
	const options = {
		method: "POST",
		auth: `msr:${apiKey}`,
	};

	var data = {
		email_address: email,
		status: "subscribed",
		merge_fields: {
			FNAME: firstName,
			LNAME: lastName,
		},
	};

	var jsonData = JSON.stringify(data);

	const request = https.request(url, options, (response) => {
		if (response.statusCode) {
			res.sendFile(__dirname + "/resources/success.html");
		} else {
			res.sendFile(__dirname + "/resources/failure.html");
		}

		response.on("data", (chunk) => {
			parsedData = JSON.parse(chunk);

			console.log(parsedData);
		});
	});

	request.write(jsonData);

	request.end();
});

app.listen(process.env.PORT || port, () => {
	console.log("Server running at: " + port);
});
