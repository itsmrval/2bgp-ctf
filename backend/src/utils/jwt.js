const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  if (!user || !user._id) {
    throw new Error('Invalid user object');
  }

  return jwt.sign(
    { 
      id: user._id.toString(), 
      username: user.username,
      role: user.role || 'user'
    }, 
    process.env.JWT_SECRET || 'fallback_secret', 
    { expiresIn: '1d' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };