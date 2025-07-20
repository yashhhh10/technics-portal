const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // description of the poll/forum
  createdBy: { type: String, required: true }, 
  role: { type: String, required: true },
  type: { type: String, enum: ['poll', 'forum', 'announcement'], required: true },
  options: [String], // only for polls
  reactions: [
    {
      employeeId: String,
      reaction: String, 
    }
  ],
  comments: [
    {employeeId: String,message: String,timestamp: { type: Date, default: Date.now }} ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Discussion', discussionSchema);