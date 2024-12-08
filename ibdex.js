const mariadb = require('mariadb');

// Create Pool
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'Task',
  password: 'Murshad313',
  database: 'TASKMANAGER',
  connectionLimit: 2
});

// Export pool
module.exports = pool;

// Test connection
async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Connected to MariaDB!');

    const rows = await conn.query('SELECT 1 as val');
    console.log(rows);

  } catch (err) {
    console.error('Error connecting to MariaDB:', err);
  } finally {
    if (conn) conn.end();
  }
}

testConnection();

