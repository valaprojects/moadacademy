import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "تماس با ما" };
export default function ContactPage() { return <div className="page-wrap"><PageIntro eyebrow="LET'S TALK" title="سؤال داری؟ ما این طرف صدا هستیم." text="برای پشتیبانی محصول، انتخاب دوره یا پیشنهاد همکاری پیام بده. پاسخ را کوتاه، روشن و انسانی نگه می‌داریم." /><section className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-3">{[{ icon: Mail, t: "ایمیل", d: "hello@moadacademy.ir" }, { icon: MessageCircle, t: "گفت‌وگوی پشتیبانی", d: "از طریق پنل کاربری" }, { icon: Clock3, t: "ساعت پاسخ‌گویی", d: "شنبه تا پنجشنبه، ۹ تا ۱۸" }, { icon: MapPin, t: "استودیو", d: "تهران، ایران" }].map(({ icon: Icon, t, d }) => <div key={t} className="flex items-center gap-4 rounded-[20px] border border-black/6 bg-white p-4"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--soft)]"><Icon className="size-5" /></span><div><strong className="block text-xs">{t}</strong><span className="mt-1 block text-[10px] text-[var(--muted)]">{d}</span></div></div>)}</div><ContactForm /></section></div>; }

