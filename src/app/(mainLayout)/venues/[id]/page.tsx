import Link from "next/link";
import Image from "next/image";

import {
    Button,
    Card,
    Chip,
} from "@heroui/react";

import {
    FaMapMarkerAlt,
    FaStar,
    FaRegEnvelope,
    FaPhoneAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaWifi,
    FaChevronRight,
    FaClock,
    FaCalendarAlt,
    FaUsers,
    FaTag,
} from "react-icons/fa";

import VenueBookingWidget from "@/component/venues/VenueBookingWidget";
import VenueReviewSection from "@/component/venues/VenueReviewSection";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { baseURL } from "@/lib/api/baseUrl";
import {
    canReviewVenue,
    fetchVenueReviews,
} from "@/lib/api/venues/data";
import type { Venue } from "@/lib/api/venues/data";

const fetchVenue = async (id: string): Promise<Venue> => {
    const res = await fetch(`${baseURL}/api/single-venue/${id}`, {
        cache: "no-store",
    });

    return res.json() as Promise<Venue>;
};

export default async function VenueDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const venue = await fetchVenue(id);
    const reviews = await fetchVenueReviews(id);

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const permission = session
        ? await canReviewVenue(id, session.user.email)
        : { canReview: false };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-[#f0f7f4] text-[#12201B]">
            {/* ================= SECTION TABS NAVIGATION ================= */}
            <div className="max-w-7xl mx-auto px-5 pt-8 flex gap-2 overflow-x-auto border-b border-[#174A31]/10 pb-0">
                <Button className="bg-gradient-to-r from-[#174A31] to-[#1f5e3f] text-white font-medium px-8 rounded-full shadow-lg shadow-[#174A31]/20 hover:shadow-xl hover:shadow-[#174A31]/30 transition-all duration-300">
                    Details
                </Button>
                <Button className="text-gray-600 font-medium px-6 rounded-full hover:bg-[#174A31]/5 transition-all duration-300">
                    Features
                </Button>
                <Button className="text-gray-600 font-medium px-6 rounded-full hover:bg-[#174A31]/5 transition-all duration-300">
                    Dining Options
                </Button>
                <Button className="text-gray-600 font-medium px-6 rounded-full hover:bg-[#174A31]/5 transition-all duration-300">
                    Location
                </Button>
            </div>

            <div className="max-w-7xl mx-auto px-5 py-10 grid lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-8">

                    {/* Image Grid Gallery */}
                    <div className="relative grid grid-cols-4 gap-3 h-80 md:h-105">
                        <div className="col-span-4 relative rounded-3xl overflow-hidden shadow-xl shadow-[#174A31]/10 hover:shadow-2xl hover:shadow-[#174A31]/20 transition-all duration-500">
                            <Image
                                src={venue.image}
                                alt={venue.name}
                                fill
                                priority
                                className="object-cover w-full hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient Overlay */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F1D]/30 via-transparent to-transparent"></div> */}
                            
                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                                <span className="text-xs font-bold text-[#174A31] uppercase tracking-wider">Featured</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Sub-bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm bg-white rounded-2xl p-4 shadow-sm border border-[#174A31]/5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-gradient-to-r from-[#174A31]/5 to-[#174A31]/10 px-4 py-2 rounded-full border border-[#174A31]/10">
                                <FaMapMarkerAlt className="text-[#174A31] text-sm" />
                                <span className="font-medium text-[#12201B]">{venue.location}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200/50">
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-amber-400" />
                                    <span className="font-bold text-amber-600">4.8</span>
                                </div>
                                <span className="text-amber-400">•</span>
                                <span className="text-amber-600 font-medium">({reviews.length} reviews)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-gray-500">
                                <FaUsers className="text-[#174A31] text-sm" />
                                <span className="font-medium">{venue.capacity} Guests</span>
                            </div>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <div className="flex items-center gap-1 text-gray-500">
                                <FaTag className="text-[#174A31] text-sm" />
                                <span className="font-medium capitalize">{venue.category}</span>
                            </div>
                        </div>
                    </div>

                    {/* Header Title & Description */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#174A31]/5">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A2F1D] mb-4 leading-tight">
                            {venue.name}
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {venue.description}
                        </p>
                        <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#174A31] hover:text-[#0A2F1D] transition-colors group">
                            Read More
                            <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Features Grid Panel */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#174A31]/5">
                        <h2 className="text-2xl font-bold text-[#0A2F1D] mb-6 flex items-center gap-2">
                            <span className="w-1 h-8 bg-gradient-to-b from-[#174A31] to-[#1f5e3f] rounded-full"></span>
                            Features & Amenities
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 bg-gray-50/80 px-4 py-3 rounded-xl border border-gray-100 hover:border-[#174A31]/30 hover:bg-[#174A31]/5 transition-all duration-300 group">
                                <FaBed className="text-[#174A31] text-lg group-hover:scale-110 transition-transform duration-300" />
                                <span>Max {venue.capacity} Guests</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 bg-gray-50/80 px-4 py-3 rounded-xl border border-gray-100 hover:border-[#174A31]/30 hover:bg-[#174A31]/5 transition-all duration-300 group">
                                <FaBath className="text-[#174A31] text-lg group-hover:scale-110 transition-transform duration-300" />
                                <span>Premium Setup</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 bg-gray-50/80 px-4 py-3 rounded-xl border border-gray-100 hover:border-[#174A31]/30 hover:bg-[#174A31]/5 transition-all duration-300 group">
                                <FaRulerCombined className="text-[#174A31] text-lg group-hover:scale-110 transition-transform duration-300" />
                                <span className="capitalize">{venue.category}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 bg-gray-50/80 px-4 py-3 rounded-xl border border-gray-100 hover:border-[#174A31]/30 hover:bg-[#174A31]/5 transition-all duration-300 group">
                                <FaWifi className="text-[#174A31] text-lg group-hover:scale-110 transition-transform duration-300" />
                                <span>Free Wi-Fi</span>
                            </div>
                        </div>
                    </div>

                    {/* REVIEWS SECTION */}
                    <div className="pt-2">
                        <VenueReviewSection
                            reviews={reviews}
                            canReview={permission.canReview}
                            venue={venue}
                            user={session?.user}
                        />
                    </div>

                </div>

                <div className="space-y-6">
                    <div className="sticky top-6 space-y-6">

                        {/* Contact Card */}
                        <Card className="p-6 border border-[#174A31]/10 rounded-3xl bg-white shadow-lg shadow-[#174A31]/5 hover:shadow-xl hover:shadow-[#174A31]/10 transition-all duration-300">
                            <h3 className="text-lg font-bold text-[#0A2F1D] mb-5 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-[#174A31] to-[#1f5e3f] rounded-full"></span>
                                Contact Us
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50/80 hover:bg-[#174A31]/5 transition-colors duration-300">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FaRegEnvelope className="text-[#174A31]" />
                                        Email
                                    </span>
                                    <span className="font-medium text-[#12201B]">info@venuehub.com</span>
                                </div>
                                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50/80 hover:bg-[#174A31]/5 transition-colors duration-300">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FaPhoneAlt className="text-[#174A31]" />
                                        Number
                                    </span>
                                    <span className="font-medium text-[#12201B]">+880 1234 56789</span>
                                </div>
                            </div>
                        </Card>

                        {/* Booking & Rate Box Card */}
                        <Card className="border border-[#174A31]/10 rounded-3xl overflow-hidden bg-white shadow-lg shadow-[#174A31]/5 hover:shadow-xl hover:shadow-[#174A31]/10 transition-all duration-300">
                            {/* Inner Header Label */}
                            <div className="p-6 border-b border-[#174A31]/5 pb-4 bg-gradient-to-r from-[#174A31]/5 to-transparent">
                                <h3 className="text-lg font-bold text-[#0A2F1D] flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-[#174A31] to-[#1f5e3f] rounded-full"></span>
                                    Booking Options
                                </h3>
                            </div>

                            {/* Dynamic Native Booking Component Injection */}
                            <div className="p-6 bg-white space-y-5">
                                <div className="flex items-baseline justify-between p-4 rounded-2xl bg-gradient-to-r from-[#174A31]/5 to-[#174A31]/10 border border-[#174A31]/10">
                                    <div className="flex items-center gap-2">
                                        <FaTag className="text-[#174A31] text-sm" />
                                        <span className="text-sm font-medium text-gray-600">Pricing Per Event</span>
                                    </div>
                                    <span className="text-3xl font-black text-[#174A31]">${venue.pricePerEvent}</span>
                                </div>

                                <VenueBookingWidget
                                    venueId={venue._id}
                                    venueName={venue.name}
                                    price={venue.pricePerEvent}
                                />
                            </div>
                        </Card>

                        {/* Quick Info Card */}
                        <Card className="p-6 border border-[#174A31]/10 rounded-3xl bg-gradient-to-br from-[#174A31]/5 to-[#174A31]/10 shadow-lg shadow-[#174A31]/5">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-[#12201B]">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <FaClock className="text-[#174A31] text-sm" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Opening Hours</p>
                                        <p className="text-gray-500 text-xs">Mon - Sun: 9:00 AM - 11:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#12201B]">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <FaCalendarAlt className="text-[#174A31] text-sm" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Best Time to Visit</p>
                                        <p className="text-gray-500 text-xs">Weekends & Holidays</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}