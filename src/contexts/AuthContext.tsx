"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logout successful");
  }, []);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const decodedToken = jwtDecode<{ exp: number }>(storedToken);
        // التحقق مما إذا كان التوكن قد انتهت صلاحيته
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
          toast.error("Your session has expired. Please log in again.");
        } else {
          setToken(storedToken);
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
      toast.error("Invalid token. Please log in again.");
    } finally {
      setLoading(false);
    }
  }, [logout]);
  const login = useCallback((token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    toast.success("Login successful");
  }, []);

  const value = { token, login, logout, isLoggedIn: !!token };

  // لا تعرض أي شيء حتى ننتهي من التحقق من التوكن لتجنب الوميض
  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
