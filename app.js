import WebSocketService from './src/services/WebSocketService.js';
import KrakenRepository from './src/repository/KrakenRepository.js';
import { kafkaConsumer, sendToKafka } from './src/repository/KafkaRepository.js';
import { errorHandler } from './src/middleware/errorHandler.js';

async function initialize() {
    try {
        const wsService = new WebSocketService();
        const krakenRepository = new KrakenRepository();

        await kafkaConsumer.connectProducer();
        await kafkaConsumer.connectConsumer();

        // Broadcast Kafka messages to all connected WebSocket clients
        kafkaConsumer.setBroadcastFunction((message) => {
            wsService.broadcastMessage(message);
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            console.log('SIGINT received. Closing connections...');
            await kafkaConsumer.disconnect();
            wsService.close();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            console.log('SIGTERM received. Closing connections...');
            await kafkaConsumer.disconnect();
            wsService.close();
            process.exit(0);
        });

        process.on('uncaughtException', (error) => {
            console.error('Uncaught Exception:', error);
            process.exit(1);
        });

        process.on('unhandledRejection', (error) => {
            console.error('Unhandled Rejection:', error);
            process.exit(1);
        });

        console.log('Real-Time Data Pipeline Running...');
    } catch (err) {
        console.error('Error initializing services:', err);
        process.exit(1);
    }
}

initialize();
