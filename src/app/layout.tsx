import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from '@/contexts/AuthContext'; // استدعاء مدير النادي
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Budget Wise",
  description: "A simple budget management app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen ">
        <AuthProvider>
          <Toaster />
          <header>
            <Navbar />
          </header>
          
          {/* 👇 This makes the main content flexible */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}