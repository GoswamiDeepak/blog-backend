import express from 'express';
import { createUser } from './user.controller.js';
const userRouter = express.Router();

userRouter.get('/create-user', createUser);


export default userRouter;
