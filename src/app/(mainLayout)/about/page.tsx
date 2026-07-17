"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#10182B] flex flex-col justify-between text-[#EDEFF5]">
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-lg bg-[#1C2740] p-8 rounded-3xl border border-[#A78BFA]/20 shadow-xl">
          <h1 className="text-3xl font-bold font-heading mb-4 text-[#A78BFA]">About SkillForge AI</h1>
          <p className="text-[#EDEFF5]/70 mb-6 font-body">
            SkillForge AI is an interactive platform built to enable personalized roadmap generation and interactive mentoring using cutting-edge AI.
          </p>
          <div className="inline-block px-4 py-2 bg-[#A78BFA]/10 text-[#A78BFA] rounded-full border border-[#A78BFA]/20 text-sm">
            Read about our vision and features
          </div>
        </div>
      </main>
    </div>
  );
}
