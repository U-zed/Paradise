"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { db } from "@/firebase/config";

export default function Expenses() {

    const router = useRouter();

    const today = new Date().toISOString().split("T")[0];

    const categories = [
        "Food",
        "Transportation",
        "Security",
        "Electricity",
        "Water",
        "Internet",
        "Equipment",
        "Miscellaneous",
        "Rent",
        "Inventory Purchase",
        "Salon Supplies",
        "Staff Salary",
    ];

    const paymentMethods = [
        "Cash",
        "Transfer",
        "POS",
    ];

    const [loading, setLoading] = useState(false);

    const [expenses, setExpenses] = useState([]);

    const [search, setSearch] = useState("");

    const [deleteId, setDeleteId] = useState(null);

    const [showDelete, setShowDelete] = useState(false);

    const [form, setForm] = useState({
        expenseTitle: "",
        category: "",
        amount: "",
        paymentMethod: "",
        vendor: "",
        staff: "",
        notes: "",
        date: today,
    });

    const expenseId = useMemo(() => {
        return `pwbl${Math.floor(100000 + Math.random() * 900000)}`;
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

            alert("Expense added successfully.");

            setForm({

                expenseTitle: "",
                category: "",
                amount: "",
                paymentMethod: "",
                vendor: "",
                staff: "",
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

            item.category?.toLowerCase().includes(keyword) ||

            item.vendor?.toLowerCase().includes(keyword)

        );

    });

    const totalExpenses = filteredExpenses.reduce(

        (sum, item) => sum + Number(item.amount),

        0

    );

    return (

        <div className="min-h-screen bg-gray-100 p-6  px-3 pt-15">

            <div className="max-w-7xl mx-auto pt-10">
                <div>
                    <h1 className="text-2xl font-bold text-red-700">
                        Expense Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Review, search, and manage all salon expenses to maintain accurate financial records and monitor business spending.
                    </p>
                </div>

                <div className="text-black bg-white rounded shadow-lg mt-8 p-6">

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                        <h2 className="text-xl font-bold">
                            Expense History
                        </h2>

                        <input
                            type="text"
                            placeholder="Search expenses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-80 rounded-lg border p-3"
                        />

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-600 text-white">

                                <tr>

                                    <th className="text-sm text-left p-4">ID</th>

                                    {/* <th className="text-left p-4">Title</th> */}

                                    <th className="text-sm text-left p-4">Category</th>

                                    <th className="text-sm text-left p-4">Amount</th>

                                    {/* <th className="text-left p-4">Method</th> */}

                                    {/* <th className="text-left p-4">Vendor</th> */}

                                    <th className="text-sm text-left p-4">Date</th>

                                    <th className="text-sm text-center p-4">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredExpenses.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center py-8 text-gray-500"
                                        >
                                            No expenses recorded.
                                        </td>

                                    </tr>

                                )}

                                {filteredExpenses.map((expense) => (

                                    <tr
                                        key={expense.id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-4  text-sm font-semibold">
                                            {expense.expenseId}
                                        </td>

                                        {/* <td className="p-4">
                                            {expense.expenseTitle}
                                        </td> */}

                                        <td className="p-4 text-sm font-semibold">
                                            {expense.category}
                                        </td>

                                        <td className="p-4 text-sm font-semibold text-red-600">
                                            ₦{Number(expense.amount).toLocaleString()}
                                        </td>

                                        {/* <td className="p-4">
                                            {expense.paymentMethod}
                                        </td> */}

                                        {/* <td className="p-4">
                                            {expense.vendor}
                                        </td> */}

                                        <td className="p-4 text-sm font-semibold">
                                            {expense.date}
                                        </td>

                                        <td className="p-4 text-center">

                                            <button
                                                onClick={() => {
                                                    setDeleteId(expense.id);
                                                    setShowDelete(true);
                                                }}
                                                className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg cursor-pointer"
                                            >
                                                <Trash2 size={15} />
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

               <div className="mt-5">
  <button
    onClick={() => router.push("/admin")}
    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
  >
    <ArrowLeft size={18} />
    Go Back
  </button>
</div>
            </div>

            {showDelete && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl w-96 p-6">

                        <div className="flex justify-center mb-4">

                            <div className="bg-red-100 p-4 rounded-full">

                                <Trash2
                                    size={28}
                                    className="text-red-600"
                                />

                            </div>

                        </div>
                        <h2 className="text-xl font-bold text-center text-gray-800">

                            Delete Service

                        </h2>

                        <p className="text-gray-600 text-center mt-3">

                            Are you sure you want to delete this service?

                            <br />

                            This action cannot be undone.

                        </p>

                        <div className="flex justify-end gap-3 pt-8">

                            <button
                                onClick={() => setShowDelete(false)}
                                className="px-6 py-2 border rounded-lg hover:bg-gray-100 text-gray-400"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {

                                    await deleteDoc(doc(db, "expenses", deleteId));

                                    setExpenses((prev) =>
                                        prev.filter((item) => item.id !== deleteId)
                                    );

                                    setShowDelete(false);

                                    setDeleteId(null);

                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}