import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = "admin@placementplatform.com";
        const adminPassword = "Admin@123456";

        const existingAdmin = await User.findOne({
            email: adminEmail
        });

        if (existingAdmin) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const admin = await User.create({
            name: "Placement Platform Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            isActive: true
        });

        console.log("Admin created successfully");
        console.log("Email:", admin.email);
        console.log("Password:", adminPassword);

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();