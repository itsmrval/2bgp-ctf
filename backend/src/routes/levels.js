const express = require('express');
const Level = require('../models/Level');
const crypto = require('crypto');
const { authenticate, isAdmin, isAdminSystemToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const levels = await Level.find({}).select('-flag, -description');
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const level = await Level.findById(req.params.id).select('-flag');
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }
    res.json(level);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    if (!req.body.name || !req.body.hid || !req.body.flag || !req.body.points || !req.body.url || !req.body.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (req.body.flag) {
      req.body.flag = crypto.createHash('sha256').update(req.body.flag).digest('hex');
    }

    const level = new Level(req.body);
    await level.save();

    res.status(201).json(level);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }
    await level.deleteOne();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
