"use client";

import { updateCourse } from "@/lib/api/courses/actions";
import { uploadImage } from "@/components/utils/uploadImage";
import { Button, Input, Card, TextArea } from "@heroui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Course } from "@/lib/api/courses/data";

interface EditCourseModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    editingCourse: Course | null;
    setEditingCourse: (course: Course | null) => void;
    onUpdateSuccess?: () => void;
}

interface FormInputs {
    title: string;
    description: string;
    category: string;
    level: string;
    price: number;
    duration: string;
    whatYouWillLearn: string;
    requirements: string;
    targetAudience: string;
    thumbnail?: FileList;
}

const CATEGORIES = [
    "programming",
    "design",
    "business",
    "marketing",
    "photography",
    "music",
    "health",
    "language",
];

const LEVELS = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

const EditCourseModal = ({
    isModalOpen,
    setIsModalOpen,
    editingCourse,
    setEditingCourse,
    onUpdateSuccess,
}: EditCourseModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>();

    useEffect(() => {
        if (editingCourse) {
            reset({
                title: editingCourse.title,
                description: editingCourse.description,
                category: editingCourse.category,
                level: editingCourse.level,
                price: editingCourse.price,
                duration: editingCourse.duration,
                whatYouWillLearn: editingCourse.whatYouWillLearn?.join("\n") || "",
                requirements: editingCourse.requirements?.join("\n") || "",
                targetAudience: editingCourse.targetAudience?.join("\n") || "",
            });
            setImagePreview(editingCourse.thumbnail || null);
        }
    }, [editingCourse, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (!editingCourse) {
            toast.error("No course selected");
            return;
        }

        try {
            setLoading(true);

            const updateData: Partial<Course> = {
                title: data.title,
                description: data.description,
                category: data.category,
                level: data.level as "beginner" | "intermediate" | "advanced",
                price: Number(data.price),
                duration: data.duration,
                whatYouWillLearn: data.whatYouWillLearn.split("\n").filter(Boolean),
                requirements: data.requirements.split("\n").filter(Boolean),
                targetAudience: data.targetAudience.split("\n").filter(Boolean),
            };

            if (data.thumbnail?.[0]) {
                const imageUrl = await uploadImage(data.thumbnail[0]);
                if (imageUrl) {
                    updateData.thumbnail = imageUrl;
                }
            }

            const result = await updateCourse(editingCourse._id!, updateData);

            if (result.success) {
                setIsModalOpen(false);
                toast.success("Course updated successfully");
                onUpdateSuccess?.();
            } else {
                toast.error(result.error || "Failed to update course");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setEditingCourse(null);
            setLoading(false);
        }
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#EDEFF5]">
                        Edit Course
                    </h1>
                    <p className="text-sm sm:text-base text-[#EDEFF5]/60 mt-2">
                        Update your course details below.
                    </p>
                </div>

                {/* Card */}
                <Card className="p-4 sm:p-6 md:p-8 border border-[#A78BFA]/20 bg-[#10182B]">

                    {/* Thumbnail Preview */}
                    {imagePreview && (
                        <div className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4 mb-6 text-center">
                            <Image
                                src={imagePreview}
                                alt={editingCourse?.title || "Course thumbnail"}
                                width={200}
                                height={200}
                                className="h-auto max-h-40 object-cover rounded-xl mx-auto shadow-sm"
                            />
                            <p className="text-xs text-[#EDEFF5]/40 mt-2">Current thumbnail</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

                        {/* Course Title */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                Course Title *
                            </label>
                            <Input
                                placeholder="Enter course title"
                                className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                {...register("title", { required: "Course title is required" })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                Course Description *
                            </label>
                            <TextArea
                                placeholder="Describe what students will learn..."
                                className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                rows={4}
                                {...register("description", { required: "Description is required" })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Category + Level */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Category *
                                </label>
                                <select
                                    {...register("category", { required: "Category is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-[#A78BFA]/30 bg-[#10182B]/50 focus:ring-2 focus:ring-[#A78BFA] outline-none text-sm sm:text-base text-[#EDEFF5]"
                                    defaultValue={editingCourse?.category || ""}
                                >
                                    <option value="" className="bg-[#1C2740]">Select Category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat} className="bg-[#1C2740]">
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Level *
                                </label>
                                <select
                                    {...register("level", { required: "Level is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-[#A78BFA]/30 bg-[#10182B]/50 focus:ring-2 focus:ring-[#A78BFA] outline-none text-sm sm:text-base text-[#EDEFF5]"
                                    defaultValue={editingCourse?.level || ""}
                                >
                                    <option value="" className="bg-[#1C2740]">Select Level</option>
                                    {LEVELS.map((level) => (
                                        <option key={level.value} value={level.value} className="bg-[#1C2740]">
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.level && (
                                    <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Price + Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Price (USD) *
                                </label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: { value: 0, message: "Price cannot be negative" },
                                    })}
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Duration *
                                </label>
                                <Input
                                    placeholder="e.g., 10 hours, 6 weeks"
                                    className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                    {...register("duration", { required: "Duration is required" })}
                                />
                                {errors.duration && (
                                    <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                                )}
                            </div>
                        </div>

                        {/* What You Will Learn */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                What You Will Learn *
                            </label>
                            <TextArea
                                placeholder="Enter each learning outcome on a new line..."
                                className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                rows={3}
                                {...register("whatYouWillLearn", {
                                    required: "Learning outcomes are required",
                                })}
                            />
                            <p className="text-[#EDEFF5]/40 text-xs mt-1">
                                Separate each point with a new line
                            </p>
                            {errors.whatYouWillLearn && (
                                <p className="text-red-500 text-sm mt-1">{errors.whatYouWillLearn.message}</p>
                            )}
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                Requirements
                            </label>
                            <TextArea
                                placeholder="Enter each requirement on a new line..."
                                className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                rows={3}
                                {...register("requirements")}
                            />
                            <p className="text-[#EDEFF5]/40 text-xs mt-1">
                                Separate each requirement with a new line (optional)
                            </p>
                        </div>

                        {/* Target Audience */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                Target Audience
                            </label>
                            <TextArea
                                placeholder="Who is this course for?"
                                className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                rows={3}
                                {...register("targetAudience")}
                            />
                            <p className="text-[#EDEFF5]/40 text-xs mt-1">
                                Describe who should take this course (optional)
                            </p>
                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                Update Thumbnail
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("thumbnail")}
                                className="w-full rounded-xl border-2 border-dashed border-[#A78BFA]/50 bg-[#10182B]/50 p-4 text-[#EDEFF5] file:mr-4 file:rounded-lg file:border-0 file:bg-[#A78BFA] file:px-4 file:py-2 file:text-[#10182B] hover:file:bg-[#A78BFA]/80"
                            />
                            <p className="text-xs text-[#EDEFF5]/40 mt-1">Leave empty to keep current thumbnail</p>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                onPress={() => {
                                    setIsModalOpen(false);
                                    setEditingCourse(null);
                                }}
                                className="flex-1 border border-[#A78BFA]/30 text-[#EDEFF5] font-semibold py-5 sm:py-6 rounded-2xl hover:bg-[#A78BFA]/10 transition-all text-sm sm:text-base"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={loading}
                                className="flex-1 bg-[#A78BFA] text-[#10182B] font-semibold py-5 sm:py-6 rounded-2xl hover:bg-[#A78BFA]/80 transition-all text-sm sm:text-base"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default EditCourseModal;