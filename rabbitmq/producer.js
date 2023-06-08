const amqp = require("amqplib");

async function connect() {
  const server = await amqp.connect("amqp://127.0.0.1:5672");
  const channel = await server.createChannel();

  await channel.assertExchange("tmp_exchange", "fanout");

  channel.publish("tmp_exchange", "", Buffer.from("hello from producer 1"));
  channel.publish("tmp_exchange", "", Buffer.from("hello from producer 2"));
  channel.publish("tmp_exchange", "", Buffer.from("hello from producer 3"));
  channel.publish("tmp_exchange", "", Buffer.from("hello from producer 4"));
  channel.publish("tmp_exchange", "", Buffer.from("hello from producer 5"));
  channel.publish("tmp_exchange", "", Buffer.from("hello from producer 6"));
}

connect();
