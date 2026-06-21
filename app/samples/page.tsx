import type { Metadata } from "next";
import SampleCatalog from "@/components/sample-catalog";
import { FeatureStrip, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "سمپل‌پک‌ها", description: "مجموعه سمپل‌پک‌ها، لوپ‌ها و بانک‌های صدای اورجینال موآد استودیو" };

export default function SamplesPage() {
  return <div className="page-wrap"><PageIntro eyebrow="کتابخانه صدا" title="صدا را پیدا کن؛ مسیرش را خودت بساز." text="مجموعه‌ای از سمپل‌های اورجینال و آماده‌ی استفاده در هر نرم‌افزار آهنگ‌سازی. پیش‌نمایش را گوش کن، ژانر را انتخاب کن و دقیقاً همان چیزی را بردار که قطعه‌ات کم دارد." /><div className="mt-5"><FeatureStrip /></div><SampleCatalog /></div>;
}

