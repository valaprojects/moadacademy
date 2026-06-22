"use client";

import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPrice, samplePacks } from "@/lib/data";
import { useShop } from "./site-shell";

export default function CartContent() {
  const { items, changeQuantity, removeFromCart } = useShop();
  const lines = items
    .map((line) => ({ ...line, pack: samplePacks.find((pack) => pack.slug === line.slug)! }))
    .filter((line) => line.pack);
  const total = lines.reduce((sum, line) => sum + line.pack.price * line.quantity, 0);

  if (!lines.length) {
    return (
      <div className="glass-card mt-8 grid min-h-[430px] place-items-center p-8 text-center">
        <div>
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[var(--soft)]"><ShoppingBag className="size-8" /></span>
          <h2 className="mt-6 text-2xl font-black">سبدت هنوز ساکت است.</h2>
          <p className="mt-2 text-xs text-[var(--muted)]">یک صدای تازه پیدا کن و اولین قطعه را به سبد اضافه کن.</p>
          <Link href="/shop" className="primary-button mt-6">رفتن به محصولات <ArrowLeft className="size-4" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {lines.map(({ pack, quantity }) => (
          <article key={pack.slug} className="group relative flex flex-col gap-4 rounded-[24px] border border-black/6 bg-[var(--card)] p-3 transition hover:border-[#86ad49]/35 hover:shadow-[0_14px_40px_rgba(17,22,14,.06)] sm:flex-row sm:items-center">
            <Link href={`/samples/${pack.slug}`} aria-label={`مشاهده ${pack.title}`} className="absolute inset-0 z-10 rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7faa3e]" />
            <div className="grid aspect-square w-full shrink-0 place-items-center rounded-[19px] sm:w-28" style={{ background: pack.color, color: pack.accent }}>
              <span className="px-3 text-center text-[10px] font-black">{pack.title}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black transition group-hover:text-[#527927]">{pack.title}</h3>
              <p className="mt-1 text-[10px] text-[var(--muted)]">{pack.genre}</p>
              <strong className="mt-3 block text-xs">{formatPrice(pack.price)}</strong>
            </div>
            <div className="relative z-20 flex items-center justify-between gap-4">
              <div className="flex items-center rounded-xl bg-[var(--soft)] p-1">
                <button aria-label={`افزایش تعداد ${pack.title}`} onClick={() => changeQuantity(pack.slug, 1)} className="grid size-8 place-items-center rounded-lg bg-[var(--card)]"><Plus className="size-3" /></button>
                <span className="w-8 text-center text-xs font-black">{quantity}</span>
                <button aria-label={`کاهش تعداد ${pack.title}`} onClick={() => changeQuantity(pack.slug, -1)} className="grid size-8 place-items-center rounded-lg bg-[var(--card)]"><Minus className="size-3" /></button>
              </div>
              <button onClick={() => removeFromCart(pack.slug)} className="grid size-10 place-items-center rounded-xl text-red-500 transition hover:bg-red-50" aria-label="حذف"><Trash2 className="size-4" /></button>
            </div>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-[26px] bg-[var(--ink)] p-6 text-white lg:sticky lg:top-24">
        <h2 className="text-lg font-black">خلاصه سفارش</h2>
        <div className="mt-6 space-y-3 text-xs text-white/55">
          <div className="flex justify-between"><span>مجموع محصولات</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between"><span>تخفیف</span><span>۰ تومان</span></div>
        </div>
        <div className="my-5 h-px bg-white/10" />
        <div className="flex items-end justify-between"><span className="text-xs">مبلغ نهایی</span><strong className="text-base text-[var(--acid)]">{formatPrice(total)}</strong></div>
        <button className="mt-6 h-13 w-full rounded-2xl bg-[var(--acid)] text-xs font-black text-[var(--ink)]">ادامه و پرداخت امن</button>
        <p className="mt-4 text-center text-[9px] leading-5 text-white/35">پس از پرداخت، لینک دانلود فوراً فعال می‌شود.</p>
      </aside>
    </div>
  );
}
