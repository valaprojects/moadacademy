"use client";

import { Pause, Play, SkipBack, Volume2 } from "lucide-react";
import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

export type AudioDemoTrack = {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
  bpm?: string;
};

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function makeBars(seed: string) {
  return Array.from({ length: 96 }, (_, index) => {
    const code = seed.charCodeAt(index % seed.length) || 7;
    return 18 + ((code * (index + 3)) % 62);
  });
}

export default function AudioDemoPlayer({ tracks, title, description, accent = "#baf451" }: { tracks: AudioDemoTrack[]; title: string; description?: string; accent?: string }) {
  const playlist = tracks.filter((track) => track.src);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeTrack = playlist[activeIndex] ?? playlist[0];
  const bars = makeBars(activeTrack?.id ?? "moad");
  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const selectTrack = async (index: number) => {
    setActiveIndex(index);
    setCurrentTime(0);
    setDuration(0);
    setPlaying(false);
    const audio = audioRef.current;
    if (!audio) return;
    window.setTimeout(async () => {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    }, 0);
  };

  const seek = (event: ReactPointerEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  if (!playlist.length) return null;

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/6 bg-[var(--ink)] text-white shadow-[0_24px_70px_rgba(17,22,14,.12)]">
      <audio
        ref={audioRef}
        src={activeTrack.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />
      <div className="relative p-4 sm:p-6">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute -left-14 -top-14 size-44 rounded-full blur-3xl" style={{ background: `${accent}28` }} />
        <div className="relative flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-black" style={{ color: accent }}>پلیر دمو صوتی</span>
              <h2 className="mt-2 text-xl font-black leading-8 sm:text-2xl">{title}</h2>
              {description && <p className="mt-2 max-w-2xl text-[11px] leading-6 text-white/48 sm:text-xs">{description}</p>}
            </div>
            <button type="button" onClick={togglePlay} className="grid size-12 shrink-0 place-items-center rounded-[18px] text-[var(--ink)] shadow-[0_0_32px_rgba(186,244,81,.25)] transition active:scale-95 sm:size-14 sm:rounded-[20px]" style={{ background: accent }} aria-label={playing ? "توقف نمونه صوتی" : "پخش نمونه صوتی"}>
              {playing ? <Pause className="size-5" fill="currentColor" /> : <Play className="mr-0.5 size-5" fill="currentColor" />}
            </button>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4 text-[10px] text-white/42">
              <span className="truncate font-bold text-white/70">{activeTrack.title}</span>
              <span dir="ltr" className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div role="slider" aria-label="خط زمان نمونه صوتی" aria-valuemin={0} aria-valuemax={Math.round(duration || 0)} aria-valuenow={Math.round(currentTime)} tabIndex={0} onPointerDown={seek} onPointerMove={(event) => { if (event.buttons === 1) seek(event); }} className="group relative h-16 cursor-pointer touch-none rounded-2xl bg-white/[.035] px-3 py-3 outline-none ring-offset-2 ring-offset-[var(--ink)] focus-visible:ring-2" style={{ "--tw-ring-color": accent } as CSSProperties}>
              <div className="flex h-full w-full items-center gap-[3px] overflow-hidden" dir="ltr">
                {bars.map((height, index) => {
                  const active = (index / bars.length) * 100 <= progress;
                  return <span key={index} className="min-w-[2px] flex-1 rounded-full transition-colors" style={{ height: `${height}%`, background: active ? accent : "rgba(255,255,255,.18)" }} />;
                })}
              </div>
              <span className="absolute bottom-0 top-0 w-px bg-white/70 opacity-0 transition group-hover:opacity-100" style={{ left: `${progress}%` }} />
            </div>
          </div>

          <div className="grid gap-2">
            {playlist.map((track, index) => {
              const active = index === activeIndex;
              return (
                <button key={track.id} type="button" onClick={() => selectTrack(index)} className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-right transition ${active ? "border-white/12 bg-white/8" : "border-white/6 bg-white/[.035] hover:border-white/12 hover:bg-white/[.06]"}`}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl" style={{ background: active ? accent : "rgba(255,255,255,.07)", color: active ? "var(--ink)" : "rgba(255,255,255,.7)" }}>{active && playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="mr-0.5 size-4" fill="currentColor" />}</span>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-xs">{track.title}</strong>
                    {track.subtitle && <small className="mt-1 block truncate text-[9px] text-white/38">{track.subtitle}</small>}
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-white/6 px-2.5 py-1.5 text-[9px] text-white/45 sm:flex"><Volume2 className="size-3" />{track.bpm ?? "68 / 115"}</span>
                </button>
              );
            })}
          </div>

          <button type="button" onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; setCurrentTime(0); }} className="flex w-fit items-center gap-2 text-[10px] font-bold text-white/42 transition hover:text-white">
            <SkipBack className="size-3.5" />شروع از اول
          </button>
        </div>
      </div>
    </div>
  );
}
