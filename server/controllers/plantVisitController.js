const PlantVisit = require('../models/PlantVisit');
const telegramService = require('../services/telegramService');
const { authenticate, requireRole } = require('../middleware/auth');
const { sanitizeObject, sanitizeString } = require('../utils/sanitize');

/**
 * Plant Visit Controller
 * Handles plant visit request operations
 */

// ========================================
// CREATE - POST /api/plant-visits
// ========================================
exports.create = async (req, res) => {
  try {
    const { name, organization, email, phone, preferred_date, num_visitors, purpose } = sanitizeObject(req.body);

    // Validation
    if (!name || !email || !phone || !preferred_date || !num_visitors || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone, preferred_date, num_visitors, purpose',
      });
    }

    // Create plant visit booking
    const visitId = await PlantVisit.createVisit({
      name: sanitizeString(name),
      organization: organization || 'Not specified',
      email,
      phone,
      preferred_date,
      num_visitors,
      purpose,
    });

    console.log(`🏭 Plant visit request #${visitId} created successfully`);

    // Send notification to owner via Telegram
    const telegramResult = await telegramService.sendPlantVisitNotification({
      visitId,
      name,
      organization,
      email,
      phone,
      preferred_date,
      num_visitors,
      purpose,
    });

    return res.status(201).json({
      success: true,
      message: 'Plant visit request submitted successfully',
      visitId,
      telegramNotified: telegramResult.success,
    });
  } catch (error) {
    console.error('Error creating plant visit:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating plant visit request',
      error: error.message,
    });
  }
};

// ========================================
// GET ALL - GET /api/plant-visits
// ========================================
exports.getAll = async (req, res) => {
  try {
    const visits = await PlantVisit.getAllVisits();
    return res.status(200).json({
      success: true,
      data: visits,
      count: visits.length,
    });
  } catch (error) {
    console.error('Error fetching plant visits:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching plant visits',
      error: error.message,
    });
  }
};

// ========================================
// GET BY ID - GET /api/plant-visits/:id
// ========================================
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const visit = await PlantVisit.getVisitById(id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: 'Plant visit not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: visit,
    });
  } catch (error) {
    console.error('Error fetching plant visit:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching plant visit',
      error: error.message,
    });
  }
};

// ========================================
// UPDATE STATUS - PATCH /api/plant-visits/:id/status
// ========================================
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = sanitizeObject(req.body);

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    // Authorization: only ADMIN can update
    await new Promise((resolve) => authenticate(req, res, resolve));
    if (!req.user) return;
    if (req.user.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Forbidden' });

    const result = await PlantVisit.updateStatus(id, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Plant visit not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Plant visit status updated successfully',
      id,
      status,
    });
  } catch (error) {
    console.error('Error updating plant visit status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating plant visit status',
      error: error.message,
    });
  }
};

// ========================================
// DELETE - DELETE /api/plant-visits/:id
// ========================================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Authorization: only ADMIN can delete
    await new Promise((resolve) => authenticate(req, res, resolve));
    if (!req.user) return;
    if (req.user.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Forbidden' });

    const result = await PlantVisit.deleteVisit(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Plant visit not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Plant visit deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Error deleting plant visit:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting plant visit',
      error: error.message,
    });
  }
};
