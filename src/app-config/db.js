import mongoose from 'mongoose';
import { config } from './config.js';
import { DB_NAME } from '../constants.js';

const connectDB = async () => { 
    try {
        const connectionInstance = await mongoose.connect(`${config.db}/${DB_NAME}`);  //db=local
        console.log(
            `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log('MONGODB Connection Failed', error);
        process.exit(1);
    }
};

export { connectDB }; 
