import express from "express";
import { getAllTeamMembers } from "../controllers/teamController.js"; 

const router = express.Router();

// Route to get all team members
router.get("/", getAllTeamMembers);

export default router; 
