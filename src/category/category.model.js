import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
    },
    { timestamp: true }
);

export default mongoose.model('Category', categorySchema);
