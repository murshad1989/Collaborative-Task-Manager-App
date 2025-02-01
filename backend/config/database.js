/**
 * Database configuration and connection management
 * @module config/database
 */

const mysql = require('mysql2');
const logger = require('../utils/logger');

// Load environment variables
require('dotenv').config();

/**
 * Database configuration object
 * @type {Object}
 */
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Convert pool query into promises
const promisePool = pool.promise();

// Test database connection
promisePool.getConnection()
    .then(connection => {
        logger.info('Database connection established successfully');
        connection.release();
    })
    .catch(err => {
        logger.error('Failed to establish database connection:', {
            error: err.message,
            errorCode: err.code,
            fatal: err.fatal
        });
        process.exit(1); // Exit if we can't connect to database
    });

/**
 * Handle unexpected errors
 */
pool.on('error', err => {
    logger.error('Unexpected database error:', {
        error: err.message,
        errorCode: err.code,
        fatal: err.fatal
    });

    // If it's a fatal error, exit the process
    if (err.fatal) {
        process.exit(1);
    }
});

module.exports = promisePool;
