import express from 'express';
import { createCategory } from './category.controller.js';

const categoryRouter = express.Router();

categoryRouter.get('/', createCategory);

export default categoryRouter;
