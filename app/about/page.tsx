import type { Metadata } from "next";
import { AudioWaveform, Heart, Lightbulb, Users } from "lucide-react";
import { Reveal } from "@/components/motion";
import { PageIntro, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "درباره ما" };

const values = [
  { icon: Lightbulb, title: "کاربرد قبل از نمایش", text: "هر آموزش باید همان روز در پروژه قابل استفاده باشد." },
  { icon: Heart, title: "هویت قبل از ترند", text: "ترند می‌گذرد؛ چیزی که از خودت می‌آوری باقی می‌ماند." },
  { icon: Users, title: "جامعه قبل از عدد", text: "رشد موآد یعنی رشد هنرمندهایی که کنار ما می‌سازند." },
];

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <PageIntro
        eyebrow="داستان ما"
        title="موآد از یک سؤال ساده شروع شد: صدای خودمان کجاست؟"
        text="بین هزاران آموزش طولانی و سمپل تکراری، جای یک خانه برای صداهای باهویت خالی بود. موآد را ساختیم تا آن خانه باشد."
      />

      <Reveal className="section-space mt-14">
        <section className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="accent-surface relative min-h-80 overflow-hidden rounded-[30px] p-7">
            <div className="absolute -bottom-24 -left-20 size-80 rounded-full border-[45px] border-black/5" />
            <AudioWaveform className="size-10" />
            <strong className="absolute bottom-8 right-7 max-w-xs text-3xl font-black leading-[1.5]">صدا، وقتی ماندگار می‌شود که چیزی از تو در آن باشد.</strong>
          </div>
          <div className="glass-card p-6 sm:p-9">
            <span className="eyebrow">داستان موآد</span>
            <h2 className="text-2xl font-black leading-10">از اتاق کوچک تولید تا یک جامعه خلاق.</h2>
            <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--muted)]">
              <p>ما هم مثل خیلی از موزیسین‌ها، ساعت‌ها بین فایل‌ها می‌گشتیم و دوره‌هایی می‌دیدیم که در نهایت به پروژه واقعی وصل نمی‌شدند. مشکل کمبود محتوا نبود؛ کمبود انتخاب دقیق و مسیر روشن بود.</p>
              <p>در موآد، هر سمپل‌پک از دل یک پروژه موسیقی واقعی بیرون می‌آید و هر دوره با ساختن تمام می‌شود. هدف ما زیادکردن ابزارها نیست؛ کمک می‌کنیم با ابزار کمتر، تصمیم‌های بهتری بگیری.</p>
            </div>
          </div>
        </section>
      </Reveal>

      <section className="section-space">
        <SectionTitle eyebrow="چیزی که برایمان مهم است" title="سه اصل، پشت هر صدا و هر جلسه." />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <Reveal key={title}>
              <div className="neon-hover glass-card h-full p-6">
                <span className="grid size-12 place-items-center rounded-2xl bg-[var(--soft)]"><Icon className="size-5" /></span>
                <h3 className="mt-6 text-base font-black">{title}</h3>
                <p className="mt-2 text-xs leading-7 text-[var(--muted)]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
