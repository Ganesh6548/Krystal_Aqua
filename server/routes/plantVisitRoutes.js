const express = require('express');
const plantVisitController = require('../controllers/plantVisitController');

const router = express.Router();

/**
 * Plant Visit Routes
 * Base URL: /api/plant-visits
 */

// POST - Create new plant visit booking
router.post('/', plantVisitController.create);

// GET - Get all plant visits
router.get('/', plantVisitController.getAll);

// GET - Get specific plant visit by ID
router.get('/:id', plantVisitController.getById);

// PATCH - Update plant visit status
router.patch('/:id/status', plantVisitController.updateStatus);

// DELETE - Delete plant visit
router.delete('/:id', plantVisitController.delete);

module.exports = router;
