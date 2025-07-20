const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/users');
const { authorizeRoles, protect } = require('../middleware/auth');
const router = express.Router();

router.post('/create-user', protect, authorizeRoles('admin','hr'), async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password:hashedPassword, role, department });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;