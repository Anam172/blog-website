const express = require("express");
const router = express.Router();
const { getAllTeamMembers } = require("../controllers/teamController");

// Route to get all team members
router.get("/", getAllTeamMembers);  


module.exports = router;
