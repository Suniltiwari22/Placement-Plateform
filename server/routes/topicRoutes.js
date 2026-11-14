import express from "express";

import {
    createTopic,
    getTopics,
    getTopicsByCategory,
    getTopicById,
    updateTopic,
    deleteTopic
} from "../controllers/topicController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// Get all topics
router.get("/", getTopics);

// Get topics by category
router.get("/category/:categoryId", getTopicsByCategory);

// Get single topic
router.get("/:id", getTopicById);


// ===============================
// ADMIN ONLY ROUTES
// ===============================

// Create topic
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createTopic
);

// Update topic
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateTopic
);

// Delete topic
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteTopic
);

export default router;