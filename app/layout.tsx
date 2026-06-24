import type { Metadata, Viewport } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import SiteShell from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://moad.studio"),
  title: {
    default: "موآد استودیو | صدای بعدی‌ات را بساز",
    template: "%s | موآد استودیو",
  },
  description: "سمپل‌پک، بانک صدا و آموزش‌های کاربردی تولید موسیقی برای ساخت صدایی که امضای خودت را دارد.",
  keywords: ["سمپل پک", "آموزش موسیقی", "بیت سازی", "میکس", "تولید موسیقی"],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "موآد استودیو",
    title: "موآد استودیو",
    description: "سمپل‌پک و آموزش کاربردی تولید موسیقی",
    url: "https://moad.studio",
    locale: "fa_IR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9eee3" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f0b" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
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
