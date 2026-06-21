"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { samplePacks } from "@/lib/data";
import ProductCard from "./product-card";

const filters = ["همه", "ترپ", "آر‌اند‌بی", "هیپ‌هاپ", "هاوس", "سینمایی", "پاپ"];

export default function SampleCatalog() {
  const [filter, setFilter] = useState("همه");
  const [query, setQuery] = useState("");
  const items = useMemo(() => samplePacks.filter((pack) => {
    const matchesQuery = `${pack.title} ${pack.enTitle} ${pack.genre}`.toLowerCase().includes(query.toLowerCase());
    const map: Record<string, string> = { "ترپ": "ترپ", "آر‌اند‌بی": "آر‌اند‌بی", "هیپ‌هاپ": "هیپ‌هاپ", "هاوس": "هاوس", "سینمایی": "سینمایی", "پاپ": "پاپ" };
    return matchesQuery && (filter === "همه" || pack.genre.includes(map[filter]));
  }), [filter, query]);

  return <section className="mt-10"><div className="mb-7 flex flex-col gap-4 rounded-[24px] border border-black/6 bg-white p-3 sm:flex-row sm:items-center"><div className="flex h-12 flex-1 items-center gap-3 rounded-2xl bg-[var(--soft)] px-4"><Search className="size-4 text-[var(--muted)]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جست‌وجو بین صداها..." className="w-full bg-transparent text-xs outline-none" /></div><div className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:pb-0">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-xl px-3 py-2.5 text-[10px] font-bold transition ${filter === item ? "bg-[var(--ink)] text-white" : "bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--foreground)]"}`}>{item}</button>)}</div><span className="hidden items-center gap-2 text-[10px] text-[var(--muted)] xl:flex"><SlidersHorizontal className="size-4" />{items.length} محصول</span></div>{items.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{items.map((pack, index) => <ProductCard key={pack.slug} pack={pack} index={index} />)}</div> : <div className="glass-card grid min-h-56 place-items-center text-sm text-[var(--muted)]">صدایی با این مشخصات پیدا نشد.</div>}</section>;
}
