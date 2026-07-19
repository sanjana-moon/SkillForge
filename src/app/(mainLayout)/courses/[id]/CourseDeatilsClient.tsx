"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Card,
    Button,
    Chip,
    Spinner,
} from "@heroui/react";
import {
    FaStar,
    FaRegClock,
    FaSignal,
    FaUserGraduate,
    FaPlay,
    FaShare,
    FaBookmark,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import type { Course } from "@/lib/api/courses/data";
import { useSession } from "@/lib/auth-client";
import CourseEnrollmentWidget from "@/components/courses/CourseEnrollmentWidget";

interface CourseDetailsClientProps {
    course: Course;
}

const getLevelColor = (level: string) => {
    switch (level) {
        case "beginner":
            return "text-green-400 bg-green-500/10 border-green-500/30";
        case "intermediate":
            return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
        case "advanced":
            return "text-red-400 bg-red-500/10 border-red-500/30";
        default:
            return "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/30";
    }
};

const getLevelLabel = (level: string) => {
    switch (level) {
        case "beginner":
            return "Beginner";
        case "intermediate":
            return "Intermediate";
        case "advanced":
            return "Advanced";
        default:
            return level;
    }
};

const CourseDetailsClient = ({ course }: CourseDetailsClientProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isEnrolled, setIsEnrolled] = useState(false);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: course.title,
                text: course.description,
                url: window.location.href,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    // Check if user is enrolled (you can add logic here)
    // For now, we'll use a simple state

    return (
        <div className="min-h-screen bg-[#10182B]">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#EDEFF5]/60 hover:text-[#EDEFF5] transition-colors"
                >
                    <FaArrowLeft className="text-sm" />
                    <span>Back to Courses</span>
                </button>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="relative overflow-hidden bg-gradient-to-r from-[#1C2740] via-[#10182B] to-[#1C2740] border border-[#A78BFA]/20 rounded-3xl shadow-xl">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#A78BFA]" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
                        {/* Thumbnail */}
                        <div className="lg:col-span-1">
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#10182B] border border-[#A78BFA]/20">
                                {course.thumbnail ? (
                                    <Image
                                        src={course.thumbnail}
                                        alt={course.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#EDEFF5]/10">
                                        <FaBookmark className="text-6xl" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#10182B]/60 to-transparent" />

                                {/* Status Badge */}
                                {course.approvalStatus === "approved" && course.publishStatus === "published" ? (
                                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-lg text-xs font-bold text-green-400 border border-green-500/30">
                                        <FaCheckCircle className="text-[10px]" />
                                        Published
                                    </span>
                                ) : (
                                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-lg text-xs font-bold text-yellow-400 border border-yellow-500/30">
                                        <FaTimesCircle className="text-[10px]" />
                                        Draft
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Course Info */}
                        <div className="lg:col-span-2 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 flex-wrap mb-3">
                                    <span className="px-3 py-1 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full text-xs font-medium text-[#A78BFA] uppercase">
                                        {course.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                                        {getLevelLabel(course.level)}
                                    </span>
                                    <span className="px-3 py-1 bg-[#1C2740] border border-[#A78BFA]/10 rounded-full text-xs font-medium text-[#EDEFF5]/60">
                                        {course.duration}
                                    </span>
                                </div>

                                <h1 className="text-2xl md:text-4xl font-bold text-[#EDEFF5] leading-tight">
                                    {course.title}
                                </h1>

                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1.5 text-sm text-[#EDEFF5]/60">
                                        <FaStar className="text-yellow-400" />
                                        <span className="text-[#EDEFF5] font-medium">
                                            {course.avgRating?.toFixed(1) || "0.0"}
                                        </span>
                                        <span>({course.reviewCount || 0} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-[#EDEFF5]/60">
                                        <FaUserGraduate className="text-[#A78BFA]" />
                                        <span>{course.enrollmentCount || 0} students</span>
                                    </div>
                                </div>

                                <p className="text-[#EDEFF5]/70 mt-4 text-base leading-relaxed">
                                    {course.description}
                                </p>
                            </div>

                            {/* Price & Actions */}
                            <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-[#A78BFA]/10">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-[#A78BFA]">
                                        ${course.price.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-[#EDEFF5]/40 line-through">
                                        ${(course.price * 1.5).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-3 ml-auto">
                                    <Button
                                        onPress={handleShare}
                                        className="bg-[#1C2740] border border-[#A78BFA]/20 text-[#EDEFF5] hover:bg-[#A78BFA]/10"
                                    >
                                        <FaShare />
                                        Share
                                    </Button>
                                    <CourseEnrollmentWidget
                                        courseId={course._id!}
                                        courseTitle={course.title}
                                        price={course.price}
                                        duration={course.duration}
                                        level={course.level}
                                        instructorName={course.instructorName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Details */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* What You Will Learn */}
                        {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-[#EDEFF5] mb-4">
                                    What You Will Learn
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {course.whatYouWillLearn.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 text-[#EDEFF5]/70"
                                        >
                                            <FaCheckCircle className="text-[#A78BFA] text-sm mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Requirements */}
                        {course.requirements && course.requirements.length > 0 && (
                            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-[#EDEFF5] mb-4">
                                    Requirements
                                </h2>
                                <ul className="space-y-2 text-[#EDEFF5]/70">
                                    {course.requirements.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-[#A78BFA] mt-0.5">•</span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}

                        {/* Target Audience */}
                        {course.targetAudience && course.targetAudience.length > 0 && (
                            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-[#EDEFF5] mb-4">
                                    Who This Course Is For
                                </h2>
                                <ul className="space-y-2 text-[#EDEFF5]/70">
                                    {course.targetAudience.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-[#A78BFA] mt-0.5">•</span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}

                        {/* Instructor Info */}
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-[#EDEFF5] mb-4">
                                Instructor
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-[#A78BFA]/10 flex items-center justify-center text-[#A78BFA] font-bold text-2xl">
                                    {course.instructorName?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-[#EDEFF5]">
                                        {course.instructorName}
                                    </p>
                                    <p className="text-sm text-[#EDEFF5]/50">
                                        Instructor • {course.category} Expert
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-[#EDEFF5] mb-4">
                                Course Overview
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#EDEFF5]/50">Category</span>
                                    <span className="text-[#EDEFF5]">{course.category}</span>
                                </div>
                                <div className="border-t border-[#A78BFA]/10 my-2" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#EDEFF5]/50">Level</span>
                                    <span className="text-[#EDEFF5]">{getLevelLabel(course.level)}</span>
                                </div>
                                <div className="border-t border-[#A78BFA]/10 my-2" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#EDEFF5]/50">Duration</span>
                                    <span className="text-[#EDEFF5]">{course.duration}</span>
                                </div>
                                <div className="border-t border-[#A78BFA]/10 my-2" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#EDEFF5]/50">Students</span>
                                    <span className="text-[#EDEFF5]">{course.enrollmentCount || 0}</span>
                                </div>
                                <div className="border-t border-[#A78BFA]/10 my-2" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#EDEFF5]/50">Rating</span>
                                    <span className="text-[#EDEFF5] flex items-center gap-1">
                                        <FaStar className="text-yellow-400 text-xs" />
                                        {course.avgRating?.toFixed(1) || "0.0"}
                                    </span>
                                </div>
                                <div className="border-t border-[#A78BFA]/10 my-2" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#EDEFF5]/50">Status</span>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${course.approvalStatus === "approved" && course.publishStatus === "published"
                                            ? "text-green-400 bg-green-500/10"
                                            : "text-yellow-400 bg-yellow-500/10"
                                        }`}>
                                        {course.approvalStatus === "approved" && course.publishStatus === "published"
                                            ? "Published"
                                            : "Draft"}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-[#A78BFA]/10 my-4" />

                            <CourseEnrollmentWidget
                                courseId={course._id!}
                                courseTitle={course.title}
                                price={course.price}
                                duration={course.duration}
                                level={course.level}
                                instructorName={course.instructorName}
                            />

                            {!session && (
                                <p className="text-[#EDEFF5]/40 text-xs text-center mt-3">
                                    Please <Link href="/signin" className="text-[#A78BFA] hover:underline">sign in</Link> to enroll
                                </p>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsClient;