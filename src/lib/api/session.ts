import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session;
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
};

export const getUser = async () => {
    try {
        const session = await getSession();
        return session?.user || null;
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
};

export const sessionValidator = async () => {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    return session;
};

export const roleValidator = async (
    requiredRole: "admin" | "instructor" | "student"
) => {
    const session = await sessionValidator();

    const userRole = session.user?.role;

    if (userRole !== requiredRole && userRole !== "admin") {
        redirect("/dashboard");
    }

    return session;
};