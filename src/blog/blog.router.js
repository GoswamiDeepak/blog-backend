import express from 'express';
import { createBlog } from './blog.controller.js';
const blogRouter = express.Router();

blogRouter.get('/', createBlog);

export default blogRouter;
