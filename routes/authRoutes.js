const express = require("express");
const { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getUserProfile, 
  sendPasswordResetLink, 
  resetPassword, 
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Register User - No authentication required
router.post("/register", registerUser);

// Login User - No authentication required
router.post("/login", loginUser);

// Logout User - Requires authentication
router.post("/logout", authMiddleware, logoutUser);

// Get User Profile - Requires authentication
router.get("/profile", authMiddleware, getUserProfile);

// Send Password Reset Link - No authentication required
router.post("/password-reset", sendPasswordResetLink);

// Reset Password with Token - No authentication required
router.post("/reset-password/:token", resetPassword);

// Example of a protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
