// src/app/layout.js

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Add this to reduce flash of unstyled text
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SheSTEAM",
  description: "Empowering Girls in STEAM Fields",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning={true} 
      >
        {children}
      </body>
    </html>
  );
}
