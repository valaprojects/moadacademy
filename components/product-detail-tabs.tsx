"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileText, ListMusic, MessageCircle, Send, Star } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";

type TabId = "description" | "curriculum" | "reviews";
type Review = { id: number; name: string; text: string; rating: number; date: string };

const tabs = [
  { id: "description" as const, label: "توضیحات", icon: FileText },
  { id: "curriculum" as const, label: "سرفصل‌های دوره", icon: ListMusic },
  { id: "reviews" as const, label: "نظرات", icon: MessageCircle },
];

const initialReviews: Review[] = [
  { id: 1, name: "آرمان نادری", text: "چیدمان فایل‌ها خیلی مرتب بود و سریع توانستم از صداها داخل پروژه استفاده کنم.", rating: 5, date: "۱۲ خرداد ۱۴۰۵" },
  { id: 2, name: "کیان رستمی", text: "تنوع صداها خوب است و توضیحات هر بخش برای شروع کاملاً کافی بود.", rating: 4, date: "۲۸ اردیبهشت ۱۴۰۵" },
];

export default function ProductDetailTabs({ description, tags, includes }: { description: string; tags: string[]; includes: string[] }) {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const direction = event.key === "ArrowLeft" ? 1 : -1;
    const nextTab = tabs[(currentIndex + direction + tabs.length) % tabs.length];
    setActiveTab(nextTab.id);
    document.getElementById(`product-tab-${nextTab.id}`)?.focus();
  };

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const text = String(form.get("review") || "").trim();
    if (!name || !text) return;
    setReviews((current) => [{ id: Date.now(), name, text, rating, date: "همین حالا" }, ...current]);
    event.currentTarget.reset();
    setRating(5);
    setSubmitted(true);
  };

  return (
    <section className="overflow-hidden rounded-[30px] border border-black/6 bg-white shadow-[0_18px_60px_rgba(17,22,14,.05)]">
      <div className="border-b border-black/6 p-3 sm:p-4">
        <div role="tablist" aria-label="اطلاعات محصول" onKeyDown={handleKeyboard} className="flex gap-2 overflow-x-auto rounded-[22px] bg-[var(--soft)] p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            const Icon = tab.icon;
            return (
              <button key={tab.id} id={`product-tab-${tab.id}`} type="button" role="tab" aria-selected={active} aria-controls={`product-panel-${tab.id}`} tabIndex={active ? 0 : -1} onClick={() => setActiveTab(tab.id)} className={`relative flex min-w-max flex-1 items-center justify-center gap-2 rounded-[17px] px-5 py-3 text-[11px] font-black transition-colors sm:py-3.5 ${active ? "text-[var(--ink)]" : "text-[var(--muted)] hover:bg-white/45 hover:text-[var(--foreground)]"}`}>
                {active && <motion.span layoutId="active-product-tab" className="absolute inset-0 rounded-[17px] bg-[var(--acid)] shadow-[0_8px_24px_rgba(122,170,58,.18)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <Icon className="relative size-4" /><span className="relative">{tab.label}</span>
                {tab.id === "reviews" && <span className={`relative rounded-full px-1.5 py-0.5 text-[8px] ${active ? "bg-black/10" : "bg-black/5"}`}>{reviews.length.toLocaleString("fa-IR")}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={activeTab} id={`product-panel-${activeTab}`} role="tabpanel" aria-labelledby={`product-tab-${activeTab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }} className="p-6 sm:p-8">
          {activeTab === "description" && (
            <div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
              <div><span className="eyebrow">درباره این محصول</span><h2 className="text-2xl font-black">داخل این مجموعه چه چیزهایی است؟</h2><p className="mt-4 text-sm leading-8 text-[var(--muted)]">{description} تمام فایل‌ها نام‌گذاری و دسته‌بندی شده‌اند تا بدون اتلاف وقت مستقیماً وارد پروژه شوند.</p><div className="mt-6 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-[var(--soft)] px-3 py-2 text-[10px] font-bold">{tag}</span>)}</div></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{includes.map((item) => <div key={item} className="flex min-h-20 items-center gap-3 rounded-2xl bg-[var(--soft)] p-4 text-[10px] font-bold"><CheckCircle2 className="size-5 shrink-0 text-[#729a3b]" />{item}</div>)}</div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div><span className="eyebrow">مسیر یادگیری</span><div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-black">سرفصل‌های این دوره</h2><p className="mt-2 text-xs leading-7 text-[var(--muted)]">جلسه‌ها به‌ترتیب چیده شده‌اند تا قدم‌به‌قدم از شناخت محصول به اجرای یک پروژه واقعی برسی.</p></div><span className="w-fit rounded-full bg-[var(--soft)] px-3 py-2 text-[10px] font-bold text-[var(--muted)]">{includes.length.toLocaleString("fa-IR")} فصل کاربردی</span></div>
              <div className="grid gap-3 sm:grid-cols-2">{includes.map((item, index) => <div key={item} className="group flex items-center gap-4 rounded-[20px] border border-black/6 bg-[var(--soft)] p-4 transition hover:border-[#8dbb49]/35 hover:bg-[var(--card)]"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--card)] text-xs font-black text-[#648a31] transition group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)]">{(index + 1).toLocaleString("fa-IR")}</span><div><strong className="text-xs">{item}</strong><span className="mt-1 block text-[9px] text-[var(--muted)]">ویدئو، تمرین و فایل‌های همراه</span></div></div>)}</div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
              <form onSubmit={submitReview} className="rounded-[24px] bg-[var(--soft)] p-5 sm:p-6"><h2 className="text-lg font-black">نظر خودت را ثبت کن</h2><p className="mt-2 text-[10px] leading-6 text-[var(--muted)]">تجربه تو به انتخاب بهتر هنرمندان دیگر کمک می‌کند.</p><label className="mt-5 block text-[10px] font-bold">نام و نام خانوادگی<input name="name" required className="form-input mt-2" placeholder="نام شما" /></label><div className="mt-4"><span className="block text-[10px] font-bold">امتیاز شما</span><div className="mt-2 flex gap-1" dir="ltr">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" aria-label={`${value.toLocaleString("fa-IR")} ستاره`} aria-pressed={value <= rating} onClick={() => setRating(value)} className="grid size-9 place-items-center rounded-xl bg-[var(--card)] transition hover:-translate-y-0.5"><Star className={`size-4 ${value <= rating ? "fill-[var(--acid)] text-[#749f37]" : "text-[var(--muted)]/40"}`} /></button>)}</div></div><label className="mt-4 block text-[10px] font-bold">متن نظر<textarea name="review" required rows={4} className="form-input mt-2 h-auto resize-none py-3 leading-7" placeholder="تجربه‌ات از این محصول را بنویس..." /></label><button type="submit" className="primary-button mt-4 w-full"><Send className="size-4" />ثبت نظر</button>{submitted && <p role="status" className="mt-3 text-center text-[10px] font-bold text-[#648a31]">نظر شما با موفقیت ثبت شد.</p>}</form>
              <div><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-black">نظر هنرجوها</h3><span className="text-[10px] text-[var(--muted)]">{reviews.length.toLocaleString("fa-IR")} دیدگاه</span></div><div className="space-y-3">{reviews.map((review) => <article key={review.id} className="rounded-[22px] border border-black/6 bg-[var(--soft)] p-5"><div className="flex items-start justify-between gap-3"><div><strong className="text-xs">{review.name}</strong><span className="mt-1 block text-[9px] text-[var(--muted)]">{review.date}</span></div><div className="flex" dir="ltr">{[1, 2, 3, 4, 5].map((value) => <Star key={value} className={`size-3 ${value <= review.rating ? "fill-[var(--acid)] text-[#749f37]" : "text-[var(--muted)]/25"}`} />)}</div></div><p className="mt-4 text-xs leading-7 text-[var(--muted)]">{review.text}</p></article>)}</div></div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
