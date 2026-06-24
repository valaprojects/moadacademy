"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ListVideo,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

export type PlayerVideo = {
  id: string;
  title: string;
  caption: string;
  src: string;
};

export type PlayerTimeline = {
  id: string;
  title: string;
  time: number;
};

const productVideos: readonly PlayerVideo[] = [
  { id: "intro", title: "معرفی کامل محصول", caption: "آشنایی با فضای کلی و محتوای پک", src: "/videos/moad-product-preview.mp4" },
  { id: "sounds", title: "شنیدن صداهای داخل پک", caption: "پیش‌نمایش لوپ‌ها، وان‌شات‌ها و تکسچرها", src: "/videos/moad-product-preview.mp4" },
  { id: "workflow", title: "استفاده در پروژه واقعی", caption: "نمایش کوتاه روند استفاده داخل نرم‌افزار", src: "/videos/moad-product-preview.mp4" },
];

type ProductVideoProps = {
  title: string;
  accent: string;
  videos?: readonly PlayerVideo[];
  timeline?: readonly PlayerTimeline[];
  menuLabel?: string;
  compact?: boolean;
  titleTag?: "h1" | "p";
  showTitleOverlay?: boolean;
  hideMobileTitleOverlay?: boolean;
};

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "۰:۰۰";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatFaTime(value: number) {
  return formatTime(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

export default function ProductVideo({ title, accent, videos = productVideos, timeline = [], menuLabel = "ویدئوهای محصول", compact = false, titleTag = "h1", showTitleOverlay = true, hideMobileTitleOverlay = false }: ProductVideoProps) {
  const playlist = videos.length ? videos : productVideos;
  const [activeVideo, setActiveVideo] = useState<PlayerVideo>(playlist[0]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-product-video-menu]")) return;
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setMenuPinned(false);
      }
    };
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("touchstart", closeMenu);
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("touchstart", closeMenu);
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!volumeOpen) return;
    const closeVolume = (event: Event) => {
      if (!volumeRef.current?.contains(event.target as Node)) setVolumeOpen(false);
    };
    document.addEventListener("pointerdown", closeVolume);
    document.addEventListener("touchstart", closeVolume);
    document.addEventListener("mousedown", closeVolume);
    return () => {
      document.removeEventListener("pointerdown", closeVolume);
      document.removeEventListener("touchstart", closeVolume);
      document.removeEventListener("mousedown", closeVolume);
    };
  }, [volumeOpen]);

  useEffect(() => {
    const syncFullscreen = () => {
      const active = document.fullscreenElement === playerRef.current;
      setIsFullscreen(active);
    };
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  useEffect(() => {
    const video = videoRef.current as (HTMLVideoElement & { webkitDisplayingFullscreen?: boolean }) | null;
    if (!video) return;
    const syncNativeFullscreen = () => setIsFullscreen(Boolean(video.webkitDisplayingFullscreen));
    video.addEventListener("webkitbeginfullscreen", syncNativeFullscreen);
    video.addEventListener("webkitendfullscreen", syncNativeFullscreen);
    return () => {
      video.removeEventListener("webkitbeginfullscreen", syncNativeFullscreen);
      video.removeEventListener("webkitendfullscreen", syncNativeFullscreen);
    };
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

  const selectVideo = async (item: PlayerVideo) => {
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

  const selectTimeline = async (point: PlayerTimeline) => {
    const video = videoRef.current;
    if (!video) return;
    const nextTime = video.duration ? Math.min(point.time, video.duration) : point.time;
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
    setMenuOpen(false);
    setMenuPinned(false);
    try {
      await video.play();
    } catch {
      setPlaying(false);
    }
  };

  const isMobileViewport = () => window.matchMedia("(max-width: 639px)").matches;

  const toggleFullscreen = async () => {
    const video = videoRef.current as (HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitExitFullscreen?: () => void;
      webkitDisplayingFullscreen?: boolean;
    }) | null;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (video?.webkitDisplayingFullscreen && video.webkitExitFullscreen) {
        video.webkitExitFullscreen();
      } else if (playerRef.current) {
        if (isMobileViewport() && video?.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        } else if (playerRef.current.requestFullscreen) {
          await playerRef.current.requestFullscreen();
        } else if (video?.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      }
    } catch {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const rangeStyle = {
    "--range-accent": accent,
    background: `linear-gradient(to right, ${accent} ${progress}%, rgba(255,255,255,.18) ${progress}%)`,
  } as CSSProperties;
  const audibleVolume = muted ? 0 : volume;
  const volumePercent = Math.round(audibleVolume * 100);
  const volumeStyle = {
    "--range-accent": accent,
    background: `linear-gradient(to right, ${accent} ${volumePercent}%, rgba(255,255,255,.18) ${volumePercent}%)`,
  } as CSSProperties;
  const volumeVerticalStyle = {
    "--range-accent": accent,
    background: `linear-gradient(to right, ${accent} ${volumePercent}%, rgba(255,255,255,.18) ${volumePercent}%)`,
  } as CSSProperties;
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const activeTimelineId = timeline.reduce((activeId, point) => currentTime >= point.time ? point.id : activeId, timeline[0]?.id ?? "");
  const menuContent = (
    <>
      <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-white/18 sm:hidden" />
      <div className="hidden px-2 pb-2 pt-1 text-[9px] font-bold text-white/35 sm:block">{timeline.length ? "برای پرش، یکی از بخش‌های مهم را انتخاب کن" : "برای پخش، یک ویدئو را انتخاب کن"}</div>
      {timeline.length > 0 ? timeline.map((point, index) => {
        const selected = point.id === activeTimelineId;
        return (
          <button
            key={point.id}
            type="button"
            role="menuitem"
            onClick={() => selectTimeline(point)}
            className={`group/item flex w-full items-center gap-2 rounded-[15px] p-1.5 text-right transition sm:gap-3 sm:rounded-[16px] sm:p-2.5 ${selected ? "bg-white/8" : "hover:bg-white/6"}`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/7 font-mono text-[9px] sm:size-11 sm:text-[10px]" dir="ltr" style={{ color: selected ? accent : "rgba(255,255,255,.58)" }}>{formatFaTime(point.time)}</span>
            <span className="min-w-0 flex-1"><strong className="block truncate text-[10px] font-extrabold text-white sm:text-[11px]">{point.title}</strong><small className="mt-1 hidden text-[8px] text-white/38 sm:block">بخش {(index + 1).toLocaleString("fa-IR")} از ویدئو</small></span>
            {selected ? <Check className="size-4 shrink-0" style={{ color: accent }} /> : <Play className="size-3.5 shrink-0 text-white/30" fill="currentColor" />}
          </button>
        );
      }) : playlist.map((item, index) => {
        const selected = item.id === activeVideo.id;
        return (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            onClick={() => selectVideo(item)}
            className={`group/item flex w-full items-center gap-2 rounded-[15px] p-1.5 text-right transition sm:gap-3 sm:rounded-[16px] sm:p-2.5 ${selected ? "bg-white/8" : "hover:bg-white/6"}`}
          >
            <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/7 sm:size-11">
              <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(186,244,81,.18),transparent_65%)]" />
              <Play className="relative size-4" fill="currentColor" style={{ color: selected ? accent : "rgba(255,255,255,.65)" }} />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-[10px] font-extrabold text-white sm:text-[11px]">{item.title}</strong>
              <small className="mt-1 hidden truncate text-[8px] text-white/38 sm:block">{item.caption}</small>
            </span>
            {selected ? <Check className="size-4 shrink-0" style={{ color: accent }} /> : <span className="text-[9px] text-white/25">۰{index + 1}</span>}
          </button>
        );
      })}
    </>
  );

  return (
    <div ref={playerRef} className={`group relative min-w-0 overflow-hidden bg-[var(--ink)] text-white ${isFullscreen ? "h-[100dvh] rounded-none" : `${compact ? "h-[220px] sm:aspect-video sm:h-auto sm:min-h-0" : "h-[330px] sm:h-[390px] lg:h-[560px]"} rounded-[26px] sm:rounded-[32px]`}`}>
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
      {portalTarget && createPortal(<AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[72] bg-black/35 backdrop-blur-[2px] sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="menu"
              aria-label={menuLabel}
              data-product-video-menu
              initial={{ opacity: 0, y: 18, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: .985 }}
              transition={{ duration: .18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+.75rem)] z-[74] max-h-[46dvh] overflow-y-auto overscroll-contain rounded-[26px] border border-white/10 bg-[#10140f]/96 p-2 text-white shadow-[0_24px_70px_rgba(0,0,0,.55)] backdrop-blur-2xl sm:hidden"
            >
              {menuContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>, portalTarget)}

      {(timeline.length > 0 || playlist.length > 1) && <div
        ref={menuRef}
        data-product-video-menu
        className="absolute right-3 top-3 z-30 sm:right-6 sm:top-6"
        onMouseEnter={() => { if (!isMobileViewport()) setMenuOpen(true); }}
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
          className="flex h-9 max-w-[calc(100vw-1.5rem)] items-center gap-1.5 rounded-full border border-white/12 bg-black/35 px-3 text-[9px] font-extrabold text-white shadow-lg backdrop-blur-xl transition hover:border-white/25 hover:bg-black/55 sm:h-10 sm:gap-2 sm:px-4 sm:text-[10px]"
        >
          <ListVideo className="size-3.5 shrink-0 sm:size-4" style={{ color: accent }} />
          <span className="truncate">{menuLabel}</span>
          <ChevronDown className={`size-3.5 text-white/45 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              role="menu"
              aria-label={menuLabel}
              initial={{ opacity: 0, y: -6, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: .985 }}
              transition={{ duration: .18, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:absolute sm:inset-auto sm:right-0 sm:top-[calc(100%+8px)] sm:block sm:max-h-[56dvh] sm:w-[min(92vw,320px)] sm:overflow-y-auto sm:rounded-[22px] sm:border sm:border-white/10 sm:bg-[#10140f]/95 sm:p-2 sm:shadow-[0_24px_70px_rgba(0,0,0,.48)] sm:backdrop-blur-2xl"
            >
              {menuContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>}

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

      <div className="absolute inset-x-3 bottom-3 z-20 sm:inset-x-6 sm:bottom-6">
        {showTitleOverlay && <div className={`mb-3 px-1 ${hideMobileTitleOverlay ? "max-sm:hidden" : ""}`}>
          <span className="text-[9px] text-white/45">{activeVideo.title}</span>
          {titleTag === "h1" ? <h1 className="mt-1 text-2xl font-black sm:text-4xl">{title}</h1> : <p className="mt-1 text-xl font-black sm:text-3xl">{title}</p>}
        </div>}
        <div className="flex flex-nowrap items-center gap-1.5 rounded-[18px] border border-white/10 bg-black/60 p-1.5 shadow-2xl backdrop-blur-xl sm:gap-3 sm:rounded-[20px] sm:p-2 sm:px-3">
          <button type="button" onClick={togglePlay} className="grid size-8 shrink-0 place-items-center rounded-xl text-[var(--ink)] transition hover:scale-105 sm:size-9" style={{ background: accent }} aria-label={playing ? "توقف ویدئو" : "پخش ویدئو"}>
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
            className="product-video-range min-w-0 flex-1 basis-auto"
            style={rangeStyle}
            aria-label="زمان ویدئو"
            dir="ltr"
          />
          <span className="min-w-[56px] shrink-0 text-center font-mono text-[8px] text-white/55 sm:min-w-[64px] sm:text-[9px]" dir="ltr">{formatTime(currentTime)} / {formatTime(duration)}</span>
          <div ref={volumeRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                if (isMobileViewport()) {
                  setVolumeOpen((open) => !open);
                } else if (videoRef.current) {
                  videoRef.current.muted = !muted;
                }
              }}
              className="grid size-8 shrink-0 place-items-center rounded-xl text-white/65 transition hover:bg-white/8 hover:text-white sm:size-9"
              aria-label={muted ? "فعال‌کردن صدا" : "بی‌صداکردن"}
              aria-expanded={volumeOpen}
            >
              {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <AnimatePresence>
              {volumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: .96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: .96 }}
                  transition={{ duration: .18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-11 left-1/2 z-30 flex h-36 w-14 -translate-x-1/2 touch-none flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-2xl backdrop-blur-xl sm:hidden"
                  onPointerDown={(event) => event.stopPropagation()}
                  onTouchStart={(event) => event.stopPropagation()}
                  onTouchMove={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <span className="font-mono text-[9px] text-white/60">{volumePercent.toLocaleString("fa-IR")}٪</span>
                  <div className="relative flex h-24 w-8 items-center justify-center">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={audibleVolume}
                      onPointerDown={(event) => {
                        event.stopPropagation();
                        event.currentTarget.setPointerCapture?.(event.pointerId);
                      }}
                      onTouchStart={(event) => event.stopPropagation()}
                      onTouchMove={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onChange={(event) => {
                        const nextVolume = Number(event.target.value);
                        if (videoRef.current) { videoRef.current.volume = nextVolume; videoRef.current.muted = false; }
                      }}
                      className="product-video-range w-24 -rotate-90"
                      style={volumeVerticalStyle}
                      aria-label="میزان صدا"
                      aria-valuetext={`${volumePercent.toLocaleString("fa-IR")} درصد`}
                      dir="ltr"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={audibleVolume}
            onChange={(event) => {
              const nextVolume = Number(event.target.value);
              if (videoRef.current) { videoRef.current.volume = nextVolume; videoRef.current.muted = false; }
            }}
            className="product-video-range order-7 hidden w-24 flex-1 sm:order-none sm:block sm:w-20 sm:flex-none"
            style={volumeStyle}
            aria-label="میزان صدا"
            aria-valuetext={`${volumePercent.toLocaleString("fa-IR")} درصد`}
            dir="ltr"
          />
          <span className="order-8 hidden min-w-8 text-center font-mono text-[9px] text-white/55 sm:order-none sm:block" dir="rtl">{volumePercent.toLocaleString("fa-IR")}٪</span>
          <button type="button" onClick={toggleFullscreen} className="grid size-8 shrink-0 place-items-center rounded-xl text-white/65 transition hover:bg-white/8 hover:text-white sm:size-9" aria-label={isFullscreen ? "کوچک‌کردن ویدئو" : "نمایش تمام‌صفحه"}>
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
