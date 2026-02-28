const axios = require('axios');
require('dotenv').config();

/**
 * Telegram Service
 * Handles sending notifications to the owner and acknowledgements to customers
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

/**
 * Send order notification to owner
 */
exports.sendOrderNotification = async (orderData) => {
  try {
    const {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      cartItems,
      totalPrice,
      address,
    } = orderData;

    // Format items list
    const itemsList = cartItems
      .map((item) => `• ${item.name} x${item.quantity} - ₹${item.price}`)
      .join('\n');

    // Create message for owner
    const message = `
📦 *NEW ORDER RECEIVED*

🆔 Order ID: #${orderId}
👤 Customer: ${customerName}
📧 Email: ${customerEmail}
📱 Phone: ${customerPhone}
📍 Address: ${address}

📋 Items:
${itemsList}

💰 Total Price: ₹${totalPrice}

---
Place Order Time: ${new Date().toLocaleString()}
    `.trim();

    // Send to Telegram (owner)
    const response = await axios.post(TELEGRAM_API_URL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    });

    console.log('✅ Telegram notification sent to owner');
    console.log(`Message ID: ${response.data.result.message_id}`);

    return response.data.ok;
  } catch (error) {
    console.error('❌ Failed to send Telegram notification to owner:', error.message);
    return false;
  }
};

/**
 * Send order acknowledgement to customer via Telegram
 */
exports.sendCustomerAcknowledgement = async (orderData) => {
  try {
    const {
      orderId,
      customerName,
      cartItems,
      totalPrice,
      customerChatId,
    } = orderData;

    // If no customer chat ID provided, log but don't fail
    if (!customerChatId) {
      console.log('⚠️  No customer Telegram Chat ID provided - skipping customer acknowledgement');
      return false;
    }

    // Format items list
    const itemsList = cartItems
      .map((item) => `• ${item.name} x${item.quantity} - ₹${item.price}`)
      .join('\n');

    // Create acknowledgement message for customer
    const message = `
✅ *ORDER CONFIRMATION*

Hello ${customerName}! 👋

Your order has been successfully placed!

🆔 Order ID: #${orderId}

📋 Order Summary:
${itemsList}

💰 Total Amount: ₹${totalPrice}

📌 Status: Pending

We will update you soon with tracking information.
Thank you for choosing Krystal Aqua! 💧

---
Order Time: ${new Date().toLocaleString()}
    `.trim();

    // Send acknowledgement to customer
    const response = await axios.post(TELEGRAM_API_URL, {
      chat_id: customerChatId,
      text: message,
      parse_mode: 'Markdown',
    });

    console.log('✅ Telegram acknowledgement sent to customer');
    console.log(`Message ID: ${response.data.result.message_id}`);

    return response.data.ok;
  } catch (error) {
    console.error('⚠️  Failed to send Telegram acknowledgement to customer:', error.message);
    // Don't return false - order is still valid even if telegram fails
    return false;
  }
};

/**
 * Send order status update to customer
 */
exports.sendStatusUpdate = async (orderId, customerChatId, newStatus) => {
  try {
    if (!customerChatId) {
      console.log('⚠️  No customer Telegram Chat ID - skipping status update');
      return false;
    }

    const statusEmoji = {
      pending: '⏳',
      processing: '🔄',
      completed: '✅',
      cancelled: '❌',
    };

    const statusText = {
      pending: 'Pending',
      processing: 'Processing',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };

    const message = `
${statusEmoji[newStatus] || '📦'} *ORDER STATUS UPDATE*

Order #${orderId} status has been updated to: *${statusText[newStatus]}*

${newStatus === 'completed' ? 'Thank you for your order! 🎉' : 'We are working on your order...'}

---
Updated at: ${new Date().toLocaleString()}
    `.trim();

    const response = await axios.post(TELEGRAM_API_URL, {
      chat_id: customerChatId,
      text: message,
      parse_mode: 'Markdown',
    });

    console.log(`✅ Status update sent to customer - Order #${orderId} → ${newStatus}`);
    return response.data.ok;
  } catch (error) {
    console.error('⚠️  Failed to send status update:', error.message);
    return false;
  }
};

/**
 * Send plant visit booking notification to owner
 */
exports.sendPlantVisitNotification = async (visitData) => {
  try {
    const {
      visitId,
      name,
      organization,
      email,
      phone,
      preferred_date,
      num_visitors,
      purpose,
    } = visitData;

    // Create message for owner
    const message = `
🏭 *PLANT VISIT REQUEST RECEIVED*

🆔 Visit Request ID: #${visitId}
👤 Name: ${name}
🏢 Organization: ${organization}
📧 Email: ${email}
📱 Phone: ${phone}
📅 Preferred Date: ${preferred_date}
👥 Number of Visitors: ${num_visitors}
🎯 Purpose: ${purpose}

📋 Status: Pending Confirmation

---
Request submitted at: ${new Date().toLocaleString()}
    `.trim();

    // Send to Telegram (owner)
    const response = await axios.post(TELEGRAM_API_URL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    });

    console.log('✅ Plant visit notification sent to owner');
    console.log(`Message ID: ${response.data.result.message_id}`);

    return {
      success: true,
      messageId: response.data.result.message_id,
    };
  } catch (error) {
    console.error('❌ Failed to send plant visit notification:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};
