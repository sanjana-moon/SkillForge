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
            icon: <FaUsers className="text-accent" />,
        },
        {
            value: "200+",
            label: "Courses Available",
            icon: <FaBookOpen className="text-accent" />,
        },
        {
            value: "98%",
            label: "Satisfaction Rate",
            icon: <FaAward className="text-accent" />,
        },
        {
            value: "24/7",
            label: "AI Support",
            icon: <FaRobot className="text-accent" />,
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
        <section className="bg-main">
            {/* HERO */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-transparent" />
                <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
                <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

                <div className="section-container relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <Chip className="mb-6 border border-main bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                            About SkillForge
                        </Chip>
                        <h1 className="text-4xl font-bold leading-tight text-main md:text-6xl">
                            Empowering Learners Through
                            <span className="text-accent">
                                {" "}AI-Powered Education
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-main/60">
                            We're on a mission to make quality education
                            accessible to everyone, using artificial
                            intelligence to create personalized, engaging
                            learning experiences.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/courses">
                                <Button className="bg-action-primary font-semibold hover:opacity-90">
                                    Explore Courses
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button className="border border-accent text-accent hover:bg-accent hover:text-inverse bg-transparent font-semibold">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* MISSION */}
            <div className="section-container">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Chip className="mb-4 border border-main bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                            Our Mission
                        </Chip>
                        <h2 className="text-3xl font-bold text-main md:text-4xl">
                            Making Quality Education Accessible
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-main/60">
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
                                    <FaCheckCircle className="shrink-0 text-sm text-accent" />
                                    <span className="text-sm text-main/70">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-2xl border border-main bg-surface p-8"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <FaGlobe className="text-2xl text-accent" />
                            <h3 className="text-xl font-bold text-main">
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
                                        <span className="text-main/60">
                                            {item.label}
                                        </span>
                                        <span className="font-semibold text-accent">
                                            {item.value}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-main">
                                        <div
                                            className="h-full rounded-full bg-action-primary"
                                            style={{ width: item.width }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CORE VALUES */}
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <Chip className="mb-4 border border-main bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                        Core Values
                    </Chip>
                    <h2 className="text-3xl font-bold text-main md:text-4xl">
                        What Drives Us
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-main/60">
                        Our values shape everything we do, from the courses we
                        create to the community we build.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* LEFT — full-height image tile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-main lg:min-h-full"
                    >
                        <Image
                            src={values[0].image}
                            alt={values[0].imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 600px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#2F4156]/80 via-[#2F4156]/40 to-transparent" />

                        <div className="absolute left-6 top-6 rounded-full border border-accent/30 bg-surface/70 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent backdrop-blur-sm">
                            Value 01
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl font-bold text-white md:text-3xl">
                                {values[0].title}
                            </h3>
                            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
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
                                    className="group relative flex flex-1 items-start gap-5 overflow-hidden rounded-3xl border border-main bg-surface p-6 transition-colors duration-300 hover:border-accent/40"
                                >
                                    <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                                        {icons[index]}
                                    </div>

                                    <div className="relative">
                                        <h3 className="text-lg font-semibold text-main">
                                            {value.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-main/60">
                                            {value.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* TEAM */}
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <Chip className="mb-4 border border-main bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                        Meet the Team
                    </Chip>
                    <h2 className="text-3xl font-bold text-main md:text-4xl">
                        Passionate People, Powerful Results
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-main/60">
                        Behind SkillForge is a team of dedicated educators,
                        engineers, and innovators committed to transforming
                        education.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.08 }}
                            className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-main bg-surface p-6 text-center shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative mb-5">
                                <div className="pointer-events-none absolute inset-0 rounded-full bg-accent/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-accent/20 transition-all duration-500 group-hover:scale-105 group-hover:border-accent/50">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="128px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <h3 className="text-base font-bold text-main">
                                {member.name}
                            </h3>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                                {member.role}
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-main/60">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* STATS */}
            <div className="section-container pt-8 pb-20">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.08 }}
                            className="rounded-2xl border border-main bg-surface p-6 text-center transition-all duration-300 hover:border-accent/40"
                        >
                            <div className="mb-3 flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-main">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-sm text-main/50">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-main bg-linear-to-br from-accent/10 via-accent/5 to-transparent p-12 text-center"
                >
                    <h2 className="text-3xl font-bold text-main md:text-4xl">
                        Ready to Start Learning?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-main/60">
                        Join thousands of students who are already advancing
                        their careers with SkillForge. Start your learning
                        journey today.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/courses">
                            <Button className="rounded-xl bg-action-primary px-8 py-6 text-lg font-semibold hover:opacity-90">
                                Explore Courses
                                <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button className="rounded-xl border border-accent px-8 py-6 text-lg text-accent hover:bg-accent hover:text-inverse bg-transparent font-semibold">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}