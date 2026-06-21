export type SamplePack = {
  slug: string;
  title: string;
  enTitle: string;
  genre: string;
  bpm: string;
  price: number;
  oldPrice?: number;
  color: string;
  accent: string;
  badge?: string;
  description: string;
  tags: string[];
  includes: string[];
};

export const samplePacks: SamplePack[] = [
  {
    slug: "neon-persian-drums",
    title: "درام‌های نئونی پارسی",
    enTitle: "NEON PERSIAN DRUMS",
    genre: "Persian / Trap",
    bpm: "80—150 BPM",
    price: 689000,
    oldPrice: 890000,
    color: "#101a12",
    accent: "#baf451",
    badge: "پرفروش",
    description: "ترکیبی پرانرژی از پرکاشن ایرانی، درام‌های مدرن و لوپ‌هایی که از همان ثانیه اول ایده می‌سازند.",
    tags: ["تنبک", "808", "لوپ درام"],
    includes: ["۱۲۰ لوپ درام", "۸۰ وان‌شات", "۲۴ MIDI", "فایل‌های WAV 24bit"],
  },
  {
    slug: "midnight-rnb",
    title: "نیمه‌شب آر‌اند‌بی",
    enTitle: "MIDNIGHT R&B",
    genre: "R&B / Soul",
    bpm: "65—110 BPM",
    price: 549000,
    color: "#17211c",
    accent: "#7ddc9a",
    badge: "جدید",
    description: "ملودی‌های گرم، درام‌های نرم و تکسچرهای آنالوگ برای ساخت قطعه‌های احساسی و عمیق.",
    tags: ["گیتار", "کیبورد", "وکال"],
    includes: ["۹۰ لوپ ملودی", "۵۰ درام لوپ", "۳۲ وکال چاپ", "Stem کامل"],
  },
  {
    slug: "tehran-after-dark",
    title: "تهران بعد از تاریکی",
    enTitle: "TEHRAN AFTER DARK",
    genre: "Hip-Hop / Boom Bap",
    bpm: "72—96 BPM",
    price: 729000,
    color: "#161712",
    accent: "#d9ed69",
    description: "سمپل‌های سینمایی، بیس‌های خاکی و درام‌های خام برای بیت‌هایی با امضای شهری و شخصی.",
    tags: ["وینیل", "بوم‌بپ", "سینمایی"],
    includes: ["۶۰ سمپل اصلی", "۹۰ درام وان‌شات", "۲۰ باس‌لوپ", "نسخه بدون درام"],
  },
  {
    slug: "organic-house-rituals",
    title: "آیین‌های ارگانیک هاوس",
    enTitle: "ORGANIC HOUSE RITUALS",
    genre: "Organic House",
    bpm: "110—124 BPM",
    price: 629000,
    color: "#0e1917",
    accent: "#55e6b2",
    description: "گرُووهای زنده، سازهای شرقی و فضای ارگانیک برای پروداکشن‌های گرم کلاب و غروب.",
    tags: ["پرکاشن", "پد", "گروو"],
    includes: ["۱۱۰ لوپ پرکاشن", "۴۰ پد و اتمسفر", "۶۰ وان‌شات", "۲۵ پروژه MIDI"],
  },
  {
    slug: "cinematic-dust",
    title: "غبار سینمایی",
    enTitle: "CINEMATIC DUST",
    genre: "Cinematic / Ambient",
    bpm: "Free Tempo",
    price: 489000,
    color: "#202017",
    accent: "#c9cb78",
    description: "مجموعه‌ای از بافت‌های زنده، پیانوهای پردازش‌شده و اتمسفر برای تصویر و روایت.",
    tags: ["امبینت", "پیانو", "فولی"],
    includes: ["۸۰ تکسچر", "۴۰ پیانو لوپ", "۵۰ فولی", "WAV 24bit"],
  },
  {
    slug: "future-pop-vocals",
    title: "وکال‌های فیوچر پاپ",
    enTitle: "FUTURE POP VOCALS",
    genre: "Pop / Electronic",
    bpm: "90—128 BPM",
    price: 799000,
    color: "#10180f",
    accent: "#9efc5c",
    badge: "محبوب",
    description: "وکال‌چاپ‌های اورجینال و آماده‌ی استفاده با هارمونی، ادلیب و نسخه‌های خشک و پردازش‌شده.",
    tags: ["وکال", "هارمونی", "ادلیب"],
    includes: ["۱۶ کیت وکال", "Stem کامل", "نسخه Dry / Wet", "MIDI ملودی"],
  },
];

export const categories = [
  { title: "درام و پرکاشن", subtitle: "۲۴ محصول", icon: "drum" },
  { title: "ملودی و ساز", subtitle: "۱۸ محصول", icon: "piano" },
  { title: "وکال", subtitle: "۱۲ محصول", icon: "mic" },
  { title: "پریست و بانک صدا", subtitle: "۱۵ محصول", icon: "wave" },
];

export const courses = [
  {
    slug: "modern-beatmaking",
    title: "بیت‌سازی مدرن از ایده تا انتشار",
    level: "از پایه تا حرفه‌ای",
    lessons: 42,
    duration: "۱۸ ساعت",
    price: 2490000,
    accent: "#baf451",
    description: "مسیر عملی ساخت یک بیت کامل؛ از انتخاب صدا و گروو تا میکس، مستر و انتشار.",
  },
  {
    slug: "creative-mixing",
    title: "میکس خلاق برای موزیک امروز",
    level: "متوسط",
    lessons: 31,
    duration: "۱۲ ساعت",
    price: 1890000,
    accent: "#77dda3",
    description: "تصمیم‌گیری در میکس، ساخت عمق و پانچ و رسیدن به صدایی که روی هر سیستم ترجمه می‌شود.",
  },
  {
    slug: "sound-design-lab",
    title: "آزمایشگاه طراحی صدا",
    level: "پیشرفته",
    lessons: 26,
    duration: "۱۰ ساعت",
    price: 1690000,
    accent: "#d8ec69",
    description: "از سینت‌سایزر تا سمپلینگ؛ صداهایی بساز که فقط متعلق به موسیقی خودت باشند.",
  },
];

export const articles = [
  {
    slug: "make-drums-hit-harder",
    title: "چطور درام‌هایی بسازیم که واقعاً ضربه بزنند؟",
    category: "تکنیک تولید",
    readTime: "۸ دقیقه",
    excerpt: "پانچ بیشتر همیشه از کمپرس بیشتر نمی‌آید؛ گاهی انتخاب صدا و سکوت بین ضربه‌ها همه‌چیز است.",
  },
  {
    slug: "sampling-with-identity",
    title: "سمپلینگ بدون از دست دادن هویت شخصی",
    category: "خلاقیت",
    readTime: "۶ دقیقه",
    excerpt: "چند روش ساده برای تبدیل یک سمپل آماده به ماده‌ای که شنونده آن را فقط با شما به یاد بیاورد.",
  },
  {
    slug: "home-studio-acoustics",
    title: "آکوستیک هوم‌استودیو؛ از کجا شروع کنیم؟",
    category: "استودیو",
    readTime: "۱۰ دقیقه",
    excerpt: "قبل از خرید مانیتور گران‌تر، اتاق را بشناسید و با چند تصمیم درست شنیدن را دقیق‌تر کنید.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR").format(price) + " تومان";

