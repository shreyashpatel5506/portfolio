"use client";
import React from "react";
import Typewriter from "./Typewriter";
import { motion } from "motion/react";

const Home = () => {
  return (
    <section className="z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-20 bg-[#0F1629]">
      {/* Left Image Section */}
      <motion.div
        className="flex-shrink-0"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/homeimage3.png"
          alt="Abstract coding illustration"
          className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[560px] lg:h-[560px] rounded-2xl object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/300x300/1f1f38/ffffff?text=Image+Error&font=raleway";
          }}
        />
      </motion.div>

      {/* Right Text Section */}
      <div className="flex flex-col items-center md:items-start gap-8 text-center md:text-left">
        {/* Title + Typewriter */}
        <div className="flex flex-col gap-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Hi, I'm Shreyash Patel
          </motion.h1>
          <Typewriter />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 sm:gap-10 w-full">
          {/* Projects Button */}
          <motion.button
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            type="button"
            className="ghost-button flex flex-row items-center gap-3 sm:gap-4 text-base sm:text-lg px-6 py-3 rounded-full transition-all duration-300"
          >
            Projects
            <svg
              className="w-7 h-7 text-gray-50 rotate-45 border border-gray-700 p-1.5 rounded-full"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-200"
              ></path>
            </svg>
          </motion.button>

          {/* Resume Button */}
          <motion.button
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            type="button"
            className="ghost-button flex flex-row items-center gap-3 sm:gap-4 text-base sm:text-lg px-6 py-3 rounded-full transition-all duration-300"
          >
            Download Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              ></path>
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Home;
