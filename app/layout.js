"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Skill from "./components/Skill";
import Project from "./components/Project";
import Experience from "./components/Expierence";
import Contact from "./components/Contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shreyash Patel's Portfolio",
  description: "A portfolio of projects and skills.",
};

export default function RootLayout({ children }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F1629] relative`}
      >
        {/* 🔵 Glowing Cursor */}
        <div
          className="pointer-events-none fixed z-50 w-10 h-10 rounded-full border-2 border-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-transform duration-75"
          style={{
            left: cursor.x - 20,
            top: cursor.y - 20,
            transform: `translate3d(0, 0, 0)`,
          }}
        ></div>

        {/* 🧭 Page Sections */}
        <Navigation />
        <section id="home">
          <Home />
        </section>

        <section id="skills">
          <Skill />
        </section>

        <section id="projects">
          <Project />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section>
          <Contact />
        </section>

        {children}
      </body>
    </html>
  );
}
