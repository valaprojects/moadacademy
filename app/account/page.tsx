import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "پنل کاربری",
  description: "ورود به پنل کاربری موآد استودیو",
};

export default function AccountPage() {
  return (
    <div className="page-wrap">
      <PageIntro
        eyebrow="پنل کاربری"
        title="پنل کاربری موآد به‌زودی آماده می‌شود."
        text="این بخش برای ورود، مشاهده خریدها، دوره‌های رایگان و دسترسی‌های کاربر طراحی خواهد شد."
      />
      <section className="mx-auto mt-8 max-w-3xl rounded-[30px] border border-black/6 bg-[var(--card)] p-6 text-center shadow-[0_18px_60px_rgba(17,22,14,.05)] sm:p-8">
        <span className="mx-auto grid size-14 place-items-center rounded-3xl bg-[var(--soft)] text-[#668d34]">
          <UserRound className="size-6" />
        </span>
        <h2 className="mt-5 text-xl font-black">فعلاً ورود و ثبت‌نام غیرفعال است.</h2>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-7 text-[var(--muted)]">
          ساختار اصلی سایت آماده است و پنل کاربری در مرحله بعد به همین مسیر متصل می‌شود.
        </p>
        <Link href="/shop" className="primary-button mt-6">
          دیدن محصولات <ArrowLeft className="size-4" />
        </Link>
      </section>
    </div>
  );
}
