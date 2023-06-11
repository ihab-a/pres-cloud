const express = require("express");
const { ObjectId } = require("mongodb");
const axios = require("axios");
const auth = require("../middlewares/auth.js");
const transactions = require("../database/database.js")("transactions").collection("transactions");
const { microservices } = require("../env.js");

const app = express();

app.use(express.json());

app.listen(9004, "127.0.0.1", () => {
	console.log(`transaction microservice running on [${microservices.transaction}]`);
});

app.get("/", auth, async (req, res) => {
	res.send(
		await transactions.find({ user : new ObjectId(req._user.id) }).toArray()
	);
});

app.post("/", auth, async (req, res) => {
	// Appel synchrone point à poin
	const { data : book } = await axios.get(`${microservices.book}/${req.body.book}`);
	req._user.points = (await axios.get(`${microservices.user}/${req._user.id}`)).data.points;


	let fee = book.price;

	if(req._user.points > 30)
		fee -= fee * Math.min(req._user.points / 100, 0.6) - 0.2;

	transactions.insertOne({
		user: new ObjectId(req._user.id),
		book: book.id,
		fee,
	});

	// Appel asynchrone point à point
	axios.put(`${microservices.user}/${req._user.id}/points`);

	res.send({ points : req._user.points });
})