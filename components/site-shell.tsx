"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AudioWaveform,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  CircleHelp,
  CreditCard,
  GraduationCap,
  Headphones,
  Home,
  Menu,
  MessageCircle,
  Music2,
  Moon,
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { samplePacks } from "@/lib/data";

type CartLine = { slug: string; quantity: number };
type ShopContextValue = {
  items: CartLine[];
  count: number;
  addToCart: (slug: string) => void;
  changeQuantity: (slug: string, change: number) => void;
  removeFromCart: (slug: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside SiteShell");
  return value;
}

const navItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/shop", label: "محصولات", icon: AudioWaveform },
  { href: "/courses", label: "دوره‌های رایگان", icon: GraduationCap },
  { href: "/blog", label: "مجله", icon: BookOpen },
  { href: "/consultation", label: "مشاوره", icon: MessageCircle },
];

const sideItems = [
  { href: "/shop?category=drums", label: "درام و پرکاشن", icon: AudioWaveform },
  { href: "/shop?category=melody", label: "ملودی و ساز", icon: Music2 },
  { href: "/shop?category=vocal", label: "وکال و چاپ", icon: Headphones },
  { href: "/shop?category=preset", label: "پریست و بانک صدا", icon: Sparkles },
];

function Brand() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="موآد استودیو">
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-2xl bg-[var(--ink)] text-[var(--acid)] shadow-[0_10px_30px_rgba(15,18,13,.15)]">
        <AudioWaveform className="size-6 transition-transform group-hover:scale-110" strokeWidth={2.4} />
        <span className="absolute inset-x-2 bottom-1 h-px bg-[var(--acid)]/40" />
      </span>
      <span className="leading-none">
        <strong className="block text-[15px] font-black text-[var(--foreground)]">موآد</strong>
        <span className="mt-1 block text-[9px] font-bold text-[var(--muted)]">استودیو موسیقی</span>
      </span>
    </Link>
  );
}

function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.9 4.17c.37-.13.73.19.62.56l-4.15 14.18c-.12.42-.64.56-.96.26l-3.72-3.45-2.03 1.95c-.31.3-.84.08-.84-.35v-2.92l7.58-6.9c.22-.2-.04-.52-.29-.35L7.77 13.3 4.1 12.13c-.46-.15-.5-.78-.06-.99L20.9 4.17Z" />
    </svg>
  );
}

