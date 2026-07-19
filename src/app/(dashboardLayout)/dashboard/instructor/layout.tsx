import { ReactNode } from "react";
import { roleValidator } from "@/lib/api/session";

interface InstructorLayoutProps {
    children: ReactNode;
}

export default async function InstructorLayout({
    children,
}: InstructorLayoutProps) {
    await roleValidator("instructor");

    return children;
}