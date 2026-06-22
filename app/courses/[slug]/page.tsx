import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseLearning from "@/components/course-learning";
import { courses } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.filter((course) => course.isFree).map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug && item.isFree);
  return course ? { title: `${course.title} | دوره رایگان`, description: course.description, alternates: { canonical: `/courses/${course.slug}` } } : {};
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug && item.isFree);
  if (!course) notFound();

  return (
    <div className="page-wrap pb-16">
      <div className="mb-5 mt-7 flex items-center gap-2 text-[10px] text-[var(--muted)]">
        <Link href="/courses">دوره های رایگان</Link><ChevronLeft className="size-3" /><span>{course.title}</span>
      </div>
      <CourseLearning course={course} />
    </div>
  );
}
