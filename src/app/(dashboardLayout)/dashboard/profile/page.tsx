import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/api/session";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
    title: "My Profile | SkillForge",
    description: "Manage your SkillForge profile",
};

export default async function Page() {
    const session = await getSession();
    
    if (!session) {
        redirect("/signin");
    }

    return <ProfilePage />;
}