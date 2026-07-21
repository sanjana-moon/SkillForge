import Link from "next/link";
import { Button } from "@heroui/react";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#10182B] flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <div className="text-[#A78BFA] text-9xl font-bold opacity-10 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">🔍</div>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#EDEFF5] mb-4">
                    Page Not Found
                </h1>
                <p className="text-[#EDEFF5]/60 text-lg mb-2">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <p className="text-[#EDEFF5]/40 text-sm mb-8">
                    It might have been removed, renamed, or didn't exist in the first place.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button
                            className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80 px-8 py-6 text-base"
                        >
                            <FaHome className="mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/courses">
                        <Button
                            className="border border-[#A78BFA]/30 text-[#EDEFF5] hover:bg-[#A78BFA]/10 px-8 py-6 text-base"
                        >
                            <FaSearch className="mr-2" />
                            Browse Courses
                        </Button>
                    </Link>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 text-[#EDEFF5]/40 hover:text-[#EDEFF5] transition-colors text-sm flex items-center justify-center gap-2 mx-auto"
                >
                    <FaArrowLeft className="text-xs" />
                    Go Back
                </button>

                {/* Footer Note */}
                <div className="mt-12 pt-8 border-t border-[#A78BFA]/10">
                    <p className="text-[#EDEFF5]/20 text-xs">
                        If you believe this is an error, please contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
}