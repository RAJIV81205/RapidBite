import { User, Search, ShoppingCart, MapPin, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [location, setLocation] = useState("Searching for location...");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}%2C+${position.coords.longitude}&key=e31705e87534468cbe0063bb849f1d27`
            );
            const data = await response.json();
            setLocation(`${data.results[0].components.city} , ${data.results[0].components.state}`);
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">
              <span className="text-primary">Rapid</span>
              <span className="text-neutral-800">Bite</span>
            </h1>
          </div>
        </motion.div>

        {/* Center Section - Search */}
        <motion.div 
          className="flex-1 max-w-2xl mx-4 sm:mx-8 hidden sm:block"
          variants={itemVariants}
        >
          <div className={`relative transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}>
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
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
          <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-neutral-700 truncate max-w-[150px]">
              {location}
            </span>
          </button>

          {/* Search Button for Mobile */}
          <button 
            className="sm:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-neutral-700" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 px-2 sm:px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
            <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-neutral-600" />
            </div>
            <span className="text-sm font-medium text-neutral-700 hidden md:inline">
              John Doe
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Search */}
      <motion.div 
        className="sm:hidden px-4 py-2 bg-white border-t"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="What would you like to eat?"
            className="w-full h-10 rounded-full border-2 border-neutral-200 pl-12 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base placeholder:text-neutral-400"
          />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div 
        className="sm:hidden bg-white border-t"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 py-2">
          <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-neutral-700">
              {location}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
