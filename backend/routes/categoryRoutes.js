import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// routes
// create-category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

// update-category 
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

// get all category
router.get('/get-category',getAllCategoryController)

// get single category 
router.get('/single-category/:slug',getSingleCategoryController)

// delete category 
router.delete('/delete-category/:id',deleteCategoryController)

export default router;