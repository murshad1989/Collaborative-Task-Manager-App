const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getProfile,
    forgotPassword,
    resetPassword,
    logout
} = require('../controllers/authController');
const authenticateToken = require('../middlewares/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);

module.exports = router;
