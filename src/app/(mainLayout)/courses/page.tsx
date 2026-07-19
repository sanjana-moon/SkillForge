import { getCourses } from "@/lib/api/courses/data";
import BrowseCoursesClient from "./BrowseCoursesClient";

interface BrowseCoursesPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        level?: string;
        sort?: string;
        page?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
}

export default async function BrowseCoursesPage({
    searchParams,
}: BrowseCoursesPageProps) {
    const params = await searchParams;

    const search = params.search || "";
    const category = params.category || "all";
    const level = params.level || "all";
    const sort = params.sort || "newest";
    const page = params.page || "1";
    const minPrice = params.minPrice || "";
    const maxPrice = params.maxPrice || "";

    const filters = {
        search,
        category: category === "all" ? undefined : category,
        level: level === "all" ? undefined : level,
        sort,
        page: Number(page),
        limit: 8,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    // ✅ Use getCourses instead of fetchAllCourses
    const data = await getCourses(filters);

    return (
        <BrowseCoursesClient
            initialCourses={data.courses}
            totalCourses={data.totalCourses}
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            currentSearch={search}
            currentCategory={category}
            currentLevel={level}
            currentSort={sort}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
        />
    );
}