import WebSocket from 'ws';
import { sendToKafka } from './KafkaRepository.js';

class KrakenRepository {
    constructor() {
        this.ws = new WebSocket('wss://ws.kraken.com');

        this.ws.on('open', () => {
            console.log('Connected to Kraken WebSocket');
            const subscribeMessage = {
                event: 'subscribe',
                pair: ['BTC/USD', 'ETH/USD'],
                subscription: { name: 'ticker' }
            };
            this.ws.send(JSON.stringify(subscribeMessage));
        });

        this.ws.on('message', this.handleMessage.bind(this));
        this.ws.on('error', (err) => console.error('Error:', err));
        this.ws.on('close', () => console.log('Disconnected from Kraken WebSocket'));
    }

    handleMessage(data) {
        try {
            const message = JSON.parse(data);

            if (!Array.isArray(message) || message[2] !== 'ticker') {
                return;
            }


            const tickerInfo = message[1];
            const pair = message[3];

            const tickerData = {
                symbol: pair,
                timestamp: new Date().toISOString(),
                bid: parseFloat(tickerInfo.b[0]),
                ask: parseFloat(tickerInfo.a[0])
            };

            console.log('  Data:', tickerData);

            sendToKafka(tickerData);
        } catch (err) {
            console.error('Error parsing Kraken message:', err);
        }
    }
}

export default KrakenRepository;
