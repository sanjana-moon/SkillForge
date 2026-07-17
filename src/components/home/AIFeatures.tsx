"use client";

import Link from "next/link";
import { FaArrowRight, FaBrain, FaMessage } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function AIFeatures() {
  return (
    <section className="py-20 bg-[#10182B] relative border-t border-[#A78BFA]/10 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#A78BFA]/10 to-[#4FD1C5]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4FD1C5]/15 border border-[#4FD1C5]/30 rounded-full text-xs font-mono font-bold text-[#4FD1C5] mb-4">
            <HiSparkles className="text-sm" />
            Empower Your Study Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EDEFF5]">
            Custom Built{" "}
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#4FD1C5] bg-clip-text text-transparent">
              AI Tools
            </span>
          </h2>
          <p className="mt-4 text-[#EDEFF5]/70 font-body">
            Harness generative intelligence built to accelerate comprehension, solve blocks, and personalize mapping.
          </p>
        </div>

        {/* AI Features Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: AI Recommendation Engine */}
          <div className="relative group bg-gradient-to-b from-[#1C2740] to-[#10182B] border border-[#A78BFA]/10 hover:border-[#A78BFA]/30 rounded-3xl p-8 transition duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Visual glow background inside card */}
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-[#A78BFA]/10 blur-3xl rounded-full opacity-60 group-hover:scale-125 transition duration-500 pointer-events-none" />

            <div>
              {/* Card Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/20 mb-6">
                <FaBrain className="text-xl" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold font-heading text-[#EDEFF5] group-hover:text-[#A78BFA] transition">
                AI Recommendation Engine
              </h3>
              <p className="mt-3 text-sm text-[#EDEFF5]/70 leading-relaxed font-body">
                Specify your prior expertise and desired target title. Our engine curates a tailored learning roadmap containing exact modules, exercises, and time allocations to bridge your skill gaps.
              </p>

              {/* Highlight list */}
              <ul className="mt-6 space-y-2 text-xs font-mono text-[#EDEFF5]/60">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4FD1C5]" />
                  Maps to Next.js, Cloud, & ML roles
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4FD1C5]" />
                  Dynamic timeline recalculation
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/ai-mentor"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#A78BFA] group-hover:text-[#EDEFF5] transition duration-200"
              >
                Launch Roadmap Builder
                <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition duration-200" />
              </Link>
            </div>
          </div>

          {/* Card 2: 24/7 AI Mentor Assist */}
          <div className="relative group bg-gradient-to-b from-[#1C2740] to-[#10182B] border border-[#A78BFA]/10 hover:border-[#4FD1C5]/30 rounded-3xl p-8 transition duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Visual glow background inside card */}
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-[#4FD1C5]/10 blur-3xl rounded-full opacity-60 group-hover:scale-125 transition duration-500 pointer-events-none" />

            <div>
              {/* Card Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4FD1C5]/15 text-[#4FD1C5] border border-[#4FD1C5]/20 mb-6">
                <FaMessage className="text-xl" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold font-heading text-[#EDEFF5] group-hover:text-[#4FD1C5] transition">
                24/7 AI Mentor Assist
              </h3>
              <p className="mt-3 text-sm text-[#EDEFF5]/70 leading-relaxed font-body">
                 Stuck on an exercise? Ask your mentor. Receive context-aware code breakdowns, syntax explanations, database optimization guidelines, or security checks without stepping out of your IDE workspace.
              </p>

              {/* Highlight list */}
              <ul className="mt-6 space-y-2 text-xs font-mono text-[#EDEFF5]/60">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
                  Instant syntax debug explanation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
                  Code optimization suggestions
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/ai-mentor"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4FD1C5] group-hover:text-[#EDEFF5] transition duration-200"
              >
                Chat with AI Mentor
                <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
