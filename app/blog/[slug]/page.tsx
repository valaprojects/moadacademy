import type { Metadata } from "next";
import { ArrowRight, Lightbulb, Quote, Target } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleReadingSidebar, { type ArticleSection } from "@/components/article-reading-sidebar";
import ProductVideo from "@/components/product-video";
import { articles } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const article = articles.find((item) => item.slug === slug); return article ? { title: article.title, description: article.excerpt } : {}; }

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const sections: ArticleSection[] = [
    { id: "article-start", title: article.title, group: "شروع مقاله" },
    { id: "introduction", title: "قبل از هر ابزار، مسئله را درست ببین", group: "شروع مقاله" },
    { id: "listen-first", title: "اول گوش کن، بعد دست به ابزار ببر", group: "تصمیم‌گیری درست" },
    { id: "one-change", title: "یک تغییر در هر مرحله", group: "تصمیم‌گیری درست" },
    { id: "weekly-practice", title: "تمرین عملی این هفته", group: "تمرین و جمع‌بندی" },
  ];

  return (
    <div className="page-wrap pb-16">
      <Link href="/blog" className="mb-5 mt-8 flex w-fit items-center gap-2 text-[10px] font-bold text-[var(--muted)]"><ArrowRight className="size-3" />بازگشت به مجله</Link>
      <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)]">
        <ArticleReadingSidebar sections={sections} relatedArticles={articles.filter((item) => item.series === article.series)} currentSlug={article.slug} />
        <article data-reading-article className="min-w-0">
          <header id="article-start" data-article-section className="relative scroll-mt-28 overflow-hidden rounded-[32px] bg-[var(--ink)] px-6 py-12 text-white sm:px-12 sm:py-14 lg:px-14">
            <div className="hero-grid absolute inset-0 opacity-20" /><div className="absolute -left-24 -top-32 size-96 rounded-full bg-[var(--acid)]/10 blur-3xl" />
            <h1 className="relative max-w-4xl text-3xl font-black leading-[1.55] tracking-[-.05em] sm:text-5xl">{article.title}</h1>
          </header>

          <div className="mt-5">
            <ProductVideo
              title={article.title}
              accent="#baf451"
              compact
              titleTag="p"
              showTitleOverlay={false}
              menuLabel="بخش‌های مهم ویدئو"
              timeline={article.timeline}
              videos={[{
                id: article.slug,
                title: "نسخه ویدئویی این آموزش",
                caption: article.excerpt,
                src: article.videoSrc,
              }]}
            />
          </div>

          <div className="px-1 py-8 text-sm leading-9 text-[var(--muted)] sm:px-6 lg:px-10">
            <section id="introduction" data-article-section className="scroll-mt-28"><span className="eyebrow">مقدمه</span><h2 className="text-2xl font-black text-[var(--foreground)]">قبل از هر ابزار، مسئله را درست ببین</h2><p className="mt-4">صدای خوب معمولاً نتیجه یک حرکت جادویی نیست؛ حاصل چند تصمیم کوچک است که در زمان درست گرفته می‌شوند. قبل از اینکه سراغ ابزار بعدی برویم، باید بفهمیم قطعه واقعاً چه چیزی کم دارد.</p><p className="mt-4">اگر مسئله را اشتباه تعریف کنیم، حتی بهترین پلاگین‌ها هم فقط ظاهر مشکل را تغییر می‌دهند. چند دقیقه فاصله گرفتن از پروژه و شنیدن آن با صدای کمتر، اغلب از ساعت‌ها دست‌کاری مفیدتر است.</p></section>

            <section id="listen-first" data-article-section className="scroll-mt-28 pt-12"><span className="eyebrow">گام اول</span><h2 className="text-2xl font-black text-[var(--foreground)]">اول گوش کن، بعد دست به ابزار ببر</h2><p className="mt-4">چند بار قطعه را بدون لمس هیچ کنترلری گوش کن. جاهایی که انرژی افت می‌کند، بخش‌هایی که شلوغ‌اند و لحظه‌هایی که توجهت از ملودی جدا می‌شود را یادداشت کن. همین نقشه ساده، مسیر تصمیم‌های بعدی را روشن می‌کند.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-[22px] border border-black/6 bg-[var(--card)] p-5"><Lightbulb className="mb-3 size-5 text-[#71993c]" /><strong className="text-xs text-[var(--foreground)]">شنیدن با ولوم کم</strong><p className="mt-2 text-xs leading-7">تعادل عناصر اصلی و شلوغی فرکانسی را واضح‌تر نشان می‌دهد.</p></div><div className="rounded-[22px] border border-black/6 bg-[var(--card)] p-5"><Target className="mb-3 size-5 text-[#71993c]" /><strong className="text-xs text-[var(--foreground)]">یادداشت یک‌خطی</strong><p className="mt-2 text-xs leading-7">برای هر بخش فقط مهم‌ترین مشکل را بنویس تا تمرکزت حفظ شود.</p></div></div><blockquote className="my-9 rounded-[24px] bg-[var(--acid)] p-6 text-lg font-black leading-9 text-[var(--ink)]"><Quote className="mb-4 size-6" />اگر هر صدا دلیلی برای حضور نداشته باشد، حذف‌کردنش معمولاً میکس را بهتر می‌کند.</blockquote></section>

            <section id="one-change" data-article-section className="scroll-mt-28 pt-5"><span className="eyebrow">گام دوم</span><h2 className="text-2xl font-black text-[var(--foreground)]">یک تغییر در هر مرحله</h2><p className="mt-4">وقتی هم‌زمان اکولایزر، کمپرس و سچوریشن را عوض می‌کنی، دیگر نمی‌دانی کدام تصمیم نتیجه را بهتر کرده است. تغییرها را کوچک نگه دار و بعد از هر مرحله دوباره با نسخه قبلی مقایسه کن.</p><p className="mt-4">سطح خروجی دو نسخه را تا جای ممکن برابر کن؛ صدای بلندتر تقریباً همیشه در نگاه اول بهتر به نظر می‌رسد. مقایسه منصفانه کمک می‌کند تصمیم درست را از هیجان لحظه جدا کنی.</p></section>

            <section id="weekly-practice" data-article-section className="scroll-mt-28 pt-12"><div className="rounded-[26px] border border-[#83ad47]/20 bg-[var(--card)] p-6 sm:p-8"><span className="eyebrow">جمع‌بندی</span><h2 className="text-xl font-black text-[var(--foreground)]">تمرین عملی این هفته</h2><p className="mt-3">یکی از پروژه‌های نیمه‌کاره را باز کن و فقط با حذف سه صدای غیرضروری، فضای بیشتری برای عنصر اصلی بساز. سپس خروجی قبل و بعد را با ولوم برابر مقایسه کن.</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-[var(--soft)] px-3 py-2 text-[9px] font-bold">زمان پیشنهادی: ۲۰ دقیقه</span><span className="rounded-full bg-[var(--soft)] px-3 py-2 text-[9px] font-bold">بدون افزودن پلاگین جدید</span></div></div></section>
          </div>
        </article>
      </div>
    </div>
  );
}
