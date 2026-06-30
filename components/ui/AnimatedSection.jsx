"use client";
import React from "react";
import GridBackground from "./GridBackground";
import { motion } from "framer-motion";

export default function AnimatedSection({ children, delay = 0, className = "", showGrid = false }) {
  return (

    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative w-full overflow-hidden flex flex-col justify-center py-20 bg-[#030712] ${className}`}
    >
      {showGrid && <GridBackground />}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {children}
      </div>
    </motion.section>
  );
}
