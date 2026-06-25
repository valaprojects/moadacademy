import { ArrowLeft, AudioWaveform, CheckCircle2, KeyRound, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";

type AuthMode = "login" | "register" | "forgot";

const copy = {
  login: {
    eyebrow: "ورود به حساب",
    title: "برگرد به فضای کار خودت.",
    text: "به خریدها، دوره‌های رایگان، فایل‌ها و مسیرهای ذخیره‌شده‌ات دسترسی داشته باش.",
    button: "ورود به حساب",
    asideTitle: "همه صداها و دوره‌ها، یک‌جا.",
    asideText: "بعد از ورود، دسترسی‌های خریداری‌شده و مسیر یادگیری‌ات در پنل کاربری مرتب می‌شود.",
  },
  register: {
    eyebrow: "ثبت‌نام در موآد",
    title: "حساب هنری خودت را بساز.",
    text: "برای خرید سریع‌تر، ذخیره دوره‌ها و دریافت فایل‌ها، یک حساب ساده و امن بساز.",
    button: "ساخت حساب کاربری",
    asideTitle: "شروع تمیز، ادامه حرفه‌ای.",
    asideText: "پروفایل تو جایی است که خریدها، دانلودها و آموزش‌های بعدی به آن متصل می‌شود.",
  },
  forgot: {
    eyebrow: "بازیابی رمز عبور",
    title: "رمز را فراموش کردی؟ عادی است.",
    text: "ایمیلت را وارد کن تا لینک بازیابی رمز برایت ارسال شود.",
    button: "ارسال لینک بازیابی",
    asideTitle: "دسترسی‌ات را برمی‌گردانیم.",
    asideText: "بعد از دریافت ایمیل، رمز جدید تنظیم می‌کنی و دوباره وارد پنل می‌شوی.",
  },
} satisfies Record<AuthMode, { eyebrow: string; title: string; text: string; button: string; asideTitle: string; asideText: string }>;

export default function AuthPanel({ mode }: { mode: AuthMode }) {
  const content = copy[mode];
  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  return (
    <div className="page-wrap">
      <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-5 py-6 sm:py-10 lg:grid-cols-[.92fr_1.08fr]">
        <aside className="relative order-2 overflow-hidden rounded-[34px] bg-[var(--ink)] p-6 text-white shadow-[0_28px_90px_rgba(17,22,14,.14)] lg:order-1 lg:min-h-[620px] lg:p-8">
          <div className="hero-grid absolute inset-0 opacity-25" />
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[var(--acid)]/18 blur-3xl" />
          <div className="absolute -bottom-28 left-8 size-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative flex h-full min-h-[360px] flex-col">
            <Link href="/" className="flex w-fit items-center gap-3" aria-label="بازگشت به خانه موآد">
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--acid)] text-[var(--ink)]">
                <AudioWaveform className="size-6" />
              </span>
              <span>
                <strong className="block text-base font-black">موآد</strong>
                <small className="text-[10px] font-bold text-white/45">استودیو موسیقی</small>
              </span>
            </Link>

            <div className="mt-auto">
              <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black text-[var(--acid)]">
                پنل امن هنرمندان
              </span>
              <h2 className="max-w-md text-3xl font-black leading-[1.55] tracking-[-.04em] sm:text-4xl">{content.asideTitle}</h2>
              <p className="mt-4 max-w-md text-sm leading-8 text-white/52">{content.asideText}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["دانلودهای امن", "دوره‌های ذخیره‌شده", "پشتیبانی سریع"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[.045] p-4">
                    <CheckCircle2 className="mb-4 size-5 text-[var(--acid)]" />
                    <span className="text-[10px] font-bold text-white/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="order-1 rounded-[34px] border border-black/6 bg-white p-4 shadow-[0_22px_70px_rgba(17,22,14,.06)] sm:p-6 lg:order-2 lg:p-8">
          <div className="rounded-[28px] bg-[var(--soft)] p-5 sm:p-7">
            <span className="eyebrow">{content.eyebrow}</span>
            <h1 className="text-3xl font-black leading-[1.5] tracking-[-.04em] sm:text-4xl">{content.title}</h1>
            <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{content.text}</p>
          </div>

          <form className="mt-5 space-y-4 rounded-[28px] border border-black/6 bg-[var(--card)] p-5 sm:p-6">
            {isRegister && (
              <label className="block text-[11px] font-black">
                نام و نام خانوادگی
                <span className="relative mt-2 block">
                  <UserRound className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input className="form-input pr-11" placeholder="مثلاً آرین نیک‌روش" autoComplete="name" />
                </span>
              </label>
            )}

            <label className="block text-[11px] font-black">
              ایمیل
              <span className="relative mt-2 block">
                <Mail className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                <input className="form-input pr-11" type="email" placeholder="you@moad.studio" autoComplete="email" />
              </span>
            </label>

            {!isForgot && (
              <label className="block text-[11px] font-black">
                رمز عبور
                <span className="relative mt-2 block">
                  <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input className="form-input pr-11" type="password" placeholder="رمز عبور" autoComplete={isLogin ? "current-password" : "new-password"} />
                </span>
              </label>
            )}

            {isRegister && (
              <label className="block text-[11px] font-black">
                تکرار رمز عبور
                <span className="relative mt-2 block">
                  <KeyRound className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input className="form-input pr-11" type="password" placeholder="تکرار رمز عبور" autoComplete="new-password" />
                </span>
              </label>
            )}

            {isLogin && (
              <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]">
                <label className="flex items-center gap-2 font-bold text-[var(--muted)]">
                  <input type="checkbox" className="size-4 accent-[#8dbb49]" />
                  مرا به خاطر بسپار
                </label>
                <Link href="/forgot-password" className="font-black text-[#628b2f] transition hover:text-[var(--foreground)]">فراموشی رمز عبور</Link>
              </div>
            )}

            <button type="button" className="primary-button w-full">
              <ShieldCheck className="size-4" />
              {content.button}
            </button>

            <div className="rounded-2xl bg-[var(--soft)] px-4 py-3 text-center text-[11px] font-bold leading-6 text-[var(--muted)]">
              {isLogin && <>حساب نداری؟ <Link href="/register" className="font-black text-[#628b2f]">ثبت‌نام کن</Link></>}
              {isRegister && <>قبلاً حساب ساختی؟ <Link href="/login" className="font-black text-[#628b2f]">وارد شو</Link></>}
              {isForgot && <>رمز را به یاد آوردی؟ <Link href="/login" className="font-black text-[#628b2f]">بازگشت به ورود</Link></>}
            </div>
          </form>

          <Link href="/shop" className="mt-5 inline-flex items-center gap-2 text-[11px] font-black text-[var(--muted)] transition hover:text-[var(--foreground)]">
            رفتن به فروشگاه <ArrowLeft className="size-4" />
          </Link>
        </main>
      </section>
    </div>
  );
}
