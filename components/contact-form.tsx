"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="grid min-h-[430px] place-items-center rounded-[28px] bg-white p-8 text-center"><div><span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--acid)]"><CheckCircle2 className="size-7" /></span><h2 className="mt-5 text-xl font-black">پیامت به دست ما رسید.</h2><p className="mt-2 text-xs leading-7 text-[var(--muted)]">خیلی زود از طریق ایمیل با تو در تماس خواهیم بود.</p><button onClick={() => setSent(false)} className="secondary-button mt-5">ارسال پیام دیگر</button></div></div>;
  return <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-[28px] border border-black/6 bg-white p-5 sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><label className="text-[11px] font-bold">نام و نام خانوادگی<input required className="form-input mt-2" placeholder="مثلاً آرین نیک‌روش" /></label><label className="text-[11px] font-bold">ایمیل<input required type="email" className="form-input mt-2" placeholder="you@example.com" dir="ltr" /></label></div><label className="mt-4 block text-[11px] font-bold">موضوع<select className="form-input mt-2"><option>پشتیبانی محصول</option><option>مشاوره خرید</option><option>همکاری با موآد</option><option>موضوع دیگر</option></select></label><label className="mt-4 block text-[11px] font-bold">پیام<textarea required className="form-input mt-2 min-h-36 resize-none py-4" placeholder="هرچه لازم است بدانیم اینجا بنویس..." /></label><button type="submit" className="primary-button mt-5 w-full"><Send className="size-4" /> ارسال پیام</button></form>;
}

