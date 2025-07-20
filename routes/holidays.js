const express = require('express');
const router = express.Router();
const Holiday = require('../models/holidays');
const { protect, authorizeRoles } = require('../middleware/auth');

// Get all holidays - visible to all users
router.get('/', protect, async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new holiday - HR only
router.post('/', protect, authorizeRoles('hr'), async (req, res) => {
  try {
    const newHoliday = new Holiday(req.body);
    await newHoliday.save();
    res.status(201).json(newHoliday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update holiday - HR only
router.put('/:id', protect, authorizeRoles('hr'), async (req, res) => {
  try {
    const updatedHoliday = await Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHoliday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete holiday - HR only
router.delete('/:id', protect, authorizeRoles('hr'), async (req, res) => {
  try {
    await Holiday.findByIdAndDelete(req.params.id);
    res.json({ message: 'Holiday deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;