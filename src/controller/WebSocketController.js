class WebSocketController {
    constructor(webSocketService) {
        this.webSocketService = webSocketService;
    }

    handleConnection(ws) {
        console.log('New WebSocket connection');
        this.webSocketService.addClient(ws);
    }

    handleDisconnection(ws) {
        console.log('WebSocket client disconnected');
        this.webSocketService.removeClient(ws);
    }

    handleMessage(ws, message) {
        console.log('Received message from client:', message);
        // Optionally, you can implement message handling logic here
    }
}

export default WebSocketController;
