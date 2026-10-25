
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userroute.js";
import deshRoutes from "./routes/desh.js";
import resumeRoutes from "./routes/resume.js";

dotenv.config();
console.log("JWT:", process.env.JWT_SECRET);
const app = express();
app.use("/api/desh", deshRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("hello");
});

// Server
app.listen(4500, () => {
    console.log("server is running on http://localhost:4500");
});

// Database
connectDb();

