// src/pages/HomePage.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/home.css";

const products = [
  { id: 1, name: "300ml Box", pack: "30 pcs", price: 95, image: "products/500ml.png" },
  { id: 2, name: "500ml Box", pack: "24 pcs", price: 100, image: "products/300ml.png" },
  { id: 3, name: "1L Box", pack: "12 pcs", price: 90, image: "products/1L.png" },
  { id: 4, name: "2L Box", pack: "9 pcs", price: 100, image: "products/2L.png" },
  { id: 5, name: "5L Bottle", pack: "1 pc", price: 45, image: "products/5L.png" },
];

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  return (
    <div id="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-background">
          <img
            src={`${import.meta.env.BASE_URL}Logo-two%20(2).png`}
            alt="Krystal Aqua Background"
            className="background-image"
          />
          <div className="image-overlay"></div>
        </div>

        <div className="hero-content">
        
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={`${import.meta.env.BASE_URL}${item.image}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.pack}</p>
              <strong>₹{item.price}</strong>
              <button
                className="buy-btn"
                onClick={() => {
                  addToCart(item, 1);
                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* YOUTUBE VIDEO – CENTER BIG SCREEN */}
      <section className="youtube-section">
        <h2 className="youtube-title">
          Watch How We Deliver Pure Water
        </h2>

        <div className="youtube-container">
          <iframe
            src="https://www.youtube.com/embed/X2e-k5xobF4"
            title="Krystal Aqua Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Home;
