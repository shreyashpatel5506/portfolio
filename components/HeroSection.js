"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Mail, FileText } from "lucide-react";
const GitHubIcon = ({ size = 19 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ size = 19 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
export default function HeroSection() {
  const [text] = useTypewriter({
    words: [
      "Full Stack Developer",
      "Next.js Developer",
      "Java Developer",
      "Open Source Contributor",
      "Application Developer",
      "Problem Solver",
    ],
    loop: true,
    delay: 100,
    deleteDelay: 50,
  });

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-white overflow-hidden flex flex-col justify-center">
      {/* 1. GRID BACKGROUND */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]"
        aria-hidden="true"
      />

      {/* 2. MIDDLE BLURRED LIGHT / SPOTLIGHT GLOW */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* MAIN HERO CONTENT RESPONSIVE GRID LAYER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Intro Typography & Call To Actions */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          {/* Status Badge */}
          <div className="flex items-center gap-2.5 w-max px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs text-emerald-400 tracking-wide font-medium">
              Available for opportunities
            </span>
          </div>

          <p className="text-slate-400 text-sm font-medium tracking-wide">
            Hi there, I'm
          </p>

          {/* Heading Name Block */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
              Shreyash
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Patel
            </h1>
          </div>

          {/* Typewriter Subheading */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold h-8 flex items-center">
            <span className="text-slate-300">{text}</span>
            <Cursor cursorColor="#6366f1" />
          </h2>

          {/* Short Summary Description */}
          <p className="text-slate-400 text-base leading-relaxed max-w-lg">
            I build scalable web applications that solve real problems. Focused
            on clean architecture, thoughtful UX, and shipping things that hold
            up in production.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 font-medium shadow-lg shadow-indigo-500/20 transition-all text-sm"
            >
              <Mail size={16} />
              Get in touch
            </a>
            <a
              href="#resume"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-800 bg-[#0b0f19]/40 rounded-xl hover:bg-slate-900 font-medium transition-colors text-sm"
            >
              <FileText size={16} />
              Resume
            </a>
            <div className="flex items-center gap-5 pt-1">
              <a
                href="https://github.com/shreyashpatel5506"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <GitHubIcon size={19} />
              </a>
              <a
                href="https://www.linkedin.com/in/shreyashpatel5506#"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <LinkedInIcon size={19} />
              </a>
              <a
                href="mailto:shreyash@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={19} />
              </a>
              <span className="h-4 w-px bg-border"></span>
            </div>
          </div>
        </div>

        {/* Right Column - Terminal Framework Box Layout */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px]">
            {/* The Code Editor Window Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0b0f19]/90 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-md">
              {/* Fake Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-900 bg-slate-950/40">
                <span className="w-3 h-3 rounded-full bg-red-500/60"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/60"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/60"></span>
                <span className="ml-2 text-xs text-slate-500 font-mono">
                  portfolio.tsx
                </span>
              </div>

              {/* Code Snippet Body */}
              <div className="p-5 text-xs leading-7 font-mono text-slate-300">
                <div>
                  <span className="text-indigo-400">const</span>{" "}
                  <span className="text-emerald-400">developer</span>{" "}
                  <span className="text-indigo-400">=</span>{" "}
                  <span className="text-slate-400">&#123;</span>
                </div>
                <div className="pl-5">
                  <span className="text-blue-400">name</span>
                  <span className="text-slate-500">:</span>{" "}
                  <span className="text-yellow-300">"Shreyash Patel"</span>
                  <span className="text-slate-500">,</span>
                </div>
                <div className="pl-5">
                  <span className="text-blue-400">role</span>
                  <span className="text-slate-500">:</span>{" "}
                  <span className="text-yellow-300">"Full Stack Dev"</span>
                  <span className="text-slate-500">,</span>
                </div>
                <div className="pl-5">
                  <span className="text-blue-400">stack</span>
                  <span className="text-slate-500">:</span>{" "}
                  <span className="text-slate-400">[</span>
                  <span className="text-yellow-300">"React"</span>
                  <span className="text-slate-500">,</span>{" "}
                  <span className="text-yellow-300">"Node"</span>
                  <span className="text-slate-500">,</span>{" "}
                  <span className="text-yellow-300">"Next.js"</span>
                  <span className="text-slate-400">]</span>
                  <span className="text-slate-500">,</span>
                </div>
                <div className="pl-5">
                  <span className="text-blue-400">status</span>
                  <span className="text-slate-500">:</span>{" "}
                  <span className="text-emerald-400">"open_to_work"</span>
                  <span className="text-slate-500">,</span>
                </div>
                <div className="pl-5">
                  <span className="text-blue-400">coffee</span>
                  <span className="text-slate-500">:</span>{" "}
                  <span className="text-indigo-400">true</span>
                </div>
                <div>
                  <span className="text-slate-400">&#125;;</span>
                </div>

                {/* Embedded Active Console Input */}
                <div className="mt-3 pt-3 border-t border-slate-900">
                  <span className="text-slate-500">$ </span>
                  <span className="text-emerald-400">npm run</span>
                  <span className="text-white font-medium"> hire-shreyash</span>
                  <span className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-1 align-middle animate-pulse"></span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-slate-800 text-xs text-sky-400 font-mono shadow-lg">
              ⚛ React 18
            </div>
            <div className="absolute top-1/3 -left-8 px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-slate-800 text-xs text-slate-200 font-mono shadow-lg flex items-center gap-1">
              <span className="text-[10px]">▲</span> Next.js 14
            </div>
            <div className="absolute -bottom-4 right-10 px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-slate-800 text-xs text-yellow-500 font-mono shadow-lg">
              ⬡ Node.js
            </div>
            <div className="absolute bottom-14 -left-6 px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-slate-800 text-xs text-indigo-400 font-mono shadow-lg">
              Java
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
