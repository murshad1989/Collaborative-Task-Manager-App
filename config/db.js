const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.getConnection()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Database connection failed:', err.message));

module.exports = pool;
