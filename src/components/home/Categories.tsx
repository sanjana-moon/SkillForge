"use client";

import { FaCode, FaCloud, FaDatabase, FaMobileScreenButton } from "react-icons/fa6";
import { RiBrainLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";

const categories = [
  {
    title: "AI & Machine Learning",
    description: "Deep Learning, LLMs, Neural Networks, and NLP.",
    icon: RiBrainLine,
    color: "from-[#A78BFA] to-[#8B5CF6]",
    count: "28 Courses",
  },
  {
    title: "Web Development",
    description: "Modern JavaScript, React, Next.js, and Backend APIs.",
    icon: FaCode,
    color: "from-[#4FD1C5] to-[#20B2AA]",
    count: "35 Courses",
  },
  {
    title: "Cyber Security",
    description: "Penetration Testing, Cryptography, and Threat Auditing.",
    icon: MdSecurity,
    color: "from-[#F87171] to-[#EF4444]",
    count: "16 Courses",
  },
  {
    title: "Cloud Computing",
    description: "AWS, Kubernetes, Terraform, and DevOps Pipelines.",
    icon: FaCloud,
    color: "from-[#60A5FA] to-[#3B82F6]",
    count: "22 Courses",
  },
  {
    title: "Data Science",
    description: "Python, Pandas, Big Data Pipelines, and Visualization.",
    icon: FaDatabase,
    color: "from-[#FBBF24] to-[#F59E0B]",
    count: "18 Courses",
  },
  {
    title: "Mobile Apps",
    description: "React Native, Flutter, Swift, and Android SDKs.",
    icon: FaMobileScreenButton,
    color: "from-[#EC4899] to-[#D946EF]",
    count: "14 Courses",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-[#10182B] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EDEFF5]">
            Browse by{" "}
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#4FD1C5] bg-clip-text text-transparent">
              Technology Category
            </span>
          </h2>
          <p className="mt-4 text-[#EDEFF5]/70 font-body">
            Acquire specialized skills in critical tech domains structured from introductory concepts to master levels.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#1C2740] border border-[#A78BFA]/10 hover:border-[#A78BFA]/30 rounded-3xl p-6 transition duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#A78BFA]/5"
              >
                {/* Icon Wrapper */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${cat.color} text-[#10182B] shadow-lg mb-6`}>
                  <IconComponent className="text-2xl" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold font-heading text-[#EDEFF5] group-hover:text-[#A78BFA] transition">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-[#EDEFF5]/60 font-body leading-relaxed">
                  {cat.description}
                </p>

                {/* Course Count tag */}
                <div className="mt-6 flex justify-between items-center text-xs font-semibold font-mono text-[#4FD1C5]">
                  <span>{cat.count}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
