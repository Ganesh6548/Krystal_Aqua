const pool = require('../config/database');

/**
 * Models know about:
 * - Table structure
 * - Columns
 * - SQL Queries
 * They interact directly with the database
 */

class Order {
  // Create a new order
  static async createOrder(orderData) {
    const connection = await pool.getConnection();
    try {
      const {
        customerName,
        customerEmail,
        customerPhone,
        cartItems,
        totalPrice,
        address,
      } = orderData;

      // Convert cartItems array to JSON string for storage
      const itemsJSON = JSON.stringify(cartItems);

      const query = `
        INSERT INTO orders (
          customer_name,
          customer_email,
          customer_phone,
          items,
          total_price,
          address,
          status,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      const [result] = await connection.execute(query, [
        customerName,
        customerEmail,
        customerPhone,
        itemsJSON,
        totalPrice,
        address,
        'pending',
      ]);

      return result.insertId;
    } finally {
      connection.release();
    }
  }

  // Get order by ID
  static async getOrderById(orderId) {
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT 
          id,
          customer_name,
          customer_email,
          customer_phone,
          items,
          total_price,
          address,
          status,
          created_at
        FROM orders
        WHERE id = ?
      `;

      const [rows] = await connection.execute(query, [orderId]);

      if (rows.length === 0) return null;

      const order = rows[0];
      // MySQL2 automatically parses JSON columns, so no need to parse again
      if (typeof order.items === 'string') {
        order.items = JSON.parse(order.items);
      }
      return order;
    } finally {
      connection.release();
    }
  }

  // Get all orders
  static async getAllOrders() {
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT 
          id,
          customer_name,
          customer_email,
          customer_phone,
          items,
          total_price,
          address,
          status,
          created_at
        FROM orders
        ORDER BY created_at DESC
      `;

      const [rows] = await connection.execute(query);

      // MySQL2 automatically parses JSON columns, so no need to parse again
      return rows.map((order) => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
      }));
    } finally {
      connection.release();
    }
  }

  // Update order status
  static async updateOrderStatus(orderId, status) {
    const connection = await pool.getConnection();
    try {
      const query = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
      `;

      await connection.execute(query, [status, orderId]);
    } finally {
      connection.release();
    }
  }

  // Update entire order (CRUD Update)
  static async updateOrder(orderId, updateData) {
    const connection = await pool.getConnection();
    try {
      const {
        customerName,
        customerEmail,
        customerPhone,
        cartItems,
        totalPrice,
        address,
        status,
      } = updateData;

      let query = 'UPDATE orders SET ';
      const values = [];
      const fields = [];

      if (customerName !== undefined) {
        fields.push('customer_name = ?');
        values.push(customerName);
      }
      if (customerEmail !== undefined) {
        fields.push('customer_email = ?');
        values.push(customerEmail);
      }
      if (customerPhone !== undefined) {
        fields.push('customer_phone = ?');
        values.push(customerPhone);
      }
      if (cartItems !== undefined) {
        fields.push('items = ?');
        values.push(JSON.stringify(cartItems));
      }
      if (totalPrice !== undefined) {
        fields.push('total_price = ?');
        values.push(totalPrice);
      }
      if (address !== undefined) {
        fields.push('address = ?');
        values.push(address);
      }
      if (status !== undefined) {
        fields.push('status = ?');
        values.push(status);
      }

      if (fields.length === 0) {
        return false;
      }

      query += fields.join(', ') + ' WHERE id = ?';
      values.push(orderId);

      const [result] = await connection.execute(query, values);
      return result.affectedRows > 0;
    } finally {
      connection.release();
    }
  }

  // Delete order
  static async deleteOrder(orderId) {
    const connection = await pool.getConnection();
    try {
      const query = 'DELETE FROM orders WHERE id = ?';
      const [result] = await connection.execute(query, [orderId]);
      return result.affectedRows > 0;
    } finally {
      connection.release();
    }
  }

  // Search orders by customer email
  static async searchByEmail(email) {
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT 
          id,
          customer_name,
          customer_email,
          customer_phone,
          items,
          total_price,
          address,
          status,
          created_at
        FROM orders
        WHERE customer_email LIKE ?
        ORDER BY created_at DESC
      `;

      const [rows] = await connection.execute(query, [`%${email}%`]);
      // MySQL2 automatically parses JSON columns, so no need to parse again
      return rows.map((order) => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
      }));
    } finally {
      connection.release();
    }
  }

  // Get orders by status
  static async getByStatus(status) {
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT 
          id,
          customer_name,
          customer_email,
          customer_phone,
          items,
          total_price,
          address,
          status,
          created_at
        FROM orders
        WHERE status = ?
        ORDER BY created_at DESC
      `;

      const [rows] = await connection.execute(query, [status]);
      // MySQL2 automatically parses JSON columns, so no need to parse again
      return rows.map((order) => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
      }));
    } finally {
      connection.release();
    }
  }
}

module.exports = Order;
