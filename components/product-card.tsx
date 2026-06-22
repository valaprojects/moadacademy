"use client";

import { motion } from "framer-motion";
import { Check, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { SamplePack } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { useShop } from "./site-shell";

export default function ProductCard({ pack, index = 0 }: { pack: SamplePack; index?: number }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useShop();
  const add = () => { addToCart(pack.slug); setAdded(true); window.setTimeout(() => setAdded(false), 1600); };

  return (
    <motion.article className="neon-hover group relative overflow-hidden rounded-[26px] border border-black/6 bg-white p-2 shadow-[0_16px_50px_rgba(17,22,14,.05)]" initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ delay: index * .04, duration: .5 }}>
      <Link href={`/samples/${pack.slug}`} aria-label={`مشاهده ${pack.title}`} className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7faa3e]" />
      <div
        className="relative aspect-[1.08/1] overflow-hidden rounded-[21px] bg-[#0c100b] bg-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        style={{
          backgroundImage: "url('/images/moad-product-covers-v1.png')",
          backgroundPosition: pack.coverPosition,
          backgroundSize: "300% 200%",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,5,.08),transparent_48%,rgba(5,7,5,.45))]" />
        <div className="relative flex items-start justify-between p-4"><span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1.5 text-[8px] font-bold text-white/70 backdrop-blur-md">مجموعه صدای موآد</span>{pack.badge && <span className="rounded-full px-2.5 py-1.5 text-[9px] font-black text-[var(--ink)] shadow-lg" style={{ background: pack.accent }}>{pack.badge}</span>}</div>
      </div>
      <div className="px-3 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3"><div><h3 className="text-[15px] font-black transition group-hover:text-[#477319]">{pack.title}</h3><p className="mt-1 text-[10px] text-[var(--muted)]">{pack.genre}</p></div><button type="button" onClick={add} className={`relative z-20 grid size-10 shrink-0 place-items-center rounded-2xl transition ${added ? "bg-[var(--acid)]" : "bg-[var(--soft)] hover:bg-[var(--acid)]"}`} aria-label="افزودن به سبد">{added ? <Check className="size-4" /> : <Plus className="size-4" />}</button></div>
        <div className="mt-4 flex items-end justify-between border-t border-black/6 pt-3"><strong className="text-[12px]">{formatPrice(pack.price)}</strong>{pack.oldPrice && <del className="text-[9px] text-[var(--muted)]">{formatPrice(pack.oldPrice)}</del>}</div>
      </div>
    </motion.article>
  );
}

export function AddToCartButton({ slug, className = "" }: { slug: string; className?: string }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useShop();
  return <button onClick={() => { addToCart(slug); setAdded(true); setTimeout(() => setAdded(false), 1600); }} className={`primary-button ${className}`}>{added ? <><Check className="size-4" /> به سبد اضافه شد</> : <><ShoppingBag className="size-4" /> افزودن به سبد خرید</>}</button>;
}
