"use client"; // This component must be a Client Component
import Typewriter from './Typewriter';
import { motion } from "motion/react"

const Home = () => {

  return (
    <>

      <div className='z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-4  bg-[#1A1A2E]'>

        {/* Coding-related image on the left */}
        <motion.div className="flex-shrink-0"
          initial={{ x: 0, y: 40, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}
        >
          <img
            src="/homeimage3.png" // This is a placeholder! Create this file in your /public directory
            alt="Abstract coding illustration"
            className="w-[400px] h-[400px] md:w-[560px] md:h-[560px] rounded-2xl object-cover "
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/1f1f38/ffffff?text=Image+Error&font=raleway'; }}
          />
        </motion.div>
        <div className='flex flex-col gap-10 items-baseline justify-evenly'>

          <div className='text-center md:text-left flex flex-col items-baseline justify-evenly gap-10'>
            <motion.h1 className="text-5xl md:text-7xl font-extrabold tracking-tight" initial={{ x: 0, y: 40, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}>Hi , Shreyash Patel</motion.h1>
            <Typewriter />
          </div>
          <div className='flex flex-row  items-center justify-between gap-12'>
            <motion.button
              initial={{ x: 0, y: 40, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}
              type="submit"
              className="ghost-button flex flex-row items-center gap-5"
            >
              Projects
              <svg
                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-gray-800 group-hover:fill-gray-800"
                ></path>
              </svg>
            </motion.button>
            <motion.button
              initial={{ x: 0, y: 40, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}
              type="submit"
              className="ghost-button  flex flex-row items-center gap-5"
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

      </div>

    </>
  );
};

export default Home;

