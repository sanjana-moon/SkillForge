import Link from "next/link";

import {
    Button,
    Card,
    CardFooter,
    CardHeader,
} from "@heroui/react";

import {
    FaArrowRight,
    FaCheckCircle,
    FaCalendarAlt,
    FaUsers,
    FaMapMarkerAlt,
} from "react-icons/fa";

import { stripe } from "@/lib/stripe";
import { baseURL } from "@/lib/api/baseUrl";

export default async function PaymentSuccess({
    searchParams,
}: {
    searchParams: Promise<{
        session_id: string;
    }>;
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error("Please provide a valid session_id");
    }

    const session = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["payment_intent"],
        }
    );

    // Fix TypeScript issue
    const transactionId =
        typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? "";

    const paymentData = {
        venueId: session.metadata?.venueId,
        venueName: session.metadata?.venueName,
        bookingDate: session.metadata?.bookingDate,
        guestCount: Number(session.metadata?.guestCount),
        email: session.metadata?.email,
        amount: Number(session.metadata?.totalAmount),
        paymentType: session.metadata?.paymentType,
        transactionId,
        paymentStatus: session.payment_status,
    };

    try {
        const res = await fetch(
            `${baseURL}/api/bookings`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(paymentData),
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error(
                "Booking API Error:",
                await res.text()
            );
        }
    } catch (error) {
        console.error(
            "Failed to save booking:",
            error
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6 py-16">

            <Card className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#D4AF37]/20 shadow-2xl">

                {/* Header */}

                <CardHeader className="flex flex-col items-center justify-center gap-5 bg-linear-to-br from-[#0A2F1D] to-[#174A31] py-12">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white">
                        <FaCheckCircle
                            size={58}
                            className="text-green-600"
                        />
                    </div>

                    <div className="text-center">
                        <h1 className="text-4xl font-black text-white">
                            Booking Confirmed
                        </h1>

                        <p className="mt-2 text-white/80">
                            Thank you for booking with DreamVenue.
                        </p>
                    </div>

                </CardHeader>

                <div className="p-8">
                    <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#FCFBF8] p-8">
                        <h2 className="mb-8 text-2xl font-bold text-[#0A2F1D]">
                            Booking Details
                        </h2>

                        <div className="space-y-6">

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-[#D4AF37]" />

                                    <span className="text-[#12201B]/60">
                                        Venue
                                    </span>
                                </div>
                                <span className="font-semibold text-[#0A2F1D]">
                                    {session.metadata?.venueName}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-[#D4AF37]" />

                                    <span className="text-[#12201B]/60">
                                        Event Date
                                    </span>
                                </div>

                                <span className="font-semibold text-[#0A2F1D]">
                                    {session.metadata?.bookingDate}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <div className="flex items-center gap-3">
                                    <FaUsers className="text-[#D4AF37]" />

                                    <span className="text-[#12201B]/60">
                                        Guests
                                    </span>
                                </div>

                                <span className="font-semibold text-[#0A2F1D]">
                                    {session.metadata?.guestCount}
                                </span>

                            </div>
                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <span className="text-[#12201B]/60">
                                    Customer Email
                                </span>

                                <span className="font-semibold text-[#0A2F1D] break-all">
                                    {session.customer_email}
                                </span>

                            </div>
                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">
                                <span className="text-[#12201B]/60">
                                    Transaction ID
                                </span>
                                <span className="max-w-60 truncate font-semibold text-[#1E6B4F]">
                                    {transactionId}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">
                                <span className="text-[#12201B]/60">
                                    Payment Status
                                </span>

                                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold capitalize text-green-700">
                                    {session.payment_status}
                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-lg font-semibold text-[#12201B]">
                                    Total Paid
                                </span>

                                <span className="text-3xl font-black text-[#D4AF37]">
                                    ${session.metadata?.totalAmount}
                                </span>

                            </div>

                        </div>

                    </div>

                    <CardFooter className="flex flex-col items-center justify-center gap-4 pt-10 sm:flex-row">

                        <Link
                            href="/dashboard/customer/bookings"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                className="w-full rounded-xl bg-[#0A2F1D] font-semibold text-white hover:bg-[#1E6B4F]"
                            >
                                View My Bookings
                            </Button>
                        </Link>

                        <Link
                            href="/venues"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                className="w-full rounded-xl border-[#D4AF37] text-[#0A2F1D]"
                            >
                                Browse More Venues
                            </Button>
                        </Link>

                    </CardFooter>
                </div>
            </Card>
        </div>
    );
}