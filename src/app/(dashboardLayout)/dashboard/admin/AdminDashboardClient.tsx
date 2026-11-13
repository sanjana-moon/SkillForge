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
    "var(--teal)",
    "var(--teal)",
    "var(--teal)",
    "var(--navy)",
    "var(--navy)",
    "var(--navy)",
    "var(--navy)",
    "var(--navy)",
];

const AdminDashboardClient = ({
    dashboard,
}: AdminDashboardClientProps) => {
    const statCards = [
        {
            title: "Total Users",
            value: dashboard.totalUsers,
            color: "text-teal",
        },
        {
            title: "Total Courses",
            value: dashboard.totalCourses,
            color: "text-teal",
        },
        {
            title: "Total Enrollments",
            value: dashboard.totalEnrollments,
            color: "text-teal",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy">
                    Admin Dashboard
                </h1>
                <p className="text-navy/60 mt-2">
                    Overview of the SkillForge platform.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((item) => (
                    <Card
                        key={item.title}
                        className="bg-white border border-teal/20 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal/10"
                    >
                        <div className="p-6">
                            <p className="text-navy/60 text-sm">
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
            <Card className="bg-white border border-teal/20 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-navy">
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
                                    stroke: "var(--teal)",
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
                                            fill="var(--white)"
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
                                    backgroundColor: "var(--white)",
                                    border: "1px solid rgba(86, 124, 141, 0.3)",
                                    borderRadius: "12px",
                                    color: "var(--navy)",
                                }}
                                labelStyle={{
                                    color: "var(--navy)",
                                }}
                                itemStyle={{
                                    color: "var(--navy)",
                                }}
                            />

                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                formatter={(value) => (
                                    <span
                                        style={{
                                            color: "var(--navy)",
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
