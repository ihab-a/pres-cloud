const express = require("express");
const { ObjectId } = require("mongodb");
const books = require("../database/database.js")("books").collection("books");

const app = express();

app.use(express.json());

app.listen(9002, "127.0.0.1", () => {
	console.log("books microservice on port 9001");
});


app.get("/", async (req, res) => {
	res.send(await books.find().toArray());
});
app.get("/:id", async (req, res) => {
	res.send(await books.findOne({ _id: new ObjectId(req.params.id) }));
});