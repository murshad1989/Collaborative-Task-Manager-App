/**
 * JWT configuration and utilities
 * @module config/jwt
 */

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

// Load environment variables
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

if (!JWT_SECRET) {
    logger.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

/**
 * Generate JWT token for a user
 * @param {Object} user - User object containing id and role
 * @returns {string} JWT token
 */
const generateToken = (user) => {
    try {
        return jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
    } catch (error) {
        logger.error('Error generating JWT token:', {
            error: error.message,
            userId: user.id
        });
        throw new Error('Error generating authentication token');
    }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            logger.warn('Token expired:', { token });
            throw new Error('Token has expired');
        }
        
        logger.error('Error verifying JWT token:', {
            error: error.message,
            token
        });
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
    JWT_EXPIRES_IN
};
