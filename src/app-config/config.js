import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    db: process.env.MONGODB_URL,
};