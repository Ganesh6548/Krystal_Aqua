# 🚀 Quick Start Guide

## One-Time Setup

### 1. Update `.env` file
Edit `server/.env` and set your MySQL password:
```
DB_PASSWORD=your_mysql_password
```

### 2. Initialize Database
```bash
cd server
npm install
node init-db.js
```

---

## Running the Project

### Terminal 1: Frontend
```bash
npm run dev
```
→ Opens on **http://localhost:5173**

### Terminal 2: Backend
```bash
cd server
npm run dev
```
→ Runs on **http://localhost:5000**

---

## Test the System

1. Go to **http://localhost:5173** → Shop
2. Add products to cart
3. Go to **Cart**
4. Fill customer details
5. Click **"📦 Place Order"**
6. Check:
   - ✅ Order ID shown
   - ✅ Backend console shows order created
   - ✅ Telegram message received
   - ✅ Data in MySQL database

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/CartPage.jsx` | Frontend - Place Order button |
| `server/server.js` | Backend entry point |
| `server/routes/orderRoutes.js` | API endpoints |
| `server/controllers/orderController.js` | Business logic |
| `server/models/Order.js` | Database operations |
| `server/services/telegramService.js` | Telegram notifications |
| `server/.env` | Environment variables |
| `server/init-db.js` | Database setup |

---

## 🔗 API Endpoint

**Place Order:**
```
POST http://localhost:5000/api/orders/place-order
```

**Get All Orders:**
```
GET http://localhost:5000/api/orders
```

**Get Order by ID:**
```
GET http://localhost:5000/api/orders/1
```

---

## 📚 Full Documentation
See `server/API_DOCUMENTATION.md` for complete details.

---

## ✨ Features

✅ React frontend with cart system
✅ Node.js/Express backend API
✅ MySQL database for orders
✅ Telegram notifications
✅ Order status tracking
✅ CORS enabled
✅ Error handling
✅ Environment configuration

---

Ready? Start both servers and test! 🎉
