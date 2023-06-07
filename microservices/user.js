const express = require("express");
const { ObjectId } = require("mongodb");
const users = require("../database/database.js")("users").collection("users");

const app = express();

app.use(express.json());

app.listen(9001, "127.0.0.1", () => {
	console.log("users microservice on port 9000");
});


app.get("/users", async (req, res) => {
	res.status(200).send(await users.find().toArray());
});
app.get("/users/:id", async (req, res) => {
	res.status(200).send(await users.findOne({ _id: new ObjectId(req.params.id) }));
});
app.put("/users/:id/points", async (req, res) => {
	const update = await users.updateOne({ _id: new ObjectId(req.params.id) }, {$inc : {points : 1}});
	res.status(200).send(null);
});