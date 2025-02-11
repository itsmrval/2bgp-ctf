const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hid: { type: String, unique: true, required: true },
  flag: { type: String, required: true },
  points: { type: Number, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Level', LevelSchema);
