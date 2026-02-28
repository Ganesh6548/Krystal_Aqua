// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import VisionMissionPage from "./pages/VisionMissionPage";
import BookPlantVisitPage from "./pages/BookPlantVisitPage";
import BottlesChangePage from "./pages/BottlesChangePage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/vision-mission" element={<VisionMissionPage />} />
              <Route path="/book-plant-visit" element={<BookPlantVisitPage />} />
              <Route path="/bottles-for-change" element={<BottlesChangePage />} />
              
              {/* Fallback routes for footer links */}
              <Route path="/journey" element={<AboutPage />} />
              <Route path="/leadership" element={<AboutPage />} />
              <Route path="/contact" element={<AboutPage />} />
              <Route path="/visit" element={<BookPlantVisitPage />} />
              <Route path="/careers" element={<AboutPage />} />
              <Route path="/brands" element={<AboutPage />} />
              <Route path="/faqs" element={<AboutPage />} />
              <Route path="/sustainability" element={<BottlesChangePage />} />
              <Route path="/sitemap" element={<AboutPage />} />
              <Route path="/cookies" element={<AboutPage />} />
              <Route path="/disclaimer" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;