const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
        console.log(`📩 Mensagem recebida: ${message.value.toString()}`);
      
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        console.log(`✅ Processamento finalizado: ${message.value.toString()}`);    },
  });

  console.log("🟢 Consumer conectado e ouvindo mensagens...");
};

run().catch(console.error);
