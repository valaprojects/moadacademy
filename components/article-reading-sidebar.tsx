"use client";

import { BookOpen, Check, ChevronDown, CircleDot, ListTree } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileSheetDock from "./mobile-sheet";

export type ArticleSection = { id: string; title: string; group: string };
export type RelatedArticle = { slug: string; title: string; series: string; seriesOrder: number; category: string };

export default function ArticleReadingSidebar({ sections, relatedArticles, currentSlug }: { sections: ArticleSection[]; relatedArticles: RelatedArticle[]; currentSlug: string }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const series = Array.from(new Set(relatedArticles.map((article) => article.series)));
  const [openSeries, setOpenSeries] = useState<string | null>(series[0] ?? null);

  useEffect(() => {
    const elements = sections.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    const updateReadingState = () => {
      const article = document.querySelector<HTMLElement>("[data-reading-article]");
      if (!article) return;
      const start = article.offsetTop;
      const distance = Math.max(1, article.offsetHeight - window.innerHeight);
      setProgress(Math.min(100, Math.max(0, ((window.scrollY - start) / distance) * 100)));
      const readingLine = window.innerHeight * .3;
      const current = elements.reduce<HTMLElement | null>((candidate, element) => element.getBoundingClientRect().top <= readingLine ? element : candidate, elements[0] ?? null);
      if (current) setActiveId(current.id);
    };
    updateReadingState();
    window.addEventListener("scroll", updateReadingState, { passive: true });
    window.addEventListener("resize", updateReadingState);
    return () => { window.removeEventListener("scroll", updateReadingState); window.removeEventListener("resize", updateReadingState); };
  }, [sections]);

  const goTo = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === activeId));

  const relatedCard = (
    <section className="overflow-hidden rounded-[24px] border border-black/6 bg-[var(--card)] p-3 shadow-[0_16px_45px_rgba(17,22,14,.05)] sm:rounded-[26px] sm:p-4">
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className="grid size-10 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><BookOpen className="size-4" /></span>
        <div><span className="block text-[9px] font-bold text-[#6c9538]">آموزش‌های مرتبط</span><h2 className="mt-0.5 text-sm font-black">فصل‌های آموزش</h2></div>
      </div>
      <p className="mb-4 px-1 text-[10px] leading-6 text-[var(--muted)]">این مطلب بخشی از یک مسیر آموزشی متصل است؛ هر فصل صفحه مستقل خودش را دارد.</p>
      <div className="space-y-2">
        {series.map((seriesTitle) => {
          const open = openSeries === seriesTitle;
          const items = relatedArticles.filter((article) => article.series === seriesTitle).sort((a, b) => a.seriesOrder - b.seriesOrder);
          return (
            <section key={seriesTitle} className={`overflow-hidden rounded-2xl bg-[var(--soft)] transition ${open ? "ring-1 ring-[#8bb846]/25" : ""}`}>
              <button type="button" aria-expanded={open} onClick={() => setOpenSeries(open ? null : seriesTitle)} className="flex w-full items-center justify-between gap-3 px-3 py-3 text-right text-[10px] font-black">
                <span>{seriesTitle}</span><span className="mr-auto text-[8px] font-bold text-[var(--muted)]">{items.length.toLocaleString("fa-IR")} فصل</span><ChevronDown className={`size-3.5 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .22 }} className="overflow-hidden">
                    <div className="space-y-1 border-t border-black/5 p-2">
                      {items.map((article) => {
                        const current = article.slug === currentSlug;
                        return (
                          <Link key={article.slug} href={`/blog/${article.slug}`} aria-current={current ? "page" : undefined} className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-right transition ${current ? "bg-[var(--acid)] text-[var(--ink)]" : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"}`}>
                            <span className={`grid size-6 shrink-0 place-items-center rounded-lg text-[8px] font-black ${current ? "bg-black/10" : "bg-[var(--card)]"}`}>{article.seriesOrder.toLocaleString("fa-IR")}</span>
                            <span className="min-w-0"><strong className="block text-[9px] leading-5">{article.title}</strong><small className={`mt-0.5 block text-[8px] ${current ? "text-black/50" : "text-[var(--muted)]"}`}>{article.category}</small></span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </section>
  );

  const progressCard = (
    <section className="rounded-[24px] border border-black/6 bg-[var(--card)] p-3 shadow-[0_16px_45px_rgba(17,22,14,.05)] sm:rounded-[26px] sm:p-4">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><ListTree className="size-4 text-[#668d34]" /><h2 className="text-xs font-black">مسیر مطالعه</h2></div><strong className="text-[10px] text-[#668d34]">٪{Math.round(progress).toLocaleString("fa-IR")}</strong></div>
      <div className="my-4 h-1.5 overflow-hidden rounded-full bg-[var(--soft)]"><div className="h-full rounded-full bg-[var(--acid)] shadow-[0_0_14px_rgba(186,244,81,.45)] transition-[width] duration-200" style={{ width: `${progress}%` }} /></div>
      <div className="space-y-1">
        {sections.map((section, index) => {
          const active = section.id === activeId;
          const passed = index < activeIndex;
          return (
            <button key={section.id} type="button" onClick={() => goTo(section.id)} aria-current={active ? "location" : undefined} className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-right transition ${active ? "bg-[var(--soft)] text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--soft)]"}`}>
              <span className={`grid size-5 shrink-0 place-items-center rounded-full border transition ${active ? "border-[var(--acid)] bg-[var(--acid)] text-[var(--ink)] shadow-[0_0_12px_rgba(186,244,81,.3)]" : passed ? "border-[#7fa843]/30 bg-[#7fa843]/10 text-[#6d9439]" : "border-black/10"}`}>{passed ? <Check className="size-3" /> : active ? <CircleDot className="size-3" /> : <span className="size-1 rounded-full bg-current opacity-35" />}</span>
              <span className="text-[9px] font-bold leading-5">{section.title}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl bg-[var(--soft)] px-3 py-3 text-[9px] leading-5 text-[var(--muted)]">بخش {Math.min(activeIndex + 1, sections.length).toLocaleString("fa-IR")} از {sections.length.toLocaleString("fa-IR")}</div>
    </section>
  );

  return (
    <>
      <aside className="hidden space-y-4 lg:sticky lg:top-24 lg:block">
        {relatedCard}
        {progressCard}
      </aside>
      <MobileSheetDock
        items={[
          { id: "related", label: "فصل‌ها", title: "فصل‌های آموزش", icon: BookOpen, content: relatedCard },
          { id: "progress", label: "مسیر مطالعه", title: "مسیر مطالعه", icon: ListTree, content: progressCard },
        ]}
      />
    </>
  );
}
