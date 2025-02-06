const express = require('express');
const User = require('../models/User');
const Level = require('../models/Level');
const Team = require('../models/Team');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({}).populate('members');
    const scoreboard = teams.map(team => ({
      name: team.name,
      members: team.members.map(member => ({
        username: member.username,
        points: member.achieved.points
      }))
    }));
    res.json(scoreboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
