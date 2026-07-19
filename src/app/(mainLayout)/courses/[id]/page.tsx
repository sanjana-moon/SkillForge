import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/api/courses/data";
import CourseDetailsClient from "./CourseDeatilsClient";

interface CourseDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: CourseDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const course = await getCourseById(id);

    if (!course) {
        return {
            title: "Course Not Found",
        };
    }

    return {
        title: `${course.title} | SkillForge`,
        description: course.description,
    };
}

export default async function CourseDetailsPage({
    params,
}: CourseDetailsPageProps) {
    const { id } = await params;
    const course = await getCourseById(id);

    if (!course) {
        notFound();
    }

    return <CourseDetailsClient course={course} />;
}