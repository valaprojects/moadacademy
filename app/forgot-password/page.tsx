import type { Metadata } from "next";
import AuthPanel from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "فراموشی رمز عبور",
  description: "بازیابی رمز عبور حساب کاربری موآد استودیو",
};

export default function ForgotPasswordPage() {
  return <AuthPanel mode="forgot" />;
}
