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
  metadataBase: new URL("https://shreyash5506.tech"),
  title: {
    default: "Shreyash Patel | Full Stack Developer",
    template: "%s | Shreyash Patel",
  },
  description:
    "Portfolio of Shreyash Patel, a Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB. Building scalable, production-ready web applications.",
  keywords: [
    "Shreyash Patel",
    "Shreyash",
    "Shreyash Patel Portfolio",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Software Engineer",
    "Web Developer India"
  ],
  authors: [{ name: "Shreyash Patel", url: "https://shreyash5506.tech" }],
  creator: "Shreyash Patel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shreyash5506.tech",
    siteName: "Shreyash Patel Portfolio",
    title: "Shreyash Patel | Full Stack Developer",
    description:
      "Explore the portfolio of Shreyash Patel. Full Stack Developer specializing in modern web technologies like Next.js, React, and Node.js.",
    images: [
      {
        url: "/og-image.png", // Next.js will look for this in your public folder
        width: 1200,
        height: 630,
        alt: "Shreyash Patel - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyash Patel | Full Stack Developer",
    description:
      "Explore the portfolio of Shreyash Patel. Full Stack Developer specializing in modern web technologies like Next.js, React, and Node.js.",
    creator: "@shreyash_5506",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning={true}
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
