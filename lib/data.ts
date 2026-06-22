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
  coverPosition: string;
};

export const samplePacks: SamplePack[] = [
  {
    slug: "neon-persian-drums",
    title: "درام‌های نئونی پارسی",
    enTitle: "NEON PERSIAN DRUMS",
    genre: "ایرانی / ترپ",
    bpm: "۸۰ تا ۱۵۰ ضرب",
    price: 689000,
    oldPrice: 890000,
    color: "#101a12",
    accent: "#baf451",
    badge: "پرفروش",
    description: "ترکیبی پرانرژی از پرکاشن ایرانی، درام‌های مدرن و لوپ‌هایی که از همان ثانیه اول ایده می‌سازند.",
    tags: ["تنبک", "۸۰۸", "لوپ درام"],
    includes: ["۱۲۰ لوپ درام", "۸۰ وان‌شات", "۲۴ فایل نت", "فایل صوتی ۲۴ بیت"],
    coverPosition: "0% 0%",
  },
  {
    slug: "midnight-rnb",
    title: "نیمه‌شب آر‌اند‌بی",
    enTitle: "MIDNIGHT R&B",
    genre: "آر‌اند‌بی / سول",
    bpm: "۶۵ تا ۱۱۰ ضرب",
    price: 549000,
    color: "#17211c",
    accent: "#7ddc9a",
    badge: "جدید",
    description: "ملودی‌های گرم، درام‌های نرم و تکسچرهای آنالوگ برای ساخت قطعه‌های احساسی و عمیق.",
    tags: ["گیتار", "کیبورد", "وکال"],
    includes: ["۹۰ لوپ ملودی", "۵۰ درام لوپ", "۳۲ وکال چاپ", "لاین‌های کامل"],
    coverPosition: "50% 0%",
  },
  {
    slug: "tehran-after-dark",
    title: "تهران بعد از تاریکی",
    enTitle: "TEHRAN AFTER DARK",
    genre: "هیپ‌هاپ / بوم‌بپ",
    bpm: "۷۲ تا ۹۶ ضرب",
    price: 729000,
    color: "#161712",
    accent: "#d9ed69",
    description: "سمپل‌های سینمایی، بیس‌های خاکی و درام‌های خام برای بیت‌هایی با امضای شهری و شخصی.",
    tags: ["وینیل", "بوم‌بپ", "سینمایی"],
    includes: ["۶۰ سمپل اصلی", "۹۰ درام وان‌شات", "۲۰ باس‌لوپ", "نسخه بدون درام"],
    coverPosition: "100% 0%",
  },
  {
    slug: "organic-house-rituals",
    title: "آیین‌های ارگانیک هاوس",
    enTitle: "ORGANIC HOUSE RITUALS",
    genre: "ارگانیک هاوس",
    bpm: "۱۱۰ تا ۱۲۴ ضرب",
    price: 629000,
    color: "#0e1917",
    accent: "#55e6b2",
    description: "گرُووهای زنده، سازهای شرقی و فضای ارگانیک برای پروداکشن‌های گرم کلاب و غروب.",
    tags: ["پرکاشن", "پد", "گروو"],
    includes: ["۱۱۰ لوپ پرکاشن", "۴۰ پد و اتمسفر", "۶۰ وان‌شات", "۲۵ فایل نت"],
    coverPosition: "0% 100%",
  },
  {
    slug: "cinematic-dust",
    title: "غبار سینمایی",
    enTitle: "CINEMATIC DUST",
    genre: "سینمایی / امبینت",
    bpm: "تمپوی آزاد",
    price: 489000,
    color: "#202017",
    accent: "#c9cb78",
    description: "مجموعه‌ای از بافت‌های زنده، پیانوهای پردازش‌شده و اتمسفر برای تصویر و روایت.",
    tags: ["امبینت", "پیانو", "فولی"],
    includes: ["۸۰ تکسچر", "۴۰ پیانو لوپ", "۵۰ فولی", "فایل صوتی ۲۴ بیت"],
    coverPosition: "50% 100%",
  },
  {
    slug: "future-pop-vocals",
    title: "وکال‌های فیوچر پاپ",
    enTitle: "FUTURE POP VOCALS",
    genre: "پاپ / الکترونیک",
    bpm: "۹۰ تا ۱۲۸ ضرب",
    price: 799000,
    color: "#10180f",
    accent: "#9efc5c",
    badge: "محبوب",
    description: "وکال‌چاپ‌های اورجینال و آماده‌ی استفاده با هارمونی، ادلیب و نسخه‌های خشک و پردازش‌شده.",
    tags: ["وکال", "هارمونی", "ادلیب"],
    includes: ["۱۶ کیت وکال", "لاین‌های کامل", "نسخه خام و پردازش‌شده", "فایل نت ملودی"],
    coverPosition: "100% 100%",
  },
];

