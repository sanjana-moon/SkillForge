"use client";

import { useState } from "react";
import CourseCard, { Course } from "./CourseCard";

const coursesData: Course[] = [
  {
    id: "nextjs-mastery",
    title: "Next.js 16 & React 19 Mastery: The Complete Guide",
    category: "Web Development",
    rating: 4.9,
    reviews: 1420,
    price: "BDT 2,200",
    instructorName: "Sanjana Moon",
    instructorRole: "Principal Engineer",
    instructorAvatar: "/images/admin.jpg",
    duration: "34 hrs",
    level: "Advanced",
    tag: "Best Seller",
  },
  {
    id: "gemini-api",
    title: "Gemini AI API & LLM Application Engineering",
    category: "AI & Machine Learning",
    rating: 4.8,
    reviews: 840,
    price: "BDT 2,500",
    instructorName: "Tanvir Rahman",
    instructorRole: "AI Research Lead",
    instructorAvatar: "/images/user.jfif",
    duration: "22 hrs",
    level: "Intermediate",
    tag: "New Release",
  },
  {
    id: "kubernetes-devops",
    title: "Kubernetes & Cloud Architecture for DevOps Masters",
    category: "Cloud Computing",
    rating: 4.7,
    reviews: 620,
    price: "BDT 3,000",
    instructorName: "Asif Zaman",
    instructorRole: "DevOps Architect",
    instructorAvatar: "/images/user-2.jfif",
    duration: "28 hrs",
    level: "Advanced",
    tag: "Hot",
  },
  {
    id: "data-mlops",
    title: "Python Data Pipelines & Production MLOps",
    category: "Data Science",
    rating: 4.6,
    reviews: 410,
    price: "BDT 1,800",
    instructorName: "Farhana Ahmed",
    instructorRole: "Lead Data Scientist",
    instructorAvatar: "/images/user-3.jfif",
    duration: "40 hrs",
    level: "Advanced",
    tag: "",
  },
  {
    id: "better-auth-security",
    title: "Full-Stack Security with Better-Auth & Next.js",
    category: "Web Development",
    rating: 4.9,
    reviews: 310,
    price: "BDT 1,500",
    instructorName: "Sanjana Moon",
    instructorRole: "Principal Engineer",
    instructorAvatar: "/images/admin.jpg",
    duration: "15 hrs",
    level: "Intermediate",
    tag: "Trending",
  },
  {
    id: "zero-trust",
    title: "Zero-Trust Cybersecurity Frameworks & Auditing",
    category: "Cyber Security",
    rating: 4.8,
    reviews: 290,
    price: "BDT 2,400",
    instructorName: "Asif Zaman",
    instructorRole: "DevOps Architect",
    instructorAvatar: "/images/user-2.jfif",
    duration: "18 hrs",
    level: "Advanced",
    tag: "",
  },
  {
    id: "flutter-native",
    title: "Flutter & React Native Cross-Platform Masterclass",
    category: "Mobile Apps",
    rating: 4.7,
    reviews: 580,
    price: "BDT 2,100",
    instructorName: "Tanvir Rahman",
    instructorRole: "AI Research Lead",
    instructorAvatar: "/images/user.jfif",
    duration: "30 hrs",
    level: "Intermediate",
    tag: "",
  },
  {
    id: "generative-ai-agents",
    title: "Building Autonomous AI Agents & Neural Nets",
    category: "AI & Machine Learning",
    rating: 4.9,
    reviews: 1120,
    price: "BDT 2,800",
    instructorName: "Farhana Ahmed",
    instructorRole: "Lead Data Scientist",
    instructorAvatar: "/images/user-3.jfif",
    duration: "25 hrs",
    level: "Advanced",
    tag: "Recommended",
  },
];

const categories = ["All", "AI & Machine Learning", "Web Development", "Cloud Computing", "Cyber Security"];

export default function FeaturedCourses() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = activeCategory === "All"
    ? coursesData
    : coursesData.filter((c) => c.category === activeCategory);

  return (
    <section className="py-20 bg-[#10182B] relative border-t border-[#A78BFA]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EDEFF5]">
              Featured{" "}
              <span className="bg-gradient-to-r from-[#A78BFA] to-[#4FD1C5] bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <p className="mt-3 text-[#EDEFF5]/70 font-body">
              Explore outstanding technical curricula designed in tandem with industrial milestones.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#A78BFA] border-[#A78BFA] text-[#10182B] shadow-md shadow-[#A78BFA]/10"
                    : "border-[#A78BFA]/20 text-[#EDEFF5]/75 hover:border-[#A78BFA] hover:text-[#EDEFF5]"
                }`}
              >
                {cat === "AI & Machine Learning" ? "AI & ML" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
