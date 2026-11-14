
import express from "express";

import {
    createAptitudeQuestion,
    getAptitudeQuestions,
    getAllAptitudeQuestionsAdmin,
    getAptitudeQuestionById,
    submitAptitudeAnswer,
    updateAptitudeQuestion,
    deleteAptitudeQuestion
} from "../controllers/aptitudeQuestionController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public student routes
router.get("/", getAptitudeQuestions);
router.get("/:id", getAptitudeQuestionById);
router.post("/:id/submit", submitAptitudeAnswer);

// Admin routes
router.get(
    "/admin/all",
    authMiddleware,
    adminMiddleware,
    getAllAptitudeQuestionsAdmin
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createAptitudeQuestion
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateAptitudeQuestion
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteAptitudeQuestion
);

export default router;
