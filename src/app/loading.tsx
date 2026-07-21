import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#10182B] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <Spinner size="lg"/>
                
                {/* Loading Text */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-[#EDEFF5]">
                        Loading...
                    </h2>
                    <p className="text-[#EDEFF5]/40 text-sm mt-1">
                        Please wait while we prepare your content
                    </p>
                </div>

                {/* Animated Dots */}
                <div className="flex gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
            </div>
        </div>
    );
}