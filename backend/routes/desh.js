import express from "express";
import{
    getUserData,
    saveAnalysis
} from "../controler/deshbordcontrol.js";


const router = express.Router();

router.post("/save", saveAnalysis);
router.get("/:userId", getUserData);

export default router;