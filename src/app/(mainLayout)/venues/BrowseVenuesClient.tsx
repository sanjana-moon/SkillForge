"use client";

import { useState, useEffect } from "react";
import {
    useRouter,
    usePathname,
    useSearchParams,
} from "next/navigation";

import { motion } from "motion/react";

import { FaSearch } from "react-icons/fa";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import VenueCard from "@/component/venues/VenueCard";
import type { Venue } from "@/lib/api/venues/data";

interface BrowseVenuesClientProps {
    initialVenues: Venue[];
    totalVenues: number;
    totalPages: number;
    currentPage: number;
    currentSearch: string;
    currentCategory: string;
    currentSort: string;
    currentMinPrice: string;
    currentMaxPrice: string;
}

const BrowseVenuesClient = ({
    initialVenues,
    totalVenues,
    totalPages,
    currentPage,
    currentSearch,
    currentCategory,
    currentSort,
    currentMinPrice,
    currentMaxPrice,
}: BrowseVenuesClientProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(currentSearch);
    const [minPrice, setMinPrice] = useState(currentMinPrice);
    const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

    useEffect(() => {
        setSearch(currentSearch);
    }, [currentSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateQueryParams("search", search);
        }, 400);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const updateQueryParams = (
        key: string,
        value: string | number
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (
            value &&
            value !== "" &&
            value !== "all"
        ) {
            params.set(key, String(value));
        } else {
            params.delete(key);
        }

        if (key !== "page") {
            params.set("page", "1");
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const categories = [
        "all",
        "Wedding",
        "Corporate",
        "Birthday",
        "Conference",
        "Concert",
        "Banquet Hall",
        "Outdoor",
        "Rooftop",
        "Community Hall",
        "Other",
    ];

    return (
        <div className="min-h-screen bg-[#F0F7F4]">

            <div className="container mx-auto px-4 py-10">

                {/* Hero */}

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-linear-to-r from-[#0A2F1D] via-[#1E6B4F] to-[#0A2F1D] rounded-3xl py-16 px-8 text-center shadow-xl mb-10"
                >
                    {/* Decorative gold accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]" />

                    <h1 className="text-5xl font-bold text-white">
                        Find Your Perfect Venue
                    </h1>

                    <p className="text-white/90 mt-5 max-w-3xl mx-auto text-lg">
                        Discover elegant venues for weddings,
                        birthdays, conferences, corporate events,
                        concerts and unforgettable celebrations.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl border border-[#D4AF37]/30 p-6 mb-8"
                >
                    <div className="grid lg:grid-cols-5 gap-4">

                        {/* Search */}
                        <div className="flex items-center gap-3 bg-[#F0F7F4] border border-[#D4AF37]/30 rounded-xl px-4 focus-within:border-[#1E6B4F] transition-colors">
                            <FaSearch className="text-[#D4AF37]" />
                            <input
                                type="text"
                                placeholder="Search venues..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full py-3 bg-transparent outline-none text-[#12201B] placeholder:text-[#12201B]/40"
                            />
                        </div>

                        {/* Category */}
                        <select
                            value={currentCategory}
                            onChange={(e) =>
                                updateQueryParams(
                                    "category",
                                    e.target.value
                                )
                            }
                            className="bg-[#F0F7F4] border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#1E6B4F] text-[#12201B] transition-colors"
                        >

                            {categories.map((category) => (

                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category === "all" ? "All Categories" : category}
                                </option>

                            ))}

                        </select>

                        {/* Sort */}

                        <select
                            value={currentSort}
                            onChange={(e) =>
                                updateQueryParams(
                                    "sort",
                                    e.target.value
                                )
                            }
                            className="bg-[#F0F7F4] border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#1E6B4F] text-[#12201B] transition-colors"
                        >

                            <option value="name">
                                Name A-Z
                            </option>

                            <option value="price-low">
                                Price: Low → High
                            </option>

                            <option value="price-high">
                                Price: High → Low
                            </option>

                            <option value="rating">
                                Highest Rated
                            </option>

                            <option value="newest">
                                Newest
                            </option>

                        </select>

                        {/* Min Price */}

                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(e.target.value);

                                updateQueryParams(
                                    "minPrice",
                                    e.target.value
                                );
                            }}
                            className="bg-[#F0F7F4] border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#1E6B4F] text-[#12201B] placeholder:text-[#12201B]/40 transition-colors"
                        />

                        {/* Max Price */}

                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(e.target.value);

                                updateQueryParams(
                                    "maxPrice",
                                    e.target.value
                                );
                            }}
                            className="bg-[#F0F7F4] border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#1E6B4F] text-[#12201B] placeholder:text-[#12201B]/40 transition-colors"
                        />

                    </div>

                </motion.div>

                {/* Results summary */}

                <div className="mb-6 flex items-center justify-between">
                    <p className="text-[#12201B]/70 text-lg">
                        Showing{" "}
                        <span className="font-bold text-[#0A2F1D]">
                            {totalVenues}
                        </span>{" "}
                        venue{totalVenues !== 1 ? "s" : ""}
                    </p>
                </div>

                {totalVenues === 0 ? (
                    <div className="bg-white rounded-3xl shadow-md border border-[#D4AF37]/20 py-20 text-center">
                        <h2 className="text-3xl font-bold text-[#0A2F1D]">
                            No venues found
                        </h2>

                        <p className="text-[#12201B]/60 mt-3">
                            Try changing your search or filters.
                        </p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
                        >
                            {initialVenues.map((venue) => (
                                <VenueCard
                                    key={venue._id}
                                    venue={venue}
                                />
                            ))}
                        </motion.div>

                        {/* Pagination */}

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-3 mt-12">

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        updateQueryParams(
                                            "page",
                                            currentPage - 1
                                        )
                                    }
                                    className="w-11 h-11 rounded-xl bg-[#0A2F1D] text-white flex items-center justify-center hover:bg-[#1E6B4F] transition disabled:bg-[#12201B]/20 disabled:cursor-not-allowed"
                                >
                                    <BiLeftArrow size={18} />
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                updateQueryParams(
                                                    "page",
                                                    index + 1
                                                )
                                            }
                                            className={`w-11 h-11 rounded-xl font-semibold transition ${currentPage === index + 1
                                                    ? "bg-[#D4AF37] text-white shadow-md"
                                                    : "bg-white border border-[#D4AF37]/30 text-[#12201B] hover:bg-[#F0F7F4]"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        updateQueryParams(
                                            "page",
                                            currentPage + 1
                                        )
                                    }
                                    className="w-11 h-11 rounded-xl bg-[#0A2F1D] text-white flex items-center justify-center hover:bg-[#1E6B4F] transition disabled:bg-[#12201B]/20 disabled:cursor-not-allowed"
                                >
                                    <BiRightArrow size={18} />
                                </button>

                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BrowseVenuesClient;