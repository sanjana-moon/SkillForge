import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/api/session";
import { getInstructorCourses } from "@/lib/api/courses/data";
import ManageCoursesClient from "./ManageCoursesClient";

export const metadata: Metadata = {
    title: "Manage My Courses | SkillForge",
    description: "Manage your courses, update details, and monitor their status on SkillForge.",
};

export default async function ManageCoursesPage() {
    const session = await getSession();
    
    if (!session) {
        redirect("/signin");
    }

    const user = session.user;
    const role = user?.role;

    if (role !== "instructor" && role !== "admin") {
        redirect("/dashboard");
    }

    // Get instructor's own courses
    const courses = await getInstructorCourses(user.email);

    return <ManageCoursesClient courses={courses} userRole={role} />;
}