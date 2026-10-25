import express from "express";
import multer from "multer";

import { uploadResume } from "../controler/resumecontroler.js";

const router = express.Router();


// =========================
// MULTER CONFIGURATION
// =========================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname;

        cb(null, uniqueName);
    }

});


const upload = multer({
    storage: storage
});


// =========================
// UPLOAD ROUTE
// =========================

router.post(
    "/upload",
    upload.single("resume"),
    uploadResume
);


export default router;