import { Metadata } from "next";
import { redirect } from "next/navigation";
import { roleValidator, getUser } from "@/lib/api/session";
import { fetchAdminDashboard } from "@/lib/api/courses/data";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Admin Dashboard | SkillForge",
    description: "Manage your SkillForge admin dashboard",
};

export default async function AdminDashboardPage() {
    await roleValidator("admin");
    const user = await getUser();
    
    if (!user) {
        redirect("/signin");
    }

    // ✅ Fetch admin dashboard data and pass as prop
    const dashboard = await fetchAdminDashboard();

    return <AdminDashboardClient dashboard={dashboard} />;
}