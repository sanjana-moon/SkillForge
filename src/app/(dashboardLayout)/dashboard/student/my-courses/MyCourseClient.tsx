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
    return "bg-[#A78BFA]/20 text-[#A78BFA] border-[#A78BFA]/30";
};

const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-400";
    if (progress >= 50) return "bg-yellow-400";
    return "bg-[#A78BFA]";
};

export default function MyCoursesClient({
    userEmail,
}: MyCoursesClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "in-progress" | "not-started">("all");

    // ✅ Use React Query for student enrollments
    const { data: enrollments, isLoading, isError } = useStudentEnrollments(userEmail);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#10182B] flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#10182B] flex items-center justify-center p-4">
                <Card className="bg-[#1C2740] border border-red-500/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400">Failed to load your courses.</p>
                    <Button className="mt-4 bg-[#A78BFA] text-[#10182B]" onPress={() => window.location.reload()}>
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
            icon: <FaBook className="text-[#A78BFA]" />,
            color: "bg-[#A78BFA]/10 border-[#A78BFA]/20",
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
            icon: <FaSearch className="text-[#EDEFF5]/40" />,
            color: "bg-[#EDEFF5]/10 border-[#EDEFF5]/20",
        },
    ];

    return (
        <div className="min-h-screen bg-[#10182B] p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                        My Courses
                    </h1>
                    <p className="text-[#EDEFF5]/60 mt-2">
                        Track your learning progress across all enrolled courses.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className={`bg-[#1C2740] border ${stat.color} rounded-2xl p-4 shadow-xl transition-all hover:shadow-[#A78BFA]/5`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#EDEFF5]/60 text-xs font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl md:text-3xl font-bold text-[#EDEFF5] mt-1">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#10182B] flex items-center justify-center">
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
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EDEFF5]/40" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#1C2740] border border-[#A78BFA]/20 rounded-xl text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 focus:outline-none focus:border-[#A78BFA] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1">
                        <Button
                            onPress={() => setFilterStatus("all")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "all"
                                    ? "bg-[#A78BFA] text-[#10182B]"
                                    : "bg-[#1C2740] text-[#EDEFF5]/60 hover:text-[#EDEFF5] border border-[#A78BFA]/20"
                            }`}
                        >
                            All
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("in-progress")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "in-progress"
                                    ? "bg-yellow-500 text-[#10182B]"
                                    : "bg-[#1C2740] text-[#EDEFF5]/60 hover:text-[#EDEFF5] border border-[#A78BFA]/20"
                            }`}
                        >
                            In Progress
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("completed")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "completed"
                                    ? "bg-green-500 text-[#10182B]"
                                    : "bg-[#1C2740] text-[#EDEFF5]/60 hover:text-[#EDEFF5] border border-[#A78BFA]/20"
                            }`}
                        >
                            Completed
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("not-started")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "not-started"
                                    ? "bg-[#EDEFF5]/20 text-[#EDEFF5]"
                                    : "bg-[#1C2740] text-[#EDEFF5]/60 hover:text-[#EDEFF5] border border-[#A78BFA]/20"
                            }`}
                        >
                            Not Started
                        </Button>
                    </div>
                </div>

                {/* Courses Grid */}
                {filteredEnrollments.length === 0 ? (
                    <Card className="bg-[#1C2740] border border-[#A78BFA]/10 rounded-2xl p-12 text-center">
                        <FaBook className="text-5xl text-[#EDEFF5]/20 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#EDEFF5] mb-2">
                            {totalCourses === 0 ? "No Courses Enrolled" : "No Courses Found"}
                        </h3>
                        <p className="text-[#EDEFF5]/60 text-sm mb-4">
                            {totalCourses === 0
                                ? "Start your learning journey by enrolling in your first course."
                                : "Try adjusting your search or filters to find your courses."}
                        </p>
                        {totalCourses === 0 && (
                            <Link href="/courses">
                                <Button className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80">
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
                                className="bg-[#1C2740] border border-[#A78BFA]/10 hover:border-[#A78BFA]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[#A78BFA]/5 hover:-translate-y-1"
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

                                    <h3 className="font-semibold text-[#EDEFF5] text-lg line-clamp-2 mb-2">
                                        {enrollment.courseTitle}
                                    </h3>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-sm mb-1.5">
                                            <span className="text-[#EDEFF5]/50">Progress</span>
                                            <span className={`font-medium ${getStatusBadgeColor(enrollment.progress)}`}>
                                                {enrollment.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-[#10182B] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                                                    enrollment.progress
                                                )}`}
                                                style={{ width: `${enrollment.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-[#A78BFA]/10">
                                        <p className="text-[#EDEFF5]/40 text-xs">
                                            Enrolled on{" "}
                                            {new Date(enrollment.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <Link href={`/courses/${enrollment.courseId}`}>
                                        <Button
                                            fullWidth
                                            className={`mt-4 font-semibold rounded-xl transition-all ${
                                                enrollment.progress === 100
                                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                                                    : "bg-[#A78BFA] text-[#10182B] hover:bg-[#A78BFA]/80"
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