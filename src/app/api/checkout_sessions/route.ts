// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import Stripe from "stripe";

// import { getUser } from "@/lib/api/session";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(req: Request) {
//     try {
//         const headersList = await headers();
//         const origin = headersList.get("origin") || "";

//         const body = await req.json();

//         const user = await getUser();

//         if (!user) {
//             return NextResponse.json(
//                 {
//                     error: "Unauthorized",
//                 },
//                 {
//                     status: 401,
//                 }
//             );
//         }

//         const {
//             venueId,
//             venueName,
//             bookingDate,
//             guests: guestCount,
//             amount: totalAmount,
//         } = body;

//         if (
//             !venueId ||
//             !venueName ||
//             !bookingDate ||
//             !guestCount ||
//             !totalAmount
//         ) {
//             return NextResponse.json(
//                 {
//                     error: "Missing required booking information.",
//                 },
//                 {
//                     status: 400,
//                 }
//             );
//         }

//         const session = await stripe.checkout.sessions.create({
//             customer_email: user.email,
//             payment_method_types: ["card"],
//             mode: "payment",
//             line_items: [
//                 {
//                     quantity: 1,
//                     price_data: {
//                         currency: "bdt",
//                         unit_amount: Math.round(Number(totalAmount) * 100),
//                         product_data: {
//                             name: venueName,
//                             description: `Venue Booking for ${guestCount} Guests`,
//                         },
//                     },
//                 },
//             ],

//             metadata: {
//                 paymentType: "venue_booking",
//                 venueId,
//                 venueName,
//                 bookingDate,
//                 guestCount: guestCount.toString(),
//                 totalAmount: totalAmount.toString(),
//                 userId: user.id,
//                 email: user.email,
//             },

//             success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

//             cancel_url: `${origin}/venues/${venueId}`,
//         });

//         return NextResponse.json({
//             url: session.url,
//         });
//     } catch (error) {
//         console.error("Stripe Error:", error);

//         return NextResponse.json(
//             {
//                 error:
//                     error instanceof Error
//                         ? error.message
//                         : "Something went wrong.",
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }