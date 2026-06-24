"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SamplePack } from "@/lib/data";
import ProductCard from "./product-card";

export default function ProductCarousel({ items, label = "محصولات پیشنهادی" }: { items: SamplePack[]; label?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      setVisibleCount(width >= 1280 ? 4 : width >= 1024 ? 3 : width >= 640 ? 2 : 1);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);
  const moveTo = useCallback((nextIndex: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const normalized = nextIndex > maxIndex ? 0 : nextIndex < 0 ? maxIndex : nextIndex;
    const card = viewport.querySelector<HTMLElement>("[data-carousel-card]");
    if (card) viewport.scrollTo({ left: -normalized * (card.offsetWidth + 16), behavior: "smooth" });
    setActiveIndex(normalized);
  }, [maxIndex]);

  useEffect(() => {
    if (activeIndex > maxIndex) moveTo(maxIndex);
  }, [activeIndex, maxIndex, moveTo]);

  return (
    <div className="relative" aria-label={label}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: maxIndex + 1 }, (_, index) => <span key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-[var(--acid)] shadow-[0_0_14px_rgba(186,244,81,.45)]" : "w-1.5 bg-[var(--muted)]/25"}`} />)}
        </div>
        <div className="flex items-center gap-2">
          <span className="ml-1 hidden text-[9px] font-bold text-[var(--muted)] sm:inline">مشاهده محصولات بیشتر</span>
          <button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={!maxIndex} aria-label="محصولات قبلی" className="grid size-10 place-items-center rounded-2xl border border-black/7 bg-[var(--card)] text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8ebc49]/45 hover:bg-[var(--acid)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-35"><ArrowRight className="size-4" /></button>
          <button type="button" onClick={() => moveTo(activeIndex + 1)} disabled={!maxIndex} aria-label="محصولات بعدی" className="grid size-10 place-items-center rounded-2xl border border-black/7 bg-[var(--card)] text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8ebc49]/45 hover:bg-[var(--acid)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-35"><ArrowLeft className="size-4" /></button>
        </div>
      </div>

      <div ref={viewportRef} dir="rtl" className="-mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-7 pt-1 [scrollbar-width:none] sm:-mx-1 sm:px-1 [&::-webkit-scrollbar]:hidden">
        {items.map((pack, index) => <div key={pack.slug} data-carousel-card className="min-w-0 shrink-0 snap-center basis-[84%] sm:snap-start sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-3rem)/4)]"><ProductCard pack={pack} index={index} /></div>)}
      </div>
    </div>
  );
}
