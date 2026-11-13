"use client";

import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

const testimonials = [
  {
    quote: "The AI Roadmaps built by SkillForge bridged my Next.js and backend gaps in under two months. I managed to land my first full-time Junior Developer role!",
    author: "Nabil Mahmud",
    role: "Junior Full-Stack Developer",
    company: "DevsUnited",
    avatar: "/images/user.jfif",
    rating: 5,
  },
  {
    quote: "Having the AI Mentor review my schema layouts and point out security vulnerabilities was like having a staff engineer pair programming with me 24/7.",
    author: "Khadija Khatun",
    role: "Computer Science Student",
    company: "BUET",
    avatar: "/images/user-3.jfif",
    rating: 5,
  },
  {
    quote: "Publishing courses on SkillForge is extremely clean. The dashboard gives precise stats, and the AI resolves trivial bugs so I can focus on advanced core content.",
    author: "Rahat Chowdhury",
    role: "DevOps Course Instructor",
    company: "SkillForge Author",
    avatar: "/images/user-2.jfif",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-main border-t border-main">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-main">
            What Our <span className="text-accent">Community Says</span>
          </h2>
          <p className="mt-4 text-main/70 font-body">
            Hear from students and creators who elevated their skills using our AI learning space.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-surface border border-main rounded-3xl p-8 flex flex-col justify-between shadow-lg relative group hover:border-accent/20 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-accent/10 text-4xl group-hover:text-accent/20 transition duration-300 pointer-events-none">
                <FaQuoteLeft />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base text-main/85 leading-relaxed font-body italic">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-main flex items-center gap-4">
                <Image
                  src={test.avatar}
                  alt={test.author}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover border border-main"
                />
                <div>
                  <h4 className="text-sm font-bold text-main">{test.author}</h4>
                  <p className="text-xs text-main/55 font-medium mt-0.5">
                    {test.role} &middot; <span className="text-accent">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}