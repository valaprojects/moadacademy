import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "تماس با ما" };
export default function ContactPage() {
  const ways = [
    { icon: Mail, title: "ایمیل", detail: "hello@moad.studio" },
    { icon: MessageCircle, title: "گفت‌وگوی پشتیبانی", detail: "از طریق پنل کاربری" },
    { icon: Clock3, title: "ساعت پاسخ‌گویی", detail: "شنبه تا پنجشنبه، ۹ تا ۱۸" },
    { icon: MapPin, title: "استودیو", detail: "تهران، ایران" },
  ];
  return <div className="page-wrap"><PageIntro eyebrow="با ما حرف بزن" title="سؤال داری؟ ما این طرف صدا هستیم." text="برای پشتیبانی محصول، انتخاب دوره یا پیشنهاد همکاری پیام بده. پاسخ را کوتاه، روشن و انسانی نگه می‌داریم." /><section className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-3">{ways.map(({ icon: Icon, title, detail }) => <div key={title} className="neon-hover flex items-center gap-4 rounded-[20px] border border-black/6 bg-white p-4"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--soft)]"><Icon className="size-5" /></span><div><strong className="block text-xs">{title}</strong><span className="mt-1 block text-[10px] text-[var(--muted)]">{detail}</span></div></div>)}</div><ContactForm /></section></div>;
}
