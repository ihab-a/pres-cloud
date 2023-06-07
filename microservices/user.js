const express = require("express");
const { ObjectId } = require("mongodb");
const users = require("../database/database.js")("users").collection("users");

const app = express();

app.use(express.json());

app.listen(9001, "127.0.0.1", () => {
	console.log("users microservice on port 9000");
});


app.get("/", async (req, res) => {
	res.send(await users.find().toArray());
});
app.get("/:id", async (req, res) => {
	res.send(await users.findOne({ _id: new ObjectId(req.params.id) }));
});
app.put("/:id/points", async (req, res) => {
	const update = await users.updateOne({ _id: new ObjectId(req.params.id) }, {$inc : {points : 1}});
	res.send(null);
});