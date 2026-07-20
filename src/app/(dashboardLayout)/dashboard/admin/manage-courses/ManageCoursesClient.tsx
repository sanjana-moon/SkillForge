"use client";

import { useState } from "react";
import { Card, Button, Spinner } from "@heroui/react";
import { FaTrash, FaCheck, FaTimes, FaClock, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
    deleteCourseAdmin,
    updateCourseApproval,
    togglePublishCourse,
} from "@/lib/api/courses/actions";

import type { Course } from "@/lib/api/courses/data";

interface ManageCoursesClientProps {
    courses: Course[];
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
            return "bg-green-500/20 text-green-400 border-green-500/30";
        case "pending":
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        case "rejected":
            return "bg-red-500/20 text-red-400 border-red-500/30";
        default:
            return "bg-[#EDEFF5]/10 text-[#EDEFF5]/60 border-[#EDEFF5]/20";
    }
};

const getPublishStatusColor = (status: string) => {
    switch (status) {
        case "published":
            return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        case "unpublished":
            return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        default:
            return "bg-[#EDEFF5]/10 text-[#EDEFF5]/60 border-[#EDEFF5]/20";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "approved":
            return <FaCheck className="text-green-400" />;
        case "pending":
            return <FaClock className="text-yellow-400" />;
        case "rejected":
            return <FaTimes className="text-red-400" />;
        default:
            return null;
    }
};

const getNextApprovalStatus = (current: string): "pending" | "approved" | "rejected" => {
    switch (current) {
        case "pending":
            return "approved";
        case "approved":
            return "rejected";
        case "rejected":
            return "pending";
        default:
            return "pending";
    }
};

