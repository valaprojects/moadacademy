"use client";

import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock3, Download, FolderTree, ListVideo, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { defaultVideoTimeline, getCourseCategory, getCourseLessonHref, type Course } from "@/lib/data";
import MobileSheetDock from "./mobile-sheet";
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
  const lessons = course.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ ...lesson, chapterId: chapter.id, chapterTitle: chapter.title })));
  const activeLessonIndex = activeLesson ? lessons.findIndex((lesson) => lesson.id === activeLesson.id && lesson.chapterId === activeChapter?.id) : -1;
  const previousLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex >= 0 && activeLessonIndex < lessons.length - 1 ? lessons[activeLessonIndex + 1] : null;
  const firstChapter = course.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  const pageTitle = activeLesson?.title ?? activeChapter?.title ?? course.title;
  const pageDescription = activeLesson?.description ?? activeChapter?.description ?? course.description;
  const [openDownloadGroup, setOpenDownloadGroup] = useState("practice");
  const downloadGroups = [
    {
      id: "practice",
      title: "فایل‌های تمرین دوره",
      caption: "پروژه، MIDI و فایل‌های همراه جلسه‌ها",
      items: [
        { title: "پروژه تمرینی دوره", size: "۱۸ مگابایت", href: `/downloads/${course.slug}/practice-project.zip` },
        { title: "MIDI و لوپ‌های تمرین", size: "۱۲ مگابایت", href: `/downloads/${course.slug}/midi-loops.zip` },
      ],
    },
    {
      id: "tools",
      title: "ابزارها و فایل‌های رایگان",
      caption: "محل قرارگیری VST، سمپل یا منابع حجیم",
      items: [
        { title: "لیست ابزارهای پیشنهادی", size: "PDF", href: `/downloads/${course.slug}/tools-list.pdf` },
        { title: "فایل‌های حجیم/وی‌اس‌تی‌ها", size: "لینک خارجی", href: `/downloads/${course.slug}/free-tools.txt` },
      ],
    },
  ];

  const downloadCard = (
    <section className="rounded-[24px] border border-black/6 bg-[var(--card)] p-3 shadow-[0_18px_55px_rgba(17,22,14,.06)] sm:rounded-[28px] sm:p-4">
      <Link href={`/courses/${course.slug}`} className="group mb-3 block rounded-[22px] bg-[var(--ink)] p-4 text-white transition hover:-translate-y-0.5">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/8" style={{ color: course.accent }}><FolderTree className="size-5" /></span>
          <div className="min-w-0"><span className="text-[8px] font-bold" style={{ color: course.accent }}>موضوع اصلی دوره</span><h2 className="mt-1 text-sm font-black leading-6">{course.title}</h2><p className="mt-1 text-[8px] text-white/45">{category?.title}</p></div>
        </div>
      </Link>
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="grid size-9 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><Download className="size-4" /></span>
        <div><span className="block text-[9px] font-bold text-[#6c9538]">دانلودهای رایگان</span><h2 className="text-sm font-black">فایل‌های همراه دوره</h2></div>
      </div>
      <div className="space-y-2">
        {downloadGroups.map((group) => {
          const open = openDownloadGroup === group.id;
          return (
            <div key={group.id} className="overflow-hidden rounded-2xl bg-[var(--soft)]">
              <button type="button" onClick={() => setOpenDownloadGroup(open ? "" : group.id)} aria-expanded={open} className="flex w-full items-center gap-3 px-3 py-3 text-right">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--card)] text-[#668d34]"><Download className="size-3.5" /></span>
                <span className="min-w-0 flex-1"><strong className="block text-[10px]">{group.title}</strong><small className="mt-1 block truncate text-[8px] text-[var(--muted)]">{group.caption}</small></span>
                <ChevronDown className={`size-4 shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <div className="space-y-1.5 border-t border-black/5 p-2">
                  {group.items.map((item) => <a key={item.title} href={item.href} download className="flex items-center justify-between gap-3 rounded-xl bg-[var(--card)] px-3 py-2.5 text-[9px] font-bold transition hover:bg-[var(--acid)] hover:text-[var(--ink)]"><span className="truncate">{item.title}</span><span className="shrink-0 text-[8px] opacity-60">{item.size}</span></a>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );

  const chaptersCard = (
    <section className="rounded-[24px] border border-black/6 bg-[var(--card)] p-3 shadow-[0_18px_55px_rgba(17,22,14,.06)] sm:rounded-[28px] sm:p-4">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="grid size-10 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><ListVideo className="size-4" /></span>
        <div><span className="block text-[9px] font-bold text-[#6c9538]">مسیر دوره</span><h2 className="text-sm font-black">فصل‌ها و قسمت‌ها</h2></div>
      </div>
      <nav className="space-y-1.5" aria-label={`فصل‌ها و قسمت‌های ${course.title}`}>
        {lessons.map((lesson, index) => {
          const active = lesson.id === activeLesson?.id && lesson.chapterId === activeChapter?.id;
          return (
            <Link key={`${lesson.chapterId}-${lesson.id}`} href={getCourseLessonHref(course.slug, lesson.chapterId, lesson.id)} aria-current={active ? "page" : undefined} className={`flex items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-right transition ${active ? "text-[var(--ink)] shadow-sm" : "bg-[var(--soft)]/80 text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--foreground)]"}`} style={active ? { background: course.accent } : undefined}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${active ? "bg-black/10" : "bg-[var(--card)]"}`}>{active ? <Play className="size-3" fill="currentColor" /> : <span className="text-[8px] font-black">{(index + 1).toLocaleString("fa-IR")}</span>}</span>
              <span className="min-w-0 flex-1"><strong className="block truncate text-[9px] leading-5">{lesson.title}</strong><small className={`mt-0.5 flex items-center gap-1 text-[8px] ${active ? "text-black/55" : "text-[var(--muted)]"}`}><Clock3 className="size-2.5" />{lesson.duration} · {lesson.chapterTitle}</small></span>
            </Link>
          );
        })}
      </nav>
    </section>
  );

  return (
    <div className="grid items-start gap-4 pb-20 lg:grid-cols-[310px_minmax(0,1fr)] lg:gap-5 lg:pb-0">
      <aside className="hidden space-y-4 lg:sticky lg:top-24 lg:block">
        {downloadCard}
        {chaptersCard}
      </aside>
      <MobileSheetDock
        items={[
          { id: "chapters", label: "سرفصل‌ها", title: "فصل‌ها و قسمت‌ها", icon: ListVideo, content: chaptersCard },
          { id: "downloads", label: "دانلودها", title: "دانلودهای رایگان", icon: Download, content: downloadCard },
        ]}
      />

      <main className="min-w-0">
        <header id="course-overview" className="mb-4 scroll-mt-28 rounded-[24px] border border-black/6 bg-[var(--card)] p-4 sm:p-8 lg:mb-5 lg:rounded-[28px]">
          <span className="eyebrow"><CheckCircle2 className="size-3" />{activeLesson ? "قسمت رایگان دوره" : activeChapter ? "فصل دوره" : "دوره رایگان"}</span>
          <h1 className="text-[1.45rem] font-black leading-[1.55] tracking-[-.04em] sm:text-3xl">{pageTitle}</h1>
          <p className="mt-3 max-w-3xl text-[12px] leading-7 text-[var(--muted)] sm:text-sm">{pageDescription}</p>
          {(activeChapter || activeLesson) && <div className="mt-4 flex flex-wrap items-center gap-2 text-[9px] text-[var(--muted)] sm:mt-5"><Link href={`/courses/${course.slug}`} className="hover:text-[var(--foreground)]">{course.title}</Link>{activeChapter && <><span>/</span><Link href={`/courses/${course.slug}/${activeChapter.id}`} className="hover:text-[var(--foreground)]">{activeChapter.title}</Link></>}{activeLesson && <><span>/</span><span className="text-[var(--foreground)]">{activeLesson.title}</span></>}</div>}
        </header>

        {activeLesson && activeChapter ? (
          <>
            <div id="course-video" className="scroll-mt-28"><ProductVideo title={activeLesson.title} accent={course.accent} compact titleTag="p" menuLabel="بخش‌های مهم ویدئو" timeline={activeLesson.timeline ?? defaultVideoTimeline} videos={[{ id: activeLesson.id, title: activeChapter.title, caption: activeLesson.description, src: activeLesson.videoSrc }]} /></div>
            <section id="course-description" className="mt-4 scroll-mt-28 rounded-[24px] border border-black/6 bg-[var(--card)] p-4 sm:p-8 lg:mt-5 lg:rounded-[28px]">
              <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34] sm:size-11"><BookOpen className="size-5" /></span><div><span className="text-[9px] font-bold text-[#69943b]">توضیحات این قسمت</span><h2 className="mt-1 text-lg font-black sm:text-xl">آنچه در این قسمت یاد می‌گیری</h2></div></div>
              <p className="mt-5 text-[13px] leading-8 text-[var(--muted)] sm:text-sm">{activeLesson.description}</p>
              <div className="mt-6 flex flex-col gap-2 border-t border-black/6 pt-5 sm:flex-row sm:justify-between">
                {previousLesson ? <Link href={getCourseLessonHref(course.slug, previousLesson.chapterId, previousLesson.id)} className="secondary-button"><ArrowRight className="size-4" />قسمت قبلی</Link> : <span />}
                {nextLesson ? <Link href={getCourseLessonHref(course.slug, nextLesson.chapterId, nextLesson.id)} className="primary-button">قسمت بعدی<ArrowLeft className="size-4" /></Link> : <Link href={`/courses/${course.slug}`} className="primary-button">بازگشت به صفحه دوره<ArrowLeft className="size-4" /></Link>}
              </div>
            </section>
          </>
        ) : activeChapter ? (
          <section id="course-lessons" className="scroll-mt-28 rounded-[24px] border border-black/6 bg-[var(--card)] p-4 sm:p-6 lg:rounded-[28px]">
            <div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><ListVideo className="size-5" /></span><div><span className="text-[9px] font-bold text-[#69943b]">قسمت‌های این فصل</span><h2 className="mt-1 text-base font-black sm:text-lg">یادگیری این فصل را ادامه بده</h2></div></div>
            <div className="grid gap-2 sm:grid-cols-2">{activeChapter.lessons.map((lesson, index) => <Link key={lesson.id} href={getCourseLessonHref(course.slug, activeChapter.id, lesson.id)} className="neon-hover group flex items-center gap-3 rounded-[18px] border border-black/6 bg-[var(--soft)] p-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--card)] text-[10px] font-black">{(index + 1).toLocaleString("fa-IR")}</span><span className="min-w-0 flex-1"><strong className="block truncate text-xs font-black group-hover:text-[#5d8731]">{lesson.title}</strong><small className="mt-1 flex items-center gap-1 text-[8px] text-[var(--muted)]"><Clock3 className="size-3" />{lesson.duration}</small></span><ArrowLeft className="size-3 shrink-0 text-[var(--muted)] transition group-hover:-translate-x-1" /></Link>)}</div>
          </section>
        ) : (
          <>
            <section id="course-start" className="relative scroll-mt-28 overflow-hidden rounded-[26px] bg-[var(--ink)] p-5 text-white sm:p-10 lg:rounded-[30px]"><div className="hero-grid absolute inset-0 opacity-25" /><div className="relative"><span className="text-[10px] font-bold" style={{ color: course.accent }}>{category?.title}</span><h2 className="mt-3 max-w-2xl text-[1.45rem] font-black leading-[1.55] sm:text-2xl sm:leading-10">مسیر کامل این دوره، از شروع تا نتیجه</h2><p className="mt-4 max-w-2xl text-[13px] leading-8 text-white/55 sm:text-sm">{course.description}</p>{firstChapter && firstLesson && <Link href={getCourseLessonHref(course.slug, firstChapter.id, firstLesson.id)} className="mt-6 inline-flex h-11 items-center gap-2 rounded-2xl px-5 text-[11px] font-black text-[var(--ink)] sm:mt-7 sm:h-12 sm:px-6 sm:text-xs" style={{ background: course.accent }}><Play className="size-4" fill="currentColor" />شروع اولین قسمت</Link>}</div></section>
            <section id="course-map" className="mt-4 scroll-mt-28 rounded-[24px] border border-black/6 bg-[var(--card)] p-4 sm:p-8 lg:mt-5 lg:rounded-[28px]"><span className="eyebrow">نقشه دوره</span><h2 className="text-lg font-black sm:text-xl">فصل‌ها و قسمت‌های دوره</h2><div className="mt-5 space-y-2 sm:mt-6">{lessons.map((lesson, index) => <Link key={`${lesson.chapterId}-${lesson.id}`} href={getCourseLessonHref(course.slug, lesson.chapterId, lesson.id)} className="neon-hover flex items-center gap-3 rounded-[18px] bg-[var(--soft)] p-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--card)] text-[10px] font-black">{(index + 1).toLocaleString("fa-IR")}</span><span className="min-w-0 flex-1"><strong className="block truncate text-xs">{lesson.title}</strong><small className="mt-1 block truncate text-[8px] text-[var(--muted)]">{lesson.chapterTitle} · {lesson.duration}</small></span><ArrowLeft className="size-3 shrink-0 text-[var(--muted)]" /></Link>)}</div></section>
          </>
        )}
      </main>
    </div>
  );
}
