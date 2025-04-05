import React, { Suspense } from 'react';
import { CartProvider } from './components/CartContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/pages/404";
import Condition from "./components/pages/Terms/Condition";
import Refund from "./components/pages/Terms/Refund";
import Contact from "./components/pages/Terms/Contact";


// Lazy load components
const Home = React.lazy(() => import("./components/pages/Home"));
const Items = React.lazy(() => import("./components/pages/Items"));
const Auth = React.lazy(() => import("./components/pages/Auth"));
const Profile = React.lazy(() => import("./components/pages/Profile"));
const Checkout = React.lazy(() => import("./components/pages/Checkout"));
const Track = React.lazy(() => import("./components/pages/Track"));
const Dashboard = React.lazy(() => import('./components/pages/Admin/Dashboard'));
const Products = React.lazy(() => import('./components/pages/Admin/Products'));
const Orders = React.lazy(() => import('./components/pages/Admin/Orders'));
const Analytics = React.lazy(() => import('./components/pages/Admin/Analytics'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
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
              <Route index element={<Analytics />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>

            <Route path="/terms/condition" element={<Condition />} />
            <Route path="/terms/refund" element={<Refund />} />
            <Route path="/terms/contact" element={<Contact />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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
