"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaCode, FaCloud, FaDatabase, FaMobileScreenButton, FaLayerGroup,
} from "react-icons/fa6";
import { RiBrainLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import type { IconType } from "react-icons";
import { Category, getCategories } from "@/lib/api/courses/data";

// Refined color themes using strictly your design tokens
const THEMES = [
    // 1. White card with Navy primary icon
    { 
        cardBg: "bg-surface", 
        iconBg: "bg-action-primary", 
        text: "text-main", 
        desc: "text-muted", 
        border: "border-main",
        badge: "bg-alt text-accent" 
    },
    // 2. Sky Blue card with Teal secondary icon
    { 
        cardBg: "bg-alt", 
        iconBg: "bg-action-secondary", 
        text: "text-main", 
        desc: "text-main/80", 
        border: "border-accent/30",
        badge: "bg-surface text-main" 
    },
    // 3. White card with Teal secondary icon
    { 
        cardBg: "bg-surface", 
        iconBg: "bg-action-secondary", 
        text: "text-main", 
        desc: "text-muted", 
        border: "border-main",
        badge: "bg-alt text-accent" 
    },
];

const ICONS: Record<string, { icon: IconType; desc: string }> = {
    "ai & machine learning": {
        icon: RiBrainLine,
        desc: "Deep Learning, LLMs, Neural Networks, and NLP.",
    },
    "web development": {
        icon: FaCode,
        desc: "Modern JavaScript, React, Next.js, and Backend APIs.",
    },
    "cyber security": {
        icon: MdSecurity,
        desc: "Penetration Testing, Cryptography, and Threat Auditing.",
    },
    "cloud computing": {
        icon: FaCloud,
        desc: "AWS, Kubernetes, Terraform, and DevOps Pipelines.",
    },
    "data science": {
        icon: FaDatabase,
        desc: "Python, Pandas, Big Data Pipelines, and Visualization.",
    },
    "mobile apps": {
        icon: FaMobileScreenButton,
        desc: "React Native, Flutter, Swift, and Android SDKs.",
    },
};

const DEFAULT = {
    icon: FaLayerGroup,
    desc: "Explore specialized skills in this technology domain.",
};

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="bg-main border-t border-main py-20 relative overflow-hidden">
            {/* Subtle background ambient decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-alt/20 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-alt text-accent font-semibold text-xs uppercase tracking-wider border border-accent/20">
                        Curated Learning Paths
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-main sm:text-4xl tracking-tight">
                        Browse by <span className="text-accent">Technology Category</span>
                    </h2>
                    <p className="mt-4 font-body text-muted text-base sm:text-lg">
                        Acquire specialized, industry-ready skills across critical high-demand tech domains.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(loading ? Array(6).fill(null) : categories).map(
                        (cat: Category | null, i) => {
                            if (!cat) {
                                return (
                                    <div
                                        key={i}
                                        className="h-56 animate-pulse rounded-2xl bg-surface border border-main p-6 flex flex-col justify-between"
                                    >
                                        <div className="w-12 h-12 bg-alt rounded-2xl" />
                                        <div className="space-y-2">
                                            <div className="h-5 bg-alt rounded w-3/4" />
                                            <div className="h-4 bg-alt rounded w-full" />
                                        </div>
                                    </div>
                                );
                            }

                            // Cycle through refined themes
                            const theme = THEMES[i % THEMES.length];
                            const meta = ICONS[cat.name.toLowerCase()] ?? DEFAULT;
                            const Icon = meta.icon;

                            return (
                                <Link
                                    key={cat.name}
                                    href={`/courses?category=${encodeURIComponent(cat.name)}`}
                                    className={`group relative flex flex-col rounded-2xl border p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${theme.cardBg} ${theme.border}`}
                                >
                                    {/* Icon & Count Badge Top Row */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${theme.iconBg}`}>
                                            <Icon className="text-2xl" />
                                        </div>
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${theme.badge}`}>
                                            {cat.count} Course{cat.count === 1 ? "" : "s"}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`font-heading text-xl font-bold transition-colors ${theme.text} group-hover:text-accent`}>
                                        {cat.name}
                                    </h3>

                                    {/* Description */}
                                    <p className={`mt-2 text-sm leading-relaxed ${theme.desc}`}>
                                        {meta.desc}
                                    </p>

                                    {/* Footer Action Link */}
                                    <div className={`mt-8 pt-4 border-t border-main/10 flex items-center justify-between text-xs font-semibold tracking-wide uppercase ${theme.text}`}>
                                        <span className="opacity-75 group-hover:opacity-100">Explore Domain</span>
                                        <span className="flex items-center gap-1 text-accent transition-transform duration-300 group-hover:translate-x-1.5">
                                            <span>&rarr;</span>
                                        </span>
                                    </div>
                                </Link>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
}