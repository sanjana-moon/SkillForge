import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <Spinner size="lg"/>
                
                {/* Loading Text */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-[#4B4B5A]">
                        Loading...
                    </h2>
                    <p className="text-[#4B4B5A]/40 text-sm mt-1">
                        Please wait while we prepare your content
                    </p>
                </div>

                {/* Animated Dots */}
                <div className="flex gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-[image:var(--brand-gradient)] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[image:var(--brand-gradient)] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[image:var(--brand-gradient)] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
            </div>
        </div>
    );
}
