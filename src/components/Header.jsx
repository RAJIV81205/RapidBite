import { User, Search, ShoppingCart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [location, setLocation] = useState("Loading location...");
  const [deliveryTime, setDeliveryTime] = useState(null);

  useEffect(() => {
    // Calculate a realistic delivery time between 20-40 minutes
    const baseTime = 20;
    const variableTime = Math.floor(Math.random() * 20);
    setDeliveryTime(baseTime + variableTime);

    let isMounted = true;

    const getLocation = async (position) => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=e31705e87534468cbe0063bb849f1d27`
        );
        const data = await response.json();
        if (data.results && data.results[0] && isMounted) {
          const address = data.results[0].components.city;
          setLocation(address);
        }
      } catch (error) {
        if (isMounted) {
          setLocation("Location unavailable");
        }
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        getLocation,
        (error) => {
          if (isMounted) {
            setLocation("Location access denied");
          }
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm w-full h-[70px] border-b border-neutral/15 flex flex-row items-center px-4 z-50"
    >
      {/* Logo */}
      <div className="flex items-center h-full px-6 border-r border-neutral/15">
        <h1 className="text-2xl font-bold font-noto hover:scale-105 transition-transform cursor-pointer">
          <span className="text-primary">Rapid</span>
          <span className="text-secondary">Bite</span>
        </h1>
      </div>

      {/* Location and Delivery Time */}
      <div className="flex flex-col justify-center h-full px-6 border-r border-neutral/15 min-w-[250px] items-center">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          <p className="font-semibold text-lg truncate max-w-[200px]">{location}</p>
        </div>
        <p className=" text-neutral-600 font-roboto text-lg">
          {deliveryTime ? `${deliveryTime} min delivery` : 'Calculating...'}
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 flex items-center justify-center px-6 h-full">
        <div className="relative w-full max-w-2xl">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search for food, drinks, and more..."
            className="w-full h-10 rounded-full border border-neutral/15 pl-10 pr-4 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Login */}
      <button className="flex items-center gap-2 px-4 h-[42px] hover:bg-neutral-100 rounded-full transition-colors">
        <User className="w-5 h-5 text-neutral-700" />
        <span className="font-medium">Login</span>
      </button>

      {/* Cart */}
      <button className="flex items-center gap-2 px-4 h-[42px] hover:bg-neutral-100 rounded-full transition-colors ml-2 relative">
        <ShoppingCart className="w-5 h-5 text-neutral-700" />
        <span className="font-medium">Cart</span>
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
      </button>
    </motion.header>
  );
};

export default Header;