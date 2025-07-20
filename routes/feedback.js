const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const { protect } = require('../middleware/auth');


// Get all feedback (open to all users)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit feedback (open to all users)
router.post('/', async (req, res) => {
    const { userId, content } = req.body;
  try {

    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({message: 'Feedback submitted successfully',newFeedback});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete feedback (open to all users, but ideally should check ownership in real app)
router.delete('/:id', protect, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });

    const isOwner = feedback.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Not authorized to delete this feedback' });

    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

