import type { Metadata } from "next";
import AuthPanel from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "ورود / ثبت‌نام",
  description: "ورود یا ساخت حساب کاربری موآد آکادمی با ایمیل و کد تایید",
};

export default function LoginPage() {
  return <AuthPanel />;
}
