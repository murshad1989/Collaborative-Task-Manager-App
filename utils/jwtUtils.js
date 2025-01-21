const jwt = require('jsonwebtoken'); // Library for handling JWT tokens

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token valid for 1 hour
};

module.exports = { generateToken }; // Exporting utility function
