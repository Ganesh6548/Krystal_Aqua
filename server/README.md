# Krystal Aqua Backend Setup Guide

## Architecture Overview

```
App.jsx (Frontend)
  ↓
Routes (Receptionist - receives requests)
  ↓
Controllers (Decision Makers - validate data)
  ↓
Models (Database experts - SQL queries)
  ↓
Database (Store, retrieve, update)
```

## Setup Instructions

### 1. Create MySQL Database
```sql
CREATE DATABASE krystal_aqua;
USE krystal_aqua;
```

Then run the SQL schema:
```bash
mysql -u root -p krystal_aqua < server/database/schema.sql
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your details:
```bash
cp .env.example .env
```

Edit `.env` with:
- **DB_HOST**: localhost
- **DB_USER**: your MySQL username (usually `root`)
- **DB_PASSWORD**: your MySQL password
- **DB_NAME**: krystal_aqua
- **TELEGRAM_BOT_TOKEN**: Your Telegram bot token
- **TELEGRAM_CHAT_ID**: Your Telegram Chat ID (where order notifications go)

### 4. Get Telegram Bot Token & Chat ID

**Create Bot:**
1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow instructions
3. Get your `TELEGRAM_BOT_TOKEN`

**Get Chat ID:**
1. Search for `@userinfobot` on Telegram
2. Send any message, it will show your Chat ID
3. Use that as `TELEGRAM_CHAT_ID`

### 5. Start Backend Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 6. Test Health Check
```bash
curl http://localhost:5000/api/health
```

## Backend Folder Structure

```
server/
├── config/
│   └── database.js          (Database connection pool)
├── controllers/
│   └── orderController.js   (Decision makers - validate & process)
├── models/
│   └── Order.js             (Database experts - SQL queries)
├── routes/
│   └── orderRoutes.js       (Receptionist - routes requests)
├── services/
│   └── telegramService.js   (External service - Telegram API)
├── database/
│   └── schema.sql           (Database schema)
├── .env.example             (Environment variables template)
├── server.js                (Main server file)
└── package.json
```

## API Endpoints

### Place Order
**POST** `http://localhost:5000/api/orders/place-order`

Request body:
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "address": "123 Main St, City",
  "cartItems": [
    {
      "id": 1,
      "name": "Product Name",
      "quantity": 2,
      "price": 100
    }
  ],
  "totalPrice": 200
}
```

Response:
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": 1
}
```

### Get Order
**GET** `http://localhost:5000/api/orders/1`

### Get All Orders
**GET** `http://localhost:5000/api/orders`

## How It Works

1. **Frontend (React)**: User fills order form and clicks "Place Order"
2. **Routes**: POST request sent to `/api/orders/place-order`
3. **Controller**: Validates data → Calls Model → Calls Telegram Service
4. **Model**: Executes SQL INSERT query
5. **Database**: Stores order
6. **Telegram Service**: Sends notification to owner
7. **Console**: Logs success/failure messages
8. **Response**: Sends orderId back to frontend

## Troubleshooting

- **Connection refused**: Is MySQL running?
- **Telegram message failed**: Check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
- **Database error**: Run the schema.sql file again
- **CORS error**: Frontend and backend are on different ports - CORS middleware is configured

