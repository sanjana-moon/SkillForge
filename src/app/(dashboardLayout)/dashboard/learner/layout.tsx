import { ReactNode } from "react";
import { roleValidator } from "@/lib/api/session";

interface LearnerLayoutProps {
    children: ReactNode;
}

const LearnerLayout = async ({
    children,
}: LearnerLayoutProps) => {
    await roleValidator("student");

    return <>{children}</>;
};

export default LearnerLayout;