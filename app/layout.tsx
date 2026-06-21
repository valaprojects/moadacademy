import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import SiteShell from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Moad Academy | صدای بعدی‌ات را بساز",
    template: "%s | Moad Academy",
  },
  description: "سمپل‌پک، بانک صدا و آموزش‌های کاربردی تولید موسیقی برای ساخت صدایی که امضای خودت را دارد.",
  keywords: ["سمپل پک", "آموزش موسیقی", "بیت سازی", "میکس", "پروداکشن موسیقی"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('moad-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`,
          }}
        />
      </head>
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
