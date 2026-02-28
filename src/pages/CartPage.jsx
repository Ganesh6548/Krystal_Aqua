import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItemComponent";
import "../styles/cart.css";

// ✅ Currency formatter (INR)
const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    customer,
    setCustomer,
    totalPrice,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // API URL - Make sure backend is running on port 5000
  const API_BASE_URL = "http://localhost:5000/api";

  const placeOrder = async () => {
    // Validate form
    if (!customer.name || !customer.phone || !customer.address) {
      setMessageType("error");
      setOrderMessage("Please fill in Name, Phone, and Address!");
      return;
    }

    if (cart.length === 0) {
      setMessageType("error");
      setOrderMessage("Your cart is empty!");
      return;
    }

    setIsLoading(true);
    setOrderMessage("");

    try {
      // Prepare order data with cart items
      const orderData = {
        customerName: customer.name,
        customerEmail: customer.email || "not-provided@example.com",
        customerPhone: customer.phone,
        cartItems: cart, // Send all cart items
        totalPrice: totalPrice,
        address: customer.address,
      };

      console.log("📤 Sending order to backend:", orderData);

      // Send POST request to backend (REST API)
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        const orderId = data.data?.orderId || data.orderId;
        setMessageType("success");
        setOrderMessage(
          `✅ Order placed successfully! Order ID: #${orderId}`
        );
        console.log("✅ Order placed! ID:", orderId);
        console.log("📲 Telegram message sent to owner");

        // Clear cart after successful order
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setMessageType("error");
        setOrderMessage(`❌ ${data.message || "Failed to place order"}`);
        console.error("Order error:", data);
      }
    } catch (error) {
      setMessageType("error");
      setOrderMessage(`❌ Error: ${error.message}`);
      console.error(
        "❌ Failed to place order. Make sure backend is running on port 5000",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const proceedToPayment = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in your Name, Phone, and Address.");
      return;
    }
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h2>Your cart is empty!</h2>
          <button onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          {/* Summary & Checkout */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(totalPrice)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span className="total-price">
                  {formatINR(totalPrice)}
                </span>
              </div>

              {/* Customer Details */}
              <div className="customer-form">
                <h3>Customer Details</h3>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={customer.email}
                  onChange={handleInputChange}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Current Location"
                  value={customer.location}
                  onChange={handleInputChange}
                />

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  value={customer.address}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              {/* Order Message */}
              {orderMessage && (
                <div
                  className={`order-message ${messageType}`}
                  style={{
                    padding: "12px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                    backgroundColor:
                      messageType === "success" ? "#d4edda" : "#f8d7da",
                    color: messageType === "success" ? "#155724" : "#721c24",
                    border:
                      messageType === "success"
                        ? "1px solid #c3e6cb"
                        : "1px solid #f5c6cb",
                  }}
                >
                  {orderMessage}
                </div>
              )}

              <button
                className="checkout-btn"
                onClick={placeOrder}
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  marginBottom: "10px",
                }}
              >
                {isLoading ? "Placing Order..." : "📦 Place Order"}
              </button>

              <button
                className="checkout-btn"
                onClick={proceedToPayment}
                style={{
                  backgroundColor: "#6c757d",
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
