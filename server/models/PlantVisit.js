const db = require('../config/database');

/**
 * Plant Visit Model
 * Handles database operations for plant visit bookings
 */

class PlantVisit {
  /**
   * Create a new plant visit booking
   */
  static async createVisit(visitData) {
    try {
      const {
        name,
        organization,
        email,
        phone,
        preferred_date,
        num_visitors,
        purpose,
      } = visitData;

      const query = `
        INSERT INTO plant_visits 
        (name, organization, email, phone, preferred_date, num_visitors, purpose, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
      `;

      const [result] = await db.query(query, [
        name,
        organization,
        email,
        phone,
        preferred_date,
        num_visitors,
        purpose,
      ]);

      return result.insertId;
    } catch (error) {
      console.error('Database error in createVisit:', error);
      throw error;
    }
  }

  /**
   * Get all plant visit bookings
   */
  static async getAllVisits() {
    try {
      const query = 'SELECT * FROM plant_visits ORDER BY created_at DESC';
      const [results] = await db.query(query);
      return results;
    } catch (error) {
      console.error('Database error in getAllVisits:', error);
      throw error;
    }
  }

  /**
   * Get plant visit by ID
   */
  static async getVisitById(id) {
    try {
      const query = 'SELECT * FROM plant_visits WHERE id = ?';
      const [results] = await db.query(query, [id]);
      return results[0];
    } catch (error) {
      console.error('Database error in getVisitById:', error);
      throw error;
    }
  }

  /**
   * Update plant visit status
   */
  static async updateStatus(id, status) {
    try {
      const query = 'UPDATE plant_visits SET status = ?, updated_at = NOW() WHERE id = ?';
      const [result] = await db.query(query, [status, id]);
      return result;
    } catch (error) {
      console.error('Database error in updateStatus:', error);
      throw error;
    }
  }

  /**
   * Delete plant visit
   */
  static async deleteVisit(id) {
    try {
      const query = 'DELETE FROM plant_visits WHERE id = ?';
      const [result] = await db.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Database error in deleteVisit:', error);
      throw error;
    }
  }
}

module.exports = PlantVisit;
