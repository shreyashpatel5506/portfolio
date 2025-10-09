"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Skill from "./components/Skill";
import { useState, useRef, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navigation />
        <div
          ref={vantaRef}

          className='relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden p-4'
        >
          <section>
            <Home />
          </section>
          <section>
            <Skill />
          </section>
          {children}
        </div>
      </body>
    </html>
  );
}
