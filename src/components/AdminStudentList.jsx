"use client";

import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import {
    User,
    BookOpen,
    Clock,
    MapPin,
    Phone,
    Mail,
    UserCheck,
    Smartphone,
} from "lucide-react";

export default function AdminStudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔄 Real-time fetch
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "students"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setStudents(data);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    // ❌ Delete student
    const handleDelete = async (id) => {
        const confirmDelete = confirm("Delete this application?");
        if (!confirmDelete) return;

        await deleteDoc(doc(db, "students", id));
    };

    // ✅ Accept student
    const handleAccept = async (id) => {
        await updateDoc(doc(db, "students", id), {
            status: "accepted",
        });
    };

    if (loading) {
        return <p className="text-center">Loading applications...</p>;
    }

    if (students.length === 0) {
        return <p className="text-center">No applications found</p>;
    }

    return (
        <div className="grid gap-4">
                                    <h2 className="text-base font-semibold text-black text-center uppercase py-5">
                            Trainee Applications
                        </h2>
            {students.map((student) => (
                <div
                    key={student.id}
                    className=" p-4 rounded-xl shadow space-y-1 border text-black bg-gray-200"
                >
                    {/* NAME */}
                    <div className=" text-right">

                        <span
                            className={`text-sm font-semibold text-right bg-white px-2 py-1 w-fit rounded-full ${student.status === "accepted"
                                ? "text-green-600"
                                : "text-yellow-600"
                                }`}
                        >
                            {student.status || "pending"}
                        </span>
                    </div>

                    {/* DETAILS */}
                    <div className="grid md:grid-cols-2 gap-4 mt-3">

                        {/* LEFT SIDE */}
                        <div className="border rounded-xl px-4 py-2 space-y-3 bg-gray-50">

                            <h3 className="text-sm font-bold text-gray-700 border-b pb-1 text-center text-red-900">
                                Apprentice Information
                            </h3>

                            <div className="flex items-center gap-2 text-sm">
                                <User className="text-red-900" size={16} />
                                <p> {student.name}</p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <BookOpen className="text-red-900" size={16} />
                                <p> {student.type}</p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="text-red-900" size={16} />
                                <p>
                                    {" "}
                                    {student.duration}/₦{student.price?.toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="text-red-900" size={16} />
                                <p>{student.phone}</p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="text-red-900" size={16} />
                                <p> {student.email}</p>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="border rounded-xl p-4 space-y-3 bg-gray-50">

                            <h3 className="text-sm font-bold text-gray-700 border-b pb-1 text-center text-red-900">
                                Emergency Contact
                            </h3>

                            <div className="flex items-center gap-2 text-sm">
                                <UserCheck className="text-red-900" size={16} />
                                <p>{student.emergencyName}</p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Smartphone className="text-red-900" size={16} />
                                <p> {student.emergencyPhone}</p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="text-red-900" size={16} />
                                <p>{student.emergencyEmail}</p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-4 pt-3 text-sm text-black flex justify-center items-center gap-2 text-sm">
                        <MapPin className="text-red-900" size={16} />
                        <p>
                           {student.address}
                        </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-between gap-3 mt-3">
                        <button
                            onClick={() => handleAccept(student.id)}
                            className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
                        >
                            Accept
                        </button>

                        <button
                            onClick={() => handleDelete(student.id)}
                            className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}