
import express from "express";

import {
    createAptitudeTopic,
    getAptitudeTopics,
    getAptitudeTopicById,
    updateAptitudeTopic,
    deleteAptitudeTopic
} from "../controllers/aptitudeTopicController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAptitudeTopics);
router.get("/:id", getAptitudeTopicById);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, createAptitudeTopic);
router.put("/:id", authMiddleware, adminMiddleware, updateAptitudeTopic);
router.delete("/:id", authMiddleware, adminMiddleware, deleteAptitudeTopic);

export default router;
