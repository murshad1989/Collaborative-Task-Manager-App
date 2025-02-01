/**
 * User model and database operations
 * @module models/User
 */

const db = require('../config/database');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

class User {
    /**
     * Create a new user
     * @param {Object} userData - User data (email, password, name)
     * @returns {Promise<Object>} Created user object
     */
    static async create(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const [result] = await db.execute(
                'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, NOW())',
                [userData.email, hashedPassword, userData.name, userData.role || 'user']
            );

            logger.info('New user created:', {
                userId: result.insertId,
                email: userData.email
            });

            return { id: result.insertId, ...userData };
        } catch (error) {
            logger.error('Error creating user:', {
                error: error.message,
                email: userData.email
            });
            throw new Error('Failed to create user');
        }
    }

    /**
     * Find user by email
     * @param {string} email - User's email
     * @returns {Promise<Object|null>} User object if found, null otherwise
     */
    static async findByEmail(email) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error('Error finding user by email:', {
                error: error.message,
                email
            });
            throw new Error('Database error while finding user');
        }
    }

    /**
     * Find user by ID
     * @param {number} id - User's ID
     * @returns {Promise<Object|null>} User object if found, null otherwise
     */
    static async findById(id) {
        try {
            const [rows] = await db.execute(
                'SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error('Error finding user by ID:', {
                error: error.message,
                userId: id
            });
            throw new Error('Database error while finding user');
        }
    }

    /**
     * Update user's password
     * @param {number} id - User's ID
     * @param {string} newPassword - New password
     * @returns {Promise<boolean>} True if successful
     */
    static async updatePassword(id, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await db.execute(
                'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
                [hashedPassword, id]
            );

            logger.info('Password updated successfully for user:', { userId: id });
            return true;
        } catch (error) {
            logger.error('Error updating password:', {
                error: error.message,
                userId: id
            });
            throw new Error('Failed to update password');
        }
    }

    /**
     * Verify password for user
     * @param {string} password - Password to verify
     * @param {string} hashedPassword - Stored hashed password
     * @returns {Promise<boolean>} True if password matches
     */
    static async verifyPassword(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            logger.error('Error verifying password:', {
                error: error.message
            });
            throw new Error('Error verifying password');
        }
    }

    /**
     * Store password reset token
     * @param {string} email - User's email
     * @param {string} token - Reset token
     * @param {Date} expires - Token expiration date
     */
    static async storeResetToken(email, token, expires) {
        try {
            await db.execute(
                'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?',
                [token, expires, email]
            );
            
            logger.info('Reset token stored for user:', { email });
        } catch (error) {
            logger.error('Error storing reset token:', {
                error: error.message,
                email
            });
            throw new Error('Failed to store reset token');
        }
    }

    /**
     * Verify reset token
     * @param {string} token - Reset token to verify
     * @returns {Promise<Object|null>} User object if token valid, null otherwise
     */
    static async verifyResetToken(token) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
                [token]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error('Error verifying reset token:', {
                error: error.message,
                token
            });
            throw new Error('Failed to verify reset token');
        }
    }
}

module.exports = User;
