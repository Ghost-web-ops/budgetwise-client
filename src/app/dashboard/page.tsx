"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
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
  amount: string;
  category: string;
  created_at: string;
}

export default function Dashboard() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

  // --- State لنافذة تأكيد الحذف ---
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoggedIn && token) {
      fetchExpenses();
    }
  }, [isLoggedIn, token, router, logout, apiUrl]);

  // دالة فتح نافذة تأكيد الحذف
  const openDeleteDialog = (expense: Expense) => {
    setExpenseToDelete(expense);
    setIsDeleteDialogOpen(true);
  };

  // دالة تنفيذ الحذف بعد التأكيد
  const handleDeleteExpense = async () => {
    if (!expenseToDelete) return;

    try {
      await axios.delete(`${apiUrl}/api/expenses/${expenseToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(
        expenses.filter((expense) => expense.id !== expenseToDelete.id)
      );
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    } finally {
      setIsDeleteDialogOpen(false);
      setExpenseToDelete(null);
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
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-md dark:bg-gray-900 shadow-lg">
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAddExpense}
              className="space-y-4 dark:bg-gray-700 border-gray-600 bg-white "
            >
              <div>
                <Label htmlFor="description" className="mb-3">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount" className="mb-3">
                  Amount
                </Label>
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
                <Label htmlFor="category" className="mb-3">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className=" bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found. Add one to get started!</p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between 
                         bg-white text-zinc-900 border border-zinc-200 
                         dark:bg-zinc-800 dark:text-white dark:border-zinc-700 
                         p-4 rounded-xl shadow-sm"
            >
              <div>
                <p className="text-lg font-medium">
                  {expense.description} ({expense.category})
                </p>
                <p className="text-sm text-zinc-500 dark:text-gray-400">
                  Amount:{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${expense.amount}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditDialog(expense)}
                  className="px-4 py-1 rounded-md 
                             bg-blue-600 hover:bg-blue-700 text-white text-sm
                             dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteDialog(expense)}
                  className="px-4 py-1 rounded-md 
                             dark:bg-red-500 dark:hover:bg-red-600 bg-red-600 hover:bg-red-700 text-white text-sm
                             "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
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

      {/* نافذة تأكيد الحذف */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the expense &apos;
              {expenseToDelete?.description}&apos;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="dark:bg-red-500 dark:hover:bg-red-600 bg-red-600 hover:bg-red-700"
              onClick={handleDeleteExpense}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
