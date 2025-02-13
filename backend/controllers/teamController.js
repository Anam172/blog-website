import mongoose from "mongoose";
import Team from "../models/Team.js"; 

// Controller to get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.status(200).json({ success: true, data: teamMembers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching team members", error: error.message });
  }
};
