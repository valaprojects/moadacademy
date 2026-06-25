import type { Metadata } from "next";
import AuthPanel from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "ورود / ثبت‌نام",
  description: "ورود به حساب کاربری موآد استودیو",
};

export default function LoginPage() {
  return <AuthPanel mode="login" />;
}
