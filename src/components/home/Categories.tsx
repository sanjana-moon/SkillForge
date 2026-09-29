"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaCode, FaCloud, FaDatabase, FaMobileScreenButton, FaLayerGroup,
} from "react-icons/fa6";
import { RiBrainLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import type { IconType } from "react-icons";
import { getCategories } from "@/lib/api/courses/data";
// import { getCategories, type Category } from "@/lib/api/categories";

const ICONS: Record<string, { icon: IconType; color: string; desc: string }> = {
    "ai & machine learning": {
        icon: RiBrainLine,
        color: "from-[#C5A059] to-[#5C3A21]",
        desc: "Deep Learning, LLMs, Neural Networks, and NLP.",
    },
    "web development": {
        icon: FaCode,
        color: "from-[#5C3A21] to-[#C5A059]",
        desc: "Modern JavaScript, React, Next.js, and Backend APIs.",
    },
    "cyber security": {
        icon: MdSecurity,
        color: "from-[#D46A2B] to-[#D46A2B]",
        desc: "Penetration Testing, Cryptography, and Threat Auditing.",
    },
    "cloud computing": {
        icon: FaCloud,
        color: "from-[#C5A059] to-[#5C3A21]",
        desc: "AWS, Kubernetes, Terraform, and DevOps Pipelines.",
    },
    "data science": {
        icon: FaDatabase,
        color: "from-[#C5A059] to-[#D46A2B]",
        desc: "Python, Pandas, Big Data Pipelines, and Visualization.",
    },
    "mobile apps": {
        icon: FaMobileScreenButton,
        color: "from-[#D46A2B] to-[#5C3A21]",
        desc: "React Native, Flutter, Swift, and Android SDKs.",
    },
};

const DEFAULT = {
    icon: FaLayerGroup,
    color: "from-[#C5A059] to-[#5C3A21]",
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
        <section className="bg-[#1C2E24] py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="font-heading text-3xl font-bold text-[#EBE3D5] sm:text-4xl">
                        Browse by{" "}
                        <span className="bg-linear-to-r from-[#C5A059] to-[#5C3A21] bg-clip-text text-transparent">
                            Technology Category
                        </span>
                    </h2>
                    <p className="mt-4 font-body text-[#EBE3D5]/70">
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
                                        className="h-56 animate-pulse rounded-3xl bg-[#3E5C4B]/60"
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
                                    className="group rounded-3xl border border-[#C5A059]/10 bg-[#3E5C4B] p-6 shadow-lg transition hover:-translate-y-1 hover:border-[#C5A059]/30"
                                >
                                    <div
                                        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr ${meta.color} text-[#1C2E24]`}
                                    >
                                        <Icon className="text-2xl" />
                                    </div>

                                    <h3 className="font-heading text-xl font-bold text-[#EBE3D5] group-hover:text-[#C5A059]">
                                        {cat.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-[#EBE3D5]/60">
                                        {meta.desc}
                                    </p>

                                    <div className="mt-6 flex justify-between font-mono text-xs text-[#C5A059]">
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