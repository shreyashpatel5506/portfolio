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

          {/* Text content on the right */}
          <div className='text-center md:text-left'>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Hi , Shreyash Patel</h1>
            <Typewriter />
          </div>

        </div>
      </div >
    </>
  );
};

export default Home;