export const categories = [
  { title: "درام و پرکاشن", subtitle: "۲۴ محصول", icon: "drum" },
  { title: "ملودی و ساز", subtitle: "۱۸ محصول", icon: "piano" },
  { title: "وکال", subtitle: "۱۲ محصول", icon: "mic" },
  { title: "پریست و بانک صدا", subtitle: "۱۵ محصول", icon: "wave" },
];

export type VideoTimelinePoint = {
  id: string;
  title: string;
  time: number;
};

export const defaultVideoTimeline: VideoTimelinePoint[] = [
  { id: "opening", title: "مقدمه و هدف ویدئو", time: 0 },
  { id: "main-point", title: "نکته اصلی آموزش", time: 3 },
  { id: "wrap-up", title: "جمع‌بندی و تمرین", time: 7 },
];

export type CourseLesson = {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoSrc: string;
  timeline?: VideoTimelinePoint[];
};

export type CourseChapter = {
  id: string;
  title: string;
  lessons: CourseLesson[];
};

export type Course = {
  slug: string;
  title: string;
  level: string;
  lessons: number;
  duration: string;
  price: number;
  isFree: boolean;
  accent: string;
  description: string;
  chapters: CourseChapter[];
};

export const courses: Course[] = [
  {
    slug: "modern-beatmaking",
    title: "بیت‌سازی مدرن از ایده تا انتشار",
    level: "از پایه تا حرفه‌ای",
    lessons: 4,
    duration: "۴۵ دقیقه",
    price: 0,
    isFree: true,
    accent: "#baf451",
    description: "مسیر عملی ساخت یک بیت کامل؛ از انتخاب صدا و گروو تا میکس، مستر و انتشار.",
    chapters: [
      {
        id: "start",
        title: "فصل اول؛ ساختن پایه",
        lessons: [
          { id: "idea", title: "از ایده خام تا طرح اولیه", duration: "۱۰:۲۴", description: "در این قسمت یاد می‌گیری یک ایده کوتاه را بدون وسواس به اسکچ قابل ادامه تبدیل کنی.", videoSrc: "/videos/moad-product-preview.mp4" },
          { id: "sound-choice", title: "انتخاب صدای درست", duration: "۰۹:۱۸", description: "چطور قبل از شروع میکس، با انتخاب درست کیک، اسنیر و ملودی فضای قطعه را مشخص کنیم.", videoSrc: "/videos/moad-product-preview.mp4" },
        ],
      },
      {
        id: "arrangement",
        title: "فصل دوم؛ حرکت و تنظیم",
        lessons: [
          { id: "groove", title: "ساخت گروو و حرکت", duration: "۱۲:۴۰", description: "با جابه‌جایی‌های کوچک، ولوسیتی و سکوت، ریتمی بساز که زنده و شخصی شنیده شود.", videoSrc: "/videos/moad-product-preview.mp4" },
          { id: "finish", title: "تکمیل و خروجی گرفتن", duration: "۱۳:۰۵", description: "پروژه را جمع‌بندی کن، تعادل اولیه را بساز و یک خروجی تمیز برای انتشار آماده کن.", videoSrc: "/videos/moad-product-preview.mp4" },
        ],
      },
    ],
  },
  {
    slug: "creative-mixing",
    title: "میکس خلاق برای موزیک امروز",
    level: "متوسط",
    lessons: 4,
    duration: "۳۸ دقیقه",
    price: 0,
    isFree: true,
    accent: "#77dda3",
    description: "تصمیم‌گیری در میکس، ساخت عمق و پانچ و رسیدن به صدایی که روی هر سیستم ترجمه می‌شود.",
    chapters: [
      {
        id: "balance",
        title: "فصل اول؛ تعادل و وضوح",
        lessons: [
          { id: "static-mix", title: "میکس استاتیک بدون پلاگین", duration: "۰۸:۴۶", description: "تنها با ولوم و پنینگ، جای درست عناصر را پیدا کن و پایه میکس را محکم بساز.", videoSrc: "/videos/moad-product-preview.mp4" },
          { id: "space", title: "ساخت فضا بدون شلوغی", duration: "۱۰:۱۲", description: "با تصمیم‌های ساده در فرکانس و عمق، برای هر صدا فضای مشخصی ایجاد کن.", videoSrc: "/videos/moad-product-preview.mp4" },
        ],
      },
      {
        id: "impact",
        title: "فصل دوم؛ انرژی و ترجمه",
        lessons: [
          { id: "punch", title: "پانچ واقعی در درام", duration: "۰۹:۳۵", description: "ترنزینت و انرژی درام را بدون بلندتر و خشن‌تر کردن بی‌دلیل آن کنترل کن.", videoSrc: "/videos/moad-product-preview.mp4" },
          { id: "translation", title: "تست میکس روی سیستم‌های مختلف", duration: "۰۹:۵۲", description: "یک روند سریع برای بررسی میکس روی هدفون، موبایل و اسپیکرهای مختلف بساز.", videoSrc: "/videos/moad-product-preview.mp4" },
        ],
      },
    ],
  },
  {
    slug: "sound-design-lab",
    title: "آزمایشگاه طراحی صدا",
    level: "مقدماتی",
    lessons: 4,
    duration: "۴۱ دقیقه",
    price: 0,
    isFree: true,
    accent: "#d8ec69",
    description: "از سینت‌سایزر تا سمپلینگ؛ صداهایی بساز که فقط متعلق به موسیقی خودت باشند.",
    chapters: [
      {
        id: "source",
        title: "فصل اول؛ منبع صدا",
        lessons: [
          { id: "record", title: "پیدا و ضبط کردن صدا", duration: "۱۰:۰۸", description: "از محیط اطرافت متریال صوتی جمع کن و آن را برای پردازش تمیز و آماده نگه دار.", videoSrc: "/videos/moad-product-preview.mp4" },
          { id: "shape", title: "شکل دادن به صدا", duration: "۰۹:۵۵", description: "با تغییر پیچ، پاکت و فیلتر، شخصیت اولیه یک صدای ساده را کاملاً عوض کن.", videoSrc: "/videos/moad-product-preview.mp4" },
        ],
      },
      {
        id: "identity",
        title: "فصل دوم؛ امضای شخصی",
        lessons: [
          { id: "texture", title: "ساخت تکسچر زنده", duration: "۱۱:۲۰", description: "لایه‌های کوچک را ترکیب کن تا پس‌زمینه‌ای زنده و قابل کنترل برای قطعه بسازی.", videoSrc: "/videos/moad-product-preview.mp4" },
          { id: "preset", title: "ذخیره و ساخت بانک شخصی", duration: "۱۰:۱۴", description: "صداهای ساخته‌شده را اصولی نام‌گذاری و دسته‌بندی کن تا در پروژه بعدی سریع پیدایشان کنی.", videoSrc: "/videos/moad-product-preview.mp4" },
        ],
      },
    ],
  },
];

