const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
