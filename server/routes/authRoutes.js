
import express from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET CURRENT USER
router.get("/me", authMiddleware, getCurrentUser);

// LOGOUT
router.post("/logout", logoutUser);

export default router;
