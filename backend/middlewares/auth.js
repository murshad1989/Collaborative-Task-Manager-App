/**
 * Authentication middleware
 * @module middlewares/auth
 */

const { verifyToken } = require('../config/jwt');
const { APIError } = require('./errorHandler');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Middleware to protect routes that require authentication
 */
const protect = async (req, res, next) => {
    try {
        // 1) Get token from header
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw new APIError('You are not logged in. Please log in to get access.', 401);
        }

        // 2) Verify token
        const decoded = verifyToken(token);

        // 3) Check if user still exists
        const user = await User.findById(decoded.id);
        
        if (!user) {
            throw new APIError('The user belonging to this token no longer exists.', 401);
        }

        // 4) Add user to request object
        req.user = user;
        
        logger.info('User authenticated:', {
            userId: user.id,
            path: req.path
        });

        next();
    } catch (error) {
        if (error instanceof APIError) {
            next(error);
        } else {
            logger.error('Authentication error:', {
                error: error.message,
                path: req.path
            });
            next(new APIError('Please authenticate', 401));
        }
    }
};

/**
 * Middleware to restrict access to certain roles
 * @param {...string} roles - Allowed roles
 */
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new APIError('You do not have permission to perform this action', 403);
        }
        next();
    };
};

module.exports = {
    protect,
    restrictTo
};
