"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  // 1. Added missing state hook for responsive toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- MAIN HEADER --- */}
      <header className="sticky top-0 z-50 mx-auto px-6 h-20 flex items-center justify-between w-full bg-[#030712] ">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-slate-200 hover:opacity-80 transition-opacity"
        >
          Shreyash.dev<span className="text-emerald-400">_</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a
            href="#about"
            className="text-slate-100 flex items-center gap-1.5 before:content-['•'] before:text-purple-400"
          >
            About
          </a>
          <a
            href="#projects"
            className="hover:text-slate-200 transition-colors"
          >
            Projects
          </a>
          <a href="#journey" className="hover:text-slate-200 transition-colors">
            Journey
          </a>
          <a
            href="#experience"
            className="hover:text-slate-200 transition-colors"
          >
            Experience
          </a>
          <a href="#github" className="hover:text-slate-200 transition-colors">
            GitHub
          </a>
        </nav>

        {/* Desktop Call to Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="px-4 py-2 text-sm font-medium border border-slate-800 rounded-md hover:bg-slate-900 transition-colors"
          >
            Contact
          </a>
          <a
            href="#hire"
            className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20 transition-all"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-200 relative z-50"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* --- MOBILE DRAWERS --- */}
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Menu Panel (Right-to-Left Slide Integration) */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-[#0b0f19] border-l border-slate-900 p-6 z-40 md:hidden flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Navigation links inside drawer */}
        <div className="pt-20 flex flex-col gap-6 text-lg font-medium text-slate-400">
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-slate-100 flex items-center gap-2"
          >
            About
          </a>
          <a href="#projects" onClick={() => setIsOpen(false)}>
            Projects
          </a>
          <a href="#journey" onClick={() => setIsOpen(false)}>
            Journey
          </a>
          <a href="#experience" onClick={() => setIsOpen(false)}>
            Experience
          </a>
          <a href="#github" onClick={() => setIsOpen(false)}>
            GitHub
          </a>
        </div>

        {/* Call to Actions inside drawer */}
        <div className="flex flex-col gap-3 mt-auto">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-center text-sm font-medium border border-slate-800 rounded-md text-slate-200"
          >
            Contact
          </a>
          <a
            href="#hire"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-center text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md"
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
