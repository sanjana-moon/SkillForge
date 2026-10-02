"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, Spinner } from "@heroui/react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {
    FaBook,
    FaUsers,
    FaGraduationCap,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getInstructorStats } from "@/lib/api/courses/data";
import type { InstructorStats } from "@/lib/api/courses/data";

const InstructorPage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [stats, setStats] = useState<InstructorStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Role validation
    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.push("/login");
            return;
        }

        const role = session?.user?.role;
        if (role !== "instructor" && role !== "admin") {
            router.push("/dashboard");
            return;
        }
    }, [session, isPending, router]);

    // Load data
    useEffect(() => {
        if (!session?.user?.email) return;
        if (session?.user?.role !== "instructor" && session?.user?.role !== "admin") return;

        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Ã¢Å“â€¦ Use the data.ts function instead of direct fetch
                const data = await getInstructorStats(session.user.email);
                setStats(data);
            } catch (error) {
                console.error("Error loading instructor stats:", error);
                setError("Failed to load dashboard data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [session?.user?.email, session?.user?.role]);

    if (isPending || loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-[#FFFFFF]">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] bg-[#FFFFFF]">
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-[image:var(--brand-gradient)] text-[#FFFFFF] px-6 py-2 rounded-xl hover:opacity-90 transition-all"
                >
                    Retry
                </button>
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Courses",
            value: stats?.totalCourses ?? 0,
            icon: <FaBook size={24} />,
        },
        {
            title: "Total Students",
            value: stats?.totalStudents ?? 0,
            icon: <FaUsers size={24} />,
        },
        {
            title: "Active Courses",
            value: stats?.totalCourses ?? 0,
            icon: <FaGraduationCap size={24} />,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#4B4B5A]">
                    Instructor Dashboard
                </h1>
                <p className="text-[#4B4B5A]/60 mt-2">
                    Track your courses, students, and performance metrics.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((item, index) => (
                    <Card
                        key={index}
                        className="bg-[#FBF8FD] border border-[#0E7CC9]/20 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0E7CC9]/10"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[#4B4B5A]/60 text-sm">
                                        {item.title}
                                    </p>
                                    <h2 className="text-3xl font-bold text-[#4B4B5A] mt-2">
                                        {item.value}
                                    </h2>
                                </div>
                                <div className="bg-[#0E7CC9]/15 p-4 rounded-2xl text-[#0E7CC9]">
                                    {item.icon}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Chart + Popular Courses */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Enrollment Chart */}
                <Card className="lg:col-span-2 bg-[#FBF8FD] border border-[#0E7CC9]/20 rounded-2xl shadow-xl">
                    <div className="p-4 md:p-6">
                        <h2 className="text-xl font-bold text-[#4B4B5A] mb-6">
                            Enrollment Overview
                        </h2>
                        <div className="h-64 md:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats?.enrollmentChart ?? []}>
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: "#4B4B5A" }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: "#4B4B5A" }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ stroke: "#0E7CC9" }}
                                        contentStyle={{
                                            backgroundColor: "#FBF8FD",
                                            borderColor: "#0E7CC9/30",
                                            color: "#4B4B5A",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="enrollments"
                                        stroke="#0E7CC9"
                                        strokeWidth={3}
                                        dot={{ fill: "#0E7CC9", r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card>

                {/* Popular Courses */}
                <Card className="bg-[#FBF8FD] border border-[#0E7CC9]/20 rounded-2xl shadow-xl">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-[#4B4B5A] mb-6">
                            Most Popular Courses
                        </h2>

                        {!stats?.popularCourses?.length ? (
                            <p className="text-[#4B4B5A]/40 text-sm">
                                No enrollments yet.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {stats.popularCourses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center border-b border-[#0E7CC9]/20 pb-3 last:border-0"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-[#4B4B5A] text-sm">
                                                {course.title}
                                            </h3>
                                            <p className="text-xs text-[#4B4B5A]/50">
                                                Popular course
                                            </p>
                                        </div>
                                        <div className="bg-[#0E7CC9]/10 text-[#0E7CC9] font-bold px-3 py-1 rounded-xl text-sm">
                                            {course.enrollments}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#FBF8FD] border border-[#0E7CC9]/20 rounded-2xl shadow-xl hover:shadow-[#0E7CC9]/10 transition-all duration-300">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-[#4B4B5A] mb-2">
                            Create New Course
                        </h3>
                        <p className="text-[#4B4B5A]/60 text-sm mb-4">
                            Share your knowledge with the world. Create a new course today.
                        </p>
                        <a
                            href="/dashboard/instructor/add-course"
                            className="inline-block bg-[image:var(--brand-gradient)] text-[#FFFFFF] font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition-all"
                        >
                            Create Course
                        </a>
                    </div>
                </Card>

                <Card className="bg-[#FBF8FD] border border-[#0E7CC9]/20 rounded-2xl shadow-xl hover:shadow-[#0E7CC9]/10 transition-all duration-300">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-[#4B4B5A] mb-2">
                            Manage Your Courses
                        </h3>
                        <p className="text-[#4B4B5A]/60 text-sm mb-4">
                            View, edit, and manage all your published and draft courses.
                        </p>
                        <a
                            href="/dashboard/instructor/manage-courses"
                            className="inline-block bg-[image:var(--brand-gradient)] text-[#FFFFFF] font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition-all"
                        >
                            Manage Courses
                        </a>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default InstructorPage;
