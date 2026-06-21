import type { Metadata } from "next";
import ConsultationFlow from "@/components/consultation-flow";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "مشاوره انتخاب مسیر", description: "با پاسخ به چند سؤال، مسیر و محصول مناسب خودت را پیدا کن." };

export default function ConsultationPage() {
  return <div className="page-wrap"><PageIntro eyebrow="مشاوره انتخاب مسیر" title="از کجا شروع کنم؟" text="مسیر خودت رو انتخاب کن با مشاوره موآد استودیو. نقش و هدفت را بگو تا براساس جواب‌ها، محصول و مسیر مناسب‌تری پیشنهاد بگیری." /><ConsultationFlow /></div>;
}

