import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamp: true }
);

export default mongoose.model('Category', categorySchema);
