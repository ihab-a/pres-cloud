const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("./database.js")("users").collection("users");

const { ENV_SECRET } = process.env;

const app = express();

app.use(express.json());

app.listen(9002, () => {
	console.log("authentication microservice on port 9002");
});

app.post("/auth/login", async (req, res) => {
	const { email, password } = req.body;

	console.log(req.body)

	const user = await users.findOne({ email });

	if(!user)
		return res.status(404).send({ error : "Email does not exist" });

	if(! await bcrypt.compare(password, user.password))
		return res.status(403).send({ error : "Incorrect password" });

	const token = jwt.sign(
		{ id : user._id },
		ENV_SECRET,
		{ expiresIn : "30d" },
	);

	return res.status(200).send({
		id: user._id,
		token,
	});
});