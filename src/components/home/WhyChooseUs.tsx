"use client";

import { FaRoute, FaTerminal, FaGraduationCap } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";

const features = [
  {
    title: "Interactive AI Roadmaps",
    description: "Gemini-powered pathing adapts directly to your current skill level, career target, and study pacing.",
    icon: FaRoute,
    color: "text-[#C5A059] bg-[#C5A059]/10 border-[#C5A059]/20",
  },
  {
    title: "24/7 AI Mentor Chat",
    description: "Instant syntax debugging, concept breakdown, and code reviews, right alongside your workspace.",
    icon: RiRobot2Line,
    color: "text-[#5C3A21] bg-[#5C3A21]/10 border-[#5C3A21]/20",
  },
  {
    title: "Isolated Hands-on Labs",
    description: "Learn in context. Write, test, and host your scripts directly inside sandboxed browser workspace tools.",
    icon: FaTerminal,
    color: "text-[#C5A059] bg-[#C5A059]/10 border-[#C5A059]/20",
  },
  {
    title: "Verified Credentials",
    description: "Acquire cryptographic credentials easily shareable with tech hiring managers and profiles.",
    icon: FaGraduationCap,
    color: "text-[#D46A2B] bg-[#D46A2B]/10 border-[#D46A2B]/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#1C2E24] relative border-t border-[#C5A059]/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#3E5C4B_0%,transparent_70%)] pointer-events-none opacity-40" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#EBE3D5]">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#C5A059] to-[#5C3A21] bg-clip-text text-transparent">
              SkillForge AI
            </span>
          </h2>
          <p className="mt-4 text-[#EBE3D5]/70 font-body">
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
                className="bg-[#3E5C4B]/60 border border-[#C5A059]/10 hover:border-[#C5A059]/25 rounded-3xl p-6 transition duration-300 hover:bg-[#3E5C4B] shadow-lg flex flex-col items-center text-center group"
              >
                {/* Icon Wrapper */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${feat.color} shadow-lg mb-6 group-hover:scale-110 transition duration-300`}>
                  <IconComponent className="text-2xl" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-heading text-[#EBE3D5] group-hover:text-[#C5A059] transition">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-[#EBE3D5]/60 font-body leading-relaxed">
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

