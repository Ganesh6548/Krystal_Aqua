import React from "react";
import "../styles/product.css";

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>

      <button
        style={{
          marginTop: "10px",
          padding: "8px 15px",
          background: "#0077ff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
