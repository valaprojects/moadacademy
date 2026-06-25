import {
  ArrowLeft,
  AudioLines,
  BookOpen,
  Clock3,
  Drum,
  Headphones,
  Layers3,
  Mic2,
  Music2,
  Piano,
  Play,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { articles, categories, courses, getCourseCategory } from "@/lib/data";
import { Reveal } from "./motion";

export function SectionTitle({ eyebrow, title, text, href, linkLabel = "مشاهده همه" }: { eyebrow?: string; title: string; text?: string; href?: string; linkLabel?: string }) {
  return <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div>{eyebrow && <span className="eyebrow"><Sparkles className="size-3" />{eyebrow}</span>}<h2 className="max-w-2xl text-2xl font-black leading-[1.5] tracking-[-.04em] sm:text-3xl">{title}</h2>{text && <p className="mt-2 max-w-xl text-xs leading-7 text-[var(--muted)] sm:text-sm">{text}</p>}</div>{href && <Link href={href} className="flex w-fit items-center gap-2 text-xs font-extrabold text-[#527927] transition hover:gap-3">{linkLabel}<ArrowLeft className="size-4" /></Link>}</div>;
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <Reveal><section className="relative mt-5 overflow-hidden rounded-[30px] bg-[var(--ink)] px-5 py-10 text-white sm:mt-7 sm:rounded-[34px] sm:px-10 sm:py-16"><div className="hero-grid absolute inset-0 opacity-40" /><div className="absolute -left-24 -top-24 size-80 rounded-full bg-[var(--acid)]/15 blur-3xl" /><div className="relative max-w-3xl"><span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-[var(--acid)] sm:mb-5">{eyebrow}</span><h1 className="text-3xl font-black leading-[1.45] tracking-[-.05em] sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-white/55 sm:mt-5 sm:text-base">{text}</p></div></section></Reveal>;
}

const categoryIcons = { drum: Drum, piano: Piano, mic: Mic2, wave: AudioLines };
export function CategoryGrid() {
  return <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">{categories.map((item, index) => { const Icon = categoryIcons[item.icon as keyof typeof categoryIcons]; return <Reveal key={item.title} delay={index * .05}><Link href="/shop" className="neon-hover group flex aspect-square flex-col justify-between overflow-hidden rounded-[20px] border border-black/6 bg-white p-4 sm:aspect-auto sm:min-h-40 sm:rounded-[24px] sm:p-5"><div className="flex items-start justify-between"><span className="grid size-10 place-items-center rounded-2xl bg-[var(--soft)] transition duration-300 group-hover:rotate-3 group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)] group-hover:shadow-[0_0_24px_rgba(186,244,81,.4)] sm:size-12"><Icon className="size-4 transition-transform duration-300 group-hover:scale-110 sm:size-5" /></span><ArrowLeft className="size-3.5 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:text-[#668d32] group-hover:opacity-100 sm:size-4" /></div><div><h3 className="text-xs font-black leading-6 sm:text-sm">{item.title}</h3><p className="mt-0.5 text-[9px] text-[var(--muted)] sm:mt-1 sm:text-[10px]">{item.subtitle}</p></div></Link></Reveal>; })}</div>;
}

export function CourseCard({ course, index = 0 }: { course: (typeof courses)[number]; index?: number }) {
  const category = getCourseCategory(course.category);
  return <Reveal delay={index * .07}><article className="neon-hover group relative overflow-hidden rounded-[28px] border border-black/6 bg-white p-2"><Link href={`/courses/${course.slug}`} aria-label={`شروع دوره ${course.title}`} className="absolute inset-0 z-10 rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7faa3e]" /><div className="relative min-h-56 overflow-hidden rounded-[22px] bg-[var(--ink)] p-5 text-white"><div className="hero-grid absolute inset-0 opacity-30" /><div className="absolute -left-12 -top-12 size-40 rounded-full blur-3xl" style={{ background: `${course.accent}35` }} /><div className="relative flex h-full min-h-46 flex-col"><div className="flex items-center justify-between gap-3"><div className="flex flex-wrap gap-1.5"><span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] text-white/50">{course.level}</span>{category && <span className="rounded-full px-3 py-1.5 text-[9px] font-bold text-[var(--ink)]" style={{ background: course.accent }}>{category.title}</span>}</div><Layers3 className="size-5 shrink-0" style={{ color: course.accent }} /></div><h3 className="mt-auto max-w-[260px] text-xl font-black leading-8">{course.title}</h3><div className="mt-4 flex gap-4 text-[10px] text-white/45"><span>{course.lessons.toLocaleString("fa-IR")} قسمت</span><span>{course.duration}</span></div></div></div><div className="flex items-center justify-between p-4"><div><span className="block text-[9px] text-[var(--muted)]">هزینه شرکت در دوره</span><strong className="text-sm text-[#5f8d2b]">رایگان</strong></div><span className="grid size-11 place-items-center rounded-full bg-[var(--acid)] text-[var(--ink)] transition group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(186,244,81,.4)]"><Play className="mr-0.5 size-4" fill="currentColor" /></span></div></article></Reveal>;
}

