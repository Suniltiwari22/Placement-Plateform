import express from "express";

import {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} from "../controllers/companyController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// Get all companies
router.get("/", getCompanies);

// Get single company
router.get("/:id", getCompanyById);


// ===============================
// ADMIN ONLY ROUTES
// ===============================

// Create company
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createCompany
);

// Update company
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateCompany
);

// Delete company
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteCompany
);

export default router;