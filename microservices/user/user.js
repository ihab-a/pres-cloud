const express = require("express");
const { ObjectId } = require("mongodb");
const transactionConsumer = require("./transactionConsumer");
const users = require("../../database/database.js")("users").collection("users");
const { microservices } = require("../../env.js");

const app = express();

app.use(express.json());

transactionConsumer();
app.listen(9001, "127.0.0.1", () => {
	console.log(`users microservice running on [${microservices.user}]`);
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