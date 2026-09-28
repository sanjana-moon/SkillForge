"use client";

import Image from "next/image";

const features = [
  {
    title: "AI-Powered Learning",
    description:
      "Personalized recommendations and an AI mentor that adapts to how you learn — not the other way around. The more you engage, the sharper it gets.",
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "AI symbols illustration",
    accent: "#C5A059",
  },
  {
    title: "Verified Instructors",
    description:
      "Every instructor is vetted for real-world expertise, so you always learn from someone who has actually done the work — not just read about it.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNqKKazBMrChLV9KMPhv4FItTlPSdoQ-uBVngRMtNQHR9ebd4nc6HzVLtx&s=10",
    imageAlt: "Verified identity illustration",
    accent: "#D46A2B",
  },
  {
    title: "Learn Without Limits",
    description:
      "Self-paced courses, lifetime access, and progress that follows you across every device and platform. Start today, finish whenever.",
    image:
      "https://cdn.pixabay.com/photo/2023/01/30/08/06/symbols-7755074_1280.jpg",
    imageAlt: "Interconnected platforms illustration",
    accent: "#8C9683",
  },
  {
    title: "Fair, Transparent Pricing",
    description:
      "No hidden fees, no forgotten subscriptions. Pay once for a course and own it forever. Your progress is yours.",
    image:
      "https://images.unsplash.com/photo-1655813710718-00043b177128?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Transparent payment illustration",
    accent: "#C5A059",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-[#1C2E24] py-24 px-6 overflow-hidden">
      {/* Heading */}
      <div className="mx-auto mb-20 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
          Why SkillForge
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-[#EBE3D5]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Built for people who want to go deep
        </h2>
        <p className="mt-5 text-base text-[#EBE3D5]/70">
          Not just collect certificates. Every part of SkillForge is
          designed to help you actually master what you set out to
          learn.
        </p>
      </div>

      {/* Alternating rows */}
      <div className="mx-auto flex max-w-6xl flex-col gap-24 md:gap-32">
        {features.map((feature, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={feature.title}
              className={`group flex flex-col items-center gap-10 md:gap-16 ${isReversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
            >
              {/* Text side */}
              <div className="flex-1 max-w-xl">
                {/* Accent number */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="text-4xl font-bold opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      color: feature.accent,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="h-px max-w-[60px] flex-1 transition-all duration-500 group-hover:max-w-[120px]"
                    style={{
                      backgroundColor: feature.accent,
                    }}
                  />
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-[#EBE3D5] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-[#EBE3D5]/70">
                  {feature.description}
                </p>
              </div>

              {/* Image side — animated circle */}
              <div className="relative flex-1 w-full max-w-md">
                {/* Outer glow — spreads on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full opacity-25 blur-3xl transition-all duration-700 ease-out group-hover:scale-125 group-hover:opacity-70"
                  style={{ background: feature.accent }}
                />

                {/* Soft light burst — appears on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-700 ease-out group-hover:opacity-60"
                  style={{
                    background: `radial-gradient(circle, ${feature.accent}CC 0%, transparent 70%)`,
                  }}
                />

                {/* Round image frame */}
                <div
                  className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border-2 transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-opacity-100"
                  style={{
                    borderColor: `${feature.accent}55`,
                    boxShadow: `0 0 0 0 ${feature.accent}00`,
                  }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}