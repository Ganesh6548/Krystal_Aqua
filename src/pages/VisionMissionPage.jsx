// src/pages/VisionMissionPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const VisionMissionPage = () => {
  return (
    <div>
      {/* Banner Section - Updated with image */}
      <section className="banner-section">
        <img 
          src={`${import.meta.env.BASE_URL}About%20page/20260227_233710_0000.png`} 
          alt="Vision, Mission & Values" 
          className="banner-image"
        />
        <div className="banner-overlay"></div>
        <div className="banner-content">
       
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-content">
          <div className="breadcrumb-links">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Vision, Mission & Values</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <h1 className="page-title">Our Guiding Principles & Core Beliefs</h1>
       
        {/* Introduction */}
        <div className="content-section">
          <p className="section-content">
            At Krystal Aqua, our Vision, Mission, and Values form the foundation of everything we do. 
            They guide our decisions, shape our actions, and define our commitment to delivering 
            pure water with integrity and purpose.
          </p>
        </div>

        {/* Vision Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔭</div>
            <h2 className="section-title">Our Vision</h2>
          </div>
          <div className="content-with-image">
            <div className="image-card">
              <img
                src={`${import.meta.env.BASE_URL}About%20page/Our%20vision.png`}
                alt="Our Vision"
                className="card-image"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            <div className="content-text">
              <p className="section-content">
                To become the most trusted and preferred drinking water brand, recognized nationally 
                for our unwavering commitment to purity, innovation, and sustainability.
              </p>
              <div style={{ 
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', 
                padding: '25px', 
                borderRadius: '12px', 
                marginTop: '20px' 
              }}>
                <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>What Our Vision Means:</h3>
                <ul className="feature-list">
                  <li>Setting new standards in water purity and safety</li>
                  <li>Building lasting relationships based on trust and reliability</li>
                  <li>Pioneering sustainable practices in the water industry</li>
                  <li>Expanding access to clean drinking water across communities</li>
                  <li>Innovating continuously to meet evolving customer needs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🎯</div>
            <h2 className="section-title">Our Mission</h2>
          </div>
          <div className="content-with-image reverse">
            <div className="content-text">
              <p className="section-content">
                To consistently deliver 100% pure, safe, and refreshing drinking water through 
                advanced technology, rigorous quality control, and exceptional customer service.
              </p>
              <div className="grid-container mission-cards">
                <div className="grid-card">
                  <h3 className="card-title">💧 Purity First</h3>
                  <p>Implement multi-stage purification ensuring every drop meets highest standards</p>
                </div>
                <div className="grid-card">
                  <h3 className="card-title">✅ Quality Assurance</h3>
                  <p>Maintain strict quality protocols at every production stage</p>
                </div>
                <div className="grid-card">
                  <h3 className="card-title">🚚 Reliable Service</h3>
                  <p>Ensure timely delivery and responsive customer support</p>
                </div>
                <div className="grid-card">
                  <h3 className="card-title">🌍 Sustainable Impact</h3>
                  <p>Promote environmental responsibility and community well-being</p>
                </div>
              </div>
            </div>
            <div className="image-card">
              <img
                src={`${import.meta.env.BASE_URL}About%20page/Mission.png`}
                alt="Our Mission"
                className="card-image"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">💎</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="content-with-image">
            <div className="image-card">
              <img
                src={`${import.meta.env.BASE_URL}About%20page/Our%20value.png`}
                alt="Our Values"
                className="card-image"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            <div className="content-text">
              <p className="section-content">
                Our values are the ethical compass that guides every decision we make and every 
                action we take. They define who we are and how we serve our customers.
              </p>
              
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon">💧</div>
                  <h3 className="card-title">Purity & Excellence</h3>
                  <p>Uncompromising commitment to quality in every bottle we produce</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🤝</div>
                  <h3 className="card-title">Integrity & Trust</h3>
                  <p>Transparent operations and honest communication with all stakeholders</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">❤️</div>
                  <h3 className="card-title">Customer Focus</h3>
                  <p>Putting customer needs and satisfaction at the center of everything</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">♻️</div>
                  <h3 className="card-title">Sustainability</h3>
                  <p>Responsible practices that protect our environment for future generations</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🚀</div>
                  <h3 className="card-title">Innovation</h3>
                  <p>Continuous improvement and adoption of advanced technologies</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🤲</div>
                  <h3 className="card-title">Community Care</h3>
                  <p>Contributing positively to the communities we serve</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">📜</div>
            <h2 className="section-title">Our Commitment to You</h2>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', 
            padding: '40px', 
            borderRadius: '15px',
            marginTop: '20px'
          }}>
            <div className="commitment-content">
              <p className="section-content" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                "We pledge to uphold our Vision, live our Mission, and honor our Values in every 
                interaction. From the moment water enters our facility to the time it reaches 
                your home, we are committed to excellence, transparency, and your complete 
                satisfaction."
              </p>
              <div style={{ 
                textAlign: 'center', 
                marginTop: '30px',
                padding: '20px',
                borderTop: '2px dashed #dee2e6'
              }}>
                <p style={{ fontStyle: 'italic', color: '#0a3d62' }}>
                  <strong>Krystal Aqua Promise:</strong> Pure water. Pure commitment. Every time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">See Our Principles in Action</h2>
            <p className="cta-text">
              Discover how our Vision, Mission, and Values translate into real-world practices 
              and customer experiences.
            </p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/about" className="cta-button">
                <span>🏢 Our Story</span>
              </Link>
              <Link to="/bottles-for-change" className="cta-button" style={{ background: 'linear-gradient(135deg, #0a3d62, #128C7E)' }}>
                <span>♻️ Sustainability</span>
              </Link>
              <Link to="/book-plant-visit" className="cta-button" style={{ background: 'linear-gradient(135deg, #4a148c, #7b1fa2)' }}>
                <span>🏭 Visit Plant</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionPage;