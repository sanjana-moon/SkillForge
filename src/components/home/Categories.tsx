"use client";

import { FaCode, FaCloud, FaDatabase, FaMobileScreenButton } from "react-icons/fa6";
import { RiBrainLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";

const categories = [
  {
    title: "AI & Machine Learning",
    description: "Deep Learning, LLMs, Neural Networks, and NLP.",
    icon: RiBrainLine,
    color: "from-[#7BAE9B] to-[#5F927E]",
    count: "28 Courses",
  },
  {
    title: "Web Development",
    description: "Modern JavaScript, React, Next.js, and Backend APIs.",
    icon: FaCode,
    color: "from-[#5F927E] to-[#7BAE9B]",
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
    <section className="py-20 bg-[#F5F8F5] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#263A33]">
            Browse by{" "}
            <span className="bg-linear-to-r from-[#7BAE9B] to-[#5F927E] bg-clip-text text-transparent">
              Technology Category
            </span>
          </h2>
          <p className="mt-4 text-[#263A33]/70 font-body">
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
                className="group relative bg-[#DCEBE4] border border-[#7BAE9B]/10 hover:border-[#7BAE9B]/30 rounded-3xl p-6 transition duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#7BAE9B]/5"
              >
                {/* Icon Wrapper */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr ${cat.color} text-[#F5F8F5] shadow-lg mb-6`}>
                  <IconComponent className="text-2xl" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold font-heading text-[#263A33] group-hover:text-[#7BAE9B] transition">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-[#263A33]/60 font-body leading-relaxed">
                  {cat.description}
                </p>

                {/* Course Count tag */}
                <div className="mt-6 flex justify-between items-center text-xs font-semibold font-mono text-[#5F927E]">
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
