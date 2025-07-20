const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const { authorizeRoles, protect } = require('../middleware/auth');

// Get all employees - accessible to all logged-in users
router.get('/', protect, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new employee - only admin or hr
router.post('/', protect, authorizeRoles('admin', 'hr'), async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    await newEmp.save();
    res.status(201).json(newEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update employee - only admin or hr
router.put('/:id', protect, authorizeRoles('admin', 'hr'), async (req, res) => {
  try {
    const updatedEmp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete employee - only admin or hr
router.delete('/:id', protect, authorizeRoles('admin', 'hr'), async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
