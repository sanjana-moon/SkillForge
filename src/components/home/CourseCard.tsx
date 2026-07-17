"use client";

import Link from "next/link";
import { FaStar, FaRegClock, FaSignal } from "react-icons/fa6";

export interface Course {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  instructorName: string;
  instructorRole: string;
  instructorAvatar: string;
  duration: string;
  level: string;
  tag: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group bg-[#1C2740] border border-[#A78BFA]/10 hover:border-[#A78BFA]/30 rounded-3xl overflow-hidden shadow-lg hover:shadow-[#A78BFA]/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail with overlay tag */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#10182B]">
        <img
          src="/course_placeholder.png"
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10182B]/60 to-transparent" />
        
        {/* Category tag */}
        <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-[#10182B]/80 backdrop-blur-sm border border-[#A78BFA]/20 rounded-full text-xs font-mono font-bold text-[#A78BFA]">
          {course.category}
        </span>

        {/* Highlight Tag */}
        {course.tag && (
          <span className="absolute bottom-4 right-4 inline-block px-2.5 py-0.5 bg-[#4FD1C5] rounded-lg text-[10px] font-bold text-[#10182B] uppercase tracking-wider">
            {course.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-sm text-[#EDEFF5]/60 font-semibold mb-3">
            <FaStar className="text-yellow-400" />
            <span className="text-[#EDEFF5]">{course.rating.toFixed(1)}</span>
            <span className="text-xs">({course.reviews} reviews)</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold font-heading text-[#EDEFF5] group-hover:text-[#A78BFA] transition line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </div>

        {/* Metadata grid */}
        <div className="mt-4 pt-4 border-t border-[#A78BFA]/10 grid grid-cols-2 gap-2 text-xs text-[#EDEFF5]/60">
          <div className="flex items-center gap-1.5">
            <FaRegClock className="text-[#A78BFA]" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <FaSignal className="text-[#4FD1C5]" />
            <span>{course.level}</span>
          </div>
        </div>

        {/* Footer/Instructor & Price */}
        <div className="mt-6 pt-4 border-t border-[#A78BFA]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={course.instructorAvatar}
              alt={course.instructorName}
              className="h-8 w-8 rounded-full object-cover border border-[#A78BFA]/20"
            />
            <div>
              <p className="text-xs font-bold text-[#EDEFF5]">{course.instructorName}</p>
              <p className="text-[10px] text-[#EDEFF5]/50">{course.instructorRole}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#EDEFF5]/50 line-through">BDT 4,500</p>
            <p className="text-base font-extrabold text-[#4FD1C5]">{course.price}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <Link
            href={`/courses/${course.id}`}
            className="w-full inline-flex items-center justify-center rounded-xl bg-[#10182B]/60 hover:bg-[#A78BFA] hover:text-[#10182B] border border-[#A78BFA]/20 py-2.5 text-xs font-semibold text-[#EDEFF5] transition-all duration-300"
          >
            Explore Curriculum
          </Link>
        </div>
      </div>
    </div>
  );
}
