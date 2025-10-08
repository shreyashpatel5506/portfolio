"use client"; // This component must be a Client Component
import Typewriter from './Typewriter';

import { useState, useEffect, useRef } from 'react';
import { motion } from "motion/react"

const Home = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaInstance = null; // Use a local variable to hold the instance

    // Function to load a script and return a promise
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Chain script loading: Vanta.js depends on Three.js
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js'))
      .then(() => {
        // Both scripts are loaded, now initialize Vanta
        if (vantaRef.current) {
          vantaInstance = window.VANTA.NET({
            el: vantaRef.current, // Target the div using the ref
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3fffbe, // A modern, greenish-cyan color
            backgroundColor: 0x1a1a2e, // A deep blue-purple background
            points: 15.00,
            maxDistance: 23.00,
            spacing: 18.00
          });
          setVantaEffect(vantaInstance);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      })
      .catch(error => {
        console.error("Script loading failed:", error);
      });

    // This is the cleanup function.
    // It runs when the component unmounts to prevent memory leaks.
    return () => {
      if (vantaInstance) {
        vantaInstance.destroy();
      }
      // Also remove the script tags to be thorough
      const scripts = document.querySelectorAll('script[src*="three.js"], script[src*="vanta.net"]');
      scripts.forEach(s => s.remove());
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      {/* This is the main container that will have the animated background.
          The 'ref' connects this div to our React code. */}
      <div
        ref={vantaRef}

        className='relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden p-4'
      >
        {/* Your content goes here. It will appear ON TOP of the animation. */}
        <div className='z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-4'>

          {/* Coding-related image on the left */}
          <motion.div className="flex-shrink-0"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
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
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Hi , Shreyash Patel</h1>
              <Typewriter />
            </div>
            <div className='flex flex-row  items-center justify-between gap-12'>
              <button
                type="submit"
                className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg  text-blue-700 bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-blue-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
              >
                Projects
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    class="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </button>
              <button
                type="submit"
                className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg  text-blue-700 bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-blue-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
              >
                Download Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 animate-bounce"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;

