// src/pages/PaymentPage.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/cart.css";

// ✅ Currency formatter (INR)
const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const PaymentPage = () => {
  const {
    cart,
    customer,
    setCustomer,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card", "upi", "wallet"
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

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
      setOrderMessage("❌ Please fill in Name, Phone, and Address!");
      window.scrollTo(0, 0);
      return;
    }

    if (cart.length === 0) {
      setMessageType("error");
      setOrderMessage("❌ Your cart is empty!");
      window.scrollTo(0, 0);
      return;
    }

    if (!customer.email) {
      setMessageType("error");
      setOrderMessage("❌ Please provide a valid email address!");
      window.scrollTo(0, 0);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          cartItems: cart,
          totalPrice: totalPrice,
          address: customer.address,
          paymentMethod: paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderPlaced(true);
        setOrderId(data.orderId);
        setMessageType("success");
        setOrderMessage(`✅ Order placed successfully! Order ID: #${data.orderId}`);
        clearCart();
        window.scrollTo(0, 0);
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setMessageType("error");
        setOrderMessage(`❌ ${data.message || "Failed to place order. Please try again."}`);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessageType("error");
      setOrderMessage(
        "❌ Failed to process order. Please check your connection and try again."
      );
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  // If cart is empty and no order placed
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="cart-container">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>🛒 Your Cart is Empty</h1>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
            Start shopping to add items to your cart!
          </p>
          <Link to="/shop" className="btn btn-primary" style={{ padding: "12px 30px", fontSize: "16px" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", color: "#0a3d62", marginBottom: "10px" }}>
          💳 Payment & Checkout
        </h1>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Complete your purchase securely
        </p>
      </div>

      {/* Success Message */}
      {orderPlaced && (
        <div style={{
          background: "#d4edda",
          border: "2px solid #28a745",
          color: "#155724",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          textAlign: "center",
        }}>
          <h2 style={{ marginBottom: "10px" }}>✅ Order Confirmed!</h2>
          <p style={{ marginBottom: "10px", fontSize: "18px" }}>
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p style={{ marginBottom: "0" }}>
            <strong>Order ID:</strong> #{orderId}
          </p>
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Redirecting to home page in 3 seconds...
          </p>
        </div>
      )}

      {/* Error/Info Message */}
      {orderMessage && (
        <div style={{
          background: messageType === "success" ? "#d4edda" : "#f8d7da",
          border: `2px solid ${messageType === "success" ? "#28a745" : "#f5c6cb"}`,
          color: messageType === "success" ? "#155724" : "#721c24",
          padding: "15px 20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}>
          {orderMessage}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "40px" }}>
        {/* Left Column - Order Summary */}
        <div>
          <h2 style={{ marginBottom: "20px", color: "#0a3d62" }}>📋 Order Summary</h2>
          
          {cart.length > 0 ? (
            <div style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              background: "#f9f9f9",
            }}>
              {/* Cart Items */}
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "15px",
                    borderBottom: index !== cart.length - 1 ? "1px solid #eee" : "none",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#333" }}>
                      {item.name}
                    </p>
                    <p style={{ margin: "0", color: "#999", fontSize: "14px" }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{ margin: "0", fontWeight: "bold", color: "#0a3d62" }}>
                    {formatINR(item.price * item.quantity)}
                  </p>
                </div>
              ))}

              {/* Pricing Breakdown */}
              <div style={{
                borderTop: "2px solid #ddd",
                paddingTop: "15px",
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}>
                  <span>Subtotal:</span>
                  <span>{formatINR(totalPrice)}</span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}>
                  <span>Delivery Charges:</span>
                  <span>{formatINR(0)} (Free)</span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  borderTop: "1px solid #ddd",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0a3d62",
                }}>
                  <span>Total:</span>
                  <span>{formatINR(totalPrice)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p style={{ color: "#999" }}>No items in cart</p>
          )}
        </div>

        {/* Right Column - Customer & Payment Info */}
        <div>
          <h2 style={{ marginBottom: "20px", color: "#0a3d62" }}>👤 Customer Details</h2>
          
          <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            background: "#f9f9f9",
          }}>
            {/* Customer Form */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
                disabled={isLoading || orderPlaced}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
                disabled={isLoading || orderPlaced}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={customer.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
                disabled={isLoading || orderPlaced}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                Delivery Address *
              </label>
              <textarea
                name="address"
                value={customer.address}
                onChange={handleInputChange}
                placeholder="Enter complete delivery address"
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
                disabled={isLoading || orderPlaced}
              />
            </div>

            {/* Payment Method Selection */}
            <h3 style={{ marginBottom: "15px", color: "#0a3d62", fontSize: "16px" }}>💳 Payment Method</h3>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={isLoading || orderPlaced}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span>💳 Credit/Debit Card</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={isLoading || orderPlaced}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span>📱 UPI</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={isLoading || orderPlaced}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span>👛 Digital Wallet</span>
              </label>
            </div>

            {/* Security Notice */}
            <div style={{
              background: "#e3f2fd",
              border: "1px solid #bbdefb",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "20px",
              fontSize: "13px",
              color: "#1565c0",
            }}>
              🔒 <strong>Secure Payment:</strong> Your payment information is encrypted and processed securely.
            </div>

            {/* Place Order Button */}
            <button
              onClick={placeOrder}
              disabled={isLoading || orderPlaced || cart.length === 0}
              style={{
                width: "100%",
                padding: "12px",
                background: isLoading || orderPlaced ? "#ccc" : "#0a3d62",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: isLoading || orderPlaced ? "not-allowed" : "pointer",
                transition: "background 0.3s",
              }}
            >
              {isLoading ? "⏳ Processing..." : orderPlaced ? "✅ Order Placed" : `🛍️ Place Order (${formatINR(totalPrice)})`}
            </button>

            {/* Back to Cart */}
            {!orderPlaced && (
              <Link 
                to="/cart"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "15px",
                  color: "#0a3d62",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                ← Back to Cart
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      {!orderPlaced && (
        <div style={{
          background: "#f5f5f5",
          padding: "30px",
          borderRadius: "8px",
          marginTop: "40px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "24px", marginBottom: "10px" }}>🔒</p>
              <h3 style={{ color: "#0a3d62", marginBottom: "8px" }}>Secure Payment</h3>
              <p style={{ color: "#666", fontSize: "13px" }}>
                All transactions are encrypted and secure
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "24px", marginBottom: "10px" }}>🚚</p>
              <h3 style={{ color: "#0a3d62", marginBottom: "8px" }}>Fast Delivery</h3>
              <p style={{ color: "#666", fontSize: "13px" }}>
                Delivery within 3-5 business days
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "24px", marginBottom: "10px" }}>💯</p>
              <h3 style={{ color: "#0a3d62", marginBottom: "8px" }}>Quality Assured</h3>
              <p style={{ color: "#666", fontSize: "13px" }}>
                100% pure water guaranteed
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