export function ArticleCards() {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{articles.map((article, index) => <Reveal key={article.slug} delay={index * .06}><article className="neon-hover group relative h-full rounded-[24px] border border-black/6 bg-white p-5"><Link href={`/blog/${article.slug}`} aria-label={`مطالعه ${article.title}`} className="absolute inset-0 z-10 rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7faa3e]" /><div className="mb-8 flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--soft)] text-[#5c7b35]"><BookOpen className="size-5" /></span><span className="flex items-center gap-1 text-[9px] text-[var(--muted)]"><Clock3 className="size-3" />{article.readTime}</span></div><span className="text-[9px] font-bold text-[#69943b]">{article.category}</span><h3 className="mt-2 text-base font-black leading-7 transition group-hover:text-[#527927]">{article.title}</h3><p className="mt-3 text-[11px] leading-6 text-[var(--muted)]">{article.excerpt}</p><span className="mt-6 flex items-center gap-2 text-[10px] font-black">ادامه مطلب <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" /></span></article></Reveal>)}</div>;
}

export function Newsletter() {
  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-[28px] bg-[#13271b] px-4 py-8 text-white sm:rounded-[32px] sm:px-10 sm:py-10">
        <div className="hero-grid absolute inset-0 opacity-25" />
        <div className="absolute -left-20 -top-28 size-80 rounded-full border-[50px] border-[var(--acid)]/8" />
        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <div>
            <span className="text-[10px] font-black text-[var(--acid)]">یادداشت‌های هفتگی موآد</span>
            <h2 className="mt-3 text-[1.35rem] font-black leading-9 sm:text-2xl sm:leading-10">
              هر هفته یک ایده تازه
              <br />
              برای گوش‌های کنجکاو.
            </h2>
          </div>
          <div>
            <p className="mb-4 text-[11px] leading-6 text-white/55 sm:text-xs">
              سمپل رایگان، تکنیک‌های کوتاه و خبر انتشارهای تازه. بدون ایمیل‌های بی‌مصرف.
            </p>
            <form className="rounded-[22px] border border-white/10 bg-black/18 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] backdrop-blur-sm sm:flex sm:items-center sm:gap-2 sm:rounded-2xl sm:bg-white/6">
              <input
                className="h-13 w-full min-w-0 rounded-2xl border border-white/10 bg-white/10 px-4 text-right text-[16px] font-medium text-white outline-none transition placeholder:text-white/42 focus:border-[var(--acid)]/55 focus:bg-white/12 sm:h-12 sm:flex-1 sm:border-0 sm:bg-transparent sm:text-sm sm:focus:bg-transparent"
                placeholder="ایمیل شما"
                type="email"
                dir="rtl"
              />
              <button
                type="submit"
                className="mt-2 h-12 w-full rounded-2xl bg-[var(--acid)] px-5 text-[11px] font-black text-[var(--ink)] transition hover:shadow-[0_0_28px_rgba(186,244,81,.3)] sm:mt-0 sm:w-auto sm:px-6 sm:text-xs"
              >
                عضویت در خبرنامه
              </button>
            </form>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export function FeatureStrip() {
  const items = [{ icon: Headphones, text: "پیش‌نمایش واقعی صدا" }, { icon: SlidersHorizontal, text: "فایل‌های آماده میکس" }, { icon: Music2, text: "ساخته شده توسط موزیسین" }];
  return <div className="grid gap-3 sm:grid-cols-3">{items.map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-3 rounded-2xl border border-black/6 bg-white p-4 text-xs font-bold"><span className="grid size-9 place-items-center rounded-xl bg-[var(--soft)]"><Icon className="size-4" /></span>{text}</div>)}</div>;
}
