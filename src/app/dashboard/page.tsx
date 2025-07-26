"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast"; // استيراد مكتبة التوست لإظهار الرسائل
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Expense {
  id: number;
  description: string;
  amount: string; // DECIMAL يعود كسلسلة نصية، من الأفضل التعامل معه هكذا
  category: string;
  created_at: string;
}

export default function Dashboard() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // تأكد من تعيين هذا المتغير في ملف .env.local
  const { token, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- State لنموذج "إضافة مصروف" ---
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // --- State لنموذج "تعديل مصروف" ---
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return; // توقف عن تنفيذ باقي الكود
    }
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/expenses`, {
          headers: {
            Authorization: `Bearer ${token}`, // استخدام التوكن من التخزين المحلي
          },
          // هنا يمكنك استخدام البيانات المسترجعة لعرضها في لوحة التحكم
        }); // استدعاء API للحصول على بيانات لوحة التحكم

        setExpenses(response.data); // تعيين البيانات المسترجعة في الحالة
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          logout();
        }
        // هنا يمكنك عرض رسالة خطأ للمستخدم
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoggedIn && token) {
      fetchExpenses();
    }
  }, [isLoggedIn, token, router, logout, apiUrl]);

  const handleDeleteExpense = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((expense) => expense.id !== id));
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };
  const handleAddExpense = async (e: FormEvent) => {
    e.preventDefault();
    if (!newDescription || !newAmount || !newCategory) {
      toast.error("Please fill all fields.");
      return;
    }

    const newExpenseData = {
      description: newDescription,
      amount: parseFloat(newAmount),
      category: newCategory,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/api/expenses`,
        newExpenseData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      setNewDescription("");
      setNewAmount("");
      setNewCategory("");
      toast.success("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense.");
    }
  };
  const openEditDialog = (expense: Expense) => {
    setEditingExpense(expense);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
    setIsEditDialogOpen(true);
  };

  // دالة لإرسال التعديلات
  const handleUpdateExpense = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;

    const updatedData = {
      description: editDescription,
      amount: parseFloat(editAmount),
      category: editCategory,
    };

    try {
      const response = await axios.patch(
        `${apiUrl}/api/expenses/${editingExpense.id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === editingExpense.id ? response.data : exp))
      );
      setIsEditDialogOpen(false);
      toast.success("Expense updated!");
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense.");
    }
  };
  if (!isLoggedIn) {
    return <div>Redirecting to login...</div>;
  }

  if (isLoading) {
    return <div>Loading your expenses...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>
        Welcome to your dashboard! Here you can manage your account and view
        your data.
      </p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Add Expense</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mt-6">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found. Add one to get started!</p>
      ) : (
        <ul className="space-y-2 mt-2">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <span>
                {expense.description} ({expense.category}): **$
                {parseFloat(expense.amount).toFixed(2)}**
              </span>
              <Button
                onClick={() => handleDeleteExpense(expense.id)}
                variant="destructive"
                size="sm"
              >
                Delete
              </Button>
              <Button
                onClick={() => openEditDialog(expense)}
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      )}
      {/* نافذة التعديل المنبثقة */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              Make changes to your expense here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateExpense} className="space-y-4">
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
