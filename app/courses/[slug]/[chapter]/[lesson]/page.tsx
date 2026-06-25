import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseLearning from "@/components/course-learning";
import { courses } from "@/lib/data";

type Props = { params: Promise<{ slug: string; chapter: string; lesson: string }> };

export function generateStaticParams() {
  return courses.filter((course) => course.isFree).flatMap((course) => course.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ slug: course.slug, chapter: chapter.id, lesson: lesson.id }))));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapter: chapterId, lesson: lessonId } = await params;
  const course = courses.find((item) => item.slug === slug && item.isFree);
  const chapter = course?.chapters.find((item) => item.id === chapterId);
  const lesson = chapter?.lessons.find((item) => item.id === lessonId);
  return course && chapter && lesson ? {
    title: `${lesson.title} | آموزش رایگان ${course.title}`,
    description: lesson.description,
    alternates: { canonical: `/courses/${course.slug}/${chapter.id}/${lesson.id}` },
    openGraph: { title: lesson.title, description: lesson.description, type: "video.episode" },
  } : {};
}

export default async function CourseLessonPage({ params }: Props) {
  const { slug, chapter: chapterId, lesson: lessonId } = await params;
  const course = courses.find((item) => item.slug === slug && item.isFree);
  const chapter = course?.chapters.find((item) => item.id === chapterId);
  const lesson = chapter?.lessons.find((item) => item.id === lessonId);
  if (!course || !chapter || !lesson) notFound();

  return (
    <div className="page-wrap pb-8 lg:pb-16">
      <nav className="mb-5 mt-7 flex flex-wrap items-center gap-2 text-[10px] text-[var(--muted)]" aria-label="مسیر صفحه">
        <Link href="/courses">دوره‌های رایگان</Link><ChevronLeft className="size-3" /><Link href={`/courses/${course.slug}`}>{course.title}</Link><ChevronLeft className="size-3" /><Link href={`/courses/${course.slug}/${chapter.id}`}>{chapter.title}</Link><ChevronLeft className="size-3" /><span>{lesson.title}</span>
      </nav>
      <CourseLearning course={course} activeChapterId={chapter.id} activeLessonId={lesson.id} />
    </div>
  );
}