function Sidebar({ onNavigate, onSearch, theme, onTheme }: { onNavigate?: () => void; onSearch?: () => void; theme?: "light" | "dark"; onTheme?: () => void }) {
  return (
    <div className="flex min-h-full flex-col p-5">
      <div className="mb-5 pr-1 lg:mb-8"><Brand /></div>
      <div className="mb-6 grid grid-cols-2 gap-2 lg:hidden">
        <button onClick={onSearch} className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-black/7 bg-[var(--soft)] text-[11px] font-extrabold text-[var(--foreground)]">
          <Search className="size-4" /> جستجو
        </button>
        <button onClick={onTheme} className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-black/7 bg-[var(--soft)] text-[11px] font-extrabold text-[var(--foreground)]">
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          {theme === "dark" ? "تم روشن" : "تم تیره"}
        </button>
      </div>

      <nav className="mb-5 space-y-1.5 lg:hidden">
        <Link onClick={onNavigate} href="/" className="side-sub-link"><Home className="size-4" /> خانه</Link>
        <Link onClick={onNavigate} href="/shop" className="side-sub-link"><AudioWaveform className="size-4" /> محصولات</Link>
        <Link onClick={onNavigate} href="/courses" className="side-sub-link"><GraduationCap className="size-4" /> دوره‌های رایگان</Link>
        <Link onClick={onNavigate} href="/blog" className="side-sub-link"><BookOpen className="size-4" /> مجله</Link>
        <Link onClick={onNavigate} href="/consultation" className="side-sub-link"><MessageCircle className="size-4" /> مشاوره</Link>
        <Link onClick={onNavigate} href="/account" className="side-sub-link"><Users className="size-4" /> پنل کاربری</Link>
      </nav>

      <div className="mb-3 hidden px-2 text-[11px] font-bold text-[var(--muted)] lg:block">دسته‌بندی محصولات</div>
      <nav className="hidden space-y-1.5 lg:block">
        {sideItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            onClick={onNavigate}
            className="group flex items-center justify-between rounded-2xl px-3 py-3 text-[13px] font-bold text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--foreground)]"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-black/5 shadow-sm transition group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)] group-hover:shadow-[0_0_22px_rgba(186,244,81,.35)]">
                <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
              </span>
              {label}
            </span>
            <ChevronLeft className="size-4 opacity-35 transition group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        ))}
      </nav>

      <div className="my-5 h-px bg-black/6" />
      <nav className="space-y-1 text-[13px] font-semibold text-[var(--muted)]">
        <Link onClick={onNavigate} href="/about" className="side-sub-link"><Users className="size-4" /> درباره ما</Link>
        <Link onClick={onNavigate} href="/contact" className="side-sub-link"><MessageCircle className="size-4" /> تماس با ما</Link>
        <Link onClick={onNavigate} href="/faq" className="side-sub-link"><CircleHelp className="size-4" /> سوالات متداول</Link>
      </nav>

      <Link href="/consultation" onClick={onNavigate} className="group mt-auto block overflow-hidden rounded-[22px] bg-[var(--ink)] p-4 text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(186,244,81,.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acid)]">
        <div className="mb-4 flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--acid)] text-[var(--ink)]"><Headphones className="size-4" /></span>
          <span className="text-[10px] text-white/45">پشتیبانی هنرمند</span>
        </div>
        <p className="text-sm font-extrabold">نمی‌دانی از کجا شروع کنی؟</p>
        <span className="mt-3 flex items-center justify-between text-[11px] font-bold text-[var(--acid)]">
          مشاوره انتخاب مسیر <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        </span>
      </Link>
    </div>
  );
}

