import type { Metadata } from "next";
import { ChevronLeft, FileAudio, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import ProductDetailTabs from "@/components/product-detail-tabs";
import { AddToCartButton } from "@/components/product-card";
import ProductCarousel from "@/components/product-carousel";
import ProductVideo from "@/components/product-video";
import { formatPrice, samplePacks } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return samplePacks.map((pack) => ({ slug: pack.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pack = samplePacks.find((item) => item.slug === slug);
  return pack ? { title: pack.title, description: pack.description } : {};
}

export default async function SampleDetailPage({ params }: Props) {
  const { slug } = await params;
  const pack = samplePacks.find((item) => item.slug === slug);
  if (!pack) notFound();

  return (
    <div className="page-wrap">
      <div className="mb-5 mt-7 flex items-center gap-2 text-[10px] text-[var(--muted)]">
        <Link href="/shop">محصولات</Link><ChevronLeft className="size-3" /><span>{pack.title}</span>
      </div>

      <Reveal>
        <section className="grid items-start gap-5 lg:grid-cols-[1.35fr_.65fr] lg:items-stretch">
          <ProductVideo title={pack.title} accent={pack.accent} />
          <aside className="glass-card flex flex-col p-6 sm:p-7">
            <div className="mb-5 min-h-32 rounded-[22px] p-5 text-white" style={{ background: `radial-gradient(circle at 20% 20%, ${pack.accent}28, transparent 40%), linear-gradient(145deg, ${pack.color}, #070907)` }}>
              <span className="text-[9px] text-white/45">مجموعه صدای موآد</span>
              <h2 className="mt-8 text-2xl font-black">{pack.title}</h2>
              <p className="mt-2 text-[10px] text-white/45">{pack.genre} · {pack.bpm}</p>
            </div>
            <span className="eyebrow w-fit"><Sparkles className="size-3" />محصول اورجینال</span>
            <p className="text-xs leading-7 text-[var(--muted)]">{pack.description}</p>
            <div className="my-6 h-px bg-black/6" />
            <div className="flex items-end justify-between">
              <div><span className="block text-[10px] text-[var(--muted)]">قیمت این مجموعه</span><strong className="mt-1 block text-xl">{formatPrice(pack.price)}</strong></div>
              {pack.oldPrice && <del className="text-xs text-[var(--muted)]">{formatPrice(pack.oldPrice)}</del>}
            </div>
            <AddToCartButton slug={pack.slug} className="mt-5 w-full" />
            <div className="mt-4 flex items-center justify-center gap-5 text-[9px] text-[var(--muted)]"><span className="flex items-center gap-1"><ShieldCheck className="size-3" />پرداخت امن</span><span className="flex items-center gap-1"><FileAudio className="size-3" />دانلود فوری</span></div>
          </aside>
        </section>
      </Reveal>

      <Reveal className="mt-5">
        <ProductDetailTabs description={pack.description} tags={[...pack.tags]} includes={[...pack.includes]} />
      </Reveal>

      <section className="section-space">
        <h2 className="mb-7 text-2xl font-black">پیشنهادهای نزدیک به این صدا</h2>
        <ProductCarousel items={samplePacks.filter((item) => item.slug !== pack.slug)} label="پیشنهادهای نزدیک به این صدا" />
      </section>
    </div>
  );
}
