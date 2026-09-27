"use client";

import Link from "next/link";
import { FaArrowRight, FaBrain, FaMessage } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function AIFeatures() {
  return (
    <section className="py-20 bg-[#F5F8F5] relative border-t border-[#7BAE9B]/10 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-linear-to-r from-[#7BAE9B]/10 to-[#5F927E]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5F927E]/15 border border-[#5F927E]/30 rounded-full text-xs font-mono font-bold text-[#5F927E] mb-4">
            <HiSparkles className="text-sm" />
            Empower Your Study Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#263A33]">
            Custom Built{" "}
            <span className="bg-linear-to-r from-[#7BAE9B] to-[#5F927E] bg-clip-text text-transparent">
              AI Tools
            </span>
          </h2>
          <p className="mt-4 text-[#263A33]/70 font-body">
            Harness generative intelligence built to accelerate comprehension, solve blocks, and personalize mapping.
          </p>
        </div>

        {/* AI Features Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: AI Recommendation Engine */}
          <div className="relative group bg-linear-to-b from-[#DCEBE4] to-[#F5F8F5] border border-[#7BAE9B]/10 hover:border-[#7BAE9B]/30 rounded-3xl p-8 transition duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Visual glow background inside card */}
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-[#7BAE9B]/10 blur-3xl rounded-full opacity-60 group-hover:scale-125 transition duration-500 pointer-events-none" />

            <div>
              {/* Card Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7BAE9B]/15 text-[#7BAE9B] border border-[#7BAE9B]/20 mb-6">
                <FaBrain className="text-xl" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold font-heading text-[#263A33] group-hover:text-[#7BAE9B] transition">
                AI Recommendation Engine
              </h3>
              <p className="mt-3 text-sm text-[#263A33]/70 leading-relaxed font-body">
                Specify your prior expertise and desired target title. Our engine curates a tailored learning roadmap containing exact modules, exercises, and time allocations to bridge your skill gaps.
              </p>

              {/* Highlight list */}
              <ul className="mt-6 space-y-2 text-xs font-mono text-[#263A33]/60">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5F927E]" />
                  Maps to Next.js, Cloud, & ML roles
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5F927E]" />
                  Dynamic timeline recalculation
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/ai-mentor"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7BAE9B] group-hover:text-[#263A33] transition duration-200"
              >
                Launch Roadmap Builder
                <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition duration-200" />
              </Link>
            </div>
          </div>

          {/* Card 2: 24/7 AI Mentor Assist */}
          <div className="relative group bg-linear-to-b from-[#DCEBE4] to-[#F5F8F5] border border-[#7BAE9B]/10 hover:border-[#5F927E]/30 rounded-3xl p-8 transition duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Visual glow background inside card */}
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-[#5F927E]/10 blur-3xl rounded-full opacity-60 group-hover:scale-125 transition duration-500 pointer-events-none" />

            <div>
              {/* Card Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5F927E]/15 text-[#5F927E] border border-[#5F927E]/20 mb-6">
                <FaMessage className="text-xl" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold font-heading text-[#263A33] group-hover:text-[#5F927E] transition">
                24/7 AI Mentor Assist
              </h3>
              <p className="mt-3 text-sm text-[#263A33]/70 leading-relaxed font-body">
                 Stuck on an exercise? Ask your mentor. Receive context-aware code breakdowns, syntax explanations, database optimization guidelines, or security checks without stepping out of your IDE workspace.
              </p>

              {/* Highlight list */}
              <ul className="mt-6 space-y-2 text-xs font-mono text-[#263A33]/60">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7BAE9B]" />
                  Instant syntax debug explanation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7BAE9B]" />
                  Code optimization suggestions
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/ai-mentor"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F927E] group-hover:text-[#263A33] transition duration-200"
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
