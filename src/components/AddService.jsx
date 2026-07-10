"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";



export default function AddService() {
    const router = useRouter();
    const today = new Date().toISOString().split("T")[0];

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        customer: "",
        service: "",
        staff: "",
        amount: "",
        paymentMethod: "",
        notes: "",
        date: today,
    });


    const serviceId = useMemo(() => {
        const first = Math.floor(Math.random() * 90 + 10); // 10-99
        const second = Math.floor(Math.random() * 90 + 10); // 10-99

        return `pwbl${first}ser${second}`;
    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await addDoc(collection(db, "services"), {
                serviceId,
                ...form,
                amount: Number(form.amount),
                createdAt: serverTimestamp(),
            });

            alert("Service Added Successfully!");

            setForm({
                customer: "",
                service: "",
                staff: "",
                amount: "",
                paymentMethod: "",
                notes: "",
                date: today,
            });
        } catch (error) {
            console.error(error);
            alert("Failed to save service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 text-black pt-12">
         

            <h1 className="text-3xl font-bold text-blue-900 pt-10">
                Record Service
            </h1>

            <p className="text-gray-600 pb-8 py-3 max-w-2xl mx-auto">
                Record a completed salon service by entering the customer, service, payment and transaction details for accurate business records.
            </p>
               <div className="flex justify-end gap-5 max-w-5xl  my-10">
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
                    onClick={() => router.push("/services")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition"
                >
                    <ClipboardList size={18} />
                    View Services
                </button>
            </div>

            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl px-8 pb-8 pt-4">
                
                <div className="flex items-center justify-end mb-8">

                <div >

                    <div className="flex gap-1 justify-end">

                        <p className="text-sm text-gray-500">
                            Date: 
                        </p>

                        <p className="text-sm font-semibold text-black ">
                            {today}
                        </p>
                    </div>

                    <div className="flex gap-1 justify-end">

                        <p className="text-sm text-gray-500">
                            Service ID:
                        </p>

                        <p className="text-sm font-semibold text-red-600">
                            {serviceId}
                        </p>

                    </div>

                </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-6"
                >

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Customer Name
                        </label>

                        <input
                            type="text"
                            name="customer"
                            value={form.customer}
                            onChange={handleChange}
                            placeholder="Enter Customer Name"
                            required
                            className="w-full mt-2 rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Service Provided
                        </label>

                        <input
                            type="text"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            placeholder="Enter the service provided (e.g. Short Acrylic, Gel Polish, Luxury Pedicure)"
                            required
                            className="w-full mt-2 rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Amount Charged (₦)
                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            placeholder="Enter the amount charged"
                            required
                            className="w-full mt-2 rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                        />
                    </div>



                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Payment Method
                        </label>

                        <select
                            name="paymentMethod"
                            value={form.paymentMethod}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                        >
                            <option value="">Select Payment Method</option>
                            <option>Card</option>
                            <option>Transfer</option>
                            <option>Cash</option>
                            <option>POS</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Service Performed By
                        </label>

                        <input
                            type="text"
                            name="staff"
                            value={form.staff}
                            onChange={handleChange}
                            placeholder="Enter the staff member's name"
                            className="w-full mt-2 rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Additional Notes (Optional)
                        </label>

                        <textarea
                            rows="2"
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            placeholder="Enter any additional notes about this service"
                            className="w-full mt-2 rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-between gap-4 pt-4 border-t">

                        <button
                            type="button"
                            onClick={() =>
                                setForm({
                                    customer: "",
                                    service: "",
                                    staff: "",
                                    amount: "",
                                    paymentMethod: "",
                                    notes: "",
                                    date: today,
                                })
                            }
                            className="px-8 py-3 rounded-lg border hover:text-white border-red-600  text-red-600 hover:bg-red-600 transition"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-900 hover:bg-green-950 disabled:bg-green-300 text-white px-8 py-3 rounded-lg font-semibold transition"
                        >
                            {loading ? "Saving..." : "Save Service"}
                        </button>

                    </div>

                </form>


            </div>

        </div>
    );
}