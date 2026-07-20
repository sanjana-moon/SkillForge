import { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import BrowseCoursesClient from "./BrowseCoursesClient";

export const metadata: Metadata = {
    title: "Browse Courses | SkillForge",
    description: "Discover and browse all courses on SkillForge",
};

export default function BrowseCoursesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#10182B] flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        }>
            <BrowseCoursesClient />
        </Suspense>
    );
}