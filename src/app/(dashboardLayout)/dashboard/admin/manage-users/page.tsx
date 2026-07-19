import { Metadata } from "next";
import { fetchUsers } from "@/lib/api/courses/data";
import ManageUsersClient from "./ManageUsersClient";

export const metadata: Metadata = {
    title: "Manage Users | SkillForge",
    description: "Manage all registered users in SkillForge.",
};

export default async function ManageUsersPage() {
    const users = await fetchUsers();

    return <ManageUsersClient users={users} />;
}