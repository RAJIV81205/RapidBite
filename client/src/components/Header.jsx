import { User, Search, ShoppingCart, MapPin, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useCart } from "./CartContext";
import { Link, useLocation } from "react-router";
import { HeaderSkeleton } from "./Skeletons";
import debounce from 'lodash/debounce';
import React from 'react';

// Memoized location button component
const LocationButton = React.memo(({ userLocation }) => (
  <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
    <MapPin className="w-5 h-5 text-primary" />
    <span className="text-sm font-medium text-neutral-700 truncate max-w-[150px]">
      {userLocation}
    </span>
  </button>
));

// Memoized profile button component
const ProfileButton = React.memo(({ isLoggedIn, user }) => (
  isLoggedIn ? (
    <Link to="/profile">
      <button className="flex items-center gap-2 px-2 sm:px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-neutral-600" />
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden md:inline">
          {user?.name || 'User'}
        </span>
      </button>
    </Link>
  ) : (
    <Link to="/auth">
      <button className="flex items-center gap-2 px-2 sm:px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-neutral-600" />
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden md:inline">
          Login
        </span>
      </button>
    </Link>
  )
));

const Header = () => {
  const currentLocation = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userLocation, setUserLocation] = useState("Searching for location...");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount, toggleCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_BACKEND_URL;

  const verifyToken = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      const response = await fetch(`${url}/verify-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      setIsLoggedIn(true);
      setUser(data.user);
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [token, url]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken, currentLocation.pathname]);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}%2C+${position.coords.longitude}&key=e31705e87534468cbe0063bb849f1d27`
            );
            const data = await response.json();
            setUserLocation(
              `${data.results[0].components.city} , ${data.results[0].components.state}`
            );
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }), []);

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        // Implement your search logic here
        console.log('Searching for:', query);
      }, 300),
    []
  );

  const handleSearchChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  }, [debouncedSearch]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-white shadow-sm w-full h-16 z-50"
    >
      <motion.div
        className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section */}
        <motion.div className="flex items-center gap-8" variants={itemVariants}>
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="logo" 
                  className="w-100% h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">
                <span className="text-primary">Rapid</span>
                <span className="text-neutral-800">Bite</span>
              </h1>
            </div>
          </Link>
        </motion.div>

        {/* Center Section - Search */}
        <motion.div
          className="flex-1 max-w-2xl mx-4 sm:mx-8 hidden sm:block"
          variants={itemVariants}
        >
          <div
            className={`relative transition-all duration-300 ${
              isSearchFocused ? "scale-105" : ""
            }`}
          >
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What would you like to eat?"
              className="w-full h-12 rounded-full border-2 border-neutral-200 pl-12 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base placeholder:text-neutral-400"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex items-center gap-2 sm:gap-4"
          variants={itemVariants}
        >
          {/* Location */}
          <LocationButton userLocation={userLocation} />

          {/* Search Button for Mobile */}
          <button
            className="sm:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
            onClick={toggleMobileMenu}
          >
            <Search className="w-5 h-5 text-neutral-700" />
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-neutral-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5 text-neutral-700" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Profile */}
          {isLoading ? (
            <div className="w-8 h-8 bg-neutral-200 rounded-full animate-pulse" />
          ) : (
            <ProfileButton isLoggedIn={isLoggedIn} user={user} />
          )}
        </motion.div>
      </motion.div>

      {/* Mobile Search */}
      <motion.div
        className="sm:hidden px-4 py-2 bg-white border-t"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="What would you like to eat?"
            className="w-full h-12 rounded-full border-2 border-neutral-200 pl-12 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base placeholder:text-neutral-400"
          />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        className="sm:hidden bg-white border-t"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 py-2">
          <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-neutral-700">
              {userLocation}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default React.memo(Header);
