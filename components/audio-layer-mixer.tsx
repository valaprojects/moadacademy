"use client";

import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import type { AudioDemoTrack } from "./audio-demo-player";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function makeBars(seed: string) {
  return Array.from({ length: 96 }, (_, index) => {
    const code = seed.charCodeAt(index % seed.length) || 9;
    return 16 + ((code * (index + 5)) % 66);
  });
}

export default function AudioLayerMixer({
  baseTrack,
  layers,
  title,
  description,
  accent = "#baf451",
}: {
  baseTrack: AudioDemoTrack;
  layers: AudioDemoTrack[];
  title: string;
  description?: string;
  accent?: string;
}) {
  const baseRef = useRef<HTMLAudioElement>(null);
  const layerRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([]);
  const bars = makeBars(`${baseTrack.id}-${activeLayerIds.join("-") || "clean"}`);
  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  const syncLayerToBase = (audio: HTMLAudioElement) => {
    const base = baseRef.current;
    if (!base) return;
    const layerDuration = audio.duration;
    audio.currentTime = Number.isFinite(layerDuration) && layerDuration > 0 ? base.currentTime % layerDuration : base.currentTime;
    audio.volume = 0.82;
  };

  const playActiveLayers = async () => {
    await Promise.allSettled(
      activeLayerIds.map(async (id) => {
        const layer = layerRefs.current[id];
        if (!layer) return;
        syncLayerToBase(layer);
        await layer.play();
      })
    );
  };

  const pauseLayers = () => {
    Object.values(layerRefs.current).forEach((layer) => layer?.pause());
  };

  const togglePlay = async () => {
    const base = baseRef.current;
    if (!base) return;

    if (base.paused) {
      try {
        await base.play();
        await playActiveLayers();
        setPlaying(true);
      } catch {
        pauseLayers();
        setPlaying(false);
      }
    } else {
      base.pause();
      pauseLayers();
      setPlaying(false);
    }
  };

  const toggleLayer = async (id: string) => {
    const isActive = activeLayerIds.includes(id);
    if (isActive) {
      layerRefs.current[id]?.pause();
      setActiveLayerIds((current) => current.filter((item) => item !== id));
      return;
    }

    setActiveLayerIds((current) => [...current, id]);
    const layer = layerRefs.current[id];
    const base = baseRef.current;
    if (!layer || !base || base.paused) return;

    try {
      syncLayerToBase(layer);
      await layer.play();
    } catch {
      layer.pause();
    }
  };

  const seek = (event: ReactPointerEvent<HTMLDivElement>) => {
    const base = baseRef.current;
    if (!base || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    base.currentTime = ratio * duration;
    setCurrentTime(base.currentTime);
    activeLayerIds.forEach((id) => {
      const layer = layerRefs.current[id];
      if (layer) syncLayerToBase(layer);
    });
  };

  const restart = () => {
    const base = baseRef.current;
    if (base) base.currentTime = 0;
    Object.values(layerRefs.current).forEach((layer) => {
      if (layer) layer.currentTime = 0;
    });
    setCurrentTime(0);
  };

  if (!baseTrack?.src) return null;

  return (
    <div className="mt-6 overflow-hidden rounded-[28px] border border-black/6 bg-[var(--ink)] text-white shadow-[0_24px_70px_rgba(17,22,14,.12)]">
      <audio
        ref={baseRef}
        src={baseTrack.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => {
          pauseLayers();
          setPlaying(false);
        }}
        onEnded={() => {
          pauseLayers();
          setPlaying(false);
        }}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />
      {layers.map((track) => (
        <audio
          key={track.id}
          ref={(node) => {
            layerRefs.current[track.id] = node;
          }}
          src={track.src}
          preload="metadata"
          loop
        />
      ))}

      <div className="relative p-4 sm:p-6">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute -left-14 -top-14 size-44 rounded-full blur-3xl" style={{ background: `${accent}28` }} />
        <div className="relative flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-black" style={{ color: accent }}>میکسر دمو صوتی</span>
              <h2 className="mt-2 text-xl font-black leading-8 sm:text-2xl">{title}</h2>
              {description && <p className="mt-2 max-w-2xl text-[11px] leading-6 text-white/48 sm:text-xs">{description}</p>}
            </div>
            <button
              type="button"
              onClick={togglePlay}
              className="grid size-12 shrink-0 place-items-center rounded-[18px] text-[var(--ink)] shadow-[0_0_32px_rgba(186,244,81,.25)] transition active:scale-95 sm:size-14 sm:rounded-[20px]"
              style={{ background: accent }}
              aria-label={playing ? "توقف موزیک اصلی" : "پخش موزیک اصلی"}
            >
              {playing ? <Pause className="size-5" fill="currentColor" /> : <Play className="mr-0.5 size-5" fill="currentColor" />}
            </button>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4 text-[10px] text-white/42">
              <span className="truncate font-bold text-white/70">{baseTrack.title}</span>
              <span dir="ltr" className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div
              role="slider"
              aria-label="خط زمان میکسر دمو صوتی"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration || 0)}
              aria-valuenow={Math.round(currentTime)}
              tabIndex={0}
              onPointerDown={seek}
              onPointerMove={(event) => {
                if (event.buttons === 1) seek(event);
              }}
              className="group relative h-16 cursor-pointer touch-none rounded-2xl bg-white/[.035] px-3 py-3 outline-none ring-offset-2 ring-offset-[var(--ink)] focus-visible:ring-2"
              style={{ "--tw-ring-color": accent } as CSSProperties}
            >
              <div className="flex h-full w-full items-center gap-[3px] overflow-hidden" dir="ltr">
                {bars.map((height, index) => {
                  const active = (index / bars.length) * 100 <= progress;
                  return <span key={index} className="min-w-[2px] flex-1 rounded-full transition-colors" style={{ height: `${height}%`, background: active ? accent : "rgba(255,255,255,.18)" }} />;
                })}
              </div>
              <span className="absolute bottom-0 top-0 w-px bg-white/70 opacity-0 transition group-hover:opacity-100" style={{ left: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-[22px] border border-white/7 bg-white/[.035] p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <strong className="text-[11px]">صداهایی که روی موزیک اصلی اضافه می‌شوند</strong>
              <span className="rounded-full bg-white/6 px-2.5 py-1 text-[9px] text-white/45">{activeLayerIds.length.toLocaleString("fa-IR")} فعال</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {layers.map((track) => {
                const active = activeLayerIds.includes(track.id);
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => toggleLayer(track.id)}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-right transition ${active ? "border-white/12 bg-white/10" : "border-white/6 bg-white/[.035] hover:border-white/12 hover:bg-white/[.06]"}`}
                    aria-pressed={active}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-2xl" style={{ background: active ? accent : "rgba(255,255,255,.07)", color: active ? "var(--ink)" : "rgba(255,255,255,.7)" }}>
                      {active ? <Volume2 className="size-4" /> : <Play className="mr-0.5 size-4" fill="currentColor" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-xs">{track.title}</strong>
                      {track.subtitle && <small className="mt-1 block truncate text-[9px] text-white/38">{track.subtitle}</small>}
                    </span>
                    <span className="hidden rounded-full bg-white/6 px-2.5 py-1.5 text-[9px] text-white/45 sm:block">{track.bpm ?? "68 / 115"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button type="button" onClick={restart} className="flex w-fit items-center gap-2 text-[10px] font-bold text-white/42 transition hover:text-white">
            <RotateCcw className="size-3.5" />شروع تست از اول
          </button>
        </div>
      </div>
    </div>
  );
}
