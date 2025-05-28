import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        // you can add file transports if needed
    ],
});

// Add helper for HTTP logs from morgan
logger.http = (msg) => logger.log('info', `[HTTP] ${msg}`);

export default logger;
