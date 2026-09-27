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
            return "text-[#7BAE9B]";
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
        <div className="group bg-[#DCEBE4] border border-[#7BAE9B]/10 hover:border-[#7BAE9B]/30 rounded-md overflow-hidden shadow-lg hover:shadow-[#7BAE9B]/5 flex flex-col transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail - 2/3 of the card */}
            <div className="relative aspect-4/3 overflow-hidden bg-[#F5F8F5]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={course.title}
                        width={400}
                        height={1000}
                        className="object-cover h-70 w-auto transition-transform duration-500 group-hover:scale-105 mx-auto"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#263A33]/10">
                        <span className="text-4xl">ðŸ“š</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#F5F8F5]/60 to-transparent" />
                
                {/* Category tag - Bottom Left */}
                <span className="absolute bottom-3 left-3 inline-block px-2.5 py-0.5 bg-[#F5F8F5]/80 backdrop-blur-sm border border-[#7BAE9B]/20 rounded-full text-[10px] font-mono font-bold text-[#7BAE9B]">
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
                    <div className="flex items-center gap-1.5 text-xs text-[#263A33]/60 font-semibold mb-1.5">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-[#263A33]">{course.avgRating?.toFixed(1) || "0.0"}</span>
                        <span className="text-[10px]">({course.reviewCount || 0})</span>
                    </div>

                    <h3 className="text-sm font-bold font-heading text-[#263A33] group-hover:text-[#7BAE9B] transition line-clamp-1 leading-snug">
                        {course.title}
                    </h3>
                </div>

                {/* Metadata & Price */}
                <div className="mt-3 pt-3 border-t border-[#7BAE9B]/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-[#263A33]/60">
                            <div className="flex items-center gap-1">
                                <FaRegClock className="text-[#7BAE9B] text-[10px]" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaSignal className={`${getLevelColor(course.level)} text-[10px]`} />
                                <span>{getLevelLabel(course.level)}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-[#263A33]/30 line-through">
                                ${(course.price * 1.5).toFixed(2)}
                            </p>
                            <p className="text-sm font-extrabold text-[#7BAE9B]">
                                {formattedPrice}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={`/courses/${course._id}`}
                        className="w-full inline-flex items-center justify-center rounded-sm hover:bg-[#F5F8F5]/10 bg-[#7BAE9B] text-[#F5F8F5] border border-[#7BAE9B]/20 py-1.5 text-[10px] font-semibold hover:text-[#263A33] transition-all duration-300 mt-2"
                    >
                        View Course
                    </Link>
                </div>
            </div>
        </div>
    );
}