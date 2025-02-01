/**
 * Authentication controller
 * @module controllers/authController
 */

const crypto = require('crypto');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const { sendEmail } = require('../config/email');
const { APIError } = require('../middlewares/errorHandler');
const logger = require('../utils/logger');

/**
 * Register a new user
 * @route POST /api/auth/register
 */
exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new APIError('Email already registered', 400);
        }

        // Create new user
        const user = await User.create({
            email,
            password,
            name
        });

        // Generate token
        const token = generateToken(user);

        logger.info('New user registered:', {
            userId: user.id,
            email: user.email
        });

        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Get user
        const user = await User.findByEmail(email);
        if (!user) {
            throw new APIError('Invalid email or password', 401);
        }

        // Check password
        const isValidPassword = await User.verifyPassword(password, user.password);
        if (!isValidPassword) {
            throw new APIError('Invalid email or password', 401);
        }

        // Generate token
        const token = generateToken(user);

        logger.info('User logged in:', {
            userId: user.id,
            email: user.email
        });

        res.json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Request password reset
 * @route POST /api/auth/forgot-password
 */
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Get user
        const user = await User.findByEmail(email);
        if (!user) {
            throw new APIError('No user found with this email', 404);
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Save reset token
        await User.storeResetToken(email, resetToken, resetTokenExpires);

        // Send reset email
        const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        
        await sendEmail({
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetURL}">${resetURL}</a>
                <p>If you didn't request this, please ignore this email.</p>
                <p>This link will expire in 1 hour.</p>
            `
        });

        logger.info('Password reset email sent:', { email });

        res.json({
            status: 'success',
            message: 'Password reset instructions sent to email'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Reset password
 * @route POST /api/auth/reset-password
 */
exports.resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        // Verify reset token
        const user = await User.verifyResetToken(token);
        if (!user) {
            throw new APIError('Invalid or expired reset token', 400);
        }

        // Update password
        await User.updatePassword(user.id, password);

        logger.info('Password reset successful:', {
            userId: user.id,
            email: user.email
        });

        res.json({
            status: 'success',
            message: 'Password has been reset successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get current user profile
 * @route GET /api/auth/me
 */
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        res.json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    createdAt: user.created_at
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