const ManageCoursesClient = ({
    courses: initialCourses,
}: ManageCoursesClientProps) => {
    const router = useRouter();
    const [courses, setCourses] = useState(initialCourses ?? []);
    const [loading, setLoading] = useState<string | null>(null);

    const handleToggleApproval = async (course: Course) => {
        const courseId = course._id;
        if (!courseId) {
            toast.error("Invalid course ID");
            return;
        }

        try {
            setLoading(courseId);
            const newStatus = getNextApprovalStatus(course.approvalStatus);

            const result = await updateCourseApproval(courseId, newStatus);

            if (result.success) {
                setCourses((prev) =>
                    prev.map((item) =>
                        item._id === courseId
                            ? {
                                ...item,
                                approvalStatus: newStatus,
                            }
                            : item
                    )
                );
                toast.success(`Approval status changed to ${newStatus}.`);
            } else {
                toast.error(result.error || "Failed to update approval status.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update approval status.");
        } finally {
            setLoading(null);
        }
    };

    const handleTogglePublish = async (course: Course) => {
        const courseId = course._id;
        if (!courseId) {
            toast.error("Invalid course ID");
            return;
        }

        try {
            setLoading(courseId);
            const newStatus = course.publishStatus === "published" ? "unpublished" : "published";

            const result = await togglePublishCourse(courseId, newStatus);

            if (result.success) {
                setCourses((prev) =>
                    prev.map((item) =>
                        item._id === courseId
                            ? {
                                ...item,
                                publishStatus: newStatus,
                            }
                            : item
                    )
                );
                toast.success(`Course ${newStatus === "published" ? "published" : "unpublished"} successfully.`);
            } else {
                toast.error(result.error || "Failed to update publish status.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update publish status.");
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!id) {
            toast.error("Invalid course ID");
            return;
        }

        if (!confirm("Are you sure you want to delete this course?")) return;

        try {
            setLoading(id);
            const result = await deleteCourseAdmin(id);

            if (result.success) {
                setCourses((prev) =>
                    prev.filter((course) => course._id !== id)
                );
                toast.success("Course deleted successfully.");
            } else {
                toast.error(result.error || "Failed to delete course.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete course.");
        } finally {
            setLoading(null);
        }
    };

    const handleViewCourse = (id: string) => {
        if (!id) return;
        router.push(`/courses/${id}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                    Manage Courses
                </h1>
                <p className="text-[#EDEFF5]/60 mt-2">
                    Review course submissions, approve or reject listings, and manage course content.
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4">
                    <p className="text-[#EDEFF5]/60 text-sm">Total Courses</p>
                    <p className="text-2xl font-bold text-[#EDEFF5]">{courses.length}</p>
                </Card>
                <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4">
                    <p className="text-[#EDEFF5]/60 text-sm">Pending Approval</p>
                    <p className="text-2xl font-bold text-yellow-400">
                        {courses.filter(c => c.approvalStatus === "pending").length}
                    </p>
                </Card>
                <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4">
                    <p className="text-[#EDEFF5]/60 text-sm">Approved</p>
                    <p className="text-2xl font-bold text-green-400">
                        {courses.filter(c => c.approvalStatus === "approved").length}
                    </p>
                </Card>
                <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4">
                    <p className="text-[#EDEFF5]/60 text-sm">Published</p>
                    <p className="text-2xl font-bold text-blue-400">
                        {courses.filter(c => c.publishStatus === "published").length}
                    </p>
                </Card>
            </div>

            {/* Table */}
            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#10182B] border-b border-[#A78BFA]/20">
                            <tr>
                                <th className="px-6 py-4 text-left text-[#EDEFF5] font-semibold text-sm">
                                    Course
                                </th>
                                <th className="px-6 py-4 text-left text-[#EDEFF5] font-semibold text-sm">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-[#EDEFF5] font-semibold text-sm">
                                    Level
                                </th>
                                <th className="px-6 py-4 text-left text-[#EDEFF5] font-semibold text-sm">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-left text-[#EDEFF5] font-semibold text-sm">
                                    Instructor
                                </th>
                                <th className="px-6 py-4 text-left text-[#EDEFF5] font-semibold text-sm">
                                    Approval
                                </th>
                                <th className="px-6 py-4 text-left text-[#EDEFF5] font-semibold text-sm">
                                    Publish
                                </th>
                                <th className="px-6 py-4 text-center text-[#EDEFF5] font-semibold text-sm">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => {
                                const courseId = course._id || "";
                                return (
                                    <tr
                                        key={courseId || Math.random().toString()}
                                        className="border-b border-[#A78BFA]/10 hover:bg-[#10182B]/50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <h3 className="font-semibold text-[#EDEFF5]">
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs text-[#EDEFF5]/40 mt-1">
                                                    {new Date(course.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-[#EDEFF5]/70">
                                            {course.category}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="capitalize text-[#EDEFF5]/70">
                                                {course.level}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 font-bold text-[#A78BFA]">
                                            ${course.price.toLocaleString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-[#EDEFF5] text-sm">
                                                    {course.instructorName}
                                                </p>
                                                <p className="text-xs text-[#EDEFF5]/40">
                                                    {course.instructorEmail}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Approval Status - Click to cycle */}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleApproval(course)}
                                                disabled={loading === courseId}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getStatusColor(course.approvalStatus)} hover:opacity-80 transition-opacity cursor-pointer`}
                                            >
                                                {loading === courseId ? (
                                                    <Spinner size="sm" />
                                                ) : (
                                                    <>
                                                        {getStatusIcon(course.approvalStatus)}
                                                        {course.approvalStatus}
                                                    </>
                                                )}
                                            </button>
                                        </td>

                                        {/* Publish Status - Click to toggle */}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleTogglePublish(course)}
                                                disabled={loading === courseId || course.approvalStatus !== "approved"}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getPublishStatusColor(course.publishStatus)} hover:opacity-80 transition-opacity cursor-pointer ${course.approvalStatus !== "approved" ? "opacity-50 cursor-not-allowed" : ""}`}
                                                title={course.approvalStatus !== "approved" ? "Course must be approved first" : "Click to toggle publish status"}
                                            >
                                                {loading === courseId ? (
                                                    <Spinner size="sm" />
                                                ) : (
                                                    <>
                                                        {course.publishStatus === "published" ? (
                                                            <FaCheck className="text-blue-400" />
                                                        ) : (
                                                            <FaTimes className="text-gray-400" />
                                                        )}
                                                        {course.publishStatus}
                                                    </>
                                                )}
                                            </button>
                                            {course.approvalStatus !== "approved" && (
                                                <p className="text-[10px] text-[#EDEFF5]/30 mt-1">
                                                    Approve first
                                                </p>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Button
                                                    size="sm"
                                                    onPress={() => handleViewCourse(courseId)}
                                                    className="bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 text-[#A78BFA] min-w-0 w-9 h-9 rounded-lg"
                                                >
                                                    <FaEye className="text-xs" />
                                                </Button>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    onPress={() => handleDelete(courseId)}
                                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 min-w-0 w-9 h-9 rounded-lg"
                                                >
                                                    <FaTrash className="text-sm" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {courses.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-12 text-[#EDEFF5]/40">
                                        No courses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Footer Stats */}
            <div className="flex flex-wrap justify-between items-center text-[#EDEFF5]/40 text-sm gap-4">
                <p>Total Courses: {courses.length}</p>
                <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        Approved: {courses.filter(c => c.approvalStatus === "approved").length}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        Pending: {courses.filter(c => c.approvalStatus === "pending").length}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        Rejected: {courses.filter(c => c.approvalStatus === "rejected").length}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                        Published: {courses.filter(c => c.publishStatus === "published").length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ManageCoursesClient;