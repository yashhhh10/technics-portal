const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: String,
  address: String,
  department: String,
  role: { type: String, enum: ['employee', 'hr', 'admin', 'marketingHead', 'vp','director','techhead', 'financehead'], default: 'employee' }
});

module.exports = mongoose.model('Employee', employeeSchema);
