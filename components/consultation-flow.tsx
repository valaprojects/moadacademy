"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Disc3, Mic2, Music2, RotateCcw, SlidersHorizontal, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { samplePacks } from "@/lib/data";

const roles = [
  { title: "هنرجو هستم", icon: UserRound },
  { title: "تنظیم‌کننده‌ام", icon: SlidersHorizontal },
  { title: "دی‌جی و نوازنده‌ام", icon: Disc3 },
  { title: "خواننده‌ام", icon: Mic2 },
];

const questions = [
  { title: "الان در چه مرحله‌ای هستی؟", options: ["تازه شروع کرده‌ام", "چند پروژه ساخته‌ام", "به‌صورت حرفه‌ای کار می‌کنم"] },
  { title: "مهم‌ترین هدفت برای این ماه چیست؟", options: ["ساخت اولین قطعه کامل", "بهترکردن کیفیت صدا", "پیداکردن صداهای تازه", "آماده‌شدن برای انتشار"] },
  { title: "بیشتر به کدام فضا نزدیک هستی؟", options: ["هیپ‌هاپ و ترپ", "پاپ و آر‌اند‌بی", "الکترونیک و هاوس", "سینمایی و امبینت"] },
];

export default function ConsultationFlow() {
  const [role, setRole] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const complete = role && step >= questions.length;
  const suggested = role?.includes("خواننده") ? [samplePacks[5], samplePacks[1]] : role?.includes("دی‌جی") ? [samplePacks[3], samplePacks[4]] : role?.includes("تنظیم") ? [samplePacks[0], samplePacks[2]] : [samplePacks[0], samplePacks[1]];
  const reset = () => { setRole(null); setStep(0); setAnswers([]); };

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
      <aside className="h-fit rounded-[28px] bg-[var(--ink)] p-6 text-white lg:sticky lg:top-24">
        <Music2 className="size-7 text-[var(--acid)]" />
        <h2 className="mt-5 text-xl font-black leading-9">چند سؤال کوتاه،<br />یک مسیر روشن‌تر.</h2>
        <p className="mt-3 text-xs leading-7 text-white/45">این نسخه اولیه است. سؤال‌های نهایی را بعداً با محتوایی که آماده می‌کنی جایگزین می‌کنیم.</p>
        <div className="mt-7 space-y-3">{["انتخاب نقش", "شناخت نیاز", "پیشنهاد مسیر"].map((item, index) => <div key={item} className={`flex items-center gap-3 text-[11px] ${index <= (role ? Math.min(step + 1, 2) : 0) ? "text-white" : "text-white/30"}`}><span className={`grid size-7 place-items-center rounded-full text-[10px] ${index <= (role ? Math.min(step + 1, 2) : 0) ? "bg-[var(--acid)] text-[var(--ink)]" : "border border-white/10"}`}>{(index + 1).toLocaleString("fa-IR")}</span>{item}</div>)}</div>
      </aside>

      <div className="min-h-[520px] overflow-hidden rounded-[30px] border border-black/6 bg-[var(--card)] p-5 sm:p-8">
        <AnimatePresence mode="wait">
          {!role && <motion.div key="roles" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}><span className="eyebrow">قدم اول</span><h2 className="text-2xl font-black">کدام گزینه به تو نزدیک‌تر است؟</h2><p className="mt-2 text-xs text-[var(--muted)]">نقشت را انتخاب کن تا سؤال‌ها و پیشنهادها دقیق‌تر شوند.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{roles.map(({ title, icon: Icon }) => <button key={title} onClick={() => setRole(title)} className="neon-hover group flex min-h-32 flex-col items-start justify-between rounded-[22px] border border-black/7 bg-[var(--soft)] p-5 text-right"><span className="grid size-11 place-items-center rounded-2xl bg-white transition group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)]"><Icon className="size-5" /></span><strong className="text-sm">{title}</strong></button>)}</div></motion.div>}

          {role && !complete && <motion.div key={`question-${step}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}><div className="flex items-center justify-between"><span className="eyebrow">سؤال {String(step + 1).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])} از ۳</span><button onClick={reset} className="flex items-center gap-1 text-[10px] text-[var(--muted)]"><RotateCcw className="size-3" />شروع دوباره</button></div><h2 className="text-2xl font-black leading-10">{questions[step].title}</h2><div className="mt-8 space-y-3">{questions[step].options.map((option) => <button key={option} onClick={() => { setAnswers([...answers, option]); setStep(step + 1); }} className="group flex w-full items-center justify-between rounded-[20px] border border-black/7 bg-[var(--soft)] p-4 text-right text-xs font-bold transition hover:border-[var(--acid)] hover:bg-[#d9e8cb] hover:text-[var(--ink)] hover:shadow-[0_0_24px_rgba(186,244,81,.16)]"><span>{option}</span><ArrowLeft className="size-4 opacity-35 transition group-hover:-translate-x-1 group-hover:opacity-100" /></button>)}</div></motion.div>}

          {complete && <motion.div key="result" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }}><span className="eyebrow"><CheckCircle2 className="size-3" />پیشنهاد اولیه آماده است</span><h2 className="text-2xl font-black">این مسیر برای شروع مناسب‌تر است.</h2><p className="mt-3 text-xs leading-7 text-[var(--muted)]">براساس انتخاب «{role}» و جواب‌هایت، این دو محصول می‌توانند سریع‌تر وارد پروژه‌ات شوند. با اضافه‌شدن سؤال‌های نهایی، این پیشنهاد دقیق‌تر خواهد شد.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{suggested.map((pack) => <Link key={pack.slug} href={`/samples/${pack.slug}`} className="neon-hover rounded-[22px] border border-black/7 bg-[var(--soft)] p-4"><span className="mb-5 grid size-11 place-items-center rounded-2xl" style={{ background: pack.color, color: pack.accent }}><Music2 className="size-5" /></span><strong className="block text-sm">{pack.title}</strong><span className="mt-1 block text-[10px] text-[var(--muted)]">{pack.genre}</span></Link>)}</div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/shop" className="primary-button">دیدن همه محصولات <ArrowLeft className="size-4" /></Link><button onClick={reset} className="secondary-button"><RotateCcw className="size-4" />شروع دوباره</button></div></motion.div>}
        </AnimatePresence>
      </div>
    </section>
  );
}
