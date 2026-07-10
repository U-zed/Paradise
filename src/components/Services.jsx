"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Trash2, ClipboardPlus } from "lucide-react";


export default function Services() {
    const router = useRouter();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);

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
        (sum, item) => sum + Number(item.amount || 0),
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
                    <div className="flex justify-end gap-5 max-w-5xl  my-8 ">
                        <button
                            type="button"
                            onClick={() => router.push("/admin")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/services/add")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition"
                        >
                            <ClipboardPlus size={18} />
                            Add Service
                        </button>
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

                                {/* <th className="text-left p-4">
                                    ID
                                </th> */}

                                <th className="text-left p-4">
                                    Client
                                </th>

                                {/* <th className="text-left p-4">
                  Cat
                </th> */}

                                <th className="text-left p-4">
                                    Service
                                </th>
                                <th>Amount</th>

                                {/* <th className="text-left p-4">
                                    Staff
                                </th> */}


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
                                    onClick={() => {
                                        setSelectedService(item);
                                        setShowReceipt(true);
                                    }}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                >

                                    {/* <td className="p-4 text-sm ">
                                        {item.serviceId}
                                    </td> */}

                                    <td className="p-4 text-sm">
                                        {item.customer}
                                    </td>

                                    {/* <td className="p-4">
                    {item.category}
                  </td> */}

                                    <td className="p-4 text-sm">
                                        {item.service}
                                    </td>



                                    <td className="p-4 text-sm font-semibold text-green-700">
                                        ₦{Number(item.amount).toLocaleString()}
                                    </td>
{/* 
                                    <td className="p-4 text-sm">
                                        {item.staff}
                                    </td> */}


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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDeleteModal(item.id);
                                                }}
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


            </div>

            {/* RECEIPT MODAL */}
            {showReceipt && selectedService && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 px-4">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">

                        {/* Buttons */}
                        <div className="flex justify-end pr-2 pt-2">

                            <button
                                onClick={() => setShowReceipt(false)}
                                className="text-red-800 p-2 border border-red-800 rounded-full hover:bg-red-800 hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>

                            {/* <button
                                    onClick={() => window.print()}
                                    className="px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-950"
                                >
                                    Print Receipt
                                </button> */}
                        </div>

                        <div className="p-8">

                            {/* Title */}
                            <div className="flex items-center justify-between border-b pb-2">

                                <div>
                                    <h3 className="text-sm font-bold text-blue-900">
                                        Service Receipt
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Transaction Details
                                    </p>
                                </div>

                                <div className="text-right">

                                    <p className="text-xs  text-gray-500">
                                        Receipt No.
                                    </p>

                                    <p className="text-sm font-bold text-red-600">
                                        {selectedService.serviceId}
                                    </p>

                                </div>

                            </div>

                            {/* Customer */}
                            <div className="mt-2">

                                <h4 className="text-sm font-bold text-gray-800 mb-2">
                                    Customer Information
                                </h4>

                                <div className="grid grid-cols-2 gap-1">

                                    <div className="bg-gray-50 rounded-xl p-2">

                                        <p className="text-xs text-gray-500 uppercase">
                                            Name
                                        </p>

                                        <p className="text-sm font-semibold text-gray-900 mt-1">
                                            {selectedService.customer}
                                        </p>

                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-2">

                                        <p className="text-xs text-gray-500 uppercase">
                                            Date
                                        </p>

                                        <p className="text-sm font-semibold text-gray-900 mt-1">
                                            {selectedService.date}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Service */}
                            <div className="mt-2">

                                <h4 className="text-sm font-bold text-gray-800 mb-4">
                                    Service Information
                                </h4>

                                <div className="grid grid-cols-2 gap-1">

                                    <div className="bg-gray-50 rounded-xl p-2">

                                        <p className="text-xs text-gray-500 uppercase">
                                            Service
                                        </p>

                                        <p className="text-sm font-semibold mt-1">
                                            {selectedService.service}
                                        </p>

                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-2">

                                        <p className="text-xs text-gray-500 uppercase">
                                            Staff
                                        </p>

                                        <p className="text-sm font-semibold mt-1">
                                            {selectedService.staff || "Not Assigned"}
                                        </p>

                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-2">

                                        <p className="text-xs text-gray-500 uppercase">
                                            Payment Method
                                        </p>

                                        <p className="text-sm font-semibold mt-1">
                                            {selectedService.paymentMethod}
                                        </p>

                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">

                                        <p className="text-xs text-green-700 uppercase">
                                            Amount Paid
                                        </p>

                                        <p className="text-sm font-bold text-green-600 mt-1">
                                            ₦{Number(selectedService.amount).toLocaleString()}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Notes */}
                            {selectedService.notes && (

                                <div className="bg-gray-50 rounded-xl p-2 mt-1">
                                    <p className="text-xs text-gray-500 uppercase">
                                        Notes
                                    </p>
                                    <p className="text-sm font-semibold mt-1">
                                        {selectedService.notes}
                                    </p>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="border-t mt-4 pt-3 text-center">

                                <p className="text-red-800 font-semibold">
                                    Thank you for choosing Paradise WBL.
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    Beauty • Nails • Pedicure • Professional Training
                                </p>

                            </div>

                        </div>

                    </div>
                </div>
            )}

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