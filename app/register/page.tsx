import type { Metadata } from "next";
import AuthPanel from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "ثبت‌نام",
  description: "ساخت حساب کاربری در موآد استودیو",
};

export default function RegisterPage() {
  return <AuthPanel mode="register" />;
}
