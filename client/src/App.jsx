import React from 'react';
import { CartProvider } from './components/CartContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import Items from "./components/pages/Items";
import ScrollToTop from "./components/ScrollToTop";
import Auth from "./components/pages/Auth";
import NotFound from "./components/pages/404";
import Profile from "./components/pages/Profile";
function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/items/:categoryId" element={<Items />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
