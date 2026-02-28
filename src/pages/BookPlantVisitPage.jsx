// src/pages/BookPlantVisitPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const BookPlantVisitPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    date: "",
    purpose: "",
    visitors: "1-5"
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:5000/api/plant-visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone,
          preferred_date: formData.date,
          num_visitors: formData.visitors,
          purpose: formData.purpose,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `✅ Your plant visit request has been submitted successfully! Visit Request ID: #${data.visitId}`,
        });
        // Reset form
        setFormData({
          name: "",
          organization: "",
          email: "",
          phone: "",
          date: "",
          purpose: "",
          visitors: "1-5"
        });
      } else {
        setMessage({
          type: "error",
          text: `❌ ${data.message || "Failed to submit request"}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "❌ Failed to connect to server. Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Banner Section - Matching BottlesChangePage format */}
      <section className="banner-section">
        <img 
          src={`${import.meta.env.BASE_URL}About%20page/Book%20a%20plat%20visit.png`}
          className="banner-image"
          style={{ filter: 'brightness(1)' }} // Full brightness
        />
       
      </section>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-content">
          <div className="breadcrumb-links">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Book a Plant Visit</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <h1 className="page-title">Visit Our Water Purification Facility</h1>
        
        {/* Introduction */}
        <div className="content-section">
          <h2 className="section-title">Why Visit Our Plant?</h2>
          <p className="section-content">
            We believe in complete transparency. Our plant visit program allows customers, partners, 
            and community members to witness firsthand our state-of-the-art purification processes, 
            quality control measures, and commitment to sustainability.
          </p>
        </div>

        {/* What You'll Experience */}
        <div className="content-section">
          <h2 className="section-title">What You'll Experience</h2>
          <div className="grid-container">
            <div className="grid-card">
              <h3 className="card-title">🔬 Purification Process Tour</h3>
              <p>See our multi-stage purification system in action - from source to bottle.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">🏭 Manufacturing Unit</h3>
              <p>Witness our automated bottling and packaging processes with strict hygiene standards.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">✅ Quality Control Lab</h3>
              <p>Learn about our rigorous testing procedures ensuring every drop meets quality standards.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">♻️ Sustainability Initiatives</h3>
              <p>Explore our water conservation, recycling, and environmental protection measures.</p>
            </div>
          </div>
        </div>

        {/* Who Should Visit */}
        <div className="content-section">
          <h2 className="section-title">Who Should Visit?</h2>
          <p className="section-content">
            Our plant visits are suitable for:
          </p>
          <ul className="feature-list">
            <li><strong>Customers</strong> - See where your drinking water comes from</li>
            <li><strong>Business Partners</strong> - Corporate clients and bulk buyers</li>
            <li><strong>Students & Educational Groups</strong> - Educational tours for schools and colleges</li>
            <li><strong>Environmental Enthusiasts</strong> - Learn about sustainable water management</li>
            <li><strong>Distributors & Retailers</strong> - Understand our supply chain and quality assurance</li>
          </ul>
        </div>

        {/* Visit Details */}
        <div className="content-section">
          <h2 className="section-title">Visit Details</h2>
          <div className="grid-container">
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏰</div>
              <h3 className="card-title">Duration</h3>
              <p><strong>1.5 - 2 hours</strong><br/>Complete guided tour</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👥</div>
              <h3 className="card-title">Group Size</h3>
              <p><strong>5-25 visitors</strong><br/>Custom arrangements available</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📅</div>
              <h3 className="card-title">Schedule</h3>
              <p><strong>Weekdays: 10 AM - 4 PM</strong><br/>Advance booking required</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚗</div>
              <h3 className="card-title">Location</h3>
              <p><strong>Krystal Aqua Plant</strong><br/>[Your complete address here]</p>
            </div>
          </div>
        </div>

{/* Booking Form */}
<div className="content-section book-visit-section">
  <h2 className="book-visit-title">Book Your Visit</h2>

  <div className="book-visit-card">
    {/* Success/Error Message */}
    {message.text && (
      <div
        style={{
          padding: "15px 20px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
          color: message.type === "success" ? "#155724" : "#721c24",
          border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
          fontWeight: "500"
        }}
      >
        {message.text}
      </div>
    )}

    <form onSubmit={handleSubmit} className="visit-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="organization">Organization / Institution</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter organization name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Preferred Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="visitors">Number of Visitors *</label>
          <select
            id="visitors"
            name="visitors"
            value={formData.visitors}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="1-5">1–5 People</option>
            <option value="6-10">6–10 People</option>
            <option value="11-20">11–20 People</option>
            <option value="21-30">21–30 People</option>
            <option value="30+">30+ People</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="purpose">Purpose of Visit *</label>
        <textarea
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="Please describe the purpose of your visit"
          rows="4"
        />
      </div>

      <div className="form-submit">
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "⏳ Submitting..." : "📤 Submit Visit Request"}
        </button>
        <p className="form-note">
          * Your request will be saved in our database and the owner will be notified via Telegram.
        </p>
      </div>
    </form>
  </div>
</div>


        {/* Additional Information */}
        <div className="content-section">
          <h2 className="section-title">Important Information</h2>
          <div style={{ background: '#f0f9ff', padding: '30px', borderRadius: '15px', marginTop: '20px' }}>
            <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>📋 Guidelines & Safety:</h3>
            <ul className="feature-list">
              <li>All visitors must carry valid ID proof</li>
              <li>Comfortable clothing and closed-toe shoes recommended</li>
              <li>Photography may be restricted in certain areas</li>
              <li>Visitors under 18 must be accompanied by adults</li>
              <li>COVID-19 safety protocols followed as per government guidelines</li>
              <li>Booking confirmation will be sent via email/Telegram</li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Need More Information?</h2>
            <p className="cta-text">
              For urgent inquiries or special arrangements, contact our plant visit coordinator:
            </p>
            <div className="contact-info">
              <p><strong>📞 Phone:</strong> +91-XXXX-XXXXXX</p>
              <p><strong>📧 Email:</strong> visits@krystalaqua.com</p>
              <p><strong>⏰ Office Hours:</strong> Monday to Saturday, 9 AM to 6 PM</p>
            </div>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/about" className="cta-button">
                <span>🏢 Learn About Us</span>
              </Link>
              <Link to="/bottles-for-change" className="cta-button" style={{ background: 'linear-gradient(135deg, #128C7E, #0a3d62)' }}>
                <span>♻️ Our Sustainability</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPlantVisitPage;