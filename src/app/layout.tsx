import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Footer from "@/components/Footer";
import { Toast } from "@heroui/react";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krisno-Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#E9E7E1]">
        <Toast.Provider/>
        <Navbar />
        <main> <SmoothScroll>{children}</SmoothScroll></main>
        <Footer/>
      </body>
    </html>
  );
}
