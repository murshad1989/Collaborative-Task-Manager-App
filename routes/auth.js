const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../config/db');

const router = express.Router();

const sendError = (res, statusCode, message) => res.status(statusCode).json({ message });


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return sendError(res, 400, 'All fields are required');
    }

    try {
        const normalizedEmail = email.toLowerCase();

        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [normalizedEmail]);
        if (existingUser.length > 0) {
            return sendError(res, 400, 'Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
            name,
            normalizedEmail,
            hashedPassword,
        ]);

        const token = jwt.sign(
            { id: result.insertId, email: normalizedEmail },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        sendError(res, 500, 'Internal server error');
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendError(res, 400, 'Email and password are required');
    }

    try {
        const normalizedEmail = email.toLowerCase();
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [normalizedEmail]);

        if (user.length === 0) {
            return sendError(res, 404, 'User not found');
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return sendError(res, 400, 'Invalid password');
        }

        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        sendError(res, 500, 'Internal server error');
    }
});


router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
});


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return sendError(res, 400, 'Email is required');
    }

    try {
        const normalizedEmail = email.toLowerCase();
        const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);

        if (rows.length === 0) {
            return sendError(res, 404, 'User not found');
        }

        const userId = rows[0].id;

        const resetToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: normalizedEmail,
            subject: 'Password Reset',
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">${resetLink}</a>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        console.error(err);
        sendError(res, 500, 'Internal server error');
    }
});


router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return sendError(res, 400, 'Password is required');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        sendError(res, 400, 'Invalid or expired token');
    }
});

module.exports = router;
