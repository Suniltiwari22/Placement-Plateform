import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Not authorized. Please login first."
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user from database
        const user = await User.findById(decoded.userId).select(
            "-password"
        );

        // Check user exists
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Check user is active
        if (!user.isActive) {
            return res.status(403).json({
                message: "Your account is inactive"
            });
        }

        // Store user in request
        req.user = user;

        // Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;