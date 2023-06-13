const amqp = require("amqplib");

async function consumer(){
  const connection = await amqp.connect("amqp://127.0.0.1:5672");
  const channel = await connection.createChannel();

  const { queue } = await channel.assertQueue("q2");

  const exchange = await channel.assertExchange("exchange_test", "fanout");

  await channel.bindQueue(queue, "exchange_test", "");

  channel.consume(queue, (msg) => {
    console.log(msg.content.toString())
    // channel.ack(msg);
  })
}

consumer()