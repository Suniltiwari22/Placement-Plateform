
import express from "express";

import {
    createAptitudeCategory,
    getAptitudeCategories,
    getAptitudeCategoryById,
    updateAptitudeCategory,
    deleteAptitudeCategory
} from "../controllers/aptitudeCategoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAptitudeCategories);
router.get("/:id", getAptitudeCategoryById);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, createAptitudeCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateAptitudeCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteAptitudeCategory);

export default router;
