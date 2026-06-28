import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shreyash Patel — Full Stack Developer",
  description:
    "Portfolio of Shreyash Patel, a Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB. Building scalable, production-ready web applications.",
  keywords: ["Full Stack Developer", "Next.js", "React", "Node.js", "MongoDB", "Shreyash Patel"],
  authors: [{ name: "Shreyash Patel" }],
  openGraph: {
    title: "Shreyash Patel — Full Stack Developer",
    description:
      "Portfolio of Shreyash Patel, a Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
