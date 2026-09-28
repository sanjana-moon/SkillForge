"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DashboardPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (isPending) return;
        
        const role = session?.user?.role;

        switch (role) {
            case "admin":
                router.replace("/dashboard/admin");
                break;

            case "instructor":
                router.replace("/dashboard/instructor");
                break;

            case "student":
                router.replace("/dashboard/student");
                break;

            default:
                router.replace("/");
        }
    }, [session, isPending, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1C2E24]">
            <div className="rounded-3xl border border-[#C5A059]/20 bg-[#3E5C4B] px-10 py-8 shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                    {/* Loading Spinner */}
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#C5A059]/30 border-t-[#C5A059]" />
                    <h2 className="text-2xl font-bold text-[#EBE3D5]">
                        Welcome to SkillForge
                    </h2>
                    <p className="text-sm text-[#EBE3D5]/60">
                        Preparing your dashboard...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
