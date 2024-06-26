import mongoose from 'mongoose';
import { config } from '../app-config/config.js';

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                required: false,
            }
        ],
    },
    { timestamp: true }
);
blogSchema.pre('save', async function (next) {
    if (config.production == 'false') {
        if (!this.isModified('image')) {
            next();
        }
        this.image = `http://localhost:8000/${this.image}`;
    }
});
export default mongoose.model('Blog', blogSchema);
