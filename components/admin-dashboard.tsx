"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  AudioWaveform,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  CircleDollarSign,
  Compass,
  FileText,
  FolderTree,
  Headphones,
  Image as ImageIcon,
  KeyRound,
  Layers3,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Moon,
  Package,
  PlayCircle,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Tags,
  Upload,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";

type AdminTheme = "light" | "dark";
type SectionId =
  | "overview"
  | "content"
  | "products"
  | "courses"
  | "users"
  | "settings"
  | "communication"
  | "reports";

type IconType = typeof LayoutDashboard;

const acid = "#21DACC";

const sections: Array<{ id: SectionId; label: string; hint: string; icon: IconType }> = [
  { id: "overview", label: "داشبورد", hint: "نمای زنده سایت", icon: LayoutDashboard },
  { id: "content", label: "محتوا", hint: "نوشته، برگه، SEO", icon: FileText },
  { id: "products", label: "محصولات", hint: "فایل، قیمت، نسخه", icon: Package },
  { id: "courses", label: "دوره ها", hint: "جلسه، SpotPlayer", icon: BookOpen },
  { id: "users", label: "کاربران", hint: "نقش و دسترسی", icon: Users },
  { id: "settings", label: "تنظیمات", hint: "قالب، منو، رسانه", icon: Settings },
  { id: "communication", label: "ارتباطات", hint: "پیامک و پشتیبانی", icon: MessageSquareText },
  { id: "reports", label: "گزارشات", hint: "فروش و عملکرد", icon: BarChart3 },
];

const sectionTitles: Record<SectionId, { title: string; text: string }> = {
  overview: {
    title: "مرکز فرماندهی موآد آکادمی",
    text: "وضعیت محتوا، فروش، دوره ها، کاربران و پشتیبانی را با همان زبان بصری سایت اصلی مدیریت کن.",
  },
  content: {
    title: "استودیوی محتوا",
    text: "نوشته ها، برگه ها، دسته بندی ها، برچسب ها، زمان بندی انتشار، پیش نویس و بازبینی را یکپارچه کنترل کن.",
  },
  products: {
    title: "اتاق محصولات دانلودی",
    text: "محصول، قیمت، تخفیف، فایل دانلودی، وضعیت انتشار و نسخه های مختلف را سریع و دقیق مدیریت کن.",
  },
  courses: {
    title: "مدیریت دوره و SpotPlayer",
    text: "دوره، فصل، جلسه، فایل، ویدئو، لایسنس SpotPlayer و دانشجویان هر دوره در یک مسیر مشخص قرار دارند.",
  },
  users: {
    title: "کاربران و دسترسی ها",
    text: "مشتریان، فروشندگان، دانشجویان، نقش ها، سطح دسترسی و وضعیت حساب ها را از یک مرکز مدیریت کن.",
  },
  settings: {
    title: "تنظیمات سایت و قالب",
    text: "تنظیمات عمومی، قالب، بخش ها، منوها، صفحات، SEO، اسلایدرها، بنرها و رسانه ها اینجا مدیریت می شوند.",
  },
  communication: {
    title: "سیستم ارتباطی",
    text: "پنل پیامکی، پیامک های خودکار، چت آنلاین، پشتیبانی و مکالمات کاربران را در یک جریان پاسخگو نگه دار.",
  },
  reports: {
    title: "گزارشات مدیریتی",
    text: "فروش، سفارش ها، محصولات، عملکرد فروشندگان و رفتار کاربران را برای تصمیم گیری روزانه ببین.",
  },
};

const kpis = [
  { label: "فروش امروز", value: "۲۴۸.۶M", change: "+۱۸٪", icon: CircleDollarSign },
  { label: "سفارش فعال", value: "۱۲۸", change: "۲۴ جدید", icon: Package },
  { label: "دانشجو", value: "۳,۴۲۰", change: "+۱۴۲", icon: BookOpen },
  { label: "تیکت باز", value: "۱۹", change: "۶ فوری", icon: Headphones },
];

type ContentWorkspace = "all" | "articles" | "pages" | "seo" | "calendar" | "media";
type ContentItem = {
  id: string;
  title: string;
  type: string;
  area: ContentWorkspace;
  status: string;
  date: string;
  href: string;
  seo: number;
  summary: string;
};

const contentWorkspaces: Array<{ id: ContentWorkspace; label: string; icon: IconType }> = [
  { id: "all", label: "همه محتوا", icon: LayoutDashboard },
  { id: "articles", label: "مجله و آموزش", icon: FileText },
  { id: "pages", label: "صفحات سایت", icon: FolderTree },
  { id: "seo", label: "سئو", icon: Search },
  { id: "calendar", label: "تقویم انتشار", icon: CalendarDays },
  { id: "media", label: "رسانه", icon: ImageIcon },
];

const contentItems: ContentItem[] = [
  { id: "home", title: "صفحه اصلی موآد", type: "لندینگ", area: "pages", status: "منتشر شده", date: "امروز", href: "/", seo: 96, summary: "بنر اصلی، مارquee کلمات کلیدی، محصولات منتخب، مشاوره و خبرنامه." },
  { id: "shop", title: "فروشگاه محصولات", type: "صفحه", area: "pages", status: "منتشر شده", date: "امروز", href: "/shop", seo: 91, summary: "لیست محصولات، جستجو، دسته‌بندی و کارت‌های سمپل‌پک." },
  { id: "samples-midnight", title: "نیمه‌شب آراندبی", type: "محصول", area: "seo", status: "نیازمند سئو", date: "فردا", href: "/samples/midnight-rnb", seo: 74, summary: "صفحه محصول با پلیر ویدئو، میکسر صوتی، نمونه‌کار هنرجو و تب‌ها." },
  { id: "courses", title: "دوره‌های رایگان", type: "صفحه", area: "pages", status: "منتشر شده", date: "امروز", href: "/courses", seo: 88, summary: "لیست دوره‌ها، دسته‌بندی، صفحات فصل و قسمت‌های مستقل برای سئو." },
  { id: "blog-drums", title: "چطور درام‌هایی بسازیم که واقعاً ضربه بزنند؟", type: "مقاله", area: "articles", status: "زمان‌بندی شده", date: "۱۴۰۳/۰۸/۲۲", href: "/blog/make-drums-hit-harder", seo: 82, summary: "مقاله آموزشی با ویدئو، سایدبار فصل‌ها و مسیر مطالعه." },
  { id: "consultation", title: "مشاوره انتخاب مسیر", type: "صفحه", area: "pages", status: "در بازبینی", date: "۱۴۰۳/۰۸/۲۰", href: "/consultation", seo: 79, summary: "سؤال‌جواب نقش کاربر و پیشنهاد محصول مناسب برای شروع." },
  { id: "media-audio", title: "دموهای صوتی محصول دانلودی", type: "رسانه", area: "media", status: "کامل", date: "دیروز", href: "/samples/midnight-rnb", seo: 86, summary: "فایل‌های صوتی، میکسر و نمونه‌کارهای هنرجو در صفحه محصول." },
];

const contentCategories = ["مجله آموزشی", "صفحات اصلی", "محصولات دانلودی", "دوره‌های رایگان", "مشاوره مسیر", "سوالات متداول"];
const contentTags = ["میکس", "سمپل پک", "بیت‌سازی", "وکال", "سئو محصول", "آموزش رایگان", "پلیر صوتی", "SpotPlayer"];

type ProductWorkspace = "all" | "published" | "drafts" | "files" | "media" | "seo";
type AdminProduct = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  price: string;
  discount: string;
  sales: string;
  revenue: string;
  seo: number;
  href: string;
  summary: string;
  files: string[];
  missing: string[];
};

const productWorkspaces: Array<{ id: ProductWorkspace; label: string; icon: IconType }> = [
  { id: "all", label: "همه محصولات", icon: Package },
  { id: "published", label: "منتشرشده", icon: ShieldCheck },
  { id: "drafts", label: "پیش‌نویس", icon: FileText },
  { id: "files", label: "فایل‌ها", icon: Upload },
  { id: "media", label: "رسانه و پلیر", icon: PlayCircle },
  { id: "seo", label: "سئو محصول", icon: Search },
];

const adminProducts: AdminProduct[] = [
  {
    id: "midnight-rnb",
    title: "نیمه‌شب آراندبی",
    slug: "midnight-rnb",
    category: "آراندبی / سول",
    status: "منتشر شده",
    price: "۵۴۹,۰۰۰",
    discount: "۰٪",
    sales: "۶۸",
    revenue: "۳۷.۳M",
    seo: 92,
    href: "/samples/midnight-rnb",
    summary: "محصول دانلودی با بنر، ویدئوی معرفی، نمونه‌های صوتی، میکسر و نمونه‌کار هنرجو.",
    files: ["Main Pack.zip", "Demo Loops.zip", "License.pdf"],
    missing: [],
  },
  {
    id: "tehran-after-dark",
    title: "تهران بعد از تاریکی",
    slug: "tehran-after-dark",
    category: "هیپ‌هاپ / بوم‌بپ",
    status: "نیازمند فایل",
    price: "۷۷۹,۰۰۰",
    discount: "۱۲٪",
    sales: "۹۶",
    revenue: "۷۴.۸M",
    seo: 78,
    href: "/samples/tehran-after-dark",
    summary: "صفحه محصول آماده است اما نسخه دانلودی نهایی و چند دمو صوتی هنوز باید تکمیل شوند.",
    files: ["Cover.jpg", "Preview.mp4"],
    missing: ["فایل دانلودی نهایی", "دموهای صوتی"],
  },
  {
    id: "neon-persian-drums",
    title: "درام‌های نئون پرشین",
    slug: "neon-persian-drums",
    category: "درام و پرکاشن",
    status: "پیش‌نویس",
    price: "۶۸۹,۰۰۰",
    discount: "۲۰٪",
    sales: "۱۲",
    revenue: "۸.۲M",
    seo: 81,
    href: "/samples/neon-persian-drums",
    summary: "محصول جدید برای صفحه فروشگاه؛ نیازمند تکمیل توضیحات، میکسر و نمونه‌کار هنرجو.",
    files: ["Drum One Shots.zip", "Rhythm Loops.zip"],
    missing: ["ویدئوی معرفی", "نمونه‌کار هنرجو"],
  },
  {
    id: "organic-house-icons",
    title: "آیین‌های ارگانیک هاوس",
    slug: "organic-house-icons",
    category: "هاوس / الکترونیک",
    status: "در بازبینی",
    price: "۶۶۹,۰۰۰",
    discount: "۰٪",
    sales: "۳۴",
    revenue: "۲۲.۷M",
    seo: 86,
    href: "/samples/organic-house-icons",
    summary: "محصول آماده انتشار با فایل‌ها و بنر کامل؛ فقط توضیحات سئو و دموهای صوتی در بازبینی هستند.",
    files: ["Full Pack.zip", "Stems.zip", "Artwork.png"],
    missing: ["متای سئو"],
  },
];

const productCategories = ["آراندبی / سول", "هیپ‌هاپ / بوم‌بپ", "درام و پرکاشن", "هاوس / الکترونیک", "وکال و چاپ", "پریست و بانک صدا"];
const productPageTabs = ["توضیحات", "نمونه‌های صوتی", "میکسر", "نمونه‌کار هنرجو", "نظرات"];
const productMediaModules = ["بنر محصول", "ویدئوی معرفی", "دموهای صوتی", "میکسر لایه‌ای", "نمونه‌کار هنرجو", "فایل دانلودی"];

type CourseWorkspace = "all" | "free" | "published" | "lessons" | "downloads" | "spotplayer" | "seo";
type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  level: string;
  chapters: number;
  lessons: number;
  students: string;
  duration: string;
  seo: number;
  spot: string;
  href: string;
  summary: string;
  downloads: string[];
  missing: string[];
  lessonRoutes: Array<{ title: string; href: string; time: string }>;
};

const courseWorkspaces: Array<{ id: CourseWorkspace; label: string; icon: IconType }> = [
  { id: "all", label: "همه دوره‌ها", icon: BookOpen },
  { id: "free", label: "رایگان", icon: Sparkles },
  { id: "published", label: "منتشرشده", icon: ShieldCheck },
  { id: "lessons", label: "فصل و قسمت", icon: Layers3 },
  { id: "downloads", label: "دانلودها", icon: Upload },
  { id: "spotplayer", label: "SpotPlayer", icon: KeyRound },
  { id: "seo", label: "سئو دوره", icon: Search },
];

const adminCourses: AdminCourse[] = [
  {
    id: "modern-beatmaking",
    title: "بیت‌سازی مدرن",
    slug: "modern-beatmaking",
    category: "تولید موسیقی",
    status: "منتشر شده",
    level: "شروع تا متوسط",
    chapters: 3,
    lessons: 8,
    students: "۳۱۲",
    duration: "۴ ساعت",
    seo: 94,
    spot: "فعال",
    href: "/courses/modern-beatmaking",
    summary: "دوره رایگان با صفحه اصلی، صفحه فصل، صفحه قسمت، پلیر آموزشی و فایل‌های تمرین.",
    downloads: ["فایل تمرین بیت‌سازی.zip", "پروژه Ableton جلسه اول", "چک‌لیست خروجی"],
    missing: [],
    lessonRoutes: [
      { title: "ایده‌پردازی و انتخاب صدا", href: "/courses/modern-beatmaking/start/idea", time: "۱۲:۴۰" },
      { title: "ساخت گروو و حرکت", href: "/courses/modern-beatmaking/arrangement/groove", time: "۱۸:۲۰" },
      { title: "تکمیل و خروجی گرفتن", href: "/courses/modern-beatmaking/arrangement/export", time: "۱۳:۵۵" },
    ],
  },
  {
    id: "creative-mixing",
    title: "میکس خلاق",
    slug: "creative-mixing",
    category: "میکس و مستر",
    status: "در بازبینی",
    level: "متوسط",
    chapters: 2,
    lessons: 6,
    students: "۱۸۳",
    duration: "۳ ساعت",
    seo: 86,
    spot: "در انتظار اتصال",
    href: "/courses/creative-mixing",
    summary: "مسیر رایگان برای بالانس، اکولایزر، کمپرس و تصمیم‌های ساده در میکس.",
    downloads: ["Session Stems.zip"],
    missing: ["تایم‌لاین‌های پلیر", "فایل تمرین فصل دوم"],
    lessonRoutes: [
      { title: "بالانس اولیه", href: "/courses/creative-mixing/balance", time: "۱۱:۳۰" },
      { title: "اکولایزر در کانتکست", href: "/courses/creative-mixing/eq/context", time: "۱۶:۱۰" },
      { title: "کمپرس کنترل‌شده", href: "/courses/creative-mixing/dynamics/compression", time: "۱۴:۰۵" },
    ],
  },
  {
    id: "sound-design-lab",
    title: "لابراتوار طراحی صدا",
    slug: "sound-design-lab",
    category: "طراحی صدا",
    status: "پیش‌نویس",
    level: "متوسط تا حرفه‌ای",
    chapters: 4,
    lessons: 12,
    students: "۲۴۶",
    duration: "۵ ساعت",
    seo: 79,
    spot: "فعال",
    href: "/courses/sound-design-lab",
    summary: "دوره پروژه‌محور برای سینت، سمپلینگ، تکسچر و ساخت صداهای اختصاصی.",
    downloads: ["Preset Pack.zip", "Sample Source.zip"],
    missing: ["ویدئوی معرفی", "متای سئو", "تصویر فصل سوم"],
    lessonRoutes: [
      { title: "ساخت بافت صوتی", href: "/courses/sound-design-lab/texture/noise", time: "۱۰:۵۰" },
      { title: "سینت و مدولیشن", href: "/courses/sound-design-lab/synth/modulation", time: "۲۰:۴۰" },
      { title: "خروجی‌گیری برای محصول", href: "/courses/sound-design-lab/export/pack", time: "۱۵:۱۵" },
    ],
  },
];

const courseCategories = ["تولید موسیقی", "میکس و مستر", "طراحی صدا", "بیت‌سازی", "رایگان", "پروژه‌محور"];
const courseModules = ["ویدئوی دوره", "تایم‌لاین پلیر", "فایل دانلودی", "صفحه فصل", "صفحه قسمت", "نظرات", "نمونه‌کار هنرجو"];

type UserWorkspace = "all" | "students" | "customers" | "vip" | "support" | "inactive" | "access";
type AdminUser = {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  level: string;
  joined: string;
  lastSeen: string;
  orders: number;
  totalSpent: string;
  courses: number;
  products: number;
  tickets: number;
  risk: string;
  note: string;
  permissions: string[];
  tags: string[];
  recentActivity: Array<{ title: string; meta: string }>;
};

const userWorkspaces: Array<{ id: UserWorkspace; label: string; icon: IconType }> = [
  { id: "all", label: "همه کاربران", icon: Users },
  { id: "students", label: "هنرجوها", icon: BookOpen },
  { id: "customers", label: "خریداران", icon: Package },
  { id: "vip", label: "VIP", icon: Sparkles },
  { id: "support", label: "پشتیبانی", icon: Headphones },
  { id: "inactive", label: "غیرفعال", icon: Bell },
  { id: "access", label: "دسترسی‌ها", icon: KeyRound },
];

const adminUsers: AdminUser[] = [
  {
    id: "arman-rezaei",
    name: "آرمان رضایی",
    phone: "0912 248 7261",
    email: "arman.rezaei@example.com",
    role: "مشتری",
    status: "فعال",
    level: "VIP",
    joined: "۱۴۰۳/۰۸/۱۲",
    lastSeen: "امروز، ۱۲:۴۰",
    orders: 12,
    totalSpent: "۲۲.۸M",
    courses: 2,
    products: 9,
    tickets: 1,
    risk: "کم",
    note: "خریدار فعال سمپل پک‌ها و علاقه‌مند به دوره‌های رایگان.",
    permissions: ["خرید محصول", "مشاهده دوره", "دانلود فایل"],
    tags: ["خریدار وفادار", "سمپل پک", "VIP"],
    recentActivity: [
      { title: "خرید نیمه‌شب آراندبی", meta: "۳ ساعت پیش" },
      { title: "مشاهده دوره بیت‌سازی مدرن", meta: "دیروز" },
      { title: "ثبت تیکت درباره دانلود", meta: "۲ روز پیش" },
    ],
  },
  {
    id: "sara-ahmadi",
    name: "سارا احمدی",
    phone: "0935 773 1180",
    email: "sara.ahmadi@example.com",
    role: "هنرجو",
    status: "فعال",
    level: "استاندارد",
    joined: "۱۴۰۳/۱۰/۰۴",
    lastSeen: "امروز، ۰۹:۱۸",
    orders: 3,
    totalSpent: "۴.۶M",
    courses: 4,
    products: 2,
    tickets: 0,
    risk: "کم",
    note: "در دوره‌های رایگان فعال است و چند نمونه‌کار برای بررسی ارسال کرده.",
    permissions: ["مشاهده دوره", "ثبت نظر", "ارسال نمونه‌کار"],
    tags: ["هنرجو", "نمونه‌کار", "فعال"],
    recentActivity: [
      { title: "ارسال نمونه‌کار برای میکس خلاق", meta: "امروز" },
      { title: "تکمیل قسمت ساخت گروو", meta: "دیروز" },
      { title: "ثبت نظر برای دوره", meta: "هفته قبل" },
    ],
  },
  {
    id: "nima-kazemi",
    name: "نیما کاظمی",
    phone: "0901 556 3402",
    email: "nima.kazemi@example.com",
    role: "فروشنده",
    status: "در انتظار تایید",
    level: "همکار",
    joined: "۱۴۰۴/۰۱/۲۲",
    lastSeen: "۴ ساعت پیش",
    orders: 4,
    totalSpent: "۸.۳M",
    courses: 1,
    products: 4,
    tickets: 3,
    risk: "متوسط",
    note: "برای انتشار چند پک صوتی نیازمند تایید هویت و بررسی فایل‌هاست.",
    permissions: ["افزودن محصول", "مشاهده گزارش", "پاسخ به دیدگاه"],
    tags: ["فروشنده", "نیازمند تایید", "محصولات"],
    recentActivity: [
      { title: "آپلود پک Organic House", meta: "امروز" },
      { title: "درخواست تایید فروشنده", meta: "دیروز" },
      { title: "ویرایش قیمت محصول", meta: "۲ روز پیش" },
    ],
  },
  {
    id: "mahan-sharifi",
    name: "ماهان شریفی",
    phone: "0919 740 8821",
    email: "mahan.sharifi@example.com",
    role: "پشتیبان",
    status: "فعال",
    level: "تیم داخلی",
    joined: "۱۴۰۲/۱۲/۱۸",
    lastSeen: "آنلاین",
    orders: 0,
    totalSpent: "۰",
    courses: 0,
    products: 0,
    tickets: 18,
    risk: "کم",
    note: "عضو تیم پشتیبانی با دسترسی به تیکت‌ها، سفارش‌ها و گفتگوهای کاربران.",
    permissions: ["مدیریت تیکت", "مشاهده سفارش", "مدیریت کاربر"],
    tags: ["پشتیبانی", "تیم داخلی", "آنلاین"],
    recentActivity: [
      { title: "پاسخ به تیکت دانلود", meta: "۱۵ دقیقه پیش" },
      { title: "بررسی سفارش ناموفق", meta: "امروز" },
      { title: "ارسال پیام پیگیری", meta: "دیروز" },
    ],
  },
  {
    id: "reza-moradi",
    name: "رضا مرادی",
    phone: "0922 013 6645",
    email: "reza.moradi@example.com",
    role: "مشتری",
    status: "غیرفعال",
    level: "استاندارد",
    joined: "۱۴۰۳/۰۴/۰۹",
    lastSeen: "۴۵ روز پیش",
    orders: 1,
    totalSpent: "۱.۲M",
    courses: 0,
    products: 1,
    tickets: 2,
    risk: "بالا",
    note: "مدت زیادی وارد نشده و یک دانلود نیمه‌کاره دارد؛ مناسب کمپین بازگشت.",
    permissions: ["خرید محصول", "دانلود فایل"],
    tags: ["غیرفعال", "پیگیری", "دانلود ناقص"],
    recentActivity: [
      { title: "دانلود ناقص تهران بعد از تاریکی", meta: "۴۵ روز پیش" },
      { title: "ثبت تیکت پرداخت", meta: "۲ ماه پیش" },
      { title: "خرید محصول", meta: "۲ ماه پیش" },
    ],
  },
];

