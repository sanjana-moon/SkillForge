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

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const currentCategory = searchParams.get("category") || "all";
    const currentLevel = searchParams.get("level") || "all";
    const currentSort = searchParams.get("sort") || "newest";
    const currentPage = parseInt(searchParams.get("page") || "1");

    const filters = {
        search: search || undefined,
        category: currentCategory === "all" ? undefined : currentCategory,
        level: currentLevel === "all" ? undefined : currentLevel,
        sort: currentSort,
        page: currentPage,
        limit: 8,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const { data, isLoading, isError } = useCourses(filters);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateQueryParams("search", search);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#10182B] flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#10182B] flex items-center justify-center">
                <Card className="bg-[#1C2740] border border-red-500/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400">Failed to load courses. Please try again.</p>
                    <Button className="mt-4 bg-[#A78BFA] text-[#10182B]" onPress={() => window.location.reload()}>
                        Retry
                    </Button>
                </Card>
            </div>
        );
    }

    const courses = data?.courses || [];
    const totalCourses = data?.totalCourses || 0;
    const totalPages = data?.totalPages || 0;

    return (
        <div className="min-h-screen bg-[#10182B]">
            <div className="container mx-auto px-4 py-6 md:py-10">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-linear-to-r from-[#1C2740] via-[#10182B] to-[#1C2740] border border-[#A78BFA]/20 rounded-2xl md:rounded-3xl py-10 md:py-16 px-6 md:px-8 text-center shadow-xl mb-6 md:mb-10"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#A78BFA] via-[#7C3AED] to-[#A78BFA]" />
                    <FaBook className="text-4xl md:text-5xl text-[#A78BFA] mx-auto mb-3 md:mb-4" />
                    <h1 className="text-3xl md:text-5xl font-bold text-[#EDEFF5]">
                        Discover Your Next Course
                    </h1>
                    <p className="text-[#EDEFF5]/70 mt-3 md:mt-5 max-w-3xl mx-auto text-base md:text-lg">
                        Explore a wide range of courses from expert instructors.
                        Learn new skills, advance your career, and achieve your goals.
                    </p>
                </motion.div>

                {/* Filters - Desktop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden lg:block bg-[#1C2740] rounded-3xl shadow-xl border border-[#A78BFA]/20 p-6 mb-8"
                >
                    <div className="grid grid-cols-7 gap-4">
                        <div className="col-span-2 flex items-center gap-3 bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 focus-within:border-[#A78BFA] transition-colors">
                            <FaSearch className="text-[#A78BFA]" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-3 bg-transparent outline-none text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                            />
                        </div>

                        <select
                            value={currentCategory}
                            onChange={(e) => updateQueryParams("category", e.target.value)}
                            className="bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-3 outline-none focus:border-[#A78BFA] text-[#EDEFF5] transition-colors"
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category} className="bg-[#1C2740]">
                                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>

                        <select
                            value={currentLevel}
                            onChange={(e) => updateQueryParams("level", e.target.value)}
                            className="bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-3 outline-none focus:border-[#A78BFA] text-[#EDEFF5] transition-colors"
                        >
                            {LEVELS.map((level) => (
                                <option key={level.value} value={level.value} className="bg-[#1C2740]">
                                    {level.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={currentSort}
                            onChange={(e) => updateQueryParams("sort", e.target.value)}
                            className="bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-3 outline-none focus:border-[#A78BFA] text-[#EDEFF5] transition-colors"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value} className="bg-[#1C2740]">
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(e.target.value);
                                updateQueryParams("minPrice", e.target.value);
                            }}
                            className="bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-3 outline-none focus:border-[#A78BFA] text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 transition-colors"
                        />

                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(e.target.value);
                                updateQueryParams("maxPrice", e.target.value);
                            }}
                            className="bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-3 outline-none focus:border-[#A78BFA] text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 transition-colors"
                        />
                    </div>
                </motion.div>

                {/* Filters - Mobile */}
                <div className="lg:hidden mb-4">
                    <div className="flex gap-3">
                        <div className="flex-1 flex items-center gap-3 bg-[#1C2740] border border-[#A78BFA]/30 rounded-xl px-4 focus-within:border-[#A78BFA] transition-colors">
                            <FaSearch className="text-[#A78BFA]" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-3 bg-transparent outline-none text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 text-sm"
                            />
                        </div>
                        <Button
                            onPress={() => setIsFilterOpen(!isFilterOpen)}
                            className="bg-[#1C2740] border border-[#A78BFA]/30 text-[#EDEFF5] min-w-13 h-13 rounded-xl hover:bg-[#A78BFA]/10"
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
                        <div className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4 space-y-3">
                            <div>
                                <label className="text-[#EDEFF5]/60 text-xs font-medium block mb-1.5">Category</label>
                                <select
                                    value={currentCategory}
                                    onChange={(e) => updateQueryParams("category", e.target.value)}
                                    className="w-full bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#A78BFA] text-[#EDEFF5] text-sm transition-colors"
                                >
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category} className="bg-[#1C2740]">
                                            {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#EDEFF5]/60 text-xs font-medium block mb-1.5">Level</label>
                                <select
                                    value={currentLevel}
                                    onChange={(e) => updateQueryParams("level", e.target.value)}
                                    className="w-full bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#A78BFA] text-[#EDEFF5] text-sm transition-colors"
                                >
                                    {LEVELS.map((level) => (
                                        <option key={level.value} value={level.value} className="bg-[#1C2740]">
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#EDEFF5]/60 text-xs font-medium block mb-1.5">Sort By</label>
                                <select
                                    value={currentSort}
                                    onChange={(e) => updateQueryParams("sort", e.target.value)}
                                    className="w-full bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#A78BFA] text-[#EDEFF5] text-sm transition-colors"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value} className="bg-[#1C2740]">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#EDEFF5]/60 text-xs font-medium block mb-1.5">Price Range</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => {
                                            setMinPrice(e.target.value);
                                            updateQueryParams("minPrice", e.target.value);
                                        }}
                                        className="bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#A78BFA] text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 text-sm transition-colors"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => {
                                            setMaxPrice(e.target.value);
                                            updateQueryParams("maxPrice", e.target.value);
                                        }}
                                        className="bg-[#10182B] border border-[#A78BFA]/30 rounded-xl px-4 py-2.5 outline-none focus:border-[#A78BFA] text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 text-sm transition-colors"
                                    />
                                </div>
                            </div>

                            <Button
                                onPress={clearFilters}
                                className="w-full bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 text-[#A78BFA] font-medium rounded-xl py-2.5 text-sm"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Results summary */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-[#EDEFF5]/60 text-sm md:text-lg">
                        Showing <span className="font-bold text-[#EDEFF5]">{totalCourses}</span> course{totalCourses !== 1 ? "s" : ""}
                    </p>
                </div>

                {totalCourses === 0 ? (
                    <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-3xl shadow-xl py-20 text-center">
                        <FaBook className="text-5xl text-[#EDEFF5]/20 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-[#EDEFF5]">No courses found</h2>
                        <p className="text-[#EDEFF5]/50 mt-3">Try changing your search or filters.</p>
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
                                    className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-[#A78BFA]/10 text-[#EDEFF5] flex items-center justify-center hover:bg-[#A78BFA]/20 transition disabled:bg-[#A78BFA]/5 disabled:text-[#EDEFF5]/30 disabled:cursor-not-allowed border border-[#A78BFA]/20"
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
                                        return <span key={`ellipsis-${index}`} className="text-[#EDEFF5]/40">...</span>;
                                    }
                                    if (pageNumber < 1 || pageNumber > totalPages) return null;

                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => updateQueryParams("page", pageNumber)}
                                            className={`w-9 h-9 md:w-11 md:h-11 rounded-xl font-semibold text-sm transition ${
                                                currentPage === pageNumber
                                                    ? "bg-[#A78BFA] text-[#10182B] shadow-lg shadow-[#A78BFA]/20"
                                                    : "bg-[#1C2740] border border-[#A78BFA]/20 text-[#EDEFF5] hover:bg-[#A78BFA]/10"
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => updateQueryParams("page", currentPage + 1)}
                                    className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-[#A78BFA]/10 text-[#EDEFF5] flex items-center justify-center hover:bg-[#A78BFA]/20 transition disabled:bg-[#A78BFA]/5 disabled:text-[#EDEFF5]/30 disabled:cursor-not-allowed border border-[#A78BFA]/20"
                                >
                                    <BiRightArrow size={16} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BrowseCoursesClient;