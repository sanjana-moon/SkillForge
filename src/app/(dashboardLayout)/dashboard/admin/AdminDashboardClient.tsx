"use client";

import { Card } from "@heroui/react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import type { AdminDashboard } from "@/lib/api/courses/data";

interface AdminDashboardClientProps {
    dashboard: AdminDashboard;
}

const COLORS = [
    "#A78BFA",
    "#7C3AED",
    "#8B5CF6",
    "#6D28D9",
    "#5B21B6",
    "#4C1D95",
    "#3B0764",
    "#1E1B4B",
];

const AdminDashboardClient = ({
    dashboard,
}: AdminDashboardClientProps) => {
    const statCards = [
        {
            title: "Total Users",
            value: dashboard.totalUsers,
            color: "text-[#A78BFA]",
        },
        {
            title: "Total Courses",
            value: dashboard.totalCourses,
            color: "text-[#8B5CF6]",
        },
        {
            title: "Total Enrollments",
            value: dashboard.totalEnrollments,
            color: "text-[#7C3AED]",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                    Admin Dashboard
                </h1>
                <p className="text-[#EDEFF5]/60 mt-2">
                    Overview of the SkillForge platform.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((item, index) => (
                    <Card
                        key={index}
                        className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#A78BFA]/10"
                    >
                        <div className="p-6">
                            <p className="text-[#EDEFF5]/60 text-sm">
                                {item.title}
                            </p>
                            <h2 className={`text-4xl font-bold mt-2 ${item.color}`}>
                                {item.value}
                            </h2>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Chart - Courses by Category */}
            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#EDEFF5]">
                    Courses by Category
                </h2>

                <div className="w-full h-[420px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dashboard.coursesByCategory}
                                dataKey="value"
                                nameKey="category"
                                outerRadius={140}
                                label={({ name, percent }) => 
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                                labelLine={true}
                            >
                                {dashboard.coursesByCategory.map(
                                    (_, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                    index % COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )}
                            </Pie>
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: "#1C2740",
                                    borderColor: "#A78BFA/30",
                                    color: "#EDEFF5",
                                }}
                                formatter={(value: number) => [`${value} courses`, "Total"]}
                            />
                            <Legend 
                                formatter={(value) => (
                                    <span style={{ color: "#EDEFF5" }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboardClient;