import { fetchVenues } from "@/lib/api/venues/data";
import BrowseVenuesClient from "./BrowseVenuesClient";

interface BrowseVenuesPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        sort?: string;
        page?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
}

export default async function BrowseVenuesPage({
    searchParams,
}: BrowseVenuesPageProps) {
    const params = await searchParams;

    const search = params.search || "";
    const category = params.category || "all";
    const sort = params.sort || "newest";
    const page = params.page || "1";
    const minPrice = params.minPrice || "";
    const maxPrice = params.maxPrice || "";

    const query = new URLSearchParams({
        search,
        category,
        sort,
        page,
        limit: "8",
    });

    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);

    const data = await fetchVenues(query);

    return (
        <BrowseVenuesClient
            initialVenues={data.venues}
            totalVenues={data.totalVenues}
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            currentSearch={search}
            currentCategory={category}
            currentSort={sort}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
        />
    );
}