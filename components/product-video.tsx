"use client";

import { motion } from "framer-motion";
import { Pause, Play, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductVideo({ title, accent }: { title: string; accent: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative h-[390px] min-w-0 overflow-hidden rounded-[32px] bg-[var(--ink)] text-white lg:h-[560px]">
      <Image
        src="/images/moad-studio-hero.png"
        alt={`ویدئوی معرفی ${title}`}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 65vw"
        className={`object-cover transition duration-700 ${playing ? "scale-105 opacity-80" : "opacity-65 group-hover:scale-[1.02]"}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,6,.05),rgba(6,8,6,.82))]" />
      <div className="hero-grid absolute inset-0 opacity-20" />
      <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[10px] backdrop-blur">
        <Video className="size-3" style={{ color: accent }} /> ویدئوی معرفی محصول
      </div>
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-[10px] text-white/45">معرفی و شنیدن محتوای پک</span>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">{title}</h1>
          <p className="mt-2 text-[10px] text-white/45">ویدئوی نهایی پس از آماده‌شدن محتوا در همین بخش قرار می‌گیرد.</p>
        </div>
        <motion.button
          whileTap={{ scale: .92 }}
          onClick={() => setPlaying(!playing)}
          className="grid size-16 shrink-0 place-items-center rounded-full text-[var(--ink)] shadow-[0_0_45px_rgba(186,244,81,.24)]"
          style={{ background: accent }}
          aria-label={playing ? "توقف پیش‌نمایش" : "پخش پیش‌نمایش"}
        >
          {playing ? <Pause className="size-6" fill="currentColor" /> : <Play className="mr-1 size-6" fill="currentColor" />}
        </motion.button>
      </div>
    </div>
  );
}
