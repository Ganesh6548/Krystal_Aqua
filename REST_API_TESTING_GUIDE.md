# 🧪 REST CRUD API Testing Guide

## Prerequisites

✅ MySQL running (`Get-Service MySQL80` should show "Running")
✅ Backend dependencies installed (`npm install` in server folder)
✅ `.env` configured with correct credentials
✅ Servers started:
  - Frontend: `npm run dev` → http://localhost:5173
  - Backend: `cd server && npm run dev` → http://localhost:5000

---

## 🚀 Test Scenarios

### Test 1: Health Check
**Verify backend is running**

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
```

**Expected Response:**
```json
{
  "message": "Backend is running"
}
```

---

### Test 2: Create Order (POST)
**Create a new order**

```powershell
$body = @{
    customerName = "John Doe"
    customerEmail = "john@example.com"
    customerPhone = "9876543210"
    address = "123 Main Street, City, State 12345"
    cartItems = @(
        @{
            id = 1
            name = "Aqua Bottle 500ml"
            quantity = 2
            price = 500
        },
        @{
            id = 2
            name = "Water Filter"
            quantity = 1
            price = 1500
        }
    )
    totalPrice = 2500
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/orders" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$response | ConvertTo-Json -Depth 10
```

**Expected Response (201 Created):**
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

**Console Output (Backend):**
```
📦 Order #1 created successfully
✉️ Telegram message sent to owner for Order #1
```

---

### Test 3: Get All Orders (GET)
**Fetch all orders**

```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/orders" -Method GET
$response | ConvertTo-Json -Depth 10
```

**Expected Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "customer_phone": "9876543210",
      "items": [
        {
          "id": 1,
          "name": "Aqua Bottle 500ml",
          "quantity": 2,
          "price": 500
        }
      ],
      "total_price": 2500,
      "address": "123 Main Street",
      "status": "pending",
      "created_at": "2024-02-27T14:30:00.000Z"
    }
  ]
}
```

---

### Test 4: Get Single Order (GET)
**Fetch a specific order by ID**

```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" -Method GET
$response | ConvertTo-Json -Depth 10
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "items": [...],
    "status": "pending",
    "created_at": "2024-02-27T14:30:00.000Z"
  }
}
```

**If order doesn't exist (404 Not Found):**
```json
{
  "success": false,
  "message": "Order #999 not found"
}
```

---

### Test 5: Update Entire Order (PUT)
**Update multiple fields**

```powershell
$body = @{
    customerName = "Jane Doe"
    customerEmail = "jane@example.com"
    status = "processing"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body

$response | ConvertTo-Json -Depth 10
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Order updated successfully",
  "data": {
    "id": 1,
    "customer_name": "Jane Doe",
    "customer_email": "jane@example.com",
    "status": "processing",
    "updated_at": "2024-02-27T14:45:00.000Z"
  }
}
```

**Console Output:**
```
✏️ Order #1 updated successfully
```

---

### Test 6: Update Status Only (PATCH)
**Update just the status field**

```powershell
$body = @{
    status = "completed"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1/status" `
  -Method PATCH `
  -ContentType "application/json" `
  -Body $body

$response | ConvertTo-Json -Depth 5
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "id": 1,
    "status": "completed",
    "updated_at": "2024-02-27T14:50:00.000Z"
  }
}
```

**Valid Status Values:**
- `pending` (default)
- `processing`
- `completed`
- `cancelled`

**Invalid Status (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: pending, processing, completed, cancelled"
}
```

**Console Output:**
```
📊 Order #1 status updated to: completed
```

---

### Test 7: Delete Order (DELETE)
**Delete an order permanently**

```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" -Method DELETE
$response | ConvertTo-Json
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Order #1 deleted successfully",
  "data": {
    "deletedOrderId": 1,
    "customerName": "Jane Doe"
  }
}
```

**Console Output:**
```
🗑️ Order #1 deleted successfully
```

**If already deleted (404 Not Found):**
```json
{
  "success": false,
  "message": "Order #1 not found"
}
```

