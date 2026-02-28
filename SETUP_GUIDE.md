# 🚀 Krystal Aqua - Full Setup Guide

## Project Structure

```
Krystal aqua/
├── public/                    (Static files)
├── src/                       (React Frontend)
│   ├── pages/
│   │   └── CartPage.jsx       (Updated with Place Order button)
│   └── ...
├── server/                    (Node.js Backend - NEW)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── database/
│   ├── config/
│   ├── .env                   (You need to create this)
│   ├── server.js
│   └── package.json
├── vite.config.js
└── package.json
```

---

## ⚙️ Setup Steps

### Step 1: Frontend Setup (React)
The frontend is already set up. Just start it:

```bash
npm run dev
```
Frontend runs on: **http://localhost:5173**

---

### Step 2: Backend Setup (Node.js)

#### 2a. Install Backend Dependencies
```bash
cd server
npm install
```

#### 2b. Create MySQL Database
1. Open MySQL/phpMyAdmin
2. Create a new database called `krystal_aqua`
3. Run the SQL schema:
```bash
mysql -u root -p krystal_aqua < database/schema.sql
```

#### 2c. Configure Environment Variables
1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Edit `server/.env` with your details:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=krystal_aqua

TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id

PORT=5000
```

**How to get Telegram credentials:**
- **Bot Token**: Message `@BotFather` on Telegram → `/newbot` → Copy token
- **Chat ID**: Message `@userinfobot` on Telegram → It shows your ID

#### 2d. Start Backend Server
```bash
npm run dev
```
Backend runs on: **http://localhost:5000**

---

## 🔄 Data Flow When Order is Placed

```
 Frontend                          Backend
 ├─ User fills form                │
 ├─ Clicks "Place Order"           │
 └─ Sends POST request ────────────► Routes (Receptionist)
                                    ├─ Receives request
                                    └─ passes to Controller (Decision Maker)
                                       ├─ Validates data
                                       ├─ Calls Model (Database Expert)
                                       │  └─ Executes SQL INSERT
                                       │     └─ Saves to Database
                                       └─ Calls Telegram Service
                                          └─ Sends notification to owner
                                          
 ◄──────── Response with Order ID ──┤
 ├─ Shows success message
 └─ Redirects to home page
```

---

## 📱 What Happens When Order is Placed

1. **Frontend**: User enters name, email, phone, address, and clicks "Place Order"
2. **POST Request**: Sends cart items and customer details to backend
3. **Backend Routes**: Receives request at `/api/orders/place-order`
4. **Controller**: 
   - Validates all required fields
   - Calls Model to save order
   - Calls Telegram service
5. **Model**: 
   - Executes SQL INSERT query
   - Saves order to `orders` table
6. **Database**: Stores order permanently
7. **Telegram Service**: 
   - Formats order details
   - Sends message to owner
   - Logs success/failure in console
8. **Response**: Backend sends orderId back to frontend
9. **Frontend**: Shows success message and redirects to home

---

## 📊 Database Schema

### Orders Table
```
id (Primary Key)
customer_name
customer_email
customer_phone
items (JSON - contains cart items)
total_price
address
status (pending, processing, completed, cancelled)
created_at
updated_at
```

### Sample Order Data Stored
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

## 🧪 Testing the System

### Test 1: Check Frontend is Running
```
Visit: http://localhost:5173/
```

### Test 2: Check Backend is Running
```
Visit: http://localhost:5000/api/health
Should return: {"message": "Backend is running"}
```

### Test 3: Test Order Placement
1. Go to http://localhost:5173/ → Shop
2. Add products to cart
3. Go to Cart
4. Fill in customer details
5. Click "Place Order"
6. Check:
   - ✅ Success message with Order ID
   - ✅ Backend console shows "Order #X created successfully"
   - ✅ Backend console shows "Telegram message sent to owner"
   - ✅ Owner receives Telegram notification
   - ✅ MySQL database has new order record

---

## 🚨 Troubleshooting

### Backend won't start
- Is Node.js installed? `node --version`
- Are all dependencies installed? `npm install` in server folder

### Port 5000 already in use
- Change PORT in `.env` file

### MySQL connection error
- Is MySQL running?
- Check DB_HOST, DB_USER, DB_PASSWORD in `.env`
- Did you create the database `krystal_aqua`?

### Telegram message not sending
- Check TELEGRAM_BOT_TOKEN is correct
- Check TELEGRAM_CHAT_ID is correct
- Is the bot a member of the chat?

### CORS errors
- Frontend (port 5173) and Backend (port 5000) are different
- CORS middleware in `server.js` handles this

### Cart data not sending
- Check browser console (F12) for errors
- Check backend console for request details
- Verify API_BASE_URL in CartPage.jsx is correct

---

## 📚 Architecture Explanation

### Routes (Receptionist)
- Receives incoming requests
- Determines which controller to call
- Sends response back to client

### Controllers (Decision Makers)
- Validates incoming data
- Decides what operations to perform
- Calls models to interact with database
- Calls services for external integrations

### Models (Database Experts)
- Know table structure and SQL queries
- Execute CRUD operations
- Handle all database interactions
- Return formatted data

### Services (External Integrations)
- Handle external APIs (Telegram, payment gateways, etc.)
- Encapsulate business logic
- Used by controllers

### Database
- Stores all order data
- Persists information permanently
- Can be queried anytime

---

## 📝 API Documentation

### Place Order
```
POST http://localhost:5000/api/orders/place-order

Request:
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "address": "123 Main St",
  "cartItems": [
    {
      "id": 1,
      "name": "Product",
      "quantity": 2,
      "price": 100
    }
  ],
  "totalPrice": 200
}

Response:
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": 1
}
```

### Get Order
```
GET http://localhost:5000/api/orders/1

Response:
{
  "success": true,
  "data": { order details }
}
```

### Get All Orders
```
GET http://localhost:5000/api/orders

Response:
{
  "success": true,
  "data": [ all orders ]
}
```

---

## ✨ Features Implemented

✅ Frontend form for customer details
✅ POST request to place orders
✅ Order validation
✅ MySQL database storage
✅ Telegram notifications to owner
✅ Console logging of operations
✅ Error handling
✅ CORS configuration
✅ Environment variables
✅ MVC architecture

---

**Ready to start? Run both servers and test it out!** 🎉
