const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Register User - No authentication required
router.post("/register", registerUser);

// Login User - No authentication required
router.post("/login", loginUser);

// Example of protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