const userRoles = ["مدیر کل", "مدیر محتوا", "مدیر فروش", "پشتیبان", "فروشنده", "هنرجو", "مشتری"];
const userPermissionModules = ["خرید محصول", "دانلود فایل", "مشاهده دوره", "ارسال نمونه‌کار", "مدیریت تیکت", "افزودن محصول", "مشاهده گزارش", "مدیریت کاربر"];

type SettingsWorkspace = "general" | "theme" | "navigation" | "seo" | "media" | "commerce" | "integrations";

const settingsWorkspaces: Array<{ id: SettingsWorkspace; label: string; icon: IconType }> = [
  { id: "general", label: "عمومی", icon: Settings },
  { id: "theme", label: "قالب", icon: LayoutDashboard },
  { id: "navigation", label: "منو و صفحات", icon: FolderTree },
  { id: "seo", label: "سئو", icon: Search },
  { id: "media", label: "رسانه", icon: ImageIcon },
  { id: "commerce", label: "فروش", icon: CircleDollarSign },
  { id: "integrations", label: "اتصال‌ها", icon: ShieldCheck },
];

const themeModules = ["بنر اصلی", "مارکی کلمات کلیدی", "اسلایدر محصولات", "دوره‌های رایگان", "مجله", "خبرنامه", "فوتر", "منوی موبایل"];
const navigationSettings = [
  { label: "خانه", href: "/", area: "هدر و موبایل" },
  { label: "محصولات", href: "/shop", area: "هدر و فوتر" },
  { label: "دوره‌های رایگان", href: "/courses", area: "هدر و موبایل" },
  { label: "مجله", href: "/blog", area: "هدر و فوتر" },
  { label: "مشاوره", href: "/consultation", area: "هدر و موبایل" },
  { label: "درباره ما", href: "/about", area: "فوتر" },
  { label: "تماس با ما", href: "/contact", area: "فوتر" },
  { label: "سوالات متداول", href: "/faq", area: "فوتر" },
];
const seoChecklist = ["عنوان و متای اصلی", "اسکیما محصولات", "اسکیما دوره‌ها", "Open Graph", "نقشه سایت", "robots.txt", "canonical صفحات"];
const mediaPolicies = ["فشرده‌سازی تصویر", "تبدیل WebP", "کش ویدئو", "محدودیت حجم آپلود", "واترمارک دمو صوتی", "پاکسازی فایل بدون استفاده"];
const commerceModules = ["درگاه زیبال", "نماد اعتماد", "سبد خرید", "دانلود امن", "صدور فاکتور", "کد تخفیف", "پرداخت ناموفق"];
const integrationModules = ["پیامک ورود", "ایمیل سفارش", "SpotPlayer", "Analytics", "Search Console", "پشتیبان‌گیری", "اعلان مدیر"];

type CommunicationWorkspace = "all" | "tickets" | "sms" | "email" | "consultation" | "urgent" | "automation";
type AdminConversation = {
  id: string;
  title: string;
  user: string;
  channel: string;
  status: string;
  priority: string;
  owner: string;
  created: string;
  source: string;
  summary: string;
  tags: string[];
  messages: number;
  href: string;
};

const communicationWorkspaces: Array<{ id: CommunicationWorkspace; label: string; icon: IconType }> = [
  { id: "all", label: "همه پیام‌ها", icon: MessageSquareText },
  { id: "tickets", label: "تیکت‌ها", icon: Headphones },
  { id: "sms", label: "پیامک", icon: Bell },
  { id: "email", label: "ایمیل", icon: FileText },
  { id: "consultation", label: "مشاوره", icon: Compass },
  { id: "urgent", label: "فوری", icon: ShieldCheck },
  { id: "automation", label: "اتوماسیون", icon: Sparkles },
];

const adminConversations: AdminConversation[] = [
  {
    id: "download-problem",
    title: "مشکل دانلود محصول نیمه‌شب آراندبی",
    user: "آرمان رضایی",
    channel: "تیکت",
    status: "باز",
    priority: "فوری",
    owner: "ماهان",
    created: "۱۲ دقیقه پیش",
    source: "صفحه محصول",
    summary: "کاربر بعد از پرداخت موفق نمی‌تواند فایل اصلی محصول را کامل دانلود کند.",
    tags: ["دانلود امن", "محصول", "پرداخت موفق"],
    messages: 5,
    href: "/samples/midnight-rnb",
  },
  {
    id: "consultation-path",
    title: "درخواست مشاوره مسیر شروع",
    user: "سارا احمدی",
    channel: "مشاوره",
    status: "در حال بررسی",
    priority: "متوسط",
    owner: "تیم محتوا",
    created: "امروز، ۱۰:۴۰",
    source: "صفحه مشاوره",
    summary: "کاربر گزینه هنرجو هستم را انتخاب کرده و دنبال پیشنهاد دوره رایگان و پک مناسب است.",
    tags: ["مشاوره", "هنرجو", "پیشنهاد محصول"],
    messages: 3,
    href: "/consultation",
  },
  {
    id: "otp-delivery",
    title: "تاخیر در دریافت کد ورود",
    user: "رضا مرادی",
    channel: "پیامک",
    status: "باز",
    priority: "فوری",
    owner: "پشتیبانی",
    created: "۳۸ دقیقه پیش",
    source: "صفحه ورود",
    summary: "کد یکبار مصرف با تاخیر می‌رسد و کاربر چند بار درخواست مجدد داده است.",
    tags: ["ورود", "پیامک", "OTP"],
    messages: 4,
    href: "/login",
  },
  {
    id: "spotplayer-license",
    title: "درخواست لایسنس مجدد SpotPlayer",
    user: "نیما کاظمی",
    channel: "ایمیل",
    status: "منتظر پاسخ کاربر",
    priority: "متوسط",
    owner: "ماهان",
    created: "دیروز",
    source: "صفحه دوره",
    summary: "کاربر دستگاه خود را تغییر داده و برای ادامه دوره نیاز به فعال‌سازی مجدد دارد.",
    tags: ["دوره", "SpotPlayer", "لایسنس"],
    messages: 7,
    href: "/courses/modern-beatmaking",
  },
  {
    id: "seller-request",
    title: "درخواست همکاری فروشنده",
    user: "کیان فرهادی",
    channel: "چت سایت",
    status: "باز",
    priority: "کم",
    owner: "مدیر فروش",
    created: "۲ روز پیش",
    source: "فرم تماس",
    summary: "درخواست انتشار سمپل پک اختصاصی و نیازمند بررسی نمونه فایل‌ها و قرارداد است.",
    tags: ["فروشنده", "محصول", "قرارداد"],
    messages: 2,
    href: "/contact",
  },
];

const communicationTemplates = [
  { title: "مشکل دانلود", text: "سلام، لینک دانلود شما بررسی شد. اگر هنوز مشکل دارید، یک لینک تازه برایتان صادر می‌کنیم.", channel: "تیکت" },
  { title: "کد ورود", text: "کد ورود جدید برای شما ارسال شد. لطفاً تا دو دقیقه آینده دوباره تلاش کنید.", channel: "پیامک" },
  { title: "پیشنهاد مشاوره", text: "با توجه به پاسخ‌های شما، این مسیر برای شروع مناسب‌تر است: دوره رایگان + یک پک دانلودی پایه.", channel: "مشاوره" },
  { title: "لایسنس دوره", text: "درخواست فعال‌سازی مجدد لایسنس ثبت شد و بعد از بررسی دستگاه جدید انجام می‌شود.", channel: "ایمیل" },
];

const communicationAutomations = ["کد ورود", "ثبت سفارش", "پرداخت ناموفق", "صدور لایسنس", "یادآوری دانلود", "پاسخ مشاوره", "پیگیری تیکت بی‌پاسخ", "خبرنامه هفتگی"];
const communicationChannels = ["پیامک", "ایمیل", "چت سایت", "واتس‌اپ", "اعلان پنل", "خبرنامه"];

type ReportWorkspace = "overview" | "sales" | "products" | "courses" | "users" | "support" | "seo";
type ReportRange = "today" | "week" | "month" | "quarter";

const reportWorkspaces: Array<{ id: ReportWorkspace; label: string; icon: IconType; count: string }> = [
  { id: "overview", label: "نمای کلی", icon: LayoutDashboard, count: "۱۲" },
  { id: "sales", label: "فروش", icon: CircleDollarSign, count: "۸" },
  { id: "products", label: "محصولات", icon: Package, count: "۴۸" },
  { id: "courses", label: "دوره‌ها", icon: BookOpen, count: "۶" },
  { id: "users", label: "کاربران", icon: Users, count: "۱۲.۸K" },
  { id: "support", label: "پشتیبانی", icon: Headphones, count: "۱۹" },
  { id: "seo", label: "سئو", icon: Search, count: "۹۱٪" },
];

const reportRanges: Array<{ id: ReportRange; label: string }> = [
  { id: "today", label: "امروز" },
  { id: "week", label: "۷ روز" },
  { id: "month", label: "۳۰ روز" },
  { id: "quarter", label: "فصل" },
];

const reportKpis = [
  { id: "revenue", label: "درآمد", value: "۸۴۲M", change: "+۲۳٪", icon: CircleDollarSign, tone: "مثبت" },
  { id: "orders", label: "سفارش", value: "۱,۲۸۴", change: "+۱۸٪", icon: Package, tone: "مثبت" },
  { id: "conversion", label: "نرخ تبدیل", value: "۶.۸٪", change: "+۱.۴٪", icon: BarChart3, tone: "رو به رشد" },
  { id: "students", label: "هنرجوی فعال", value: "۳.۴K", change: "+۱۴۲", icon: BookOpen, tone: "مثبت" },
  { id: "tickets", label: "تیکت باز", value: "۱۹", change: "۶ فوری", icon: Headphones, tone: "نیازمند پیگیری" },
  { id: "seo", label: "سلامت سئو", value: "۹۱٪", change: "+۴٪", icon: Search, tone: "پایدار" },
];

const reportRevenueSeries = [46, 62, 51, 78, 69, 91, 58, 74, 96, 82, 88, 100];
const reportRevenueValues = [28, 41, 33, 56, 49, 74, 38, 62, 83, 69, 76, 92];
const reportRevenueAmounts = ["۲۸M", "۴۱M", "۳۳M", "۵۶M", "۴۹M", "۷۴M", "۳۸M", "۶۲M", "۸۳M", "۶۹M", "۷۶M", "۹۲M"];
const reportFunnel = [
  { label: "بازدید سایت", value: "۴۸.۲K", rate: 100 },
  { label: "مشاهده محصول", value: "۱۸.۶K", rate: 78 },
  { label: "افزودن به سبد", value: "۴.۹K", rate: 46 },
  { label: "پرداخت موفق", value: "۱.۲K", rate: 28 },
];

const reportTopItems = [
  { title: "نیمه‌شب آراندبی", type: "محصول دانلودی", value: "۲۴۸ فروش", change: "+۳۲٪", href: "/samples/midnight-rnb" },
  { title: "بیت‌سازی مدرن", type: "دوره رایگان", value: "۱.۱K مشاهده", change: "+۲۱٪", href: "/courses/modern-beatmaking" },
  { title: "چطور درام‌هایی بسازیم که واقعاً ضربه بزنند؟", type: "مجله", value: "۸.۴K بازدید", change: "+۱۴٪", href: "/blog/make-drums-hit-harder" },
  { title: "مشاوره مسیر شروع", type: "مشاوره", value: "۳۸۴ پاسخ", change: "+۱۹٪", href: "/consultation" },
];

const reportAlerts = [
  { title: "پرداخت ناموفق", text: "۱۲ سفارش در مرحله پرداخت رها شده‌اند.", action: "ساخت کمپین برگشت" },
  { title: "سئو محصول", text: "۳ محصول دانلودی متای کامل ندارند.", action: "رفتن به محصولات" },
  { title: "پشتیبانی فوری", text: "۶ تیکت فوری هنوز باز هستند.", action: "باز کردن ارتباطات" },
  { title: "دانلود ناقص", text: "۴ کاربر فایل محصول را کامل دریافت نکرده‌اند.", action: "ارسال لینک تازه" },
];

const reportExportModules = ["گزارش فروش", "گزارش سفارش‌ها", "گزارش محصولات", "گزارش دوره‌ها", "گزارش کاربران", "گزارش پشتیبانی", "گزارش سئو", "خروجی حسابداری"];

const contentEditorBlocks = [
  { title: "بنر و هیرو", text: "تیتر، زیرتیتر، تصویر و CTA مطابق صفحه اصلی سایت.", icon: LayoutDashboard },
  { title: "بدنه محتوا", text: "ساختار H2/H3، پاراگراف، نقل‌قول و بلوک‌های آموزشی.", icon: FileText },
  { title: "رسانه", text: "ویدئو، تصویر، کاور، گالری و فایل‌های همراه.", icon: ImageIcon },
  { title: "سئو و اسکیما", text: "متا، canonical، Open Graph و داده ساختاریافته.", icon: Search },
];

const productEditorBlocks = [
  { title: "بنر محصول", text: "تصویر محصول، عنوان کوتاه، توضیح فروش و دکمه خرید.", icon: ImageIcon },
  { title: "پلیر و دمو", text: "ویدئوی معرفی، نمونه صوتی، میکسر و دموهای خریدار.", icon: AudioWaveform },
  { title: "فایل و نسخه", text: "فایل دانلودی، ورژن، حجم، لایسنس و لینک امن.", icon: Upload },
  { title: "قیمت و کمپین", text: "قیمت، تخفیف، پیشنهاد نزدیک و وضعیت انتشار.", icon: CircleDollarSign },
];

const courseEditorBlocks = [
  { title: "صفحه دوره", text: "هیرو، توضیحات، CTA و کارت سمت راست دوره.", icon: LayoutDashboard },
  { title: "فصل و قسمت", text: "فصل‌های تک‌لایه، صفحات SEO مستقل و مسیر قسمت‌ها.", icon: Layers3 },
  { title: "پلیر آموزشی", text: "تایم‌لاین‌های مهم، ویدئو، SpotPlayer و فایل همراه.", icon: PlayCircle },
  { title: "نمونه‌کار", text: "بازخورد هنرجو، نظرات و نمونه‌کارهای صوتی.", icon: Users },
];

type AdminNotification = {
  id: string;
  title: string;
  summary: string;
  body: string;
  time: string;
  source: string;
  priority: string;
  section: SectionId;
  read: boolean;
  details: string[];
};

const adminNotifications: AdminNotification[] = [
  {
    id: "urgent-ticket",
    title: "تیکت فوری دانلود محصول",
    summary: "کاربر بعد از پرداخت موفق، فایل محصول را کامل دریافت نکرده است.",
    body: "یک تیکت فوری برای محصول «نیمه‌شب آراندبی» ثبت شده. بهتر است لینک دانلود امن دوباره صادر شود و وضعیت سفارش هم بررسی شود.",
    time: "۱۲ دقیقه پیش",
    source: "ارتباطات",
    priority: "فوری",
    section: "communication",
    read: false,
    details: ["محصول: نیمه‌شب آراندبی", "وضعیت پرداخت: موفق", "اقدام پیشنهادی: صدور لینک تازه"],
  },
  {
    id: "failed-payments",
    title: "پرداخت‌های ناموفق افزایش داشته",
    summary: "۱۲ سفارش در مرحله پرداخت رها شده‌اند.",
    body: "در بازه امروز، نرخ رها شدن سبد خرید کمی بالاتر رفته. بررسی درگاه زیبال و ساخت کمپین بازگشت برای کاربرانی که پرداخت را کامل نکرده‌اند پیشنهاد می‌شود.",
    time: "۳۸ دقیقه پیش",
    source: "گزارشات",
    priority: "مهم",
    section: "reports",
    read: false,
    details: ["سفارش رها شده: ۱۲", "درگاه: زیبال", "اقدام پیشنهادی: پیامک یادآوری"],
  },
  {
    id: "product-seo",
    title: "سئوی ۳ محصول ناقص است",
    summary: "چند محصول دانلودی هنوز متا و اسکیما کامل ندارند.",
    body: "سه محصول دانلودی آماده انتشار هستند اما متای سئو، توضیحات کوتاه یا اسکیما هنوز کامل نیست. قبل از انتشار بهتر است این موارد تکمیل شود.",
    time: "۱ ساعت پیش",
    source: "محصولات",
    priority: "متوسط",
    section: "products",
    read: false,
    details: ["بخش درگیر: محصولات دانلودی", "مشکل: متا/اسکیما", "اثر: کاهش کیفیت ایندکس"],
  },
  {
    id: "course-review",
    title: "دوره میکس خلاق آماده بازبینی است",
    summary: "قسمت‌های جدید دوره رایگان نیاز به بررسی نهایی دارند.",
    body: "چند قسمت جدید برای دوره «میکس خلاق» اضافه شده و برای انتشار نهایی باید ویدئو، تایم‌لاین و لینک‌های فصل بررسی شوند.",
    time: "دیروز",
    source: "دوره‌ها",
    priority: "متوسط",
    section: "courses",
    read: true,
    details: ["دوره: میکس خلاق", "نیازمند بررسی: تایم‌لاین پلیر", "وضعیت: در بازبینی"],
  },
  {
    id: "new-consultations",
    title: "پاسخ‌های جدید مشاوره ثبت شد",
    summary: "۲۴ کاربر مسیر شروع خود را در صفحه مشاوره انتخاب کرده‌اند.",
    body: "صفحه مشاوره امروز پاسخ‌های تازه‌ای گرفته. می‌توان از این داده‌ها برای پیشنهاد محصول، دوره رایگان و سگمنت‌بندی کاربران استفاده کرد.",
    time: "۲ ساعت پیش",
    source: "مشاوره",
    priority: "اطلاع",
    section: "communication",
    read: true,
    details: ["پاسخ جدید: ۲۴", "بیشترین انتخاب: هنرجو هستم", "اقدام پیشنهادی: ساخت کمپین پیشنهادی"],
  },
];

const sectionInsights: Record<SectionId, Array<{ label: string; value: string; text: string; icon: IconType }>> = {
  overview: [
    { label: "سلامت سایت", value: "۹۸٪", text: "همه سرویس‌های اصلی فعال هستند", icon: ShieldCheck },
    { label: "صف انتشار", value: "۷", text: "مطلب و محصول آماده بررسی", icon: CalendarDays },
    { label: "درآمد ماه", value: "۸۴۲M", text: "رشد ۲۳٪ نسبت به ماه قبل", icon: CircleDollarSign },
    { label: "پشتیبانی", value: "۱۹", text: "۶ گفت‌وگوی فوری", icon: Headphones },
  ],
  content: [
    { label: "پیش‌نویس‌ها", value: "۱۲", text: "نیازمند بازبینی سردبیر", icon: FileText },
    { label: "تقویم محتوا", value: "۸ روز", text: "برنامه انتشار آینده", icon: CalendarDays },
    { label: "سئو ناقص", value: "۴", text: "نیازمند متا و اسکیما", icon: Search },
    { label: "رسانه‌ها", value: "۳۱", text: "فایل آماده استفاده", icon: ImageIcon },
  ],
  products: [
    { label: "محصول فعال", value: "۴۸", text: "در فروشگاه منتشر شده", icon: Package },
    { label: "فایل ناقص", value: "۳", text: "دانلود یا نسخه محصول کم است", icon: Upload },
    { label: "تخفیف فعال", value: "۹", text: "کمپین‌های در حال اجرا", icon: Tags },
    { label: "درآمد محصول", value: "۶۲۱M", text: "فروش محصولات دانلودی", icon: CircleDollarSign },
  ],
  courses: [
    { label: "دوره رایگان", value: "۶", text: "با صفحه‌های سئو مستقل", icon: BookOpen },
    { label: "جلسه آماده", value: "۷۱", text: "ویدئو و فایل همراه", icon: PlayCircle },
    { label: "لایسنس‌ها", value: "۵۳۸", text: "SpotPlayer فعال", icon: KeyRound },
    { label: "دانشجو", value: "۳.۴K", text: "در مسیرهای آموزشی", icon: Users },
  ],
  users: [
    { label: "کاربر فعال", value: "۱۲.۸K", text: "ورود در ۳۰ روز اخیر", icon: Users },
    { label: "فروشنده", value: "۲۴", text: "در انتظار مدیریت محصول", icon: Package },
    { label: "نقش‌ها", value: "۶", text: "سطح دسترسی تعریف‌شده", icon: ShieldCheck },
    { label: "حساب معلق", value: "۳", text: "نیازمند بررسی", icon: Bell },
  ],
  settings: [
    { label: "وضعیت قالب", value: "پایدار", text: "همگام با لندینگ اصلی", icon: LayoutDashboard },
    { label: "منوها", value: "۸", text: "لینک‌های قابل مدیریت", icon: FolderTree },
    { label: "سئو عمومی", value: "۹۱٪", text: "متاهای اصلی کامل هستند", icon: Search },
    { label: "رسانه‌ها", value: "۲.۴GB", text: "حجم فایل‌های آپلودی", icon: Upload },
  ],
  communication: [
    { label: "تیکت باز", value: "۱۹", text: "۶ مورد فوری", icon: Headphones },
    { label: "پیامک امروز", value: "۳۸۴", text: "کد ورود و سفارش", icon: MessageSquareText },
    { label: "پاسخ سریع", value: "۱۴", text: "قالب آماده پشتیبانی", icon: Sparkles },
    { label: "رضایت", value: "۹۴٪", text: "از مکالمات بسته‌شده", icon: ShieldCheck },
  ],
  reports: [
    { label: "فروش امروز", value: "۲۴۸M", text: "درآمد ثبت‌شده", icon: CircleDollarSign },
    { label: "نرخ تبدیل", value: "۶.۸٪", text: "از بازدید به خرید", icon: BarChart3 },
    { label: "محصول برتر", value: "808", text: "بیشترین فروش هفته", icon: Package },
    { label: "کاربر جدید", value: "۱۴۲", text: "در این هفته", icon: Users },
  ],
};

