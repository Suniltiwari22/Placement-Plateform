import express from 'express';
import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from '../controllers/categoryController.js';


import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getCategory);
router.get("/:id", getCategoryById);

// Admin only routes
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createCategory
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateCategory
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteCategory
);

export default router;