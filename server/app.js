import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import categoryRoutes from "./routes/categoryRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dsaSectionRoutes from "./routes/dsaSectionRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";

import aptitudeCategoryRoutes from "./routes/aptitudeCategoryRoutes.js";
import aptitudeTopicRoutes from "./routes/aptitudeTopicRoutes.js";
import aptitudeQuestionRoutes from "./routes/aptitudeQuestionRoutes.js";


const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);


app.use(cookieParser());

// ===============================
// CATEGORY ROUTES
// ===============================
app.use("/api/categories", categoryRoutes);

// ===============================
// TOPIC ROUTES
// ===============================
app.use("/api/topics", topicRoutes);

// ===============================
// COMPANY ROUTES
// ===============================
app.use("/api/companies", companyRoutes);

// ===============================
// QUESTION ROUTES
// ===============================
app.use("/api/questions", questionRoutes);

// ===============================
// AUTH ROUTES
// ===============================
app.use("/api/auth", authRoutes);

// ===============================
// DSA SECTION ROUTES
// ===============================
app.use("/api/dsa-sections", dsaSectionRoutes);

// ===============================
// CODE EXECUTION ROUTES
// ===============================
app.use("/api/code", codeRoutes);

// ===============================
// HOME ROUTE
// ===============================
app.get("/", (req, res) => {
    res.json({
        message: "Placement Platform API is running"
    });
});


app.use("/api/aptitude/categories", aptitudeCategoryRoutes);
app.use("/api/aptitude/topics", aptitudeTopicRoutes);
app.use("/api/aptitude/questions", aptitudeQuestionRoutes);


export default app;