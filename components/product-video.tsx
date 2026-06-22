"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ListVideo,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const productVideos = [
  { id: "intro", title: "معرفی کامل محصول", caption: "آشنایی با فضای کلی و محتوای پک", src: "/videos/moad-product-preview.mp4" },
  { id: "sounds", title: "شنیدن صداهای داخل پک", caption: "پیش‌نمایش لوپ‌ها، وان‌شات‌ها و تکسچرها", src: "/videos/moad-product-preview.mp4" },
  { id: "workflow", title: "استفاده در پروژه واقعی", caption: "نمایش کوتاه روند استفاده داخل نرم‌افزار", src: "/videos/moad-product-preview.mp4" },
] as const;

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "۰:۰۰";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function ProductVideo({ title, accent }: { title: string; accent: string }) {
  const [activeVideo, setActiveVideo] = useState<(typeof productVideos)[number]>(productVideos[0]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setMenuPinned(false);
      }
    };
    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const selectVideo = async (item: (typeof productVideos)[number]) => {
    setActiveVideo(item);
    setMenuOpen(false);
    setMenuPinned(false);
    const video = videoRef.current;
    if (!video) return;
    video.src = item.src;
    video.load();
    try {
      await video.play();
    } catch {
      setPlaying(false);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const rangeStyle = {
    "--range-accent": accent,
    background: `linear-gradient(to right, ${accent} ${progress}%, rgba(255,255,255,.18) ${progress}%)`,
  } as CSSProperties;

  return (
    <div ref={playerRef} className="group relative h-[390px] min-w-0 overflow-hidden rounded-[32px] bg-[var(--ink)] text-white lg:h-[560px]">
      <video
        ref={videoRef}
        src={activeVideo.src}
        poster="/images/moad-studio-hero.png"
        preload="metadata"
        playsInline
        className="absolute inset-0 size-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onVolumeChange={(event) => {
          setVolume(event.currentTarget.volume);
          setMuted(event.currentTarget.muted);
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,6,.16),rgba(6,8,6,.2)_45%,rgba(6,8,6,.9))]" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" />

      <div
        ref={menuRef}
        className="absolute right-5 top-5 z-30 sm:right-6 sm:top-6"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => { if (!menuPinned) setMenuOpen(false); }}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => {
            const nextOpen = !menuOpen;
            setMenuOpen(nextOpen);
            setMenuPinned(nextOpen);
          }}
          className="flex h-10 items-center gap-2 rounded-full border border-white/12 bg-black/35 px-4 text-[10px] font-extrabold text-white shadow-lg backdrop-blur-xl transition hover:border-white/25 hover:bg-black/55"
        >
          <ListVideo className="size-4" style={{ color: accent }} />
          ویدئوهای محصول
          <ChevronDown className={`size-3.5 text-white/45 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              role="menu"
              aria-label="ویدئوهای محصول"
              initial={{ opacity: 0, y: -6, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: .985 }}
              transition={{ duration: .18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-[calc(100%+8px)] w-[min(82vw,320px)] overflow-hidden rounded-[22px] border border-white/10 bg-[#10140f]/95 p-2 shadow-[0_24px_70px_rgba(0,0,0,.48)] backdrop-blur-2xl"
            >
              <div className="px-2 pb-2 pt-1 text-[9px] font-bold text-white/35">برای پخش، یک ویدئو را انتخاب کن</div>
              {productVideos.map((item, index) => {
                const selected = item.id === activeVideo.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => selectVideo(item)}
                    className={`group/item flex w-full items-center gap-3 rounded-[16px] p-2.5 text-right transition ${selected ? "bg-white/8" : "hover:bg-white/6"}`}
                  >
                    <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/7">
                      <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(186,244,81,.18),transparent_65%)]" />
                      <Play className="relative size-4" fill="currentColor" style={{ color: selected ? accent : "rgba(255,255,255,.65)" }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-[11px] font-extrabold text-white">{item.title}</strong>
                      <small className="mt-1 block truncate text-[8px] text-white/38">{item.caption}</small>
                    </span>
                    {selected ? <Check className="size-4 shrink-0" style={{ color: accent }} /> : <span className="text-[9px] text-white/25">۰{index + 1}</span>}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!playing && (
        <motion.button
          type="button"
          whileTap={{ scale: .92 }}
          onClick={togglePlay}
          className="absolute left-1/2 top-1/2 z-10 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[var(--ink)] shadow-[0_0_55px_rgba(186,244,81,.25)] transition hover:scale-105 sm:size-20"
          style={{ background: accent }}
          aria-label="پخش ویدئو"
        >
          <Play className="mr-1 size-6 sm:size-7" fill="currentColor" />
        </motion.button>
      )}

      <div className="absolute inset-x-4 bottom-4 z-20 sm:inset-x-6 sm:bottom-6">
        <div className="mb-3 px-1">
          <span className="text-[9px] text-white/45">{activeVideo.title}</span>
          <h1 className="mt-1 text-2xl font-black sm:text-4xl">{title}</h1>
        </div>
        <div className="flex items-center gap-2.5 rounded-[20px] border border-white/10 bg-black/55 p-2.5 shadow-2xl backdrop-blur-xl sm:gap-3 sm:px-3">
          <button type="button" onClick={togglePlay} className="grid size-9 shrink-0 place-items-center rounded-xl text-[var(--ink)] transition hover:scale-105" style={{ background: accent }} aria-label={playing ? "توقف ویدئو" : "پخش ویدئو"}>
            {playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="mr-0.5 size-4" fill="currentColor" />}
          </button>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={(event) => {
              const nextTime = Number(event.target.value);
              if (videoRef.current) videoRef.current.currentTime = nextTime;
              setCurrentTime(nextTime);
            }}
            className="product-video-range min-w-0 flex-1"
            style={rangeStyle}
            aria-label="زمان ویدئو"
            dir="ltr"
          />
          <span className="hidden min-w-[68px] text-center font-mono text-[9px] text-white/55 sm:block" dir="ltr">{formatTime(currentTime)} / {formatTime(duration)}</span>
          <button
            type="button"
            onClick={() => { if (videoRef.current) videoRef.current.muted = !muted; }}
            className="grid size-9 shrink-0 place-items-center rounded-xl text-white/65 transition hover:bg-white/8 hover:text-white"
            aria-label={muted ? "فعال‌کردن صدا" : "بی‌صداکردن"}
          >
            {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={(event) => {
              const nextVolume = Number(event.target.value);
              if (videoRef.current) { videoRef.current.volume = nextVolume; videoRef.current.muted = false; }
            }}
            className="product-video-range hidden w-16 sm:block"
            style={{ "--range-accent": accent } as CSSProperties}
            aria-label="میزان صدا"
            dir="ltr"
          />
          <button type="button" onClick={() => playerRef.current?.requestFullscreen()} className="grid size-9 shrink-0 place-items-center rounded-xl text-white/65 transition hover:bg-white/8 hover:text-white" aria-label="نمایش تمام‌صفحه">
            <Maximize2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
