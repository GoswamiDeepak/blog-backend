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
app.use('/public',express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome');
});

//********_routes_************************
import categoryRouter from './category/category.router.js';
import userRouter from './user/user.router.js';
import blogRouter from './blog/blog.router.js';

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/blog', blogRouter);

export default app;
