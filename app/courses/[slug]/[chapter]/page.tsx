import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseLearning from "@/components/course-learning";
import { courses } from "@/lib/data";

type Props = { params: Promise<{ slug: string; chapter: string }> };

export function generateStaticParams() {
  return courses.filter((course) => course.isFree).flatMap((course) => course.chapters.map((chapter) => ({ slug: course.slug, chapter: chapter.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapter: chapterId } = await params;
  const course = courses.find((item) => item.slug === slug && item.isFree);
  const chapter = course?.chapters.find((item) => item.id === chapterId);
  return course && chapter ? {
    title: `${chapter.title} | ${course.title}`,
    description: chapter.description,
    alternates: { canonical: `/courses/${course.slug}/${chapter.id}` },
  } : {};
}

export default async function CourseChapterPage({ params }: Props) {
  const { slug, chapter: chapterId } = await params;
  const course = courses.find((item) => item.slug === slug && item.isFree);
  const chapter = course?.chapters.find((item) => item.id === chapterId);
  if (!course || !chapter) notFound();

  return (
    <div className="page-wrap pb-28 lg:pb-16">
      <nav className="mb-5 mt-7 flex flex-wrap items-center gap-2 text-[10px] text-[var(--muted)]" aria-label="مسیر صفحه">
        <Link href="/courses">دوره‌های رایگان</Link><ChevronLeft className="size-3" /><Link href={`/courses/${course.slug}`}>{course.title}</Link><ChevronLeft className="size-3" /><span>{chapter.title}</span>
      </nav>
      <CourseLearning course={course} activeChapterId={chapter.id} />
    </div>
  );
}
