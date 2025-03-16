import React from 'react';
import { CartProvider } from './components/CartContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import Items from "./components/pages/Items";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/items/:categoryId" element={<Items />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
