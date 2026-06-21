import type { Metadata } from "next";
import { ArticleCards, Newsletter, PageIntro, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "مجله موآد", description: "یادداشت‌ها و آموزش‌های کوتاه درباره تولید موسیقی، میکس و خلاقیت" };
export default function BlogPage() { return <div className="page-wrap"><PageIntro eyebrow="MOAD JOURNAL" title="برای گوش‌هایی که دقیق‌تر می‌شنوند." text="تکنیک‌ها، تجربه‌ها و سؤال‌هایی درباره ساخت موسیقی؛ کوتاه، شفاف و قابل استفاده در همان پروژه‌ای که باز مانده است." /><section className="section-space mt-14"><SectionTitle eyebrow="تازه‌ترین یادداشت‌ها" title="از اتاق کنترل تا لحظه‌ی انتشار." /><ArticleCards /></section><div className="section-space"><Newsletter /></div></div>; }

