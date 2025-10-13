"use client"
import { useState } from 'react';
import Link from "next/link";
import logo from "../../public/Portfolio_logo-removebg-preview.png"
import Image from 'next/image'

// A simple component for the close icon (X)
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// A simple component for the hamburger menu icon
const MenuIcon = () => (
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
    </svg>
);


export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Reusable component for navigation links to avoid repetition
    const NavLinks = ({ onItemClick }) => (
        <>
            <li>
                <Link href="#home" onClick={onItemClick} className="block py-2 px-3 text-accent rounded md:bg-transparent md:p-0" aria-current="page">Home</Link>
            </li>
            <li>
                <Link href="#skills" onClick={onItemClick} className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-accent md:p-0">Skills</Link>
            </li>
            <li>
                <Link href="#projects" onClick={onItemClick} className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-accent md:p-0">Projects</Link>
            </li>
            <li>
                <Link href="#experience" onClick={onItemClick} className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-accent md:p-0">Experience</Link>
            </li>

            <li>
                <Link href="#contact" onClick={onItemClick} className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-accent md:p-0">Contact</Link>
            </li>
        </>
    );

    return (
        <>
            <nav className="bg-[#0F1629] border-b border-divider sticky top-0 z-40">
                <div className="max-w-screen-xl flex flex-wrap 
                bg-[#0F1629] items-center justify-between mx-auto p-4">

                    {/* Logo and Site Title */}
                    <Link href="#home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image
                            src={logo}
                            width={75}
                            height={75}
                            alt='LogoofPortFolio'
                            quality={100}
                            placeholder="blur"
                            loading="lazy"
                        />
                        <span className="self-center text-primary font-heading text-2xl font-semibold whitespace-nowrap">
                            Shreyash
                        </span>
                    </Link>

                    {/* Mobile Menu Button (Hamburger) */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        type="button"
                        className="inline-flex 
                        bg-[#0F1629] items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg md:hidden hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon />
                    </button>

                    {/* Desktop Navigation Links */}
                    <div className="hidden w-full md:block 
                    md:w-auto" id="navbar-default">
                        <ul className="font-medium flex 
                        flex-col p-4 md:p-0 mt-4 border border-divider rounded-lg bg-[#0F1629] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
                            <NavLinks />
                        </ul>
                    </div>
                </div>
            </nav>

            {/* --- Mobile Sidenav --- */}

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Sidenav Container */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#0F1629] shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Sidenav Header */}
                <div className="flex justify-between items-center p-4 border-b border-divider">
                    <span className="text-xl font-heading font-semibold text-primary">Menu</span>
                    <button onClick={() => setIsMenuOpen(false)} className="text-primary hover:text-accent">
                        <CloseIcon />
                    </button>
                </div>

                {/* Sidenav Links */}
                <ul className="flex flex-col p-4 space-y-2">
                    <NavLinks onItemClick={() => setIsMenuOpen(false)} />
                </ul>
            </div>
        </>
    );
}