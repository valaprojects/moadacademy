"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CheckCircle2, ChevronDown, Clock3, ListVideo, Play, SkipBack, SkipForward } from "lucide-react";
import { useRef, useState } from "react";
import { defaultVideoTimeline, type Course } from "@/lib/data";
import ProductVideo from "./product-video";

export default function CourseLearning({ course }: { course: Course }) {
  const allLessons = course.chapters.flatMap((chapter) => chapter.lessons);
  const [activeId, setActiveId] = useState(allLessons[0]?.id ?? "");
  const [openChapterId, setOpenChapterId] = useState<string | null>(course.chapters[0]?.id ?? null);
  const playerTop = useRef<HTMLDivElement>(null);
  const activeIndex = Math.max(0, allLessons.findIndex((lesson) => lesson.id === activeId));
  const activeLesson = allLessons[activeIndex];

  const selectLesson = (lessonId: string) => {
    setActiveId(lessonId);
    window.requestAnimationFrame(() => playerTop.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  if (!activeLesson) return null;

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[310px_minmax(0,1fr)]">
      <aside className="overflow-hidden rounded-[28px] border border-black/6 bg-[var(--card)] p-4 shadow-[0_18px_55px_rgba(17,22,14,.06)] lg:sticky lg:top-24">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="grid size-11 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><ListVideo className="size-5" /></span>
          <div><span className="text-[9px] font-bold text-[#679139]">محتوای دوره</span><h2 className="mt-0.5 text-sm font-black">فصل‌ها و قسمت‌ها</h2></div>
        </div>
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-[var(--soft)] px-3 py-3 text-[9px] text-[var(--muted)]"><span>{course.lessons.toLocaleString("fa-IR")} قسمت</span><span>{course.duration}</span></div>

        <div className="space-y-2">
          {course.chapters.map((chapter, chapterIndex) => {
            const open = openChapterId === chapter.id;
            return (
              <section key={chapter.id} className={`overflow-hidden rounded-2xl border transition ${open ? "border-[#87b248]/25 bg-[var(--soft)]" : "border-transparent bg-[var(--soft)]/60"}`}>
                <button type="button" aria-expanded={open} onClick={() => setOpenChapterId(open ? null : chapter.id)} className="flex w-full items-center justify-between gap-3 px-3 py-3.5 text-right">
                  <span><small className="block text-[8px] text-[var(--muted)]">فصل {(chapterIndex + 1).toLocaleString("fa-IR")}</small><strong className="mt-1 block text-[10px]">{chapter.title}</strong></span>
                  <ChevronDown className={`size-4 shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .24 }} className="overflow-hidden">
                      <div className="space-y-1 border-t border-black/5 p-2">
                        {chapter.lessons.map((lesson) => {
                          const active = lesson.id === activeId;
                          return (
                            <button key={lesson.id} type="button" aria-current={active ? "true" : undefined} onClick={() => selectLesson(lesson.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-right transition ${active ? "text-[var(--ink)] shadow-sm" : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"}`} style={active ? { background: course.accent } : undefined}>
                              <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${active ? "bg-black/10" : "bg-[var(--card)]"}`}>{active ? <Play className="size-3" fill="currentColor" /> : <span className="text-[8px] font-black">{(allLessons.findIndex((item) => item.id === lesson.id) + 1).toLocaleString("fa-IR")}</span>}</span>
                              <span className="min-w-0 flex-1"><strong className="block truncate text-[9px]">{lesson.title}</strong><small className={`mt-1 flex items-center gap-1 text-[8px] ${active ? "text-black/55" : "text-[var(--muted)]"}`}><Clock3 className="size-2.5" />{lesson.duration}</small></span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/6 px-3 py-3 text-[9px] text-[var(--muted)]"><span>در حال مشاهده</span><strong className="text-[var(--foreground)]">قسمت {(activeIndex + 1).toLocaleString("fa-IR")} از {allLessons.length.toLocaleString("fa-IR")}</strong></div>
      </aside>

      <section className="min-w-0" aria-label="محتوای ویدئویی دوره">
        <header className="mb-5 rounded-[28px] border border-black/6 bg-[var(--card)] p-6 sm:p-8">
          <span className="eyebrow"><CheckCircle2 className="size-3" />دوره رایگان</span>
          <h1 className="text-2xl font-black leading-10 sm:text-3xl">{course.title}</h1>
          <p className="mt-3 max-w-3xl text-xs leading-7 text-[var(--muted)] sm:text-sm">{course.description}</p>
        </header>

        <div ref={playerTop} className="scroll-mt-24">
          <ProductVideo
            key={activeLesson.id}
            title={activeLesson.title}
            accent={course.accent}
            compact
            titleTag="p"
            menuLabel="بخش‌های مهم ویدئو"
            timeline={activeLesson.timeline ?? defaultVideoTimeline}
            videos={[{ id: activeLesson.id, title: `قسمت ${(activeIndex + 1).toLocaleString("fa-IR")}`, caption: activeLesson.description, src: activeLesson.videoSrc }]}
          />
        </div>

        <section className="mt-5 rounded-[28px] border border-black/6 bg-[var(--card)] p-6 sm:p-8">
          <div className="flex items-start gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><BookOpen className="size-5" /></span><div><span className="text-[9px] font-bold text-[#69943b]">توضیحات این قسمت</span><h2 className="mt-1 text-xl font-black">{activeLesson.title}</h2></div></div>
          <p className="mt-5 text-sm leading-8 text-[var(--muted)]">{activeLesson.description}</p>
          <div className="mt-6 flex flex-col gap-2 border-t border-black/6 pt-5 sm:flex-row sm:justify-between">
            <button type="button" disabled={activeIndex === 0} onClick={() => selectLesson(allLessons[activeIndex - 1].id)} className="secondary-button disabled:cursor-not-allowed disabled:opacity-35"><SkipForward className="size-4" />قسمت قبلی</button>
            <button type="button" disabled={activeIndex === allLessons.length - 1} onClick={() => selectLesson(allLessons[activeIndex + 1].id)} className="primary-button disabled:cursor-not-allowed disabled:opacity-35">قسمت بعدی<SkipBack className="size-4" /></button>
          </div>
        </section>
      </section>
    </div>
  );
}
