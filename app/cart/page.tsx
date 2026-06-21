import type { Metadata } from "next";
import CartContent from "@/components/cart-content";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "سبد خرید" };
export default function CartPage() { return <div className="page-wrap"><PageIntro eyebrow="YOUR CART" title="صداهای انتخاب‌شده، آماده‌ی ساختن." text="محصولاتت را مرور کن و بعد از پرداخت، بدون انتظار دانلودشان کن." /><CartContent /></div>; }
