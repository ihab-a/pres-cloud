const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../database/database.js")("users").collection("users");

const { ENV_SECRET } = process.env;

const app = express();

app.use(express.json());

app.listen(9003, "127.0.0.1", () => {
	console.log("authentication microservice on port 9002");
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await users.findOne({ email });

	if(!user)
		return res.send({ error : "Email does not exist" });

	if(! await bcrypt.compare(password, user.password))
		return res.send({ error : "Incorrect password" });

	const token = jwt.sign(
		{ id : user._id },
		ENV_SECRET,
		{ expiresIn : "30d" },
	);

	return res.send({
		id: user._id,
		token,
	});
});