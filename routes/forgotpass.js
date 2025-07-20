const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/users');
const { authorizeRoles, protect } = require('../middleware/auth');
const router = express.Router();

router.post('/forgot-password', async (req, res) => {

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Email not found' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();


  res.json({ message: 'Reset link generated', resetLink: `/reset-password/${resetToken}` });
});

module.exports = router;