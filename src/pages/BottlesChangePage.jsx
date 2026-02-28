// src/pages/BottlesChangePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const BottlesChangePage = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner-section">
        <img 
          src={`${import.meta.env.BASE_URL}About%20page/Bottle%20for%20change.png`} 
          alt="Bottles for Change" 
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
            <span>Bottles for Change</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <h1 className="page-title">Our Sustainability Initiative</h1>
        
        {/* Introduction */}
        <div className="content-section">
          <h2 className="section-title">Introduction</h2>
          <p className="section-content">
            At Krystal Aqua, we believe responsibility doesn't end with delivering pure water — 
            it continues with protecting our planet. Bottles for Change is our initiative to promote 
            responsible usage, recycling, and sustainability through every bottle we produce.
          </p>
        </div>

        {/* Our Commitment */}
        <div className="content-section">
          <h2 className="section-title">Our Commitment</h2>
          <div className="grid-container">
            <div className="grid-card">
              <h3 className="card-title">🔄 Encourage Reuse & Recycling</h3>
              <p>Promoting the reuse of plastic bottles and proper recycling practices.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">🌍 Reduce Environmental Impact</h3>
              <p>Minimizing our ecological footprint through responsible packaging solutions.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">📢 Promote Awareness</h3>
              <p>Educating communities about plastic waste management and environmental protection.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">💚 Support a Greener Future</h3>
              <p>Contributing to a cleaner, greener, and healthier environment for future generations.</p>
            </div>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="content-section">
          <h2 className="section-title">Why It Matters</h2>
          <p className="section-content">
            Every plastic bottle, when reused or recycled properly, helps to:
          </p>
          <ul className="feature-list">
            <li>Reduce pollution in our oceans and landfills</li>
            <li>Save natural resources and energy</li>
            <li>Protect water bodies and ecosystems</li>
            <li>Build a sustainable future for the next generation</li>
            <li>Create circular economy opportunities</li>
          </ul>
          <p className="section-content">
            Plastic waste is a global challenge, and we're committed to being part of the solution.
          </p>
        </div>

        {/* How You Can Be Part of the Change */}
        <div className="content-section">
          <h2 className="section-title">How You Can Be Part of the Change</h2>
          <div className="grid-container">
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>♻️</div>
              <h3 className="card-title">Reuse</h3>
              <p>Reuse Krystal Aqua bottles whenever possible for storage or other purposes.</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🗑️</div>
              <h3 className="card-title">Recycle Properly</h3>
              <p>Dispose bottles responsibly in designated recycling bins.</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📢</div>
              <h3 className="card-title">Spread Awareness</h3>
              <p>Educate friends and family about plastic recycling importance.</p>
            </div>
            <div className="grid-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌱</div>
              <h3 className="card-title">Support Eco-Friendly Practices</h3>
              <p>Choose sustainable alternatives in daily life whenever possible.</p>
            </div>
          </div>
        </div>

        {/* Our Initiatives */}
        <div className="content-section">
          <h2 className="section-title">Our Ongoing Initiatives</h2>
          <div style={{ background: '#f0f9ff', padding: '30px', borderRadius: '15px', marginTop: '20px' }}>
            <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>📊 What We're Doing:</h3>
            <ul className="feature-list">
              <li>Using recycled PET material in our bottles where possible</li>
              <li>Partnering with local recycling facilities and NGOs</li>
              <li>Conducting community awareness programs</li>
              <li>Implementing eco-friendly packaging alternatives</li>
              <li>Tracking and reducing our carbon footprint</li>
            </ul>
          </div>
        </div>

        {/* Closing Message */}
        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Together, We Can Make a Difference</h2>
            <p className="cta-text">
              Small actions lead to big change. With Bottles for Change, every bottle becomes 
              a step toward a cleaner planet and a sustainable tomorrow.
            </p>
            <p className="cta-text" style={{ fontStyle: 'italic', marginTop: '20px' }}>
              "Every drop counts, every bottle matters."
            </p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" className="cta-button">
                <span>🛒 Shop Responsibly</span>
              </Link>
              <Link to="/book-plant-visit" className="cta-button" style={{ background: 'linear-gradient(135deg, #0a3d62, #128C7E)' }}>
                <span>🏭 Visit Our Plant</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottlesChangePage;