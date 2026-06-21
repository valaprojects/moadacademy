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
import { articles, categories, courses, formatPrice } from "@/lib/data";
import { Reveal } from "./motion";

export function SectionTitle({ eyebrow, title, text, href, linkLabel = "مشاهده همه" }: { eyebrow?: string; title: string; text?: string; href?: string; linkLabel?: string }) {
  return <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div>{eyebrow && <span className="eyebrow"><Sparkles className="size-3" />{eyebrow}</span>}<h2 className="max-w-2xl text-2xl font-black leading-[1.5] tracking-[-.04em] sm:text-3xl">{title}</h2>{text && <p className="mt-2 max-w-xl text-xs leading-7 text-[var(--muted)] sm:text-sm">{text}</p>}</div>{href && <Link href={href} className="flex w-fit items-center gap-2 text-xs font-extrabold text-[#527927] transition hover:gap-3">{linkLabel}<ArrowLeft className="size-4" /></Link>}</div>;
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <Reveal><section className="relative mt-7 overflow-hidden rounded-[34px] bg-[var(--ink)] px-6 py-12 text-white sm:px-10 sm:py-16"><div className="hero-grid absolute inset-0 opacity-40" /><div className="absolute -left-24 -top-24 size-80 rounded-full bg-[var(--acid)]/15 blur-3xl" /><div className="relative max-w-3xl"><span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-[var(--acid)]">{eyebrow}</span><h1 className="text-3xl font-black leading-[1.45] tracking-[-.05em] sm:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-sm leading-8 text-white/55 sm:text-base">{text}</p></div></section></Reveal>;
}

const categoryIcons = { drum: Drum, piano: Piano, mic: Mic2, wave: AudioLines };
export function CategoryGrid() {
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{categories.map((item, index) => { const Icon = categoryIcons[item.icon as keyof typeof categoryIcons]; return <Reveal key={item.title} delay={index * .05}><Link href="/shop" className="neon-hover group flex min-h-40 flex-col justify-between overflow-hidden rounded-[24px] border border-black/6 bg-white p-5"><div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-[var(--soft)] transition duration-300 group-hover:rotate-3 group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)] group-hover:shadow-[0_0_24px_rgba(186,244,81,.4)]"><Icon className="size-5 transition-transform duration-300 group-hover:scale-110" /></span><ArrowLeft className="size-4 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:text-[#668d32] group-hover:opacity-100" /></div><div><h3 className="text-sm font-black">{item.title}</h3><p className="mt-1 text-[10px] text-[var(--muted)]">{item.subtitle}</p></div></Link></Reveal>; })}</div>;
}

export function CourseCard({ course, index = 0 }: { course: (typeof courses)[number]; index?: number }) {
  return <Reveal delay={index * .07}><article className="neon-hover group overflow-hidden rounded-[28px] border border-black/6 bg-white p-2"><div className="relative min-h-56 overflow-hidden rounded-[22px] bg-[var(--ink)] p-5 text-white"><div className="hero-grid absolute inset-0 opacity-30" /><div className="absolute -left-12 -top-12 size-40 rounded-full blur-3xl" style={{ background: `${course.accent}35` }} /><div className="relative flex h-full min-h-46 flex-col"><div className="flex items-center justify-between"><span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] text-white/50">{course.level}</span><Layers3 className="size-5" style={{ color: course.accent }} /></div><h3 className="mt-auto max-w-[260px] text-xl font-black leading-8">{course.title}</h3><div className="mt-4 flex gap-4 text-[10px] text-white/45"><span>{course.lessons.toLocaleString("fa-IR")} جلسه</span><span>{course.duration}</span></div></div></div><div className="flex items-center justify-between p-4"><div><span className="block text-[9px] text-[var(--muted)]">سرمایه‌گذاری دوره</span><strong className="text-xs">{formatPrice(course.price)}</strong></div><button className="grid size-11 place-items-center rounded-full bg-[var(--acid)] text-[var(--ink)] transition group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(186,244,81,.4)]"><Play className="mr-0.5 size-4" fill="currentColor" /></button></div></article></Reveal>;
}

export function ArticleCards() {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{articles.map((article, index) => <Reveal key={article.slug} delay={index * .06}><article className="neon-hover group h-full rounded-[24px] border border-black/6 bg-white p-5"><div className="mb-8 flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--soft)] text-[#5c7b35]"><BookOpen className="size-5" /></span><span className="flex items-center gap-1 text-[9px] text-[var(--muted)]"><Clock3 className="size-3" />{article.readTime}</span></div><span className="text-[9px] font-bold text-[#69943b]">{article.category}</span><h3 className="mt-2 text-base font-black leading-7 transition group-hover:text-[#527927]">{article.title}</h3><p className="mt-3 text-[11px] leading-6 text-[var(--muted)]">{article.excerpt}</p><Link href={`/blog/${article.slug}`} className="mt-6 flex items-center gap-2 text-[10px] font-black">ادامه مطلب <ArrowLeft className="size-3" /></Link></article></Reveal>)}</div>;
}

export function Newsletter() {
  return <Reveal><section className="relative overflow-hidden rounded-[32px] bg-[#13271b] px-6 py-10 text-white sm:px-10"><div className="hero-grid absolute inset-0 opacity-25" /><div className="absolute -left-20 -top-28 size-80 rounded-full border-[50px] border-[var(--acid)]/8" /><div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]"><div><span className="text-[10px] font-black text-[var(--acid)]">یادداشت‌های هفتگی موآد</span><h2 className="mt-3 text-2xl font-black leading-10">هر هفته یک ایده تازه<br />برای گوش‌های کنجکاو.</h2></div><div><p className="mb-4 text-xs leading-6 text-white/55">سمپل رایگان، تکنیک‌های کوتاه و خبر انتشارهای تازه. بدون ایمیل‌های بی‌مصرف.</p><form className="flex flex-col gap-2 sm:flex-row"><input className="h-13 flex-1 rounded-2xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[var(--acid)]/50" placeholder="ایمیل شما" type="email" /><button type="submit" className="h-13 rounded-2xl bg-[var(--acid)] px-6 text-xs font-black text-[var(--ink)] transition hover:shadow-[0_0_28px_rgba(186,244,81,.3)]">عضویت در خبرنامه</button></form></div></div></section></Reveal>;
}

export function FeatureStrip() {
  const items = [{ icon: Headphones, text: "پیش‌نمایش واقعی صدا" }, { icon: SlidersHorizontal, text: "فایل‌های آماده میکس" }, { icon: Music2, text: "ساخته شده توسط موزیسین" }];
  return <div className="grid gap-3 sm:grid-cols-3">{items.map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-3 rounded-2xl border border-black/6 bg-white p-4 text-xs font-bold"><span className="grid size-9 place-items-center rounded-xl bg-[var(--soft)]"><Icon className="size-4" /></span>{text}</div>)}</div>;
}
