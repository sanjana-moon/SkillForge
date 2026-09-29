"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaArrowRight,
    FaBrain,
    FaMessage,
    FaMagnifyingGlass,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

type CoursePreview = {
    _id: string;
    title: string;
    category: string;
    price: number;
};

type FeatureCard = {
    id: "recommendation" | "mentor" | "search" | "roadmap";
    title: string;
    description: string;
    highlights: string[];
    icon: typeof FaBrain;
    accent: "#C5A059" | "#5C3A21" | "#D46A2B";
    ctaLabel: string;
    /** Search query sent to /api/courses?search=... */
    searchQuery: string;
    /** Where the CTA link goes */
    href: string;
};

const FEATURES: FeatureCard[] = [
    {
        id: "recommendation",
        title: "AI Recommendation Engine",
        description:
            "Specify your prior expertise and desired target title. Our engine curates a tailored learning roadmap containing exact modules, exercises, and time allocations to bridge your skill gaps.",
        highlights: [
            "Maps to Next.js, Cloud, & ML roles",
            "Dynamic timeline recalculation",
        ],
        icon: FaBrain,
        accent: "#C5A059",
        ctaLabel: "Launch Roadmap Builder",
        searchQuery: "roadmap",
        href: "/ai-mentor",
    },
    {
        id: "mentor",
        title: "24/7 AI Mentor Assist",
        description:
            "Stuck on an exercise? Ask your mentor. Receive context-aware code breakdowns, syntax explanations, database optimization guidelines, or security checks without stepping out of your IDE workspace.",
        highlights: [
            "Instant syntax debug explanation",
            "Code optimization suggestions",
        ],
        icon: FaMessage,
        accent: "#5C3A21",
        ctaLabel: "Chat with AI Mentor",
        searchQuery: "programming",
        href: "/ai-mentor",
    },
    {
        id: "search",
        title: "Smart Course Search",
        description:
            "Type a natural phrase like “build a REST API with Node” and we surface the closest matching courses ranked by relevance, level, and rating — no more scrolling through endless pages.",
        highlights: [
            "Natural-language search",
            "Relevance-ranked results",
        ],
        icon: FaMagnifyingGlass,
        accent: "#D46A2B",
        ctaLabel: "Search Courses",
        searchQuery: "api",
        href: "/courses?search=api",
    },
    {
        id: "roadmap",
        title: "Adaptive Skill Roadmaps",
        description:
            "Every course feeds into a personal roadmap. Complete a module and your next steps recalculate automatically based on what you’ve mastered and what’s still shaky.",
        highlights: [
            "Progress-aware sequencing",
            "Gap detection after each module",
        ],
        icon: HiSparkles,
        accent: "#C5A059",
        ctaLabel: "View Roadmaps",
        searchQuery: "advanced",
        href: "/courses?search=advanced",
    },
];

export default function AIFeatures() {
    return (
        <section className="relative overflow-hidden border-t border-[#C5A059]/10 bg-[#1C2E24] py-20">
            {/* Background glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-75 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-[#C5A059]/10 to-[#5C3A21]/10 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5C3A21]/30 bg-[#5C3A21]/15 px-3 py-1 font-mono text-xs font-bold text-[#C5A059]">
                        <HiSparkles className="text-sm" />
                        Empower Your Study Engine
                    </div>

                    <h2 className="font-heading text-3xl font-bold text-[#EBE3D5] sm:text-4xl">
                        Custom Built{" "}
                        <span className="bg-linear-to-r from-[#C5A059] to-[#5C3A21] bg-clip-text text-transparent">
                            AI Tools
                        </span>
                    </h2>

                    <p className="mt-4 font-body text-[#EBE3D5]/70">
                        Harness generative intelligence built to accelerate
                        comprehension, solve blocks, and personalize mapping.
                    </p>
                </div>

                {/* Grid */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                    {FEATURES.map((feature) => (
                        <FeatureCardItem
                            key={feature.id}
                            feature={feature}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCardItem({ feature }: { feature: FeatureCard }) {
    const Icon = feature.icon;
    const [preview, setPreview] = useState<CoursePreview[] | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch a live preview of matching courses for this card
    useEffect(() => {
        let cancelled = false;

        async function loadPreview() {
            try {
                setLoading(true);

                const apiBase =
                    process.env.NEXT_PUBLIC_API_URL || "";

                const res = await fetch(
                    `${apiBase}/api/courses?search=${encodeURIComponent(
                        feature.searchQuery
                    )}&limit=2`,
                    { cache: "no-store" }
                );

                if (!res.ok) throw new Error("Preview fetch failed");

                const data = (await res.json()) as {
                    courses?: CoursePreview[];
                };

                if (!cancelled) setPreview(data.courses ?? []);
            } catch {
                if (!cancelled) setPreview([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadPreview();
        return () => {
            cancelled = true;
        };
    }, [feature.searchQuery]);

    return (
        <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#C5A059]/10 bg-linear-to-b from-[#3E5C4B] to-[#1C2E24] p-8 shadow-xl transition duration-300"
            style={{
                // use accent color for border on hover, kept inline for dynamic color
                borderColor: "rgba(197,160,89,0.1)",
            }}
        >
            {/* Inner glow */}
            <div
                className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-60 blur-3xl transition duration-500 group-hover:scale-125"
                style={{ background: `${feature.accent}1A` }}
            />

            <div>
                {/* Icon */}
                <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border"
                    style={{
                        backgroundColor: `${feature.accent}26`,
                        borderColor: `${feature.accent}33`,
                        color: feature.accent,
                    }}
                >
                    <Icon className="text-xl" />
                </div>

                <h3
                    className="font-heading text-2xl font-bold text-[#EBE3D5] transition"
                    style={{ transition: "color 200ms ease" }}
                >
                    {feature.title}
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-[#EBE3D5]/70">
                    {feature.description}
                </p>

                {/* Highlights */}
                <ul className="mt-6 space-y-2 font-mono text-xs text-[#EBE3D5]/60">
                    {feature.highlights.map((line) => (
                        <li key={line} className="flex items-center gap-2">
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: feature.accent }}
                            />
                            {line}
                        </li>
                    ))}
                </ul>

                {/* Live preview of matching courses */}
                <div className="mt-6">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#EBE3D5]/40">
                        Matching courses
                    </p>

                    {loading && (
                        <p className="text-xs text-[#EBE3D5]/50">
                            Searching…
                        </p>
                    )}

                    {!loading && preview && preview.length === 0 && (
                        <p className="text-xs text-[#EBE3D5]/50">
                            No matches yet for “{feature.searchQuery}”.
                        </p>
                    )}

                    {!loading && preview && preview.length > 0 && (
                        <ul className="space-y-1.5">
                            {preview.map((c) => (
                                <li key={c._id}>
                                    <Link
                                        href={`/courses/${c._id}`}
                                        className="flex items-center justify-between gap-3 rounded-lg border border-[#C5A059]/10 bg-[#1C2E24]/50 px-3 py-2 text-xs text-[#EBE3D5]/80 transition hover:border-[#C5A059]/40 hover:text-[#EBE3D5]"
                                    >
                                        <span className="truncate">
                                            {c.title}
                                        </span>
                                        <span className="shrink-0 font-mono text-[10px] text-[#C5A059]">
                                            ${c.price}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
                <Link
                    href={feature.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition duration-200"
                    style={{ color: feature.accent }}
                >
                    {feature.ctaLabel}
                    <FaArrowRight className="text-xs transition duration-200 group-hover:translate-x-1.5" />
                </Link>
            </div>
        </div>
    );
}