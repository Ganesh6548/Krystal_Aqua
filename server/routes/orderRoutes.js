const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

/**
 * REST CRUD Routes for Orders
 * Routes act as receptionists
 * They receive requests and pass them to controllers for processing
 */

// ========================================
// CREATE - POST /api/orders
// ========================================
router.post('/', orderController.create);

// Backward compatibility for old endpoint
router.post('/place-order', orderController.create);

// ========================================
// READ - GET /api/orders
// ========================================
router.get('/', orderController.getAll);

// ========================================
// READ BY STATUS - GET /api/orders/status/:status
// ========================================
router.get('/status/:status', orderController.getByStatus);

// ========================================
// SEARCH BY EMAIL - GET /api/orders/search?email=...
// ========================================
router.get('/search/email', orderController.searchByEmail);

// ========================================
// READ SINGLE - GET /api/orders/:id
// ========================================
router.get('/:id', orderController.getById);

// ========================================
// UPDATE - PUT /api/orders/:id
// ========================================
router.put('/:id', orderController.update);

// ========================================
// UPDATE STATUS - PATCH /api/orders/:id/status
// ========================================
router.patch('/:id/status', orderController.updateStatus);

// ========================================
// DELETE - DELETE /api/orders/:id
// ========================================
router.delete('/:id', orderController.delete);

module.exports = router;
