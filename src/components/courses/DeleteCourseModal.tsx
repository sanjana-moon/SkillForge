"use client";

import { Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteCourse } from "@/lib/api/courses/actions";

interface DeleteCourseModalProps {
    isDeleteOpen: boolean;
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deletedId: string | null;
    setDeletedId: React.Dispatch<React.SetStateAction<string | null>>;
    onDeleteSuccess?: (id: string) => void;
}

export default function DeleteCourseModal({
    isDeleteOpen,
    setIsDeleteOpen,
    deletedId,
    setDeletedId,
    onDeleteSuccess,
}: DeleteCourseModalProps) {
    const handleDeleteCourse = async () => {
        if (!deletedId) return;

        try {
            const result = await deleteCourse(deletedId);
            if (result.success) {
                toast.success("Course deleted successfully.");
                onDeleteSuccess?.(deletedId);
                setIsDeleteOpen(false);
                setDeletedId(null);
            } else {
                toast.error(result.error || "Failed to delete course.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete course.");
        }
    };

    // ✅ If not open, return null (don't render anything)
    if (!isDeleteOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={(e) => {
                // Close modal when clicking outside
                if (e.target === e.currentTarget) {
                    setDeletedId(null);
                    setIsDeleteOpen(false);
                }
            }}
        >
            <div className="w-full max-w-md bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                {/* Header */}
                <div className="flex justify-center mb-4">
                    <div className="bg-red-500/10 p-4 rounded-full">
                        <FaTrash className="text-red-400 text-2xl" />
                    </div>
                </div>

                {/* Body */}
                <h2 className="text-xl font-bold text-[#EDEFF5] mb-2">
                    Delete Course?
                </h2>
                <p className="text-sm text-[#EDEFF5]/60 mb-6">
                    Are you sure you want to delete this course? This action will permanently remove this course and all its data.
                </p>

                {/* Footer */}
                <div className="flex gap-3">
                    <Button
                        className="flex-1 border border-[#A78BFA]/30 text-[#EDEFF5] font-semibold rounded-2xl hover:bg-[#A78BFA]/10 transition-all"
                        onPress={() => {
                            setDeletedId(null);
                            setIsDeleteOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition-all"
                        onPress={handleDeleteCourse}
                    >
                        Delete Course
                    </Button>
                </div>
            </div>
        </div>
    );
}