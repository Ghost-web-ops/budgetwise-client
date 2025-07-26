"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // توجيه المستخدم للصفحة الرئيسية بعد تسجيل الخروج
  };

  return (
    <nav className=" relative flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold">
        My Navbar
      </Link>
      <div className="hidden md:flex items-center space-x-4">
        <Button size="sm">
          <Link href="/">Home</Link>
        </Button>
        {isLoggedIn ? (
          <>
          <Button size="sm">
            <Link href="/dashboard">
           Dashboard
           </Link>
          </Button>
          <Button size="sm" onClick={handleLogout}>
            Logout
          </Button>
          </>
          
        ) : (
          <>
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            // X Icon (Close)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Bars Icon (Hamburger)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 md:hidden z-10">
          <div className="flex flex-col items-center p-4 space-y-4">
            <Button size="sm">
          <Link href="/">Home</Link>
        </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/register">Register</Link>
            </Button>
            
          </div>
        </div>
      )}
    </nav>
  );
}
