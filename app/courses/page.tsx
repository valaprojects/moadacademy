import type { Metadata } from "next";
import { CheckCircle2, GraduationCap, MessageCircle, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/motion";
import { CourseCard, PageIntro, SectionTitle } from "@/components/ui";
import { courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "دوره‌های آموزشی",
  description: "دوره‌های پروژه‌محور تولید موسیقی، بیت‌سازی، میکس و طراحی صدا",
};

const benefits = [
  { icon: PlayCircle, title: "ویدیوهای فشرده", text: "بدون مقدمه‌های طولانی" },
  { icon: CheckCircle2, title: "تمرین پروژه‌ای", text: "خروجی مشخص در هر فصل" },
  { icon: MessageCircle, title: "بازخورد مربی", text: "پاسخ به تمرین و سؤال" },
  { icon: GraduationCap, title: "دسترسی همیشگی", text: "یادگیری با ریتم خودت" },
];

export default function CoursesPage() {
  return (
    <div className="page-wrap">
      <PageIntro
        eyebrow="مسیر یادگیری موآد"
        title="کمتر تماشا کن؛ بیشتر بساز."
        text="دوره‌های موآد برای جمع‌کردن ویدیو نیستند. هر مسیر با یک پروژه واقعی جلو می‌رود تا دانسته‌هایت همان روز تبدیل به صدا شوند."
      />

      <section className="section-space mt-14">
        <SectionTitle
          eyebrow="مسیرهای یادگیری"
          title="هرجا هستی، از همان‌جا شروع کن."
          text="از ساخت اولین بیت تا طراحی صدای شخصی؛ دوره‌ای را انتخاب کن که یک قدم واقعی جلوترت می‌برد."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => <CourseCard key={course.slug} course={course} index={index} />)}
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
