/**
 * Global error handling middleware
 * @module middlewares/errorHandler
 */

const logger = require('../utils/logger');

/**
 * Custom error class for API errors
 */
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error details
    logger.error('Error occurred:', {
        message: err.message,
        statusCode: err.statusCode,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    // Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Programming or other unknown error: don't leak error details
    // Send generic message
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
    });
};

/**
 * Handle unhandled rejections
 */
const handleUnhandledRejection = (err) => {
    logger.error('UNHANDLED REJECTION:', {
        message: err.message,
        stack: err.stack
    });
    
    // Exit process with failure
    process.exit(1);
};

/**
 * Handle uncaught exceptions
 */
const handleUncaughtException = (err) => {
    logger.error('UNCAUGHT EXCEPTION:', {
        message: err.message,
        stack: err.stack
    });
    
    // Exit process with failure
    process.exit(1);
};

// Set up global error handlers
process.on('unhandledRejection', handleUnhandledRejection);
process.on('uncaughtException', handleUncaughtException);

module.exports = {
    APIError,
    errorHandler
};
