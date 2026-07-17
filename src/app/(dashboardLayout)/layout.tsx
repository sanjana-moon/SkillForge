"use client";

import DashboardSideBar from "@/component/dashboard/DashboardSidebar";
import { ReactNode } from "react";

const DashboardLayout = ({
    children,
}: {
    children: ReactNode;
}) => {
    return (
        <div className="min-h-screen flex bg-[#F0F7F4]">
            <DashboardSideBar />
            <div className="container w-full px-6 py-10">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;