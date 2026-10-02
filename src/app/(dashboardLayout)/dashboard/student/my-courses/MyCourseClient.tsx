"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button, Spinner } from "@heroui/react";
import {
    FaBook,
    FaPlay,
    FaCheckCircle,
    FaClock,
    FaArrowRight,
    FaGraduationCap,
    FaSearch,
} from "react-icons/fa";
import type { Enrollment } from "@/lib/api/courses/data";
import { useStudentEnrollments } from "@/lib/hooks/useCourses";

interface MyCoursesClientProps {
    userEmail: string;
}

const getStatusText = (progress: number) => {
    if (progress === 100) return "Completed";
    if (progress > 0) return "In Progress";
    return "Not Started";
};

const getStatusBadgeColor = (progress: number) => {
    if (progress === 100) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (progress >= 50) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-[#0E7CC9]/20 text-[#0E7CC9] border-[#0E7CC9]/30";
};

const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-400";
    if (progress >= 50) return "bg-yellow-400";
    return "bg-[image:var(--brand-gradient)]";
};

export default function MyCoursesClient({
    userEmail,
}: MyCoursesClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "in-progress" | "not-started">("all");

    // Ã¢Å“â€¦ Use React Query for student enrollments
    const { data: enrollments, isLoading, isError } = useStudentEnrollments(userEmail);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">
                <Card className="bg-[#FBF8FD] border border-red-500/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400">Failed to load your courses.</p>
                    <Button className="mt-4 bg-[image:var(--brand-gradient)] text-[#FFFFFF]" onPress={() => window.location.reload()}>
                        Retry
                    </Button>
                </Card>
            </div>
        );
    }

    const filteredEnrollments = (enrollments || []).filter((enrollment: Enrollment) => {
        const matchesSearch = enrollment.courseTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const progress = enrollment.progress;
        let matchesStatus = true;
        if (filterStatus === "completed") matchesStatus = progress === 100;
        else if (filterStatus === "in-progress") matchesStatus = progress > 0 && progress < 100;
        else if (filterStatus === "not-started") matchesStatus = progress === 0;

        return matchesSearch && matchesStatus;
    });

    const totalCourses = enrollments?.length || 0;
    const completedCourses = (enrollments || []).filter((e: Enrollment) => e.progress === 100).length;
    const inProgressCourses = (enrollments || []).filter((e: Enrollment) => e.progress > 0 && e.progress < 100).length;
    const notStartedCourses = (enrollments || []).filter((e: Enrollment) => e.progress === 0).length;

    const stats = [
        {
            label: "Total Enrolled",
            value: totalCourses,
            icon: <FaBook className="text-[#0E7CC9]" />,
            color: "bg-[#0E7CC9]/10 border-[#0E7CC9]/20",
        },
        {
            label: "In Progress",
            value: inProgressCourses,
            icon: <FaClock className="text-yellow-400" />,
            color: "bg-yellow-500/10 border-yellow-500/20",
        },
        {
            label: "Completed",
            value: completedCourses,
            icon: <FaGraduationCap className="text-green-400" />,
            color: "bg-green-500/10 border-green-500/20",
        },
        {
            label: "Not Started",
            value: notStartedCourses,
            icon: <FaSearch className="text-[#4B4B5A]/40" />,
            color: "bg-[#4B4B5A]/10 border-[#4B4B5A]/20",
        },
    ];

    return (
        <div className="min-h-screen bg-[#FFFFFF] p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#4B4B5A]">
                        My Courses
                    </h1>
                    <p className="text-[#4B4B5A]/60 mt-2">
                        Track your learning progress across all enrolled courses.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className={`bg-[#FBF8FD] border ${stat.color} rounded-2xl p-4 shadow-xl transition-all hover:shadow-[#0E7CC9]/5`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#4B4B5A]/60 text-xs font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl md:text-3xl font-bold text-[#4B4B5A] mt-1">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] flex items-center justify-center">
                                    {stat.icon}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B4B5A]/40" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#FBF8FD] border border-[#0E7CC9]/20 rounded-xl text-[#4B4B5A] placeholder:text-[#4B4B5A]/40 focus:outline-none focus:border-[#0E7CC9] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1">
                        <Button
                            onPress={() => setFilterStatus("all")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "all"
                                    ? "bg-[image:var(--brand-gradient)] text-[#FFFFFF]"
                                    : "bg-[#FBF8FD] text-[#4B4B5A]/60 hover:text-[#4B4B5A] border border-[#0E7CC9]/20"
                            }`}
                        >
                            All
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("in-progress")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "in-progress"
                                    ? "bg-yellow-500 text-[#FFFFFF]"
                                    : "bg-[#FBF8FD] text-[#4B4B5A]/60 hover:text-[#4B4B5A] border border-[#0E7CC9]/20"
                            }`}
                        >
                            In Progress
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("completed")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "completed"
                                    ? "bg-green-500 text-[#FFFFFF]"
                                    : "bg-[#FBF8FD] text-[#4B4B5A]/60 hover:text-[#4B4B5A] border border-[#0E7CC9]/20"
                            }`}
                        >
                            Completed
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("not-started")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "not-started"
                                    ? "bg-[#4B4B5A]/20 text-[#4B4B5A]"
                                    : "bg-[#FBF8FD] text-[#4B4B5A]/60 hover:text-[#4B4B5A] border border-[#0E7CC9]/20"
                            }`}
                        >
                            Not Started
                        </Button>
                    </div>
                </div>

                {/* Courses Grid */}
                {filteredEnrollments.length === 0 ? (
                    <Card className="bg-[#FBF8FD] border border-[#0E7CC9]/10 rounded-2xl p-12 text-center">
                        <FaBook className="text-5xl text-[#4B4B5A]/20 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#4B4B5A] mb-2">
                            {totalCourses === 0 ? "No Courses Enrolled" : "No Courses Found"}
                        </h3>
                        <p className="text-[#4B4B5A]/60 text-sm mb-4">
                            {totalCourses === 0
                                ? "Start your learning journey by enrolling in your first course."
                                : "Try adjusting your search or filters to find your courses."}
                        </p>
                        {totalCourses === 0 && (
                            <Link href="/courses">
                                <Button className="bg-[image:var(--brand-gradient)] text-[#FFFFFF] font-semibold hover:opacity-90">
                                    Browse Courses
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        )}
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {filteredEnrollments.map((enrollment: Enrollment) => (
                            <Card
                                key={enrollment._id}
                                className="bg-[#FBF8FD] border border-[#0E7CC9]/10 hover:border-[#0E7CC9]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[#0E7CC9]/5 hover:-translate-y-1"
                            >
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                                                enrollment.progress
                                            )}`}
                                        >
                                            {getStatusText(enrollment.progress)}
                                        </span>
                                        {enrollment.progress === 100 && (
                                            <FaCheckCircle className="text-green-400" />
                                        )}
                                    </div>

                                    <h3 className="font-semibold text-[#4B4B5A] text-lg line-clamp-2 mb-2">
                                        {enrollment.courseTitle}
                                    </h3>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-sm mb-1.5">
                                            <span className="text-[#4B4B5A]/50">Progress</span>
                                            <span className={`font-medium ${getStatusBadgeColor(enrollment.progress)}`}>
                                                {enrollment.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-[#FFFFFF] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                                                    enrollment.progress
                                                )}`}
                                                style={{ width: `${enrollment.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-[#0E7CC9]/10">
                                        <p className="text-[#4B4B5A]/40 text-xs">
                                            Enrolled on{" "}
                                            {new Date(enrollment.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    {/* Ã¢Å“â€¦ Updated Link to go to content page */}
                                    <Link href={`/courses/${enrollment.courseId}/content`}>
                                        <Button
                                            fullWidth
                                            className={`mt-4 font-semibold rounded-xl transition-all ${
                                                enrollment.progress === 100
                                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                                                    : "bg-[image:var(--brand-gradient)] text-[#FFFFFF] hover:opacity-90"
                                            }`}
                                        >
                                            {enrollment.progress === 100 ? (
                                                <>
                                                    <FaCheckCircle />
                                                    Review Course
                                                </>
                                            ) : enrollment.progress > 0 ? (
                                                <>
                                                    <FaPlay />
                                                    Continue Learning
                                                </>
                                            ) : (
                                                <>
                                                    <FaPlay />
                                                    Start Course
                                                </>
                                            )}
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
