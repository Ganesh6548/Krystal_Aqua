const Order = require('../models/Order');
const telegramService = require('../services/telegramService');
const { authenticate, requireRole } = require('../middleware/auth');
const { sanitizeObject, sanitizeString } = require('../utils/sanitize');

/**
 * REST CRUD Controller for Orders
 * Controllers are decision makers
 * They validate incoming data and call models to interact with database
 */

// ========================================
// CREATE - POST /api/orders
// ========================================
exports.create = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, cartItems, totalPrice, address, customerChatId } = sanitizeObject(req.body);

    // Validation
    if (!customerName || !customerPhone || !cartItems || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customerName, customerPhone, cartItems, totalPrice',
      });
    }

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart cannot be empty',
      });
    }

    // Create order
    const orderId = await Order.createOrder({
      customerName: sanitizeString(customerName),
      customerEmail: customerEmail || 'not-provided@example.com',
      customerPhone,
      cartItems,
      totalPrice,
      address: address || 'Not specified',
    });

    console.log(`📦 Order #${orderId} created successfully`);

    // Send notification to owner
    const telegramResult = await telegramService.sendOrderNotification({
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      cartItems,
      totalPrice,
      address,
    });

    if (telegramResult) {
      console.log(`✉️ Telegram message sent to owner for Order #${orderId}`);
    }

    // Send acknowledgement to customer (if Telegram chat ID provided)
    if (customerChatId) {
      const ackResult = await telegramService.sendCustomerAcknowledgement({
        orderId,
        customerName,
        cartItems,
        totalPrice,
        customerChatId,
      });

      if (ackResult) {
        console.log(`✉️ Telegram acknowledgement sent to customer for Order #${orderId}`);
      }
    } else {
      console.log(`ℹ️  No customer Telegram Chat ID provided for Order #${orderId}`);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId,
        customerName,
        customerEmail,
        totalPrice,
      },
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// ========================================
// READ SINGLE - GET /api/orders/:id
// ========================================
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    const order = await Order.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message,
    });
  }
};

// ========================================
// READ ALL - GET /api/orders
// ========================================
exports.getAll = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};

// ========================================
// UPDATE - PUT /api/orders/:id
// ========================================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = sanitizeObject(req.body);

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    // Authorization: require authentication to update
    if (!req.user) {
      // try to authenticate from header
      await new Promise((resolve) => authenticate(req, res, resolve));
      if (!req.user) return; // response already sent by authenticate
    }

    // Check if order exists
    const order = await Order.getOrderById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${id} not found`,
      });
    }

    // Update order
    const success = await Order.updateOrder(id, updateData);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update',
      });
    }

    console.log(`✏️ Order #${id} updated successfully`);

    // Get updated order
    const updatedOrder = await Order.getOrderById(id);

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: updatedOrder,
    });
  } catch (error) {
    console.error('❌ Error updating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message,
    });
  }
};

// ========================================
// UPDATE STATUS - PATCH /api/orders/:id/status
// ========================================
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = sanitizeObject(req.body);

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    // Authorization: only ADMIN can update status
    await new Promise((resolve) => authenticate(req, res, resolve));
    if (!req.user) return;
    if (req.user.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Forbidden' });

    // Check if order exists
    const order = await Order.getOrderById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${id} not found`,
      });
    }

    // Update status
    await Order.updateOrderStatus(id, status.toLowerCase());

    console.log(`📊 Order #${id} status updated to: ${status}`);

    // Get updated order
    const updatedOrder = await Order.getOrderById(id);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder,
    });
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message,
    });
  }
};

// ========================================
// DELETE - DELETE /api/orders/:id
// ========================================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    // Authorization: only ADMIN can delete
    await new Promise((resolve) => authenticate(req, res, resolve));
    if (!req.user) return;
    if (req.user.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Forbidden' });

    // Check if order exists
    const order = await Order.getOrderById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${id} not found`,
      });
    }

    // Delete order
    const deleted = await Order.deleteOrder(id);

    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete order',
      });
    }

    console.log(`🗑️ Order #${id} deleted successfully`);

    res.status(200).json({
      success: true,
      message: `Order #${id} deleted successfully`,
      data: {
        deletedOrderId: id,
        customerName: order.customer_name,
      },
    });
  } catch (error) {
    console.error('❌ Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: error.message,
    });
  }
};

// ========================================
// SEARCH - GET /api/orders/search/email
// ========================================
exports.searchByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email query parameter is required',
      });
    }

    const orders = await Order.searchByEmail(email);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error('❌ Error searching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search orders',
      error: error.message,
    });
  }
};

// ========================================
// FILTER BY STATUS - GET /api/orders/status/:status
// ========================================
exports.getByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const orders = await Order.getByStatus(status.toLowerCase());

    res.status(200).json({
      success: true,
      status,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error('❌ Error fetching orders by status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};
