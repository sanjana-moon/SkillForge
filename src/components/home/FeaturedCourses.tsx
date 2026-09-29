"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Spinner, Button } from "@heroui/react";
import { FaArrowRight, FaBook } from "react-icons/fa";
import CourseCard from "../courses/CourseCard";
import { getFeaturedCourses } from "@/lib/api/courses/data";
import type { Course } from "@/lib/api/courses/data";

const categories = [
    { value: "all", label: "All" },
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "ai-ml", label: "AI & ML" },
    { value: "web-development", label: "Web Development" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "cyber-security", label: "Cyber Security" },
];

export default function FeaturedCourses() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getFeaturedCourses(activeCategory);
                if (!cancelled) setCourses(data);
            } catch (err) {
                console.error("Error fetching featured courses:", err);
                if (!cancelled) setError("Failed to load courses. Please try again.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [activeCategory, reloadKey]);

    return (
        <section className="py-20 bg-[#1C2E24] relative border-t border-[#C5A059]/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="max-w-xl text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EBE3D5]">
                            Featured{" "}
                            <span className="bg-gradient-to-r from-[#C5A059] to-[#5C3A21] bg-clip-text text-transparent">
                                Courses
                            </span>
                        </h2>
                        <p className="mt-3 text-[#EBE3D5]/70 font-body">
                            Explore outstanding technical curricula designed in tandem with industrial milestones.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono border transition-all duration-300 ${
                                    activeCategory === cat.value
                                        ? "bg-[#C5A059] border-[#C5A059] text-[#1C2E24] shadow-md shadow-[#C5A059]/10"
                                        : "border-[#C5A059]/20 text-[#EBE3D5]/75 hover:border-[#C5A059] hover:text-[#EBE3D5]"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Courses Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <Spinner size="lg" />
                        <p className="text-[#EBE3D5]/60 mt-4">Loading featured courses...</p>
                    </div>
                ) : error ? (
                    <Card className="bg-[#3E5C4B] border border-red-500/20 rounded-2xl p-12 text-center">
                        <p className="text-red-400 text-lg">{error}</p>
                        <Button
                            className="mt-4 bg-[#C5A059] text-[#1C2E24]"
                            onPress={() => setReloadKey((k) => k + 1)}
                        >
                            Retry
                        </Button>
                    </Card>
                ) : courses.length === 0 ? (
                    <Card className="bg-[#3E5C4B] border border-[#C5A059]/10 rounded-2xl p-12 text-center">
                        <FaBook className="text-5xl text-[#EBE3D5]/20 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#EBE3D5] mb-2">
                            No Courses Found
                        </h3>
                        <p className="text-[#EBE3D5]/60 text-sm mb-4">
                            No courses available in this category yet.
                        </p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="flex justify-center mt-12">
                    <Link href="/courses">
                        <Button className="bg-[#C5A059] text-[#1C2E24] font-semibold hover:bg-[#C5A059]/80 px-8 py-6 text-base">
                            View All Courses
                            <FaArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}