export const articles = [
  {
    slug: "make-drums-hit-harder",
    title: "چطور درام‌هایی بسازیم که واقعاً ضربه بزنند؟",
    category: "تکنیک تولید",
    readTime: "۸ دقیقه",
    videoSrc: "/videos/moad-product-preview.mp4",
    timeline: defaultVideoTimeline,
    excerpt: "پانچ بیشتر همیشه از کمپرس بیشتر نمی‌آید؛ گاهی انتخاب صدا و سکوت بین ضربه‌ها همه‌چیز است.",
  },
  {
    slug: "sampling-with-identity",
    title: "سمپلینگ بدون از دست دادن هویت شخصی",
    category: "خلاقیت",
    readTime: "۶ دقیقه",
    videoSrc: "/videos/moad-product-preview.mp4",
    timeline: defaultVideoTimeline,
    excerpt: "چند روش ساده برای تبدیل یک سمپل آماده به ماده‌ای که شنونده آن را فقط با شما به یاد بیاورد.",
  },
  {
    slug: "home-studio-acoustics",
    title: "آکوستیک هوم‌استودیو؛ از کجا شروع کنیم؟",
    category: "استودیو",
    readTime: "۱۰ دقیقه",
    videoSrc: "/videos/moad-product-preview.mp4",
    timeline: defaultVideoTimeline,
    excerpt: "قبل از خرید مانیتور گران‌تر، اتاق را بشناسید و با چند تصمیم درست شنیدن را دقیق‌تر کنید.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR").format(price) + " تومان";
