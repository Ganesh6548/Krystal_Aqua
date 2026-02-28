# 🚀 REST CRUD API - Quick Reference

## Backend API Endpoints

### Base URL
```
http://localhost:5000/api/orders
```

---

## 📝 CRUD Operations

### CREATE (POST)
```
POST /api/orders
```
Creates a new order and sends Telegram notification to owner.

**Frontend Call:**
```javascript
const orderData = {
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "9876543210",
  cartItems: [{ id: 1, name: "Product", quantity: 2, price: 100 }],
  totalPrice: 200,
  address: "123 Main St"
};

const response = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
});

const result = await response.json();
console.log('Order ID:', result.data.orderId);
```

---

### READ ALL (GET)
```
GET /api/orders
```
Fetches all orders with pagination info.

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/orders" -Method GET
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [ { order1 }, { order2 }, ... ]
}
```

---

### READ SINGLE (GET)
```
GET /api/orders/:id
```
Fetches a specific order by ID.

**Example:**
```
GET http://localhost:5000/api/orders/1
```

---

### UPDATE (PUT)
```
PUT /api/orders/:id
```
Updates multiple fields in an order.

**Example:**
```powershell
$body = @{
  status = "processing"
  customerName = "Jane Doe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body
```

---

### UPDATE STATUS (PATCH)
```
PATCH /api/orders/:id/status
```
Updates only the order status (pending, processing, completed, cancelled).

**Example:**
```powershell
$body = @{ status = "completed" } | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1/status" `
  -Method PATCH `
  -ContentType "application/json" `
  -Body $body
```

---

### DELETE (DELETE)
```
DELETE /api/orders/:id
```
Permanently deletes an order.

**Example:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" -Method DELETE
```

---

### SEARCH (GET)
```
GET /api/orders/search/email?email=john
```
Search orders by customer email (partial match).

---

### FILTER (GET)
```
GET /api/orders/status/pending
```
Get all orders with a specific status.

**Valid Status Values:**
- `pending` (default)
- `processing`
- `completed`
- `cancelled`

---

## 🔄 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, PUT, PATCH, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

---

## 📊 Database Model

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  items JSON,              -- Cart items as JSON array
  total_price DECIMAL,
  address TEXT,
  status ENUM(...),        -- pending, processing, completed, cancelled
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 🔗 Controller Methods Mapping

| HTTP Method | Endpoint | Controller Method |
|-------------|----------|-------------------|
| POST | `/` | `create()` |
| GET | `/` | `getAll()` |
| GET | `/:id` | `getById()` |
| PUT | `/:id` | `update()` |
| PATCH | `/:id/status` | `updateStatus()` |
| DELETE | `/:id` | `delete()` |
| GET | `/search/email` | `searchByEmail()` |
| GET | `/status/:status` | `getByStatus()` |

---

## ✅ Complete Workflow

```
1. User adds items to cart
   ↓
2. User fills customer details (name, email, phone, address)
   ↓
3. User clicks "Place Order"
   ↓
4. Frontend sends POST /api/orders
   ↓
5. Backend receives request
   ├─ Validates data
   ├─ Inserts into MySQL
   ├─ Sends Telegram notification
   └─ Returns Order ID
   ↓
6. Frontend shows success message
   ↓
7. User can later:
   ├─ View order: GET /api/orders/:id
   ├─ Check all orders: GET /api/orders
   ├─ Update order: PUT /api/orders/:id
   ├─ Update status: PATCH /api/orders/:id/status
   └─ Delete order: DELETE /api/orders/:id
```

---

## 🚀 Starting the Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```
→ Runs on http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```
→ Runs on http://localhost:5000

---

## 📂 File Structure

```
server/
├── config/database.js              MySQL connection
├── routes/orderRoutes.js           API endpoints (REST)
├── controllers/orderController.js  CRUD operations
├── models/Order.js                 Database queries
├── services/telegramService.js     Telegram integration
└── server.js                       Main entry point
```

---

## 🧪 Testing Tools

- **Postman** - GUI REST client
- **cURL** - Command-line HTTP client
- **PowerShell** - Windows native HTTP client
- **Thunder Client** - VS Code extension

---

## 📌 Important Notes

1. **All endpoints return JSON** with `success` and `data` fields
2. **Errors include detailed messages** for debugging
3. **Order status is validated** - only accepts valid statuses
4. **Email search is case-insensitive** partial match
5. **Telegram notifications** sent automatically on order creation
6. **Frontend automatically redirects** after successful order

---

## 💡 Tips

- Use **POST** to create new orders
- Use **GET** to retrieve data
- Use **PUT** to update entire order
- Use **PATCH** to update only status
- Use **DELETE** to remove orders
- Check console logs for debugging
- Verify MySQL is running before starting backend
- Frontend uses `.env` from server for API URL

---

**REST API is production-ready!** ✅
