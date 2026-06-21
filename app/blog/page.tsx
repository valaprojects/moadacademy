import type { Metadata } from "next";
import { AudioLines, BookOpen, Home, Lightbulb, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ArticleCards, Newsletter, PageIntro, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "مجله موآد",
  description: "یادداشت‌ها و آموزش‌های کوتاه درباره تولید موسیقی، میکس و خلاقیت",
};

const categories = [
  { title: "تکنیک تولید", icon: SlidersHorizontal },
  { title: "خلاقیت", icon: Lightbulb },
  { title: "استودیو", icon: Home },
  { title: "صدا و سمپل", icon: AudioLines },
];

export default function BlogPage() {
  return (
    <div className="page-wrap">
      <PageIntro
        eyebrow="مجله موآد"
        title="برای گوش‌هایی که دقیق‌تر می‌شنوند."
        text="تکنیک‌ها، تجربه‌ها و سؤال‌هایی درباره ساخت موسیقی؛ کوتاه، شفاف و قابل استفاده در همان پروژه‌ای که باز مانده است."
      />
      <section className="section-space mt-14">
        <SectionTitle eyebrow="تازه‌ترین یادداشت‌ها" title="از اتاق کنترل تا لحظه‌ی انتشار." />
        <div className="grid items-start gap-5 lg:grid-cols-[1fr_250px]">
          <div><ArticleCards /></div>
          <aside className="rounded-[26px] border border-black/6 bg-[var(--card)] p-4 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center gap-2 px-2">
              <BookOpen className="size-4 text-[#6b9438]" />
              <h2 className="text-sm font-black">دسته‌بندی مطالب</h2>
            </div>
            <div className="space-y-2">
              {categories.map(({ title, icon: Icon }, index) => (
                <Link key={title} href={`/blog?category=${index + 1}`} className="group flex items-center justify-between rounded-2xl bg-[var(--soft)] p-3 text-xs font-bold transition hover:bg-[var(--acid)] hover:text-[var(--ink)] hover:shadow-[0_0_22px_rgba(186,244,81,.18)]">
                  <span className="flex items-center gap-2"><Icon className="size-4 transition-transform group-hover:scale-110" />{title}</span>
                  <span className="text-[9px] opacity-45">{(index + 3).toLocaleString("fa-IR")} مطلب</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <div className="section-space"><Newsletter /></div>
    </div>
  );
}
