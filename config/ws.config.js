import dotenv from 'dotenv';

dotenv.config();

export const wsConfig = {
    port: process.env.WS_PORT || 8080
};


