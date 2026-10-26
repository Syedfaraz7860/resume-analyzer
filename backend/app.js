import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import userRoutes from "./routes/userroute.js";
import deshRoutes from "./routes/desh.js";
import resumeRoutes from "./routes/resume.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/desh", deshRoutes);
app.use("/api/resume", resumeRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Resume Analyzer Backend is Running");
});

// Port
const PORT = process.env.PORT || 4500;

// Database
connectDb();

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});