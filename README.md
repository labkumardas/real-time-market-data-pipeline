# Real-Time Market Data Pipeline (Node.js + Kafka + WebSocket)

This project simulates a real-time data pipeline that ingests live trading data from Kraken's WebSocket API, processes it through a local Kafka topic, and streams the data to connected clients via a WebSocket server.

## Project Overview

The pipeline performs the following tasks:

- **Connects** to Kraken's WebSocket API (`wss://ws.kraken.com`) and subscribes to ticker updates for crypto pairs (BTC/USD, ETH/USD).
- **Processes** ticker updates and sends them as JSON messages to a Kafka topic named `quotes.crypto`.
- **Consumes** messages from the Kafka topic and broadcasts updates to all connected WebSocket clients.

## Architecture Overview

The architecture consists of the following components:

- **Kraken WebSocket Client**: Connects to Kraken's WebSocket API and listens for ticker updates.
- **Kafka Producer**: Publishes ticker updates to a Kafka topic.
- **Kafka Consumer**: Consumes messages from the Kafka topic.
- **WebSocket Server**: Broadcasts the consumed data to connected WebSocket clients in real-time.

## Project Structure

├── server.js # Entry point: Sets up HTTP server, initializes app.js
├── app.js # Initializes WebSocket, Kafka connections
├── src/
│ ├── services/
│ │ └── WebSocketService.js # WebSocket server implementation
│ ├── repository/
│ │ ├── KrakenRepository.js # Kraken WebSocket client for ticker data
│ │ └── KafkaRepository.js # Kafka producer and consumer logic
│ ├── middleware/
│ │ └── errorHandler.js # Error handling middleware
│ ├── utils/
│ │ └── logger.js # Custom logger (using Winston)
│ └── controller/
│ └── WebSocketController.js # WebSocket message handling
├── config/
│ ├── kafka.config.js # Kafka client configuration
│ └── ws.config.js # WebSocket server configuration
├── package.json
├── .env # Environment variables (e.g., Kafka, WebSocket URLs)
└── README.md # Project documentation


## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **Apache Kafka** (v3.6.1 or higher)
- **Java JDK** (v17 or compatible)
- **Git** (optional, for cloning the repo)

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/labkumardas/real-time-market-data-pipeline.git
cd real-time-market-data-pipeline
cd kafka_2.13-3.6.1
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
cd kafka_2.13-3.6.1
.\bin\windows\kafka-server-start.bat .\config\server.properties
npm run dev

 