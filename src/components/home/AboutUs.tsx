"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Card,
    Button,
    Chip,
} from "@heroui/react";
import {
    FaRocket,
    FaGraduationCap,
    FaUsers,
    FaBrain,
    FaAward,
    FaArrowRight,
    FaCheckCircle,
    FaRobot,
    FaBookOpen,
    FaGlobe,
    FaCode,
    FaShieldAlt,
    FaHeadset,
} from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineSupportAgent } from "react-icons/md";

export default function AboutPage() {
    const stats = [
        {
            value: "50K+",
            label: "Students Enrolled",
            icon: <FaUsers className="text-[#A78BFA]" />,
        },
        {
            value: "200+",
            label: "Courses Available",
            icon: <FaBookOpen className="text-[#A78BFA]" />,
        },
        {
            value: "98%",
            label: "Satisfaction Rate",
            icon: <FaAward className="text-[#A78BFA]" />,
        },
        {
            value: "24/7",
            label: "AI Support",
            icon: <FaRobot className="text-[#A78BFA]" />,
        },
    ];

    const values = [
        {
            icon: <FaGraduationCap className="text-2xl" />,
            title: "Quality Education",
            description: "We believe in providing high-quality, accessible education to everyone, regardless of their background or location.",
        },
        {
            icon: <FaBrain className="text-2xl" />,
            title: "AI-Powered Learning",
            description: "Leveraging cutting-edge AI technology to personalize learning experiences and provide instant support.",
        },
        {
            icon: <FaUsers className="text-2xl" />,
            title: "Community First",
            description: "Building a supportive community where learners can connect, collaborate, and grow together.",
        },
        {
            icon: <FaRocket className="text-2xl" />,
            title: "Continuous Innovation",
            description: "Constantly evolving our platform with the latest technologies and teaching methodologies.",
        },
    ];

    const features = [
        {
            icon: <FaCode className="text-xl" />,
            title: "Practical Projects",
            description: "Learn by building real-world projects that showcase your skills.",
        },
        {
            icon: <FaRobot className="text-xl" />,
            title: "AI Mentor",
            description: "Get instant help and guidance from our AI-powered learning assistant.",
        },
        {
            icon: <MdOutlineSecurity className="text-xl" />,
            title: "Secure Learning",
            description: "Safe and secure platform with industry-standard encryption.",
        },
        {
            icon: <MdOutlineSupportAgent className="text-xl" />,
            title: "24/7 Support",
            description: "Our team and AI are always here to help you succeed.",
        },
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            bio: "Former tech executive with 15+ years in EdTech",
        },
        {
            name: "Michael Chen",
            role: "CTO",
            bio: "AI expert with a PhD in Machine Learning",
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Content",
            bio: "Curriculum designer with 10+ years of teaching experience",
        },
        {
            name: "David Kim",
            role: "Lead Instructor",
            bio: "Senior Software Engineer and passionate educator",
        },
    ];

    return (
        <div className="min-h-screen bg-[#10182B]">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#A78BFA]/10 via-transparent to-transparent" />
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#A78BFA]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 py-20 md:py-28 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <Chip className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20 px-4 py-2 text-sm font-medium mb-6">
                            About SkillForge
                        </Chip>
                        <h1 className="text-4xl md:text-6xl font-bold text-[#EDEFF5] leading-tight">
                            Empowering Learners Through
                            <span className="text-[#A78BFA]"> AI-Powered Education</span>
                        </h1>
                        <p className="text-[#EDEFF5]/60 mt-6 text-lg max-w-2xl mx-auto">
                            We're on a mission to make quality education accessible to everyone,
                            using artificial intelligence to create personalized, engaging learning experiences.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <Link href="/courses">
                                <Button className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80">
                                    Explore Courses
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button className="border border-[#A78BFA]/30 text-[#EDEFF5] hover:bg-[#A78BFA]/10">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 text-center hover:border-[#A78BFA]/40 transition-all duration-300"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 flex items-center justify-center">
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-[#EDEFF5]">
                                {stat.value}
                            </p>
                            <p className="text-[#EDEFF5]/50 text-sm mt-1">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Chip className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20 px-4 py-2 text-sm font-medium mb-4">
                            Our Mission
                        </Chip>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                            Making Quality Education Accessible
                        </h2>
                        <p className="text-[#EDEFF5]/60 mt-4 text-base leading-relaxed">
                            At SkillForge, we believe that everyone deserves access to high-quality education.
                            Our platform combines expert-led courses with cutting-edge AI technology to create
                            a learning experience that's personalized, engaging, and effective.
                        </p>
                        <div className="space-y-3 mt-6">
                            {[
                                "Expert instructors with real-world experience",
                                "AI-powered personalized learning paths",
                                "Hands-on projects and practical skills",
                                "Supportive community of learners",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <FaCheckCircle className="text-[#A78BFA] text-sm shrink-0" />
                                    <span className="text-[#EDEFF5]/70 text-sm">
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
                        className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaGlobe className="text-[#A78BFA] text-2xl" />
                            <h3 className="text-xl font-bold text-[#EDEFF5]">
                                Our Impact
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-[#EDEFF5]/60">Students Empowered</span>
                                    <span className="text-[#A78BFA] font-medium">50,000+</span>
                                </div>
                                <div className="w-full h-2 bg-[#10182B] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#A78BFA] rounded-full" style={{ width: "85%" }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-[#EDEFF5]/60">Course Completion Rate</span>
                                    <span className="text-[#A78BFA] font-medium">78%</span>
                                </div>
                                <div className="w-full h-2 bg-[#10182B] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#A78BFA] rounded-full" style={{ width: "78%" }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-[#EDEFF5]/60">Student Satisfaction</span>
                                    <span className="text-[#A78BFA] font-medium">98%</span>
                                </div>
                                <div className="w-full h-2 bg-[#10182B] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#A78BFA] rounded-full" style={{ width: "98%" }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Chip className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20 px-4 py-2 text-sm font-medium mb-4">
                        Core Values
                    </Chip>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                        What Drives Us
                    </h2>
                    <p className="text-[#EDEFF5]/60 mt-4 max-w-2xl mx-auto">
                        Our values shape everything we do, from the courses we create to the community we build.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 text-center hover:border-[#A78BFA]/40 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#A78BFA]/10 flex items-center justify-center mx-auto mb-4 text-[#A78BFA] group-hover:bg-[#A78BFA]/20 transition-all duration-300">
                                {value.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-[#EDEFF5] mb-2">
                                {value.title}
                            </h3>
                            <p className="text-[#EDEFF5]/50 text-sm leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Chip className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20 px-4 py-2 text-sm font-medium mb-4">
                        Why Choose Us
                    </Chip>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                        Features That Set Us Apart
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 hover:border-[#A78BFA]/40 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center text-[#A78BFA] mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-[#EDEFF5] font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[#EDEFF5]/50 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Chip className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20 px-4 py-2 text-sm font-medium mb-4">
                        Meet the Team
                    </Chip>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                        Passionate People, Powerful Results
                    </h2>
                    <p className="text-[#EDEFF5]/60 mt-4 max-w-2xl mx-auto">
                        Behind SkillForge is a team of dedicated educators, engineers, and innovators
                        committed to transforming education.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 text-center hover:border-[#A78BFA]/40 transition-all duration-300"
                        >
                            <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#A78BFA] to-[#7C3AED] mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-[#10182B]">
                                {member.name.charAt(0)}
                            </div>
                            <h3 className="text-[#EDEFF5] font-semibold">
                                {member.name}
                            </h3>
                            <p className="text-[#A78BFA] text-sm font-medium">
                                {member.role}
                            </p>
                            <p className="text-[#EDEFF5]/40 text-xs mt-2">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-linear-to-br from-[#A78BFA]/10 via-[#7C3AED]/5 to-transparent border border-[#A78BFA]/20 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EDEFF5]">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-[#EDEFF5]/60 mt-4 max-w-2xl mx-auto">
                        Join thousands of students who are already advancing their careers
                        with SkillForge. Start your learning journey today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Link href="/courses">
                            <Button className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80 px-8 py-6 text-lg rounded-xl">
                                Explore Courses
                                <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button className="border border-[#A78BFA]/30 text-[#EDEFF5] hover:bg-[#A78BFA]/10 px-8 py-6 text-lg rounded-xl">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}