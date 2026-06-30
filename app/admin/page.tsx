import type { Metadata } from "next";
import AdminDashboard from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "پنل مدیریت | موآد آکادمی",
  description: "پنل مدیریت محتوا، محصولات، دوره ها، کاربران، تنظیمات، ارتباطات و گزارشات موآد آکادمی",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
