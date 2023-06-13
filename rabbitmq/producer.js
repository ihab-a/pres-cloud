const amqp = require("amqplib");

async function producer(){
  const connection = await amqp.connect("amqp://127.0.0.1:5672");
  const channel = await connection.createChannel();

  const exchange = await channel.assertExchange("exchange_test", "fanout");

  channel.publish("exchange_test", "", Buffer.from("publish 1"))
  channel.publish("exchange_test", "", Buffer.from("publish 2"))
  channel.publish("exchange_test", "", Buffer.from("publish 3"))
  channel.publish("exchange_test", "", Buffer.from("publish 4"))
  channel.publish("exchange_test", "", Buffer.from("publish 5"))
  channel.publish("exchange_test", "", Buffer.from("publish 6"))
}

producer()