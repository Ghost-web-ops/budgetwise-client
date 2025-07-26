"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // تأكد من تعيين هذا المتغير في ملف .env.local
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
      const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // 👇 The fix is here 👇
        const response = await axios.post(`${apiUrl}/api/auth/register`, {
            username,
            email,
            password,
        });

        console.log("Registration successful:", response.data);
        toast.success("Account created successfully! Please log in.");
        router.push('/login'); // توجيه المستخدم لصفحة تسجيل الدخول بعد النجاح

    } catch (error) {
        console.error("Registration failed:", error);
        // عرض رسالة خطأ أكثر تحديدًا للمستخدم
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            toast.error("This email is already registered.");
        } else {
            toast.error("Registration failed. Please try again.");
        }
    }finally{
        setIsLoading(false)
    }
};
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
      <Card className="w-full max-w-md flex">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            create a new account{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* الخطوة 2: إضافة حقل اسم المستخدم */}
            <div>
              <Label htmlFor="username" className="mb-2">
                Username{" "}
              </Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="Enter a username"
                required
              />
              
            </div>
            <div>
              <Label htmlFor="email" className="mb-2">
                Email{" "}
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <div className="relative">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // <-- تبديل حالة الإظهار
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              </div>
            </div>
            
            <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
