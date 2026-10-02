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

const ICONS: Record<string, { icon: IconType; color: string; desc: string }> = {
    "ai & machine learning": {
        icon: RiBrainLine,
        color: "from-[#0E7CC9] to-[#7A56CE]",
        desc: "Deep Learning, LLMs, Neural Networks, and NLP.",
    },
    "web development": {
        icon: FaCode,
        color: "from-[#7A56CE] to-[#0E7CC9]",
        desc: "Modern JavaScript, React, Next.js, and Backend APIs.",
    },
    "cyber security": {
        icon: MdSecurity,
        color: "from-[#7A56CE] to-[#7A56CE]",
        desc: "Penetration Testing, Cryptography, and Threat Auditing.",
    },
    "cloud computing": {
        icon: FaCloud,
        color: "from-[#0E7CC9] to-[#7A56CE]",
        desc: "AWS, Kubernetes, Terraform, and DevOps Pipelines.",
    },
    "data science": {
        icon: FaDatabase,
        color: "from-[#0E7CC9] to-[#7A56CE]",
        desc: "Python, Pandas, Big Data Pipelines, and Visualization.",
    },
    "mobile apps": {
        icon: FaMobileScreenButton,
        color: "from-[#7A56CE] to-[#7A56CE]",
        desc: "React Native, Flutter, Swift, and Android SDKs.",
    },
};

const DEFAULT = {
    icon: FaLayerGroup,
    color: "from-[#0E7CC9] to-[#7A56CE]",
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
        <section className="bg-[#FFFFFF] py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="font-heading text-3xl font-bold text-[#4B4B5A] sm:text-4xl">
                        Browse by{" "}
                        <span className="bg-linear-to-r from-[#0E7CC9] to-[#7A56CE] bg-clip-text text-transparent">
                            Technology Category
                        </span>
                    </h2>
                    <p className="mt-4 font-body text-[#4B4B5A]/70">
                        Acquire specialized skills in critical tech domains.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(loading ? Array(6).fill(null) : categories).map(
                        (cat: Category | null, i) => {
                            if (!cat) {
                                return (
                                    <div
                                        key={i}
                                        className="h-56 animate-pulse rounded-3xl bg-[#FBF8FD]/60"
                                    />
                                );
                            }

                            const meta =
                                ICONS[cat.name.toLowerCase()] ?? DEFAULT;
                            const Icon = meta.icon;

                            return (
                                <Link
                                    key={cat.name}
                                    href={`/courses?category=${encodeURIComponent(cat.name)}`}
                                    className="group rounded-3xl border border-[#0E7CC9]/10 bg-[#FBF8FD] p-6 shadow-lg transition hover:-translate-y-1 hover:border-[#0E7CC9]/30"
                                >
                                    <div
                                        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr ${meta.color} text-[#FFFFFF]`}
                                    >
                                        <Icon className="text-2xl" />
                                    </div>

                                    <h3 className="font-heading text-xl font-bold text-[#4B4B5A] group-hover:text-[#0E7CC9]">
                                        {cat.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-[#4B4B5A]/60">
                                        {meta.desc}
                                    </p>

                                    <div className="mt-6 flex justify-between font-mono text-xs text-[#0E7CC9]">
                                        <span>
                                            {cat.count} Course
                                            {cat.count === 1 ? "" : "s"}
                                        </span>
                                        <span className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                                            Explore &rarr;
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