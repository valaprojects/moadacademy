import { ArrowLeft, CheckCircle2, Compass, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroMotion, Reveal } from "@/components/motion";
import ProductCarousel from "@/components/product-carousel";
import { ArticleCards, CategoryGrid, Newsletter, SectionTitle } from "@/components/ui";
import { courses, samplePacks } from "@/lib/data";

export default function Home() {
  return (
    <div className="page-wrap">
      <HeroMotion>
        <section className="noise relative mt-5 min-h-[520px] overflow-hidden rounded-[36px] bg-[var(--ink)] text-white sm:min-h-[560px]">
          <Image src="/images/moad-studio-hero.png" alt="استودیوی تولید موسیقی موآد آکادمی" fill priority sizes="(max-width: 1024px) 100vw, 75vw" className="object-cover object-left" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,11,8,.04)_0%,rgba(9,11,8,.45)_42%,rgba(9,11,8,.98)_76%)]" />
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 flex min-h-[520px] max-w-[690px] flex-col justify-center px-6 py-12 sm:min-h-[560px] sm:px-12 lg:px-16">
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/12 bg-black/20 px-3 py-2 text-[10px] font-bold text-[var(--acid)] backdrop-blur-md"><span className="size-1.5 rounded-full bg-[var(--acid)] shadow-[0_0_15px_var(--acid)]" /> سمپل‌های اورجینال، آموزش‌های بی‌واسطه</div>
            <h1 className="text-[42px] font-black leading-[1.35] tracking-[-.065em] sm:text-[64px] lg:text-[74px]">صدای بعدی‌ات را<br /><span className="text-[var(--acid)]">همین‌جا</span> بساز.</h1>
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/60 sm:text-base">سمپل‌پک‌ها و دوره‌هایی برای موزیسین‌هایی که نمی‌خواهند شبیه بقیه شنیده شوند. صدا را انتخاب کن، تغییرش بده و امضای خودت را بساز.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/consultation" className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-[var(--acid)] px-6 text-xs font-black text-[var(--ink)] transition hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(186,244,81,.3)]"><Compass className="size-4" /> از کجا شروع کنم؟</Link><Link href="/shop" className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 text-xs font-black backdrop-blur-md transition hover:border-[var(--acid)]/50 hover:bg-white/10">دیدن محصولات <ArrowLeft className="size-4" /></Link></div>
            <p className="mt-5 flex items-center gap-2 text-[10px] font-bold text-white/45"><span className="size-1.5 rounded-full bg-[var(--acid)]" />مسیر خودت رو انتخاب کن با مشاوره موآد استودیو</p>
          </div>
        </section>
      </HeroMotion>

      <div className="overflow-hidden py-7 text-[10px] font-black text-[var(--muted)]"><div className="marquee-track flex w-max gap-10"><span>صداهای اورجینال</span><span className="text-[#82a542]">✦</span><span>ساخته‌شده برای خلاقیت</span><span className="text-[#82a542]">✦</span><span>مجوز استفاده تجاری</span><span className="text-[#82a542]">✦</span><span>کیفیت حرفه‌ای</span><span className="text-[#82a542]">✦</span><span>صداهای اورجینال</span><span className="text-[#82a542]">✦</span><span>ساخته‌شده برای خلاقیت</span></div></div>

      <section className="section-space mt-14">
        <SectionTitle eyebrow="انتخاب این هفته" title="صداهایی که منتظر ایده‌ی تو هستند." text="هر پک با دقت انتخاب، ضبط و پردازش شده تا به‌جای وقت‌گرفتن، مسیر خلاقیت را کوتاه‌تر کند." href="/shop" />
        <ProductCarousel items={samplePacks} label="صداهای منتخب این هفته" />
      </section>

      <section className="section-space"><SectionTitle eyebrow="از جنس نیاز تو" title="دنبال چه صدایی می‌گردی؟" /><CategoryGrid /></section>

      <Reveal className="section-space">
        <section className="relative overflow-hidden rounded-[34px] bg-[#173b28] px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="hero-grid absolute inset-0 opacity-25" /><div className="absolute -left-20 -top-32 size-96 rounded-full bg-[var(--acid)]/18 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div><span className="eyebrow border-white/10 bg-white/5 text-[var(--acid)]"><Sparkles className="size-3" />دوره منتخب</span><h2 className="text-3xl font-black leading-[1.5] tracking-[-.05em] sm:text-5xl">بیت‌سازی مدرن؛<br />از سکوت تا انتشار.</h2><p className="mt-5 max-w-xl text-sm leading-8 text-white/55">یک مسیر پروژه‌محور با {courses[0].lessons.toLocaleString("fa-IR")} جلسه کاربردی. در پایان فقط چند تکنیک بلد نیستی؛ یک قطعه کامل و یک روند کاری شخصی داری.</p><div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] text-white/70"><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--acid)]" /> دسترسی همیشگی</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--acid)]" /> فایل پروژه</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--acid)]" /> پشتیبانی تمرین‌ها</span></div><Link href="/courses" className="mt-8 inline-flex h-12 items-center gap-2 rounded-2xl bg-[var(--acid)] px-6 text-xs font-black text-[var(--ink)]">مشاهده سرفصل‌ها <ArrowLeft className="size-4" /></Link></div>
            <div className="relative mx-auto aspect-square w-full max-w-[430px]"><div className="absolute inset-[8%] rounded-full border border-white/10" /><div className="absolute inset-[18%] rounded-full border border-[var(--acid)]/25" /><div className="absolute inset-[30%] grid place-items-center rounded-full bg-[var(--acid)] text-[var(--ink)] shadow-[0_0_70px_rgba(186,244,81,.22)]"><Play className="size-12" fill="currentColor" /></div><span className="absolute right-2 top-1/3 rounded-xl border border-white/10 bg-black/15 px-3 py-2 text-[9px] backdrop-blur">۱۸ ساعت آموزش</span><span className="absolute bottom-8 left-2 rounded-xl border border-white/10 bg-black/15 px-3 py-2 text-[9px] backdrop-blur">پروژه‌محور</span></div>
          </div>
        </section>
      </Reveal>

      <Reveal className="section-space">
        <section className="neon-hover relative overflow-hidden rounded-[32px] border border-[#80ad42]/20 bg-[var(--card)] p-7 sm:p-10">
          <div className="absolute -left-20 -top-28 size-72 rounded-full bg-[var(--acid)]/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="eyebrow"><Compass className="size-3" />مشاوره انتخاب مسیر</span>
              <h2 className="text-2xl font-black leading-10 sm:text-3xl">از کجا شروع کنم؟</h2>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-[var(--muted)]">مسیر خودت رو انتخاب کن با مشاوره موآد استودیو؛ چند سؤال کوتاه جواب بده تا محصول مناسب‌تری به تو پیشنهاد کنیم.</p>
            </div>
            <Link href="/consultation" className="primary-button shrink-0">شروع مشاوره <ArrowLeft className="size-4" /></Link>
          </div>
        </section>
      </Reveal>

      <section className="section-space"><SectionTitle eyebrow="مجله موآد" title="کمی دقیق‌تر گوش کنیم." text="یادداشت‌های کوتاه و کاربردی درباره تولید، خلاقیت و زندگی در استودیو." href="/blog" linkLabel="رفتن به مجله" /><ArticleCards /></section>
      <div className="section-space"><Newsletter /></div>
    </div>
  );
}
