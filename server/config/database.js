const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '2005',
  database: process.env.DB_NAME || 'krystal_aqua',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection on startup
pool.getConnection()
  .then((conn) => {
    console.log('✅ MySQL Database Connected Successfully');
    conn.release();
  })
  .catch((err) => {
    console.error('❌ Database Connection Error:', err.message);
    console.error('Check your .env file credentials');
  });

module.exports = pool;
