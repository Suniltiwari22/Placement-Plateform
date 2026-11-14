import bcrypt from "bcryptjs";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({
                message:
                    "Name, email and password are required"
            });
        }


        if (password.length < 6) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters"
            });
        }


        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student"
        });


        const token = generateToken(user._id);


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });

    }
};



// LOGIN USER
export const loginUser = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }


        const user = await User.findOne({
            email
        }).select("+password");


        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        if (!user.isActive) {
            return res.status(403).json({
                message: "Your account is inactive"
            });
        }


        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const token = generateToken(user._id);


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });

    }
};



// LOGOUT USER
export const logoutUser = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax"
        });


        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error logging out",
            error: error.message
        });

    }
};


// GET LOGGED-IN USER
// GET CURRENT LOGGED-IN USER
export const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to get user details"
        });
    }
};