import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-[#10182B]">
            <DashboardSidebar />

            <main className="min-h-screen lg:ml-[280px] p-4 md:p-6 lg:p-8 transition-all duration-300">
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;