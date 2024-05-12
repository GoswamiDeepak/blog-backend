import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Category from './category.model.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { category } = req.body;
        // console.log(res.user);
        const cate = await Category.create({
            category,
            user: req.user._id,
        });
        if (!cate) {
            throw new ApiError(500, 'Internal server Error !!!.');
        }
        res.status(201).json(
            new ApiResponse(201, cate, 'Category created!!!.')
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal server Error !!'
        );
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 10;
    try {
        const totalCount = await Category.countDocuments();
        const totalPage = Math.ceil(totalCount / limit);
        const skip = (page - 1) * limit;

        const category = await Category.find({}, { user: 0, __v: 0 })
            .sort({ category: -1 })
            .skip(skip)
            .limit(limit);
        const hasNextPage = page < totalPage;
        const hasPreviousPage = page > 1;
        const pagination = {
            totalItem: totalCount,
            totalPage,
            currentPage: page,
            hasNextPage,
            hasPreviousPage,
            nextPage: hasNextPage ? Number(page) + 1 : null,
            previousPage: hasPreviousPage ? page - 1 : null,
        };
        if (!category) {
            throw new ApiError(500, 'Internal issue!!.');
        }
        res.status(200).json(
            new ApiResponse(200, { category, pagination }, 'Category')
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(error?.statusCode, error?.message);
    }
});
const getSingleCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(400, 'Required category Id');
        }
        const category = await Category.findById(id, { user: 0, __v: 0 });
        if (!category) {
            throw new ApiError(404, 'Category not found');
        }
        res.status(200).json(new ApiResponse(200, category, 'Category'));
    } catch (error) {
        throw new ApiError(error?.statusCode, error?.message);
    }
});
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    try {
        if (!id) {
            throw new ApiError(400, 'Required category Id');
        }
        const updatedCat = await Category.findByIdAndUpdate(
            id,
            {
                $set: {
                    category: category,
                },
            },
            { new: true }
        );
        if (!updatedCat) {
            throw new ApiError(500, 'Internal Server Error !!!');
        }
        res.status(200).json(
            new ApiResponse(200, updatedCat, 'Category updated')
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(error?.statusCode, error?.message);
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw new ApiError(400, 'Required category Id');
        }
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new ApiError(400, 'Category not found');
        }
        res.status(200).json(
            new ApiResponse(200, 'Category has been deleted!!!')
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(error?.statusCode, error?.message);
    }
});

export {
    createCategory,
    getCategory,
    updateCategory,
    getSingleCategory,
    deleteCategory,
};
