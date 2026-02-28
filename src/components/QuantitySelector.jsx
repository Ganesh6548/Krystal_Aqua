import React from "react";

const QuantitySelector = ({ quantity, onChange }) => {
  return (
    <div className="quantity-selector">
      <button onClick={() => onChange(quantity > 1 ? quantity - 1 : 1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => onChange(quantity + 1)}>+</button>
    </div>
  );
};

export default QuantitySelector;
