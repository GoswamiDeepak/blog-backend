import express from 'express';
import { createUser, loginUser } from './user.controller.js';
const userRouter = express.Router(); 

userRouter.get("/",(req,res)=> {
    res.send('hello')
})
userRouter.post('/registration', createUser);    
userRouter.post('/login', loginUser);

export default userRouter;
