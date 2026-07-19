import Link from "next/link";
import { redirect } from "next/navigation";

import {
    Button,
    Card,
    CardFooter,
    CardHeader,
} from "@heroui/react";

import {
    FaArrowRight,
    FaCheckCircle,
    FaBook,
    FaGraduationCap,
    FaClock,
    FaUser,
} from "react-icons/fa";

import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/api/session";
import { processCheckout } from "@/lib/api/courses/actions";

export default async function PaymentSuccess({
    searchParams,
}: {
    searchParams: Promise<{
        session_id: string;
        courseId?: string;
    }>;
}) {
    const { session_id, courseId } = await searchParams;

    if (!session_id) {
        throw new Error("Please provide a valid session_id");
    }

    // Get user session
    const session = await getSession();
    if (!session) {
        redirect("/signin");
    }

    // Retrieve Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["payment_intent"],
        }
    );

    // Fix TypeScript issue
    const transactionId =
        typeof stripeSession.payment_intent === "string"
            ? stripeSession.payment_intent
            : stripeSession.payment_intent?.id ?? "";

    // ✅ Call processCheckout from actions.ts
    const result = await processCheckout({
        courseId: courseId || stripeSession.metadata?.courseId || "",
        transactionId: transactionId,
        paymentStatus: "paid",
    });

    if (!result.success) {
        console.error("Checkout failed:", result.error);
    } else {
        console.log("✅ Enrollment and payment saved successfully");
    }

    const paymentData = {
        courseId: courseId || stripeSession.metadata?.courseId,
        courseTitle: stripeSession.metadata?.courseTitle || "Course",
        amount: Number(stripeSession.metadata?.amount) || 0,
        studentEmail: stripeSession.metadata?.studentEmail || session.user.email,
        studentName: stripeSession.metadata?.studentName || session.user.name,
        startDate: stripeSession.metadata?.startDate || "",
        note: stripeSession.metadata?.note || "",
    };

    return (
        <div className="min-h-screen bg-[#10182B] flex items-center justify-center px-6 py-16">

            <Card className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#A78BFA]/20 shadow-2xl bg-[#1C2740]">

                {/* Header */}
                <CardHeader className="flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#10182B] to-[#1C2740] py-12 border-b border-[#A78BFA]/20">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 border-4 border-green-500/30">
                        <FaCheckCircle
                            size={58}
                            className="text-green-400"
                        />
                    </div>

                    <div className="text-center">
                        <h1 className="text-4xl font-black text-[#EDEFF5]">
                            Enrollment Confirmed! 🎉
                        </h1>

                        <p className="mt-2 text-[#EDEFF5]/60">
                            You are now enrolled in the course.
                        </p>
                    </div>

                </CardHeader>

                <div className="p-8">
                    <div className="rounded-3xl border border-[#A78BFA]/20 bg-[#10182B] p-8">
                        <h2 className="mb-8 text-2xl font-bold text-[#EDEFF5]">
                            Enrollment Details
                        </h2>

                        <div className="space-y-6">

                            {/* Course Name */}
                            <div className="flex items-center justify-between border-b border-[#A78BFA]/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <FaBook className="text-[#A78BFA]" />
                                    <span className="text-[#EDEFF5]/60">
                                        Course
                                    </span>
                                </div>
                                <span className="font-semibold text-[#EDEFF5]">
                                    {paymentData.courseTitle}
                                </span>
                            </div>

                            {/* Amount Paid */}
                            <div className="flex items-center justify-between border-b border-[#A78BFA]/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <FaGraduationCap className="text-[#A78BFA]" />
                                    <span className="text-[#EDEFF5]/60">
                                        Amount Paid
                                    </span>
                                </div>
                                <span className="font-semibold text-[#A78BFA] text-xl">
                                    ${paymentData.amount.toFixed(2)}
                                </span>
                            </div>

                            {/* Start Date */}
                            {paymentData.startDate && (
                                <div className="flex items-center justify-between border-b border-[#A78BFA]/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <FaClock className="text-[#A78BFA]" />
                                        <span className="text-[#EDEFF5]/60">
                                            Start Date
                                        </span>
                                    </div>
                                    <span className="font-semibold text-[#EDEFF5]">
                                        {new Date(paymentData.startDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                            )}

                            {/* Student Email */}
                            <div className="flex items-center justify-between border-b border-[#A78BFA]/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-[#A78BFA]" />
                                    <span className="text-[#EDEFF5]/60">
                                        Student Email
                                    </span>
                                </div>
                                <span className="font-semibold text-[#EDEFF5] break-all">
                                    {paymentData.studentEmail}
                                </span>
                            </div>

                            {/* Transaction ID */}
                            <div className="flex items-center justify-between border-b border-[#A78BFA]/10 pb-4">
                                <span className="text-[#EDEFF5]/60">
                                    Transaction ID
                                </span>
                                <span className="max-w-60 truncate font-semibold text-[#A78BFA]">
                                    {transactionId}
                                </span>
                            </div>

                            {/* Payment Status */}
                            <div className="flex items-center justify-between border-b border-[#A78BFA]/10 pb-4">
                                <span className="text-[#EDEFF5]/60">
                                    Payment Status
                                </span>
                                <span className="rounded-full bg-green-500/20 px-4 py-1 text-sm font-semibold capitalize text-green-400 border border-green-500/30">
                                    {stripeSession.payment_status}
                                </span>
                            </div>

                            {/* Total Paid */}
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-lg font-semibold text-[#EDEFF5]">
                                    Total Paid
                                </span>
                                <span className="text-3xl font-black text-[#A78BFA]">
                                    ${paymentData.amount.toFixed(2)}
                                </span>
                            </div>

                            {/* Note */}
                            {paymentData.note && (
                                <div className="border-t border-[#A78BFA]/10 pt-4 mt-4">
                                    <p className="text-sm text-[#EDEFF5]/40">
                                        <span className="font-medium text-[#EDEFF5]/60">Note:</span> {paymentData.note}
                                    </p>
                                </div>
                            )}

                        </div>

                    </div>

                    <CardFooter className="flex flex-col items-center justify-center gap-4 pt-10 sm:flex-row">

                        <Link
                            href={`/courses/${paymentData.courseId}`}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                className="w-full rounded-xl bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                            >
                                <FaArrowRight className="mr-2" />
                                Go to Course
                            </Button>
                        </Link>

                        <Link
                            href="/dashboard/student"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                className="w-full rounded-xl border border-[#A78BFA]/30 text-[#EDEFF5] hover:bg-[#A78BFA]/10"
                            >
                                <FaGraduationCap className="mr-2" />
                                My Dashboard
                            </Button>
                        </Link>

                    </CardFooter>
                </div>
            </Card>
        </div>
    );
}