// src/pages/PrivacyPolicyPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const PrivacyPolicyPage = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner-section">
        <img 
          src={`${import.meta.env.BASE_URL}About%20page/Privacy.png`} 
          alt="Privacy Policy" 
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
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <h1 className="page-title">Privacy Policy</h1>
        
        {/* Introduction */}
        <div className="content-section">
          <p className="section-content">
            At Krystal Aqua, we are committed to protecting your privacy and ensuring transparency in how we collect, 
            use, and safeguard your personal information. This Privacy Policy outlines our practices regarding data collection, 
            usage, storage, and your rights as a user of our website and services.
          </p>
        </div>

        {/* 1. Information We Collect */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">📋</div>
            <h2 className="section-title">1. Information We Collect</h2>
          </div>
          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
            <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Personal Information:</h3>
            <ul className="feature-list">
              <li><strong>Contact Details:</strong> Name, email address, phone number</li>
              <li><strong>Address Information:</strong> Residential or delivery address</li>
              <li><strong>Account Information:</strong> Login credentials, account preferences</li>
              <li><strong>Payment Information:</strong> Credit/debit card details (processed securely)</li>
              <li><strong>Order History:</strong> Products purchased, order dates, and quantities</li>
            </ul>
          </div>
          <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
            <h3 style={{ color: '#1565c0', marginBottom: '15px' }}>Non-Personal Information:</h3>
            <ul className="feature-list">
              <li><strong>Browsing Data:</strong> Pages visited, time spent, links clicked</li>
              <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
              <li><strong>Cookies:</strong> Data stored locally for improved user experience</li>
              <li><strong>Analytics:</strong> Usage patterns and preferences</li>
            </ul>
          </div>
        </div>

        {/* 2. How We Collect Information */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔍</div>
            <h2 className="section-title">2. How We Collect Information</h2>
          </div>
          <div className="grid-container">
            <div className="grid-card">
              <h3 className="card-title">📲 Direct Submission</h3>
              <p>Information you voluntarily provide through forms, account registration, or customer service requests.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">🍪 Cookies & Tracking</h3>
              <p>We use cookies and similar technologies to analyze website usage and personalize your experience.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">📊 Automatic Collection</h3>
              <p>Information automatically collected when you visit our website, including device and behavior data.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">🔗 Third-Party Sources</h3>
              <p>Information from payment processors, delivery partners, and analytics services.</p>
            </div>
          </div>
        </div>

        {/* 3. Use of Information */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🎯</div>
            <h2 className="section-title">3. Use of Information</h2>
          </div>
          <p className="section-content">We use your information for the following purposes:</p>
          <ul className="feature-list">
            <li><strong>Order Processing:</strong> To confirm orders, process payments, and arrange delivery</li>
            <li><strong>Customer Communication:</strong> To send order updates, promotional offers, and important notices</li>
            <li><strong>Service Improvement:</strong> To enhance website functionality and user experience</li>
            <li><strong>Analytics & Research:</strong> To understand user behavior and market trends</li>
            <li><strong>Legal Compliance:</strong> To meet regulatory requirements and prevent fraud</li>
            <li><strong>Personalization:</strong> To provide customized recommendations and content</li>
            <li><strong>Customer Support:</strong> To respond to inquiries and resolve issues</li>
          </ul>
        </div>

        {/* 4. Data Sharing & Disclosure */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🤝</div>
            <h2 className="section-title">4. Data Sharing & Disclosure</h2>
          </div>
          <p className="section-content">
            We do not sell your personal information to third parties. However, we may share data with:
          </p>
          <ul className="feature-list">
            <li><strong>Service Providers:</strong> Payment gateways, delivery partners, and hosting providers</li>
            <li><strong>Legal Authorities:</strong> When required by law or for fraud prevention</li>
            <li><strong>Business Partners:</strong> For marketing purposes (only with your consent)</li>
            <li><strong>Data Processors:</strong> Third-party vendors who assist in business operations</li>
          </ul>
          <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
            <p style={{ color: '#e65100', margin: 0 }}>
              <strong>⚠️ Note:</strong> All third parties are bound by confidentiality agreements and data protection standards.
            </p>
          </div>
        </div>

        {/* 5. Data Security */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔐</div>
            <h2 className="section-title">5. Data Security</h2>
          </div>
          <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
            <p className="section-content">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="feature-list">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure payment gateway integration with PCI compliance</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Data backup and disaster recovery procedures</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </div>
        </div>

        {/* 6. Cookies & Tracking Technologies */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🍪</div>
            <h2 className="section-title">6. Cookies & Tracking Technologies</h2>
          </div>
          <p className="section-content">
            Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device 
            that help us remember your preferences and improve website functionality. You can control cookie settings through 
            your browser, but disabling cookies may affect certain features. We use:
          </p>
          <ul className="feature-list">
            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Long-term cookies that help remember your preferences</li>
            <li><strong>Analytics Cookies:</strong> To track website performance and user behavior</li>
            <li><strong>Marketing Cookies:</strong> To serve relevant advertisements and offers</li>
          </ul>
        </div>

        {/* 7. Your Rights & Choices */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">✋</div>
            <h2 className="section-title">7. Your Rights & Choices</h2>
          </div>
          <div className="grid-container">
            <div className="grid-card">
              <h3 className="card-title">👁️ Access</h3>
              <p>You have the right to access and review your personal information at any time.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">✏️ Correction</h3>
              <p>You can request corrections to inaccurate or incomplete information.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">🗑️ Deletion</h3>
              <p>You may request deletion of your data subject to legal and business requirements.</p>
            </div>
            <div className="grid-card">
              <h3 className="card-title">📬 Opt-Out</h3>
              <p>Unsubscribe from promotional communications at any time.</p>
            </div>
          </div>
        </div>

        {/* 8. Data Retention */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">⏰</div>
            <h2 className="section-title">8. Data Retention</h2>
          </div>
          <p className="section-content">
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
            Retention periods vary depending on the type of data:
          </p>
          <ul className="feature-list">
            <li><strong>Account Information:</strong> Retained until account closure or inactivity period</li>
            <li><strong>Order Data:</strong> Retained for 7 years for accounting and legal purposes</li>
            <li><strong>Marketing Data:</strong> Retained until you unsubscribe</li>
            <li><strong>Analytics Data:</strong> Aggregated and anonymized after 24 months</li>
          </ul>
        </div>

        {/* 9. Children's Privacy */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">👶</div>
            <h2 className="section-title">9. Children's Privacy</h2>
          </div>
          <p className="section-content">
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children. If we become aware that a child has provided information, we will promptly delete such data. 
            Parents or guardians concerned about their child's information can contact us immediately.
          </p>
        </div>

        {/* 10. Third-Party Links */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔗</div>
            <h2 className="section-title">10. Third-Party Links & Services</h2>
          </div>
          <p className="section-content">
            Our website may contain links to external websites and services. We are not responsible for the privacy practices 
            of third-party sites. We recommend reviewing their privacy policies before providing any personal information.
          </p>
        </div>

        {/* 11. International Data Transfer */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🌍</div>
            <h2 className="section-title">11. International Data Transfer</h2>
          </div>
          <p className="section-content">
            While Krystal Aqua primarily operates within India, your data may be processed in other countries 
            as part of our global operations. We ensure that international transfers comply with data protection regulations 
            and include appropriate safeguards.
          </p>
        </div>

        {/* 12. Updates to Privacy Policy */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">📝</div>
            <h2 className="section-title">12. Updates to Privacy Policy</h2>
          </div>
          <p className="section-content">
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
            Updates will be posted on this page with a revised "Last Updated" date. Continued use of our website 
            constitutes your acceptance of updated terms.
          </p>
        </div>

        {/* 13. Complaint Resolution */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">📞</div>
            <h2 className="section-title">13. Complaint Resolution</h2>
          </div>
          <p className="section-content">
            If you have concerns about our privacy practices, we encourage you to contact us first. 
            If not satisfied with our response, you may file a complaint with the relevant data protection authority 
            in India or your jurisdiction.
          </p>
        </div>

        {/* 14. Do Not Track */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🚫</div>
            <h2 className="section-title">14. Do Not Track Signals</h2>
          </div>
          <p className="section-content">
            Some browsers include a "Do Not Track" feature. Currently, we do not respond to Do Not Track signals. 
            However, you can disable cookies and adjust privacy settings in your browser to limit tracking.
          </p>
        </div>

        {/* Contact Information */}
        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Questions About Your Privacy?</h2>
            <p className="cta-text">
              If you have any questions or concerns regarding our privacy practices and this Privacy Policy, 
              please contact us using the information below:
            </p>
            <div className="contact-info">
              <p><strong>📧 Email:</strong> privacy@krystalaqua.com</p>
              <p><strong>📞 Phone:</strong> +91-XXXX-XXXXXX</p>
              <p><strong>⏰ Support Hours:</strong> Monday to Saturday, 9 AM to 6 PM</p>
              <p><strong>📍 Address:</strong> [Your Company Address]</p>
              <p><strong>🔐 Data Protection Officer:</strong> dpo@krystalaqua.com</p>
            </div>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/terms" className="cta-button">
                <span>📋 Terms & Conditions</span>
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
            This Privacy Policy is effective immediately and applies to all users of Krystal Aqua website and services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;