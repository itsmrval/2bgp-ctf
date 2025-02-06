const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Team', TeamSchema);
