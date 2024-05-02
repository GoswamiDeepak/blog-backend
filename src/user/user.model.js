import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../app-config/config.js';

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
        isVerified: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamp: true }
);

//model middleware for password hashing *************
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//Model methods (password compare)
userSchema.methods.isPasswordCompare = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//model methods (Generate access token)
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            userType: this.userType,
        },
        config.secret,
        {
            expiresIn: config.secret_time,
        }
    );
};

//model methods (Generate refesh token)
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        config.refresh,
        {
            expiresIn: config.refresh_time,
        }
    );
};

export const User = mongoose.model('User', userSchema);
