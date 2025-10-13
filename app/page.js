'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const socialLinks = [
    {
        icon: <Github size={20} />,
        href: 'https://github.com/shreyashpatel5506',
        label: 'GitHub',
    },
    {
        icon: <Linkedin size={20} />,
        href: 'https://www.linkedin.com/in/shreyash-patel-ba27b02a6/',
        label: 'LinkedIn',
    },
    {
        icon: <Twitter size={20} />,
        href: 'https://twitter.com/your-twitter-handle', // <-- Replace with your Twitter link
        label: 'Twitter',
    },
    {
        icon: <Instagram size={20} />,
        href: 'https://instagram.com/your-instagram-handle', // <-- Replace with your Instagram link
        label: 'Instagram',
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#151B2E] text-white border-t border-divider py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">

                {/* Social Links */}
                <div className="flex items-center gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="p-2 rounded-full bg-white/10 hover:bg-cyan-600 transition-colors duration-300"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-gray-400">
                    <p>&copy; {currentYear} Shreyash Patel. All rights reserved.</p>
                    <p className="mt-1">
                        Built with <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Next.js</a> &amp; <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Tailwind CSS</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
