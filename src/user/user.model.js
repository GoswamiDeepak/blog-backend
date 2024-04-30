import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        userType: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamp: true }
);

export default mongoose.model('USER', userSchema);
