import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
    clientId: 'market-data-client',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

export default kafka;
