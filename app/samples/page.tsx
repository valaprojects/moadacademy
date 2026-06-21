import type { Metadata } from "next";
import SampleCatalog from "@/components/sample-catalog";
import { PageIntro, FeatureStrip } from "@/components/ui";

export const metadata: Metadata = { title: "سمپل‌پک‌ها", description: "مجموعه سمپل‌پک‌ها، لوپ‌ها و بانک‌های صدای اورجینال موآد آکادمی" };

export default function SamplesPage() {
  return <div className="page-wrap"><PageIntro eyebrow="SAMPLE LIBRARY" title="صدا را پیدا کن؛ مسیرش را خودت بساز." text="مجموعه‌ای از سمپل‌های اورجینال و آماده‌ی استفاده در هر DAW. پیش‌نمایش را گوش کن، ژانر را انتخاب کن و دقیقاً همان چیزی را بردار که قطعه‌ات کم دارد." /><div className="mt-5"><FeatureStrip /></div><SampleCatalog /></div>;
}

