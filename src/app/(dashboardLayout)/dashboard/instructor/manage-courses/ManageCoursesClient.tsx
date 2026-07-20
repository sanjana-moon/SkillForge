"use client";

import { useState } from "react";
import { Card, Button, Spinner } from "@heroui/react";
import { 
    FaTrash, 
    FaCheck, 
    FaTimes, 
    FaClock, 
    FaEye,
    FaBook,
    FaEdit,
    FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
    deleteCourse,
    togglePublishCourse,
} from "@/lib/api/courses/actions";
import type { Course } from "@/lib/api/courses/data";
import EditCourseModal from "@/components/courses/EditCourseModal";
import DeleteCourseModal from "@/components/courses/DeleteCourseModal";

interface ManageCoursesClientProps {
    courses: Course[];
    userRole?: string;
    onCourseUpdate?: () => void;
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

const ManageCoursesClient = ({
    courses: initialCourses,
    userRole,
    onCourseUpdate,
}: ManageCoursesClientProps) => {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>(initialCourses ?? []);
    const [loading, setLoading] = useState<string | null>(null);
    
    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [deletedId, setDeletedId] = useState<string | null>(null);

    const isAdmin = userRole === "admin";

    const handleTogglePublish = async (course: Course) => {
        try {
            setLoading(course._id ?? '');
            const newStatus = course.publishStatus === "published" ? "unpublished" : "published";

            const result = await togglePublishCourse(course._id!, newStatus);

            if (result.success) {
                setCourses((prev) =>
                    prev.map((item) =>
                        item._id === course._id
                            ? {
                                ...item,
                                publishStatus: newStatus,
                            }
                            : item
                    )
                );
                toast.success(`Course ${newStatus === "published" ? "published" : "unpublished"} successfully.`);
                onCourseUpdate?.();
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
        try {
            setLoading(id);
            const result = await deleteCourse(id);

            if (result.success) {
                setCourses((prev) =>
                    prev.filter((course) => course._id !== id)
                );
                toast.success("Course deleted successfully.");
                onCourseUpdate?.();
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
        router.push(`/courses/${id}`);
    };

    const handleEditCourse = (course: Course) => {
        setEditingCourse(course);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setDeletedId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSuccess = (id: string) => {
        setCourses((prev) =>
            prev.filter((course) => course._id !== id)
        );
        onCourseUpdate?.();
    };

    const handleAddContent = (courseId: string) => {
        router.push(`/dashboard/instructor/add-course-content/${courseId}`);
    };

    // Stats
    const totalCourses = courses.length;
    const approvedCount = courses.filter(c => c.approvalStatus === "approved").length;
    const pendingCount = courses.filter(c => c.approvalStatus === "pending").length;
    const rejectedCount = courses.filter(c => c.approvalStatus === "rejected").length;
    const publishedCount = courses.filter(c => c.publishStatus === "published").length;

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF5] text-center mt-5">
                        My Courses
                    </h1>
                    <p className="text-[#EDEFF5]/60 mt-2 text-center">
                        Manage your courses, track their approval status, and update content.
                    </p>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4">
                        <p className="text-[#EDEFF5]/60 text-sm">Total</p>
                        <p className="text-2xl font-bold text-[#EDEFF5]">{totalCourses}</p>
                    </Card>
                    <Card className="bg-[#1C2740] border border-green-500/20 rounded-2xl p-4">
                        <p className="text-[#EDEFF5]/60 text-sm">Approved</p>
                        <p className="text-2xl font-bold text-green-400">{approvedCount}</p>
                    </Card>
                    <Card className="bg-[#1C2740] border border-yellow-500/20 rounded-2xl p-4">
                        <p className="text-[#EDEFF5]/60 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
                    </Card>
                    <Card className="bg-[#1C2740] border border-blue-500/20 rounded-2xl p-4">
                        <p className="text-[#EDEFF5]/60 text-sm">Published</p>
                        <p className="text-2xl font-bold text-blue-400">{publishedCount}</p>
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
                                        Status
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
                                {courses.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-[#EDEFF5]/40">
                                            <FaBook className="text-4xl mx-auto mb-3 opacity-50" />
                                            <p>No courses found.</p>
                                            <p className="text-sm mt-1 text-[#EDEFF5]/30">
                                                Create your first course to get started.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    courses.map((course) => {
                                        const courseId = course._id ?? '';
                                        return (
                                            <tr
                                                key={courseId}
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

                                                {/* Approval Status */}
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 w-fit ${getStatusColor(course.approvalStatus)}`}>
                                                        {getStatusIcon(course.approvalStatus)}
                                                        {course.approvalStatus}
                                                    </span>
                                                </td>

                                                {/* Publish Status - Click to toggle */}
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleTogglePublish(course)}
                                                        disabled={loading === courseId || course.approvalStatus !== "approved"}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getPublishStatusColor(course.publishStatus)} transition-all ${course.approvalStatus !== "approved" ? "opacity-50 cursor-not-allowed" : "hover:opacity-80 cursor-pointer"}`}
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
                                                        {/* View Course */}
                                                        <Button
                                                            size="sm"
                                                            onPress={() => handleViewCourse(courseId)}
                                                            className="bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 text-[#A78BFA] min-w-0 w-9 h-9 rounded-lg"
                                                        >
                                                            <FaEye className="text-xs" />
                                                        </Button>
                                                        
                                                        {/* Edit Course */}
                                                        <Button
                                                            size="sm"
                                                            onPress={() => handleEditCourse(course)}
                                                            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 min-w-0 w-9 h-9 rounded-lg"
                                                        >
                                                            <FaEdit className="text-xs" />
                                                        </Button>

                                                        {/* ✅ Add Content - NEW */}
                                                        <Button
                                                            size="sm"
                                                            onPress={() => handleAddContent(courseId)}
                                                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 min-w-0 w-9 h-9 rounded-lg"
                                                        >
                                                            <FaPlus className="text-xs" />
                                                        </Button>

                                                        {/* Delete Course */}
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            onPress={() => handleDeleteClick(courseId)}
                                                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 min-w-0 w-9 h-9 rounded-lg"
                                                        >
                                                            <FaTrash className="text-sm" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Footer Stats */}
                <div className="flex flex-wrap justify-between items-center text-[#EDEFF5]/40 text-sm gap-4">
                    <p>Total Courses: {totalCourses}</p>
                    <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-400"></span>
                            Approved: {approvedCount}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            Pending: {pendingCount}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            Rejected: {rejectedCount}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                            Published: {publishedCount}
                        </span>
                    </div>
                </div>

                {/* Quick Action - Create Course */}
                {totalCourses === 0 && (
                    <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-[#EDEFF5] mb-2">
                            Ready to share your knowledge?
                        </h3>
                        <p className="text-[#EDEFF5]/60 text-sm mb-4">
                            Create your first course and start teaching today.
                        </p>
                        <a
                            href="/dashboard/instructor/add-course"
                            className="inline-block bg-[#A78BFA] text-[#10182B] font-semibold px-6 py-2 rounded-xl hover:bg-[#A78BFA]/80 transition-all"
                        >
                            Create Course
                        </a>
                    </Card>
                )}
            </div>

            {/* Modals */}
            <EditCourseModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                editingCourse={editingCourse}
                setEditingCourse={setEditingCourse}
                onUpdateSuccess={onCourseUpdate}
            />

            <DeleteCourseModal
                isDeleteOpen={isDeleteModalOpen}
                setIsDeleteOpen={setIsDeleteModalOpen}
                deletedId={deletedId}
                setDeletedId={setDeletedId}
                onDeleteSuccess={handleDeleteSuccess}
            />
        </>
    );
};

export default ManageCoursesClient;