import mongoose from 'mongoose';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Blog from './blog.model.js';

const getBlog = async (req, res) => {
    // res.send('Welcome blog');
    const response = await Blog.find().populate('category').populate('user');
    return res.status(200).json(new ApiResponse(200, response, 'blogs'));
};

const createBlog = asyncHandler(async (req, res) => {
    //[-] check file
    //[-] upload to this cloudinary or S3Storage
    //[-] check it uploaded or not if then delete form localStorage
    const { title, content, category, slug } = req.body;
    const localFilePath = req.file.path;
    if (!localFilePath) {
        throw new ApiError(400, 'File required !!!.');
    }

    try {
        const blog = await Blog.create({
            title,
            content,
            slug,
            image: req.file.path,
            user: req.user._id,
        });
        const modifiedCategory = [category].map((id) => id.split(','));
        const ids = modifiedCategory.flat();

        const isUpdated = await Blog.findByIdAndUpdate(
            blog._id,
            {
                $push: {
                    category: {
                        $each: ids,
                    },
                },
            },
            { new: true }
        );
        res.status(201).json(
            new ApiResponse(201, isUpdated, 'Blog is created!!!')
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(error.statusCode, error.message);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (id) {
        throw new ApiError(400, 'Required blog id!!');
    }
    try {
        const isDelete = await Blog.findByIdAndDelete(id);
        if (!isDelete) {
            throw new ApiError(500, 'Internal Server Issue !!');
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(error.statusCode, error.message);
    }
});

export { createBlog, getBlog, deleteBlog };
