const express = require('express');
const router = express.Router();
const Helpdesk = require('../models/helpdesk');
const { protect } = require('../middleware/auth');

// Get all helpdesk requests (visible to all logged-in users)
router.get('/', protect, async (req, res) => {
  try {
    const requests = await Helpdesk.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new helpdesk request (open to all)
router.post('/', protect, async (req, res) => {
  try {
    const newRequest = new Helpdesk({ ...req.body, user: req.user.id });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update helpdesk request (only by owner)
router.put('/:id', protect, async (req, res) => {
  try {
    const request = await Helpdesk.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Helpdesk entry not found' });
    if (request.user.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized to update this entry' });

    const updated = await Helpdesk.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete helpdesk request (only by owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const request = await Helpdesk.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Helpdesk entry not found' });
    if (request.user.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized to delete this entry' });

    await Helpdesk.findByIdAndDelete(req.params.id);
    res.json({ message: 'Helpdesk entry deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;