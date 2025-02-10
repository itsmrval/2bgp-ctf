const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const Level = require('../models/Level');
const Team = require('../models/Team');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get scoreboard with team scores and member points
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({}).populate({
      path: 'members',
      select: 'username achieved',
    });

    // Calculate team scores
    let scoreboard = teams.map(team => {
      const totalPoints = team.members.reduce((teamTotal, member) => {
        return teamTotal + member.achieved.reduce((sum, achievement) => sum + achievement.points, 0);
      }, 0);

      return {
        name: team.name,
        total_points: totalPoints,
        members: team.members.map(member => ({
          username: member.username,
          points: member.achieved.reduce((sum, achievement) => sum + achievement.points, 0),
        })),
      };
    });

    // Sort teams by total_points in descending order (highest score first)
    scoreboard.sort((a, b) => b.total_points - a.total_points);

    // Assign ranks
    scoreboard = scoreboard.map((team, index) => ({
      rank: index + 1, // Rank starts at 1
      ...team,
    }));

    res.json(scoreboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Award points to a user for solving a level
router.post('/:user_id/:level_id', authenticate, async (req, res) => {
  try {
    const { user_id, level_id } = req.params;

    if (!user_id || !level_id) {
      return res.status(400).json({ error: 'User ID and Level ID are required' });
    }

    if (req.user.role !== 'admin' && req.user.id !== user_id) {
      return res.status(403).json({ error: 'You are not authorized to award points to another user' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const level = await Level.findById(level_id);
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }
    
    if (req.user.role !== 'admin') {
      if (!req.body.flag) {
        return res.status(400).json({ error: 'Flag is required' });
      }

      // Hash the incoming flag before comparing
      const hashedFlag = crypto.createHash('sha256').update(req.body.flag).digest('hex');

      if (level.flag !== hashedFlag) {
        return res.status(400).json({ error: 'Invalid flag' });
      }
    }

    // Proceed with further logic
    const achievedLevel = user.achieved.find(l => l.level_id?.toString() === level_id);
    if (achievedLevel) {
      return res.status(400).json({ error: 'Level already achieved' });
    }

    user.achieved.push({
      level_id,
      points: level.points,
    });

    await user.save();

    res.status(200).json({ message: 'Flag verified successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a specific achieved level
router.delete('/:user_id/:level_id', authenticate, async (req, res) => {
  try {
    const { user_id, level_id } = req.params;

    if (!user_id || !level_id) {
      return res.status(400).json({ error: 'User ID and Level ID are required' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const initialLength = user.achieved.length;
    user.achieved = user.achieved.filter(l => l.level_id?.toString() !== level_id);

    if (user.achieved.length === initialLength) {
      return res.status(404).json({ error: 'Level not found in achieved list' });
    }

    await user.save();
    res.status(200).json({ message: 'Level removed successfully', achieved: user.achieved });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
