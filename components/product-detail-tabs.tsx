"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileText, Headphones, ListMusic, MessageCircle, Music2, Pause, Play, Send, Star, Trophy, type LucideIcon } from "lucide-react";
import { FormEvent, KeyboardEvent, PointerEvent, useMemo, useRef, useState } from "react";
import AudioLayerMixer from "./audio-layer-mixer";
import AudioDemoPlayer, { type AudioDemoTrack } from "./audio-demo-player";

type ProductKind = "download" | "education";
type TabId = "description" | "curriculum" | "audioDemos" | "publishedTracks" | "studentFeedback" | "studentWorks" | "reviews";
type Review = { id: number; name: string; text: string; rating: number; date: string };
type ProductTab = { id: TabId; label: string; icon: LucideIcon };
type TrackProgress = { currentTime: number; duration: number };

function formatTrackTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

const downloadTabs: ProductTab[] = [
  { id: "description", label: "توضیحات", icon: FileText },
  { id: "audioDemos", label: "نمونه‌های صوتی", icon: Headphones },
  { id: "publishedTracks", label: "میکسر", icon: Music2 },
  { id: "studentWorks", label: "نمونه‌کار هنرجو", icon: Trophy },
  { id: "reviews", label: "نظرات", icon: MessageCircle },
];

const educationTabs: ProductTab[] = [
  { id: "description", label: "توضیحات", icon: FileText },
  { id: "curriculum", label: "سرفصل‌ها", icon: ListMusic },
  { id: "studentFeedback", label: "بازخورد هنرجو", icon: Trophy },
  { id: "studentWorks", label: "نمونه‌کار هنرجو", icon: Music2 },
  { id: "reviews", label: "نظرات", icon: MessageCircle },
];

const defaultDemoTracks: AudioDemoTrack[] = [
  { id: "rhythm-01", title: "ریتم ۰۱", subtitle: "لوپ سینک‌شده برای تست پک", src: "/audio/moad-demo/rhythm-01-68-115.mp3", bpm: "68 / 115" },
  { id: "rhythm-02", title: "ریتم ۰۲", subtitle: "لوپ سینک‌شده برای تست پک", src: "/audio/moad-demo/rhythm-02-68-115.mp3", bpm: "68 / 115" },
  { id: "rhythm-03", title: "ریتم ۰۳", subtitle: "لوپ سینک‌شده برای تست پک", src: "/audio/moad-demo/rhythm-03-68-115.mp3", bpm: "68 / 115" },
  { id: "rhythm-04", title: "ریتم ۰۴", subtitle: "لوپ سینک‌شده برای تست پک", src: "/audio/moad-demo/rhythm-04-68-115.mp3", bpm: "68 / 115" },
  { id: "rhythm-05", title: "ریتم ۰۵", subtitle: "لوپ سینک‌شده برای تست پک", src: "/audio/moad-demo/rhythm-05-68-115.mp3", bpm: "68 / 115" },
  { id: "rhythm-07", title: "ریتم ۰۷", subtitle: "لوپ سینک‌شده برای تست پک", src: "/audio/moad-demo/rhythm-07-68-115.mp3", bpm: "68 / 115" },
];

const defaultPublishedTracks: AudioDemoTrack[] = [
  { id: "main-music", title: "موزیک ساخته‌شده با پک", subtitle: "نمونه خروجی خریدار / پروژه کامل", src: "/audio/moad-demo/main-music-68-115.mp3", bpm: "68 / 115" },
];

const initialReviews: Review[] = [
  { id: 1, name: "آرمان نادری", text: "چیدمان فایل‌ها خیلی مرتب بود و سریع توانستم از صداها داخل پروژه استفاده کنم.", rating: 5, date: "۱۲ خرداد ۱۴۰۵" },
  { id: 2, name: "کیان رستمی", text: "تنوع صداها خوب است و توضیحات هر بخش برای شروع کاملاً کافی بود.", rating: 4, date: "۲۸ اردیبهشت ۱۴۰۵" },
];

