const amqp = require("amqplib");

module.exports = async (user, book) => {
	const connection = await amqp.connect("amqp://127.0.0.1:5672");

	const channel = await connection.createChannel();

	await channel.assertExchange("transaction");

	const msg = JSON.stringify({
		user,
		book
	});

	channel.publish("transaction", "", Buffer.from(msg));
}