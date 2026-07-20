import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCourseById, getCourseContent } from "@/lib/api/courses/data";
import { getSession } from "@/lib/api/session";
import CourseContentClient from "./CourseContentClient";

interface CourseContentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: CourseContentPageProps): Promise<Metadata> {
    const { id } = await params;
    const course = await getCourseById(id);

    if (!course) {
        return {
            title: "Course Not Found",
        };
    }

    return {
        title: `${course.title} - Course Content | SkillForge`,
        description: course.description,
    };
}

export default async function CourseContentPage({
    params,
}: CourseContentPageProps) {
    const { id } = await params;

    // Check if user is authenticated
    const session = await getSession();
    if (!session) {
        redirect("/signin");
    }

    const course = await getCourseById(id);
    if (!course) {
        notFound();
    }

    const content = await getCourseContent(id);

    return <CourseContentClient course={course} content={content} user={session.user} />;
}