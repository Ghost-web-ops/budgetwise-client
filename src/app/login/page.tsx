"use client";
import {Card, CardContent, CardTitle, CardHeader} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import  Link  from "next/link";
import { useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toaster from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // تأكد من تعيين هذا المتغير في ملف .env.local
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    
const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, {
                email,
                password,
            });
            login(response.data.token); // استدعاء دالة تسجيل الدخول من AuthContext
            router.push('/dashboard'); // توجيه المستخدم للصفحة الرئيسية بعد تسجيل الدخول
            toaster.success("Login successful!"); // عرض رسالة نجاح
            console.log("Login successful:", response.data);
            // هنا يمكنك إعادة توجيه المستخدم أو عرض رسالة نجاح
        }catch (error) {
            toaster.error("Login failed. Please check your credentials."); // عرض رسالة خطأ
            console.error("Login failed:", error);
            // هنا يمكنك عرض رسالة خطأ للمستخدم
        }
}

    return (
        <section className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <Card className="w-full max-w-md ">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Login  </CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="email" className="mb-2">Email</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}  id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                    <Label htmlFor="password" className="mb-2">Password</Label>
                    <div className="relative">
                    <Input value={password} onChange={(e) => setPassword(e.target.value)}  id="password" type={showPassword ? 'text' : 'password'}placeholder="Enter your password" required /> 
                    <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // <-- تبديل حالة الإظهار
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button> 
              </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                    Login
                </Button>
            </form>
            </CardContent>
            <p className="mt-4 text-center text-sm">
                Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register here</Link>
            </p>                
        </Card>
        </section>
    );
    }