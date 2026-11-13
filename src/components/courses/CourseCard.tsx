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
            return "text-success";
        case "intermediate":
            return "text-warning";
        case "advanced":
            return "text-error";
        default:
            return "text-accent";
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
        <div className="group bg-surface border border-main hover:border-accent/30 rounded-md overflow-hidden shadow-lg hover:shadow-accent/5 flex flex-col transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-main/10">
                        <span className="text-4xl">📚</span>
                    </div>
                )}

                {/* Category tag */}
                <span className="absolute bottom-3 left-3 inline-block px-2.5 py-0.5 bg-surface border border-main rounded-full text-[10px] font-mono font-bold text-accent shadow-sm z-10">
                    {course.category}
                </span>

                {/* Status Badge */}
                {course.approvalStatus === "approved" && course.publishStatus === "published" ? (
                    <span className="absolute top-3 right-3 inline-block px-2 py-0.5 bg-success/10 backdrop-blur-sm rounded-lg text-[9px] font-bold text-success uppercase tracking-wider border border-success/20 z-10">
                        Published
                    </span>
                ) : (
                    <span className="absolute top-3 right-3 inline-block px-2 py-0.5 bg-warning/10 backdrop-blur-sm rounded-lg text-[9px] font-bold text-warning uppercase tracking-wider border border-warning/20 z-10">
                        Draft
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 grow flex flex-col justify-between">
                {/* Rating & Title */}
                <div>
                    <div className="flex items-center gap-1.5 text-xs text-main/60 font-semibold mb-1.5">
                        <FaStar className="text-warning text-xs" />
                        <span className="text-main">{course.avgRating?.toFixed(1) || "0.0"}</span>
                        <span className="text-[10px]">({course.reviewCount || 0})</span>
                    </div>

                    <h3 className="text-sm font-bold font-heading text-main group-hover:text-accent transition line-clamp-1 leading-snug">
                        {course.title}
                    </h3>
                </div>

                {/* Metadata & Price */}
                <div className="mt-3 pt-3 border-t border-main">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-main/60">
                            <div className="flex items-center gap-1">
                                <FaRegClock className="text-accent text-[10px]" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaSignal className={`${getLevelColor(course.level)} text-[10px]`} />
                                <span>{getLevelLabel(course.level)}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-main/30 line-through">
                                ${(course.price * 1.5).toFixed(2)}
                            </p>
                            <p className="text-sm font-extrabold text-accent">
                                {formattedPrice}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={`/courses/${course._id}`}
                        className="w-full inline-flex items-center justify-center rounded-sm bg-action-primary border border-main py-1.5 text-[10px] font-semibold transition-all duration-300 mt-2 hover:opacity-90"
                    >
                        View Course
                    </Link>
                </div>
            </div>
        </div>
    );
}