---

### Test 8: Search by Email (GET)
**Search orders by customer email**

```powershell
$response = Invoke-RestMethod `
  -Uri "http://localhost:5000/api/orders/search/email?email=john" `
  -Method GET

$response | ConvertTo-Json -Depth 10
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "customer_email": "john@example.com",
      ...
    },
    {
      "id": 3,
      "customer_email": "johnsmith@example.com",
      ...
    }
  ]
}
```

---

### Test 9: Filter by Status (GET)
**Get all orders with a specific status**

```powershell
$response = Invoke-RestMethod `
  -Uri "http://localhost:5000/api/orders/status/pending" `
  -Method GET

$response | ConvertTo-Json -Depth 10
```

**Expected Response:**
```json
{
  "success": true,
  "status": "pending",
  "count": 3,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "status": "pending",
      ...
    },
    ...
  ]
}
```

---

## 🔍 Common Test Scenarios

### Scenario 1: Full Order Lifecycle
```powershell
# 1. Create order
$create = POST /api/orders

# 2. View order
$read = GET /api/orders/1

# 3. Update it
$update = PUT /api/orders/1

# 4. Check all orders
$all = GET /api/orders

# 5. Update status
$status = PATCH /api/orders/1/status

# 6. Delete it
$delete = DELETE /api/orders/1

# 7. Verify it's gone
$verify = GET /api/orders/1  # Should return 404
```

---

### Scenario 2: Error Handling
```powershell
# Missing required fields
POST /api/orders { missing data }  # 400 Bad Request

# Invalid order ID
GET /api/orders/abc  # 400 Bad Request

# Order not found
GET /api/orders/999  # 404 Not Found

# Invalid status
PATCH /api/orders/1/status { status: "invalid" }  # 400
```

---

## 📊 HTTP Status Codes Summary

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET, PUT, PATCH, DELETE success |
| 201 | Created | POST success |
| 400 | Bad Request | Missing fields, invalid data |
| 404 | Not Found | Order doesn't exist |
| 500 | Server Error | Database error |

---

## 📝 Postman Collection

Create a Postman collection with:

1. **POST** Create Order → `POST /api/orders`
2. **GET** All Orders → `GET /api/orders`
3. **GET** Single Order → `GET /api/orders/{{orderId}}`
4. **PUT** Update Order → `PUT /api/orders/{{orderId}}`
5. **PATCH** Update Status → `PATCH /api/orders/{{orderId}}/status`
6. **DELETE** Delete Order → `DELETE /api/orders/{{orderId}}`
7. **GET** Search Email → `GET /api/orders/search/email?email={{email}}`
8. **GET** Filter Status → `GET /api/orders/status/{{status}}`

**Variables:**
- `{{baseUrl}}` = `http://localhost:5000/api/orders`
- `{{orderId}}` = `1` (for testing)
- `{{email}}` = `john` (partial search)
- `{{status}}` = `pending` (valid status)

---

## 🐛 Debugging Tips

1. **Check console logs** on backend for operation details
2. **Verify MySQL** is running before making requests
3. **Inspect response** JSON for error messages
4. **Check status codes** to identify issue type
5. **Test with Postman** before integrating with frontend
6. **Validate input data** matches expected format
7. **Check .env** for correct database credentials

---

## ✅ Test Checklist

- [ ] Health check responds
- [ ] Create order works (201)
- [ ] Get all orders works
- [ ] Get single order works
- [ ] Update entire order works
- [ ] Update status works (with validation)
- [ ] Delete order works
- [ ] Search by email works
- [ ] Filter by status works
- [ ] Error handling returns correct codes
- [ ] Telegram notification sent on create
- [ ] Order saved in MySQL database

---

## 🚀 Next Steps After Testing

1. ✅ All CRUD operations working
2. ✅ Telegram notifications sending
3. ✅ Database saving orders correctly
4. ✅ Frontend integration working
5. → Ready for production deployment!

---

**Test all endpoints and verify responses match expected outputs!** ✅
