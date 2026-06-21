import type { Metadata } from "next";
import FaqList from "@/components/faq-list";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "سوالات متداول" };
export default function FaqPage() { return <div className="page-wrap"><PageIntro eyebrow="سؤال‌های پرتکرار" title="احتمالاً جواب همین‌جاست." text="پاسخ پرسش‌های رایج درباره دانلود، مجوز استفاده، دوره‌ها و پشتیبانی. اگر سؤال تو نبود، مستقیم برایمان بنویس." /><FaqList /></div>; }

