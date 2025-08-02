import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext"; // استدعاء مدير النادي
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Budget Wise",
  description: "A simple budget management app",
  icons: {
    icon: "/favicon.ico", // Points to the file in the public folder
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen ">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Toaster />
            <header>
              <Navbar />
            </header>

            {/* 👇 This makes the main content flexible */}
            <main className="flex-grow dark:bg-gray-900 bg-gray-50">{children}</main>

            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
