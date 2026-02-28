import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";  // Import from products.js
import "../styles/shop.css";

const ShopPage = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="shop-page">
      <div className="container">
        <h1 className="shop-title">Shop Krystal Aqua</h1>
        <div className="shop-grid">
          {products.map((product) => (
            <div className="shop-card" key={product.id}>
              <div className="shop-card-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="shop-card-content">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price-row">
                  <span className="price">₹{product.price}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product, 1)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;