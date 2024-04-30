import express from 'express';
const categoryRouter = express.Router();
import { createCategory } from './category.controller.js';


categoryRouter.get('/', createCategory);

export default categoryRouter;
