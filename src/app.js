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

// routes************************
import categoryRouter from './category/category.router.js';
app.use('/api/v1/category', categoryRouter);

export default app;
