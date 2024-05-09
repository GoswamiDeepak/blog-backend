import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    db: process.env.MONGODB_URL,
    frontend: process.env.FRONTEND_URL,
    mongo_db: process.env.MONGO_DB_URL,
    secret: process.env.ACCESS_TOKEN_SECRET,
    secret_time: process.env.ACCESS_TOKEN_EXPIRY,
    refresh: process.env.REFRESH_TOKEN_SECRET,
    refresh_time: process.env.REFRESH_TOKEN_EXPIRY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    host: process.env.SMTP_BRAVO_HOST,
    smtp_port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_BRAVO_PASSWORD,
};