export default function ProductDetailTabs({
  description,
  tags,
  includes,
  kind = "download",
  demoTracks = defaultDemoTracks,
  publishedTracks = defaultPublishedTracks,
}: {
  description: string;
  tags: string[];
  includes: string[];
  kind?: ProductKind;
  demoTracks?: AudioDemoTrack[];
  publishedTracks?: AudioDemoTrack[];
}) {
  const tabs = useMemo(() => (kind === "education" ? educationTabs : downloadTabs), [kind]);
  const [activeTab, setActiveTab] = useState<TabId>(tabs[0].id);
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const studentAudioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const [studentPlayingId, setStudentPlayingId] = useState<string | null>(null);
  const [studentProgress, setStudentProgress] = useState<Record<string, TrackProgress>>({});

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const direction = event.key === "ArrowLeft" ? 1 : -1;
    const nextTab = tabs[(currentIndex + direction + tabs.length) % tabs.length];
    setActiveTab(nextTab.id);
    document.getElementById(`product-tab-${nextTab.id}`)?.focus();
  };

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const text = String(form.get("review") || "").trim();
    if (!name || !text) return;
    setReviews((current) => [{ id: Date.now(), name, text, rating, date: "همین حالا" }, ...current]);
    event.currentTarget.reset();
    setRating(5);
    setSubmitted(true);
  };

  const updateStudentProgress = (id: string, audio: HTMLAudioElement) => {
    setStudentProgress((current) => ({
      ...current,
      [id]: { currentTime: audio.currentTime, duration: audio.duration },
    }));
  };

  const toggleStudentWork = async (id: string) => {
    const audio = studentAudioRefs.current[id];
    if (!audio) return;

    Object.entries(studentAudioRefs.current).forEach(([trackId, item]) => {
      if (trackId !== id) item?.pause();
    });

    if (audio.paused) {
      try {
        await audio.play();
        setStudentPlayingId(id);
      } catch {
        setStudentPlayingId(null);
      }
    } else {
      audio.pause();
      setStudentPlayingId(null);
    }
  };

  const seekStudentWork = (id: string, event: PointerEvent<HTMLDivElement>) => {
    const audio = studentAudioRefs.current[id];
    const duration = studentProgress[id]?.duration || audio?.duration || 0;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    updateStudentProgress(id, audio);
  };

  return (
    <section className="overflow-hidden rounded-[30px] border border-black/6 bg-white shadow-[0_18px_60px_rgba(17,22,14,.05)]">
      <div className="border-b border-black/6 p-3 sm:p-4">
        <div role="tablist" aria-label="اطلاعات محصول" onKeyDown={handleKeyboard} className="flex gap-2 overflow-x-auto rounded-[22px] bg-[var(--soft)] p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            const Icon = tab.icon;
            return (
              <button key={tab.id} id={`product-tab-${tab.id}`} type="button" role="tab" aria-selected={active} aria-controls={`product-panel-${tab.id}`} tabIndex={active ? 0 : -1} onClick={() => setActiveTab(tab.id)} className={`relative flex min-w-max flex-1 items-center justify-center gap-2 rounded-[17px] px-5 py-3 text-[11px] font-black transition-colors sm:py-3.5 ${active ? "text-[var(--ink)]" : "text-[var(--muted)] hover:bg-white/45 hover:text-[var(--foreground)]"}`}>
                {active && <motion.span layoutId="active-product-tab" className="absolute inset-0 rounded-[17px] bg-[var(--acid)] shadow-[0_8px_24px_rgba(122,170,58,.18)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <Icon className="relative size-4" /><span className="relative">{tab.label}</span>
                {tab.id === "reviews" && <span className={`relative rounded-full px-1.5 py-0.5 text-[8px] ${active ? "bg-black/10" : "bg-black/5"}`}>{reviews.length.toLocaleString("fa-IR")}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={activeTab} id={`product-panel-${activeTab}`} role="tabpanel" aria-labelledby={`product-tab-${activeTab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }} className="p-5 sm:p-8">
          {activeTab === "description" && (
            <div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
              <div><span className="eyebrow">درباره این محصول</span><h2 className="text-2xl font-black">{kind === "download" ? "داخل این مجموعه چه چیزهایی است؟" : "این آموزش برای چه مسیری ساخته شده؟"}</h2><p className="mt-4 text-sm leading-8 text-[var(--muted)]">{description} تمام فایل‌ها نام‌گذاری و دسته‌بندی شده‌اند تا بدون اتلاف وقت مستقیماً وارد پروژه شوند.</p><div className="mt-6 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-[var(--soft)] px-3 py-2 text-[10px] font-bold">{tag}</span>)}</div></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{includes.map((item) => <div key={item} className="flex min-h-20 items-center gap-3 rounded-2xl bg-[var(--soft)] p-4 text-[10px] font-bold"><CheckCircle2 className="size-5 shrink-0 text-[#729a3b]" />{item}</div>)}</div>
            </div>
          )}

          {activeTab === "audioDemos" && (
            <AudioDemoPlayer title="دموهای صوتی این پک" description="چند لوپ و ریتم سینک‌شده برای شنیدن رنگ اصلی پک قبل از خرید." tracks={demoTracks} />
          )}

          {activeTab === "publishedTracks" && publishedTracks[0] && (
            <AudioLayerMixer
              baseTrack={publishedTracks[0]}
              layers={demoTracks}
              title="میکسر تست صدا روی موزیک اصلی"
              description="موزیک اصلی را پخش کن و از لیست پایین هر ریتم یا لوپ را روشن کن تا ترکیب آن را روی همان موزیک بشنوی."
              accent="#7ddc9a"
            />
          )}

          {activeTab === "curriculum" && (
            <div><span className="eyebrow">مسیر یادگیری</span><div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-black">سرفصل‌های این دوره</h2><p className="mt-2 text-xs leading-7 text-[var(--muted)]">جلسه‌ها به‌ترتیب چیده شده‌اند تا قدم‌به‌قدم از شناخت محصول به اجرای یک پروژه واقعی برسی.</p></div><span className="w-fit rounded-full bg-[var(--soft)] px-3 py-2 text-[10px] font-bold text-[var(--muted)]">{includes.length.toLocaleString("fa-IR")} فصل کاربردی</span></div>
              <div className="grid gap-3 sm:grid-cols-2">{includes.map((item, index) => <div key={item} className="group flex items-center gap-4 rounded-[20px] border border-black/6 bg-[var(--soft)] p-4 transition hover:border-[#8dbb49]/35 hover:bg-[var(--card)]"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--card)] text-xs font-black text-[#648a31] transition group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)]">{(index + 1).toLocaleString("fa-IR")}</span><div><strong className="text-xs">{item}</strong><span className="mt-1 block text-[9px] text-[var(--muted)]">ویدئو، تمرین و فایل‌های همراه</span></div></div>)}</div>
            </div>
          )}

          {activeTab === "studentFeedback" && (
            <div>
              <span className="eyebrow">بازخورد هنرجو</span>
              <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div><h2 className="text-2xl font-black">نظر هنرجوها بعد از استفاده از این مسیر</h2><p className="mt-2 text-xs leading-7 text-[var(--muted)]">این بخش برای نمایش تجربه واقعی هنرجوها، حس مسیر یادگیری و نتیجه‌ای است که از محصول یا دوره گرفته‌اند.</p></div>
                <span className="w-fit rounded-full bg-[var(--soft)] px-3 py-2 text-[10px] font-bold text-[var(--muted)]">بازخوردهای منتخب</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["مسیر تمرین واضح بود", "صداها سریع وارد پروژه شدند", "نتیجه برای شروع حرفه‌ای‌تر شد"].map((item, index) => (
                  <article key={item} className="neon-hover rounded-[22px] border border-black/6 bg-[var(--soft)] p-4">
                    <span className="grid size-10 place-items-center rounded-2xl bg-[var(--card)] text-[10px] font-black text-[#648a31]">{(index + 1).toLocaleString("fa-IR")}</span>
                    <h3 className="mt-5 text-xs font-black leading-6">{item}</h3>
                    <p className="mt-2 text-[10px] leading-6 text-[var(--muted)]">متن کوتاه بازخورد، نام هنرجو و نتیجه‌ای که از تمرین یا استفاده از محصول گرفته در این بخش قرار می‌گیرد.</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "studentWorks" && (
            <div>
              <span className="eyebrow">نمونه‌کار هنرجو</span>
              <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div><h2 className="text-2xl font-black">خروجی‌هایی که با این محصول ساخته شده‌اند</h2><p className="mt-2 text-xs leading-7 text-[var(--muted)]">اینجا جای نمایش نمونه‌کارهای واقعی هنرجوها یا خریدارهاست؛ از اتودهای کوتاه تا موزیک کامل ساخته‌شده با همین پک یا دوره.</p></div>
                <span className="w-fit rounded-full bg-[var(--soft)] px-3 py-2 text-[10px] font-bold text-[var(--muted)]">قابل اتصال به پنل آپلود</span>
              </div>
              <div className="space-y-2">
                {publishedTracks.map((track, index) => {
                  const artists = ["آرمان نادری", "کیان رستمی", "رها منصوری"];
                  const artist = artists[index % artists.length];
                  const progress = studentProgress[track.id];
                  const percent = progress?.duration ? Math.min(100, (progress.currentTime / progress.duration) * 100) : 0;
                  const active = studentPlayingId === track.id;
                  return (
                    <article key={track.id} className="rounded-[20px] border border-black/6 bg-[var(--soft)] p-3 transition hover:border-[#8dbb49]/35 hover:bg-[var(--card)]">
                      <audio
                        ref={(node) => {
                          studentAudioRefs.current[track.id] = node;
                        }}
                        src={track.src}
                        preload="metadata"
                        onLoadedMetadata={(event) => updateStudentProgress(track.id, event.currentTarget)}
                        onTimeUpdate={(event) => updateStudentProgress(track.id, event.currentTarget)}
                        onPause={() => setStudentPlayingId((current) => (current === track.id ? null : current))}
                        onPlay={() => setStudentPlayingId(track.id)}
                        onEnded={() => setStudentPlayingId(null)}
                      />
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => toggleStudentWork(track.id)} className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--acid)] text-[var(--ink)] transition active:scale-95" aria-label={active ? "توقف نمونه‌کار" : "پخش نمونه‌کار"}>
                          {active ? <Pause className="size-4" fill="currentColor" /> : <Play className="mr-0.5 size-4" fill="currentColor" />}
                        </button>
                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--card)] text-xs font-black text-[#648a31]">{artist.slice(0, 1)}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="min-w-0">
                              <strong className="block truncate text-xs">{track.title}</strong>
                              <small className="mt-1 block truncate text-[9px] font-bold text-[var(--muted)]">{artist} · هنرجوی معاد استودیو</small>
                            </span>
                            <span dir="ltr" className="shrink-0 text-[9px] font-bold text-[#648a31]">{track.bpm ?? "68 / 115"}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <div
                              role="slider"
                              aria-label={`زمان پخش ${track.title}`}
                              aria-valuemin={0}
                              aria-valuemax={Math.round(progress?.duration || 0)}
                              aria-valuenow={Math.round(progress?.currentTime || 0)}
                              tabIndex={0}
                              onPointerDown={(event) => seekStudentWork(track.id, event)}
                              onPointerMove={(event) => {
                                if (event.buttons === 1) seekStudentWork(track.id, event);
                              }}
                              className="relative h-2 flex-1 cursor-pointer touch-none overflow-hidden rounded-full bg-black/6"
                              dir="ltr"
                            >
                              <span className="absolute inset-y-0 left-0 rounded-full bg-[var(--acid)]" style={{ width: `${percent}%` }} />
                            </div>
                            <span dir="ltr" className="w-20 shrink-0 text-left font-mono text-[9px] text-[var(--muted)]">
                              {formatTrackTime(progress?.currentTime || 0)} / {formatTrackTime(progress?.duration || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
              <form onSubmit={submitReview} className="rounded-[24px] bg-[var(--soft)] p-5 sm:p-6"><h2 className="text-lg font-black">نظر خودت را ثبت کن</h2><p className="mt-2 text-[10px] leading-6 text-[var(--muted)]">تجربه تو به انتخاب بهتر هنرمندان دیگر کمک می‌کند.</p><label className="mt-5 block text-[10px] font-bold">نام و نام خانوادگی<input name="name" required className="form-input mt-2" placeholder="نام شما" /></label><div className="mt-4"><span className="block text-[10px] font-bold">امتیاز شما</span><div className="mt-2 flex gap-1" dir="ltr">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" aria-label={`${value.toLocaleString("fa-IR")} ستاره`} aria-pressed={value <= rating} onClick={() => setRating(value)} className="grid size-9 place-items-center rounded-xl bg-[var(--card)] transition hover:-translate-y-0.5"><Star className={`size-4 ${value <= rating ? "fill-[var(--acid)] text-[#749f37]" : "text-[var(--muted)]/40"}`} /></button>)}</div></div><label className="mt-4 block text-[10px] font-bold">متن نظر<textarea name="review" required rows={4} className="form-input mt-2 h-auto resize-none py-3 leading-7" placeholder="تجربه‌ات از این محصول را بنویس..." /></label><button type="submit" className="primary-button mt-4 w-full"><Send className="size-4" />ثبت نظر</button>{submitted && <p role="status" className="mt-3 text-center text-[10px] font-bold text-[#648a31]">نظر شما با موفقیت ثبت شد.</p>}</form>
              <div><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-black">نظر کاربران</h3><span className="text-[10px] text-[var(--muted)]">{reviews.length.toLocaleString("fa-IR")} دیدگاه</span></div><div className="space-y-3">{reviews.map((review) => <article key={review.id} className="rounded-[22px] border border-black/6 bg-[var(--soft)] p-5"><div className="flex items-start justify-between gap-3"><div><strong className="text-xs">{review.name}</strong><span className="mt-1 block text-[9px] text-[var(--muted)]">{review.date}</span></div><div className="flex" dir="ltr">{[1, 2, 3, 4, 5].map((value) => <Star key={value} className={`size-3 ${value <= review.rating ? "fill-[var(--acid)] text-[#749f37]" : "text-[var(--muted)]/25"}`} />)}</div></div><p className="mt-4 text-xs leading-7 text-[var(--muted)]">{review.text}</p></article>)}</div></div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
