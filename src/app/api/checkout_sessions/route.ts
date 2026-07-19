import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

import { getUser } from "@/lib/api/session";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin") || "";

        const body = await req.json();

        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const {
            type,
            courseId,
            courseTitle,
            amount,
            transactionId,
            studentEmail,
            studentName,
            startDate,
            note,
        } = body;

        // Validate required fields
        if (!courseId || !courseTitle || !amount) {
            return NextResponse.json(
                {
                    error: "Missing required course information.",
                },
                {
                    status: 400,
                }
            );
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer_email: studentEmail || user.email,
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(Number(amount) * 100),
                        product_data: {
                            name: courseTitle,
                            description: `Enrollment in ${courseTitle}`,
                            metadata: {
                                courseId,
                                transactionId,
                            },
                        },
                    },
                },
            ],
            metadata: {
                paymentType: type || "course_enrollment",
                courseId,
                courseTitle,
                transactionId: transactionId || "",
                studentEmail: studentEmail || user.email,
                studentName: studentName || user.name || "",
                startDate: startDate || "",
                note: note || "",
                userId: user.id || "",
            },
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
            cancel_url: `${origin}/courses/${courseId}`,
        });

        return NextResponse.json({
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        console.error("Stripe Error:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
}