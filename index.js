const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'process.env.DB_HOST',
  user: 'process.env.DB_USER',
  password: 'process.env.DB_PASS',
  database: 'process.env.DB_NAME',
  connectionLimit: 2
});


module.exports = pool;


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
