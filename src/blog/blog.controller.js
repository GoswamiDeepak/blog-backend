import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Blog from './blog.model.js';

const getBlog = (req, res) => {
    res.send('Welcome blog');
};
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    // console.log(req.file);
    const blog = await Blog.create({
        title,
        content,
        category,
        image: req.file.path,
    });
    res.status(201).json(new ApiResponse(201, blog, 'Blog is created!!!'));
});

export { createBlog, getBlog };
