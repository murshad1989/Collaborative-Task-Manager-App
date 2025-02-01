/**
 * Input validation middleware
 * @module middlewares/validation
 */

const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');

/**
 * Validation rules for user registration
 */
const registerValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain a lowercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain a special character'),
    body('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces')
];

/**
 * Validation rules for login
 */
const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

/**
 * Validation rules for password reset request
 */
const forgotPasswordValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
];

/**
 * Validation rules for password reset
 */
const resetPasswordValidation = [
    body('token')
        .notEmpty()
        .withMessage('Reset token is required'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain a lowercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain a special character')
];

/**
 * Middleware to handle validation errors
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = errors.array().map(err => ({
        field: err.param,
        message: err.msg
    }));

    logger.warn('Validation failed:', {
        path: req.path,
        errors: extractedErrors
    });

    return res.status(422).json({
        status: 'error',
        message: 'Validation failed',
        errors: extractedErrors
    });
};

module.exports = {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    validate
};