function useAdminVars(theme: AdminTheme) {
  return useMemo(
    () =>
      ({
        "--admin-accent": acid,
        "--admin-bg": theme === "dark" ? "#081211" : "#e9eee3",
        "--admin-ink": theme === "dark" ? "#eef2e8" : "#11150f",
        "--admin-muted": theme === "dark" ? "#9ba495" : "#70766b",
        "--admin-panel": theme === "dark" ? "#111917" : "#f6f8f1",
        "--admin-panel-2": theme === "dark" ? "#17211f" : "#dce8e4",
        "--admin-border": theme === "dark" ? "rgba(255,255,255,.08)" : "rgba(17,21,15,.08)",
        "--admin-soft": theme === "dark" ? "rgba(33,218,204,.12)" : "rgba(33,218,204,.16)",
        "--admin-shadow": theme === "dark" ? "0 24px 70px rgba(0,0,0,.32)" : "0 18px 60px rgba(17,22,14,.07)",
        "--admin-header": theme === "dark" ? "rgba(12,15,11,.88)" : "rgba(233,238,227,.88)",
        "--admin-header-control": theme === "dark" ? "#1b2119" : "#f6f8f1",
        "--admin-header-border": theme === "dark" ? "rgba(255,255,255,.07)" : "rgba(17,21,15,.05)",
        "--admin-header-shadow": theme === "dark" ? "0 14px 40px rgba(0,0,0,.24)" : "0 14px 40px rgba(17,22,14,.05)",
        "--admin-sidebar": theme === "dark" ? "#0f1715" : "#f6f8f1",
        "--admin-sidebar-ink": theme === "dark" ? "#eef2e8" : "#11150f",
        "--admin-sidebar-muted": theme === "dark" ? "rgba(238,242,232,.55)" : "#70766b",
        "--admin-sidebar-faint": theme === "dark" ? "rgba(238,242,232,.32)" : "#8a9692",
        "--admin-sidebar-border": theme === "dark" ? "rgba(255,255,255,.07)" : "rgba(17,21,15,.06)",
        "--admin-sidebar-soft": theme === "dark" ? "rgba(255,255,255,.04)" : "#dce8e4",
        "--admin-sidebar-hover": theme === "dark" ? "rgba(255,255,255,.07)" : "rgba(17,21,15,.05)",
        "--admin-sidebar-shadow": theme === "dark" ? "0 24px 80px rgba(0,0,0,.32)" : "0 20px 70px rgba(18,24,15,.08)",
        "--admin-hero-bg": "#0d1514",
        "--admin-hero-ink": "#ffffff",
        "--admin-hero-muted": "rgba(255,255,255,.55)",
        "--admin-hero-border": "rgba(255,255,255,.1)",
        "--admin-hero-card": "rgba(255,255,255,.06)",
        "--admin-hero-grid-opacity": ".2",
        "--admin-hero-shadow": "0 28px 90px rgba(0,0,0,.3)",
      }) as CSSProperties,
    [theme],
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({ children, icon: Icon = Plus, className = "", onClick }: { children: ReactNode; icon?: IconType; className?: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--admin-accent)] px-4 py-3 text-xs font-black text-[#06211f] shadow-[0_12px_30px_rgba(33,218,204,.24)] transition hover:-translate-y-0.5 sm:w-auto ${className}`}>
      <Icon className="size-4" />
      {children}
    </button>
  );
}

function GhostButton({ children, icon: Icon, onClick, active = false }: { children: ReactNode; icon: IconType; onClick?: () => void; active?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-black transition hover:border-[var(--admin-accent)] ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel)] text-[var(--admin-ink)]"}`}>
      <Icon className={`size-4 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
      {children}
    </button>
  );
}

function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[26px] border border-[var(--admin-border)] bg-[var(--admin-panel)] shadow-[var(--admin-shadow)] ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-lg font-black leading-8 text-[var(--admin-ink)]">{title}</h3>
        {text && <p className="mt-1 max-w-2xl text-xs leading-7 text-[var(--admin-muted)]">{text}</p>}
      </div>
      {action}
    </div>
  );
}

type AdminActionModalData = {
  title: string;
  text: string;
  icon?: IconType;
  details?: Array<{ label: string; value: string }>;
  primaryLabel?: string;
};

function AdminActionModal({ modal, onClose, onPrimary }: { modal: AdminActionModalData | null; onClose: () => void; onPrimary?: () => void }) {
  if (!modal) return null;
  const Icon = modal.icon ?? Sparkles;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[95] grid place-items-center bg-black/55 px-4 py-6 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={modal.title}
      >
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[34px] border border-[var(--admin-border)] bg-[var(--admin-panel)] p-5 text-right shadow-[0_34px_120px_rgba(0,0,0,.38)] sm:p-6"
        >
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-[.08]" />
          <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-[var(--admin-accent)]/16 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="grid size-13 shrink-0 place-items-center rounded-[22px] bg-[var(--admin-accent)] text-[#06211f] shadow-[0_0_30px_rgba(33,218,204,.22)]">
                <Icon className="size-6" />
              </span>
              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-[var(--admin-soft)] px-3 py-1 text-[10px] font-black text-[var(--admin-accent)]">اکشن مدیریتی</span>
                <h3 className="mt-3 text-xl font-black leading-9 text-[var(--admin-ink)] sm:text-2xl">{modal.title}</h3>
                <p className="mt-2 text-sm font-bold leading-8 text-[var(--admin-muted)]">{modal.text}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]"
              aria-label="بستن پنجره"
            >
              <X className="size-5" />
            </button>
          </div>

          {modal.details?.length ? (
            <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
              {modal.details.map((detail) => (
                <div key={`${detail.label}-${detail.value}`} className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4">
                  <span className="text-[10px] font-black text-[var(--admin-muted)]">{detail.label}</span>
                  <strong className="mt-2 block text-sm font-black leading-7 text-[var(--admin-ink)]">{detail.value}</strong>
                </div>
              ))}
            </div>
          ) : null}

          <div className="relative mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] px-5 text-xs font-black text-[var(--admin-ink)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]"
            >
              بستن
            </button>
            <button
              type="button"
              onClick={onPrimary ?? onClose}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--admin-accent)] px-5 text-xs font-black text-[#06211f] shadow-[0_14px_34px_rgba(33,218,204,.24)] transition hover:-translate-y-0.5"
            >
              {modal.primaryLabel ?? "تایید و ادامه"}
              <ArrowLeft className="size-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Status({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[var(--admin-soft)] px-3 py-1 text-[11px] font-black text-[var(--admin-accent)]">
      {children}
    </span>
  );
}

function Hero({ active }: { active: SectionId }) {
  const content = sectionTitles[active];
  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-[34px] border border-[var(--admin-hero-border)] bg-[var(--admin-hero-bg)] px-5 py-7 text-[var(--admin-hero-ink)] shadow-[var(--admin-hero-shadow)] transition-colors duration-300 sm:px-8 sm:py-9">
        <div className="hero-grid absolute inset-0" style={{ opacity: "var(--admin-hero-grid-opacity)" }} />
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[var(--admin-accent)]/16 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 size-80 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--admin-hero-border)] bg-[var(--admin-hero-card)] px-3 py-2 text-[10px] font-black text-[var(--admin-accent)]">
              <ShieldCheck className="size-3.5" />
              پنل مدیریت هماهنگ با سایت
            </span>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-[1.45] sm:text-5xl">{content.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--admin-hero-muted)]">{content.text}</p>
          </div>
          <div className="grid gap-2 rounded-[26px] border border-[var(--admin-hero-border)] bg-[var(--admin-hero-card)] p-3 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-1">
            {["انتشار محتوا", "پردازش سفارش", "پشتیبانی کاربران"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.06 }}
                className="flex items-center justify-between rounded-2xl border border-[var(--admin-hero-border)] bg-white/[.035] px-4 py-3"
              >
                <span className="text-xs font-black text-[var(--admin-hero-muted)]">{item}</span>
                <span className="size-2 rounded-full bg-[var(--admin-accent)] shadow-[0_0_20px_rgba(33,218,204,.9)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function SectionInsights({ active }: { active: SectionId }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {sectionInsights[active].map((item, index) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.label} delay={index * 0.04}>
            <Surface className="group overflow-hidden p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--admin-accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-[var(--admin-muted)]">{item.label}</p>
                  <strong className="mt-2 block truncate text-2xl font-black text-[var(--admin-ink)]">{item.value}</strong>
                  <span className="mt-2 block text-[10px] font-bold leading-6 text-[var(--admin-muted)]">{item.text}</span>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--admin-soft)] text-[var(--admin-accent)] transition group-hover:bg-[var(--admin-accent)] group-hover:text-[#06211f]">
                  <Icon className="size-5" />
                </span>
              </div>
            </Surface>
          </Reveal>
        );
      })}
    </div>
  );
}

const overviewQueueTabs = [
  { id: "orders", label: "سفارش‌ها", section: "products" },
  { id: "consultation", label: "مشاوره‌ها", section: "communication" },
  { id: "support", label: "پشتیبانی", section: "communication" },
  { id: "content", label: "محتوا", section: "content" },
] as const satisfies Array<{ id: string; label: string; section: SectionId }>;

type OverviewQueueId = (typeof overviewQueueTabs)[number]["id"];

const overviewQueues: Record<OverviewQueueId, Array<{ title: string; meta: string; status: string }>> = {
  orders: [
    { title: "سفارش نیمه‌شب آراندبی", meta: "پرداخت موفق · نیازمند لینک دانلود", status: "فوری" },
    { title: "خرید بسته تهران بعد از تاریکی", meta: "در انتظار فاکتور", status: "باز" },
    { title: "درخواست دانلود مجدد 808 Essentials", meta: "کاربر: آرمان نادری", status: "پیگیری" },
  ],
  consultation: [
    { title: "هنرجو هستم · شروع از بیت‌سازی", meta: "پیشنهاد محصول هنوز تایید نشده", status: "جدید" },
    { title: "خواننده‌ام · انتخاب وکال چاپ", meta: "نیازمند پاسخ انسانی", status: "باز" },
    { title: "دی‌جی و نوازنده‌ام · پک اجرای زنده", meta: "ارجاع به فروشگاه", status: "آماده" },
  ],
  support: [
    { title: "مشکل دانلود پس از خرید", meta: "۶ دقیقه پیش", status: "فوری" },
    { title: "صدور مجدد لایسنس SpotPlayer", meta: "۲۳ دقیقه پیش", status: "باز" },
    { title: "سوال درباره مجوز تجاری سمپل‌ها", meta: "۱ ساعت پیش", status: "پاسخ" },
  ],
  content: [
    { title: "مقاله درام‌هایی که ضربه می‌زنند", meta: "نیازمند تصویر شاخص", status: "بازبینی" },
    { title: "صفحه محصول وکال چاپ", meta: "متن سئو ناقص", status: "SEO" },
    { title: "دوره بیت‌سازی مدرن", meta: "۲ قسمت آماده انتشار", status: "زمان‌بندی" },
  ],
};

const siteAreaCards: Array<{ title: string; text: string; status: string; section: SectionId; href: string; icon: IconType }> = [
  { title: "صفحه اصلی", text: "بنر، مارquee، محصولات منتخب و خبرنامه", status: "پایدار", section: "settings", href: "/", icon: LayoutDashboard },
  { title: "فروشگاه و محصولات", text: "کارت محصول، پلیر دمو، میکسر و نمونه‌کار", status: "نیازمند ۳ بررسی", section: "products", href: "/shop", icon: Package },
  { title: "دوره‌های رایگان", text: "صفحات سئو، فصل‌ها، قسمت‌ها و پلیر آموزشی", status: "۷۱ قسمت", section: "courses", href: "/courses", icon: BookOpen },
  { title: "مجله و آموزش‌ها", text: "مقاله‌ها، ویدئو، سایدبار و مسیر مطالعه", status: "۱۲ پیش‌نویس", section: "content", href: "/blog", icon: FileText },
  { title: "مشاوره مسیر", text: "سؤال‌جواب و پیشنهاد محصول مناسب", status: "۲۴ پاسخ جدید", section: "communication", href: "/consultation", icon: Compass },
  { title: "ورود و پنل کاربری", text: "ورود، ثبت‌نام، فراموشی رمز و دسترسی‌ها", status: "آماده اتصال", section: "users", href: "/login", icon: Users },
];

const initialOverviewTasks = [
  "بازبینی مقاله چک‌لیست ضبط",
  "تایید فروشنده جدید",
  "پاسخ به ۶ گفت‌وگوی پشتیبانی",
];

const chartValues: Record<string, number[]> = {
  امروز: [42, 58, 36, 74, 62, 88, 55, 68],
  "۷ روز": [56, 68, 44, 86, 73, 92, 81, 98],
  "۳۰ روز": [38, 52, 66, 71, 84, 79, 96, 110],
};

function OverviewPanel({ onSectionChange }: { onSectionChange: (section: SectionId) => void }) {
  const [queue, setQueue] = useState<OverviewQueueId>("orders");
  const [period, setPeriod] = useState<keyof typeof chartValues>("۷ روز");
  const [tasks, setTasks] = useState(initialOverviewTasks);
  const [doneTasks, setDoneTasks] = useState<string[]>([]);
  const [notice, setNotice] = useState("داشبورد آماده است؛ یک بخش را انتخاب کن یا یک اقدام انجام بده.");
  const chart = chartValues[period];
  const selectedQueue = overviewQueueTabs.find((item) => item.id === queue) ?? overviewQueueTabs[0];
  const completedCount = doneTasks.length;

  const toggleTask = (task: string) => {
    setDoneTasks((current) => {
      const exists = current.includes(task);
      setNotice(exists ? `وظیفه «${task}» دوباره فعال شد.` : `وظیفه «${task}» انجام شد.`);
      return exists ? current.filter((item) => item !== task) : [...current, task];
    });
  };

  const addTask = () => {
    const nextTask = `بررسی سریع سایت اصلی #${tasks.length + 1}`;
    setTasks((current) => [nextTask, ...current]);
    setNotice("وظیفه جدید به لیست داشبورد اضافه شد.");
  };

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_.72fr]">
          <div>
            <SectionHeader
              title="کنترل زنده صفحات اصلی سایت"
              text="از همین داشبورد می‌توانی وضعیت بخش‌های اصلی سایت را ببینی، وارد صفحه عمومی شوی یا مستقیم به بخش مدیریتی مربوطه بروی."
              action={<PrimaryButton icon={Sparkles} onClick={addTask}>اقدام سریع</PrimaryButton>}
            />
            <div className="grid gap-3 md:grid-cols-2">
              {siteAreaCards.map((area) => {
                const Icon = area.icon;
                return (
                  <article key={area.title} className="group rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4 transition hover:border-[var(--admin-accent)]">
                    <div className="flex items-start gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--admin-panel)] text-[var(--admin-accent)] transition group-hover:bg-[var(--admin-accent)] group-hover:text-[#06211f]">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <strong className="text-sm font-black text-[var(--admin-ink)]">{area.title}</strong>
                          <Status>{area.status}</Status>
                        </div>
                        <p className="mt-2 text-[11px] font-bold leading-6 text-[var(--admin-muted)]">{area.text}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link href={area.href} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                            مشاهده صفحه <ArrowLeft className="size-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              onSectionChange(area.section);
                              setNotice(`وارد بخش مدیریت «${area.title}» شدی.`);
                            }}
                            className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-accent)] px-3 text-[10px] font-black text-[#06211f] transition hover:-translate-y-0.5"
                          >
                            مدیریت <ChevronLeft className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="rounded-[28px] border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black text-[var(--admin-muted)]">وضعیت عملیاتی</p>
                <h3 className="mt-2 text-xl font-black text-[var(--admin-ink)]">امروز چه چیزی مهم است؟</h3>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--admin-accent)] text-[#06211f]">
                <Bell className="size-5" />
              </span>
            </div>
            <p className="mt-4 rounded-2xl bg-[var(--admin-panel)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{notice}</p>
            <div className="mt-4 grid gap-2">
              {[
                ["محصول بدون فایل", "۳ مورد", "products"],
                ["مشاوره بدون پیشنهاد", "۵ پاسخ", "communication"],
                ["مطلب بدون سئو", "۴ صفحه", "content"],
              ].map(([label, value, section]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    onSectionChange(section as SectionId);
                    setNotice(`برای بررسی «${label}» وارد بخش مربوطه شدی.`);
                  }}
                  className="flex items-center justify-between rounded-2xl bg-[var(--admin-panel)] px-4 py-3 text-right transition hover:text-[var(--admin-accent)]"
                >
                  <span className="text-xs font-black text-[var(--admin-ink)]">{label}</span>
                  <span className="text-[10px] font-black text-[var(--admin-muted)]">{value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Surface>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.label} delay={index * 0.05}>
              <Surface className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black text-[var(--admin-muted)]">{item.label}</p>
                    <strong className="mt-3 block text-3xl font-black text-[var(--admin-ink)]">{item.value}</strong>
                  </div>
                  <div className="grid size-12 place-items-center rounded-2xl bg-[var(--admin-soft)] text-[var(--admin-accent)]">
                    <Icon className="size-5" />
                  </div>
                </div>
                <Status>{item.change}</Status>
              </Surface>
            </Reveal>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
        <Surface className="p-5">
          <SectionHeader
            title="صف عملیاتی سایت"
            text="بین سفارش‌ها، مشاوره‌ها، پشتیبانی و محتوا جابه‌جا شو؛ هر ردیف قابل پیگیری است."
            action={
              <button
                type="button"
                onClick={() => {
                  onSectionChange(selectedQueue.section);
                  setNotice(`صف «${selectedQueue.label}» برای مدیریت باز شد.`);
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 text-xs font-black text-[var(--admin-ink)] transition hover:border-[var(--admin-accent)]"
              >
                باز کردن بخش <ChevronLeft className="size-4 text-[var(--admin-accent)]" />
              </button>
            }
          />
          <div className="mb-4 flex gap-2 overflow-x-auto rounded-2xl bg-[var(--admin-panel-2)] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {overviewQueueTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setQueue(tab.id);
                  setNotice(`صف «${tab.label}» نمایش داده شد.`);
                }}
                className={`min-w-max rounded-xl px-4 py-2 text-[11px] font-black transition ${queue === tab.id ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {overviewQueues[queue].map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setNotice(`پرونده «${item.title}» برای بررسی انتخاب شد.`)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right transition hover:bg-[var(--admin-panel)] hover:text-[var(--admin-accent)]"
              >
                <span className="min-w-0">
                  <strong className="block truncate text-xs text-[var(--admin-ink)]">{item.title}</strong>
                  <small className="mt-1 block truncate text-[10px] font-bold text-[var(--admin-muted)]">{item.meta}</small>
                </span>
                <Status>{item.status}</Status>
              </button>
            ))}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader
            title="فروش و رفتار سایت"
            text="نمای سریع عملکرد فروشگاه، دوره‌ها و محتوای سایت در بازه انتخابی."
            action={
              <div className="flex rounded-2xl bg-[var(--admin-panel-2)] p-1">
                {Object.keys(chartValues).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setPeriod(item as keyof typeof chartValues);
                      setNotice(`نمودار بازه «${item}» فعال شد.`);
                    }}
                    className={`rounded-xl px-3 py-2 text-[10px] font-black transition ${period === item ? "bg-[var(--admin-accent)] text-[#06211f]" : "text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          />
          <div className="grid min-h-64 place-items-end gap-2 rounded-[24px] bg-[var(--admin-panel-2)] p-5 sm:grid-cols-8">
            {chart.map((height, index) => (
              <motion.button
                key={`${period}-${index}`}
                type="button"
                onClick={() => setNotice(`نقطه ${index + 1} نمودار ${period}: ${height.toLocaleString("fa-IR")} واحد فعالیت.`)}
                className="flex h-full w-full flex-col items-center justify-end gap-2"
                initial={{ scaleY: 0.55, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: index * 0.035 }}
              >
                <span className="w-full rounded-t-2xl bg-[var(--admin-accent)] transition hover:opacity-75" style={{ height: `${height * 1.35}px` }} />
                <span className="text-[10px] font-black text-[var(--admin-muted)]">{index + 1}</span>
              </motion.button>
            ))}
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <Surface className="p-5">
          <SectionHeader title="ریتم امروز سایت" text="نقاط مهم عملیاتی برای محتوا، فروش، دوره و ارتباطات." />
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["۷ مطلب", "در صف انتشار", CalendarDays],
              ["۳ محصول", "نیازمند فایل دانلود", Upload],
              ["۵ لایسنس", "در صف صدور SpotPlayer", KeyRound],
            ].map(([title, text, Icon]) => (
              <div key={String(title)} className="rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4">
                <Icon className="mb-5 size-5 text-[var(--admin-accent)]" />
                <strong className="block text-lg font-black text-[var(--admin-ink)]">{title as string}</strong>
                <p className="mt-2 text-xs leading-6 text-[var(--admin-muted)]">{text as string}</p>
              </div>
            ))}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="کارهای فوری" text={`${completedCount.toLocaleString("fa-IR")} مورد انجام شده`} action={<PrimaryButton icon={Plus} onClick={addTask}>وظیفه جدید</PrimaryButton>} />
          <div className="space-y-2">
            {tasks.map((item) => {
              const done = doneTasks.includes(item);
              return (
              <button key={item} type="button" onClick={() => toggleTask(item)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-right text-xs font-black transition ${done ? "bg-[var(--admin-soft)] text-[var(--admin-accent)]" : "bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:text-[var(--admin-accent)]"}`}>
                <span className={done ? "line-through opacity-80" : ""}>{item}</span>
                <ShieldCheck className="size-4" />
              </button>
            );})}
          </div>
        </Surface>
      </div>
    </div>
  );
}

function ContentPanel() {
  const [workspace, setWorkspace] = useState<ContentWorkspace>("all");
  const [selectedId, setSelectedId] = useState(contentItems[0].id);
  const [activeTools, setActiveTools] = useState<string[]>(["SEO"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["صفحات اصلی", "محصولات دانلودی"]);
  const [selectedTags, setSelectedTags] = useState<string[]>(["سئو محصول", "پلیر صوتی"]);
  const [message, setMessage] = useState("صفحه محتوا آماده مدیریت صفحات اصلی، مجله، محصولات، دوره‌ها و رسانه‌هاست.");
  const [modal, setModal] = useState<AdminActionModalData | null>(null);
  const selected = contentItems.find((item) => item.id === selectedId) ?? contentItems[0];
  const filteredItems = contentItems.filter((item) => workspace === "all" || item.area === workspace || (workspace === "seo" && item.seo < 85));
  const seoTone = selected.seo >= 90 ? "عالی" : selected.seo >= 80 ? "قابل قبول" : "نیازمند بهینه‌سازی";

  const openContentModal = (title: string, text: string, icon: IconType = FileText, details?: Array<{ label: string; value: string }>) => {
    setModal({ title, text, icon, details, primaryLabel: "اعمال روی محتوا" });
    setMessage(title);
  };

  const toggleTool = (tool: string) => {
    setActiveTools((current) => {
      const exists = current.includes(tool);
      setMessage(exists ? `ابزار «${tool}» غیرفعال شد.` : `ابزار «${tool}» فعال شد.`);
      return exists ? current.filter((item) => item !== tool) : [...current, tool];
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => {
      const exists = current.includes(category);
      setMessage(exists ? `دسته «${category}» از محتوا حذف شد.` : `دسته «${category}» به محتوا اضافه شد.`);
      return exists ? current.filter((item) => item !== category) : [...current, category];
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => {
      const exists = current.includes(tag);
      setMessage(exists ? `برچسب «${tag}» حذف شد.` : `برچسب «${tag}» اضافه شد.`);
      return exists ? current.filter((item) => item !== tag) : [...current, tag];
    });
  };

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <SectionHeader
          title="مرکز مدیریت محتوای سایت"
          text="همه محتوای قابل مدیریت سایت اصلی؛ از لندینگ و فروشگاه تا مجله، دوره‌ها، مشاوره، رسانه و سئوی محصول."
          action={<PrimaryButton onClick={() => openContentModal("ساخت محتوای جدید", "یک پیش‌نویس تازه با ساختار صفحه اصلی سایت، سئو، رسانه و CTA آماده می‌شود.", Plus, [{ label: "نوع", value: "صفحه / مقاله / رسانه" }, { label: "وضعیت", value: "پیش‌نویس" }, { label: "ادیتور", value: "حرفه‌ای" }])}>محتوای جدید</PrimaryButton>}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {contentWorkspaces.map((item) => {
            const Icon = item.icon;
            const active = workspace === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setWorkspace(item.id);
                  setMessage(`نمای «${item.label}» فعال شد.`);
                }}
                className={`group rounded-[22px] border p-4 text-right transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
              >
                <Icon className={`mb-5 size-5 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                <strong className="block text-xs font-black">{item.label}</strong>
                <span className={`mt-2 block text-[10px] font-bold ${active ? "text-[#06211f]/70" : "text-[var(--admin-muted)]"}`}>
                  {contentItems.filter((content) => item.id === "all" || content.area === item.id || (item.id === "seo" && content.seo < 85)).length.toLocaleString("fa-IR")} مورد
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{message}</p>
      </Surface>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
        <Surface className="p-5">
          <SectionHeader
            title="لیست محتوای سایت"
            text="هر ردیف قابل انتخاب است و ویرایشگر سمت چپ را با همان محتوا هماهنگ می‌کند."
            action={
              <div className="flex flex-wrap gap-2">
                <GhostButton icon={FolderTree} active={workspace === "pages"} onClick={() => setWorkspace("pages")}>صفحات</GhostButton>
                <GhostButton icon={Tags} active={workspace === "seo"} onClick={() => setWorkspace("seo")}>سئو</GhostButton>
                <GhostButton icon={CalendarDays} active={workspace === "calendar"} onClick={() => setWorkspace("calendar")}>تقویم</GhostButton>
              </div>
            }
          />
          <div className="space-y-2">
            {filteredItems.map((item) => {
              const active = selected.id === item.id;
              return (
                <article key={item.id} className={`rounded-[22px] border p-3 transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(item.id);
                      setMessage(`محتوای «${item.title}» برای ویرایش انتخاب شد.`);
                    }}
                    className="flex w-full items-start gap-3 text-right"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--admin-panel)] text-[var(--admin-accent)]">
                      {item.type === "مقاله" ? <FileText className="size-5" /> : item.type === "محصول" ? <Package className="size-5" /> : item.type === "رسانه" ? <ImageIcon className="size-5" /> : <LayoutDashboard className="size-5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="truncate text-sm font-black text-[var(--admin-ink)]">{item.title}</strong>
                        <Status>{item.status}</Status>
                      </span>
                      <span className="mt-1 block text-[10px] font-bold leading-6 text-[var(--admin-muted)]">{item.summary}</span>
                      <span className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-black text-[var(--admin-muted)]">
                        <span>{item.type}</span>
                        <span>سئو {item.seo.toLocaleString("fa-IR")}٪</span>
                        <span>{item.date}</span>
                      </span>
                    </span>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                    <Link href={item.href} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">مشاهده <ArrowLeft className="size-3.5" /></Link>
                    <button type="button" onClick={() => openContentModal(`پیش‌نمایش «${item.title}»`, "نمای کاربر از این محتوا با بنر، ساختار متن، رسانه‌ها و وضعیت سئو آماده بررسی است.", PlayCircle, [{ label: "نوع", value: item.type }, { label: "سئو", value: `${item.seo.toLocaleString("fa-IR")}٪` }, { label: "مسیر", value: item.href }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">پیش‌نمایش <PlayCircle className="size-3.5" /></button>
                    <button type="button" onClick={() => openContentModal(`انتشار «${item.title}»`, "این محتوا بعد از کنترل نهایی متا، تصویر شاخص و لینک‌های داخلی برای انتشار یا به‌روزرسانی آماده می‌شود.", ShieldCheck, [{ label: "وضعیت", value: item.status }, { label: "زمان", value: item.date }, { label: "بخش", value: item.type }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-accent)] px-3 text-[10px] font-black text-[#06211f]">انتشار <ShieldCheck className="size-3.5" /></button>
                  </div>
                </article>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="ویرایشگر حرفه‌ای" text={`در حال ویرایش: ${selected.title}`} />
          <div className="mb-4 flex flex-wrap gap-2 rounded-2xl bg-[var(--admin-panel-2)] p-2">
            {["B", "I", "H2", "لینک", "رسانه", "SEO"].map((item) => (
              <button key={item} type="button" onClick={() => toggleTool(item)} className={`rounded-xl px-3 py-2 text-[11px] font-black transition ${activeTools.includes(item) ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel)] text-[var(--admin-ink)] hover:text-[var(--admin-accent)]"}`}>
                {item}
              </button>
            ))}
          </div>
          <label className="block text-[11px] font-black text-[var(--admin-muted)]">
            عنوان محتوا
            <input value={selected.title} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]" />
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              آدرس صفحه
              <input value={selected.href} readOnly dir="ltr" className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-left text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              زمان انتشار
              <input value={selected.date} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
          </div>
          <textarea value={`${selected.summary}\n\nاینجا متن اصلی، سرفصل‌ها، توضیحات سئو، CTA و ساختار محتوایی صفحه مدیریت می‌شود.`} readOnly className="mt-4 min-h-48 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold leading-8 text-[var(--admin-ink)] outline-none placeholder:text-[var(--admin-muted)] focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {contentEditorBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <button key={block.title} type="button" onClick={() => openContentModal(block.title, block.text, Icon, [{ label: "محتوا", value: selected.title }, { label: "مسیر", value: selected.href }, { label: "وضعیت", value: selected.status }])} className="rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4 text-right transition hover:-translate-y-0.5 hover:border-[var(--admin-accent)]">
                  <Icon className="mb-4 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{block.title}</strong>
                  <span className="mt-2 block text-[10px] font-bold leading-5 text-[var(--admin-muted)]">{block.text}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Save} onClick={() => openContentModal(`ذخیره «${selected.title}»`, "تغییرات ادیتور، سئو، رسانه و دسته‌بندی‌ها در پیش‌نویس ذخیره شد.", Save, [{ label: "ادیتور", value: "ذخیره امن" }, { label: "سئو", value: seoTone }, { label: "وضعیت", value: selected.status }])}>ذخیره</PrimaryButton>
            <GhostButton icon={PlayCircle} onClick={() => openContentModal(`پیش‌نمایش «${selected.title}»`, "پیش‌نمایش کامل صفحه مثل چیزی که کاربر در سایت اصلی می‌بیند آماده است.", PlayCircle, [{ label: "بنر", value: "فعال" }, { label: "رسانه", value: "بررسی شد" }, { label: "CTA", value: "هماهنگ" }])}>پیش‌نمایش</GhostButton>
            <GhostButton icon={ShieldCheck} onClick={() => openContentModal(`تایید انتشار «${selected.title}»`, "قبل از انتشار، وضعیت متا، لینک داخلی، تصویر شاخص و ساختار عنوان‌ها کنترل می‌شود.", ShieldCheck, [{ label: "کنترل نهایی", value: "آماده" }, { label: "زمان", value: selected.date }, { label: "بخش", value: selected.type }])}>انتشار</GhostButton>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
        <Surface className="p-5">
          <SectionHeader title="دسته‌بندی و برچسب‌ها" text="دسته‌ها و برچسب‌های این محتوا را بدون خروج از صفحه مدیریت کن." />
          <div>
            <p className="mb-2 text-[11px] font-black text-[var(--admin-muted)]">دسته‌بندی‌ها</p>
            <div className="flex flex-wrap gap-2">
              {contentCategories.map((category) => {
                const active = selectedCategories.includes(category);
                return (
                  <button key={category} type="button" onClick={() => toggleCategory(category)} className={`rounded-full px-3 py-2 text-[10px] font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-black text-[var(--admin-muted)]">برچسب‌ها</p>
            <div className="flex flex-wrap gap-2">
              {contentTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`rounded-full px-3 py-2 text-[10px] font-black transition ${active ? "bg-[var(--admin-soft)] text-[var(--admin-accent)] ring-1 ring-[var(--admin-accent)]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="سئو و تقویم انتشار" text="وضعیت سئو، زمان‌بندی و نقاط ضروری صفحه انتخاب‌شده." />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Search className="mb-5 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-2xl font-black text-[var(--admin-ink)]">{selected.seo.toLocaleString("fa-IR")}٪</strong>
              <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{seoTone}</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <CalendarDays className="mb-5 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-sm font-black text-[var(--admin-ink)]">{selected.date}</strong>
              <button type="button" onClick={() => openContentModal("زمان‌بندی انتشار", `زمان انتشار «${selected.title}» با تقویم محتوا هماهنگ می‌شود.`, CalendarDays, [{ label: "زمان فعلی", value: selected.date }, { label: "نوع محتوا", value: selected.type }, { label: "وضعیت", value: selected.status }])} className="mt-3 text-[10px] font-black text-[var(--admin-accent)]">تنظیم زمان</button>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Upload className="mb-5 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-sm font-black text-[var(--admin-ink)]">رسانه آماده</strong>
              <button type="button" onClick={() => openContentModal("انتخاب رسانه محتوا", "کاور، تصویر شاخص، ویدئو یا فایل همراه برای این محتوا انتخاب و بهینه‌سازی می‌شود.", ImageIcon, [{ label: "تصویر", value: "WebP" }, { label: "ویدئو", value: "پلیر سایت" }, { label: "ALT", value: "نیازمند بررسی" }])} className="mt-3 text-[10px] font-black text-[var(--admin-accent)]">انتخاب رسانه</button>
            </div>
          </div>
        </Surface>
      </div>
      <AdminActionModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function ProductsPanel() {
  const [workspace, setWorkspace] = useState<ProductWorkspace>("all");
  const [selectedId, setSelectedId] = useState(adminProducts[0].id);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["آراندبی / سول", "درام و پرکاشن"]);
  const [enabledTabs, setEnabledTabs] = useState<string[]>(["توضیحات", "نمونه‌های صوتی", "میکسر", "نمونه‌کار هنرجو", "نظرات"]);
  const [enabledModules, setEnabledModules] = useState<string[]>(["بنر محصول", "ویدئوی معرفی", "دموهای صوتی", "میکسر لایه‌ای", "فایل دانلودی"]);
  const [message, setMessage] = useState("صفحه محصولات آماده مدیریت محصول‌های دانلودی، فایل‌ها، پلیرها و صفحه فروشگاه است.");
  const [modal, setModal] = useState<AdminActionModalData | null>(null);
  const selected = adminProducts.find((item) => item.id === selectedId) ?? adminProducts[0];
  const filteredProducts = adminProducts.filter((item) => {
    if (workspace === "all") return true;
    if (workspace === "published") return item.status === "منتشر شده";
    if (workspace === "drafts") return item.status !== "منتشر شده";
    if (workspace === "files") return item.missing.length > 0;
    if (workspace === "media") return item.missing.some((missing) => missing.includes("دمو") || missing.includes("ویدئو") || missing.includes("نمونه‌کار"));
    if (workspace === "seo") return item.seo < 88;
    return true;
  });
  const seoTone = selected.seo >= 90 ? "عالی" : selected.seo >= 82 ? "قابل قبول" : "نیازمند بهینه‌سازی";
  const readyModules = enabledModules.length;

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => {
      const exists = current.includes(category);
      setMessage(exists ? `دسته «${category}» از محصول حذف شد.` : `دسته «${category}» به محصول اضافه شد.`);
      return exists ? current.filter((item) => item !== category) : [...current, category];
    });
  };

  const toggleTab = (tab: string) => {
    setEnabledTabs((current) => {
      const exists = current.includes(tab);
      setMessage(exists ? `تب «${tab}» در صفحه محصول غیرفعال شد.` : `تب «${tab}» در صفحه محصول فعال شد.`);
      return exists ? current.filter((item) => item !== tab) : [...current, tab];
    });
  };

  const toggleModule = (module: string) => {
    setEnabledModules((current) => {
      const exists = current.includes(module);
      setMessage(exists ? `ماژول «${module}» غیرفعال شد.` : `ماژول «${module}» آماده نمایش شد.`);
      return exists ? current.filter((item) => item !== module) : [...current, module];
    });
  };

  const openProductModal = (title: string, text: string, icon: IconType = Package, details?: Array<{ label: string; value: string }>) => {
    setModal({ title, text, icon, details, primaryLabel: "اعمال روی محصول" });
    setMessage(title);
  };

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <SectionHeader
          title="مرکز مدیریت محصولات سایت"
          text="همه اجزای محصول دانلودی؛ از کارت فروشگاه و صفحه محصول تا فایل دانلودی، دموهای صوتی، میکسر، ویدئو، تب‌ها و نمونه‌کار هنرجو."
          action={<PrimaryButton onClick={() => openProductModal("ساخت محصول جدید", "یک محصول تازه با ساختار صفحه محصول سایت، بنر، پلیر، فایل دانلودی، قیمت و تب‌های اختصاصی ساخته می‌شود.", Plus, [{ label: "نوع", value: "دانلودی / آموزشی" }, { label: "وضعیت", value: "پیش‌نویس" }, { label: "فایل", value: "نیازمند آپلود" }])}>محصول جدید</PrimaryButton>}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {productWorkspaces.map((item) => {
            const Icon = item.icon;
            const active = workspace === item.id;
            const count = adminProducts.filter((product) => {
              if (item.id === "all") return true;
              if (item.id === "published") return product.status === "منتشر شده";
              if (item.id === "drafts") return product.status !== "منتشر شده";
              if (item.id === "files") return product.missing.length > 0;
              if (item.id === "media") return product.missing.some((missing) => missing.includes("دمو") || missing.includes("ویدئو") || missing.includes("نمونه‌کار"));
              if (item.id === "seo") return product.seo < 88;
              return true;
            }).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setWorkspace(item.id);
                  setMessage(`نمای «${item.label}» فعال شد.`);
                }}
                className={`rounded-[22px] border p-4 text-right transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
              >
                <Icon className={`mb-5 size-5 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                <strong className="block text-xs font-black">{item.label}</strong>
                <span className={`mt-2 block text-[10px] font-bold ${active ? "text-[#06211f]/70" : "text-[var(--admin-muted)]"}`}>{count.toLocaleString("fa-IR")} محصول</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{message}</p>
      </Surface>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
        <Surface className="p-5">
          <SectionHeader
            title="لیست محصولات فروشگاه"
            text="انتخاب هر محصول، فرم مدیریت، فایل‌ها و تنظیمات صفحه محصول را هماهنگ می‌کند."
            action={
              <div className="flex flex-wrap gap-2">
                <GhostButton icon={ShieldCheck} active={workspace === "published"} onClick={() => setWorkspace("published")}>منتشرشده</GhostButton>
                <GhostButton icon={Upload} active={workspace === "files"} onClick={() => setWorkspace("files")}>فایل ناقص</GhostButton>
                <GhostButton icon={Search} active={workspace === "seo"} onClick={() => setWorkspace("seo")}>سئو</GhostButton>
              </div>
            }
          />
          <div className="space-y-2">
            {filteredProducts.map((product) => {
              const active = selected.id === product.id;
              return (
                <article key={product.id} className={`rounded-[22px] border p-3 transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(product.id);
                      setMessage(`محصول «${product.title}» برای مدیریت انتخاب شد.`);
                    }}
                    className="flex w-full items-start gap-3 text-right"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--admin-panel)] text-[var(--admin-accent)]">
                      <AudioWaveform className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="truncate text-sm font-black text-[var(--admin-ink)]">{product.title}</strong>
                        <Status>{product.status}</Status>
                      </span>
                      <span className="mt-1 block text-[10px] font-bold leading-6 text-[var(--admin-muted)]">{product.summary}</span>
                      <span className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-black text-[var(--admin-muted)]">
                        <span>{product.category}</span>
                        <span>{product.price} تومان</span>
                        <span>فروش {product.sales.toLocaleString()}</span>
                        <span>سئو {product.seo.toLocaleString("fa-IR")}٪</span>
                      </span>
                    </span>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                    <Link href={product.href} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">مشاهده <ArrowLeft className="size-3.5" /></Link>
                    <button type="button" onClick={() => openProductModal(`پیش‌نمایش «${product.title}»`, "صفحه محصول با بنر، ویدئو، نمونه صوتی، تب‌ها، قیمت و وضعیت فایل آماده بررسی است.", PlayCircle, [{ label: "قیمت", value: product.price }, { label: "سئو", value: `${product.seo.toLocaleString("fa-IR")}٪` }, { label: "مسیر", value: product.href }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">پیش‌نمایش <PlayCircle className="size-3.5" /></button>
                    <button type="button" onClick={() => openProductModal(`انتشار «${product.title}»`, "قبل از انتشار محصول، فایل دانلودی، قیمت، دموهای صوتی، تب‌های محصول و بنر بررسی می‌شوند.", ShieldCheck, [{ label: "وضعیت", value: product.status }, { label: "فایل‌ها", value: product.files.length.toLocaleString("fa-IR") }, { label: "درآمد", value: product.revenue }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-accent)] px-3 text-[10px] font-black text-[#06211f]">انتشار <ShieldCheck className="size-3.5" /></button>
                  </div>
                </article>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="تنظیمات فروش محصول" text={`در حال مدیریت: ${selected.title}`} />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              نام محصول
              <input value={selected.title} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              اسلاگ
              <input value={selected.slug} readOnly dir="ltr" className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-left text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              قیمت
              <input value={selected.price} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              تخفیف
              <input value={selected.discount} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <CircleDollarSign className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.revenue}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">درآمد محصول</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Package className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.sales}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">فروش</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Search className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.seo.toLocaleString("fa-IR")}٪</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{seoTone}</span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {productEditorBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <button key={block.title} type="button" onClick={() => openProductModal(block.title, block.text, Icon, [{ label: "محصول", value: selected.title }, { label: "نوع", value: selected.type }, { label: "قیمت", value: selected.price }])} className="rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4 text-right transition hover:-translate-y-0.5 hover:border-[var(--admin-accent)]">
                  <Icon className="mb-4 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{block.title}</strong>
                  <span className="mt-2 block text-[10px] font-bold leading-5 text-[var(--admin-muted)]">{block.text}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Save} onClick={() => openProductModal(`ذخیره «${selected.title}»`, "تنظیمات فروش، فایل، دمو، قیمت، کمپین و تب‌های محصول ذخیره شد.", Save, [{ label: "قیمت", value: selected.price }, { label: "فایل", value: selected.files.length.toLocaleString("fa-IR") }, { label: "سئو", value: `${selected.seo.toLocaleString("fa-IR")}٪` }])}>ذخیره</PrimaryButton>
            <GhostButton icon={Tags} onClick={() => openProductModal("کمپین محصول", `کمپین تخفیف و پیشنهاد نزدیک برای «${selected.title}» آماده تنظیم است.`, Tags, [{ label: "محصول", value: selected.title }, { label: "درآمد", value: selected.revenue }, { label: "دسته", value: selected.category }])}>کمپین</GhostButton>
            <GhostButton icon={ShieldCheck} onClick={() => openProductModal("وضعیت انتشار محصول", "وضعیت انتشار، موجودی فایل و آماده بودن صفحه محصول بررسی می‌شود.", ShieldCheck, [{ label: "وضعیت", value: selected.status }, { label: "نوع", value: selected.type }, { label: "مسیر", value: selected.href }])}>وضعیت</GhostButton>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
        <Surface className="p-5">
          <SectionHeader title="دسته‌بندی و فایل‌های محصول" text="دسته‌بندی فروشگاه و فایل‌های دانلودی محصول را مدیریت کن." />
          <div>
            <p className="mb-2 text-[11px] font-black text-[var(--admin-muted)]">دسته‌بندی‌ها</p>
            <div className="flex flex-wrap gap-2">
              {productCategories.map((category) => {
                const active = selectedCategories.includes(category);
                return (
                  <button key={category} type="button" onClick={() => toggleCategory(category)} className={`rounded-full px-3 py-2 text-[10px] font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {selected.files.map((file) => (
              <button key={file} type="button" onClick={() => openProductModal(`مدیریت فایل «${file}»`, "جزئیات فایل دانلودی، حجم، نسخه، امنیت لینک و وضعیت دسترسی محصول بررسی می‌شود.", Upload, [{ label: "فایل", value: file }, { label: "محصول", value: selected.title }, { label: "وضعیت", value: "آماده" }])} className="flex w-full items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right text-xs font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-2"><Upload className="size-4 text-[var(--admin-accent)]" />{file}</span>
                <Status>آماده</Status>
              </button>
            ))}
            {selected.missing.map((file) => (
              <button key={file} type="button" onClick={() => openProductModal(`تکمیل بخش ناقص «${file}»`, "این بخش قبل از انتشار محصول باید کامل شود و در صفحه محصول هم اثر مستقیم دارد.", Bell, [{ label: "بخش ناقص", value: file }, { label: "محصول", value: selected.title }, { label: "اولویت", value: "قبل از انتشار" }])} className="flex w-full items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right text-xs font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-2"><Bell className="size-4 text-[var(--admin-accent)]" />{file}</span>
                <Status>ناقص</Status>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => openProductModal("افزودن فایل دانلودی", "یک فایل جدید با عنوان، حجم، نسخه، نوع دسترسی و لینک امن به محصول اضافه می‌شود.", Upload, [{ label: "محصول", value: selected.title }, { label: "نوع", value: selected.type }, { label: "امنیت", value: "دانلود محافظت‌شده" }])} className="inline-flex min-h-20 items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-panel-2)] px-4 py-5 text-xs font-black text-[var(--admin-muted)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]">
              <Upload className="size-4 text-[var(--admin-accent)]" /> فایل دانلودی
            </button>
            <button type="button" onClick={() => openProductModal("نسخه جدید محصول", "برای محصول یک نسخه جدید با یادداشت تغییرات، فایل تازه و وضعیت انتشار ساخته می‌شود.", Layers3, [{ label: "محصول", value: selected.title }, { label: "نسخه", value: "جدید" }, { label: "وضعیت", value: "پیش‌نویس" }])} className="inline-flex min-h-20 items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-panel-2)] px-4 py-5 text-xs font-black text-[var(--admin-muted)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]">
              <Layers3 className="size-4 text-[var(--admin-accent)]" /> نسخه محصول
            </button>
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="صفحه محصول، پلیر و تب‌ها" text="ماژول‌های صفحه محصول در سایت اصلی را فعال/غیرفعال و آماده انتشار کن." />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {productMediaModules.map((module) => {
              const active = enabledModules.includes(module);
              return (
                <button key={module} type="button" onClick={() => toggleModule(module)} className={`rounded-[22px] border p-4 text-right transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <PlayCircle className="mb-5 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{module}</strong>
                  <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{active ? "فعال در صفحه محصول" : "غیرفعال"}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-black text-[var(--admin-muted)]">تب‌های صفحه محصول</p>
            <div className="flex flex-wrap gap-2">
              {productPageTabs.map((tab) => {
                const active = enabledTabs.includes(tab);
                return (
                  <button key={tab} type="button" onClick={() => toggleTab(tab)} className={`rounded-full px-3 py-2 text-[10px] font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <AudioWaveform className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{readyModules.toLocaleString("fa-IR")}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">ماژول فعال</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <FileText className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{enabledTabs.length.toLocaleString("fa-IR")}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">تب فعال</span>
            </div>
            <button type="button" onClick={() => openProductModal(`پیش‌نمایش صفحه محصول «${selected.title}»`, "تمام تب‌ها، بنر، پلیر، فایل‌ها، قیمت و CTA خرید مثل صفحه اصلی محصول بررسی می‌شوند.", PlayCircle, [{ label: "تب‌ها", value: enabledTabs.length.toLocaleString("fa-IR") }, { label: "رسانه", value: enabledModules.length.toLocaleString("fa-IR") }, { label: "قیمت", value: selected.price }])} className="rounded-[22px] bg-[var(--admin-accent)] p-4 text-right text-[#06211f] transition hover:-translate-y-0.5">
              <PlayCircle className="mb-4 size-5" />
              <strong className="block text-sm font-black">پیش‌نمایش صفحه</strong>
              <span className="mt-1 block text-[10px] font-bold opacity-70">محصول در سایت</span>
            </button>
          </div>
        </Surface>
      </div>
      <AdminActionModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function CoursesPanel() {
  const [workspace, setWorkspace] = useState<CourseWorkspace>("all");
  const [selectedId, setSelectedId] = useState(adminCourses[0].id);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["تولید موسیقی", "رایگان"]);
  const [enabledModules, setEnabledModules] = useState<string[]>(["ویدئوی دوره", "تایم‌لاین پلیر", "فایل دانلودی", "صفحه فصل", "صفحه قسمت", "نظرات"]);
  const [message, setMessage] = useState("صفحه دوره‌ها آماده مدیریت دوره‌های رایگان، فصل‌ها، قسمت‌های سئو و فایل‌های دانلودی است.");
  const [modal, setModal] = useState<AdminActionModalData | null>(null);
  const selected = adminCourses.find((item) => item.id === selectedId) ?? adminCourses[0];
  const filteredCourses = adminCourses.filter((course) => {
    if (workspace === "all") return true;
    if (workspace === "free") return true;
    if (workspace === "published") return course.status === "منتشر شده";
    if (workspace === "lessons") return course.lessons > 0;
    if (workspace === "downloads") return course.downloads.length > 0 || course.missing.some((item) => item.includes("فایل"));
    if (workspace === "spotplayer") return course.spot !== "فعال";
    if (workspace === "seo") return course.seo < 88;
    return true;
  });
  const seoTone = selected.seo >= 90 ? "عالی" : selected.seo >= 82 ? "قابل قبول" : "نیازمند بهینه‌سازی";

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => {
      const exists = current.includes(category);
      setMessage(exists ? `دسته «${category}» از دوره حذف شد.` : `دسته «${category}» به دوره اضافه شد.`);
      return exists ? current.filter((item) => item !== category) : [...current, category];
    });
  };

  const toggleModule = (module: string) => {
    setEnabledModules((current) => {
      const exists = current.includes(module);
      setMessage(exists ? `ماژول «${module}» در صفحه دوره غیرفعال شد.` : `ماژول «${module}» در صفحه دوره فعال شد.`);
      return exists ? current.filter((item) => item !== module) : [...current, module];
    });
  };

  const openCourseModal = (title: string, text: string, icon: IconType = BookOpen, details?: Array<{ label: string; value: string }>) => {
    setModal({ title, text, icon, details, primaryLabel: "اعمال روی دوره" });
    setMessage(title);
  };

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <SectionHeader
          title="مرکز مدیریت دوره‌های سایت"
          text="دوره‌های رایگان سایت، صفحه دوره، فصل‌ها، قسمت‌های مستقل برای سئو، پلیر ویدئو، فایل‌های دانلودی و SpotPlayer را از همینجا مدیریت کن."
          action={<PrimaryButton onClick={() => openCourseModal("ساخت دوره جدید", "یک دوره تازه با صفحه اصلی، فصل‌ها، قسمت‌های SEO، پلیر آموزشی و فایل‌های همراه ساخته می‌شود.", Plus, [{ label: "نوع", value: "رایگان" }, { label: "وضعیت", value: "پیش‌نویس" }, { label: "ساختار", value: "فصل و قسمت" }])}>دوره جدید</PrimaryButton>}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
          {courseWorkspaces.map((item) => {
            const Icon = item.icon;
            const active = workspace === item.id;
            const count = adminCourses.filter((course) => {
              if (item.id === "all" || item.id === "free") return true;
              if (item.id === "published") return course.status === "منتشر شده";
              if (item.id === "lessons") return course.lessons > 0;
              if (item.id === "downloads") return course.downloads.length > 0 || course.missing.some((missing) => missing.includes("فایل"));
              if (item.id === "spotplayer") return course.spot !== "فعال";
              if (item.id === "seo") return course.seo < 88;
              return true;
            }).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setWorkspace(item.id);
                  setMessage(`نمای «${item.label}» فعال شد.`);
                }}
                className={`rounded-[22px] border p-4 text-right transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
              >
                <Icon className={`mb-5 size-5 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                <strong className="block text-xs font-black">{item.label}</strong>
                <span className={`mt-2 block text-[10px] font-bold ${active ? "text-[#06211f]/70" : "text-[var(--admin-muted)]"}`}>{count.toLocaleString("fa-IR")} دوره</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{message}</p>
      </Surface>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
        <Surface className="p-5">
          <SectionHeader
            title="لیست دوره‌های رایگان"
            text="انتخاب هر دوره، تنظیمات، فصل‌ها، قسمت‌های سئو و فایل‌های همراه را هماهنگ می‌کند."
            action={
              <div className="flex flex-wrap gap-2">
                <GhostButton icon={ShieldCheck} active={workspace === "published"} onClick={() => setWorkspace("published")}>منتشرشده</GhostButton>
                <GhostButton icon={Layers3} active={workspace === "lessons"} onClick={() => setWorkspace("lessons")}>فصل/قسمت</GhostButton>
                <GhostButton icon={KeyRound} active={workspace === "spotplayer"} onClick={() => setWorkspace("spotplayer")}>SpotPlayer</GhostButton>
              </div>
            }
          />
          <div className="space-y-2">
            {filteredCourses.map((course) => {
              const active = selected.id === course.id;
              return (
                <article key={course.id} className={`rounded-[22px] border p-3 transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(course.id);
                      setMessage(`دوره «${course.title}» برای مدیریت انتخاب شد.`);
                    }}
                    className="flex w-full items-start gap-3 text-right"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--admin-panel)] text-[var(--admin-accent)]">
                      <BookOpen className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="truncate text-sm font-black text-[var(--admin-ink)]">{course.title}</strong>
                        <Status>{course.status}</Status>
                      </span>
                      <span className="mt-1 block text-[10px] font-bold leading-6 text-[var(--admin-muted)]">{course.summary}</span>
                      <span className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-black text-[var(--admin-muted)]">
                        <span>{course.category}</span>
                        <span>{course.chapters.toLocaleString("fa-IR")} فصل</span>
                        <span>{course.lessons.toLocaleString("fa-IR")} قسمت</span>
                        <span>{course.students} هنرجو</span>
                        <span>سئو {course.seo.toLocaleString("fa-IR")}٪</span>
                      </span>
                    </span>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                    <Link href={course.href} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">مشاهده <ArrowLeft className="size-3.5" /></Link>
                    <button type="button" onClick={() => openCourseModal(`پیش‌نمایش دوره «${course.title}»`, "نمای دوره در سایت با پلیر، توضیحات، فصل‌ها، قسمت‌ها و کارت سمت راست آماده بررسی است.", PlayCircle, [{ label: "فصل", value: course.chapters.toLocaleString("fa-IR") }, { label: "قسمت", value: course.lessons.toLocaleString("fa-IR") }, { label: "مسیر", value: course.href }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">پیش‌نمایش <PlayCircle className="size-3.5" /></button>
                    <button type="button" onClick={() => openCourseModal(`انتشار دوره «${course.title}»`, "قبل از انتشار، صفحه دوره، صفحات قسمت‌ها، تایم‌لاین پلیر و فایل‌های همراه بررسی می‌شوند.", ShieldCheck, [{ label: "وضعیت", value: course.status }, { label: "SpotPlayer", value: course.spot }, { label: "سئو", value: `${course.seo.toLocaleString("fa-IR")}٪` }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-accent)] px-3 text-[10px] font-black text-[#06211f]">انتشار <ShieldCheck className="size-3.5" /></button>
                  </div>
                </article>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="تنظیمات دوره" text={`در حال مدیریت: ${selected.title}`} />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              نام دوره
              <input value={selected.title} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              اسلاگ
              <input value={selected.slug} readOnly dir="ltr" className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-left text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              سطح دوره
              <input value={selected.level} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              دسته اصلی
              <input value={selected.category} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Layers3 className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.chapters.toLocaleString("fa-IR")} / {selected.lessons.toLocaleString("fa-IR")}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">فصل / قسمت</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Users className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.students}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">هنرجو</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Search className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.seo.toLocaleString("fa-IR")}٪</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{seoTone}</span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {courseEditorBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <button key={block.title} type="button" onClick={() => openCourseModal(block.title, block.text, Icon, [{ label: "دوره", value: selected.title }, { label: "سطح", value: selected.level }, { label: "مسیر", value: selected.href }])} className="rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4 text-right transition hover:-translate-y-0.5 hover:border-[var(--admin-accent)]">
                  <Icon className="mb-4 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{block.title}</strong>
                  <span className="mt-2 block text-[10px] font-bold leading-5 text-[var(--admin-muted)]">{block.text}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Save} onClick={() => openCourseModal(`ذخیره دوره «${selected.title}»`, "تنظیمات صفحه دوره، فصل‌ها، قسمت‌ها، پلیر و فایل‌ها ذخیره شد.", Save, [{ label: "فصل/قسمت", value: `${selected.chapters}/${selected.lessons}` }, { label: "سئو", value: `${selected.seo.toLocaleString("fa-IR")}٪` }, { label: "SpotPlayer", value: selected.spot }])}>ذخیره</PrimaryButton>
            <GhostButton icon={CalendarDays} onClick={() => openCourseModal("زمان‌بندی انتشار دوره", `زمان انتشار و نمایش دوره «${selected.title}» در سایت تنظیم می‌شود.`, CalendarDays, [{ label: "وضعیت", value: selected.status }, { label: "مدت", value: selected.duration }, { label: "هنرجو", value: selected.students }])}>زمان‌بندی</GhostButton>
            <GhostButton icon={ShieldCheck} onClick={() => openCourseModal("وضعیت دوره", "وضعیت انتشار، دسترسی عمومی، صفحات سئو و فایل‌های همراه بررسی می‌شود.", ShieldCheck, [{ label: "وضعیت", value: selected.status }, { label: "دسته", value: selected.category }, { label: "سطح", value: selected.level }])}>وضعیت</GhostButton>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
        <Surface className="p-5">
          <SectionHeader title="ساختار فصل‌ها و صفحات سئو" text="هر قسمت لینک مستقل دارد تا مثل سایت اصلی برای سئو قابل ایندکس باشد." />
          <div className="space-y-2">
            {selected.lessonRoutes.map((lesson, index) => (
              <article key={lesson.href} className="rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <strong className="block text-xs font-black text-[var(--admin-ink)]">{(index + 1).toLocaleString("fa-IR")}. {lesson.title}</strong>
                    <span dir="ltr" className="mt-1 block text-left text-[10px] font-bold text-[var(--admin-muted)]">{lesson.href}</span>
                  </div>
                  <Status>{lesson.time}</Status>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                  <Link href={lesson.href} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">مشاهده قسمت <ArrowLeft className="size-3.5" /></Link>
                  <button type="button" onClick={() => openCourseModal(`تایم‌لاین «${lesson.title}»`, "نقاط مهم ویدئو، زمان پرش، عنوان تایم‌لاین و توضیح کوتاه قسمت ویرایش می‌شود.", PlayCircle, [{ label: "زمان", value: lesson.time }, { label: "قسمت", value: lesson.title }, { label: "مسیر", value: lesson.href }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">تایم‌لاین <PlayCircle className="size-3.5" /></button>
                  <button type="button" onClick={() => openCourseModal(`سئوی قسمت «${lesson.title}»`, "متای عنوان، توضیح، canonical و ساختار لینک داخلی این قسمت بررسی می‌شود.", Search, [{ label: "قسمت", value: lesson.title }, { label: "مسیر", value: lesson.href }, { label: "مدت", value: lesson.time }])} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-accent)] px-3 text-[10px] font-black text-[#06211f]">سئو <Search className="size-3.5" /></button>
                </div>
              </article>
            ))}
          </div>
          <button type="button" onClick={() => openCourseModal("افزودن قسمت جدید", "یک صفحه مستقل برای قسمت جدید ساخته می‌شود تا برای سئو قابل ایندکس باشد.", Plus, [{ label: "دوره", value: selected.title }, { label: "ساختار", value: "صفحه مستقل" }, { label: "پلیر", value: "نیازمند تایم‌لاین" }])} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-panel-2)] px-4 text-xs font-black text-[var(--admin-muted)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]">
            <Plus className="size-4" /> افزودن قسمت جدید
          </button>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="SpotPlayer، دانلودها و فایل‌های رایگان" text="اتصال پلیر آموزشی، فایل‌های تمرین، دانلودهای حجیم و وضعیت لایسنس‌ها." />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <KeyRound className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.spot}</strong>
              <button type="button" onClick={() => openCourseModal("بررسی اتصال SpotPlayer", `وضعیت لایسنس و اتصال دوره «${selected.title}» بررسی می‌شود.`, KeyRound, [{ label: "وضعیت", value: selected.spot }, { label: "دوره", value: selected.title }, { label: "دسترسی", value: "عمومی/رایگان" }])} className="mt-3 text-[10px] font-black text-[var(--admin-accent)]">بررسی اتصال</button>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <PlayCircle className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.duration}</strong>
              <button type="button" onClick={() => openCourseModal("تنظیم پلیر آموزشی", "ویدئو، تایم‌لاین‌های مهم، دکمه‌های پلیر و انتخاب قسمت‌ها تنظیم می‌شوند.", PlayCircle, [{ label: "مدت دوره", value: selected.duration }, { label: "قسمت", value: selected.lessons.toLocaleString("fa-IR") }, { label: "پلیر", value: "آموزشی" }])} className="mt-3 text-[10px] font-black text-[var(--admin-accent)]">تنظیم پلیر</button>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {selected.downloads.map((file) => (
              <button key={file} type="button" onClick={() => openCourseModal(`مدیریت فایل «${file}»`, "فایل تمرین یا دانلود همراه دوره با وضعیت دسترسی و حجم بررسی می‌شود.", Upload, [{ label: "فایل", value: file }, { label: "دوره", value: selected.title }, { label: "وضعیت", value: "آماده" }])} className="flex w-full items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right text-xs font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-2"><Upload className="size-4 text-[var(--admin-accent)]" />{file}</span>
                <Status>آماده</Status>
              </button>
            ))}
            {selected.missing.map((item) => (
              <button key={item} type="button" onClick={() => openCourseModal(`تکمیل بخش ناقص «${item}»`, "این بخش قبل از انتشار نهایی دوره باید تکمیل شود تا صفحه دوره ناقص دیده نشود.", Bell, [{ label: "بخش", value: item }, { label: "دوره", value: selected.title }, { label: "اولویت", value: "قبل از انتشار" }])} className="flex w-full items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right text-xs font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-2"><Bell className="size-4 text-[var(--admin-accent)]" />{item}</span>
                <Status>ناقص</Status>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => openCourseModal("افزودن دانلود رایگان", "یک فایل دانلودی همراه دوره با حالت آکاردئونی، عنوان، حجم و لینک امن اضافه می‌شود.", Upload, [{ label: "دوره", value: selected.title }, { label: "نمایش", value: "آکاردئونی" }, { label: "دسترسی", value: "رایگان" }])} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-panel-2)] px-4 text-xs font-black text-[var(--admin-muted)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]">
            <Upload className="size-4" /> افزودن دانلود رایگان
          </button>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
        <Surface className="p-5">
          <SectionHeader title="دسته‌بندی دوره" text="دسته‌های اصلی و مسیرهای قابل نمایش در سایت." />
          <div className="flex flex-wrap gap-2">
            {courseCategories.map((category) => {
              const active = selectedCategories.includes(category);
              return (
                <button key={category} type="button" onClick={() => toggleCategory(category)} className={`rounded-full px-3 py-2 text-[10px] font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                  {category}
                </button>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="ماژول‌های صفحه دوره" text="ماژول‌هایی که در صفحه دوره، فصل و قسمت‌های سایت نمایش داده می‌شوند." />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {courseModules.map((module) => {
              const active = enabledModules.includes(module);
              return (
                <button key={module} type="button" onClick={() => toggleModule(module)} className={`rounded-[22px] border p-4 text-right transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <PlayCircle className="mb-5 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{module}</strong>
                  <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{active ? "فعال در سایت" : "غیرفعال"}</span>
                </button>
              );
            })}
          </div>
        </Surface>
      </div>
      <AdminActionModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function UsersPanel() {
  const [workspace, setWorkspace] = useState<UserWorkspace>("all");
  const [users, setUsers] = useState(adminUsers);
  const [selectedId, setSelectedId] = useState(adminUsers[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [enabledRoles, setEnabledRoles] = useState(userRoles.slice(0, 5));
  const [message, setMessage] = useState("مرکز کاربران آماده مدیریت هنرجوها، خریداران، فروشندگان، پشتیبان‌ها، نقش‌ها و سطح دسترسی‌هاست.");

  const selected = users.find((item) => item.id === selectedId) ?? users[0];
  const matchesWorkspace = (user: AdminUser, target: UserWorkspace) => {
    if (target === "all") return true;
    if (target === "students") return user.role === "هنرجو" || user.courses > 0;
    if (target === "customers") return user.orders > 0 || user.products > 0;
    if (target === "vip") return user.level === "VIP";
    if (target === "support") return user.tickets > 0 || user.role === "پشتیبان";
    if (target === "inactive") return user.status !== "فعال";
    if (target === "access") return user.permissions.some((permission) => permission.includes("مدیریت")) || user.role === "فروشنده" || user.role === "پشتیبان";
    return true;
  };
  const query = searchTerm.trim();
  const filteredUsers = users.filter((user) => {
    const searchable = `${user.name} ${user.phone} ${user.email} ${user.role} ${user.status} ${user.tags.join(" ")}`;
    return matchesWorkspace(user, workspace) && (!query || searchable.includes(query));
  });
  const totalOrders = users.reduce((sum, user) => sum + user.orders, 0);
  const totalTickets = users.reduce((sum, user) => sum + user.tickets, 0);
  const vipCount = users.filter((user) => user.level === "VIP").length;
  const inactiveCount = users.filter((user) => user.status !== "فعال").length;

  const updateSelectedUser = (patch: Partial<AdminUser>, feedback: string) => {
    setUsers((current) => current.map((user) => (user.id === selected.id ? { ...user, ...patch } : user)));
    setMessage(feedback);
  };

  const createUser = () => {
    const id = `new-user-${users.length + 1}`;
    const draft: AdminUser = {
      id,
      name: "کاربر جدید",
      phone: "09xx xxx xxxx",
      email: "new.user@example.com",
      role: "مشتری",
      status: "در انتظار تکمیل",
      level: "استاندارد",
      joined: "امروز",
      lastSeen: "همین حالا",
      orders: 0,
      totalSpent: "۰",
      courses: 0,
      products: 0,
      tickets: 0,
      risk: "کم",
      note: "پروفایل تازه ساخته شده و آماده تکمیل اطلاعات است.",
      permissions: ["خرید محصول"],
      tags: ["جدید"],
      recentActivity: [{ title: "ساخت پروفایل کاربر", meta: "همین حالا" }],
    };
    setUsers((current) => [draft, ...current]);
    setSelectedId(id);
    setMessage("پروفایل کاربر جدید ساخته شد و آماده تکمیل اطلاعات است.");
  };

  const toggleRole = (role: string) => {
    setEnabledRoles((current) => {
      const exists = current.includes(role);
      setMessage(exists ? `نقش «${role}» از نقش‌های فعال پنل حذف شد.` : `نقش «${role}» به نقش‌های فعال پنل اضافه شد.`);
      return exists ? current.filter((item) => item !== role) : [...current, role];
    });
  };

  const togglePermission = (permission: string) => {
    const exists = selected.permissions.includes(permission);
    const permissions = exists ? selected.permissions.filter((item) => item !== permission) : [...selected.permissions, permission];
    updateSelectedUser(permissions.length ? { permissions } : { permissions: [permission] }, exists ? `دسترسی «${permission}» از ${selected.name} برداشته شد.` : `دسترسی «${permission}» برای ${selected.name} فعال شد.`);
  };

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <SectionHeader
          title="مرکز مدیریت کاربران سایت"
          text="کاربران سایت اصلی، خریداران سمپل پک، هنرجوهای دوره رایگان، فروشنده‌ها و تیم پشتیبانی از همین صفحه کنترل می‌شوند."
          action={<PrimaryButton icon={Users} onClick={createUser}>کاربر جدید</PrimaryButton>}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
          {userWorkspaces.map((item) => {
            const Icon = item.icon;
            const active = workspace === item.id;
            const count = users.filter((user) => matchesWorkspace(user, item.id)).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setWorkspace(item.id);
                  setMessage(`نمای «${item.label}» فعال شد.`);
                }}
                className={`rounded-[22px] border p-4 text-right transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
              >
                <Icon className={`mb-5 size-5 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                <strong className="block text-xs font-black">{item.label}</strong>
                <span className={`mt-2 block text-[10px] font-bold ${active ? "text-[#06211f]/70" : "text-[var(--admin-muted)]"}`}>{count.toLocaleString("fa-IR")} کاربر</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {[
            ["کل سفارش‌ها", totalOrders.toLocaleString("fa-IR"), Package],
            ["تیکت‌های مرتبط", totalTickets.toLocaleString("fa-IR"), Headphones],
            ["کاربران VIP", vipCount.toLocaleString("fa-IR"), Sparkles],
            ["نیازمند پیگیری", inactiveCount.toLocaleString("fa-IR"), Bell],
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Icon className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-xl font-black text-[var(--admin-ink)]">{value as string}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{label as string}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{message}</p>
      </Surface>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
        <Surface className="p-5">
          <SectionHeader
            title="لیست کاربران و جستجوی سریع"
            text="روی هر کاربر بزن تا پروفایل، خریدها، دوره‌ها، تیکت‌ها و دسترسی‌های همان کاربر باز شود."
            action={
              <div className="relative min-w-0 sm:min-w-[260px]">
                <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--admin-muted)]" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="جستجو نام، موبایل، نقش..."
                  className="h-11 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] pr-11 pl-4 text-xs font-bold text-[var(--admin-ink)] outline-none transition placeholder:text-[var(--admin-muted)] focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]"
                />
              </div>
            }
          />
          <div className="space-y-2">
            {filteredUsers.map((user) => {
              const active = selected.id === user.id;
              return (
                <article key={user.id} className={`rounded-[22px] border p-3 transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(user.id);
                      setMessage(`پروفایل ${user.name} برای مدیریت انتخاب شد.`);
                    }}
                    className="flex w-full items-start gap-3 text-right"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--admin-panel)] text-sm font-black text-[var(--admin-accent)]">
                      {user.name.slice(0, 1)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="truncate text-sm font-black text-[var(--admin-ink)]">{user.name}</strong>
                        <Status>{user.status}</Status>
                      </span>
                      <span className="mt-1 block text-[10px] font-bold leading-6 text-[var(--admin-muted)]">{user.note}</span>
                      <span className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-black text-[var(--admin-muted)]">
                        <span>{user.role}</span>
                        <span>{user.level}</span>
                        <span>{user.orders.toLocaleString("fa-IR")} سفارش</span>
                        <span>{user.courses.toLocaleString("fa-IR")} دوره</span>
                        <span>{user.tickets.toLocaleString("fa-IR")} تیکت</span>
                      </span>
                    </span>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                    <Link href="/account" className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">مشاهده حساب <ArrowLeft className="size-3.5" /></Link>
                    <button type="button" onClick={() => setMessage(`پیام مستقیم برای ${user.name} آماده ارسال شد.`)} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">پیام <MessageSquareText className="size-3.5" /></button>
                    <button type="button" onClick={() => setMessage(`گزارش فعالیت ${user.name} آماده شد.`)} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-accent)] px-3 text-[10px] font-black text-[#06211f]">گزارش <BarChart3 className="size-3.5" /></button>
                  </div>
                </article>
              );
            })}
            {!filteredUsers.length && (
              <div className="rounded-[22px] border border-dashed border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-6 text-center text-xs font-bold text-[var(--admin-muted)]">
                کاربری با این فیلتر پیدا نشد.
              </div>
            )}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="پروفایل و وضعیت کاربر" text={`در حال مدیریت: ${selected.name}`} />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              نام کامل
              <input value={selected.name} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              شماره موبایل
              <input value={selected.phone} readOnly dir="ltr" className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-left text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              ایمیل
              <input value={selected.email} readOnly dir="ltr" className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-left text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              آخرین حضور
              <input value={selected.lastSeen} readOnly className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none" />
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <CircleDollarSign className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.totalSpent}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">ارزش خرید</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <BookOpen className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.courses.toLocaleString("fa-IR")}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">دوره</span>
            </div>
            <div className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <ShieldCheck className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{selected.risk}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">ریسک حساب</span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Save} onClick={() => setMessage(`پروفایل ${selected.name} ذخیره شد.`)}>ذخیره</PrimaryButton>
            <GhostButton icon={KeyRound} onClick={() => setMessage(`لینک بازیابی رمز برای ${selected.name} آماده شد.`)}>بازیابی رمز</GhostButton>
            <GhostButton
              icon={ShieldCheck}
              onClick={() => {
                const nextStatus = selected.status === "فعال" ? "محدود شده" : "فعال";
                updateSelectedUser({ status: nextStatus }, `وضعیت ${selected.name} به «${nextStatus}» تغییر کرد.`);
              }}
            >
              تغییر وضعیت
            </GhostButton>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.92fr_1.08fr]">
        <Surface className="p-5">
          <SectionHeader title="نقش‌ها و سطح دسترسی" text="نقش‌های قابل استفاده در سایت و پنل را فعال یا غیرفعال کن." />
          <div className="grid gap-2 sm:grid-cols-2">
            {userRoles.map((role) => {
              const active = enabledRoles.includes(role);
              return (
                <button key={role} type="button" onClick={() => toggleRole(role)} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-right text-xs font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                  <span className="inline-flex items-center gap-2">
                    <Users className={`size-4 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                    {role}
                  </span>
                  <span>{active ? "فعال" : "خاموش"}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 rounded-[22px] bg-[var(--admin-panel-2)] p-4">
            <strong className="text-sm font-black text-[var(--admin-ink)]">تغییر نقش کاربر انتخابی</strong>
            <div className="mt-3 flex flex-wrap gap-2">
              {userRoles.map((role) => (
                <button key={role} type="button" onClick={() => updateSelectedUser({ role }, `نقش ${selected.name} به «${role}» تغییر کرد.`)} className={`rounded-full px-3 py-2 text-[10px] font-black transition ${selected.role === role ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel)] text-[var(--admin-muted)] hover:text-[var(--admin-accent)]"}`}>
                  {role}
                </button>
              ))}
            </div>
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="دسترسی‌های کاربر انتخابی" text="دسترسی‌هایی که مستقیماً روی خرید، دانلود، دوره، پشتیبانی و مدیریت فروش اثر دارند." />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {userPermissionModules.map((permission) => {
              const active = selected.permissions.includes(permission);
              return (
                <button key={permission} type="button" onClick={() => togglePermission(permission)} className={`rounded-[22px] border p-4 text-right transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <KeyRound className="mb-5 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{permission}</strong>
                  <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{active ? "فعال برای کاربر" : "غیرفعال"}</span>
                </button>
              );
            })}
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.04fr_.96fr]">
        <Surface className="p-5">
          <SectionHeader title="فعالیت‌های اخیر و مسیر کاربر" text="برای پیگیری رفتار واقعی کاربر در سایت، خریدها، دوره‌ها و تیکت‌ها." />
          <div className="space-y-2">
            {selected.recentActivity.map((activity, index) => (
              <button key={`${activity.title}-${index}`} type="button" onClick={() => setMessage(`جزئیات «${activity.title}» برای ${selected.name} باز شد.`)} className="flex w-full items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-[var(--admin-panel)] text-[10px] font-black text-[var(--admin-accent)]">{(index + 1).toLocaleString("fa-IR")}</span>
                  <span>
                    <strong className="block text-xs font-black text-[var(--admin-ink)]">{activity.title}</strong>
                    <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{activity.meta}</span>
                  </span>
                </span>
                <ChevronLeft className="size-4 text-[var(--admin-muted)]" />
              </button>
            ))}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="برچسب‌ها، سگمنت و عملیات سریع" text="برای کمپین پیامکی، ایمیلی، پیگیری دانلود، VIP و برگشت کاربران." />
          <div className="flex flex-wrap gap-2">
            {selected.tags.map((tag) => (
              <button key={tag} type="button" onClick={() => setMessage(`سگمنت «${tag}» برای کمپین انتخاب شد.`)} className="rounded-full bg-[var(--admin-panel-2)] px-3 py-2 text-[10px] font-black text-[var(--admin-muted)] transition hover:bg-[var(--admin-accent)] hover:text-[#06211f]">
                #{tag}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              ["ارسال پیامک", MessageSquareText],
              ["کمپین بازگشت", Sparkles],
              ["بررسی سفارش‌ها", Package],
              ["باز کردن تیکت‌ها", Headphones],
              ["خروجی کاربران", Upload],
              ["ثبت یادداشت", FileText],
            ].map(([label, Icon]) => (
              <button key={label as string} type="button" onClick={() => setMessage(`عملیات «${label as string}» برای ${selected.name} آماده شد.`)} className="flex items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right text-xs font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-[var(--admin-accent)]" />
                  {label as string}
                </span>
                <ArrowLeft className="size-4" />
              </button>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [workspace, setWorkspace] = useState<SettingsWorkspace>("general");
  const [siteForm, setSiteForm] = useState({
    siteTitle: "موآد استودیو",
    domain: "moad.studio",
    supportEmail: "support@moad.studio",
    phone: "۰۲۱ ۹۱۰۰ ۴۸۸۲",
    metaTitle: "موآد استودیو | سمپل پک و آموزش تولید موسیقی",
    metaDescription: "خانه صداهای تازه، دوره‌های رایگان و ابزارهای کاربردی برای تولید موسیقی مدرن.",
    defaultTheme: "همگام با سیستم",
    currency: "تومان",
    payment: "زیبال",
  });
  const [enabledThemeModules, setEnabledThemeModules] = useState(themeModules);
  const [enabledMenus, setEnabledMenus] = useState(navigationSettings.map((item) => item.label));
  const [enabledSeo, setEnabledSeo] = useState(seoChecklist.slice(0, 5));
  const [enabledMedia, setEnabledMedia] = useState(mediaPolicies.slice(0, 4));
  const [enabledCommerce, setEnabledCommerce] = useState(commerceModules.slice(0, 5));
  const [enabledIntegrations, setEnabledIntegrations] = useState(integrationModules.slice(0, 5));
  const [message, setMessage] = useState("تنظیمات سایت آماده مدیریت دامنه، قالب، منوها، سئو، رسانه، فروش و اتصال‌های اصلی است.");

  const updateField = (key: keyof typeof siteForm, value: string) => {
    setSiteForm((current) => ({ ...current, [key]: value }));
    setMessage("تغییرات فرم تنظیمات ثبت شد؛ برای اعمال نهایی روی ذخیره تنظیمات بزن.");
  };

  const toggleList = (item: string, list: string[], setter: (value: string[]) => void, activeText: string) => {
    const exists = list.includes(item);
    setter(exists ? list.filter((entry) => entry !== item) : [...list, item]);
    setMessage(exists ? `«${item}» از ${activeText} غیرفعال شد.` : `«${item}» در ${activeText} فعال شد.`);
  };

  const workspaceCount = (id: SettingsWorkspace) => {
    if (id === "general") return 8;
    if (id === "theme") return enabledThemeModules.length;
    if (id === "navigation") return enabledMenus.length;
    if (id === "seo") return enabledSeo.length;
    if (id === "media") return enabledMedia.length;
    if (id === "commerce") return enabledCommerce.length;
    return enabledIntegrations.length;
  };

  const settingHighlights: Array<{ label: string; value: string; icon: IconType }> = [
    { label: "دامنه نهایی", value: siteForm.domain, icon: Compass },
    { label: "ماژول قالب", value: enabledThemeModules.length.toLocaleString("fa-IR"), icon: LayoutDashboard },
    { label: "لینک منو", value: enabledMenus.length.toLocaleString("fa-IR"), icon: FolderTree },
    { label: "اتصال فعال", value: enabledIntegrations.length.toLocaleString("fa-IR"), icon: ShieldCheck },
  ];

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <SectionHeader
          title="مرکز تنظیمات سایت"
          text="تنظیمات اصلی موآد استودیو، قالب، منوها، سئو، رسانه‌ها، فروش، نمادها و اتصال‌های مهم سایت از همین‌جا کنترل می‌شود."
          action={<PrimaryButton icon={Save} onClick={() => setMessage("همه تنظیمات سایت ذخیره شد و آماده انتشار روی moad.studio است.")}>ذخیره تنظیمات</PrimaryButton>}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
          {settingsWorkspaces.map((item) => {
            const Icon = item.icon;
            const active = workspace === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setWorkspace(item.id);
                  setMessage(`بخش «${item.label}» برای مدیریت انتخاب شد.`);
                }}
                className={`rounded-[22px] border p-4 text-right transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
              >
                <Icon className={`mb-5 size-5 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                <strong className="block text-xs font-black">{item.label}</strong>
                <span className={`mt-2 block text-[10px] font-bold ${active ? "text-[#06211f]/70" : "text-[var(--admin-muted)]"}`}>{workspaceCount(item.id).toLocaleString("fa-IR")} مورد</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {settingHighlights.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Icon className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-lg font-black text-[var(--admin-ink)]">{value}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{message}</p>
      </Surface>

      <div className="grid gap-4 xl:grid-cols-[.95fr_1.05fr]">
        <Surface className="p-5">
          <SectionHeader title="اطلاعات عمومی و دامنه" text="اطلاعات پایه‌ای که در هدر، فوتر، سئو و پیام‌های سیستم استفاده می‌شود." />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { key: "siteTitle", label: "عنوان سایت", dir: "rtl" },
              { key: "domain", label: "دامنه نهایی", dir: "ltr" },
              { key: "supportEmail", label: "ایمیل پشتیبانی", dir: "ltr" },
              { key: "phone", label: "شماره تماس", dir: "ltr" },
            ].map((field) => (
              <label key={field.key} className="block text-[11px] font-black text-[var(--admin-muted)]">
                {field.label}
                <input
                  value={siteForm[field.key as keyof typeof siteForm]}
                  onChange={(event) => updateField(field.key as keyof typeof siteForm, event.target.value)}
                  dir={field.dir}
                  className={`mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)] ${field.dir === "ltr" ? "text-left" : "text-right"}`}
                />
              </label>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Save} onClick={() => setMessage("اطلاعات عمومی سایت ذخیره شد.")}>ذخیره</PrimaryButton>
            <GhostButton icon={Compass} onClick={() => setMessage(`دامنه ${siteForm.domain} بررسی شد و آماده اتصال است.`)}>بررسی دامنه</GhostButton>
            <GhostButton icon={Sparkles} onClick={() => setMessage("کش تنظیمات عمومی پاکسازی شد.")}>پاکسازی کش</GhostButton>
          </div>
        </Surface>

        <Surface className="overflow-hidden p-5">
          <SectionHeader title="پیش‌نمایش تنظیمات سایت" text="یک نمای سریع از اثر تنظیمات روی سایت اصلی." />
          <div className="relative overflow-hidden rounded-[28px] bg-[#0d1514] p-5 text-white">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-[var(--admin-accent)] text-[#06211f]">
                  <AudioWaveform className="size-6" />
                </span>
                <div>
                  <strong className="block text-base font-black">{siteForm.siteTitle}</strong>
                  <span className="text-[10px] font-bold text-white/55">{siteForm.domain}</span>
                </div>
              </div>
              <Status>پایدار</Status>
            </div>
            <div className="relative mt-8 max-w-xl">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black text-[var(--admin-accent)]">قالب سایت اصلی</span>
              <h4 className="mt-4 text-2xl font-black leading-10">تنظیمات سایت با هویت بصری موآد هماهنگ است.</h4>
              <p className="mt-3 text-xs leading-7 text-white/55">{siteForm.metaDescription}</p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-2">
              <button type="button" onClick={() => setMessage("پیش‌نمایش قالب سایت اصلی باز شد.")} className="rounded-2xl bg-[var(--admin-accent)] px-4 py-3 text-xs font-black text-[#06211f]">پیش‌نمایش سایت</button>
              <button type="button" onClick={() => setMessage("تنظیمات رنگ و حالت شب/روز آماده ویرایش شد.")} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black text-white">حالت شب/روز</button>
            </div>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
        <Surface className="p-5">
          <SectionHeader title="منوها و صفحات سایت" text="لینک‌های اصلی هدر، موبایل و فوتر را فعال، غیرفعال یا بررسی کن." />
          <div className="space-y-2">
            {navigationSettings.map((item) => {
              const active = enabledMenus.includes(item.label);
              return (
                <article key={item.href} className={`rounded-2xl border px-4 py-3 transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)]"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button type="button" onClick={() => toggleList(item.label, enabledMenus, setEnabledMenus, "منوی سایت")} className="inline-flex items-center gap-3 text-right">
                      <FolderTree className="size-5 text-[var(--admin-accent)]" />
                      <span>
                        <strong className="block text-xs font-black text-[var(--admin-ink)]">{item.label}</strong>
                        <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{item.area}</span>
                      </span>
                    </button>
                    <div className="flex items-center gap-2">
                      <Status>{active ? "فعال" : "خاموش"}</Status>
                      <Link href={item.href} className="grid size-9 place-items-center rounded-xl bg-[var(--admin-panel)] text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]" aria-label={`مشاهده ${item.label}`}>
                        <ArrowLeft className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <button type="button" onClick={() => setMessage("آیتم جدید منو در حالت پیش‌نویس ساخته شد.")} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-panel-2)] px-4 text-xs font-black text-[var(--admin-muted)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]">
            <Plus className="size-4" /> افزودن آیتم منو
          </button>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="قالب و بخش‌های صفحه اصلی" text="ماژول‌های بصری سایت اصلی، هدر، فوتر و منوی موبایل." />
          <div className="grid gap-3 sm:grid-cols-2">
            {themeModules.map((module) => {
              const active = enabledThemeModules.includes(module);
              return (
                <button key={module} type="button" onClick={() => toggleList(module, enabledThemeModules, setEnabledThemeModules, "قالب سایت")} className={`rounded-[22px] border p-4 text-right transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <LayoutDashboard className="mb-5 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{module}</strong>
                  <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{active ? "نمایش در سایت" : "مخفی"}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <GhostButton icon={Moon} onClick={() => setMessage("حالت تاریک سایت به عنوان پیش‌فرض تست شد.")}>تست تم شب</GhostButton>
            <GhostButton icon={Sun} onClick={() => setMessage("حالت روشن سایت به عنوان پیش‌فرض تست شد.")}>تست تم روز</GhostButton>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.92fr_1.08fr]">
        <Surface className="p-5">
          <SectionHeader title="سئو عمومی و متا" text="تنظیمات سئو برای صفحه اصلی، محصولات، دوره‌ها و مجله." />
          <div className="grid gap-3">
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              عنوان متا
              <input value={siteForm.metaTitle} onChange={(event) => updateField("metaTitle", event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              توضیح متا
              <textarea value={siteForm.metaDescription} onChange={(event) => updateField("metaDescription", event.target.value)} rows={4} className="mt-2 w-full resize-none rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold leading-7 text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]" />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {seoChecklist.map((item) => {
              const active = enabledSeo.includes(item);
              return (
                <button key={item} type="button" onClick={() => toggleList(item, enabledSeo, setEnabledSeo, "چک‌لیست سئو")} className={`rounded-full px-3 py-2 text-[10px] font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                  {item}
                </button>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="رسانه‌ها و فایل‌ها" text="تصویر، ویدئو، فایل دانلودی و دموهای صوتی باید سبک، امن و قابل مدیریت باشند." />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {mediaPolicies.map((item) => {
              const active = enabledMedia.includes(item);
              return (
                <button key={item} type="button" onClick={() => toggleList(item, enabledMedia, setEnabledMedia, "سیاست رسانه")} className={`rounded-[22px] border p-4 text-right transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <ImageIcon className="mb-5 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{item}</strong>
                  <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{active ? "فعال" : "غیرفعال"}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Upload} onClick={() => setMessage("پنجره آپلود رسانه برای بنر، ویدئو و فایل‌ها آماده شد.")}>آپلود رسانه</PrimaryButton>
            <GhostButton icon={ImageIcon} onClick={() => setMessage("تصاویر بدون استفاده برای پاکسازی بررسی شدند.")}>پاکسازی</GhostButton>
            <GhostButton icon={AudioWaveform} onClick={() => setMessage("دموهای صوتی محصولات اسکن و بهینه‌سازی شدند.")}>اسکن صوت</GhostButton>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Surface className="p-5">
          <SectionHeader title="فروش، درگاه و اعتماد" text="تنظیمات حیاتی فروشگاه، پرداخت، اینماد، دانلود امن و فاکتور." />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              واحد پول
              <input value={siteForm.currency} onChange={(event) => updateField("currency", event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]" />
            </label>
            <label className="block text-[11px] font-black text-[var(--admin-muted)]">
              درگاه پرداخت
              <input value={siteForm.payment} onChange={(event) => updateField("payment", event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]" />
            </label>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {commerceModules.map((item) => {
              const active = enabledCommerce.includes(item);
              return (
                <button key={item} type="button" onClick={() => toggleList(item, enabledCommerce, setEnabledCommerce, "فروشگاه")} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-right text-xs font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                  <span className="inline-flex items-center gap-2">
                    <CircleDollarSign className={`size-4 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                    {item}
                  </span>
                  <span>{active ? "فعال" : "خاموش"}</span>
                </button>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="اتصال‌ها و عملیات سیستمی" text="سرویس‌هایی که سایت را به پیامک، ایمیل، آمار، SpotPlayer و نسخه پشتیبان وصل می‌کنند." />
          <div className="grid gap-3 sm:grid-cols-2">
            {integrationModules.map((item) => {
              const active = enabledIntegrations.includes(item);
              return (
                <button key={item} type="button" onClick={() => toggleList(item, enabledIntegrations, setEnabledIntegrations, "اتصال‌های سایت")} className={`rounded-[22px] border p-4 text-right transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <ShieldCheck className="mb-5 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{item}</strong>
                  <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{active ? "متصل" : "نیازمند اتصال"}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <GhostButton icon={ShieldCheck} onClick={() => setMessage("سلامت اتصال‌های سایت بررسی شد.")}>تست اتصال</GhostButton>
            <GhostButton icon={Upload} onClick={() => setMessage("نسخه پشتیبان تنظیمات ساخته شد.")}>بکاپ</GhostButton>
            <PrimaryButton icon={Sparkles} onClick={() => setMessage("تنظیمات برای انتشار نهایی آماده شد.")}>آماده انتشار</PrimaryButton>
          </div>
        </Surface>
      </div>
    </div>
  );
}

function CommunicationPanel() {
  const [workspace, setWorkspace] = useState<CommunicationWorkspace>("all");
  const [conversations, setConversations] = useState(adminConversations);
  const [selectedId, setSelectedId] = useState(adminConversations[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [reply, setReply] = useState("سلام، موضوع شما بررسی شد و نتیجه همین‌جا اعلام می‌شود.");
  const [enabledAutomations, setEnabledAutomations] = useState(communicationAutomations.slice(0, 6));
  const [enabledChannels, setEnabledChannels] = useState(communicationChannels.slice(0, 5));
  const [connectionForm, setConnectionForm] = useState({
    smsApi: "SMS-API-KEY",
    smsLine: "1000-04882",
    senderEmail: "support@moad.studio",
    supportNumber: "0912 000 4882",
  });
  const [message, setMessage] = useState("مرکز ارتباطات آماده مدیریت تیکت‌ها، پیامک‌ها، ایمیل‌ها، چت سایت، مشاوره‌ها و اتوماسیون‌های ارتباطی است.");

  const selected = conversations.find((item) => item.id === selectedId) ?? conversations[0];
  const matchesWorkspace = (conversation: AdminConversation, target: CommunicationWorkspace) => {
    if (target === "all") return true;
    if (target === "tickets") return conversation.channel === "تیکت" || conversation.channel === "چت سایت";
    if (target === "sms") return conversation.channel === "پیامک";
    if (target === "email") return conversation.channel === "ایمیل";
    if (target === "consultation") return conversation.channel === "مشاوره";
    if (target === "urgent") return conversation.priority === "فوری";
    if (target === "automation") return conversation.tags.some((tag) => ["پیامک", "OTP", "پرداخت موفق", "SpotPlayer"].includes(tag));
    return true;
  };
  const query = searchTerm.trim();
  const filteredConversations = conversations.filter((conversation) => {
    const searchable = `${conversation.title} ${conversation.user} ${conversation.channel} ${conversation.status} ${conversation.tags.join(" ")}`;
    return matchesWorkspace(conversation, workspace) && (!query || searchable.includes(query));
  });
  const openCount = conversations.filter((item) => item.status !== "بسته").length;
  const urgentCount = conversations.filter((item) => item.priority === "فوری").length;
  const todayCount = conversations.filter((item) => item.created.includes("دقیقه") || item.created.includes("امروز")).length;
  const totalMessages = conversations.reduce((sum, item) => sum + item.messages, 0);

  const updateConversation = (patch: Partial<AdminConversation>, feedback: string) => {
    setConversations((current) => current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)));
    setMessage(feedback);
  };

  const toggleList = (item: string, list: string[], setter: (value: string[]) => void, area: string) => {
    const exists = list.includes(item);
    setter(exists ? list.filter((entry) => entry !== item) : [...list, item]);
    setMessage(exists ? `«${item}» از ${area} غیرفعال شد.` : `«${item}» در ${area} فعال شد.`);
  };

  const createConversation = () => {
    const id = `new-conversation-${conversations.length + 1}`;
    const draft: AdminConversation = {
      id,
      title: "گفتگوی جدید کاربر",
      user: "کاربر جدید",
      channel: "تیکت",
      status: "باز",
      priority: "متوسط",
      owner: "پشتیبانی",
      created: "همین حالا",
      source: "پنل ادمین",
      summary: "گفتگوی تازه ساخته شده و آماده تکمیل اطلاعات و پاسخگویی است.",
      tags: ["جدید", "پشتیبانی"],
      messages: 1,
      href: "/contact",
    };
    setConversations((current) => [draft, ...current]);
    setSelectedId(id);
    setMessage("گفتگوی جدید ساخته شد و در صف پشتیبانی قرار گرفت.");
  };

  const communicationHighlights: Array<{ label: string; value: string; icon: IconType }> = [
    { label: "گفتگوی باز", value: openCount.toLocaleString("fa-IR"), icon: Headphones },
    { label: "فوری", value: urgentCount.toLocaleString("fa-IR"), icon: Bell },
    { label: "امروز", value: todayCount.toLocaleString("fa-IR"), icon: CalendarDays },
    { label: "کل پیام‌ها", value: totalMessages.toLocaleString("fa-IR"), icon: MessageSquareText },
  ];

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <SectionHeader
          title="مرکز ارتباطات و پشتیبانی"
          text="تیکت‌ها، پیامک ورود و سفارش، ایمیل‌ها، چت سایت، درخواست‌های مشاوره و پیگیری کاربران در یک صفحه مدیریت می‌شوند."
          action={<PrimaryButton icon={MessageSquareText} onClick={createConversation}>گفتگوی جدید</PrimaryButton>}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
          {communicationWorkspaces.map((item) => {
            const Icon = item.icon;
            const active = workspace === item.id;
            const count = conversations.filter((conversation) => matchesWorkspace(conversation, item.id)).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setWorkspace(item.id);
                  setMessage(`نمای «${item.label}» فعال شد.`);
                }}
                className={`rounded-[22px] border p-4 text-right transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
              >
                <Icon className={`mb-5 size-5 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                <strong className="block text-xs font-black">{item.label}</strong>
                <span className={`mt-2 block text-[10px] font-bold ${active ? "text-[#06211f]/70" : "text-[var(--admin-muted)]"}`}>{count.toLocaleString("fa-IR")} مورد</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {communicationHighlights.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
              <Icon className="mb-4 size-5 text-[var(--admin-accent)]" />
              <strong className="block text-xl font-black text-[var(--admin-ink)]">{value}</strong>
              <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{message}</p>
      </Surface>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
        <Surface className="p-5">
          <SectionHeader
            title="صندوق گفتگوها و تیکت‌ها"
            text="هر گفتگو به صفحه اصلی مرتبط است؛ محصول، دوره، مشاوره، ورود یا تماس با ما."
            action={
              <div className="relative min-w-0 sm:min-w-[260px]">
                <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--admin-muted)]" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="جستجو پیام، کاربر، برچسب..."
                  className="h-11 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] pr-11 pl-4 text-xs font-bold text-[var(--admin-ink)] outline-none transition placeholder:text-[var(--admin-muted)] focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]"
                />
              </div>
            }
          />
          <div className="space-y-2">
            {filteredConversations.map((conversation) => {
              const active = selected.id === conversation.id;
              return (
                <article key={conversation.id} className={`rounded-[22px] border p-3 transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(conversation.id);
                      setMessage(`گفتگوی «${conversation.title}» انتخاب شد.`);
                    }}
                    className="flex w-full items-start gap-3 text-right"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--admin-panel)] text-[var(--admin-accent)]">
                      <Headphones className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="truncate text-sm font-black text-[var(--admin-ink)]">{conversation.title}</strong>
                        <Status>{conversation.status}</Status>
                      </span>
                      <span className="mt-1 block text-[10px] font-bold leading-6 text-[var(--admin-muted)]">{conversation.summary}</span>
                      <span className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-black text-[var(--admin-muted)]">
                        <span>{conversation.user}</span>
                        <span>{conversation.channel}</span>
                        <span>{conversation.priority}</span>
                        <span>{conversation.messages.toLocaleString("fa-IR")} پیام</span>
                        <span>{conversation.created}</span>
                      </span>
                    </span>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                    <Link href={conversation.href} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">صفحه مرتبط <ArrowLeft className="size-3.5" /></Link>
                    <button type="button" onClick={() => updateConversation({ owner: "من" }, `گفتگوی «${conversation.title}» به شما واگذار شد.`)} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-panel)] px-3 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">واگذاری <Users className="size-3.5" /></button>
                    <button type="button" onClick={() => updateConversation({ status: "بسته", priority: "کم" }, `گفتگوی «${conversation.title}» بسته شد.`)} className="inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--admin-accent)] px-3 text-[10px] font-black text-[#06211f]">بستن <ShieldCheck className="size-3.5" /></button>
                  </div>
                </article>
              );
            })}
            {!filteredConversations.length && (
              <div className="rounded-[22px] border border-dashed border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-6 text-center text-xs font-bold text-[var(--admin-muted)]">
                گفتگویی با این فیلتر پیدا نشد.
              </div>
            )}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="جزئیات گفتگو و پاسخ" text={`در حال مدیریت: ${selected.title}`} />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["کاربر", selected.user],
              ["کانال", selected.channel],
              ["مسئول", selected.owner],
              ["منبع", selected.source],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
                <span className="text-[10px] font-black text-[var(--admin-muted)]">{label}</span>
                <strong className="mt-2 block text-sm font-black text-[var(--admin-ink)]">{value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.tags.map((tag) => (
              <button key={tag} type="button" onClick={() => setMessage(`برچسب «${tag}» برای فیلتر ارتباطات انتخاب شد.`)} className="rounded-full bg-[var(--admin-panel-2)] px-3 py-2 text-[10px] font-black text-[var(--admin-muted)] transition hover:bg-[var(--admin-accent)] hover:text-[#06211f]">
                #{tag}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-[11px] font-black text-[var(--admin-muted)]">
            متن پاسخ
            <textarea
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              rows={5}
              className="mt-2 w-full resize-none rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-sm font-bold leading-7 text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]"
            />
          </label>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={MessageSquareText} onClick={() => updateConversation({ messages: selected.messages + 1, status: "پاسخ داده شد" }, `پاسخ برای ${selected.user} ارسال شد.`)}>ارسال پاسخ</PrimaryButton>
            <GhostButton icon={CalendarDays} onClick={() => setMessage(`پیگیری گفتگوی ${selected.user} برای فردا زمان‌بندی شد.`)}>پیگیری</GhostButton>
            <GhostButton icon={Bell} onClick={() => updateConversation({ priority: selected.priority === "فوری" ? "متوسط" : "فوری" }, `اولویت گفتگو تغییر کرد.`)}>اولویت</GhostButton>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.92fr_1.08fr]">
        <Surface className="p-5">
          <SectionHeader title="قالب‌های پاسخ سریع" text="برای تیکت‌های پرتکرار، پیامک ورود، مشاوره و لایسنس دوره‌ها." />
          <div className="space-y-2">
            {communicationTemplates.map((template) => (
              <article key={template.title} className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <strong className="block text-sm font-black text-[var(--admin-ink)]">{template.title}</strong>
                    <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{template.channel}</span>
                  </div>
                  <Status>{template.channel}</Status>
                </div>
                <p className="mt-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{template.text}</p>
                <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                  <button type="button" onClick={() => {
                    setReply(template.text);
                    setMessage(`قالب «${template.title}» داخل پاسخ قرار گرفت.`);
                  }} className="rounded-xl bg-[var(--admin-accent)] px-3 py-2 text-[10px] font-black text-[#06211f]">استفاده از قالب</button>
                  <button type="button" onClick={() => setMessage(`قالب «${template.title}» برای ویرایش باز شد.`)} className="rounded-xl bg-[var(--admin-panel)] px-3 py-2 text-[10px] font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">ویرایش</button>
                </div>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="اتوماسیون‌های ارتباطی" text="پیام‌هایی که در لحظه‌های مهم سایت، خودکار برای کاربر یا مدیر ارسال می‌شوند." />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {communicationAutomations.map((automation) => {
              const active = enabledAutomations.includes(automation);
              return (
                <button key={automation} type="button" onClick={() => toggleList(automation, enabledAutomations, setEnabledAutomations, "اتوماسیون ارتباطی")} className={`rounded-[22px] border p-4 text-right transition ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] hover:border-[var(--admin-accent)]"}`}>
                  <Sparkles className="mb-5 size-5 text-[var(--admin-accent)]" />
                  <strong className="block text-xs font-black text-[var(--admin-ink)]">{automation}</strong>
                  <span className="mt-2 block text-[10px] font-bold text-[var(--admin-muted)]">{active ? "فعال" : "خاموش"}</span>
                </button>
              );
            })}
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Surface className="p-5">
          <SectionHeader title="کانال‌ها و اتصال‌ها" text="تنظیمات پیامک، ایمیل، شماره پشتیبانی، چت سایت، واتس‌اپ و اعلان پنل." />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { key: "smsApi", label: "API پیامک", dir: "ltr" },
              { key: "smsLine", label: "شماره خط پیامک", dir: "ltr" },
              { key: "senderEmail", label: "ایمیل ارسال", dir: "ltr" },
              { key: "supportNumber", label: "شماره پشتیبانی", dir: "ltr" },
            ].map((field) => (
              <label key={field.key} className="block text-[11px] font-black text-[var(--admin-muted)]">
                {field.label}
                <input
                  value={connectionForm[field.key as keyof typeof connectionForm]}
                  onChange={(event) => {
                    setConnectionForm((current) => ({ ...current, [field.key]: event.target.value }));
                    setMessage("تنظیمات اتصال ارتباطی تغییر کرد؛ برای اعمال نهایی ذخیره کن.");
                  }}
                  dir={field.dir}
                  className="mt-2 w-full rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-left text-sm font-bold text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[rgba(33,218,204,.16)]"
                />
              </label>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {communicationChannels.map((channel) => {
              const active = enabledChannels.includes(channel);
              return (
                <button key={channel} type="button" onClick={() => toggleList(channel, enabledChannels, setEnabledChannels, "کانال ارتباطی")} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-right text-xs font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                  <span className="inline-flex items-center gap-2">
                    <MessageSquareText className={`size-4 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                    {channel}
                  </span>
                  <span>{active ? "فعال" : "خاموش"}</span>
                </button>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="سلامت سرویس و عملیات سریع" text="برای تست پیامک، ارسال ایمیل آزمایشی، بررسی چت و گزارش رضایت کاربران." />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["تست پیامک ورود", Bell],
              ["ارسال ایمیل تست", FileText],
              ["تست چت سایت", Headphones],
              ["گزارش رضایت", BarChart3],
              ["خروجی گفتگوها", Upload],
              ["پاکسازی صف قدیمی", ShieldCheck],
            ].map(([label, Icon]) => (
              <button key={label as string} type="button" onClick={() => setMessage(`عملیات «${label as string}» با موفقیت اجرا شد.`)} className="flex items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right text-xs font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-[var(--admin-accent)]" />
                  {label as string}
                </span>
                <ArrowLeft className="size-4" />
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Save} onClick={() => setMessage("تنظیمات ارتباطات ذخیره شد.")}>ذخیره</PrimaryButton>
            <GhostButton icon={ShieldCheck} onClick={() => setMessage("سلامت همه کانال‌های ارتباطی بررسی شد.")}>تست همه</GhostButton>
            <GhostButton icon={Sparkles} onClick={() => setMessage("سناریوهای اتوماسیون ارتباطی آماده انتشار شد.")}>انتشار</GhostButton>
          </div>
        </Surface>
      </div>
    </div>
  );
}

function ReportsPanel() {
  const [workspace, setWorkspace] = useState<ReportWorkspace>("overview");
  const [range, setRange] = useState<ReportRange>("month");
  const [selectedMetric, setSelectedMetric] = useState(reportKpis[0].id);
  const [enabledExports, setEnabledExports] = useState(reportExportModules.slice(0, 5));
  const [message, setMessage] = useState("گزارشات آماده بررسی فروش، سفارش‌ها، محصولات، دوره‌ها، کاربران، پشتیبانی و سئوی سایت است.");
  const [modal, setModal] = useState<AdminActionModalData | null>(null);

  const selectedRangeLabel = reportRanges.find((item) => item.id === range)?.label ?? "۳۰ روز";
  const selectedKpi = reportKpis.find((item) => item.id === selectedMetric) ?? reportKpis[0];
  const workspaceTitle = reportWorkspaces.find((item) => item.id === workspace)?.label ?? "نمای کلی";
  const chartTotal = reportRevenueValues.reduce((sum, value) => sum + value, 0);
  const chartAverage = Math.round(chartTotal / reportRevenueValues.length);
  const chartPeak = Math.max(...reportRevenueValues);
  const chartPeakIndex = reportRevenueValues.indexOf(chartPeak);

  const openReportModal = (title: string, text: string, icon: IconType = BarChart3, details?: Array<{ label: string; value: string }>) => {
    setModal({ title, text, icon, details, primaryLabel: "ثبت در گزارش" });
    setMessage(title);
  };

  const toggleExport = (item: string) => {
    const exists = enabledExports.includes(item);
    setEnabledExports((current) => (exists ? current.filter((entry) => entry !== item) : [...current, item]));
    setMessage(exists ? `«${item}» از خروجی گزارش حذف شد.` : `«${item}» به خروجی گزارش اضافه شد.`);
  };

  return (
    <div className="grid gap-4">
      <Surface className="overflow-hidden p-4 sm:p-5">
        <SectionHeader
          title="مرکز گزارشات و تحلیل سایت"
          text="گزارش‌های مدیریتی موآد استودیو برای فروش، محصولات دانلودی، دوره‌های رایگان، کاربران، پشتیبانی، سئو و قیف خرید."
          action={
            <div className="flex flex-wrap gap-2">
              {reportRanges.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRange(item.id);
                    setMessage(`بازه گزارش روی «${item.label}» تنظیم شد.`);
                  }}
                  className={`min-h-11 rounded-2xl px-4 text-xs font-black transition ${range === item.id ? "bg-[var(--admin-accent)] text-[#06211f]" : "border border-[var(--admin-border)] bg-[var(--admin-panel)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          }
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
          {reportWorkspaces.map((item) => {
            const Icon = item.icon;
            const active = workspace === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setWorkspace(item.id);
                  setMessage(`گزارش «${item.label}» برای بازه ${selectedRangeLabel} فعال شد.`);
                }}
                className={`rounded-[22px] border p-4 text-right transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]" : "border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] hover:border-[var(--admin-accent)]"}`}
              >
                <Icon className={`mb-5 size-5 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                <strong className="block text-xs font-black">{item.label}</strong>
                <span className={`mt-2 block text-[10px] font-bold ${active ? "text-[#06211f]/70" : "text-[var(--admin-muted)]"}`}>{item.count}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-xs font-bold leading-7 text-[var(--admin-muted)]">{message}</p>
      </Surface>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {reportKpis.map((item) => {
          const Icon = item.icon;
          const active = selectedMetric === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedMetric(item.id);
                setMessage(`شاخص «${item.label}» برای تحلیل انتخاب شد.`);
              }}
              className={`rounded-[24px] border p-4 text-right shadow-[var(--admin-shadow)] transition hover:-translate-y-0.5 ${active ? "border-[var(--admin-accent)] bg-[var(--admin-soft)]" : "border-[var(--admin-border)] bg-[var(--admin-panel)]"}`}
            >
              <Icon className="mb-5 size-5 text-[var(--admin-accent)]" />
              <span className="text-[10px] font-black text-[var(--admin-muted)]">{item.label}</span>
              <strong className="mt-2 block text-2xl font-black text-[var(--admin-ink)]">{item.value}</strong>
              <span className="mt-2 inline-flex rounded-full bg-[var(--admin-panel-2)] px-3 py-1 text-[10px] font-black text-[var(--admin-accent)]">{item.change} · {item.tone}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
        <Surface className="p-5">
          <SectionHeader
            title={`نمودار عملکرد ${workspaceTitle}`}
            text={`تحلیل شاخص «${selectedKpi.label}» در بازه ${selectedRangeLabel}.`}
            action={
              <div className="flex flex-wrap gap-2">
                <GhostButton icon={Upload} onClick={() => openReportModal(`خروجی نمودار ${workspaceTitle}`, "فایل خروجی نمودار با اعداد، بازه زمانی و شاخص انتخابی آماده می‌شود.", Upload, [{ label: "بازه", value: selectedRangeLabel }, { label: "شاخص", value: selectedKpi.label }, { label: "جمع", value: `${chartTotal.toLocaleString("fa-IR")}M` }])}>خروجی</GhostButton>
                <GhostButton icon={Sparkles} onClick={() => openReportModal(`بروزرسانی گزارش ${workspaceTitle}`, "گزارش با داده‌های تازه فروش، محصول، دوره و کاربران همگام‌سازی می‌شود.", Sparkles, [{ label: "بازه", value: selectedRangeLabel }, { label: "میانگین", value: `${chartAverage.toLocaleString("fa-IR")}M` }, { label: "اوج", value: `${chartPeak.toLocaleString("fa-IR")}M` }])}>بروزرسانی</GhostButton>
              </div>
            }
          />
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            {[
              ["جمع بازه", `${chartTotal.toLocaleString("fa-IR")}M`],
              ["میانگین", `${chartAverage.toLocaleString("fa-IR")}M`],
              ["بیشترین مقدار", `${chartPeak.toLocaleString("fa-IR")}M · روز ${(chartPeakIndex + 1).toLocaleString("fa-IR")}`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3">
                <span className="text-[10px] font-black text-[var(--admin-muted)]">{label}</span>
                <strong className="mt-1 block text-sm font-black text-[var(--admin-ink)]">{value}</strong>
              </div>
            ))}
          </div>
          <div className="grid min-h-80 place-items-end gap-2 rounded-[24px] bg-[var(--admin-panel-2)] p-5 sm:grid-cols-12">
            {reportRevenueSeries.map((height, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => openReportModal(`جزئیات روز ${(index + 1).toLocaleString("fa-IR")}`, `عدد دقیق این ستون در گزارش ${workspaceTitle} برای شاخص «${selectedKpi.label}» ثبت شده است.`, BarChart3, [{ label: "روز", value: (index + 1).toLocaleString("fa-IR") }, { label: "مقدار", value: reportRevenueAmounts[index] }, { label: "درصد ارتفاع", value: `${height.toLocaleString("fa-IR")}٪` }])}
                className="flex h-full w-full origin-bottom flex-col items-center justify-end gap-2"
                initial={{ scaleY: 0.55, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: index * 0.035 }}
              >
                <span className="rounded-full bg-[var(--admin-panel)] px-2 py-1 text-[9px] font-black text-[var(--admin-accent)] shadow-sm">{reportRevenueAmounts[index]}</span>
                <span className="w-full rounded-t-2xl bg-[var(--admin-accent)] shadow-[0_0_22px_rgba(33,218,204,.22)] transition hover:brightness-110" style={{ height: `${height * 2}px` }} />
                <span className="text-[10px] font-black text-[var(--admin-muted)]">{(index + 1).toLocaleString("fa-IR")}</span>
              </motion.button>
            ))}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="قیف تبدیل فروشگاه" text="از ورود کاربر تا پرداخت موفق و دریافت فایل." />
          <div className="space-y-3">
            {reportFunnel.map((item, index) => (
              <button key={item.label} type="button" onClick={() => setMessage(`مرحله «${item.label}» در قیف تبدیل انتخاب شد.`)} className="w-full rounded-[22px] bg-[var(--admin-panel-2)] p-4 text-right transition hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-3">
                  <span>
                    <strong className="block text-xs font-black text-[var(--admin-ink)]">{item.label}</strong>
                    <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{item.value}</span>
                  </span>
                  <Status>{item.rate.toLocaleString("fa-IR")}٪</Status>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--admin-panel)]">
                  <motion.div className="h-full rounded-full bg-[var(--admin-accent)]" initial={{ width: 0 }} animate={{ width: `${item.rate}%` }} transition={{ delay: index * 0.08, duration: 0.55 }} />
                </div>
              </button>
            ))}
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.95fr_1.05fr]">
        <Surface className="p-5">
          <SectionHeader title="بهترین عملکردها" text="محصول، دوره، مطلب و مشاوره‌هایی که در بازه انتخابی بیشترین اثر را داشته‌اند." />
          <div className="space-y-2">
            {reportTopItems.map((item, index) => (
              <article key={item.href} className="rounded-[22px] bg-[var(--admin-panel-2)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="block truncate text-sm font-black text-[var(--admin-ink)]">{item.title}</strong>
                    <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">{item.type}</span>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--admin-panel)] text-[10px] font-black text-[var(--admin-accent)]">{(index + 1).toLocaleString("fa-IR")}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--admin-border)] pt-3">
                  <span className="text-xs font-black text-[var(--admin-ink)]">{item.value}</span>
                  <div className="flex items-center gap-2">
                    <Status>{item.change}</Status>
                    <Link href={item.href} className="grid size-9 place-items-center rounded-xl bg-[var(--admin-panel)] text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]" aria-label={`مشاهده ${item.title}`}>
                      <ArrowLeft className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="هشدارها و پیشنهادهای مدیریتی" text="مواردی که مستقیماً روی فروش، تجربه کاربر و سلامت سایت اثر دارند." />
          <div className="grid gap-3 sm:grid-cols-2">
            {reportAlerts.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4">
                <Bell className="mb-5 size-5 text-[var(--admin-accent)]" />
                <strong className="block text-sm font-black text-[var(--admin-ink)]">{item.title}</strong>
                <p className="mt-2 text-xs font-bold leading-7 text-[var(--admin-muted)]">{item.text}</p>
                <button type="button" onClick={() => setMessage(`اقدام «${item.action}» برای هشدار ${item.title} فعال شد.`)} className="mt-4 rounded-xl bg-[var(--admin-accent)] px-3 py-2 text-[10px] font-black text-[#06211f]">
                  {item.action}
                </button>
              </article>
            ))}
          </div>
        </Surface>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Surface className="p-5">
          <SectionHeader title="خروجی و فایل گزارش" text="گزارش‌های مورد نیاز برای حسابداری، فروش، محتوا، پشتیبانی و تصمیم‌گیری مدیریتی." />
          <div className="grid gap-2 sm:grid-cols-2">
            {reportExportModules.map((item) => {
              const active = enabledExports.includes(item);
              return (
                <button key={item} type="button" onClick={() => toggleExport(item)} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-right text-xs font-black transition ${active ? "bg-[var(--admin-accent)] text-[#06211f]" : "bg-[var(--admin-panel-2)] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"}`}>
                  <span className="inline-flex items-center gap-2">
                    <FileText className={`size-4 ${active ? "text-[#06211f]" : "text-[var(--admin-accent)]"}`} />
                    {item}
                  </span>
                  <span>{active ? "داخل خروجی" : "حذف‌شده"}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <PrimaryButton icon={Upload} onClick={() => setMessage("فایل گزارش Excel آماده دانلود شد.")}>Excel</PrimaryButton>
            <GhostButton icon={FileText} onClick={() => setMessage("نسخه PDF گزارش ساخته شد.")}>PDF</GhostButton>
            <GhostButton icon={CalendarDays} onClick={() => setMessage("ارسال خودکار گزارش هفتگی زمان‌بندی شد.")}>زمان‌بندی</GhostButton>
          </div>
        </Surface>

        <Surface className="p-5">
          <SectionHeader title="گزارش سریع بخش‌های سایت" text="دسترسی مستقیم به بخش‌هایی که گزارش آن‌ها روی تصمیم مدیریتی اثر دارد." />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["محصولات دانلودی", "/shop", Package],
              ["دوره‌های رایگان", "/courses", BookOpen],
              ["مجله", "/blog", FileText],
              ["مشاوره", "/consultation", Compass],
              ["سبد خرید", "/cart", CircleDollarSign],
              ["پشتیبانی", "/contact", Headphones],
            ].map(([label, href, Icon]) => (
              <Link key={label as string} href={href as string} className="flex items-center justify-between rounded-2xl bg-[var(--admin-panel-2)] px-4 py-3 text-right text-xs font-black text-[var(--admin-ink)] transition hover:text-[var(--admin-accent)]">
                <span className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-[var(--admin-accent)]" />
                  {label as string}
                </span>
                <ArrowLeft className="size-4" />
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <GhostButton icon={ShieldCheck} onClick={() => openReportModal("تست سلامت داده‌ها", "اتصال داده‌های فروش، سفارش، محصول، کاربران و پشتیبانی بررسی شد.", ShieldCheck, [{ label: "وضعیت", value: "پایدار" }, { label: "بازه", value: selectedRangeLabel }, { label: "شاخص", value: selectedKpi.label }])}>تست داده</GhostButton>
            <PrimaryButton icon={Sparkles} onClick={() => openReportModal("خلاصه مدیریتی گزارش", "خلاصه مدیریتی شامل فروش، نرخ تبدیل، محصول برتر، هشدارها و اقدام پیشنهادی آماده شد.", Sparkles, [{ label: "جمع فروش", value: `${chartTotal.toLocaleString("fa-IR")}M` }, { label: "نقطه اوج", value: `${chartPeak.toLocaleString("fa-IR")}M` }, { label: "بازه", value: selectedRangeLabel }])}>خلاصه مدیریتی</PrimaryButton>
          </div>
        </Surface>
      </div>
      <AdminActionModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function ActivePanel({ active, onSectionChange }: { active: SectionId; onSectionChange: (section: SectionId) => void }) {
  if (active === "content") return <ContentPanel />;
  if (active === "products") return <ProductsPanel />;
  if (active === "courses") return <CoursesPanel />;
  if (active === "users") return <UsersPanel />;
  if (active === "settings") return <SettingsPanel />;
  if (active === "communication") return <CommunicationPanel />;
  if (active === "reports") return <ReportsPanel />;
  return <OverviewPanel onSectionChange={onSectionChange} />;
}

export default function AdminDashboard() {
  const [active, setActive] = useState<SectionId>("overview");
  const [theme, setTheme] = useState<AdminTheme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("moad-admin-theme");
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(adminNotifications);
  const [selectedNotification, setSelectedNotification] = useState<AdminNotification | null>(null);
  const [adminModal, setAdminModal] = useState<AdminActionModalData | null>(null);
  const vars = useAdminVars(theme);
  const current = sections.find((section) => section.id === active) ?? sections[0];
  const isDark = theme === "dark";
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;

  useEffect(() => {
    window.localStorage.setItem("moad-admin-theme", theme);
  }, [theme]);

  const openNotification = (notification: AdminNotification) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((item) => (item.id === notification.id ? { ...item, read: true } : item)),
    );
    setSelectedNotification({ ...notification, read: true });
    setNotificationOpen(false);
  };

  const markAllNotificationsRead = () => {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, read: true })));
    setNotificationOpen(false);
  };

  return (
    <main className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-ink)] transition-colors duration-300" dir="rtl" style={vars}>
      <aside className={`fixed inset-y-2 right-2 z-50 flex w-[min(292px,calc(100vw-1rem))] flex-col overflow-hidden overflow-y-auto overscroll-contain rounded-[30px] border border-[var(--admin-sidebar-border)] bg-[var(--admin-sidebar)] p-4 text-[var(--admin-sidebar-ink)] shadow-[var(--admin-sidebar-shadow)] transition-[transform,background-color,color,border-color] duration-300 lg:inset-y-3 lg:right-3 lg:w-[266px] lg:translate-x-0 ${menuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="موآد استودیو">
            <span className="relative grid size-11 place-items-center overflow-hidden rounded-2xl bg-[var(--admin-ink)] text-[var(--admin-accent)] shadow-[0_10px_30px_rgba(15,18,13,.15)]">
              <AudioWaveform className="size-6 transition-transform group-hover:scale-110" strokeWidth={2.4} />
              <span className="absolute inset-x-2 bottom-1 h-px bg-[var(--admin-accent)]/40" />
            </span>
            <span className="leading-none">
              <strong className="block text-[15px] font-black text-[var(--admin-sidebar-ink)]">موآد</strong>
              <span className="mt-1 block text-[9px] font-bold text-[var(--admin-sidebar-muted)]">پنل مدیریت</span>
            </span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="grid size-10 place-items-center rounded-2xl bg-[var(--admin-sidebar-hover)] lg:hidden" aria-label="بستن منو">
            <X className="size-4" />
          </button>
        </div>

        <nav className="space-y-1.5">
          {sections.map((section) => {
            const Icon = section.icon;
            const selected = active === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActive(section.id);
                  setMenuOpen(false);
                }}
                className={`group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-right transition ${
                  selected
                    ? "bg-[var(--admin-accent)] text-[var(--admin-ink)]"
                    : "text-[var(--admin-sidebar-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-sidebar-ink)]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`grid size-9 place-items-center rounded-xl border transition ${
                    selected
                      ? "border-transparent bg-[var(--admin-ink)] text-[var(--admin-accent)] shadow-[0_0_22px_rgba(33,218,204,.34)]"
                      : "border-[var(--admin-sidebar-border)] bg-[var(--admin-sidebar-soft)] group-hover:border-transparent group-hover:bg-[var(--admin-accent)] group-hover:text-[var(--admin-ink)] group-hover:shadow-[0_0_22px_rgba(33,218,204,.2)]"
                  }`}>
                    <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold">{section.label}</span>
                    <span className={`mt-0.5 block text-[9px] font-medium ${selected ? "text-[var(--admin-ink)]/50" : "text-[var(--admin-sidebar-faint)] group-hover:text-[var(--admin-sidebar-muted)]"}`}>{section.hint}</span>
                  </span>
                </span>
                {selected && <ChevronLeft className="size-4 text-[var(--admin-ink)]/60" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <div className="mb-3 h-px !bg-[var(--admin-sidebar-border)]" />
          <Link href="/" className="group block overflow-hidden rounded-[22px]  p-4 text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(33,218,204,.16)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl !bg-[var(--admin-accent)] text-[var(--admin-ink)]">
                <Compass className="size-4" />
              </span>
              <span className="text-[10px] text-white/45">مشاهده سایت</span>
            </div>
            <p className="text-sm font-extrabold">بازگشت به سایت</p>
            <span className="mt-3 flex items-center justify-between text-[11px] font-bold text-[var(--admin-accent)]">
              موآد استودیو
              <ArrowLeft className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </aside>

      {menuOpen && <button aria-label="بستن منو" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" />}

      <section className="lg:pr-[286px]">
        <header
          className="site-header sticky top-0 z-30 border-b !border-[var(--admin-header-border)] !bg-[var(--admin-header)] px-4 py-3 backdrop-blur-xl transition-colors duration-300 sm:px-7 "
        >
          <div className="mx-auto flex min-h-[54px]  items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] transition hover:border-[var(--admin-accent)] lg:hidden"
              aria-label="باز کردن منو"
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 hidden sm:block">
              <p className="text-[11px] font-black text-[var(--admin-muted)]">پنل مدیریت</p>
              <div className="mt-0.5 flex min-w-0 items-center gap-2">
                <h2 className="truncate text-xl font-black text-[var(--admin-ink)]">{current.label}</h2>
                <span className="hidden rounded-full bg-[var(--admin-soft)] px-3 py-1 text-[10px] font-black text-[var(--admin-accent)] sm:inline-flex">
                  فعال
                </span>
              </div>
            </div>
            <div className="mr-auto flex items-center gap-2">
              <label className="hidden min-w-0 items-center gap-2 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 md:flex">
                <Search className="size-4 text-[var(--admin-muted)]" />
                <input className="min-w-0 w-full max-w-[280px] flex-1 bg-transparent text-xs font-bold text-[var(--admin-ink)] outline-none placeholder:text-[var(--admin-muted)]" placeholder="جستجو در پنل..." />
                <span className="rounded-lg bg-[var(--admin-panel-2)] px-2 py-1 font-mono text-[9px] text-[var(--admin-muted)]">⌘ K</span>
              </label>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="grid size-11 place-items-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] transition hover:-translate-y-0.5 hover:border-[var(--admin-accent)]"
                aria-label="تغییر تم"
              >
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen((open) => !open)}
                  className="relative grid size-11 place-items-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] transition hover:-translate-y-0.5 hover:border-[var(--admin-accent)]"
                  aria-label="اعلان ها"
                  aria-expanded={notificationOpen}
                >
                  <Bell className="size-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -left-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[var(--admin-accent)] px-1.5 py-0.5 text-[10px] font-black text-[#06211f] shadow-[0_0_18px_rgba(33,218,204,.35)]">
                      {unreadNotifications.toLocaleString("fa-IR")}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {notificationOpen && (
                    <>
                      <motion.button
                        type="button"
                        aria-label="بستن اعلان‌ها"
                        className="fixed inset-0 z-40 cursor-default bg-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setNotificationOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(380px,calc(100vw-1.5rem))] overflow-hidden rounded-[28px] border border-[var(--admin-border)] bg-[var(--admin-panel)] p-3 text-right shadow-[0_28px_90px_rgba(0,0,0,.22)] backdrop-blur-xl"
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-[var(--admin-border)] px-2 pb-3">
                          <div>
                            <strong className="block text-sm font-black text-[var(--admin-ink)]">اعلان‌های پنل</strong>
                            <span className="mt-1 block text-[10px] font-bold text-[var(--admin-muted)]">
                              {unreadNotifications > 0 ? `${unreadNotifications.toLocaleString("fa-IR")} پیام خوانده‌نشده` : "همه اعلان‌ها خوانده شده‌اند"}
                            </span>
                          </div>
                          <button type="button" onClick={markAllNotificationsRead} className="rounded-xl bg-[var(--admin-panel-2)] px-3 py-2 text-[10px] font-black text-[var(--admin-muted)] transition hover:bg-[var(--admin-accent)] hover:text-[#06211f]">
                            خواندن همه
                          </button>
                        </div>
                        <div className="relative mt-3">
                          <span className="pointer-events-none absolute inset-x-1 top-0 z-10 h-6 bg-gradient-to-b from-[var(--admin-panel)] to-transparent" />
                          <div className="max-h-[420px] space-y-2 overflow-y-auto overscroll-contain py-1 pl-1 pr-1 [scrollbar-color:rgba(33,218,204,.72)_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(33,218,204,.58)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--admin-accent)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                            {notifications.map((notification) => {
                              const SectionIcon = sections.find((section) => section.id === notification.section)?.icon ?? MessageSquareText;
                              return (
                                <button
                                  key={notification.id}
                                  type="button"
                                  onClick={() => openNotification(notification)}
                                  className={`group flex w-full items-start gap-3 rounded-[22px] border p-3 text-right transition hover:-translate-y-0.5 hover:border-[var(--admin-accent)] ${notification.read ? "border-transparent bg-[var(--admin-panel-2)]" : "border-[var(--admin-accent)] bg-[var(--admin-soft)]"}`}
                                >
                                  <span className={`relative grid size-11 shrink-0 place-items-center rounded-2xl ${notification.read ? "bg-[var(--admin-panel)] text-[var(--admin-muted)]" : "bg-[var(--admin-accent)] text-[#06211f]"}`}>
                                    <SectionIcon className="size-5" />
                                    {!notification.read && <span className="absolute right-1 top-1 size-2 rounded-full bg-[#06211f]" />}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="flex items-center justify-between gap-2">
                                      <strong className="truncate text-xs font-black text-[var(--admin-ink)]">{notification.title}</strong>
                                      <span className="shrink-0 rounded-full bg-[var(--admin-panel)] px-2 py-1 text-[9px] font-black text-[var(--admin-accent)]">{notification.priority}</span>
                                    </span>
                                    <span className="mt-1 line-clamp-2 block text-[10px] font-bold leading-5 text-[var(--admin-muted)]">{notification.summary}</span>
                                    <span className="mt-2 flex items-center justify-between gap-2 text-[9px] font-black text-[var(--admin-muted)]">
                                      <span>{notification.source}</span>
                                      <span>{notification.time}</span>
                                    </span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <span className="pointer-events-none absolute inset-x-1 bottom-0 z-10 h-6 bg-gradient-to-t from-[var(--admin-panel)] to-transparent" />
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <PrimaryButton
                className="hidden sm:inline-flex"
                onClick={() =>
                  setAdminModal({
                    title: "ایجاد مورد جدید",
                    text: "از این مسیر می‌توان محتوای جدید، محصول، دوره، کاربر یا گفتگوی پشتیبانی را متناسب با بخش فعال پنل ساخت.",
                    icon: Plus,
                    primaryLabel: "شروع ساخت",
                    details: [
                      { label: "بخش فعال", value: current.label },
                      { label: "قالب", value: "همگام با سایت اصلی" },
                      { label: "وضعیت", value: "پیش‌نویس امن" },
                    ],
                  })
                }
              >
                ایجاد جدید
              </PrimaryButton>
            </div>
          </div>
        </header>

        <div className="space-y-5 px-3 py-4 pb-24 sm:px-5 sm:py-5 lg:px-6 lg:py-7">
          <div
            className={`-mx-3 overflow-x-auto border-b border-[var(--admin-header-border)] bg-[var(--admin-header)] px-3 py-2 shadow-[var(--admin-header-shadow)] lg:hidden`}
          >
            <div className="flex min-w-max gap-2">
              {sections.map((section) => {
                const selected = active === section.id;
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActive(section.id)}
                    className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-black transition ${
                      selected
                        ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[#06211f]"
                        : isDark
                          ? "border-white/8 bg-[#18211f] text-white/62"
                          : "border-black/6 bg-[#f7f9f8] text-[#66736f]"
                    }`}
                  >
                    <Icon className="size-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
          <Hero active={active} />
          <SectionInsights active={active} />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <ActivePanel active={active} onSectionChange={setActive} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-black/55 px-4 py-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedNotification.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[34px] border border-[var(--admin-border)] bg-[var(--admin-panel)] p-5 text-right shadow-[0_34px_120px_rgba(0,0,0,.38)] sm:p-6"
            >
              <div className="hero-grid pointer-events-none absolute inset-0 opacity-[.08]" />
              <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-[var(--admin-accent)]/16 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid size-13 shrink-0 place-items-center rounded-[22px] bg-[var(--admin-accent)] text-[#06211f] shadow-[0_0_30px_rgba(33,218,204,.2)]">
                    <Bell className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <span className="inline-flex rounded-full bg-[var(--admin-soft)] px-3 py-1 text-[10px] font-black text-[var(--admin-accent)]">
                      {selectedNotification.source} · {selectedNotification.priority}
                    </span>
                    <h3 className="mt-3 text-xl font-black leading-9 text-[var(--admin-ink)] sm:text-2xl">{selectedNotification.title}</h3>
                    <p className="mt-1 text-xs font-bold text-[var(--admin-muted)]">{selectedNotification.time}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNotification(null)}
                  className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] text-[var(--admin-ink)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]"
                  aria-label="بستن اعلان"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="relative mt-6 rounded-[24px] bg-[var(--admin-panel-2)] p-4">
                <p className="text-sm font-bold leading-8 text-[var(--admin-ink)]">{selectedNotification.body}</p>
              </div>

              <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
                {selectedNotification.details.map((detail) => (
                  <div key={detail} className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] p-4">
                    <ShieldCheck className="mb-4 size-5 text-[var(--admin-accent)]" />
                    <span className="text-[11px] font-black leading-6 text-[var(--admin-muted)]">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedNotification(null)}
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-2)] px-5 text-xs font-black text-[var(--admin-ink)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]"
                >
                  بستن
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActive(selectedNotification.section);
                    setSelectedNotification(null);
                    setNotificationOpen(false);
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--admin-accent)] px-5 text-xs font-black text-[#06211f] shadow-[0_14px_34px_rgba(33,218,204,.24)] transition hover:-translate-y-0.5"
                >
                  رفتن به بخش مرتبط
                  <ArrowLeft className="size-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AdminActionModal modal={adminModal} onClose={() => setAdminModal(null)} />
    </main>
  );
}
