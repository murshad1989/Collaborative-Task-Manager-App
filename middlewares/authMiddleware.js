const jwt = require('jsonwebtoken'); // Library for verifying JWT tokens

// Middleware for verifying JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extracting token from Authorization header
  if (!token) return res.status(401).json({ error: 'Access denied' }); // No token provided

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token
    req.user = decoded; // Adding user info to request object
    next(); // Proceeding to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' }); // Invalid token response
  }
};

module.exports = authMiddleware; // Exporting the middleware
