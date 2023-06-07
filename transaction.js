const express = require("express");
const { ObjectId } = require("mongodb");
const axios = require("axios");
const auth = require("./auth.js");
const transactions = require("./database.js")("transactions").collection("transactions");

const app = express();

app.use(express.json());

app.listen(9003, () => {
	console.log("transaction microservice on port 9003");
});

app.get("/transactions", auth, async (req, res) => {
	res.status(200).send(
		await transactions.find({ user : new ObjectId(req._user.id) }).toArray()
	);
});

app.post("/transactions", auth, async (req, res) => {
	// Appel synchrone point à poin
	const { data : book } = await axios.get(`http://localhost:9001/books/${req.body.book}`);
	req._user.points = (await axios.get(`http://localhost:9000/users/${req._user.id}`)).data.points;


	let fee = book.price;

	if(req._user.points > 30)
		fee -= fee * Math.min(req._user.points / 100, 0.6) - 0.2;

	transactions.insertOne({
		user: new ObjectId(req._user.id),
		book: book.id,
		fee,
	});

	// Appel asynchrone point à point
	axios.put(`http://localhost:9000/users/${req._user.id}/points`);

	res.status(200).send({ points : req._user.points });
})