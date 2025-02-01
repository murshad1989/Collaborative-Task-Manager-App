const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user exists
        const [users] = await pool.execute(
            'SELECT id, username, email FROM users WHERE id = ?',
            [decoded.id]
        );

        if (!users.length) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = users[0];
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
