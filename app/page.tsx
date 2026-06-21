import { ArrowLeft, AudioLines, CheckCircle2, Play, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroMotion, Reveal } from "@/components/motion";
import ProductCard, { Waveform } from "@/components/product-card";
import { ArticleCards, CategoryGrid, Newsletter, SectionTitle } from "@/components/ui";
import { courses, samplePacks } from "@/lib/data";

export default function Home() {
  return (
    <div className="page-wrap">
      <HeroMotion>
        <section className="noise relative mt-5 min-h-[630px] overflow-hidden rounded-[36px] bg-[var(--ink)] text-white sm:min-h-[680px]">
          <Image src="/images/moad-studio-hero.png" alt="استودیوی تولید موسیقی موآد آکادمی" fill priority sizes="(max-width: 1024px) 100vw, 75vw" className="object-cover object-left" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,11,8,.04)_0%,rgba(9,11,8,.45)_42%,rgba(9,11,8,.98)_76%)]" />
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 flex min-h-[630px] max-w-[690px] flex-col justify-center px-6 py-16 sm:min-h-[680px] sm:px-12 lg:px-16">
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/12 bg-black/20 px-3 py-2 text-[10px] font-bold text-[var(--acid)] backdrop-blur-md"><span className="size-1.5 rounded-full bg-[var(--acid)] shadow-[0_0_15px_var(--acid)]" /> سمپل‌های اورجینال، آموزش‌های بی‌واسطه</div>
            <h1 className="text-[42px] font-black leading-[1.35] tracking-[-.065em] sm:text-[64px] lg:text-[74px]">صدای بعدی‌ات را<br /><span className="text-[var(--acid)]">همین‌جا</span> بساز.</h1>
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/60 sm:text-base">سمپل‌پک‌ها و دوره‌هایی برای موزیسین‌هایی که نمی‌خواهند شبیه بقیه شنیده شوند. صدا را انتخاب کن، تغییرش بده و امضای خودت را بساز.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/samples" className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-[var(--acid)] px-6 text-xs font-black text-[var(--ink)] transition hover:-translate-y-1">کشف سمپل‌پک‌ها <ArrowLeft className="size-4" /></Link><Link href="/courses" className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 text-xs font-black backdrop-blur-md transition hover:bg-white/10"><Play className="size-4" fill="currentColor" /> دیدن دوره‌ها</Link></div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6"><div><strong className="block text-xl font-black text-[var(--acid)]">+۴۸</strong><span className="text-[9px] text-white/40">پک اورجینال</span></div><div><strong className="block text-xl font-black">+۱۲K</strong><span className="text-[9px] text-white/40">دانلود موفق</span></div><div><strong className="block text-xl font-black">۴.۹</strong><span className="text-[9px] text-white/40">رضایت هنرمندها</span></div></div>
          </div>
          <div className="absolute bottom-6 left-6 hidden items-center gap-3 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-xl sm:flex"><span className="grid size-10 place-items-center rounded-xl bg-[var(--acid)] text-[var(--ink)]"><AudioLines className="size-5" /></span><div dir="ltr"><span className="block text-[9px] text-white/40">NOW PLAYING</span><strong className="text-[11px]">Neon Persian Drums</strong></div><Waveform color="#baf451" compact /></div>
        </section>
      </HeroMotion>

      <div className="overflow-hidden py-7 text-[10px] font-black tracking-[.1em] text-[var(--muted)]" dir="ltr"><div className="marquee-track flex w-max gap-10"><span>ORIGINAL SOUNDS</span><span className="text-[#82a542]">✦</span><span>MADE FOR CREATORS</span><span className="text-[#82a542]">✦</span><span>ROYALTY FREE</span><span className="text-[#82a542]">✦</span><span>24BIT WAV</span><span className="text-[#82a542]">✦</span><span>ORIGINAL SOUNDS</span><span className="text-[#82a542]">✦</span><span>MADE FOR CREATORS</span><span className="text-[#82a542]">✦</span><span>ROYALTY FREE</span></div></div>

      <section className="section-space mt-14">
        <SectionTitle eyebrow="انتخاب این هفته" title="صداهایی که منتظر ایده‌ی تو هستند." text="هر پک با دقت انتخاب، ضبط و پردازش شده تا به‌جای وقت‌گرفتن، مسیر خلاقیت را کوتاه‌تر کند." href="/samples" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{samplePacks.slice(0, 4).map((pack, index) => <ProductCard key={pack.slug} pack={pack} index={index} />)}</div>
      </section>

      <section className="section-space"><SectionTitle eyebrow="از جنس نیاز تو" title="دنبال چه صدایی می‌گردی؟" /><CategoryGrid /></section>

      <Reveal className="section-space">
        <section className="relative overflow-hidden rounded-[34px] bg-[#173b28] px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="hero-grid absolute inset-0 opacity-25" /><div className="absolute -left-20 -top-32 size-96 rounded-full bg-[var(--acid)]/18 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div><span className="eyebrow border-white/10 bg-white/5 text-[var(--acid)]"><Sparkles className="size-3" />دوره منتخب</span><h2 className="text-3xl font-black leading-[1.5] tracking-[-.05em] sm:text-5xl">بیت‌سازی مدرن؛<br />از سکوت تا انتشار.</h2><p className="mt-5 max-w-xl text-sm leading-8 text-white/55">یک مسیر پروژه‌محور با {courses[0].lessons} جلسه کاربردی. در پایان فقط چند تکنیک بلد نیستی؛ یک قطعه کامل و یک روند کاری شخصی داری.</p><div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] text-white/70"><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--acid)]" /> دسترسی همیشگی</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--acid)]" /> فایل پروژه</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--acid)]" /> پشتیبانی تمرین‌ها</span></div><Link href="/courses" className="mt-8 inline-flex h-12 items-center gap-2 rounded-2xl bg-[var(--acid)] px-6 text-xs font-black text-[var(--ink)]">مشاهده سرفصل‌ها <ArrowLeft className="size-4" /></Link></div>
            <div className="relative mx-auto aspect-square w-full max-w-[430px]"><div className="absolute inset-[8%] rounded-full border border-white/10" /><div className="absolute inset-[18%] rounded-full border border-[var(--acid)]/25" /><div className="absolute inset-[30%] grid place-items-center rounded-full bg-[var(--acid)] text-[var(--ink)] shadow-[0_0_70px_rgba(186,244,81,.22)]"><Play className="size-12" fill="currentColor" /></div><span className="absolute right-2 top-1/3 rounded-xl border border-white/10 bg-black/15 px-3 py-2 text-[9px] backdrop-blur">۱۸ ساعت آموزش</span><span className="absolute bottom-8 left-2 rounded-xl border border-white/10 bg-black/15 px-3 py-2 text-[9px] backdrop-blur">پروژه‌محور</span></div>
          </div>
        </section>
      </Reveal>

      <section className="section-space">
        <SectionTitle eyebrow="صدای هنرجوها" title="ما از نتیجه حرف نمی‌زنیم؛ آن‌ها می‌زنند." />
        <div className="grid gap-4 lg:grid-cols-3">
          {[{ n: "آرین نیک‌روش", r: "تهیه‌کننده مستقل", q: "پک‌ها فقط خوش‌صدا نیستند؛ جوری دسته‌بندی شده‌اند که وسط کار گم نمی‌شوم. برای من یعنی ایده کمتر از دست می‌رود." }, { n: "سپهر کاظمی", r: "آرتیست هیپ‌هاپ", q: "دوره بیت‌سازی نگاه من را به انتخاب صدا عوض کرد. حالا قبل از پلاگین، به خود ایده و فضای خالی فکر می‌کنم." }, { n: "سارا محتشم", r: "آهنگساز تصویر", q: "کیفیت تکسچرها و سمپل‌های ارگانیک واقعاً بالاست. حس نمی‌کنم دارم از یک پک تکراری جهانی استفاده می‌کنم." }].map((item, index) => <Reveal key={item.n} delay={index * .06}><blockquote className="glass-card h-full p-6"><div className="mb-6 flex gap-1 text-[#7ca437]">{[1,2,3,4,5].map((star) => <Star key={star} className="size-3" fill="currentColor" />)}</div><p className="text-sm leading-8">«{item.q}»</p><div className="mt-7 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-[var(--ink)] text-xs font-black text-[var(--acid)]">{item.n[0]}</span><div><strong className="block text-xs">{item.n}</strong><span className="text-[9px] text-[var(--muted)]">{item.r}</span></div></div></blockquote></Reveal>)}</div>
      </section>

      <section className="section-space"><SectionTitle eyebrow="مجله موآد" title="کمی دقیق‌تر گوش کنیم." text="یادداشت‌های کوتاه و کاربردی درباره تولید، خلاقیت و زندگی در استودیو." href="/blog" linkLabel="رفتن به مجله" /><ArticleCards /></section>
      <div className="section-space"><Newsletter /></div>
    </div>
  );
}
