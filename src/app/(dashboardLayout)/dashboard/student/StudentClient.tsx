"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Card,
    Button,
} from "@heroui/react";
import {
    FaBook,
    FaGraduationCap,
    FaClock,
    FaChartLine,
    FaArrowRight,
    FaCheckCircle,
    FaPlay,
} from "react-icons/fa";
import type { StudentStats } from "@/lib/api/courses/data";

interface StudentClientProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
        role?: string;
    };
    dashboardData: StudentStats;
}

export default function StudentClient({
    user,
    dashboardData,
}: StudentClientProps) {
    const { enrolledCourses, completedCourses, inProgress, recentCourses } = dashboardData;

    const stats = [
        {
            title: "Enrolled Courses",
            value: enrolledCourses,
            icon: <FaBook className="text-[#A78BFA]" />,
            color: "bg-[#A78BFA]/10 border-[#A78BFA]/20",
        },
        {
            title: "In Progress",
            value: inProgress,
            icon: <FaClock className="text-yellow-400" />,
            color: "bg-yellow-500/10 border-yellow-500/20",
        },
        {
            title: "Completed",
            value: completedCourses,
            icon: <FaGraduationCap className="text-green-400" />,
            color: "bg-green-500/10 border-green-500/20",
        },
    ];

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return "text-green-400";
        if (progress >= 50) return "text-yellow-400";
        return "text-[#A78BFA]";
    };

    const getProgressBarColor = (progress: number) => {
        if (progress >= 80) return "bg-green-400";
        if (progress >= 50) return "bg-yellow-400";
        return "bg-[#A78BFA]";
    };

    return (
        <section className="min-h-screen bg-[#10182B] p-4 md:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                        Welcome back, {user.name} 👋
                    </h1>
                    <p className="text-[#EDEFF5]/60 mt-2">
                        Continue your learning journey. Track your progress and pick up where you left off.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="transition-all duration-300"
                        >
                            <Card className={`bg-[#1C2740] border ${stat.color} rounded-2xl p-6 shadow-xl hover:shadow-[#A78BFA]/5 transition-all`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#EDEFF5]/60 text-sm font-medium">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl md:text-4xl font-bold text-[#EDEFF5] mt-2">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-[#10182B] flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 hover:shadow-[#A78BFA]/5 transition-all">
                            <h3 className="text-lg font-semibold text-[#EDEFF5] mb-2">
                                Browse New Courses
                            </h3>
                            <p className="text-[#EDEFF5]/60 text-sm mb-4">
                                Discover new courses and expand your skills.
                            </p>
                            <Link href="/courses">
                                <Button className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80">
                                    Explore Courses
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        </Card>

                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 hover:shadow-[#A78BFA]/5 transition-all">
                            <h3 className="text-lg font-semibold text-[#EDEFF5] mb-2">
                                AI Mentor
                            </h3>
                            <p className="text-[#EDEFF5]/60 text-sm mb-4">
                                Get personalized learning guidance from our AI Mentor.
                            </p>
                            <Link href="/ai-mentor">
                                <Button className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80">
                                    Chat with AI Mentor
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </motion.div>

                {/* Recent Courses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#EDEFF5]">
                            My Recent Courses
                        </h2>
                        {enrolledCourses > 0 && (
                            <Link href="/dashboard/student/my-courses">
                                <Button className="bg-transparent text-[#A78BFA] hover:bg-[#A78BFA]/10 font-medium">
                                    View All
                                    <FaArrowRight className="ml-2 text-sm" />
                                </Button>
                            </Link>
                        )}
                    </div>

                    {recentCourses && recentCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {recentCourses.map((course, index) => (
                                <motion.div
                                    key={course._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <Card className="bg-[#1C2740] border border-[#A78BFA]/10 hover:border-[#A78BFA]/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-[#A78BFA]/5">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-[#EDEFF5] truncate">
                                                    {course.courseTitle}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex items-center gap-1.5 text-sm text-[#EDEFF5]/60">
                                                        <FaClock className="text-[#A78BFA] text-xs" />
                                                        <span>{course.progress}% Complete</span>
                                                    </div>
                                                    {course.progress === 100 && (
                                                        <span className="flex items-center gap-1 text-xs text-green-400">
                                                            <FaCheckCircle />
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Link href={`/courses/${course.courseId}`}>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    className="bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 text-[#A78BFA] min-w-0 w-9 h-9 rounded-lg"
                                                >
                                                    <FaPlay className="text-xs" />
                                                </Button>
                                            </Link>
                                        </div>
                                        {/* Custom Progress Bar - ✅ Replaced HeroUI Progress */}
                                        <div className="mt-3">
                                            <div className="w-full h-2 bg-[#10182B] rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(course.progress)}`}
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                            <div className={`text-xs mt-1 text-right ${getProgressColor(course.progress)}`}>
                                                {course.progress}%
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/10 rounded-2xl p-12 text-center">
                            <FaBook className="text-4xl text-[#EDEFF5]/20 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-[#EDEFF5] mb-2">
                                No Courses Yet
                            </h3>
                            <p className="text-[#EDEFF5]/60 text-sm mb-4">
                                Start your learning journey by enrolling in your first course.
                            </p>
                            <Link href="/courses">
                                <Button className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80">
                                    Browse Courses
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        </Card>
                    )}
                </motion.div>

                {/* Learning Stats */}
                {enrolledCourses > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-[#EDEFF5] mb-4">
                                Learning Progress
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-[#A78BFA]">
                                        {completedCourses}
                                    </p>
                                    <p className="text-[#EDEFF5]/60 text-sm mt-1">Courses Completed</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-yellow-400">
                                        {inProgress}
                                    </p>
                                    <p className="text-[#EDEFF5]/60 text-sm mt-1">In Progress</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-[#EDEFF5]">
                                        {enrolledCourses}
                                    </p>
                                    <p className="text-[#EDEFF5]/60 text-sm mt-1">Total Enrolled</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}