import express from 'express';
const categoryRouter = express.Router();
import {
    createCategory,
    getCategory,
    updateCategory,
    getSingleCategory,
    deleteCategory,
} from './category.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';

categoryRouter.get('/', getCategory);
categoryRouter.get('/:id', getSingleCategory); 
categoryRouter.post('/create-category', auth, isAdmin, createCategory);
categoryRouter.put('/:id', auth, isAdmin, updateCategory);
categoryRouter.delete('/:id', auth, isAdmin, deleteCategory); 

export default categoryRouter; 