function SearchDialog({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => samplePacks.filter((item) => `${item.title} ${item.enTitle} ${item.genre}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4),
    [query],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] grid place-items-start bg-[#0c0f0a]/65 p-4 pt-[10vh] backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div className="mx-auto w-full max-w-2xl rounded-[30px] bg-[var(--paper)] p-3 shadow-2xl" initial={{ opacity: 0, y: -20, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: .98 }} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 rounded-[22px] border border-black/8 bg-white px-4">
              <Search className="size-5 text-[var(--muted)]" />
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} className="h-14 flex-1 bg-transparent text-sm outline-none" placeholder="دنبال چه صدایی می‌گردی؟" />
              <button onClick={close} className="grid size-9 place-items-center rounded-xl bg-[var(--soft)]"><X className="size-4" /></button>
            </div>
            <div className="p-3">
              <p className="mb-2 text-[11px] font-bold text-[var(--muted)]">{query ? `${results.length} نتیجه پیدا شد` : "پیشنهادهای محبوب"}</p>
              {results.map((item) => (
                <Link key={item.slug} href={`/samples/${item.slug}`} onClick={close} className="flex items-center justify-between rounded-2xl p-3 transition hover:bg-white">
                  <span className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl" style={{ background: item.color, color: item.accent }}><AudioWaveform className="size-5" /></span>
                    <span><strong className="block text-sm">{item.title}</strong><small className="text-[10px] text-[var(--muted)]">{item.genre}</small></span>
                  </span>
                  <ChevronLeft className="size-4 text-[var(--muted)]" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({ onMenu, onSearch, theme, onTheme }: { onMenu: () => void; onSearch: () => void; theme: "light" | "dark"; onTheme: () => void }) {
  const pathname = usePathname();
  const { count } = useShop();
  const [productsOpen, setProductsOpen] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (event: PointerEvent) => {
      if (!productsMenuRef.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProductsOpen(false);
    };
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeWithKeyboard);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeWithKeyboard);
    };
  }, []);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-black/5 backdrop-blur-xl">
      <div className="relative mx-auto flex h-[70px] max-w-[1500px] items-center gap-5 px-4 sm:px-7 lg:h-[78px]">
        <button onClick={onMenu} className="grid size-11 place-items-center rounded-2xl border border-black/8 bg-white lg:hidden" aria-label="باز کردن منو"><Menu className="size-5" /></button>
        <div className="absolute left-1/2 -translate-x-1/2 scale-90 lg:hidden"><Brand /></div>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => item.href === "/shop" ? (
            <div
              key={item.href}
              ref={productsMenuRef}
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-full h-3" />
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={productsOpen}
                onClick={() => setProductsOpen((open) => !open)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold transition ${pathname.startsWith("/shop") || pathname.startsWith("/samples") ? "bg-[var(--ink)] text-white" : "text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)]"}`}
              >
                {item.label}
                <ChevronDown className={`size-3.5 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    role="menu"
                    aria-label="دسته‌بندی محصولات"
                    initial={{ opacity: 0, y: 8, scale: .98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: .985 }}
                    transition={{ duration: .2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: "var(--card)",
                      backdropFilter: "blur(24px) saturate(135%)",
                      WebkitBackdropFilter: "blur(24px) saturate(135%)",
                    }}
                    className="product-dropdown absolute right-0 top-[calc(100%+10px)] z-[60] w-[540px] overflow-hidden rounded-[26px] border border-black/7 p-2 shadow-[0_24px_80px_rgba(17,22,14,.16)]"
                  >
                    <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
                      <div>
                        <p className="text-[13px] font-black text-[var(--foreground)]">دنیای صدای موآد</p>
                        <p className="mt-1 text-[10px] font-medium text-[var(--muted)]">دسته مناسب پروژه‌ات را انتخاب کن</p>
                      </div>
                      <Link href="/shop" role="menuitem" onClick={() => setProductsOpen(false)} className="flex items-center gap-1 rounded-xl bg-[var(--soft)] px-3 py-2 text-[10px] font-extrabold text-[var(--foreground)] transition hover:bg-[var(--acid)] hover:text-[var(--ink)]">
                        همه محصولات <ChevronLeft className="size-3.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {sideItems.map(({ href, label, icon: Icon }, index) => (
                        <Link key={href} href={href} role="menuitem" onClick={() => setProductsOpen(false)} className="product-dropdown-item group flex items-center gap-3 rounded-[18px] p-3 transition duration-300 hover:bg-[var(--soft)]">
                          <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-[var(--soft)] text-[var(--foreground)] transition duration-300 group-hover:bg-[var(--acid)] group-hover:text-[var(--ink)] group-hover:shadow-[0_0_22px_rgba(186,244,81,.3)]">
                            <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" />
                          </span>
                          <span className="min-w-0">
                            <strong className="block text-[12px] font-extrabold text-[var(--foreground)]">{label}</strong>
                            <small className="mt-1 block text-[9px] font-medium text-[var(--muted)]">{["ریتم، لوپ و وان‌شات", "ملودی، ساز و تکسچر", "وکال، چاپ و افکت", "پریست و صداهای آماده"][index]}</small>
                          </span>
                          <ChevronLeft className="mr-auto size-3.5 -translate-x-1 text-[var(--muted)] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      ))}
                    </div>
                    <Link href="/consultation" role="menuitem" onClick={() => setProductsOpen(false)} className="group mt-2 flex items-center justify-between rounded-[18px] bg-[var(--ink)] px-4 py-3 text-white transition hover:shadow-[0_0_28px_rgba(186,244,81,.14)]">
                      <span className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-xl bg-[var(--acid)] text-[var(--ink)]"><Headphones className="size-4" /></span>
                        <span><strong className="block text-[11px] font-extrabold">از کجا شروع کنم؟</strong><small className="mt-0.5 block text-[9px] text-white/50">با چند سؤال، انتخاب مناسب را پیدا کن</small></span>
                      </span>
                      <ChevronLeft className="size-4 text-[var(--acid)] transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link key={item.href} href={item.href} className={`rounded-xl px-3 py-2 text-[12px] font-bold transition ${pathname === item.href ? "bg-[var(--ink)] text-white" : "text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)]"}`}>{item.label}</Link>
          ))}
        </nav>
        <button onClick={onSearch} className="mr-auto hidden h-11 w-full max-w-[350px] items-center gap-3 rounded-2xl border border-black/6 bg-white px-4 text-right text-xs text-[var(--muted)] shadow-[0_8px_30px_rgba(15,18,13,.03)] lg:flex">
          <Search className="size-4" />
          دنبال سمپل، ژانر یا دوره بگرد...
          <span className="mr-auto rounded-lg bg-[var(--soft)] px-2 py-1 font-mono text-[9px]">⌘ K</span>
        </button>
        <div className="mr-auto flex items-center gap-2 lg:mr-0">
          <Link href="/account" className="grid size-11 place-items-center rounded-2xl border border-black/8 bg-white transition hover:-translate-y-0.5" aria-label="پنل کاربری">
            <Users className="size-5" />
          </Link>
          <Link href="/cart" className="relative grid size-11 place-items-center rounded-2xl border border-black/8 bg-white transition hover:-translate-y-0.5" aria-label="سبد خرید">
            <ShoppingBag className="size-5" />
            {count > 0 && <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-[var(--acid)] text-[9px] font-black text-[var(--ink)]">{count}</span>}
          </Link>
        </div>
        <button onClick={onTheme} className="hidden size-11 place-items-center rounded-2xl border border-black/8 bg-white transition hover:-translate-y-0.5 lg:grid" aria-label={theme === "dark" ? "فعال‌کردن تم روشن" : "فعال‌کردن تم تیره"} title={theme === "dark" ? "تم روشن" : "تم تیره"}>{theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-3 mb-3 mt-24 overflow-hidden rounded-[34px] bg-[var(--ink)] text-white sm:mx-6">
      <div className="grid gap-12 px-6 py-12 md:grid-cols-[1.4fr_.8fr_.8fr] md:px-10">
        <div>
          <div className="flex items-center gap-3 text-[var(--acid)]"><AudioWaveform className="size-7" /><strong className="text-xl">موآد استودیو</strong></div>
          <p className="mt-5 max-w-md text-sm leading-8 text-white/55">خانه‌ی صداهای تازه و آموزش‌های بی‌حاشیه برای موزیسین‌هایی که می‌خواهند هر قطعه، یک قدم به امضای شخصی‌شان نزدیک‌تر باشد.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#" className="social-button" aria-label="اینستاگرام"><InstagramIcon className="size-6" /></a>
            <a href="#" className="social-button" aria-label="تلگرام"><TelegramIcon className="size-6" /></a>
            <a
              referrerPolicy="origin"
              target="_blank"
              rel="noopener noreferrer"
              href="https://trustseal.enamad.ir/?id=740856&Code=dXrKi2eoAQJbPDXYf6sAtX22yl7TGpFN"
              className="social-button"
              aria-label="نماد اعتماد الکترونیکی موآد استودیو"
            >
              <Image
                src="/images/enamad-trust.png"
                alt="نماد اعتماد الکترونیکی"
                width={22}
                height={22}
                className="footer-trust-mark size-7 object-contain"
              />
            </a>
            <a href="#" className="social-button" aria-label="نماد درگاه پرداخت زیبال"><CreditCard className="size-6" /></a>
          </div>
          <div className="mt-7 grid grid-cols-4 gap-2 md:hidden">
            <Link href="/shop" className="grid place-items-center gap-2 rounded-2xl border border-white/10 py-3 text-[9px] text-white/60"><ShoppingBag className="size-4 text-[var(--acid)]" />محصولات</Link>
            <Link href="/courses" className="grid place-items-center gap-2 rounded-2xl border border-white/10 py-3 text-[9px] text-white/60"><GraduationCap className="size-4 text-[var(--acid)]" />دوره رایگان</Link>
            <Link href="/faq" className="grid place-items-center gap-2 rounded-2xl border border-white/10 py-3 text-[9px] text-white/60"><CircleHelp className="size-4 text-[var(--acid)]" />پرسش‌ها</Link>
            <Link href="/contact" className="grid place-items-center gap-2 rounded-2xl border border-white/10 py-3 text-[9px] text-white/60"><MessageCircle className="size-4 text-[var(--acid)]" />تماس</Link>
          </div>
        </div>
        <div className="hidden md:block"><h3 className="mb-4 text-sm font-extrabold text-[var(--acid)]">دسترسی سریع</h3><div className="space-y-3 text-xs text-white/55"><Link className="block hover:text-white" href="/shop">محصولات</Link><Link className="block hover:text-white" href="/courses">دوره‌های رایگان</Link><Link className="block hover:text-white" href="/blog">مجله موآد</Link><Link className="block hover:text-white" href="/about">داستان ما</Link></div></div>
        <div className="hidden md:block"><h3 className="mb-4 text-sm font-extrabold text-[var(--acid)]">همراهی و پشتیبانی</h3><div className="space-y-3 text-xs text-white/55"><Link className="block hover:text-white" href="/contact">تماس با ما</Link><Link className="block hover:text-white" href="/faq">سوالات متداول</Link><span className="block">شنبه تا پنجشنبه، ۹ تا ۱۸</span><span className="block text-white">hello@moad.studio</span></div></div>
      </div>
      <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-5 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10"><span>© ۱۴۰۵ تمامی حقوق برای موآد استودیو محفوظ است.</span><span>ساخته شده برای کسانی که صدا را جدی می‌گیرند.</span></div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("moad-cart");
    const timer = window.setTimeout(() => {
      if (saved) setItems(JSON.parse(saved));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"), 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { localStorage.setItem("moad-cart", JSON.stringify(items)); }, [items]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearch(true); }
      if (event.key === "Escape") { setSearch(false); setDrawer(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const value = useMemo<ShopContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    addToCart: (slug) => setItems((current) => current.some((item) => item.slug === slug) ? current.map((item) => item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { slug, quantity: 1 }]),
    changeQuantity: (slug, change) => setItems((current) => current.map((item) => item.slug === slug ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0)),
    removeFromCart: (slug) => setItems((current) => current.filter((item) => item.slug !== slug)),
  }), [items]);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("moad-theme", next);
    setTheme(next);
  };

  return (
    <ShopContext.Provider value={value}>
      <div className="min-h-screen lg:pr-[286px]">
        <aside className="fixed inset-y-3 right-3 z-50 hidden w-[266px] overflow-hidden rounded-[30px] border border-black/6 bg-white shadow-[0_20px_70px_rgba(18,24,15,.08)] lg:block"><Sidebar /></aside>
        <Header onMenu={() => setDrawer(true)} onSearch={() => setSearch(true)} theme={theme} onTheme={toggleTheme} />
        <main>{children}</main>
        <Footer />
      </div>
      <AnimatePresence>
        {drawer && <motion.div className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)}><motion.aside className="absolute inset-y-2 right-2 w-[min(88vw,320px)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[28px] bg-white" initial={{ x: 350 }} animate={{ x: 0 }} exit={{ x: 350 }} transition={{ type: "spring", damping: 28, stiffness: 260 }} onClick={(event) => event.stopPropagation()}><button onClick={() => setDrawer(false)} className="sticky left-4 top-4 z-10 float-left grid size-9 place-items-center rounded-xl bg-[var(--soft)] shadow-sm" aria-label="بستن منو"><X className="size-4" /></button><Sidebar onNavigate={() => setDrawer(false)} onSearch={() => { setDrawer(false); setSearch(true); }} theme={theme} onTheme={toggleTheme} /></motion.aside></motion.div>}
      </AnimatePresence>
      <SearchDialog open={search} close={() => setSearch(false)} />
    </ShopContext.Provider>
  );
}
