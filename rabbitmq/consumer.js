const amqp = require("amqplib");

async function connect() {
  const server = await amqp.connect("amqp://127.0.0.1:5672");
  const channel = await server.createChannel();

  await channel.assertExchange("tmp_exchange", "fanout");
  const { queue } = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(queue, "tmp_exchange", "");

  channel.consume(queue, (msg) => {
    console.log(`new message: ${msg.content.toString()}`);
    channel.ack(msg);
  });
}

connect();
