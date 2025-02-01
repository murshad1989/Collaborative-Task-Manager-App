/**
 * Email configuration and utilities
 * @module config/email
 */

const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Load environment variables
require('dotenv').config();

/**
 * Email configuration object
 * @type {Object}
 */
const emailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify email configuration on startup
transporter.verify()
    .then(() => {
        logger.info('Email service is ready');
    })
    .catch(err => {
        logger.error('Email service configuration error:', {
            error: err.message,
            config: {
                host: emailConfig.host,
                port: emailConfig.port,
                secure: emailConfig.secure
            }
        });
    });

/**
 * Send email using configured transporter
 * @param {Object} options - Email options (to, subject, text, html)
 * @returns {Promise} Nodemailer send result
 */
const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info('Email sent successfully:', {
            messageId: info.messageId,
            to: options.to
        });

        return info;
    } catch (error) {
        logger.error('Error sending email:', {
            error: error.message,
            to: options.to,
            subject: options.subject
        });
        throw new Error('Failed to send email');
    }
};

module.exports = {
    sendEmail
};
