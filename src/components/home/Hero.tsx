"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCompass, FaArrowRight } from "react-icons/fa6";
import { RiBrainLine } from "react-icons/ri";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[#FFFFFF]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0E7CC9]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-[#7A56CE]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col text-center lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 self-center lg:self-start bg-[#0E7CC9]/10 border border-[#0E7CC9]/20 rounded-full text-xs font-semibold font-mono text-[#0E7CC9] mb-6">
              <RiBrainLine className="text-sm animate-pulse text-[#7A56CE]" />
              Personalized Learning Powered by Gemini AI
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#4B4B5A] leading-tight tracking-tight">
              Forge Your Path to{" "}
              <span className="bg-linear-to-r from-[#0E7CC9] via-[#0E7CC9] to-[#7A56CE] bg-clip-text text-transparent">
                Tech Mastery
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-[#4B4B5A]/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body">
              SkillForge AI builds personalized learning roadmaps, delivers smart course recommendations, and supports your growth with 24/7 AI mentorship.
            </p>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0E7CC9] to-[#7A56CE] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0E7CC9]/25 hover:opacity-95 hover:shadow-[#0E7CC9]/40 transition-all duration-300 group"
              >
                <FaCompass className="text-lg text-white group-hover:rotate-45 transition-transform duration-300" />
                <p className="text-white">Explore Courses</p>
              </Link>
              <Link
                href="/ai-mentor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#0E7CC9]/30 hover:border-[#0E7CC9] px-8 py-4 text-base font-semibold text-[#4B4B5A] hover:bg-[#FBF8FD] transition duration-300 group"
              >
                Get AI Recommendation
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition duration-300" />
              </Link>
            </div>

            {/* Metrics quick glance */}
            <div className="mt-12 pt-8 border-t border-[#0E7CC9]/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#4B4B5A]">15k+</p>
                <p className="text-xs sm:text-sm text-[#4B4B5A]/50 mt-1">Active Learners</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0E7CC9]">120+</p>
                <p className="text-xs sm:text-sm text-[#4B4B5A]/50 mt-1">Tech Tracks</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#7A56CE]">98%</p>
                <p className="text-xs sm:text-sm text-[#4B4B5A]/50 mt-1">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border border-[#0E7CC9]/20 shadow-2xl bg-[#FBF8FD]/40 p-4 backdrop-blur-sm group">
              <div className="absolute inset-0 bg-linear-to-t from-[#FFFFFF] via-transparent to-transparent opacity-60 z-10" />
              <Image
                src="/hero-2.png"
                alt="SkillForge AI Interactive Visual"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition duration-700"
              />
              {/* Overlay glass tag */}
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#FBF8FD]/80 backdrop-blur-md border border-[#0E7CC9]/20 p-4 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#7A56CE] font-semibold font-mono uppercase tracking-wider">Now Live</p>
                  <p className="text-sm font-bold text-[#4B4B5A] mt-0.5">Custom Learning Roadmaps v2.0</p>
                </div>
                <div className="h-2 w-2 bg-[#7A56CE] rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

