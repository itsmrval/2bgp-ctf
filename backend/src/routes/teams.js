const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {

    if (req.query.user) {
      const team = await Team.findOne({ members: req.query.user }).populate('members', 'username');
      return res.json(team);
    }

    const teams = await Team.find({}).populate('members', 'username');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:team_id/join', authenticate, async (req, res) => {
  try {
    const team = await Team.findById(req.params.team_id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.members.length >= 4) {
      return res.status(400).json({ error: 'Team is full' });
    }
    // Check if user is already a member of any team
    if (await Team.findOne({ members: req.user._id })) {
      return res.status(400).json({ error: 'User is already a member of a team' });
    }
    team.members.push(req.user._id);
    await team.save();
    res.status(200).json("Team joined successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { name, type } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (type && type !== 'sith' && type !== 'jedi') {
    return res.status(400).json({ error: 'Invalid type' });
  }
  try {
    const team = new Team({ 
      name,
      type,
      members: [req.user._id] 
    });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
