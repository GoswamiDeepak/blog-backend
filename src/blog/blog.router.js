import express from 'express';
import { createBlog, getBlog } from './blog.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const blogRouter = express.Router();

blogRouter.get('/', getBlog);
blogRouter.post('/create-blog', upload.single('image'), createBlog);

export default blogRouter;
