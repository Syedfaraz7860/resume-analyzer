import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import userRoutes from "./routes/userroute.js";
import deshRoutes from "./routes/desh.js";
import resumeRoutes from "./routes/resume.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://resume-analyzer-1-oseb.onrender.com"
    ],
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],
    credentials: true
};

app.use(cors(corsOptions));

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