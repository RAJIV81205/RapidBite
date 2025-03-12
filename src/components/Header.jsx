import { User , Search } from "lucide-react";
import { motion } from "framer-motion";


import React from 'react'

const Header = () => {
  return (
    <motion.header
      initial={{ transform: "translateY(-100px)" }}
      animate={{ transform: "translateY(0px)" }}
      transition={{ duration: 0.5 }}
      className="fixed bg-background w-full h-[10vh] border-b-2 border-neutral/15 flex flex-row justify-evenly items-center"
    >
      <div className="flex items-center justify-center"></div>
      <div className="flex flex-col items-center justify-center"></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>

      
      
    </motion.header>
  )
}

export default Header