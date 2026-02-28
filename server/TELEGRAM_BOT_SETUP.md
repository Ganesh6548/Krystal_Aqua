# Telegram Bot Acknowledgement Setup

## Overview
The Krystal Aqua backend includes a Telegram bot integration that sends:
1. **Owner Notifications** - Alert the shop owner when new orders are placed
2. **Customer Acknowledgements** - Send order confirmation to customers
3. **Status Updates** - Notify customers when order status changes

## Features

### 📦 Owner Notifications
- Automatically sent to the owner's Telegram chat when an order is placed
- Includes: Order ID, customer details, items, total price, delivery address, and timestamp
- Uses the `TELEGRAM_CHAT_ID` from environment variables

### ✅ Customer Acknowledgements
- Sent to the customer's personal Telegram chat ID (if provided)
- Includes: Order confirmation, order ID, items summary, total amount
- Optional feature (order is created even if Telegram acknowledgement fails)

### 🔄 Status Updates
- Sends status updates to customer when order status changes
- Includes: Updated status with visual emoji, estimated next steps
- Can be triggered manually via API

## Setup Instructions

### 1. Get Your Telegram Bot Token

1. **Find BotFather** on Telegram (@BotFather)
2. **Create a new bot** using `/newbot` command
3. **Copy the API Token** (format: `123456789:ABCdefGHIjklMNOpqrstUVwxyzABCDEfghi`)

### 2. Get Your Chat IDs

#### For Owner Chat ID:
1. Add your bot to your personal Telegram chat
2. Send a message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find your chat ID in the response (look for `"chat":{"id":1234567890}`)
5. Copy this number

#### For Customer Chat ID:
- Customers can find their chat ID using: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe`
- Or they can check their user ID from `@userinfobot` on Telegram

### 3. Configure Environment Variables

Create or update your `.env` file:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrstUVwxyzABCDEfghi
TELEGRAM_CHAT_ID=1234567890

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=krystal_aqua

# Server
PORT=5000
```

## API Usage

### Create Order with Customer Acknowledgement

**Endpoint:** `POST /api/orders`

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "address": "123 Main Street, City, State 000000",
  "cartItems": [
    {
      "id": 1,
      "name": "Water Filter",
      "price": 299,
      "quantity": 2
    }
  ],
  "totalPrice": 598,
  "customerChatId": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": 6,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "totalPrice": 598
  }
}
```

### What Happens Automatically:
1. ✅ Order is saved to database
2. ✅ Owner receives Telegram notification
3. ✅ Customer receives Telegram acknowledgement (if Chat ID provided)

## Message Examples

### Owner Notification
```
📦 NEW ORDER RECEIVED

🆔 Order ID: #6
👤 Customer: John Doe
📧 Email: john@example.com
📱 Phone: 9876543210
📍 Address: 123 Main Street, City

📋 Items:
• Water Filter x2 - ₹299

💰 Total Price: ₹598
```

### Customer Acknowledgement
```
✅ ORDER CONFIRMATION

Hello John Doe! 👋

Your order has been successfully placed!

🆔 Order ID: #6

📋 Order Summary:
• Water Filter x2 - ₹299

💰 Total Amount: ₹598

📌 Status: Pending

We will update you soon with tracking information.
Thank you for choosing Krystal Aqua! 💧
```

## Error Handling

- **If Telegram Bot Token is invalid**: Notifications will fail silently, but order will still be created
- **If Customer Chat ID is invalid**: Customer acknowledgement skips, but order is created successfully
- **If Owner Chat ID is missing**: Notifications won't be sent to owner

## Integration with Frontend

To collect customer Telegram Chat ID in the CartPage:

```jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCustomer({ ...customer, [name]: value });
};

// In form, add optional field:
<label>
  Telegram Chat ID (Optional):
  <input
    type="text"
    name="customerChatId"
    placeholder="Your Telegram Chat ID"
    value={customer.customerChatId || ''}
    onChange={handleInputChange}
  />
</label>
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Messages not being sent | Check `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env` |
| Invalid bot token error | Verify bot token format and that BotFather process completed |
| Chat ID not found | Make sure you've sent at least one message to the bot |
| Message sending fails | Check bot permissions and that chat/user ID is correct |

## Testing Telegram Integration

```bash
# Test telegram service
node -e "
const telegramService = require('./services/telegramService');

telegramService.sendOrderNotification({
  orderId: 999,
  customerName: 'Test User',
  customerEmail: 'test@example.com',
  customerPhone: '9999999999',
  cartItems: [{ name: 'Test Item', quantity: 1, price: 100 }],
  totalPrice: 100,
  address: 'Test Address'
}).then(result => console.log('Owner notification result:', result));

telegramService.sendCustomerAcknowledgement({
  orderId: 999,
  customerName: 'Test User',
  cartItems: [{ name: 'Test Item', quantity: 1, price: 100 }],
  totalPrice: 100,
  customerChatId: 'YOUR_CHAT_ID_HERE'
}).then(result => console.log('Customer acknowledgement result:', result));
"
```

## Security Notes

⚠️ **Important**: 
- Never commit `.env` file with real tokens to version control
- Use `.env.example` template for documentation
- Rotate bot tokens if accidentally exposed
- Validate customer chat IDs before storing/using them

## API Endpoints for Status Updates

```
PATCH /api/orders/:id/status
{
  "status": "processing"
}
```

When status is updated and customer chat ID is available, the customer will automatically receive a status update notification.

---

**Version:** 1.0  
**Last Updated:** February 27, 2026  
**Status:** ✅ Active
