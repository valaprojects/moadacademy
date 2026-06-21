"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const questions = [
  ["بعد از خرید چطور فایل‌ها را دریافت می‌کنم؟", "بلافاصله بعد از پرداخت، لینک دانلود در حساب کاربری و ایمیل شما قرار می‌گیرد. هر محصول را تا ۵ بار می‌توانید دانلود کنید."],
  ["آیا استفاده از سمپل‌ها مجوز تجاری دارد؟", "بله. تمام سمپل‌پک‌های موآد Royalty-Free هستند و می‌توانید در آثار منتشرشده و پروژه‌های تجاری از آن‌ها استفاده کنید. فروش یا بازنشر خود فایل‌های خام مجاز نیست."],
  ["فایل‌ها با چه نرم‌افزاری سازگارند؟", "فایل‌ها با فرمت استاندارد و باکیفیت صوتی ارائه می‌شوند و در همه نرم‌افزارهای رایج آهنگ‌سازی و تنظیم قابل استفاده‌اند."],
  ["دوره‌ها پیش‌نیاز دارند؟", "سطح هر دوره در صفحه آن مشخص شده است. دوره بیت‌سازی از پایه شروع می‌شود؛ دوره‌های میکس و طراحی صدا به آشنایی اولیه با یک نرم‌افزار آهنگ‌سازی نیاز دارند."],
  ["اگر برای دانلود یا نصب مشکلی داشتم چه؟", "از صفحه تماس یا گفت‌وگوی پشتیبانی پیام بدهید. تیم ما در روزهای کاری حداکثر تا ۲۴ ساعت پاسخ می‌دهد."],
  ["امکان بازگشت وجه وجود دارد؟", "برای دوره‌ها تا ۷ روز و پیش از مشاهده بیش از ۲۰٪ محتوا ضمانت بازگشت وجه داریم. محصولات دانلودی بعد از دریافت فایل قابل بازگشت نیستند."],
];

export default function FaqList() {
  const [open, setOpen] = useState(0);
  return <div className="mt-10 grid items-start gap-3 lg:grid-cols-2">{questions.map(([question, answer], index) => <div key={question} className="neon-hover overflow-hidden rounded-[22px] border border-black/6 bg-white"><button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 p-5 text-right text-sm font-black sm:p-6"><span>{question}</span><span className={`grid size-9 shrink-0 place-items-center rounded-xl transition ${open === index ? "bg-[var(--acid)] text-[var(--ink)]" : "bg-[var(--soft)]"}`}>{open === index ? <Minus className="size-4" /> : <Plus className="size-4" />}</span></button><AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="px-5 pb-6 text-xs leading-7 text-[var(--muted)] sm:px-6">{answer}</p></motion.div>}</AnimatePresence></div>)}</div>;
}
