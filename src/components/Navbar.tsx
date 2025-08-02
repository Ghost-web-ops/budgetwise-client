"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // توجيه المستخدم للصفحة الرئيسية بعد تسجيل الخروج
  };

  return (
    <nav className=" relative flex items-center justify-between p-4 bg-white text-black dark:bg-gray-800">
      <Link href="/" className="dark:text-gray-100 text-lg font-bold">
        My Navbar
      </Link>
      
      <div className="hidden md:flex items-center space-x-4">
        <ThemeToggle />
        <Button size="sm" className=" bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          <Link href="/">Home</Link>
        </Button>
         
        {isLoggedIn ? (
          <>
          <Button size="sm" className=" bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            <Link href="/dashboard">
           Dashboard
           </Link>
          </Button>
          <Button size="sm" className=" bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={handleLogout}>
            Logout
          </Button>
          </>
          
        ) : (
          <>
            <Button asChild size="sm" className=" bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className=" bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="md:hidden flex justify-between gap-2.5">
         <ThemeToggle />
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
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
              <Link href="/">Home</Link>
            </Button>
            {isLoggedIn ? (
              <>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  size="sm"
                  className="w-full dark:bg-red-500 dark:hover:bg-red-600 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
