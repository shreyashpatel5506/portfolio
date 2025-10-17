import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Skill from "./components/Skill";
import Project from "./components/Project";
import Experience from "./components/Expierence";
import Contact from "./components/Contact";
import Script from "next/script"; // ✅ Use Next.js Script for safe client-side execution

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F1629] relative`}
      >
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

        {/* ✅ Safe client-side mouse effect using Next.js Script */}
        <Script id="cursor-effect" strategy="afterInteractive">
          {`
            (function() {
              if (typeof window === 'undefined') return;

              // 🖱️ Disable cursor on mobile/touch devices
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

              const cursor = document.createElement('div');
              cursor.id = 'cursor';
              Object.assign(cursor.style, {
                position: 'fixed',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #67e8f9',
                boxShadow: '0 0 20px rgba(0,255,255,0.6)',
                zIndex: 9999,
                pointerEvents: 'none',
                left: '-100px',
                top: '-100px',
                willChange: 'transform',
                transition: 'transform 0.15s ease-out, width 0.25s ease, height 0.25s ease, box-shadow 0.25s ease',
                opacity: '1',
                mixBlendMode: 'screen'
              });
              document.body.appendChild(cursor);

              let x = 0, y = 0, targetX = 0, targetY = 0;
              const speed = 0.2;

              document.addEventListener('mousemove', e => {
                targetX = e.clientX;
                targetY = e.clientY;
                cursor.style.opacity = '1';
              });

              document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
              });

              // ✨ Hover animation on links/buttons
              const hoverSelectors = 'a, button, .cursor-hover';
              document.addEventListener('mouseover', e => {
                if (e.target.closest(hoverSelectors)) {
                  cursor.style.width = '70px';
                  cursor.style.height = '70px';
                  cursor.style.boxShadow = '0 0 35px rgba(0,255,255,0.9)';
                }
              });
              document.addEventListener('mouseout', e => {
                if (e.target.closest(hoverSelectors)) {
                  cursor.style.width = '40px';
                  cursor.style.height = '40px';
                  cursor.style.boxShadow = '0 0 20px rgba(0,255,255,0.6)';
                }
              });

              function animate() {
                x += (targetX - x) * speed;
                y += (targetY - y) * speed;
                cursor.style.transform = 'translate3d(' + (x - 20) + 'px,' + (y - 20) + 'px,0)';
                requestAnimationFrame(animate);
              }

              animate();
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
