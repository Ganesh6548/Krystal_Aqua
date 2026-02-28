// src/pages/TermsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const TermsPage = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner-section">
        <img 
          src="\About page\Privacy.png" 
          alt="Terms & Conditions" 
          className="banner-image"
        />
        <div className="banner-overlay"></div>
      </section>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-content">
          <div className="breadcrumb-links">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <h1 className="page-title">Terms & Conditions</h1>
        
        {/* Introduction */}
        <div className="content-section">
          <p className="section-content">
            Welcome to Krystal Aqua. These Terms and Conditions ("Terms") govern your access to and use of our website, 
            products, and services. By accessing or using Krystal Aqua, you agree to be bound by these Terms. 
            If you do not agree to any part of these Terms, please do not use our services.
          </p>
        </div>

        {/* 1. Acceptance of Terms */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">✅</div>
            <h2 className="section-title">1. Acceptance of Terms</h2>
          </div>
          <p className="section-content">
            By accessing or using the Krystal Aqua website, placing an order, or purchasing our products, 
            you acknowledge that you have read, understood, and agree to comply with these Terms and Conditions. 
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting 
            to the website. Your continued use of our services constitutes your acceptance of any modifications.
          </p>
        </div>

        {/* 2. Product Information & Ordering */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">📦</div>
            <h2 className="section-title">2. Product Information & Ordering</h2>
          </div>
          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
            <ul className="feature-list">
              <li><strong>Product Accuracy:</strong> We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, or error-free.</li>
              <li><strong>Order Confirmation:</strong> All orders are subject to acceptance and confirmation by Krystal Aqua. We reserve the right to refuse or cancel any order.</li>
              <li><strong>Pricing:</strong> Prices are subject to change without notice. Taxes, if applicable, will be added to your order total.</li>
              <li><strong>Availability:</strong> Products are available while quantities last. In case of unavailable items, we will notify you promptly.</li>
            </ul>
          </div>
        </div>

        {/* 3. Delivery & Shipping */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🚚</div>
            <h2 className="section-title">3. Delivery & Shipping</h2>
          </div>
          <div className="grid-container">
            <div className="grid-card">
              <h3 className="card-title">📍 Delivery Areas</h3>
              <p>We deliver to specified areas within our service region. Delivery timelines are estimates and not guaranteed.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">⏰ Delivery Timeline</h3>
              <p>Deliveries typically occur within 3-5 business days from order confirmation, subject to local conditions.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">💰 Shipping Costs</h3>
              <p>Shipping charges will be calculated and displayed before order confirmation. Free delivery may apply to bulk orders.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">📞 Delivery Issues</h3>
              <p>Report any delivery issues within 24 hours of receiving your order via our contact channels.</p>
            </div>
          </div>
        </div>

        {/* 4. Payment & Transactions */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">💳</div>
            <h2 className="section-title">4. Payment & Transactions</h2>
          </div>
          <p className="section-content">
            We accept various payment methods including credit cards, debit cards, and digital wallets. 
            All payments are processed securely. By providing payment information, you authorize Krystal Aqua 
            to charge the specified amount to your account. Payment details are encrypted and protected. 
            You are responsible for maintaining the confidentiality of your payment information.
          </p>
        </div>

        {/* 5. Returns & Refunds */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">↩️</div>
            <h2 className="section-title">5. Returns & Refunds</h2>
          </div>
          <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
            <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>Return Policy:</h3>
            <ul className="feature-list">
              <li>Products must be returned within 7 days of delivery in original condition.</li>
              <li>Refunds are processed within 5-7 business days after inspection.</li>
              <li>Damaged or contaminated products may be replaced at no cost.</li>
              <li>Return shipping costs are borne by the customer unless the product is defective.</li>
              <li>Refunds will be credited to the original payment method.</li>
            </ul>
          </div>
        </div>

        {/* 6. Product Quality & Safety */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">✓</div>
            <h2 className="section-title">6. Product Quality & Safety</h2>
          </div>
          <p className="section-content">
            All Krystal Aqua products undergo rigorous testing and quality checks to ensure they meet 
            Indian water safety standards and international quality benchmarks. We comply with all relevant 
            food and water safety regulations. However, we do not guarantee that products are completely error-free 
            or will meet all user expectations. Consumers should report any quality issues immediately.
          </p>
        </div>

        {/* 7. Intellectual Property Rights */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">©️</div>
            <h2 className="section-title">7. Intellectual Property Rights</h2>
          </div>
          <p className="section-content">
            All content on this website, including text, graphics, logos, images, and software, 
            is the property of Krystal Aqua or its content suppliers and is protected by international copyright laws. 
            You may not reproduce, distribute, modify, or transmit any content without express written permission from Krystal Aqua.
          </p>
        </div>

        {/* 8. Limitation of Liability */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">⚖️</div>
            <h2 className="section-title">8. Limitation of Liability</h2>
          </div>
          <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
            <p className="section-content">
              To the fullest extent permitted by law, Krystal Aqua shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of our products or services, 
              including but not limited to loss of profits, data, or business interruption. Our total liability 
              shall not exceed the amount paid by you for the product.
            </p>
          </div>
        </div>

        {/* 9. User Conduct & Prohibited Activities */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🚫</div>
            <h2 className="section-title">9. User Conduct & Prohibited Activities</h2>
          </div>
          <p className="section-content">You agree not to:</p>
          <ul className="feature-list">
            <li>Engage in any illegal or unauthorized activities</li>
            <li>Harass, abuse, or threaten any individual or organization</li>
            <li>Reverse engineer, decompile, or attempt to derive the source code of our website</li>
            <li>Use automated tools or bots to scrape data from our website</li>
            <li>Post false, misleading, or defamatory content</li>
            <li>Attempt to gain unauthorized access to our systems or databases</li>
            <li>Use our services for commercial purposes without authorization</li>
          </ul>
        </div>

        {/* 10. Disclaimer of Warranties */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">⚠️</div>
            <h2 className="section-title">10. Disclaimer of Warranties</h2>
          </div>
          <p className="section-content">
            Krystal Aqua provides products and services on an "AS IS" and "AS AVAILABLE" basis. 
            We make no warranties, express or implied, regarding the fitness, merchantability, or suitability 
            of our products for any particular purpose. We do not guarantee uninterrupted or error-free service.
          </p>
        </div>

        {/* 11. Privacy & Data Protection */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔒</div>
            <h2 className="section-title">11. Privacy & Data Protection</h2>
          </div>
          <p className="section-content">
            Your privacy is important to us. Please refer to our <Link to="/privacy-policy" style={{ color: '#0a3d62', fontWeight: 'bold' }}>Privacy Policy</Link> for detailed information 
            on how we collect, use, and protect your personal information. By using our services, 
            you consent to the collection and processing of your data as described in our Privacy Policy.
          </p>
        </div>

        {/* 12. Third-Party Links */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔗</div>
            <h2 className="section-title">12. Third-Party Links</h2>
          </div>
          <p className="section-content">
            Our website may contain links to third-party websites. We are not responsible for the content, 
            accuracy, or practices of external websites. Your access to third-party sites is at your own risk. 
            We recommend reviewing the terms and privacy policies of any third-party sites before using them.
          </p>
        </div>

        {/* 13. Termination of Access */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔐</div>
            <h2 className="section-title">13. Termination of Access</h2>
          </div>
          <p className="section-content">
            We reserve the right to suspend or terminate your access to our website and services at any time, 
            without notice or liability, for any reason, including violation of these Terms. Upon termination, 
            all rights granted to you shall immediately cease.
          </p>
        </div>

        {/* 14. Dispute Resolution */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">⚔️</div>
            <h2 className="section-title">14. Dispute Resolution</h2>
          </div>
          <p className="section-content">
            Any disputes arising from these Terms or your use of our services shall be resolved through 
            mutual negotiation. If negotiation fails, disputes shall be subject to the jurisdiction of 
            the courts in [Your City/State], in accordance with Indian law.
          </p>
        </div>

        {/* 15. Contact Information */}
        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Questions About Our Terms?</h2>
            <p className="cta-text">
              If you have any questions or concerns regarding these Terms and Conditions, 
              please contact us using the information below:
            </p>
            <div className="contact-info">
              <p><strong>📞 Phone:</strong> +91-XXXX-XXXXXX</p>
              <p><strong>📧 Email:</strong> support@krystalaqua.com</p>
              <p><strong>⏰ Support Hours:</strong> Monday to Saturday, 9 AM to 6 PM</p>
              <p><strong>📍 Address:</strong> [Your Company Address]</p>
            </div>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/privacy-policy" className="cta-button">
                <span>🔒 Privacy Policy</span>
              </Link>
              <Link to="/" className="cta-button" style={{ background: 'linear-gradient(135deg, #128C7E, #0a3d62)' }}>
                <span>🏠 Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            <strong>Last Updated:</strong> February 27, 2026<br/>
            These Terms and Conditions are effective immediately and apply to all users of Krystal Aqua services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;