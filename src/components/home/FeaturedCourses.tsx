"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Spinner, Button } from "@heroui/react";
import { FaArrowRight, FaBook } from "react-icons/fa";
import CourseCard from "../courses/CourseCard";
import { getCourses } from "@/lib/api/courses/data";
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

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const filters: any = {
                    page: 1,
                    limit: 8,
                    sort: "popular",
                };

                // Add category filter if not "all"
                if (activeCategory !== "all") {
                    filters.category = activeCategory;
                }

                const response = await getCourses(filters);
                setCourses(response.courses);
            } catch (error) {
                console.error("Error fetching featured courses:", error);
                setError("Failed to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedCourses();
    }, [activeCategory]);

    if (loading) {
        return (
            <section className="py-20 bg-[#10182B] relative border-t border-[#A78BFA]/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <Spinner size="lg" />
                        <p className="text-[#EDEFF5]/60 mt-4">Loading featured courses...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-[#10182B] relative border-t border-[#A78BFA]/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card className="bg-[#1C2740] border border-red-500/20 rounded-2xl p-12 text-center">
                        <p className="text-red-400 text-lg">{error}</p>
                        <Button 
                            className="mt-4 bg-[#A78BFA] text-[#10182B]"
                            onPress={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-[#10182B] relative border-t border-[#A78BFA]/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="max-w-xl text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EDEFF5]">
                            Featured{" "}
                            <span className="bg-gradient-to-r from-[#A78BFA] to-[#4FD1C5] bg-clip-text text-transparent">
                                Courses
                            </span>
                        </h2>
                        <p className="mt-3 text-[#EDEFF5]/70 font-body">
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
                                        ? "bg-[#A78BFA] border-[#A78BFA] text-[#10182B] shadow-md shadow-[#A78BFA]/10"
                                        : "border-[#A78BFA]/20 text-[#EDEFF5]/75 hover:border-[#A78BFA] hover:text-[#EDEFF5]"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Courses Grid */}
                {courses.length === 0 ? (
                    <Card className="bg-[#1C2740] border border-[#A78BFA]/10 rounded-2xl p-12 text-center">
                        <FaBook className="text-5xl text-[#EDEFF5]/20 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#EDEFF5] mb-2">
                            No Courses Found
                        </h3>
                        <p className="text-[#EDEFF5]/60 text-sm mb-4">
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
                        <Button className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80 px-8 py-6 text-base">
                            View All Courses
                            <FaArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}