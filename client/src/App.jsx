import React from 'react';
import { CartProvider } from './components/CartContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router";
import Home from "./components/pages/Home";
import Items from "./components/pages/Items";
import ScrollToTop from "./components/ScrollToTop";
import Auth from "./components/pages/Auth";
import NotFound from "./components/pages/404";
import Profile from "./components/pages/Profile";
import Checkout from "./components/pages/Checkout";
import Track from "./components/pages/Track";
import Dashboard from './components/pages/Admin/Dashboard';
import Products from './components/pages/Admin/Products';
import Orders from './components/pages/Admin/Orders';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/items/:categoryId" element={<Items />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track/:orderId" element={<Track />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default App;
