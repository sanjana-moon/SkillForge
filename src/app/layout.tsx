import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/lib/providers/ReactQueryProviders";
// import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

const cormorant = Cormorant_Garamond({
    variable: "--font-heading",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    style: ["normal", "italic"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "SkillForge AI",
        template: "%s | SkillForge AI",
    },
    description:
        "SkillForge AI is an AI-powered learning platform that creates personalized learning roadmaps, smart recommendations, and AI mentorship to help users achieve their career goals.",
    keywords: [
        "SkillForge AI",
        "AI Learning Platform",
        "Personalized Learning",
        "Gemini AI",
        "Learning Roadmap",
        "AI Mentor",
        "Next.js",
        "TypeScript",
    ],
    authors: [{ name: "Sanjana Moon" }],
    creator: "Sanjana Moon",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${cormorant.variable} ${inter.variable} h-full scroll-smooth`}
        >
            <body className="min-h-screen bg-background text-foreground font-body antialiased">
                {/* ✅ React Query Provider must wrap everything that uses React Query */}
                <ReactQueryProvider>
                    <ToastContainer />
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    );
}