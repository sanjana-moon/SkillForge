import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/api/session";
import { getMentorSessions } from "@/lib/api/courses/data";
import AIMentorClient from "./AIMentorClient";

export const metadata: Metadata = {
    title: "AI Mentor | SkillForge",
    description: "Get personalized learning guidance from your AI Mentor.",
};

export default async function AIMentorPage() {
    const session = await getSession();

    if (!session) {
        redirect("/signin");
    }

    const sessions = await getMentorSessions();

    return <AIMentorClient initialSessions={sessions} />;
}