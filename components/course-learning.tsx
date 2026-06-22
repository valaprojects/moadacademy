"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock3, FolderTree, ListVideo, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { defaultVideoTimeline, getCourseCategory, getCourseLessonHref, type Course } from "@/lib/data";
import ProductVideo from "./product-video";

type CourseLearningProps = {
  course: Course;
  activeChapterId?: string;
  activeLessonId?: string;
};

export default function CourseLearning({ course, activeChapterId, activeLessonId }: CourseLearningProps) {
  const category = getCourseCategory(course.category);
  const activeChapter = course.chapters.find((chapter) => chapter.id === activeChapterId);
  const activeLesson = activeChapter?.lessons.find((lesson) => lesson.id === activeLessonId);
  const [openChapterId, setOpenChapterId] = useState<string | null>(activeChapter?.id ?? course.chapters[0]?.id ?? null);
  const lessons = course.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ ...lesson, chapterId: chapter.id, chapterTitle: chapter.title })));
  const activeLessonIndex = activeLesson ? lessons.findIndex((lesson) => lesson.id === activeLesson.id && lesson.chapterId === activeChapter?.id) : -1;
  const previousLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex >= 0 && activeLessonIndex < lessons.length - 1 ? lessons[activeLessonIndex + 1] : null;
  const firstChapter = course.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  const pageTitle = activeLesson?.title ?? activeChapter?.title ?? course.title;
  const pageDescription = activeLesson?.description ?? activeChapter?.description ?? course.description;

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[310px_minmax(0,1fr)]">
      <aside className="overflow-hidden rounded-[28px] border border-black/6 bg-[var(--card)] p-4 shadow-[0_18px_55px_rgba(17,22,14,.06)] lg:sticky lg:top-24">
        <Link href={`/courses/${course.slug}`} className="group mb-4 block rounded-[22px] bg-[var(--ink)] p-4 text-white transition hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/8" style={{ color: course.accent }}><FolderTree className="size-5" /></span>
            <div className="min-w-0"><span className="text-[8px] font-bold" style={{ color: course.accent }}>موضوع اصلی دوره</span><h2 className="mt-1 text-sm font-black leading-6">{course.title}</h2><p className="mt-1 text-[8px] text-white/45">{category?.title}</p></div>
          </div>
        </Link>

        <div className="mb-4 flex items-center justify-between rounded-2xl bg-[var(--soft)] px-3 py-3 text-[9px] text-[var(--muted)]"><span>{course.lessons.toLocaleString("fa-IR")} قسمت رایگان</span><span>{course.duration}</span></div>

        <nav className="space-y-2" aria-label={`فصل‌ها و قسمت‌های ${course.title}`}>
          {course.chapters.map((chapter, chapterIndex) => {
            const open = openChapterId === chapter.id;
            const chapterActive = chapter.id === activeChapter?.id;
            return (
              <section key={chapter.id} className={`overflow-hidden rounded-2xl border transition ${open ? "border-[#87b248]/25 bg-[var(--soft)]" : "border-transparent bg-[var(--soft)]/60"}`}>
                <div className="flex items-center gap-1 px-2 py-2">
                  <Link href={`/courses/${course.slug}/${chapter.id}`} aria-current={chapterActive && !activeLesson ? "page" : undefined} className={`min-w-0 flex-1 rounded-xl px-2 py-2 text-right transition ${chapterActive && !activeLesson ? "bg-[var(--acid)] text-[var(--ink)]" : "hover:bg-[var(--card)]"}`}>
                    <small className={`block text-[8px] ${chapterActive && !activeLesson ? "text-black/55" : "text-[var(--muted)]"}`}>فصل {(chapterIndex + 1).toLocaleString("fa-IR")}</small><strong className="mt-1 block text-[10px] leading-5">{chapter.title}</strong>
                  </Link>
                  <button type="button" aria-label={`${open ? "بستن" : "بازکردن"} ${chapter.title}`} aria-expanded={open} onClick={() => setOpenChapterId(open ? null : chapter.id)} className="grid size-9 shrink-0 place-items-center rounded-xl text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)]"><ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} /></button>
                </div>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .24 }} className="overflow-hidden">
                      <div className="space-y-1 border-t border-black/5 p-2">
                        {chapter.lessons.map((lesson, lessonIndex) => {
                          const active = lesson.id === activeLesson?.id && chapter.id === activeChapter?.id;
                          return (
                            <Link key={lesson.id} href={getCourseLessonHref(course.slug, chapter.id, lesson.id)} aria-current={active ? "page" : undefined} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-right transition ${active ? "text-[var(--ink)] shadow-sm" : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"}`} style={active ? { background: course.accent } : undefined}>
                              <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${active ? "bg-black/10" : "bg-[var(--card)]"}`}>{active ? <Play className="size-3" fill="currentColor" /> : <span className="text-[8px] font-black">{(lessonIndex + 1).toLocaleString("fa-IR")}</span>}</span>
                              <span className="min-w-0 flex-1"><strong className="block text-[9px] leading-5">{lesson.title}</strong><small className={`mt-1 flex items-center gap-1 text-[8px] ${active ? "text-black/55" : "text-[var(--muted)]"}`}><Clock3 className="size-2.5" />{lesson.duration}</small></span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}
        </nav>
        <div className="mt-4 rounded-2xl border border-black/6 px-3 py-3 text-[9px] leading-5 text-[var(--muted)]">تمام قسمت‌ها رایگان‌اند و هر صفحه آدرس مستقل و قابل اشتراک‌گذاری دارد.</div>
      </aside>

      <main className="min-w-0">
        <header className="mb-5 rounded-[28px] border border-black/6 bg-[var(--card)] p-6 sm:p-8">
          <span className="eyebrow"><CheckCircle2 className="size-3" />{activeLesson ? "قسمت رایگان دوره" : activeChapter ? "فصل دوره" : "دوره رایگان"}</span>
          <h1 className="text-2xl font-black leading-10 sm:text-3xl">{pageTitle}</h1>
          <p className="mt-3 max-w-3xl text-xs leading-7 text-[var(--muted)] sm:text-sm">{pageDescription}</p>
          {(activeChapter || activeLesson) && <div className="mt-5 flex flex-wrap items-center gap-2 text-[9px] text-[var(--muted)]"><Link href={`/courses/${course.slug}`} className="hover:text-[var(--foreground)]">{course.title}</Link>{activeChapter && <><span>/</span><Link href={`/courses/${course.slug}/${activeChapter.id}`} className="hover:text-[var(--foreground)]">{activeChapter.title}</Link></>}{activeLesson && <><span>/</span><span className="text-[var(--foreground)]">{activeLesson.title}</span></>}</div>}
        </header>

        {activeLesson && activeChapter ? (
          <>
            <ProductVideo title={activeLesson.title} accent={course.accent} compact titleTag="p" menuLabel="بخش‌های مهم ویدئو" timeline={activeLesson.timeline ?? defaultVideoTimeline} videos={[{ id: activeLesson.id, title: activeChapter.title, caption: activeLesson.description, src: activeLesson.videoSrc }]} />
            <section className="mt-5 rounded-[28px] border border-black/6 bg-[var(--card)] p-6 sm:p-8">
              <div className="flex items-start gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><BookOpen className="size-5" /></span><div><span className="text-[9px] font-bold text-[#69943b]">توضیحات این قسمت</span><h2 className="mt-1 text-xl font-black">آنچه در این قسمت یاد می‌گیری</h2></div></div>
              <p className="mt-5 text-sm leading-8 text-[var(--muted)]">{activeLesson.description}</p>
              <div className="mt-6 flex flex-col gap-2 border-t border-black/6 pt-5 sm:flex-row sm:justify-between">
                {previousLesson ? <Link href={getCourseLessonHref(course.slug, previousLesson.chapterId, previousLesson.id)} className="secondary-button"><ArrowRight className="size-4" />قسمت قبلی</Link> : <span />}
                {nextLesson ? <Link href={getCourseLessonHref(course.slug, nextLesson.chapterId, nextLesson.id)} className="primary-button">قسمت بعدی<ArrowLeft className="size-4" /></Link> : <Link href={`/courses/${course.slug}`} className="primary-button">بازگشت به صفحه دوره<ArrowLeft className="size-4" /></Link>}
              </div>
            </section>
          </>
        ) : activeChapter ? (
          <section className="rounded-[28px] border border-black/6 bg-[var(--card)] p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><ListVideo className="size-5" /></span><div><span className="text-[9px] font-bold text-[#69943b]">قسمت‌های این فصل</span><h2 className="mt-1 text-xl font-black">یادگیری این فصل را به‌ترتیب ادامه بده</h2></div></div>
            <div className="grid gap-3 sm:grid-cols-2">{activeChapter.lessons.map((lesson, index) => <Link key={lesson.id} href={getCourseLessonHref(course.slug, activeChapter.id, lesson.id)} className="neon-hover group rounded-[22px] border border-black/6 bg-[var(--soft)] p-5"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-xl bg-[var(--card)] text-[10px] font-black">{(index + 1).toLocaleString("fa-IR")}</span><span className="flex items-center gap-1 text-[9px] text-[var(--muted)]"><Clock3 className="size-3" />{lesson.duration}</span></div><h3 className="mt-5 text-sm font-black leading-7 group-hover:text-[#5d8731]">{lesson.title}</h3><p className="mt-2 text-[10px] leading-6 text-[var(--muted)]">{lesson.description}</p><span className="mt-5 flex items-center gap-2 text-[10px] font-black">تماشای رایگان <ArrowLeft className="size-3 transition group-hover:-translate-x-1" /></span></Link>)}</div>
          </section>
        ) : (
          <>
            <section className="relative overflow-hidden rounded-[30px] bg-[var(--ink)] p-7 text-white sm:p-10"><div className="hero-grid absolute inset-0 opacity-25" /><div className="relative"><span className="text-[10px] font-bold" style={{ color: course.accent }}>{category?.title}</span><h2 className="mt-3 max-w-2xl text-2xl font-black leading-10">مسیر کامل این دوره، از شروع تا نتیجه</h2><p className="mt-4 max-w-2xl text-sm leading-8 text-white/55">{course.description}</p>{firstChapter && firstLesson && <Link href={getCourseLessonHref(course.slug, firstChapter.id, firstLesson.id)} className="mt-7 inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-xs font-black text-[var(--ink)]" style={{ background: course.accent }}><Play className="size-4" fill="currentColor" />شروع اولین قسمت</Link>}</div></section>
            <section className="mt-5 rounded-[28px] border border-black/6 bg-[var(--card)] p-6 sm:p-8"><span className="eyebrow">نقشه دوره</span><h2 className="text-xl font-black">فصل‌ها و قسمت‌های دوره</h2><div className="mt-6 space-y-3">{course.chapters.map((chapter, index) => <Link key={chapter.id} href={`/courses/${course.slug}/${chapter.id}`} className="neon-hover flex items-center gap-4 rounded-[22px] bg-[var(--soft)] p-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--card)] text-xs font-black">{(index + 1).toLocaleString("fa-IR")}</span><span className="min-w-0 flex-1"><strong className="block text-sm">{chapter.title}</strong><small className="mt-1 block text-[9px] text-[var(--muted)]">{chapter.lessons.length.toLocaleString("fa-IR")} قسمت · {chapter.description}</small></span><ArrowLeft className="size-4 shrink-0 text-[var(--muted)]" /></Link>)}</div></section>
          </>
        )}
      </main>
    </div>
  );
}
