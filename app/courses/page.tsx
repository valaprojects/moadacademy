import type { Metadata } from "next";
import { CheckCircle2, FolderTree, GraduationCap, MessageCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { CourseCard, PageIntro, SectionTitle } from "@/components/ui";
import { courseCategories, courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "دوره های رایگان",
  description: "دوره‌های رایگان و پروژه‌محور تولید موسیقی، بیت‌سازی، میکس و طراحی صدا",
};

const benefits = [
  { icon: PlayCircle, title: "ویدیوهای فشرده", text: "بدون مقدمه‌های طولانی" },
  { icon: CheckCircle2, title: "تمرین پروژه‌ای", text: "خروجی مشخص در هر فصل" },
  { icon: MessageCircle, title: "بازخورد مربی", text: "پاسخ به تمرین و سؤال" },
  { icon: GraduationCap, title: "دسترسی همیشگی", text: "یادگیری با ریتم خودت" },
];

type Props = { searchParams: Promise<{ category?: string }> };

export default async function CoursesPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const freeCourses = courses.filter((course) => course.isFree);
  const activeCategory = courseCategories.find((item) => item.id === category);
  const visibleCourses = activeCategory ? freeCourses.filter((course) => course.category === activeCategory.id) : freeCourses;

  return (
    <div className="page-wrap">
      <PageIntro
        eyebrow="آموزش‌های آزاد موآد"
        title="دوره های رایگان"
        text="مسیرهای کوتاه و پروژه‌محور برای اینکه بدون هزینه یادگیری را شروع کنی و همان روز نتیجه‌اش را در موسیقی خودت بشنوی."
      />

      <section className="mt-8 rounded-[28px] border border-black/6 bg-[var(--card)] p-4 sm:p-5" aria-label="دسته‌بندی دوره‌های رایگان">
        <div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-[var(--soft)] text-[#668d34]"><FolderTree className="size-4" /></span><div><span className="text-[9px] font-bold text-[#679139]">دسته‌بندی آموزش‌ها</span><h2 className="text-sm font-black">موضوعی که می‌خواهی یاد بگیری را انتخاب کن</h2></div></div>
        <div className="flex flex-wrap gap-2">
          <Link href="/courses" aria-current={!activeCategory ? "page" : undefined} className={`rounded-full px-4 py-2.5 text-[10px] font-extrabold transition ${!activeCategory ? "bg-[var(--acid)] text-[var(--ink)] shadow-[0_0_20px_rgba(186,244,81,.2)]" : "bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--foreground)]"}`}>همه دوره‌ها <span className="mr-1 opacity-60">{freeCourses.length.toLocaleString("fa-IR")}</span></Link>
          {courseCategories.map((item) => { const count = freeCourses.filter((course) => course.category === item.id).length; return <Link key={item.id} href={`/courses?category=${item.id}`} aria-current={activeCategory?.id === item.id ? "page" : undefined} className={`rounded-full px-4 py-2.5 text-[10px] font-extrabold transition ${activeCategory?.id === item.id ? "bg-[var(--acid)] text-[var(--ink)] shadow-[0_0_20px_rgba(186,244,81,.2)]" : "bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--foreground)]"}`}>{item.title} <span className="mr-1 opacity-60">{count.toLocaleString("fa-IR")}</span></Link>; })}
        </div>
      </section>

      <section className="section-space mt-14">
        <SectionTitle
          eyebrow="شروع یادگیری"
          title="یک دوره را انتخاب کن و مستقیم وارد ساختن شو."
          text="همه دوره‌های این صفحه رایگان‌اند و هر قسمت با ویدئو، توضیح و تمرین مشخص ارائه می‌شود."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course, index) => <CourseCard key={course.slug} course={course} index={index} />)}
        </div>
      </section>

      <Reveal className="section-space">
        <section className="grid gap-8 rounded-[32px] border border-black/6 bg-[var(--card)] p-6 sm:p-9 lg:grid-cols-2">
          <div>
            <span className="eyebrow"><GraduationCap className="size-3" />روش موآد</span>
            <h2 className="text-2xl font-black leading-10">یادگیری باید در پروژه شنیده شود، نه فقط در ذهن بماند.</h2>
            <p className="mt-4 text-sm leading-8 text-[var(--muted)]">هر جلسه با یک تمرین کوتاه تمام می‌شود و هر فصل بخشی از پروژه نهایی را جلو می‌برد. مسیر مشخص است، اما صدایی که می‌سازی کاملاً متعلق به خودت خواهد بود.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="neon-hover rounded-2xl bg-[var(--soft)] p-4">
                <Icon className="size-5 text-[#6b9438]" />
                <strong className="mt-4 block text-xs">{title}</strong>
                <span className="mt-1 block text-[10px] text-[var(--muted)]">{text}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
