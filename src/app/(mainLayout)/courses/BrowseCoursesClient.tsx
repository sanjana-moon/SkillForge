"use client";

import { useState, useEffect } from "react";
import {
    useRouter,
    usePathname,
    useSearchParams,
} from "next/navigation";

import { motion } from "framer-motion";
import { Card, Button, Spinner } from "@heroui/react";

import { FaSearch, FaBook, FaFilter, FaTimes } from "react-icons/fa";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import CourseCard from "@/components/courses/CourseCard";
import { useCourses } from "@/lib/hooks/useCourses";

const CATEGORIES = [
    "all",
    "programming",
    "design",
    "business",
    "marketing",
    "photography",
    "music",
    "health",
    "language",
];

const LEVELS = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "title", label: "Title A-Z" },
    { value: "price-low", label: "Price: Low → High" },
    { value: "price-high", label: "Price: High → Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
];

const BrowseCoursesClient = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // URL is the single source of truth for filters
    const urlSearch = searchParams.get("search") || "";
    const urlMinPrice = searchParams.get("minPrice") || "";
    const urlMaxPrice = searchParams.get("maxPrice") || "";
    const currentCategory = searchParams.get("category") || "all";
    const currentLevel = searchParams.get("level") || "all";
    const currentSort = searchParams.get("sort") || "newest";
    const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);

    // Local state only drives the text inputs (debounced into the URL)
    const [search, setSearch] = useState(urlSearch);
    const [minPrice, setMinPrice] = useState(urlMinPrice);
    const [maxPrice, setMaxPrice] = useState(urlMaxPrice);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filters = {
        search: urlSearch || undefined,
        category: currentCategory === "all" ? undefined : currentCategory,
        level: currentLevel === "all" ? undefined : currentLevel,
        sort: currentSort,
        page: currentPage,
        limit: 8,
        minPrice: urlMinPrice ? Number(urlMinPrice) : undefined,
        maxPrice: urlMaxPrice ? Number(urlMaxPrice) : undefined,
    };

    const { data, isLoading, isError, refetch } = useCourses(filters);

    // Debounced sync of text inputs -> URL. Skips when nothing changed,
    // so it never pushes on mount or resets the page needlessly.
    useEffect(() => {
        if (search === urlSearch && minPrice === urlMinPrice && maxPrice === urlMaxPrice) {
            return;
        }

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            const setOrDelete = (key: string, value: string) => {
                if (value) params.set(key, value);
                else params.delete(key);
            };

            setOrDelete("search", search);
            setOrDelete("minPrice", minPrice);
            setOrDelete("maxPrice", maxPrice);
            params.set("page", "1");

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 400);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, minPrice, maxPrice]);

    const updateQueryParams = (key: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "" && value !== "all") {
            params.set(key, String(value));
        } else {
            params.delete(key);
        }

        if (key !== "page") {
            params.set("page", "1");
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const clearFilters = () => {
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
        router.push(pathname, { scroll: false });
        setIsFilterOpen(false);
    };

    const courses = data?.courses || [];
    const totalCourses = data?.totalCourses || 0;
    const totalPages = data?.totalPages || 0;

    return (
        <div className="min-h-screen bg-[#1C2E24]">
            <div className="container mx-auto px-4 py-6 md:py-10">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-linear-to-r from-[#3E5C4B] via-[#1C2E24] to-[#3E5C4B] border border-[#C5A059]/20 rounded-2xl md:rounded-3xl py-10 md:py-16 px-6 md:px-8 text-center shadow-xl mb-6 md:mb-10"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C5A059] via-[#5C3A21] to-[#C5A059]" />
                    <FaBook className="text-4xl md:text-5xl text-[#C5A059] mx-auto mb-3 md:mb-4" />
                    <h1 className="text-3xl md:text-5xl font-bold text-[#EBE3D5]">
                        Discover Your Next Course
                    </h1>
                    <p className="text-[#EBE3D5]/70 mt-3 md:mt-5 max-w-3xl mx-auto text-base md:text-lg">
                        Explore a wide range of courses from expert instructors.
                        Learn new skills, advance your career, and achieve your goals.
                    </p>
                </motion.div>

                {/* Filters - Desktop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden lg:block bg-[#3E5C4B] rounded-3xl shadow-xl border border-[#C5A059]/20 p-6 mb-8"
                >
                    <div className="grid grid-cols-7 gap-4">
                        <div className="col-span-2 flex items-center gap-3 bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 focus-within:border-[#C5A059] transition-colors">
                            <FaSearch className="text-[#C5A059]" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-3 bg-transparent outline-none text-[#EBE3D5] placeholder:text-[#EBE3D5]/40"
                            />
                        </div>

                        <select
                            value={currentCategory}
                            onChange={(e) => updateQueryParams("category", e.target.value)}
                            className="bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-3 outline-none focus:border-[#C5A059] text-[#EBE3D5] transition-colors"
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category} className="bg-[#3E5C4B]">
                                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>

                        <select
                            value={currentLevel}
                            onChange={(e) => updateQueryParams("level", e.target.value)}
                            className="bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-3 outline-none focus:border-[#C5A059] text-[#EBE3D5] transition-colors"
                        >
                            {LEVELS.map((level) => (
                                <option key={level.value} value={level.value} className="bg-[#3E5C4B]">
                                    {level.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={currentSort}
                            onChange={(e) => updateQueryParams("sort", e.target.value)}
                            className="bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-3 outline-none focus:border-[#C5A059] text-[#EBE3D5] transition-colors"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value} className="bg-[#3E5C4B]">
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-3 outline-none focus:border-[#C5A059] text-[#EBE3D5] placeholder:text-[#EBE3D5]/40 transition-colors"
                        />

                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-3 outline-none focus:border-[#C5A059] text-[#EBE3D5] placeholder:text-[#EBE3D5]/40 transition-colors"
                        />
                    </div>
                </motion.div>

                {/* Filters - Mobile */}
                <div className="lg:hidden mb-4">
                    <div className="flex gap-3">
                        <div className="flex-1 flex items-center gap-3 bg-[#3E5C4B] border border-[#C5A059]/30 rounded-xl px-4 focus-within:border-[#C5A059] transition-colors">
                            <FaSearch className="text-[#C5A059]" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-3 bg-transparent outline-none text-[#EBE3D5] placeholder:text-[#EBE3D5]/40 text-sm"
                            />
                        </div>
                        <Button
                            onPress={() => setIsFilterOpen(!isFilterOpen)}
                            className="bg-[#3E5C4B] border border-[#C5A059]/30 text-[#EBE3D5] min-w-13 h-13 rounded-xl hover:bg-[#C5A059]/10"
                        >
                            {isFilterOpen ? <FaTimes /> : <FaFilter />}
                        </Button>
                    </div>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isFilterOpen ? "auto" : 0, opacity: isFilterOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3"
                    >
                        <div className="bg-[#3E5C4B] border border-[#C5A059]/20 rounded-2xl p-4 space-y-3">
                            <div>
                                <label className="text-[#EBE3D5]/60 text-xs font-medium block mb-1.5">Category</label>
                                <select
                                    value={currentCategory}
                                    onChange={(e) => updateQueryParams("category", e.target.value)}
                                    className="w-full bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059] text-[#EBE3D5] text-sm transition-colors"
                                >
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category} className="bg-[#3E5C4B]">
                                            {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#EBE3D5]/60 text-xs font-medium block mb-1.5">Level</label>
                                <select
                                    value={currentLevel}
                                    onChange={(e) => updateQueryParams("level", e.target.value)}
                                    className="w-full bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059] text-[#EBE3D5] text-sm transition-colors"
                                >
                                    {LEVELS.map((level) => (
                                        <option key={level.value} value={level.value} className="bg-[#3E5C4B]">
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#EBE3D5]/60 text-xs font-medium block mb-1.5">Sort By</label>
                                <select
                                    value={currentSort}
                                    onChange={(e) => updateQueryParams("sort", e.target.value)}
                                    className="w-full bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059] text-[#EBE3D5] text-sm transition-colors"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value} className="bg-[#3E5C4B]">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#EBE3D5]/60 text-xs font-medium block mb-1.5">Price Range</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059] text-[#EBE3D5] placeholder:text-[#EBE3D5]/40 text-sm transition-colors"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="bg-[#1C2E24] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059] text-[#EBE3D5] placeholder:text-[#EBE3D5]/40 text-sm transition-colors"
                                    />
                                </div>
                            </div>

                            <Button
                                onPress={clearFilters}
                                className="w-full bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#C5A059] font-medium rounded-xl py-2.5 text-sm"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Results: loading/error live here so filters stay mounted */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-24">
                        <Spinner size="lg" />
                    </div>
                ) : isError ? (
                    <Card className="bg-[#3E5C4B] border border-red-500/20 rounded-2xl p-8 text-center">
                        <p className="text-red-400">Failed to load courses. Please try again.</p>
                        <Button className="mt-4 bg-[#C5A059] text-[#1C2E24]" onPress={() => refetch()}>
                            Retry
                        </Button>
                    </Card>
                ) : (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-[#EBE3D5]/60 text-sm md:text-lg">
                                Showing <span className="font-bold text-[#EBE3D5]">{totalCourses}</span> course{totalCourses !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {totalCourses === 0 ? (
                            <Card className="bg-[#3E5C4B] border border-[#C5A059]/20 rounded-3xl shadow-xl py-20 text-center">
                                <FaBook className="text-5xl text-[#EBE3D5]/20 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-[#EBE3D5]">No courses found</h2>
                                <p className="text-[#EBE3D5]/50 mt-3">Try changing your search or filters.</p>
                            </Card>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                                >
                                    {courses.map((course) => (
                                        <CourseCard key={course._id} course={course} />
                                    ))}
                                </motion.div>

                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 md:gap-3 mt-10 md:mt-12">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => updateQueryParams("page", currentPage - 1)}
                                            className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-[#C5A059]/10 text-[#EBE3D5] flex items-center justify-center hover:bg-[#C5A059]/20 transition disabled:bg-[#C5A059]/5 disabled:text-[#EBE3D5]/30 disabled:cursor-not-allowed border border-[#C5A059]/20"
                                        >
                                            <BiLeftArrow size={16} />
                                        </button>

                                        {Array.from({ length: Math.min(totalPages, 7) }, (_, index) => {
                                            let pageNumber: number;
                                            if (totalPages <= 7) pageNumber = index + 1;
                                            else if (currentPage <= 4) pageNumber = index + 1;
                                            else if (currentPage >= totalPages - 3) pageNumber = totalPages - 6 + index;
                                            else pageNumber = currentPage - 3 + index;

                                            if ((index === 0 && pageNumber > 1) || (index === 6 && pageNumber < totalPages)) {
                                                return <span key={`ellipsis-${index}`} className="text-[#EBE3D5]/40">...</span>;
                                            }
                                            if (pageNumber < 1 || pageNumber > totalPages) return null;

                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => updateQueryParams("page", pageNumber)}
                                                    className={`w-9 h-9 md:w-11 md:h-11 rounded-xl font-semibold text-sm transition ${
                                                        currentPage === pageNumber
                                                            ? "bg-[#C5A059] text-[#1C2E24] shadow-lg shadow-[#C5A059]/20"
                                                            : "bg-[#3E5C4B] border border-[#C5A059]/20 text-[#EBE3D5] hover:bg-[#C5A059]/10"
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        })}

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => updateQueryParams("page", currentPage + 1)}
                                            className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-[#C5A059]/10 text-[#EBE3D5] flex items-center justify-center hover:bg-[#C5A059]/20 transition disabled:bg-[#C5A059]/5 disabled:text-[#EBE3D5]/30 disabled:cursor-not-allowed border border-[#C5A059]/20"
                                        >
                                            <BiRightArrow size={16} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BrowseCoursesClient;