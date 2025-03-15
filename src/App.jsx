import React from 'react';
import { CartProvider } from './components/CartContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/Homepage/Home";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
