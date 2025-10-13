import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Skill from "./components/Skill";
import ThreeBackground from "./components/ThreeBackground";
import Project from "./components/Project";
import Experience from "./components/Expierence";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shreyash Patel's Portfolio", // You can update this
  description: "A portfolio of projects and skills.", // You can update this
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F1629]`}>

        <ThreeBackground />
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
        <section id="contact" className="text-center py-20">
          {/* You can replace this with your actual Contact component later */}
          <h2 className="text-4xl font-bold text-white">Contact Me</h2>
        </section>
        {children}
      </body>
    </html>
  );
}