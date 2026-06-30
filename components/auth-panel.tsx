"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Edit3, KeyRound, Mail, ShieldCheck, X } from "lucide-react";

type AuthStep = "email" | "code";

export default function AuthPanel() {
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState(false);

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  const submitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCode("");
    setSubmittedCode(false);
    setStep("code");
  };

  const submitCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedCode(true);
  };

  const editEmail = () => {
    setStep("email");
    setCode("");
    setSubmittedCode(false);
  };

  return (
    <section className="fixed inset-0 z-[70] overflow-y-auto bg-[rgba(12,16,10,.72)] px-3 py-4 backdrop-blur-md sm:px-5 sm:py-8">
      <div className="flex min-h-full items-center justify-center">
        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_28px_110px_rgba(0,0,0,.28)] lg:grid-cols-[.92fr_1.08fr]">
          <Link
            href="/"
            aria-label="بستن"
            className="absolute left-3 top-3 z-20 grid size-10 place-items-center rounded-2xl border border-black/8 bg-white/90 text-[var(--ink)] shadow-sm transition hover:bg-white sm:left-4 sm:top-4"
          >
            <X className="size-4" />
          </Link>

          <div className="relative hidden min-h-[560px] overflow-hidden bg-[var(--ink)] p-8 text-white lg:block">
            <div className="hero-grid absolute inset-0 opacity-30" />
            <div className="absolute -right-24 top-10 size-72 rounded-full bg-[#8dbb49]/20 blur-3xl" />
            <div className="absolute -bottom-24 left-8 size-80 rounded-full bg-emerald-300/12 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-[var(--acid)]">
                <ShieldCheck className="size-3.5" />
                ورود امن بدون رمز عبور
              </span>

              <div>
                <h1 className="text-4xl font-black leading-[1.55]">
                  ورود و ثبت نام در یک پنجره حرفه ای
                </h1>
                <p className="mt-5 text-sm leading-8 text-white/60">
                  فقط ایمیل را تایید کن، کد ارسال شده را وارد کن و وارد حساب موآد آکادمی شو.
                </p>
              </div>

              <div className="grid gap-3">
                {["یک صفحه برای ورود و ثبت نام", "کد تایید ایمیلی", "بدون رمز عبور و بازیابی"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[.04] p-4">
                    <CheckCircle2 className="size-5 shrink-0 text-[var(--acid)]" />
                    <p className="text-xs font-bold leading-6 text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 pb-5 pt-16 sm:px-7 sm:pb-7 sm:pt-18 lg:px-9 lg:py-10">
            <div className="mx-auto max-w-[430px]">
              <div className="rounded-[26px] bg-[var(--soft)] p-5">
                <div className="grid size-12 place-items-center rounded-2xl bg-white text-[#628b2f] shadow-sm">
                  <KeyRound className="size-5" />
                </div>
                <h2 className="mt-5 text-2xl font-black leading-10">ورود / ثبت نام</h2>
                <p className="mt-2 text-xs leading-7 text-[var(--muted)]">
                  حساب با ایمیل شناسایی می شود. اگر حسابی وجود نداشته باشد، بعد از تایید کد ساخته می شود.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 rounded-2xl bg-[var(--soft)] p-1 text-[11px] font-black">
                <div className={`rounded-xl px-3 py-3 text-center transition ${step === "email" ? "bg-white text-[#628b2f] shadow-sm" : "text-[var(--muted)]"}`}>
                  ۱. ایمیل
                </div>
                <div className={`rounded-xl px-3 py-3 text-center transition ${step === "code" ? "bg-white text-[#628b2f] shadow-sm" : "text-[var(--muted)]"}`}>
                  ۲. کد تایید
                </div>
              </div>

              {step === "email" ? (
                <form onSubmit={submitEmail} className="mt-5 space-y-4">
                  <label className="block text-[11px] font-bold text-[var(--muted)]">
                    ایمیل
                    <span className="mt-2 flex items-center gap-2 rounded-2xl border border-black/6 bg-white px-4 py-3 transition focus-within:border-[#8dbb49]">
                      <Mail className="size-4 shrink-0 text-[#628b2f]" />
                      <input
                        required
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="name@example.com"
                        className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#10140f] outline-none placeholder:text-[#66736f] placeholder:opacity-100"
                      />
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--ink)] px-5 py-4 text-sm font-black text-white transition hover:translate-y-[-1px]"
                  >
                    تایید ایمیل و ارسال کد
                    <ArrowLeft className="size-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={submitCode} className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-[#8dbb49]/20 bg-[#f2f7e8] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-xs font-black text-[#4d7225]">{normalizedEmail}</p>
                      <button
                        type="button"
                        onClick={editEmail}
                        className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-white px-3 py-2 text-[10px] font-black text-[#628b2f]"
                      >
                        <Edit3 className="size-3" />
                        ویرایش
                      </button>
                    </div>
                    <p className="mt-2 text-[11px] font-bold leading-6 text-[#628b2f]">
                      کد تایید برای این ایمیل ارسال شد. کد را وارد کن تا وارد حساب شوی.
                    </p>
                  </div>

                  <label className="block text-[11px] font-bold text-[var(--muted)]">
                    کد ارسال شده
                    <input
                      required
                      autoFocus
                      inputMode="numeric"
                      value={code}
                      onChange={(event) => {
                        setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                        setSubmittedCode(false);
                      }}
                      placeholder="123456"
                      className="mt-2 w-full rounded-2xl border border-black/6 bg-white px-4 py-3 text-center text-lg font-black tracking-[.35em] text-[#10140f] outline-none transition placeholder:text-[#66736f] placeholder:opacity-100 focus:border-[#8dbb49]"
                    />
                  </label>

                  {submittedCode && (
                    <p className="rounded-2xl bg-[var(--soft)] px-4 py-3 text-[11px] font-bold leading-6 text-[var(--muted)]">
                      کد دریافت شد. اتصال این مرحله به سرویس احراز هویت سمت سرور انجام می شود.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={code.length < 4}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8dbb49] px-5 py-4 text-sm font-black text-white transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:bg-black/15 disabled:hover:translate-y-0"
                  >
                    تایید کد و ورود
                    <ArrowLeft className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedCode(false)}
                    className="w-full rounded-2xl border border-black/6 bg-white px-5 py-3 text-xs font-black text-[var(--muted)] transition hover:border-[#8dbb49]"
                  >
                    ارسال دوباره کد
                  </button>
                </form>
              )}

              <p className="mt-5 text-center text-[11px] leading-6 text-[var(--muted)]">
                صفحه بازیابی رمز عبور حذف شده، چون ورود فقط با ایمیل و کد تایید انجام می شود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
