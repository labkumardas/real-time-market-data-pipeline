# Real-Time Market Data Pipeline (Node.js + Kafka + WebSocket)

## Project Overview
This project simulates a real-time data pipeline that ingests live trading data from Kraken's WebSocket API, processes it through a local Kafka topic, and streams the data to connected clients using a WebSocket server.

The pipeline flow:

- Connect to Kraken WebSocket API (`wss://ws.kraken.com`) and subscribe to ticker updates for crypto pairs (BTC/USD, ETH/USD).
- Transform ticker updates and send JSON messages to a Kafka topic named `quotes.crypto`.
- Consume messages from the Kafka topic.
- Broadcast updates to all connected WebSocket clients on `ws://localhost:8080`.

---

## Prerequisites
- Node.js (v16+ recommended)
- Apache Kafka 3.6.1 (local install)
- Java JDK 17 (or compatible version)
- Git (optional)

---

## Kafka Setup and Commands

### 1. Start ZooKeeper
```bash
cd kafka_2.13-3.6.1
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
#StartKafkaBroker
cd kafka_2.13-3.6.1
.\bin\windows\kafka-server-start.bat .\config\server.properties
#npm install
#npm run dev
