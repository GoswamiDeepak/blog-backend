import express from 'express';
import {
    registerUser,
    loginUser,
    verifyUser,
    refreshTokenGenerate,
} from './user.controller.js';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('hello');
});

userRouter.post('/registration', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/activation', verifyUser);
userRouter.post('refresh-token', refreshTokenGenerate);

export default userRouter;
