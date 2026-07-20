import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/api/session";
import { getCourseById } from "@/lib/api/courses/data";
import AddCourseContentClient from "./AddCourseContentClient";

interface AddCourseContentPageProps {
    params: Promise<{
        courseId: string;
    }>;
}

export const metadata: Metadata = {
    title: "Add Course Content | SkillForge",
    description: "Add detailed content to your course including lessons, code examples, and practice questions.",
};

export default async function AddCourseContentPage({
    params,
}: AddCourseContentPageProps) {
    const { courseId } = await params;
    const session = await getSession();

    if (!session) {
        redirect("/signin");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        redirect("/dashboard/instructor/manage-courses");
    }

    // Check if user is the instructor or admin
    if (course.instructorEmail !== session.user.email && session.user.role !== "admin") {
        redirect("/dashboard/instructor/manage-courses");
    }

    return <AddCourseContentClient courseId={courseId} courseTitle={course.title} />;
}