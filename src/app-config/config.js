import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    db: process.env.MONGODB_URL,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};
