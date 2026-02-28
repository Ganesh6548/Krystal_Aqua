// src/components/Footer.jsx
import React from "react";
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          
          {/* Company Info & Logo */}
          <div className="footer-col">
            <div className="company-info">
              <div className="footer-logo">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Krystal Aqua Logo" className="logo-img" />
                <h3 className="company-name">Krystal Aqua</h3>
              </div>
              <p className="company-tagline">
                Delivering purity and health through premium drinking water solutions.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>123 Water Street, Pure City, PC 123456</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <a href="tel:+919999999999">+91 99999 99999</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <a href="mailto:info@krystalaqua.com">info@krystalaqua.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* About Us Links */}
          <div className="footer-col">
            <h4 className="footer-heading">About Us</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/journey">Our Journey</a></li>
              <li><a href="/vision">Vision, Mission & Values</a></li>
              <li><a href="/leadership">Leadership Team</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/visit">Book a Plant Visit</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          {/* Brands & Legal */}
          <div className="footer-col">
            <div className="footer-section">
              <h4 className="footer-heading">Our Brand</h4>
              <ul className="footer-links">
                <li><a href="/brands" className="brand-link">Krystal Aqua</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* FAQs & Social */}
          <div className="footer-col">
            <div className="footer-section">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="/faqs">FAQs</a></li>
                <li><a href="/sustainability">Bottles for Change</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Connect With Us</h4>
              <div className="social-links">
                <a href="https://facebook.com/krystalaqua" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📘</span>
                  <span>Facebook</span>
                </a>
                <a href="https://instagram.com/krystalaqua" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📸</span>
                  <span>Instagram</span>
                </a>
                <a href="https://youtube.com/krystalaqua" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📺</span>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
            
            {/* WhatsApp Order Button */}
            <div className="whatsapp-footer">
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="whatsapp-order">
                <span className="whatsapp-icon">💬</span>
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Krystal Aqua. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/sitemap">Sitemap</a>
              <span className="separator">|</span>
              <a href="/cookies">Cookie Policy</a>
              <span className="separator">|</span>
              <a href="/disclaimer">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;