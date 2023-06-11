const express = require("express");
const { ObjectId } = require("mongodb");
const transactionConsumer = require("./transactionConsumer");
const books = require("../../database/database.js")("books").collection("books");
const { microservices } = require("../../env.js");

const app = express();

app.use(express.json());

transactionConsumer();
app.listen(9002, "127.0.0.1", () => {
	console.log(`books microservice running on [${microservices.book}]`);
});


app.get("/", async (req, res) => {
	res.send(await books.find().toArray());
});
app.get("/:id", async (req, res) => {
	res.send(await books.findOne({ _id: new ObjectId(req.params.id) }));
});