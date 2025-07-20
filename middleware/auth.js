const jwt = require('jsonwebtoken');
const User = require('../models/users');

// 
const protect = async (req, res, next) => {
  let token;

  // Check for Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }

      return next();

    } catch (err) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  //  If no token at all
  return res.status(401).json({ error: 'Not authorized, no token' });
};

//  Middleware for Role-Based Access
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `Access denied for role: ${req.user.role}` });
    }

    return next(); // only if authorized
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
