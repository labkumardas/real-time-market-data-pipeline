import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { initialize } from './app.js';  // Your app.js exports initialize function
import logger from './src/utils/logger.js';  // Your custom logger

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging middleware (morgan) using custom logger
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.http(message.trim()),
    },
}));

// Basic route to verify server is running
app.get('/', (req, res) => {
    res.send('Real-Time Market Data Pipeline Server is running');
});

// Start the HTTP server and initialize your app
app.listen(PORT, async () => {
    logger.info(`Server started on http://localhost:${PORT}`);
    try {
        await initialize(); // your function from app.js
        logger.info('Application initialized successfully');
    } catch (err) {
        logger.error('Failed to initialize application:', err);
        process.exit(1);
    }
});
