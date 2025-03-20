const express = require("express");
const { Kafka } = require("kafkajs");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydatabase",
  password: "postgres",
  port: 5432,
  max: 10, // Número máximo de conexões simultâneas
  idleTimeoutMillis: 30000, // Tempo de inatividade antes de liberar a conexão
});

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function insertIntoDatabase(requestID, message) {
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO mensagens (request_id, conteudo) VALUES ($1, $2)",
      [requestID, message]
    );
    console.log(`✅ Mensagem salva no banco - requestID: ${requestID}`);
  } catch (error) {
    console.error("❌ Erro ao inserir no banco:", error);
  } finally {
    client.release();
  }
}

app.post("/send", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'O campo "message" é obrigatório' });
  }

  const requestID = uuidv4(); // Gera um UUID único

  try {
    await producer.send({
      topic: "test-topic",
      messages: [{ key: requestID, value: message }],
    });

    console.log(`📨 Mensagem enviada para o Kafka - requestID: ${requestID}`);

    await insertIntoDatabase(requestID, message);

    res
      .status(200)
      .json({ requestID, message: "Mensagem enviada com sucesso" });
  } catch (error) {
    console.error("❌ Erro ao enviar mensagem:", error);
    res.status(500).json({ error: "Erro ao processar a mensagem" });
  }
});

const PORT = 3001;
app.listen(PORT, async () => {
  await producer.connect();
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
