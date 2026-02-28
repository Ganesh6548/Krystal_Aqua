# 🚀 Krystal Aqua REST API - Complete Setup & Testing Guide

## 📁 Backend Structure

```
server/
├── config/
│   └── database.js              (MySQL connection pool)
├── controllers/
│   └── orderController.js       (Business logic - validates & processes data)
├── models/
│   └── Order.js                 (SQL queries - interacts with database)
├── routes/
│   └── orderRoutes.js           (API endpoints)
├── services/
│   └── telegramService.js       (Telegram notifications)
├── database/
│   └── schema.sql               (Database tables definition)
├── init-db.js                   (Database initialization script)
├── test-db.js                   (Database connection tester)
├── server.js                    (Main server file)
├── .env                         (Environment variables - CREATE THIS)
├── .env.example                 (Template)
├── .gitignore
├── package.json
├── setup.bat                    (Windows setup script)
└── setup.sh                     (Linux/Mac setup script)
```

---

## ⚙️ Step-by-Step Setup

### Step 1: Verify MySQL is Running
```powershell
Get-Service mysql* | Select-Object Name, Status
```
Should show: `MySQL80  Running`

If not running:
```powershell
net start MySQL80
```

---

### Step 2: Configure Environment Variables

Edit `server/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=krystal_aqua
TELEGRAM_BOT_TOKEN=8472901389:AAE-0RGynIjnyF6JUHbXyT2ycj7ppf8FQYY
TELEGRAM_CHAT_ID=1899746772
PORT=5000
```

**Update `DB_PASSWORD` with your actual MySQL password!**

---

### 🤖 Optional: Telegram Bot Configuration

The system automatically sends notifications to the owner when orders are placed. For full setup:

1. **Get Bot Token from BotFather** (@BotFather on Telegram)
2. **Get Your Chat ID**: Send a message to your bot, then visit  
   `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. **Update `.env` with:**
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

For detailed Telegram setup, see: [TELEGRAM_BOT_SETUP.md](./TELEGRAM_BOT_SETUP.md)

---

### Step 3: Install Dependencies
```bash
cd server
npm install
```

---

### Step 4: Initialize Database
```bash
node init-db.js
```

This will:
- ✅ Create database `krystal_aqua`
- ✅ Create `orders` table
- ✅ Create `order_items` table
- ✅ Create `customers` table

**Expected Output:**
```
✅ Connected to MySQL

✅ Database "krystal_aqua" already exists

📋 Creating "orders" table...
✅ Orders table ready

📋 Creating "order_items" table...
✅ Order items table ready

📋 Creating "customers" table...
✅ Customers table ready

📊 Database Tables:
   ✓ customers
   ✓ orders
   ✓ order_items

✅ Database initialization completed successfully!
```

---

### Step 5: Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
✅ MySQL Database Connected Successfully
✅ Server running on http://localhost:5000
```

---

## 📊 Database Schema

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  items JSON,                    -- Array of cart items
  total_price DECIMAL(10,2),
  address TEXT,
  status ENUM('pending', 'processing', 'completed', 'cancelled'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Sample Order Data
```json
{
  "id": 1,
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "9876543210",
  "items": [
    {
      "id": 1,
      "name": "Aqua Bottle",
      "quantity": 2,
      "price": 500
    }
  ],
  "total_price": 1000,
  "address": "123 Main St, City",
  "status": "pending",
  "created_at": "2024-02-27 14:30:00"
}
```

---

## 🔗 API Endpoints

### 1️⃣ Place Order (with Telegram Acknowledgement)
**POST** `http://localhost:5000/api/orders`  
**Also accepts:** `http://localhost:5000/api/orders/place-order` (backward compatible)

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "address": "123 Main St, City, State 12345",
  "cartItems": [
    {
      "id": 1,
      "name": "Aqua Bottle 500ml",
      "quantity": 2,
      "price": 500
    },
    {
      "id": 2,
      "name": "Water Filter",
      "quantity": 1,
      "price": 1500
    }
  ],
  "totalPrice": 2500,
  "customerChatId": "1234567890"
}
```

**Parameters:**
- `customerName` (required) - Customer's full name
- `customerEmail` (optional) - Customer's email
- `customerPhone` (required) - Customer's phone number
- `address` (required) - Delivery address
- `cartItems` (required) - Array of items
- `totalPrice` (required) - Total order amount
- `customerChatId` (optional) - Customer's Telegram Chat ID for acknowledgement

**Success Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "totalPrice": 2500
  }
}
```

**Console Output:**
```
📦 Order #1 created successfully
✅ Telegram notification sent successfully
✉️ Telegram message sent to owner for Order #1
✅ Telegram acknowledgement sent to customer for Order #1
```

**Owner Telegram Notification:**
```
📦 NEW ORDER RECEIVED

🆔 Order ID: #1
👤 Customer: John Doe
📧 Email: john@example.com
📱 Phone: 9876543210
📍 Address: 123 Main St, City, State 12345

📋 Items:
• Aqua Bottle 500ml x2 - ₹500
• Water Filter x1 - ₹1500

💰 Total Price: ₹2500
```

