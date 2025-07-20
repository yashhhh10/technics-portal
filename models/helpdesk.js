const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  raisedBy: String,
  type: String,
  description: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
  department: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Ticket', ticketSchema);
