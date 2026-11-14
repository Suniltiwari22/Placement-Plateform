import express from "express";

import {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
} from "../controllers/questionController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getQuestions);
router.get("/:id", getQuestionById);

// Admin routes
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createQuestion
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateQuestion
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteQuestion
);

export default router;