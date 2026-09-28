import { Suspense } from "react";
import type { Metadata } from "next";
import SignUpPage from "@/components/signupPage";

export const metadata: Metadata = {
    title: "Signup | SkillForge",
    description:
        "Create your SkillForge account and start learning or teaching today.",
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <SignUpPage />
        </Suspense>
    );
}