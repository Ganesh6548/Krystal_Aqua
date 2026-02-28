// src/components/Header.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowAboutDropdown(false);
  };

  return (
    <header className="header">
      {/* Burger Menu Icon for Mobile */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {/* Logo 1 - Top-left corner */}
      <div className="logo-left">
        <Link to="/" className="logo-link">
          <img 
            src="/logo.png" 
            alt="Krystal Aqua Logo" 
            className="logo-image logo-image-left"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="logo-text">Logo 1</span>';
            }}
          />
        </Link>
      </div>

      {/* Logo 2 - Next to Logo 1 */}
      <div className="logo-two">
        <img 
          src="/logo-two.png" 
          alt="Krystal Aqua Logo Two" 
          className="logo-image-two"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<span class="logo-text">Logo 2</span>';
          }}
        />
      </div>

      {/* Navigation Menu */}
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        
        {/* About Us Dropdown */}
        <div 
          className="dropdown-container"
          onMouseEnter={() => !window.matchMedia("(max-width: 768px)").matches && setShowAboutDropdown(true)}
          onMouseLeave={() => !window.matchMedia("(max-width: 768px)").matches && setShowAboutDropdown(false)}
          onClick={() => window.matchMedia("(max-width: 768px)").matches && setShowAboutDropdown(!showAboutDropdown)}
        >
          <div className="dropdown-trigger">
            <span className="nav-link">About Us</span>
            <span className="dropdown-arrow">▾</span>
          </div>
          
          {(showAboutDropdown || (isMenuOpen && window.matchMedia("(max-width: 768px)").matches)) && (
            <div className="dropdown-menu">
              <Link to="/about" className="dropdown-item" onClick={closeMenu}>About Us</Link>
              <Link to="/vision-mission" className="dropdown-item" onClick={closeMenu}>Vision, Mission & Values</Link>
              <Link to="/book-plant-visit" className="dropdown-item" onClick={closeMenu}>Book a Plant Visit</Link>
              <Link to="/bottles-for-change" className="dropdown-item" onClick={closeMenu}>Bottles for Change</Link>
            </div>
          )}
        </div>
        
        <Link to="/shop" className="nav-link" onClick={closeMenu}>Shop</Link>
        <Link to="/cart" className="nav-link" onClick={closeMenu}>
          Cart {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
      </nav>

      {/* Contact Icons */}
      <div className="contact">
        <a href="tel:+919999999999" className="contact-icon">📞</a>
        <a href="mailto:info@krystalaqua.com" className="contact-icon">✉️</a>
      </div>
    </header>
  );
};

export default Header;