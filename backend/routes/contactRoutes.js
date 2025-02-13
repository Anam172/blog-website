import express from "express";
import { sendContactEmail } from "../controllers/contactController.js"; 

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Contact API is working!");
});

router.post("/send-email", sendContactEmail);

export default router; 
