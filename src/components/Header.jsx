import { User , Search } from "lucide-react";
import { motion } from "framer-motion";
  import { useState, useEffect } from "react";



const Header = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`); 
        },
        (error) => {
          setLocation("Location access denied.");
        }
      );
    } else {  
      setLocation("Geolocation not supported.");
    }
  }, []);

  return (
    <motion.header
      initial={{ transform: "translateY(-100px)" }}
      animate={{ transform: "translateY(0px)" }}
      transition={{ duration: 0.5 }}
      className="fixed bg-background w-full h-[10vh] border-b-2 border-neutral/15 flex flex-row justify-evenly items-center"
    >
      <div className="flex items-center justify-center border-r-2 border-neutral/15 h-full w-full" >
        <h1 className="text-2xl font-bold font-noto"><span className="text-primary">Rapid</span><span className="text-secondary">Bite</span></h1>
      </div>
      <div className="flex flex-col items-center justify-center border-r-2 border-neutral/15 h-full w-full">
        <p className="font-semibold font-noto">Delivering in {Math.floor(Math.random() * 100)} minutes</p>
        <p className="text-sm" id="location">{location}</p>
      </div>
      <div className="flex items-center justify-center border-r-2 border-neutral/15  h-full relative w-full">
        <Search className="w-5 h-5 absolute left-9 invert-50" />
        <input type="text" placeholder="Search Milkshake" className="w-[90%] rounded-full border-2 border-neutral/15 p-2 pl-10" />
      </div>
      <div className="flex items-center justify-center border-r-2 border-neutral/15 h-full w-full">
        <User className="w-5 h-5" />
      </div>
      <div className="flex items-center justify-center border-r-2 border-neutral/15 h-full w-full">
        
      </div>

      
      
    </motion.header>
  )
}

export default Header