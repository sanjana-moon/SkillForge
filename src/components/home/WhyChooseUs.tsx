"use client";

import { FaRoute, FaTerminal, FaGraduationCap } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";

const features = [
  {
    title: "Interactive AI Roadmaps",
    description: "Gemini-powered pathing adapts directly to your current skill level, career target, and study pacing.",
    icon: FaRoute,
    color: "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20",
  },
  {
    title: "24/7 AI Mentor Chat",
    description: "Instant syntax debugging, concept breakdown, and code reviews, right alongside your workspace.",
    icon: RiRobot2Line,
    color: "text-[#4FD1C5] bg-[#4FD1C5]/10 border-[#4FD1C5]/20",
  },
  {
    title: "Isolated Hands-on Labs",
    description: "Learn in context. Write, test, and host your scripts directly inside sandboxed browser workspace tools.",
    icon: FaTerminal,
    color: "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/20",
  },
  {
    title: "Verified Credentials",
    description: "Acquire cryptographic credentials easily shareable with tech hiring managers and profiles.",
    icon: FaGraduationCap,
    color: "text-[#EC4899] bg-[#EC4899]/10 border-[#EC4899]/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#10182B] relative border-t border-[#A78BFA]/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#1C2740_0%,transparent_70%)] pointer-events-none opacity-40" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EDEFF5]">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#4FD1C5] bg-clip-text text-transparent">
              SkillForge AI
            </span>
          </h2>
          <p className="mt-4 text-[#EDEFF5]/70 font-body">
            A standard curriculum is never enough. We provide tools configured to support you through every line of code.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#1C2740]/60 border border-[#A78BFA]/10 hover:border-[#A78BFA]/25 rounded-3xl p-6 transition duration-300 hover:bg-[#1C2740] shadow-lg flex flex-col items-center text-center group"
              >
                {/* Icon Wrapper */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${feat.color} shadow-lg mb-6 group-hover:scale-110 transition duration-300`}>
                  <IconComponent className="text-2xl" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-heading text-[#EDEFF5] group-hover:text-[#A78BFA] transition">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-[#EDEFF5]/60 font-body leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
