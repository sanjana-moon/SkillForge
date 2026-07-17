import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
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
      className={`${fraunces.variable} ${manrope.variable} h-full scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        <ToastContainer/>
        {children}
      </body>
    </html>
  );
}