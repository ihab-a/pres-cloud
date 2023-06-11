const users = require("../../database/database.js")("users").collection("users");
const { ObjectId } = require("mongodb");
const amqp = require("amqplib");

module.exports = async () => {
	const connection = await amqp.connect("amqp://127.0.0.1:5672");

	const channel = await connection.createChannel();

	await channel.assertExchange("transaction");

	const { queue } = await channel.assertQueue("transaction-user");

	channel.bindQueue(queue, "transaction", "");

	channel.consume(queue, async (msg) => {
		data = JSON.parse(msg.content.toString());

		const update = await users.updateOne({ _id: new ObjectId(data.user) }, {$inc : {points : 1}});

		channel.ack(msg);
	});
}