import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Club Management",
  description: "Explore and manage college clubs, events, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-50 text-gray-900">
      <body className={`${inter.className} min-h-screen bg-gray-50 antialiased`}>
        <Navbar />
        <div className="pt-2 min-h-[80vh]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
