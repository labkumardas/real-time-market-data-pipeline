import { WebSocketServer, WebSocket } from 'ws';
import { wsConfig } from '../../config/ws.config.js';
import WebSocketController from '../controller/WebSocketController.js';

class WebSocketService {
    constructor() {
        this.wss = new WebSocketServer({ port: wsConfig.port });
        this.clients = new Set();
        this.controller = new WebSocketController(this);

        this.wss.on('connection', (ws) => {
            this.controller.handleConnection(ws);

            ws.on('message', (message) => this.controller.handleMessage(ws, message));
            ws.on('close', () => this.controller.handleDisconnection(ws));
            ws.on('error', (err) => console.error(`WebSocket error: ${err}`));
        });

        console.log(`WebSocket server running at ws://localhost:${wsConfig.port}`);
    }

    addClient(ws) {
        this.clients.add(ws);
    }

    removeClient(ws) {
        this.clients.delete(ws);
    }

    broadcastMessage(message) {
        const data = JSON.stringify(message);
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }

    close() {
        this.wss.close(() => {
            console.log('WebSocket server closed.');
        });
    }
}

export default WebSocketService;
