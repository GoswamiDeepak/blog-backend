import express from 'express';
import {
    registerUser,
    loginUser,
    verifyUser,
    refreshTokenGenerate,
    forgetPassword,
    verifyResetToken,
} from './user.controller.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('hello');
});

userRouter.post('/registration', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/activation', verifyUser);
userRouter.post('/refresh-token', refreshTokenGenerate);
userRouter.post('/forget-password', forgetPassword);
userRouter.post('/reset-token', verifyResetToken);

export default userRouter; 
