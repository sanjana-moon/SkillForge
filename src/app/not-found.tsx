"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <div className="text-[#0E7CC9] text-9xl md:text-[10rem] font-bold opacity-10 select-none">
                        404
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">Ã°Å¸â€Â</span>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#4B4B5A] mb-4">
                    Page Not Found
                </h1>

                <p className="text-[#4B4B5A]/60 text-lg mb-2">
                    Oops! The page you're looking for doesn't exist or has been
                    moved.
                </p>

                <p className="text-[#4B4B5A]/40 text-sm mb-8">
                    It might have been removed, renamed, or never existed in the
                    first place.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/">
                        <Button
                            className="bg-[image:var(--brand-gradient)] text-[#FFFFFF] font-semibold hover:opacity-90 px-8 py-6 text-base"
                        >
                            <FaHome />
                            Back to Home
                        </Button>
                    </Link>

                    <Link href="/courses">
                        <Button
                            className="border-[#0E7CC9]/30 text-[#4B4B5A] hover:bg-[#0E7CC9]/10 px-8 py-6 text-base"
                        >
                            <FaSearch />
                            Browse Courses
                        </Button>
                    </Link>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 text-[#4B4B5A]/40 hover:text-[#4B4B5A] transition-colors text-sm flex items-center justify-center gap-2 mx-auto"
                >
                    <FaArrowLeft className="text-xs" />
                    Go Back
                </button>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-[#0E7CC9]/10">
                    <p className="text-[#4B4B5A]/20 text-xs">
                        If you believe this is an error, please contact our
                        support team.
                    </p>
                </div>
            </div>
        </div>
    );
}
