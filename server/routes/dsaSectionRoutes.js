import express from "express";

import {
    getDSASections,
    getDSASectionById,
    createDSASection,
    updateDSASection,
    deleteDSASection
} from "../controllers/dsaSectionController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getDSASections);
router.get("/:id", getDSASectionById);

// Admin routes
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createDSASection
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateDSASection
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteDSASection
);

export default router;