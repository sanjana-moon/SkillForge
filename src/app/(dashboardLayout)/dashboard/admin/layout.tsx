import { ReactNode } from "react";
import { roleValidator } from "@/lib/api/session";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({
  children,
}: AdminLayoutProps) => {
  await roleValidator("admin");

  return <>{children}</>;
};

export default AdminLayout;