const express = require('express');
const Level = require('../models/Level');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const levels = await Level.find({}).select('-flag');
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const level = new Level(req.body);
    await level.save();
    res.status(201).json(level);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
