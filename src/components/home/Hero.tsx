"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCompass, FaArrowRight } from "react-icons/fa6";
import { RiBrainLine } from "react-icons/ri";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-main">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col text-center lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 self-center lg:self-start bg-alt/50 border border-main rounded-full text-xs font-semibold font-mono text-accent mb-6">
              <RiBrainLine className="text-sm animate-pulse" />
              Personalized Learning Powered by Gemini AI
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-main leading-tight tracking-tight">
              Forge Your Path to{" "}
              <span className="text-accent">Tech Mastery</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-main/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body">
              SkillForge AI builds personalized learning roadmaps, delivers smart course recommendations, and supports your growth with 24/7 AI mentorship.
            </p>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-action-primary px-8 py-4 text-base font-bold shadow-lg shadow-accent/10 hover:opacity-95 hover:shadow-accent/20 transition-all duration-300 group"
              >
                <FaCompass className="text-lg group-hover:rotate-45 transition-transform duration-300" />
                <span>Explore Courses</span>
              </Link>

              <Link
                href="/ai-mentor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-accent text-accent px-8 py-4 text-base font-semibold hover:bg-accent hover:text-inverse transition duration-300 group"
              >
                Get AI Recommendation
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition duration-300" />
              </Link>
            </div>

            {/* Metrics quick glance */}
            <div className="mt-12 pt-8 border-t border-main grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-main">15k+</p>
                <p className="text-xs sm:text-sm text-muted mt-1">Active Learners</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-accent">120+</p>
                <p className="text-xs sm:text-sm text-muted mt-1">Tech Tracks</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-accent">98%</p>
                <p className="text-xs sm:text-sm text-muted mt-1">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border border-main shadow-2xl bg-surface p-4 group">
              <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-60 z-10" />
              <Image
                src="/hero-2.png"
                alt="SkillForge AI Interactive Visual"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition duration-700"
                priority
              />
              {/* Overlay glass tag */}
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-surface/90 backdrop-blur-md border border-main p-4 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-accent font-semibold font-mono uppercase tracking-wider">
                    Now Live
                  </p>
                  <p className="text-sm font-bold text-main mt-0.5">
                    Custom Learning Roadmaps v2.0
                  </p>
                </div>
                <div className="h-2 w-2 bg-accent rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}