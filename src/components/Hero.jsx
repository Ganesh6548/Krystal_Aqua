// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/shop");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Logo Center instead of text (696×315 size) */}
        <div className="hero-logo-center">
          <img 
            src={`${import.meta.env.BASE_URL}logo-center.png`} 
            alt="Krystal Aqua" 
            className="logo-center-hero"
          />
        </div>
        
        
        
        <button className="hero-button" onClick={handleOrderClick}>
          Order via WhatsApp
        </button>
      </div>
    </section>
  );
};

export default Hero;