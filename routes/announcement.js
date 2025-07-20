const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');
const { protect, authorizeRoles } = require('../middleware/auth');

//  visible to all logged-in users
router.get('/', protect, async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new announcement - only HR, Admin, VP, Director, Marketing Head
router.post('/', protect, authorizeRoles('admin', 'hr', 'vp', 'director', 'marketingHead'), async (req, res) => {
  try {
    const newAnnouncement = new Announcement({ ...req.body, createdBy: req.user.id });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update announcement - only HR, Admin, VP, Director, Marketing Head
router.put('/:id', protect, authorizeRoles('admin', 'hr', 'vp', 'director', 'marketingHead'), async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete announcement - only HR, Admin, VP, Director, Marketing Head
router.delete('/:id', protect, authorizeRoles('admin', 'hr', 'vp', 'director', 'marketingHead'), async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
