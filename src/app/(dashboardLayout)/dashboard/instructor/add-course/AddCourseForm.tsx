"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button, Input, Card, TextArea } from "@heroui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { createCourse } from "@/lib/api/courses/actions";
import { uploadImage } from "@/components/utils/uploadImage";
import { useSession } from "@/lib/auth-client";

interface CourseFormData {
    title: string;
    description: string;
    category: string;
    level: string;
    price: number;
    duration: string;
    thumbnail: FileList;
    whatYouWillLearn: string;
    requirements: string;
    targetAudience: string;
}

const AddCourseForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CourseFormData>();

    const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
        try {
            setLoading(true);

            if (!session?.user) {
                toast.error("You must be logged in to create a course.");
                return;
            }

            const imageFile = data.thumbnail?.[0];
            if (!imageFile) {
                toast.error("Course thumbnail is required.");
                return;
            }

            const imageUrl = await uploadImage(imageFile);

            if (!imageUrl) {
                toast.error("Failed to upload thumbnail. Please try again.");
                return;
            }

            const courseData = {
                title: data.title,
                description: data.description,
                category: data.category,
                level: data.level as "beginner" | "intermediate" | "advanced",
                price: Number(data.price),
                duration: data.duration,
                thumbnail: imageUrl,
                whatYouWillLearn: data.whatYouWillLearn.split("\n").filter(Boolean),
                requirements: data.requirements.split("\n").filter(Boolean),
                targetAudience: data.targetAudience.split("\n").filter(Boolean),
            };

            const result = await createCourse(courseData);

            if (result.success) {
                toast.success("Course created successfully!");
                reset();
                router.push("/dashboard/instructor/manage-courses");
            } else {
                toast.error(result.error || "Failed to create course");
            }
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-1 sm:p-6 md:p-8 w-full bg-[#10182B]">
            <div className="container mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                        Create New Course
                    </h1>
                    <p className="text-sm sm:text-base text-[#EDEFF5]/70 mt-2">
                        Share your knowledge with the world. Fill in the details below to create your course.
                    </p>
                </div>

                {/* Card */}
                <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">

                    {/* Info Box */}
                    <div className="bg-[#10182B] border border-[#A78BFA]/30 rounded-2xl p-4 mb-6 sm:mb-8 text-center">
                        <h3 className="font-semibold text-[#EDEFF5] text-sm sm:text-base">
                            Course Creation
                        </h3>
                        <p className="text-xs sm:text-sm text-[#EDEFF5]/70 mt-1">
                            All courses will be submitted for approval. You can publish them once approved.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

                        {/* Thumbnail */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                Course Thumbnail *
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                {...register("thumbnail", {
                                    required: "Course thumbnail is required",
                                })}
                                className="w-full rounded-xl border-2 border-dashed border-[#A78BFA]/50 bg-[#10182B]/50 p-4 text-[#EDEFF5] file:mr-4 file:rounded-lg file:border-0 file:bg-[#A78BFA] file:px-4 file:py-2 file:text-[#10182B] hover:file:bg-[#A78BFA]/80"
                            />

                            {errors.thumbnail && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.thumbnail.message}
                                </p>
                            )}
                        </div>

                        {/* Title + Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Course Title *
                                </label>
                                <Input
                                    placeholder="Enter the course title"
                                    className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                    {...register("title", {
                                        required: "Course title is required",
                                        minLength: {
                                            value: 5,
                                            message: "Title must be at least 5 characters",
                                        },
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Duration *
                                </label>
                                <Input
                                    placeholder="e.g., 10 hours, 6 weeks"
                                    className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                    {...register("duration", {
                                        required: "Duration is required",
                                    })}
                                />
                                {errors.duration && (
                                    <p className="text-red-500 text-sm">{errors.duration.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Category + Level */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Category *
                                </label>
                                <select
                                    {...register("category", {
                                        required: "Category is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-[#A78BFA]/30 bg-[#10182B]/50 focus:ring-2 focus:ring-[#A78BFA] outline-none text-sm sm:text-base text-[#EDEFF5]"
                                >
                                    <option value="" className="bg-[#1C2740]">Select Category</option>
                                    <option value="programming" className="bg-[#1C2740]">Programming</option>
                                    <option value="design" className="bg-[#1C2740]">Design</option>
                                    <option value="business" className="bg-[#1C2740]">Business</option>
                                    <option value="marketing" className="bg-[#1C2740]">Marketing</option>
                                    <option value="photography" className="bg-[#1C2740]">Photography</option>
                                    <option value="music" className="bg-[#1C2740]">Music</option>
                                    <option value="health" className="bg-[#1C2740]">Health & Fitness</option>
                                    <option value="language" className="bg-[#1C2740]">Language</option>
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Level *
                                </label>
                                <select
                                    {...register("level", {
                                        required: "Level is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-[#A78BFA]/30 bg-[#10182B]/50 focus:ring-2 focus:ring-[#A78BFA] outline-none text-sm sm:text-base text-[#EDEFF5]"
                                >
                                    <option value="" className="bg-[#1C2740]">Select Level</option>
                                    <option value="beginner" className="bg-[#1C2740]">Beginner</option>
                                    <option value="intermediate" className="bg-[#1C2740]">Intermediate</option>
                                    <option value="advanced" className="bg-[#1C2740]">Advanced</option>
                                </select>
                                {errors.level && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.level.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                    Price (USD) *
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Enter the price"
                                    className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: {
                                            value: 0,
                                            message: "Price cannot be negative",
                                        },
                                    })}
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#EDEFF5] text-sm sm:text-base">
                                Course Description *
                            </label>
                            <TextArea
                                placeholder="Describe what students will learn in this course..."
                                className="w-full bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                rows={4}
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 20,
                                        message: "Description must be at least 20 characters",
                                    },
                                })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
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
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.whatYouWillLearn.message}
                                </p>
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

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-[#A78BFA] text-[#10182B] font-semibold py-5 sm:py-6 md:py-7 rounded-2xl hover:bg-[#A78BFA]/80 transition-all text-sm sm:text-base"
                        >
                            <IoMdCheckmarkCircleOutline className="mr-2 text-xl" />
                            {loading ? "Creating Course..." : "Create Course"}
                        </Button>

                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddCourseForm;