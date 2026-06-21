"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, ChevronDown, Handshake, Headphones, MessageCircle, Send, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const subjects = [
  { value: "product-support", label: "پشتیبانی محصول", description: "مشکل دانلود، فایل یا استفاده از محصول", icon: Headphones },
  { value: "purchase-advice", label: "مشاوره خرید", description: "انتخاب محصول متناسب با نیاز شما", icon: ShoppingBag },
  { value: "collaboration", label: "همکاری با موآد", description: "پیشنهاد همکاری، تولید یا انتشار", icon: Handshake },
  { value: "other", label: "موضوع دیگر", description: "هر چیزی که در گزینه‌های بالا نبود", icon: MessageCircle },
] as const;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState<(typeof subjects)[number]["value"]>(subjects[0].value);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);
  const selectedSubject = subjects.find((item) => item.value === subject) ?? subjects[0];
  const SelectedSubjectIcon = selectedSubject.icon;

  useEffect(() => {
    const closeSubject = (event: PointerEvent) => {
      if (!subjectRef.current?.contains(event.target as Node)) setSubjectOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSubjectOpen(false);
    };
    document.addEventListener("pointerdown", closeSubject);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeSubject);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  if (sent) {
    return (
      <div className="grid min-h-[430px] place-items-center rounded-[28px] bg-[var(--card)] p-8 text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--acid)]"><CheckCircle2 className="size-7" /></span>
          <h2 className="mt-5 text-xl font-black">پیامت به دست ما رسید.</h2>
          <p className="mt-2 text-xs leading-7 text-[var(--muted)]">خیلی زود از طریق ایمیل با تو در تماس خواهیم بود.</p>
          <button onClick={() => setSent(false)} className="secondary-button mt-5">ارسال پیام دیگر</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="rounded-[28px] border border-black/6 bg-[var(--card)] p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[11px] font-bold">نام و نام خانوادگی<input required className="form-input mt-2" placeholder="مثلاً آرین نیک‌روش" /></label>
        <label className="text-[11px] font-bold">ایمیل<input required type="email" className="form-input mt-2" placeholder="نشانی ایمیل شما" /></label>
      </div>
      <div ref={subjectRef} className="relative mt-4">
        <label id="contact-subject-label" className="block text-[11px] font-bold">موضوع</label>
        <input type="hidden" name="subject" value={subject} />
        <button
          type="button"
          role="combobox"
          aria-labelledby="contact-subject-label contact-subject-value"
          aria-controls="contact-subject-options"
          aria-expanded={subjectOpen}
          aria-haspopup="listbox"
          onClick={() => setSubjectOpen((open) => !open)}
          className={`form-input mt-2 flex h-[58px] items-center gap-3 text-right transition-all duration-300 ${subjectOpen ? "border-[#7baa3a] ring-4 ring-[#baf451]/15" : ""}`}
        >
          <span className={`grid size-9 shrink-0 place-items-center rounded-xl transition duration-300 ${subjectOpen ? "bg-[var(--acid)] text-[var(--ink)]" : "bg-[var(--soft)] text-[var(--foreground)]"}`}>
            <SelectedSubjectIcon className="size-4" />
          </span>
          <span id="contact-subject-value" className="min-w-0 flex-1">
            <strong className="block text-[12px] font-extrabold text-[var(--foreground)]">{selectedSubject.label}</strong>
            <small className="mt-0.5 block truncate text-[9px] font-medium text-[var(--muted)]">{selectedSubject.description}</small>
          </span>
          <ChevronDown className={`size-4 shrink-0 text-[var(--muted)] transition-transform duration-300 ${subjectOpen ? "rotate-180 text-[var(--foreground)]" : ""}`} />
        </button>
        <AnimatePresence>
          {subjectOpen && (
            <motion.div
              id="contact-subject-options"
              role="listbox"
              aria-labelledby="contact-subject-label"
              initial={{ opacity: 0, y: -6, scale: .985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: .99 }}
              transition={{ duration: .18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-[22px] border border-black/7 bg-[var(--card)] p-2 shadow-[0_22px_70px_rgba(17,22,14,.16)]"
            >
              {subjects.map(({ value, label, description, icon: Icon }) => {
                const selected = value === subject;
                return (
                  <button
                    key={value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => { setSubject(value); setSubjectOpen(false); }}
                    className={`group flex w-full items-center gap-3 rounded-[16px] p-3 text-right transition duration-200 ${selected ? "bg-[var(--soft)]" : "hover:bg-[var(--soft)]"}`}
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-[13px] transition duration-300 ${selected ? "bg-[var(--acid)] text-[var(--ink)] shadow-[0_0_20px_rgba(186,244,81,.22)]" : "bg-[var(--soft)] text-[var(--foreground)] group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)]"}`}>
                      <Icon className="size-[17px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-[12px] font-extrabold text-[var(--foreground)]">{label}</strong>
                      <small className="mt-1 block text-[9px] font-medium text-[var(--muted)]">{description}</small>
                    </span>
                    <span className={`grid size-6 shrink-0 place-items-center rounded-full transition ${selected ? "bg-[var(--ink)] text-[var(--acid)] opacity-100" : "opacity-0 group-hover:opacity-30"}`}>
                      <Check className="size-3.5" />
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <label className="mt-4 block text-[11px] font-bold">پیام<textarea required className="form-input mt-2 min-h-36 resize-none py-4" placeholder="هرچه لازم است بدانیم اینجا بنویس..." /></label>
      <button type="submit" className="primary-button mt-5 w-full"><Send className="size-4" /> ارسال پیام</button>
    </form>
  );
}
