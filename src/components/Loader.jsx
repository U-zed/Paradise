"use client";

import Image from "next/image";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            
            {/* ROTATING BORDER WRAPPER */}
            <div className="relative flex items-center justify-center">
                
                {/* Rotating border */}
                <div className="absolute w-28 h-28 rounded-full border-4 border-t-red-900 border-r-transparent border-b-red-300 border-l-transparent animate-spin"></div>

                {/* Logo in center */}
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Image
                        src="/images/paradise.jpg"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="rounded-full object-contain"
                    />
                </div>

            </div>
        </div>
    );
}