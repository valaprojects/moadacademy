"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AudioWaveform,
  BookOpen,
  Camera,
  ChevronLeft,
  CircleHelp,
  GraduationCap,
  Headphones,
  Home,
  Menu,
  MessageCircle,
  Music2,
  Moon,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Sun,
  UserRound,
  Users,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
  { href: "/samples", label: "سمپل‌پک‌ها", icon: AudioWaveform },
  { href: "/courses", label: "دوره‌ها", icon: GraduationCap },
  { href: "/blog", label: "مجله", icon: BookOpen },
];

const sideItems = [
  { href: "/samples?category=drums", label: "درام و پرکاشن", icon: AudioWaveform },
  { href: "/samples?category=melody", label: "ملودی و ساز", icon: Music2 },
  { href: "/samples?category=vocal", label: "وکال و چاپ", icon: Headphones },
  { href: "/samples?category=preset", label: "پریست و بانک صدا", icon: Sparkles },
];

function Brand() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Moad Academy">
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-2xl bg-[var(--ink)] text-[var(--acid)] shadow-[0_10px_30px_rgba(15,18,13,.15)]">
        <AudioWaveform className="size-6 transition-transform group-hover:scale-110" strokeWidth={2.4} />
        <span className="absolute inset-x-2 bottom-1 h-px bg-[var(--acid)]/40" />
      </span>
      <span className="leading-none">
        <strong className="block text-[17px] font-black tracking-[-.04em] text-[var(--foreground)]">MOAD</strong>
        <span className="mt-1 block text-[9px] font-bold tracking-[.2em] text-[var(--muted)]">ACADEMY</span>
      </span>
    </Link>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="mb-8 hidden lg:block"><Brand /></div>
      <div className="mb-3 px-2 text-[11px] font-bold text-[var(--muted)]">دسته‌بندی محصولات</div>
      <nav className="space-y-1.5">
        {sideItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            onClick={onNavigate}
            className="group flex items-center justify-between rounded-2xl px-3 py-3 text-[13px] font-bold text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--foreground)]"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-black/5 bg-white shadow-sm transition group-hover:bg-[var(--acid)]">
                <Icon className="size-4" />
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

      <div className="mt-auto overflow-hidden rounded-[22px] bg-[var(--ink)] p-4 text-white">
        <div className="mb-4 flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--acid)] text-[var(--ink)]"><Headphones className="size-4" /></span>
          <span className="text-[10px] text-white/45">پشتیبانی هنرمند</span>
        </div>
        <p className="text-sm font-extrabold">برای انتخاب صدا کمک می‌خواهی؟</p>
        <Link href="/contact" onClick={onNavigate} className="mt-3 flex items-center justify-between text-[11px] font-bold text-[var(--acid)]">
          گپ با ما <ChevronLeft className="size-4" />
        </Link>
      </div>
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
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(247,248,243,.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1500px] items-center gap-5 px-4 sm:px-7">
        <button onClick={onMenu} className="grid size-11 place-items-center rounded-2xl border border-black/8 bg-white lg:hidden" aria-label="باز کردن منو"><Menu className="size-5" /></button>
        <div className="lg:hidden"><Brand /></div>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`rounded-xl px-3 py-2 text-[12px] font-bold transition ${pathname === item.href ? "bg-[var(--ink)] text-white" : "text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)]"}`}>{item.label}</Link>
          ))}
        </nav>
        <button onClick={onSearch} className="mr-auto hidden h-11 w-full max-w-[350px] items-center gap-3 rounded-2xl border border-black/6 bg-white px-4 text-right text-xs text-[var(--muted)] shadow-[0_8px_30px_rgba(15,18,13,.03)] sm:flex">
          <Search className="size-4" />
          دنبال سمپل، ژانر یا دوره بگرد...
          <span className="mr-auto rounded-lg bg-[var(--soft)] px-2 py-1 font-mono text-[9px]">⌘ K</span>
        </button>
        <button onClick={onSearch} className="mr-auto grid size-11 place-items-center rounded-2xl bg-white sm:hidden" aria-label="جستجو"><Search className="size-5" /></button>
        <Link href="/cart" className="relative grid size-11 place-items-center rounded-2xl border border-black/8 bg-white transition hover:-translate-y-0.5" aria-label="سبد خرید">
          <ShoppingBag className="size-5" />
          {count > 0 && <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-[var(--acid)] text-[9px] font-black text-[var(--ink)]">{count}</span>}
        </Link>
        <button onClick={onTheme} className="grid size-11 place-items-center rounded-2xl border border-black/8 bg-white transition hover:-translate-y-0.5" aria-label={theme === "dark" ? "فعال‌کردن تم روشن" : "فعال‌کردن تم تیره"} title={theme === "dark" ? "تم روشن" : "تم تیره"}>{theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}</button>
        <button className="hidden h-11 items-center gap-2 rounded-2xl bg-[var(--ink)] px-4 text-xs font-bold text-white md:flex"><UserRound className="size-4" /> ورود / ثبت‌نام</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-3 mb-3 mt-24 overflow-hidden rounded-[34px] bg-[var(--ink)] text-white sm:mx-6">
      <div className="grid gap-12 px-6 py-12 md:grid-cols-[1.4fr_.8fr_.8fr] md:px-10">
        <div>
          <div className="flex items-center gap-3 text-[var(--acid)]"><AudioWaveform className="size-7" /><strong className="text-xl tracking-tight">MOAD ACADEMY</strong></div>
          <p className="mt-5 max-w-md text-sm leading-8 text-white/55">خانه‌ی صداهای تازه و آموزش‌های بی‌حاشیه برای موزیسین‌هایی که می‌خواهند هر قطعه، یک قدم به امضای شخصی‌شان نزدیک‌تر باشد.</p>
          <div className="mt-6 flex gap-2"><a href="#" className="social-button" aria-label="Instagram"><Camera /></a><a href="#" className="social-button" aria-label="Youtube"><Video /></a><a href="#" className="social-button" aria-label="Telegram"><Send /></a></div>
        </div>
        <div><h3 className="mb-4 text-sm font-extrabold text-[var(--acid)]">دسترسی سریع</h3><div className="space-y-3 text-xs text-white/55"><Link className="block hover:text-white" href="/samples">سمپل‌پک‌ها</Link><Link className="block hover:text-white" href="/courses">دوره‌های آموزشی</Link><Link className="block hover:text-white" href="/blog">مجله موآد</Link><Link className="block hover:text-white" href="/about">داستان ما</Link></div></div>
        <div><h3 className="mb-4 text-sm font-extrabold text-[var(--acid)]">همراهی و پشتیبانی</h3><div className="space-y-3 text-xs text-white/55"><Link className="block hover:text-white" href="/contact">تماس با ما</Link><Link className="block hover:text-white" href="/faq">سوالات متداول</Link><span className="block">شنبه تا پنجشنبه، ۹ تا ۱۸</span><span className="block text-white">hello@moadacademy.ir</span></div></div>
      </div>
      <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-5 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10"><span>© ۱۴۰۵ تمامی حقوق برای Moad Academy محفوظ است.</span><span>ساخته شده برای کسانی که صدا را جدی می‌گیرند.</span></div>
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

  return (
    <ShopContext.Provider value={value}>
      <div className="min-h-screen lg:pr-[286px]">
        <aside className="fixed inset-y-3 right-3 z-50 hidden w-[266px] overflow-hidden rounded-[30px] border border-black/6 bg-white shadow-[0_20px_70px_rgba(18,24,15,.08)] lg:block"><Sidebar /></aside>
        <Header onMenu={() => setDrawer(true)} onSearch={() => setSearch(true)} theme={theme} onTheme={() => { const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = next; localStorage.setItem("moad-theme", next); setTheme(next); }} />
        <main>{children}</main>
        <Footer />
      </div>
      <AnimatePresence>
        {drawer && <motion.div className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)}><motion.aside className="absolute inset-y-2 right-2 w-[min(88vw,320px)] overflow-hidden rounded-[28px] bg-white" initial={{ x: 350 }} animate={{ x: 0 }} exit={{ x: 350 }} transition={{ type: "spring", damping: 28, stiffness: 260 }} onClick={(event) => event.stopPropagation()}><button onClick={() => setDrawer(false)} className="absolute left-4 top-4 z-10 grid size-9 place-items-center rounded-xl bg-[var(--soft)]"><X className="size-4" /></button><Sidebar onNavigate={() => setDrawer(false)} /></motion.aside></motion.div>}
      </AnimatePresence>
      <SearchDialog open={search} close={() => setSearch(false)} />
    </ShopContext.Provider>
  );
}
