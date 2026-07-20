"use client";

import Link from "next/link";
import Image from "next/image";
import { FaStar, FaRegClock, FaSignal } from "react-icons/fa6";
import type { Course } from "@/lib/api/courses/data";

interface CourseCardProps {
    course: Course;
}

const getLevelColor = (level: string) => {
    switch (level) {
        case "beginner":
            return "text-green-400";
        case "intermediate":
            return "text-yellow-400";
        case "advanced":
            return "text-red-400";
        default:
            return "text-[#A78BFA]";
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

export default function CourseCard({ course }: CourseCardProps) {
    const imageUrl = course.thumbnail || "/course_placeholder.png";
    const formattedPrice = `$${course.price.toFixed(2)}`;

    return (
        <div className="group bg-[#1C2740] border border-[#A78BFA]/10 hover:border-[#A78BFA]/30 rounded-md overflow-hidden shadow-lg hover:shadow-[#A78BFA]/5 flex flex-col transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail - 2/3 of the card */}
            <div className="relative aspect-4/3 overflow-hidden bg-[#10182B]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={course.title}
                        width={400}
                        height={1000}
                        className="object-cover h-70 w-auto transition-transform duration-500 group-hover:scale-105 mx-auto"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#EDEFF5]/10">
                        <span className="text-4xl">📚</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#10182B]/60 to-transparent" />
                
                {/* Category tag - Bottom Left */}
                <span className="absolute bottom-3 left-3 inline-block px-2.5 py-0.5 bg-[#10182B]/80 backdrop-blur-sm border border-[#A78BFA]/20 rounded-full text-[10px] font-mono font-bold text-[#A78BFA]">
                    {course.category}
                </span>

                {/* Status Badge - Top Right */}
                {course.approvalStatus === "approved" && course.publishStatus === "published" ? (
                    <span className="absolute top-3 right-3 inline-block px-2 py-0.5 bg-green-500/20 backdrop-blur-sm rounded-lg text-[9px] font-bold text-green-400 uppercase tracking-wider border border-green-500/30">
                        Published
                    </span>
                ) : (
                    <span className="absolute top-3 right-3 inline-block px-2 py-0.5 bg-yellow-500/20 backdrop-blur-sm rounded-lg text-[9px] font-bold text-yellow-400 uppercase tracking-wider border border-yellow-500/30">
                        Draft
                    </span>
                )}
            </div>

            {/* Content - 1/3 of the card */}
            <div className="p-4 grow flex flex-col justify-between">
                {/* Rating & Title */}
                <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#EDEFF5]/60 font-semibold mb-1.5">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-[#EDEFF5]">{course.avgRating?.toFixed(1) || "0.0"}</span>
                        <span className="text-[10px]">({course.reviewCount || 0})</span>
                    </div>

                    <h3 className="text-sm font-bold font-heading text-[#EDEFF5] group-hover:text-[#A78BFA] transition line-clamp-1 leading-snug">
                        {course.title}
                    </h3>
                </div>

                {/* Metadata & Price */}
                <div className="mt-3 pt-3 border-t border-[#A78BFA]/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-[#EDEFF5]/60">
                            <div className="flex items-center gap-1">
                                <FaRegClock className="text-[#A78BFA] text-[10px]" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaSignal className={`${getLevelColor(course.level)} text-[10px]`} />
                                <span>{getLevelLabel(course.level)}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-[#EDEFF5]/30 line-through">
                                ${(course.price * 1.5).toFixed(2)}
                            </p>
                            <p className="text-sm font-extrabold text-[#A78BFA]">
                                {formattedPrice}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={`/courses/${course._id}`}
                        className="w-full inline-flex items-center justify-center rounded-sm hover:bg-[#10182B]/10 bg-[#A78BFA] text-[#10182B] border border-[#A78BFA]/20 py-1.5 text-[10px] font-semibold hover:text-[#EDEFF5] transition-all duration-300 mt-2"
                    >
                        View Course
                    </Link>
                </div>
            </div>
        </div>
    );
}