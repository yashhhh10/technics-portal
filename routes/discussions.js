const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussions');
const { protect, authorizeRoles } = require('../middleware/auth');

// Get all discussion posts - visible to all logged-in users
router.get('/', protect, async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new discussion post - only department heads
router.post('/create-discussion', protect, authorizeRoles('admin', 'hr', 'vp', 'director', 'marketing', 'techhead', 'financehead'), async (req, res) => {
  try {
    console.log("Create Discussion");
    const newDiscussion = new Discussion({ ...req.body, createdBy: req.user.id });
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update discussion - only by creator with valid role
router.put('/:id', protect, authorizeRoles('admin', 'hr', 'vp', 'director', 'marketing', 'techhead', 'financehead'), async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Discussion post not found' });
    if (discussion.createdBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized to update this post' });

    const updated = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete discussion - only by creator with valid role
router.delete('/:id', protect, authorizeRoles('admin', 'hr', 'vp', 'director', 'marketing', 'techhead', 'financehead'), async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Discussion post not found' });
    if (discussion.createdBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized to delete this post' });

    await Discussion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Discussion post deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
