const pool = require('./config/database');

async function initializeDatabase() {
  let connection;
  try {
    console.log('🔍 Initializing Database...\n');

    connection = await pool.getConnection();
    console.log('✅ Connected to MySQL\n');

    // Check if database exists
    const [dbs] = await connection.query(
      "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'krystal_aqua'"
    );

    if (dbs.length === 0) {
      console.log('📦 Creating database "krystal_aqua"...');
      await connection.query('CREATE DATABASE krystal_aqua');
      console.log('✅ Database created\n');
    } else {
      console.log('✅ Database "krystal_aqua" already exists\n');
    }

    // Use the database
    await connection.query('USE krystal_aqua');

    // Create orders table
    console.log('📋 Creating "orders" table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        items JSON NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        address TEXT NOT NULL,
        status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_customer_email (customer_email),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      )
    `);
    console.log('✅ Orders table ready\n');

    // Create plant_visits table
    console.log('📋 Creating "plant_visits" table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS plant_visits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        organization VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        preferred_date DATE NOT NULL,
        num_visitors VARCHAR(50) NOT NULL,
        purpose TEXT NOT NULL,
        status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_preferred_date (preferred_date),
        INDEX idx_created_at (created_at)
      )
    `);
    console.log('✅ Plant visits table ready\n');

    // Display all tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('📊 Database Tables:');
    tables.forEach((table) => {
      const tableName = Object.values(table)[0];
      console.log(`   ✓ ${tableName}`);
    });

    console.log('\n✅ Database initialization completed successfully!');
    console.log('\n🚀 You can now start the server with: npm run dev');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('  1. Is MySQL service running? (Check Services)');
    console.error('  2. Check .env file for correct credentials:');
    console.error('     - DB_HOST: localhost');
    console.error('     - DB_USER: root');
    console.error('     - DB_PASSWORD: (your password)');
    console.error('  3. Verify MySQL is accessible on port 3306');
    process.exit(1);
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        // ignore
      }
    }
  }
}

initializeDatabase();
