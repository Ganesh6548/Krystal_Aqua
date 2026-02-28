# 📚 REST CRUD API Documentation

## Base URL
```
http://localhost:5000/api/orders
```

---

## 🟦 HTTP Methods & Status Codes

| Method | Action | Status Code |
|--------|--------|-------------|
| `POST` | Create | 201 Created |
| `GET` | Read | 200 OK |
| `PUT` | Update | 200 OK |
| `PATCH` | Partial Update | 200 OK |
| `DELETE` | Delete | 200 OK |

---

## 📋 API Endpoints

### 1️⃣ CREATE ORDER
**POST** `/api/orders`

**Description:** Create a new order (Place Order)

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
    }
  ],
  "totalPrice": 1000
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "totalPrice": 1000
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Missing required fields: customerName, customerPhone, cartItems, totalPrice"
}
```

---

### 2️⃣ READ ALL ORDERS
**GET** `/api/orders`

**Description:** Get all orders

**Query Parameters:** None

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "customer_phone": "9876543210",
      "items": [...],
      "total_price": 1000,
      "address": "123 Main St",
      "status": "pending",
      "created_at": "2024-02-27 10:30:00"
    },
    ...
  ]
}
```

---

### 3️⃣ READ SINGLE ORDER
**GET** `/api/orders/:id`

**Description:** Get a specific order by ID

**URL Parameters:**
- `id` (required): Order ID (integer)

**Example:** `GET /api/orders/1`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
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
    "address": "123 Main St",
    "status": "pending",
    "created_at": "2024-02-27 10:30:00"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Order #1 not found"
}
```

---

### 4️⃣ UPDATE ENTIRE ORDER
**PUT** `/api/orders/:id`

**Description:** Update all or some fields of an order

**URL Parameters:**
- `id` (required): Order ID

**Request Body (partial or full):**
```json
{
  "customerName": "Jane Doe",
  "customerEmail": "jane@example.com",
  "customerPhone": "9876543211",
  "address": "New Address",
  "status": "processing"
}
```

**Example:** `PUT /api/orders/1`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order updated successfully",
  "data": {
    "id": 1,
    "customer_name": "Jane Doe",
    "customer_email": "jane@example.com",
    "customer_phone": "9876543211",
    "items": [...],
    "total_price": 1000,
    "address": "New Address",
    "status": "processing",
    "created_at": "2024-02-27 10:30:00",
    "updated_at": "2024-02-27 11:45:00"
  }
}
```

---

### 5️⃣ UPDATE ORDER STATUS ONLY
**PATCH** `/api/orders/:id/status`

**Description:** Update only the order status

**URL Parameters:**
- `id` (required): Order ID

**Request Body:**
```json
{
  "status": "completed"
}
```

**Example:** `PATCH /api/orders/1/status`

**Valid Status Values:**
- `pending` (default)
- `processing`
- `completed`
- `cancelled`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "status": "completed",
    "updated_at": "2024-02-27 11:45:00"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: pending, processing, completed, cancelled"
}
```

---

### 6️⃣ DELETE ORDER
**DELETE** `/api/orders/:id`

**Description:** Delete an order permanently

**URL Parameters:**
- `id` (required): Order ID

**Example:** `DELETE /api/orders/1`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order #1 deleted successfully",
  "data": {
    "deletedOrderId": 1,
    "customerName": "John Doe"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Order #1 not found"
}
```

---

### 7️⃣ SEARCH BY EMAIL
**GET** `/api/orders/search/email`

**Description:** Search orders by customer email

**Query Parameters:**
- `email` (required): Customer email (partial match supported)

**Example:** `GET /api/orders/search/email?email=john`

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      ...
    },
    {
      "id": 2,
      "customer_name": "John Smith",
      "customer_email": "johnsmith@example.com",
      ...
    }
  ]
}
```

---

### 8️⃣ FILTER BY STATUS
**GET** `/api/orders/status/:status`

**Description:** Get all orders with a specific status

**URL Parameters:**
- `status` (required): Order status (pending, processing, completed, cancelled)

**Example:** `GET /api/orders/status/processing`

**Success Response (200):**
```json
{
  "success": true,
  "status": "processing",
  "count": 5,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "status": "processing",
      ...
    },
    ...
  ]
}
```

---

## 🧪 Testing Examples

### Using PowerShell / cURL

#### CREATE Order
```powershell
$body = @{
    customerName = "Test User"
    customerEmail = "test@example.com"
    customerPhone = "9999999999"
    address = "Test Address"
    cartItems = @(
        @{
            id = 1
            name = "Product"
            quantity = 2
            price = 100
        }
    )
    totalPrice = 200
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/orders" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

#### READ ALL Orders
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/orders" -Method GET
```

#### READ Single Order
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" -Method GET
```

#### UPDATE Order (PUT)
```powershell
$body = @{
    customerName = "Updated Name"
    status = "processing"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body
```

#### UPDATE Status (PATCH)
```powershell
$body = @{
    status = "completed"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1/status" `
  -Method PATCH `
  -ContentType "application/json" `
  -Body $body
```

#### DELETE Order
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/orders/1" -Method DELETE
```

#### SEARCH Orders
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/orders/search/email?email=john" -Method GET
```

#### FILTER by Status
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/orders/status/pending" -Method GET
```

---

## 📊 Database Operations Summary

| Operation | HTTP Method | Endpoint | Status |
|-----------|------------|----------|--------|
| Create | `POST` | `/api/orders` | 201 |
| Read All | `GET` | `/api/orders` | 200 |
| Read Single | `GET` | `/api/orders/:id` | 200 |
| Update | `PUT` | `/api/orders/:id` | 200 |
| Update Status | `PATCH` | `/api/orders/:id/status` | 200 |
| Delete | `DELETE` | `/api/orders/:id` | 200 |
| Search Email | `GET` | `/api/orders/search/email?email=...` | 200 |
| Filter Status | `GET` | `/api/orders/status/:status` | 200 |

---

## 🔄 Request/Response Flow

```
Client (Frontend/Postman)
  ↓
HTTP Request (POST/GET/PUT/PATCH/DELETE)
  ↓
Routes (Receptionist)
  ├─ Parses request
  └─ Calls appropriate controller
       ↓
    Controller (Decision Maker)
    ├─ Validates data
    ├─ Calls Model
    │    ↓
    │    Model (Database Expert)
    │    ├─ Executes SQL
    │    └─ Returns data
    └─ Builds response
       ↓
HTTP Response (JSON)
  ↓
Client receives response
```

---

## ✅ Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 5
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details"
}
```

---

## 🚨 Common Errors

| Status | Error | Solution |
|--------|-------|----------|
| 400 | Missing required fields | Check request body |
| 404 | Order not found | Verify order ID exists |
| 500 | Internal server error | Check server logs |
| 405 | Method not allowed | Use correct HTTP method |

---

## 💡 Best Practices

1. **Always validate before sending requests**
2. **Use correct HTTP methods** (GET for reading, POST for creating, PUT for updating, DELETE for removing)
3. **Check response status codes**
4. **Handle errors gracefully** on frontend
5. **Use PATCH for partial updates** instead of PUT when only changing one field
6. **Sanitize user input** on frontend before sending to API

---

## 🔗 Backward Compatibility

The old endpoint still works:
```
POST /api/orders/place-order  →  Maps to POST /api/orders/create
```

Both will work, but use the new REST conventions going forward.

---

**API is fully RESTful and production-ready!** ✅
