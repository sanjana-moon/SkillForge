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
                {statCards.map((item) => (
                    <Card
                        key={item.title}
                        className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#A78BFA]/10"
                    >
                        <div className="p-6">
                            <p className="text-[#EDEFF5]/60 text-sm">
                                {item.title}
                            </p>

                            <h2
                                className={`text-4xl font-bold mt-2 ${item.color}`}
                            >
                                {item.value}
                            </h2>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Courses by Category */}
            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#EDEFF5]">
                    Courses by Category
                </h2>

                <div className="w-full h-105">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dashboard.coursesByCategory}
                                dataKey="value"
                                nameKey="category"
                                outerRadius={130}
                                labelLine={{
                                    stroke: "#A78BFA",
                                    strokeWidth: 2,
                                }}
                                label={({ cx, cy, midAngle, outerRadius, percent, name }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = (outerRadius ?? 130) + 35;

                                    const angle = midAngle ?? 0;

                                    const x = (cx ?? 0) + radius * Math.cos(-angle * RADIAN);
                                    const y = (cy ?? 0) + radius * Math.sin(-angle * RADIAN);

                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill="#FFFFFF"
                                            textAnchor={x > (cx ?? 0) ? "start" : "end"}
                                            dominantBaseline="central"
                                            fontSize={14}
                                            fontWeight={600}
                                        >
                                            {`${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {dashboard.coursesByCategory.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => [
                                    `${Number(value ?? 0)} Courses`,
                                    "Count",
                                ]}
                                contentStyle={{
                                    backgroundColor: "#1C2740",
                                    border: "1px solid rgba(167,139,250,.3)",
                                    borderRadius: "12px",
                                    color: "#EDEFF5",
                                }}
                                labelStyle={{
                                    color: "#EDEFF5",
                                }}
                                itemStyle={{
                                    color: "#EDEFF5",
                                }}
                            />

                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                formatter={(value) => (
                                    <span
                                        style={{
                                            color: "#EDEFF5",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {value}
                                    </span>
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