import express from 'express';
import { createBlog, getBlog, deleteBlog } from './blog.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const blogRouter = express.Router();

blogRouter.get('/', getBlog);
blogRouter.post('/create-blog', auth, upload.single('image'), createBlog);
blogRouter.delete('/:id', auth, deleteBlog);

export default blogRouter;
