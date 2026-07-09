"use client";

import { useEffect, useMemo, useState } from "react";
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Expenses() {
    const router = useRouter();
    const today = new Date().toISOString().split("T")[0];
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const [form, setForm] = useState({
        expenseTitle: "",
        amount: "",
        notes: "",
        date: today,
    });

    const expenseId = useMemo(() => {
        const first = Math.floor(Math.random() * 90 + 10); // 10-99
        const second = Math.floor(Math.random() * 90 + 10); // 10-99

        return `pwbl${first}exp${second}`;
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, []);

    async function fetchExpenses() {

        const q = query(
            collection(db, "expenses"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setExpenses(list);

    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await addDoc(collection(db, "expenses"), {

                expenseId,

                ...form,

                amount: Number(form.amount),

                createdAt: serverTimestamp(),

            });

            alert("Expense recorded successfully.");

            setForm({
                expenseTitle: "",
                amount: "",
                notes: "",
                date: today,
            });

            fetchExpenses();

        } catch (error) {

            console.log(error);

            alert("Something went wrong.");

        } finally {

            setLoading(false);

        }

    }

    const filteredExpenses = expenses.filter((item) => {

        const keyword = search.toLowerCase();

        return (
            item.expenseTitle?.toLowerCase().includes(keyword) ||
            item.notes?.toLowerCase().includes(keyword)
        );

    });

    const totalExpenses = filteredExpenses.reduce(

        (sum, item) => sum + Number(item.amount),

        0

    );

    return (

        <div className="min-h-screen bg-gray-100 p-6 pt-20">

            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <div className="py-8">

                        <h2 className="text-2xl font-bold text-blue-900">
                            Record New Expense
                        </h2>

                        <div className="flex ">
                            <p className="text-gray-500 mt-1">
                                Keep track of your daily business expenses to maintain accurate financial records and monitor salon spending.
                            </p>

                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 text-black">

                    <h2 className="text-xl font-bold mb-2 text-center">
                        Record New Expense
                    </h2>

                    <p className="text-gray-500 text-center mb-6">
                        Enter details of every business expense to keep your Paradise WBL financial records accurate.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-6"
                    >

                        <div className="flex justify-between">
                            <div>

                                <p className="text-sm font-medium text-gray-600">
                                    Date
                                </p>

                                <p className="text-sm font-semibold text-black">
                                    {today}
                                </p>

                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Expense ID
                                </p>

                                <p className="text-sm font-semibold text-red-600">
                                    {expenseId}
                                </p>
                            </div>
                        </div>

                        <div>

                            <label className="font-semibold">
                                Expense Description
                            </label>

                            <input
                                type="text"
                                name="expenseTitle"
                                value={form.expenseTitle}
                                onChange={handleChange}
                                placeholder="Enter expense description (e.g. Nail Products, Rent, Electricity)"
                                required
                                className="w-full mt-2 rounded-lg border border-gray-300 p-3 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                Expense Amount (₦)
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="Enter the amount spent"
                                required
                                className="w-full mt-2 rounded-lg border p-3"
                            />

                        </div>

                        <div className="md:col-span-2">
                            <label className="font-semibold">
                                Additional Notes (optional)
                            </label>

                            <textarea
                                rows="2"
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                placeholder="Enter additional details about this expense"
                                className="w-full mt-2 rounded-lg border p-3"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() => router.push("/admin")}
                                className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition"
                            >
                                <ArrowLeft size={18} />
                                Back to Dashboard
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 rounded-lg transition"
                            >
                                {loading ? "Recording Expense..." : "Record Expense"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}