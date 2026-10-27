import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import userRoutes from "./routes/userroute.js";
import deshRoutes from "./routes/desh.js";
import resumeRoutes from "./routes/resume.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://YOUR-FRONTEND-RENDER-URL.onrender.com"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", userRoutes);
app.use("/api/desh", deshRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Resume Analyzer Backend is Running");
});

const PORT = process.env.PORT || 4500;

connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});