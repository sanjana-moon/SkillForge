import { fetchAdminDashboard } from "@/lib/api/courses/data";
import AdminDashboardClient from "./AdminDashboardClient";

const AdminDashboardPage = async () => {
  const dashboard = await fetchAdminDashboard();

  return <AdminDashboardClient dashboard={dashboard} />;
};

export default AdminDashboardPage;