"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Trash2 } from "lucide-react";


export default function Services() {
        const router = useRouter();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchServices();
        fetchExpenses();
    }, []);

    async function fetchServices() {
        try {
            const q = query(
                collection(db, "services"),
                orderBy("createdAt", "desc")
            );

            const snapshot = await getDocs(q);

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setServices(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchExpenses() {
        try {
            const snapshot = await getDocs(collection(db, "expenses"));

            let total = 0;

            snapshot.forEach((doc) => {
                total += Number(doc.data().amount || 0);
            });

            setTotalExpenses(total);
        } catch (error) {
            console.log(error);
        }
    }

    const filteredServices = useMemo(() => {
        return services.filter((item) => {
            const keyword = search.toLowerCase();

            return (
                item.customer?.toLowerCase().includes(keyword) ||
                item.service?.toLowerCase().includes(keyword) ||
                item.category?.toLowerCase().includes(keyword) ||
                item.staff?.toLowerCase().includes(keyword) ||
                item.serviceId?.toLowerCase().includes(keyword)
            );
        });
    }, [services, search]);

    const totalRevenue = filteredServices.reduce(
        (sum, item) => sum + Number(item.finalAmount || 0),
        0
    );

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = async () => {
        try {

            await deleteDoc(doc(db, "services", deleteId));

            setServices((prev) =>
                prev.filter((item) => item.id !== deleteId)
            );

            setShowDelete(false);

            setDeleteId(null);

        } catch (error) {

            console.error(error);

            alert("Failed to delete service.");

        }
    };

    const netProfit = totalRevenue - totalExpenses;

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-15 text-black">

            <div className="max-w-7xl mx-auto pt-10">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-red-700">
                            Service Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Monitor completed services, track revenue, manage expenses, and measure your salon's overall business performance.
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-4 md:mt-0 w-full md:w-80 rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                    />

                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <p className="text-gray-500">
                            Total Services
                        </p>

                        <h2 className="text-2xl font-bold mt-2">
                            {filteredServices.length}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <p className="text-gray-500">
                            Total Revenue
                        </p>

                        <h2 className=" text-2xl font-bold mt-2 text-green-600">
                            ₦{totalRevenue.toLocaleString()}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">

                        <p className="text-gray-500">
                            Total Expenses
                        </p>

                        <h2 className="text-2xl font-bold mt-2 text-red-600">
                            ₦{totalExpenses.toLocaleString()}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">

                        <p className="text-gray-500">
                            Net Profit
                        </p>

                        <h2
                            className={`text-2xl font-bold mt-2 ${netProfit >= 0
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            ₦{netProfit.toLocaleString()}
                        </h2>

                    </div>
                    {/* <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Paid Services
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-600">
              {
                filteredServices.filter(
                  (item) => item.paymentStatus === "Paid"
                ).length
              }
            </h2>
          </div> */}

                </div>

                <div className="bg-white rounded shadow overflow-auto">

                    <table className="w-full">

                        <thead className="bg-gray-600 text-white text-sm">

                            <tr>

                                <th className="text-left p-4">
                                    ID
                                </th>

                                <th className="text-left p-4">
                                    Client
                                </th>

                                {/* <th className="text-left p-4">
                  Cat
                </th> */}

                                <th className="text-left p-4">
                                    Service
                                </th>

                                <th className="text-left p-4">
                                    Staff
                                </th>

                                <th className="text-left p-4">
                                    Amt
                                </th>

                                {/* <th className="text-left p-4">
                  Status
                </th> */}

                                <th className="text-left p-4">
                                    Date
                                </th>
                                <th className="text-center p-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading && (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center p-8"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            )}

                            {!loading &&
                                filteredServices.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center p-8 text-gray-500"
                                        >
                                            No services found.
                                        </td>

                                    </tr>

                                )}

                            {filteredServices.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-4 text-sm ">
                                        {item.serviceId}
                                    </td>

                                    <td className="p-4 text-sm">
                                        {item.customer}
                                    </td>

                                    {/* <td className="p-4">
                    {item.category}
                  </td> */}

                                    <td className="p-4 text-sm">
                                        {item.service}
                                    </td>

                                    <td className="p-4 text-sm">
                                        {item.staff}
                                    </td>

                                    <td className="p-4 text-sm font-semibold text-green-700">
                                        ₦{Number(item.finalAmount).toLocaleString()}
                                    </td>

                                    {/* <td className="p-4 text-sm">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        item.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : item.paymentStatus === "Pending"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>

                  </td> */}

                                    <td className="p-4 text-sm">
                                        {item.date}
                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => openDeleteModal(item.id)}
                                                title="Delete"
                                                className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition cursor-pointer"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>

                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

<div className="max-w-5xl mx-auto mb-5 pt-10">
    <button
        type="button"
        onClick={() => router.push("/admin")}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
        <ArrowLeft size={18} />
        Go Back
    </button>
</div>
            </div>

            {/* DELETE MODAL  */}
            {showDelete && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

                        <div className="flex justify-center mb-4">

                            <div className="bg-red-100 p-4 rounded-full">

                                <Trash2
                                    size={28}
                                    className="text-red-600"
                                />

                            </div>

                        </div>

                        <h2 className="text-2xl font-bold text-center text-gray-800">

                            Delete Service

                        </h2>

                        <p className="text-gray-600 text-center mt-3">

                            Are you sure you want to delete this service?

                            <br />

                            This action cannot be undone.

                        </p>

                        <div className="flex justify-end gap-3 pt-8">

                            <button
                                onClick={() => {
                                    setShowDelete(false);
                                    setDeleteId(null);
                                }}
                                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
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