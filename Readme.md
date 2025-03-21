# Kafka com Node.js e PostgreSQL

Este repositório contém projeto pra validar um cenário onde centenas de requisições chegam via API, são enviadas para um Kafka, e um consumer processa os itens da fila. Além de possui stack completa: consumer, producer, monitor e testing.

## 🚀 Tecnologias Utilizadas

- Docker & Docker Compose → Para facilitar o setup do ambiente
- Apache Kafka → Mensageria para processar eventos
- Zookeeper → Gerenciamento dos brokers do Kafka
- Node.js → API para receber requisições e produzir mensagens
- PostgreSQL → Banco de dados para armazenar as mensagens processadas
- Kafka Exporter → Monitoramento do Kafka com Prometheus
- Prometheus & Grafana → Métricas e dashboard para análise
- Jmeter → Para fazer os testes de carga.

## 📦 Estrutura do Projeto

🔧 Configuração e Execução

1️⃣ Clone o repositório

2️⃣ Suba os containers com Docker Compose

Isso iniciará os serviços necessários:

- Zookeeper
- Kafka
- PostgreSQL
- Kafka Exporter
- Prometheus
- Grafana

Para os producer e consumer pode ser executado usando node index.js

3️⃣ Acesse os serviços

- API Producer → http://localhost:3001
- Kafka UI → http://localhost:8080
- Prometheus → http://localhost:9090
- Grafana → http://localhost:3005

## 📡 Como Funciona

- A API recebe requisições HTTP e gera um requestID aleatório
- A mensagem é enviada para um tópico Kafka
- O Consumer lê a mensagem e a insere no PostgreSQL
- O Kafka Exporter coleta métricas para análise no Grafana

## 📊 Monitoramento

O Prometheus está configurado para coletar métricas do Kafka através do Kafka Exporter. No Grafana, você pode visualizar o consumo de mensagens em tempo real.

## 🛠 Melhorias Futuras

- Implementar escala horizontal no consumer
- Adicionar autenticação no Kafka (SASL/SSL)
- Melhorar tratamento de falhas e reprocessamento

📜 Licença

Este projeto é open-source e pode ser utilizado para estudos e melhorias.

