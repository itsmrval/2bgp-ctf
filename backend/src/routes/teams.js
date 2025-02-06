const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({}).populate('members', 'username');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const team = new Team({ 
      name: req.body.name, 
      members: [req.user._id] 
    });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
