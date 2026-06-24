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

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col gap-2 rounded-[22px] border border-black/6 bg-white p-2 sm:mb-7 sm:flex-row sm:items-center sm:gap-4 sm:rounded-[24px] sm:p-3">
        <div className="flex min-h-13 w-full min-w-0 flex-1 items-center gap-2 rounded-2xl bg-[var(--soft)] px-3 sm:min-h-0 sm:h-12 sm:gap-3 sm:px-4">
          <Search className="size-4 shrink-0 text-[var(--muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجو بین صداها..."
            className="min-w-0 flex-1 bg-transparent text-right text-[16px] outline-none placeholder:text-[var(--muted)]/70 sm:text-xs"
          />
        </div>
        <div className="-mx-0.5 flex max-w-full gap-2 overflow-x-auto px-0.5 pb-1 [scrollbar-width:none] sm:mx-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`h-10 shrink-0 rounded-2xl px-3.5 text-[10px] font-bold transition sm:h-auto sm:rounded-xl sm:px-3 sm:py-2.5 ${filter === item ? "bg-[var(--ink)] text-white shadow-[0_8px_22px_rgba(17,21,15,.14)]" : "bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--foreground)]"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-2 text-[10px] text-[var(--muted)] xl:flex">
          <SlidersHorizontal className="size-4" />
          {items.length} محصول
        </span>
      </div>
      {items.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((pack, index) => <ProductCard key={pack.slug} pack={pack} index={index} />)}
        </div>
      ) : (
        <div className="glass-card grid min-h-56 place-items-center text-sm text-[var(--muted)]">صدایی با این مشخصات پیدا نشد.</div>
      )}
    </section>
  );
}
