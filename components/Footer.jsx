"use client";
import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#030712] border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-slate-200 hover:opacity-80 transition-opacity"
            >
              Shreyash.dev<span className="text-emerald-400">_</span>
            </Link>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed pt-2">
              Building high-quality, scalable web applications with modern technologies. Open for new opportunities.
            </p>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-indigo-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/experience" className="text-slate-400 hover:text-indigo-400 transition-colors">Experience</Link>
              </li>
              <li>
                <Link href="/certificates" className="text-slate-400 hover:text-indigo-400 transition-colors">Certificates</Link>
              </li>
              <li>
                <Link href="/#about" className="text-slate-400 hover:text-indigo-400 transition-colors">About Me</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/shreyashpatel5506" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0b0f19] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/shreyashpatel5506#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0b0f19] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="mailto:shreyashpatel5506@gmail.com" className="w-10 h-10 rounded-full bg-[#0b0f19] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {currentYear} Shreyash Patel. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Built with Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
