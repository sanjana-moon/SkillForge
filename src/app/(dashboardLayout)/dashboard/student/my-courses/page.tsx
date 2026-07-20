import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/api/session";
import MyCoursesClient from "./MyCourseClient";

export const metadata: Metadata = {
    title: "My Courses | SkillForge",
    description: "View all your enrolled courses and track your learning progress.",
};

export default async function MyCoursesPage() {
    const user = await getUser();

    if (!user) {
        redirect("/signin");
    }

    return <MyCoursesClient userEmail={user.email} />;
}