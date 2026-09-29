"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import {
    FaRocket,
    FaUsers,
    FaBrain,
    FaAward,
    FaArrowRight,
    FaCheckCircle,
    FaRobot,
    FaBookOpen,
    FaGlobe,
} from "react-icons/fa";

export default function AboutPage() {
    const stats = [
        {
            value: "50K+",
            label: "Students Enrolled",
            icon: <FaUsers className="text-[#C5A059]" />,
        },
        {
            value: "200+",
            label: "Courses Available",
            icon: <FaBookOpen className="text-[#C5A059]" />,
        },
        {
            value: "98%",
            label: "Satisfaction Rate",
            icon: <FaAward className="text-[#C5A059]" />,
        },
        {
            value: "24/7",
            label: "AI Support",
            icon: <FaRobot className="text-[#C5A059]" />,
        },
    ];

    const values = [
        {
            title: "Quality Education",
            description:
                "High-quality, accessible education for everyone, regardless of background or location.",
            image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
            imageAlt: "Students learning together",
        },
        {
            title: "AI-Powered Learning",
            description:
                "Personalized learning experiences powered by cutting-edge AI.",
            image:
                "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Artificial intelligence visualization",
        },
        {
            title: "Community First",
            description:
                "A supportive space where learners connect, collaborate, and grow.",
            image:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Community of learners collaborating",
        },
        {
            title: "Continuous Innovation",
            description:
                "Constantly evolving with the latest technologies and methodologies.",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Technology and innovation",
        },
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            bio: "Former tech executive with 15+ years in EdTech",
            image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        },
        {
            name: "Michael Chen",
            role: "CTO",
            bio: "AI expert with a PhD in Machine Learning",
            image:
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Content",
            bio: "Curriculum designer with 10+ years of teaching experience",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        },
        {
            name: "David Kim",
            role: "Lead Instructor",
            bio: "Senior Software Engineer and passionate educator",
            image:
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
        },
    ];

    return (
        <div className="min-h-screen bg-[#1C2E24]">
            {/* ─────────────────────────────
                HERO
            ───────────────────────────── */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#C5A059]/10 via-transparent to-transparent" />
                <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#C5A059]/5 blur-3xl" />
                <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-[#5C3A21]/5 blur-3xl" />

                <div className="container relative mx-auto px-4 py-20 md:py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <Chip className="mb-6 border border-[#C5A059]/20 bg-[#C5A059]/10 px-4 py-2 text-sm font-medium text-[#C5A059]">
                            About SkillForge
                        </Chip>
                        <h1 className="text-4xl font-bold leading-tight text-[#EBE3D5] md:text-6xl">
                            Empowering Learners Through
                            <span className="text-[#C5A059]">
                                {" "}
                                AI-Powered Education
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#EBE3D5]/60">
                            We're on a mission to make quality education
                            accessible to everyone, using artificial
                            intelligence to create personalized, engaging
                            learning experiences.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/courses">
                                <Button className="bg-[#C5A059] font-semibold text-[#1C2E24] hover:bg-[#C5A059]/80">
                                    Explore Courses
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button className="border border-[#C5A059]/30 text-[#EBE3D5] hover:bg-[#C5A059]/10">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─────────────────────────────
                MISSION
            ───────────────────────────── */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Chip className="mb-4 border border-[#C5A059]/20 bg-[#C5A059]/10 px-4 py-2 text-sm font-medium text-[#C5A059]">
                            Our Mission
                        </Chip>
                        <h2 className="text-3xl font-bold text-[#EBE3D5] md:text-4xl">
                            Making Quality Education Accessible
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-[#EBE3D5]/60">
                            At SkillForge, we believe that everyone deserves
                            access to high-quality education. Our platform
                            combines expert-led courses with cutting-edge AI
                            technology to create a learning experience that's
                            personalized, engaging, and effective.
                        </p>
                        <div className="mt-6 space-y-3">
                            {[
                                "Expert instructors with real-world experience",
                                "AI-powered personalized learning paths",
                                "Hands-on projects and practical skills",
                                "Supportive community of learners",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <FaCheckCircle className="shrink-0 text-sm text-[#C5A059]" />
                                    <span className="text-sm text-[#EBE3D5]/70">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-2xl border border-[#C5A059]/20 bg-[#3E5C4B] p-8"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <FaGlobe className="text-2xl text-[#C5A059]" />
                            <h3 className="text-xl font-bold text-[#EBE3D5]">
                                Our Impact
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                {
                                    label: "Students Empowered",
                                    value: "50,000+",
                                    width: "85%",
                                },
                                {
                                    label: "Course Completion Rate",
                                    value: "78%",
                                    width: "78%",
                                },
                                {
                                    label: "Student Satisfaction",
                                    value: "98%",
                                    width: "98%",
                                },
                            ].map((item) => (
                                <div key={item.label}>
                                    <div className="mb-1 flex justify-between text-sm">
                                        <span className="text-[#EBE3D5]/60">
                                            {item.label}
                                        </span>
                                        <span className="font-medium text-[#C5A059]">
                                            {item.value}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#1C2E24]">
                                        <div
                                            className="h-full rounded-full bg-[#C5A059]"
                                            style={{ width: item.width }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─────────────────────────────
                CORE VALUES — Bento with full-height image
            ───────────────────────────── */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <Chip className="mb-4 border border-[#C5A059]/20 bg-[#C5A059]/10 px-4 py-2 text-sm font-medium text-[#C5A059]">
                        Core Values
                    </Chip>
                    <h2 className="text-3xl font-bold text-[#EBE3D5] md:text-4xl">
                        What Drives Us
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-[#EBE3D5]/60">
                        Our values shape everything we do, from the courses we
                        create to the community we build.
                    </p>
                </motion.div>

                {/* 2-column bento: image spans full height of the 3 right-side tiles */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* LEFT — full-height image tile (spans all 3 rows) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-[#C5A059]/20 lg:min-h-full"
                    >
                        <Image
                            src={values[0].image}
                            alt={values[0].imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 600px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Dark gradient for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E24] via-[#1C2E24]/10 to-transparent" />

                        {/* Corner value badge */}
                        <div className="absolute left-6 top-6 rounded-full border border-[#C5A059]/30 bg-[#1C2E24]/70 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#C5A059] backdrop-blur-sm">
                            Value 01
                        </div>

                        {/* Bottom text */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl font-bold text-[#EBE3D5] md:text-3xl">
                                {values[0].title}
                            </h3>
                            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#EBE3D5]/75">
                                {values[0].description}
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT — three stacked tiles */}
                    <div className="flex flex-col gap-5">
                        {values.slice(1).map((value, index) => {
                            const icons = [
                                <FaBrain key="b" className="text-xl" />,
                                <FaUsers key="u" className="text-xl" />,
                                <FaRocket key="r" className="text-xl" />,
                            ];

                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.1 + index * 0.08,
                                    }}
                                    className="group relative flex flex-1 items-start gap-5 overflow-hidden rounded-3xl border border-[#C5A059]/20 bg-[#3E5C4B] p-6 transition-colors duration-300 hover:border-[#C5A059]/40"
                                >
                                    {/* brass corner glow */}
                                    <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#C5A059]/10 blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C5A059]/20 bg-[#C5A059]/10 text-[#C5A059]">
                                        {icons[index]}
                                    </div>

                                    <div className="relative">
                                        <h3 className="text-lg font-semibold text-[#EBE3D5]">
                                            {value.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-[#EBE3D5]/60">
                                            {value.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────
                TEAM — portrait frames
            ───────────────────────────── */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <Chip className="mb-4 border border-[#C5A059]/20 bg-[#C5A059]/10 px-4 py-2 text-sm font-medium text-[#C5A059]">
                        Meet the Team
                    </Chip>
                    <h2 className="text-3xl font-bold text-[#EBE3D5] md:text-4xl">
                        Passionate People, Powerful Results
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-[#EBE3D5]/60">
                        Behind SkillForge is a team of dedicated educators,
                        engineers, and innovators committed to transforming
                        education.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.08 }}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="relative mb-5">
                                <div className="pointer-events-none absolute inset-0 rounded-full bg-[#C5A059]/25 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-[#C5A059]/40 transition-transform duration-500 group-hover:scale-105">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="160px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-[#EBE3D5]">
                                {member.name}
                            </h3>
                            <p className="text-sm font-medium text-[#C5A059]">
                                {member.role}
                            </p>
                            <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-[#EBE3D5]/50">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            {/* ─────────────────────────────
                STATS — bottom of the page
            ───────────────────────────── */}
            <section className="container mx-auto px-4 pb-20 pt-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.08 }}
                            className="rounded-2xl border border-[#C5A059]/20 bg-[#3E5C4B] p-6 text-center transition-all duration-300 hover:border-[#C5A059]/40"
                        >
                            <div className="mb-3 flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C5A059]/10">
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-[#EBE3D5]">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-sm text-[#EBE3D5]/50">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────
                CTA
            ───────────────────────────── */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-[#C5A059]/20 bg-linear-to-br from-[#C5A059]/10 via-[#5C3A21]/5 to-transparent p-12 text-center"
                >
                    <h2 className="text-3xl font-bold text-[#EBE3D5] md:text-4xl">
                        Ready to Start Learning?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-[#EBE3D5]/60">
                        Join thousands of students who are already advancing
                        their careers with SkillForge. Start your learning
                        journey today.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/courses">
                            <Button className="rounded-xl bg-[#C5A059] px-8 py-6 text-lg font-semibold text-[#1C2E24] hover:bg-[#C5A059]/80">
                                Explore Courses
                                <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button className="rounded-xl border border-[#C5A059]/30 px-8 py-6 text-lg text-[#EBE3D5] hover:bg-[#C5A059]/10">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}