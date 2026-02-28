const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔍 Testing MySQL connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log('✅ MySQL Connection Successful!');

    // Check if database exists
    const [result] = await connection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'krystal_aqua'`
    );

    if (result.length > 0) {
      console.log('✅ Database "krystal_aqua" exists');
      
      // Use database
      await connection.query('USE krystal_aqua');
      
      // Check tables
      const [tables] = await connection.query('SHOW TABLES');
      console.log('\n📊 Tables found:');
      tables.forEach((table) => {
        console.log(`   • ${Object.values(table)[0]}`);
      });
    } else {
      console.log('❌ Database "krystal_aqua" does not exist');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_FOR_USER') {
      console.log('\n⚠️  Password is incorrect. Please verify DB_PASSWORD in .env');
    }
  }
}

testConnection();
