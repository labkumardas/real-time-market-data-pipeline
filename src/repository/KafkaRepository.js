import kafka from '../../config/kafka.config.js';

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'kraken-group' });

class KafkaRepository {
    constructor() {
        this.broadcastFn = null;
    }

    async connectProducer() {
        await producer.connect();
        console.log('Kafka Producer connected');
    }

    async sendToKafka(message) {
        try {
            await producer.send({
                topic: process.env.KAFKA_TOPIC || 'quotes.crypto',
                messages: [{ value: JSON.stringify(message) }]
            });
        } catch (err) {
            console.error('Error sending message to Kafka:', err);
        }
    }

    async connectConsumer() {
        await consumer.connect();
        await consumer.subscribe({ topic: process.env.KAFKA_TOPIC || 'quotes.crypto', fromBeginning: true });
        console.log('Kafka Consumer connected');

        await consumer.run({
            eachMessage: async ({ message }) => {
                const msg = JSON.parse(message.value.toString());
                console.log('Consumed Kafka Message:', msg);

                if (this.broadcastFn) this.broadcastFn(msg);
            }
        });
    }

    setBroadcastFunction(fn) {
        this.broadcastFn = fn;
    }

    async disconnect() {
        await producer.disconnect();
        await consumer.disconnect();
        console.log('Kafka Producer and Consumer disconnected');
    }
}

const kafkaRepo = new KafkaRepository();

export const sendToKafka = kafkaRepo.sendToKafka.bind(kafkaRepo);
export const kafkaConsumer = kafkaRepo;
