import type { Metadata } from "next";
import SampleCatalog from "@/components/sample-catalog";
import { FeatureStrip, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "فروشگاه محصولات", description: "تمام سمپل‌پک‌ها، بانک‌های صدا و محصولات موآد استودیو" };

export default function ShopPage() {
  return <div className="page-wrap"><PageIntro eyebrow="فروشگاه موآد" title="تمام صداها، یک‌جا و آماده‌ی ساختن." text="بین همه محصولات جست‌وجو کن، پیش‌نمایش‌ها را بشنو و همان چیزی را پیدا کن که پروژه‌ات کم دارد." /><div className="mt-5"><FeatureStrip /></div><SampleCatalog /></div>;
}
