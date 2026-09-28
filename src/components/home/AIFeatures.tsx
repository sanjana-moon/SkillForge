"use client";

import Link from "next/link";
import { FaArrowRight, FaBrain, FaMessage } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function AIFeatures() {
  return (
    <section className="py-20 bg-[#1C2E24] relative border-t border-[#C5A059]/10 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-linear-to-r from-[#C5A059]/10 to-[#5C3A21]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5C3A21]/15 border border-[#5C3A21]/30 rounded-full text-xs font-mono font-bold text-[#5C3A21] mb-4">
            <HiSparkles className="text-sm" />
            Empower Your Study Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EBE3D5]">
            Custom Built{" "}
            <span className="bg-linear-to-r from-[#C5A059] to-[#5C3A21] bg-clip-text text-transparent">
              AI Tools
            </span>
          </h2>
          <p className="mt-4 text-[#EBE3D5]/70 font-body">
            Harness generative intelligence built to accelerate comprehension, solve blocks, and personalize mapping.
          </p>
        </div>

        {/* AI Features Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: AI Recommendation Engine */}
          <div className="relative group bg-linear-to-b from-[#3E5C4B] to-[#1C2E24] border border-[#C5A059]/10 hover:border-[#C5A059]/30 rounded-3xl p-8 transition duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Visual glow background inside card */}
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-[#C5A059]/10 blur-3xl rounded-full opacity-60 group-hover:scale-125 transition duration-500 pointer-events-none" />

            <div>
              {/* Card Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/20 mb-6">
                <FaBrain className="text-xl" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold font-heading text-[#EBE3D5] group-hover:text-[#C5A059] transition">
                AI Recommendation Engine
              </h3>
              <p className="mt-3 text-sm text-[#EBE3D5]/70 leading-relaxed font-body">
                Specify your prior expertise and desired target title. Our engine curates a tailored learning roadmap containing exact modules, exercises, and time allocations to bridge your skill gaps.
              </p>

              {/* Highlight list */}
              <ul className="mt-6 space-y-2 text-xs font-mono text-[#EBE3D5]/60">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5C3A21]" />
                  Maps to Next.js, Cloud, & ML roles
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5C3A21]" />
                  Dynamic timeline recalculation
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/ai-mentor"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C5A059] group-hover:text-[#EBE3D5] transition duration-200"
              >
                Launch Roadmap Builder
                <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition duration-200" />
              </Link>
            </div>
          </div>

          {/* Card 2: 24/7 AI Mentor Assist */}
          <div className="relative group bg-linear-to-b from-[#3E5C4B] to-[#1C2E24] border border-[#C5A059]/10 hover:border-[#5C3A21]/30 rounded-3xl p-8 transition duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Visual glow background inside card */}
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-[#5C3A21]/10 blur-3xl rounded-full opacity-60 group-hover:scale-125 transition duration-500 pointer-events-none" />

            <div>
              {/* Card Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5C3A21]/15 text-[#5C3A21] border border-[#5C3A21]/20 mb-6">
                <FaMessage className="text-xl" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold font-heading text-[#EBE3D5] group-hover:text-[#5C3A21] transition">
                24/7 AI Mentor Assist
              </h3>
              <p className="mt-3 text-sm text-[#EBE3D5]/70 leading-relaxed font-body">
                 Stuck on an exercise? Ask your mentor. Receive context-aware code breakdowns, syntax explanations, database optimization guidelines, or security checks without stepping out of your IDE workspace.
              </p>

              {/* Highlight list */}
              <ul className="mt-6 space-y-2 text-xs font-mono text-[#EBE3D5]/60">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                  Instant syntax debug explanation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                  Code optimization suggestions
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/ai-mentor"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#5C3A21] group-hover:text-[#EBE3D5] transition duration-200"
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

