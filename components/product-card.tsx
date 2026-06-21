"use client";

import { motion } from "framer-motion";
import { Check, Pause, Play, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { SamplePack } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { useShop } from "./site-shell";

export function Waveform({ color = "currentColor", compact = false }: { color?: string; compact?: boolean }) {
  const bars = [35, 67, 42, 82, 54, 92, 48, 73, 35, 64, 88, 45, 70, 31, 58, 79, 43, 66, 37, 52];
  return <div className={`flex items-center gap-[3px] ${compact ? "h-5" : "h-10"}`} aria-hidden="true">{bars.map((height, index) => <span key={index} className="w-[2px] rounded-full opacity-80" style={{ height: `${compact ? height / 4 : height / 2.2}px`, background: color }} />)}</div>;
}

export default function ProductCard({ pack, index = 0 }: { pack: SamplePack; index?: number }) {
  const [playing, setPlaying] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useShop();
  const add = () => { addToCart(pack.slug); setAdded(true); window.setTimeout(() => setAdded(false), 1600); };

  return (
    <motion.article className="neon-hover group overflow-hidden rounded-[26px] border border-black/6 bg-white p-2 shadow-[0_16px_50px_rgba(17,22,14,.05)]" initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ delay: index * .06, duration: .55 }}>
      <div className="relative aspect-[1.08/1] overflow-hidden rounded-[21px] p-5 text-white" style={{ background: `radial-gradient(circle at 25% 20%, ${pack.accent}22, transparent 35%), linear-gradient(145deg, ${pack.color}, #080a08)` }}>
        <div className="absolute -left-12 -top-12 size-40 rounded-full border border-white/8" /><div className="absolute -bottom-16 -right-12 size-52 rounded-full border border-white/8" />
        <div className="relative flex items-start justify-between"><span className="text-[9px] font-bold text-white/45">مجموعه صدای موآد</span>{pack.badge && <span className="rounded-full px-2.5 py-1 text-[9px] font-black text-[var(--ink)]" style={{ background: pack.accent }}>{pack.badge}</span>}</div>
        <div className="absolute inset-x-5 bottom-5">
          <Waveform color={pack.accent} />
          <div className="mt-3 text-[19px] font-black leading-tight">{pack.title}</div>
          <div className="mt-2 flex items-center justify-between text-[9px] text-white/45"><span>{pack.genre}</span><span>{pack.bpm}</span></div>
        </div>
        <button onClick={() => setPlaying(!playing)} className="absolute left-5 top-14 grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl transition hover:scale-105" aria-label={playing ? "توقف پیش نمایش" : "پخش پیش نمایش"}>{playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="mr-0.5 size-4" fill="currentColor" />}</button>
      </div>
      <div className="px-3 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3"><Link href={`/samples/${pack.slug}`}><h3 className="text-[15px] font-black transition group-hover:text-[#477319]">{pack.title}</h3><p className="mt-1 text-[10px] text-[var(--muted)]">{pack.genre}</p></Link><button onClick={add} className={`grid size-10 shrink-0 place-items-center rounded-2xl transition ${added ? "bg-[var(--acid)]" : "bg-[var(--soft)] hover:bg-[var(--acid)]"}`} aria-label="افزودن به سبد">{added ? <Check className="size-4" /> : <Plus className="size-4" />}</button></div>
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
