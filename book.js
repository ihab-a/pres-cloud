const express = require("express");
const { ObjectId } = require("mongodb");
const books = require("./database.js")("books").collection("books");

const app = express();

app.use(express.json());

app.listen(9001, () => {
	console.log("books microservice on port 9001");
});


app.get("/books", async (req, res) => {
	res.status(200).send(await books.find().toArray());
});
app.get("/books/:id", async (req, res) => {
	res.status(200).send(await books.findOne({ _id: new ObjectId(req.params.id) }));
});