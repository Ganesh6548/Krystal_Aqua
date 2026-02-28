// src/pages/AboutPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const AboutPage = () => {
  return (
    <div>
      {/* Banner Section - Updated to match BottlesChangePage format */}
      <section className="banner-section">
        <img 
          src={`${import.meta.env.BASE_URL}About%20page/About%20us.png`} 
          alt="About Krystal Aqua" 
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
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <h1 className="page-title">Our Story & Commitment</h1>
        
        {/* Introduction */}
        <div className="content-section">
          <h2 className="section-title">Who We Are</h2>
          <p className="section-content">
            Krystal Aqua is a trusted packaged drinking water brand dedicated to delivering pure,
            safe, and refreshing water to homes, offices, and businesses. We believe that access
            to clean drinking water is essential, and we work every day to ensure quality in
            every drop we deliver.
          </p>
          <p className="section-content">
            Founded with a vision to provide accessible, high-quality drinking water, we combine
            traditional values of trust with modern purification technology to serve communities
            with excellence.
          </p>
        </div>

        {/* Our Mission & Vision */}
        <div className="content-section">
          <h2 className="section-title">Our Mission & Vision</h2>
          <div className="grid-container">
            <div className="grid-card">
              <h3 className="card-title">🎯 Our Mission</h3>
              <p>To provide 100% pure, safe, and accessible drinking water through sustainable practices, ensuring health and hydration for every customer.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">👁️ Our Vision</h3>
              <p>To be the most trusted water brand, recognized for quality, transparency, and commitment to community well-being.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">💎 Our Values</h3>
              <p>Purity, Trust, Sustainability, Innovation, and Customer Care at the heart of everything we do.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">🤝 Our Promise</h3>
              <p>Every bottle delivers crystal-clear water that meets the highest standards of quality and safety.</p>
            </div>
          </div>
        </div>

        {/* Our Process */}
        <div className="content-section">
          <h2 className="section-title">Our Purification Process</h2>
          <p className="section-content">
            Our water undergoes advanced purification processes and strict quality checks to meet
            hygiene and safety standards. From sourcing to bottling and delivery, every step is
            handled with care, responsibility, and transparency.
          </p>
          <div className="grid-container">
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💧</div>
              <h3 className="card-title">Source Selection</h3>
              <p>Carefully selected natural water sources with optimal mineral composition</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔬</div>
              <h3 className="card-title">Multi-Stage Purification</h3>
              <p>RO, UV, and ozonation processes ensuring complete purification</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
              <h3 className="card-title">Quality Testing</h3>
              <p>Regular lab tests for pH, TDS, and microbiological parameters</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏭</div>
              <h3 className="card-title">Hygienic Bottling</h3>
              <p>Automated, contamination-free bottling in controlled environments</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="content-section">
          <h2 className="section-title">Why Choose Krystal Aqua?</h2>
          <ul className="feature-list">
            <li><strong>💯 100% Pure Water:</strong> No additives, preservatives, or artificial minerals</li>
            <li><strong>🔒 Safety First:</strong> Meets BIS and FSSAI standards for drinking water</li>
            <li><strong>🚚 Reliable Delivery:</strong> Timely service for homes and businesses</li>
            <li><strong>🌱 Eco-Friendly:</strong> Sustainable practices and recycling initiatives</li>
            <li><strong>💰 Affordable Quality:</strong> Premium water at competitive prices</li>
            <li><strong>📞 Customer Support:</strong> Responsive service and easy ordering</li>
          </ul>
        </div>

        {/* Certifications & Standards */}
        <div className="content-section">
          <h2 className="section-title">Certifications & Standards</h2>
          <div style={{ background: '#f0f9ff', padding: '30px', borderRadius: '15px', marginTop: '20px' }}>
            <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>📋 Quality Assurance:</h3>
            <ul className="feature-list">
              <li>FSSAI Licensed & Certified</li>
              <li>BIS Standard Compliant (IS 14543:2016)</li>
              <li>Regular Third-Party Laboratory Testing</li>
              <li>GMP & Hygienic Manufacturing Practices</li>
              <li>ISO Standards for Quality Management</li>
            </ul>
          </div>
        </div>

        {/* Community & Sustainability */}
        <div className="content-section">
          <h2 className="section-title">Beyond Business</h2>
          <p className="section-content">
            At Krystal Aqua, we believe in giving back to the community and protecting our environment.
            Our sustainability initiatives extend beyond providing clean water to include:
          </p>
          <div className="grid-container">
            <div className="grid-card" style={{ background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
              <h3 className="card-title">🏫 Community Programs</h3>
              <p>Providing clean water to schools, hospitals, and community centers</p>
            </div>
            <div className="grid-card" style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
              <h3 className="card-title">♻️ Bottle Recycling</h3>
              <p>Promoting plastic waste management through our "Bottles for Change" program</p>
            </div>
            <div className="grid-card" style={{ background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
              <h3 className="card-title">💧 Water Conservation</h3>
              <p>Implementing water-saving technologies in our production process</p>
            </div>
          </div>
        </div>

        {/* Closing Message */}
        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Join Us in Our Journey</h2>
            <p className="cta-text">
              Every bottle of Krystal Aqua represents our commitment to purity, health, and trust.
              We're not just selling water - we're delivering peace of mind, one drop at a time.
            </p>
            <p className="cta-text" style={{ fontStyle: 'italic', marginTop: '20px' }}>
              "Pure water shouldn't be a luxury. It should be accessible, affordable, and assured."
            </p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" className="cta-button">
                <span>🛒 Shop Our Products</span>
              </Link>
              <Link to="/vision-mission" className="cta-button" style={{ background: 'linear-gradient(135deg, #0a3d62, #128C7E)' }}>
                <span>🌍 Vision & Mission</span>
              </Link>
              <Link to="/book-plant-visit" className="cta-button" style={{ background: 'linear-gradient(135deg, #4a148c, #7b1fa2)' }}>
                <span>🏭 Visit Our Plant</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="content-section" style={{ marginTop: '40px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            padding: '30px',
            borderRadius: '15px'
          }}>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: '#0a3d62', marginBottom: '10px' }}>5000+</h3>
              <p>Happy Customers</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: '#0a3d62', marginBottom: '10px' }}>100%</h3>
              <p>Quality Satisfaction</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: '#0a3d62', marginBottom: '10px' }}>24/7</h3>
              <p>Delivery Support</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: '#0a3d62', marginBottom: '10px' }}>♻️</h3>
              <p>Sustainable Practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;