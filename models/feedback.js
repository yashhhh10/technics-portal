const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Feedback', feedbackSchema);
