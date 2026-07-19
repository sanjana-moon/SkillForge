import type { Metadata } from "next";
import { fetchAllCourses } from "@/lib/api/courses/data"; // ✅ Changed from venues to courses
import ManageCoursesClient from "./ManageCoursesClient";

export const metadata: Metadata = {
    title: "Manage Courses | SkillForge",
    description: "Manage all courses, update details, and monitor their approval status on SkillForge.",
};

export default async function ManageCoursesPage() {
    const courses = await fetchAllCourses();

    return <ManageCoursesClient courses={courses} />;
}