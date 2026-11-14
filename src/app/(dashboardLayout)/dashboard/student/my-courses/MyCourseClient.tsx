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
    if (progress === 100) return "bg-success/10 text-success border-success/30";
    if (progress >= 50) return "bg-warning/10 text-warning border-warning/30";
    return "bg-accent/10 text-accent border-accent/30";
};

const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-success";
    if (progress >= 50) return "bg-warning";
    return "bg-action-primary";
};

export default function MyCoursesClient({
    userEmail,
}: MyCoursesClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "in-progress" | "not-started">("all");

    const { data: enrollments, isLoading, isError } = useStudentEnrollments(userEmail);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-main flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-main flex items-center justify-center p-4">
                <Card className="bg-surface border border-error/20 rounded-2xl p-8 text-center">
                    <p className="text-error">Failed to load your courses.</p>
                    <Button className="mt-4 bg-action-primary" onPress={() => window.location.reload()}>
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
            icon: <FaBook className="text-accent" />,
            color: "bg-accent/10 border-accent/20",
        },
        {
            label: "In Progress",
            value: inProgressCourses,
            icon: <FaClock className="text-warning" />,
            color: "bg-warning/10 border-warning/20",
        },
        {
            label: "Completed",
            value: completedCourses,
            icon: <FaGraduationCap className="text-success" />,
            color: "bg-success/10 border-success/20",
        },
        {
            label: "Not Started",
            value: notStartedCourses,
            icon: <FaSearch className="text-main/40" />,
            color: "bg-main border-main",
        },
    ];

    return (
        <div className="min-h-screen bg-main">
            <div className="section-container">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-main">
                        My Courses
                    </h1>
                    <p className="text-main/60 mt-2">
                        Track your learning progress across all enrolled courses.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className={`bg-surface border ${stat.color} rounded-2xl p-4 shadow-xl transition-all hover:shadow-accent/5`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-main/60 text-xs font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl md:text-3xl font-bold text-main mt-1">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-main flex items-center justify-center">
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
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-main/40" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-surface border border-main rounded-xl text-main placeholder:text-main/40 focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1">
                        <Button
                            onPress={() => setFilterStatus("all")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "all"
                                    ? "bg-action-primary"
                                    : "bg-surface border border-accent text-accent *:text-accent hover:bg-accent/10"
                            }`}
                        >
                            All
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("in-progress")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "in-progress"
                                    ? "bg-warning *:text-inverse"
                                    : "bg-surface border border-accent text-accent *:text-accent hover:bg-accent/10"
                            }`}
                        >
                            In Progress
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("completed")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "completed"
                                    ? "bg-success *:text-inverse"
                                    : "bg-surface border border-accent text-accent *:text-accent hover:bg-accent/10"
                            }`}
                        >
                            Completed
                        </Button>
                        <Button
                            onPress={() => setFilterStatus("not-started")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                filterStatus === "not-started"
                                    ? "bg-action-primary"
                                    : "bg-surface border border-accent text-accent *:text-accent hover:bg-accent/10"
                            }`}
                        >
                            Not Started
                        </Button>
                    </div>
                </div>

                {/* Courses Grid */}
                {filteredEnrollments.length === 0 ? (
                    <Card className="bg-surface border border-main rounded-2xl p-12 text-center">
                        <FaBook className="text-5xl text-main/20 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-main mb-2">
                            {totalCourses === 0 ? "No Courses Enrolled" : "No Courses Found"}
                        </h3>
                        <p className="text-main/60 text-sm mb-4">
                            {totalCourses === 0
                                ? "Start your learning journey by enrolling in your first course."
                                : "Try adjusting your search or filters to find your courses."}
                        </p>
                        {totalCourses === 0 && (
                            <Link href="/courses">
                                <Button className="bg-action-primary font-semibold hover:opacity-90">
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
                                className="bg-surface border border-main hover:border-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-accent/5 hover:-translate-y-1"
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
                                            <FaCheckCircle className="text-success" />
                                        )}
                                    </div>

                                    <h3 className="font-semibold text-main text-lg line-clamp-2 mb-2">
                                        {enrollment.courseTitle}
                                    </h3>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-sm mb-1.5">
                                            <span className="text-main/50">Progress</span>
                                            <span className={`font-medium ${
                                                enrollment.progress === 100
                                                    ? "text-success"
                                                    : enrollment.progress >= 50
                                                        ? "text-warning"
                                                        : "text-accent"
                                            }`}>
                                                {enrollment.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-main rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                                                    enrollment.progress
                                                )}`}
                                                style={{ width: `${enrollment.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-main">
                                        <p className="text-main/40 text-xs">
                                            Enrolled on{" "}
                                            {new Date(enrollment.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <Link href={`/courses/${enrollment.courseId}/content`}>
                                        <Button
                                            fullWidth
                                            className={`mt-4 font-semibold rounded-xl transition-all ${
                                                enrollment.progress === 100
                                                    ? "bg-success/10 border border-success/30 text-success *:text-success hover:bg-success/20"
                                                    : "bg-action-primary hover:opacity-90"
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