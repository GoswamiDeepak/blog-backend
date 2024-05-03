import express from 'express';
import { registerUser, loginUser } from './user.controller.js';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('hello');
});

userRouter.post('/registration', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
