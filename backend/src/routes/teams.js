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

router.delete('/:team_id', authenticate, isAdmin, async (req, res) => {
  try {
    const team = await Team.findById(req.params.team_id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    await team.deleteOne();
    res.status(200).json("Team deleted successfully");
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:team_id/:user_id', authenticate, async (req, res) => {
  try {

    if (req.user.id !== req.params.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }      

    const team = await Team.findById(req.params.team_id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    // Check if user is already a member of any team
    if (await Team.findOne({ members: req.params._id })) {
      return res.status(400).json({ error: 'User is already a member of a team' });
    }
    team.members.push(user._id);
    await team.save();
    res.status(200).json("Team joined successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:team_id/:user_id', authenticate, isAdmin, async (req, res) => {
  try {
    const team = await Team.findById(req.params.team_id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const index = team.members.indexOf(user._id);
    if (index === -1) {
      return res.status(404).json({ error: 'User not a member of the team' });
    }
    team.members.splice(index, 1);
    await team.save();
    res.status(200).json("User removed from team");
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
    });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
