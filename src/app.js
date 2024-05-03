import express from 'express';
import cors from 'cors';
const app = express();

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('./public'));

app.get('/', (req, res) => { //server testing
    res.send('Welcome');
});

// routes************************
import categoryRouter from './category/category.router.js';
import userRouter from './user/user.router.js';

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/users', userRouter);

export default app;
