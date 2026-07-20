import { Metadata } from "next";
import { redirect } from "next/navigation";
import { roleValidator, getUser } from "@/lib/api/session";
import StudentClient from "./StudentClient";

export const metadata: Metadata = {
    title: "Student Dashboard | SkillForge",
    description: "Manage your courses, track progress, and continue learning on SkillForge.",
};

export default async function StudentDashboardPage() {
    await roleValidator("student");
    const user = await getUser();
    
    if (!user) {
        redirect("/signin");
    }

    return <StudentClient user={user} />;
}