**Customer Telegram Acknowledgement (if customerChatId provided):**
```
✅ ORDER CONFIRMATION

Hello John Doe! 👋

Your order has been successfully placed!

🆔 Order ID: #1

📋 Order Summary:
• Aqua Bottle 500ml x2 - ₹500
• Water Filter x1 - ₹1500

💰 Total Amount: ₹2500

📌 Status: Pending

We will update you soon with tracking information.
Thank you for choosing Krystal Aqua! 💧
```

---

### 2️⃣ Get Single Order
**GET** `http://localhost:5000/api/orders/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "9876543210",
    "items": [...],
    "total_price": 2500,
    "address": "123 Main St",
    "status": "pending",
    "created_at": "2024-02-27 14:30:00",
    "updated_at": "2024-02-27 14:30:00"
  }
}
```

---

### 3️⃣ Get All Orders
**GET** `http://localhost:5000/api/orders`

**Response:**
```json
{
  "success": true,
  "data": [
    { order 1 },
    { order 2 },
    { order 3 }
  ]
}
```

---

## 🧪 Testing the API

### Test 1: Health Check
```bash
curl http://localhost:5000/api/health
```

Expected: `{"message":"Backend is running"}`

---

### Test 2: Place Order (Using PowerShell)

```powershell
$body = @{
    customerName = "Test User"
    customerEmail = "test@example.com"
    customerPhone = "9999999999"
    address = "Test Address"
    cartItems = @(
        @{
            id = 1
            name = "Product 1"
            quantity = 2
            price = 100
        }
    )
    totalPrice = 200
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/orders/place-order" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

### Test 3: Get Orders
```bash
curl http://localhost:5000/api/orders
```

---

### Test 4: Get Specific Order
```bash
curl http://localhost:5000/api/orders/1
```

---

## 📱 Frontend Integration

### CartPage.jsx Implementation
```jsx
const placeOrder = async () => {
  const orderData = {
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    cartItems: cart,
    totalPrice: totalPrice,
    address: customer.address,
  };

  const response = await fetch('http://localhost:5000/api/orders/place-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();
  if (data.success) {
    console.log('Order placed! ID:', data.orderId);
  }
};
```

---

## 🔄 Data Flow Diagram

```
Frontend (React)
     ↓
     User fills form & clicks "Place Order"
     ↓
POST /api/orders/place-order
     ↓
Routes (Receptionist)
     ├─ Receives request
     └─ Passes to Controller
          ↓
      Controller (Decision Maker)
      ├─ Validates data
      ├─ Calls Model → Order.createOrder()
      │    ↓
      │    Model (Database Expert)
      │    ├─ Executes SQL INSERT
      │    └─ Saves to DB
      ├─ Calls Telegram Service
      │    ↓
      │    Sends notification to owner
      └─ Returns response
     ↓
Response with Order ID
     ↓
Frontend shows success message
```

---

## 🚨 Troubleshooting

### ❌ "Access denied for user 'root'@'localhost'"
- Check MySQL password in `.env`
- Verify MySQL service is running: `Get-Service MySQL80`
- Try connecting manually: `mysql -u root -p`

### ❌ "Cannot find module 'mysql2'"
- Run: `npm install` in `server` folder
- Check `node_modules` exists

### ❌ "EADDRINUSE: address already in use :::5000"
- Port 5000 is already in use
- Change PORT in `.env` to 5001, 5002, etc.

### ❌ "Telegram message not sending"
- Verify `TELEGRAM_BOT_TOKEN` in `.env`
- Verify `TELEGRAM_CHAT_ID` in `.env`
- Check console for error messages

### ❌ Database tables not created
- Run: `node init-db.js` again
- Check MySQL server is running
- Verify database credentials

---

## 📋 Architecture Explanation

### Routes (Receptionist)
- 👂 Listens for incoming requests
- 🎯 Routes them to appropriate controller
- 📤 Sends responses back to client

### Controllers (Decision Makers)
- ✅ Validates incoming data
- 🤔 Makes business logic decisions
- 📞 Calls models for database operations
- 📲 Calls services for external integrations

### Models (Database Experts)
- 🏗️ Know table structure
- 📝 Write SQL queries
- 💾 Execute CRUD operations
- 🔄 Return formatted data

### Services (External Integrations)
- 🌐 Handle external APIs
- 📲 Telegram notifications
- 💳 Payment processing (future)
- 📧 Email sending (future)

### Database (Data Storage)
- 💾 Persists data permanently
- 🔍 Retrieves data on demand
- 🔄 Updates records
- 🗑️ Deletes old data

---

## ✅ Checklist Before Going Live

- [ ] MySQL database created
- [ ] `.env` configured with correct credentials
- [ ] `node init-db.js` runs successfully
- [ ] Backend server starts without errors
- [ ] Frontend server running on `http://localhost:5173`
- [ ] API endpoints tested manually
- [ ] Telegram notifications working
- [ ] Orders saved to database
- [ ] CORS configured (no browser errors)

---

## 🎉 Next Steps

1. ✅ Backend running on `http://localhost:5000`
2. ✅ Frontend running on `http://localhost:5173`
3. ✅ Test placing an order from CartPage
4. ✅ Verify order appears in MySQL database
5. ✅ Check Telegram notification received

**You're all set! 🚀**
