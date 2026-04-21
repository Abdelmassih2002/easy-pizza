"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Flame,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import OrderModal from "@/components/OrderModal";
const phoneDisplay = "01505084968";
const phoneInternational = "201505084968";

const socialLinks = [
  {
    name: "Facebook",
    label: "فيسبوك",
    href: "https://www.facebook.com/EasyPizzaEg/",
    icon: Globe,
  },
  {
    name: "Instagram",
    label: "إنستجرام",
    href: "https://www.instagram.com/diyeasypizza96?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: Mail,
  },
];

type Category = "all" | "bases" | "margherita";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  tag: string;
  gradient: string;
  borderColor: string;
  category: Category;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "٣ قواعد بيتزا سادة",
    price: 135,
    description: "قواعد هشة وخفيفة، مخبوزة بعناية لتكون أساس وجبتك المثالية.",
    tag: "الأكثر طلبًا",
    gradient: "from-orange-50 via-white to-red-50",
    borderColor: "border-orange-100",
    category: "bases",
  },
  {
    id: 2,
    name: "٤ قواعد بيتزا سادة",
    price: 100,
    description: "العرض العائلي الأوفر، جودة ممتازة وسعر مميز للطلبات الكبيرة.",
    tag: "عرض التوفير",
    gradient: "from-emerald-50 via-white to-lime-50",
    borderColor: "border-emerald-100",
    category: "bases",
  },
  {
    id: 3,
    name: "٢ بيتزا مارجريتا بالجبنة",
    price: 180,
    description: "مزيج جبن غني يذوب في الفرن، وجاهزة لتدخل التسوية فورًا.",
    tag: "جاهز فورًا",
    gradient: "from-rose-50 via-white to-orange-50",
    borderColor: "border-rose-100",
    category: "margherita",
  },
  {
    id: 4,
    name: "٢ بيتزا مارجريتا طبيعية ١٠٠٪",
    price: 200,
    description:
      "لعشاق المذاق الأصلي، جبنة طبيعية بالكامل بدون أي إضافات نباتية.",
    tag: "إصدار بريميوم",
    gradient: "from-amber-50 via-white to-yellow-50",
    borderColor: "border-amber-200",
    category: "margherita",
  },
];

const reasons = [
  {
    title: "عجينة فريش يوميًا",
    description:
      "من غير تخزين طويل أو خامات مجمدة، كل حاجة بتوصلك طازجة وجاهزة.",
  },
  {
    title: "١٠ دقائق تحضير",
    description: "وفر وقتك ومجهودك، وجهز البيتزا في البيت من غير تعقيد.",
  },
  {
    title: "توفير حقيقي",
    description: "سعر أوفر من طلب الجاهز مع نفس الإحساس الممتع وقت التسوية.",
  },
];

const quickFacts = ["فريش يوميًا", "جاهزة للفرن", "مناسبة للعيلة"];
const currentYear = new Date().getFullYear();

const CATEGORY_LABELS: Record<Category, string> = {
  all: "كل المنتجات",
  bases: "قواعد البيتزا",
  margherita: "مارجريتا",
};

function createWhatsAppLink(message?: string) {
  const baseUrl = `https://wa.me/${phoneInternational}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("ar-EG").format(price);
}

export default function EasyPizzaPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Easy Pizza",
    telephone: `+${phoneInternational}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "١ ش أحمد سنان، سانت فاتيما",
      addressLocality: "مصر الجديدة",
      addressCountry: "EG",
    },
    areaServed: "مصر الجديدة",
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} isOpen={!!selectedItem} />

      <div className="min-h-screen text-zinc-900">
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="افتح واتساب للتواصل مع Easy Pizza"
          className="fixed bottom-5 left-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-[1.75rem] bg-[#25D366] text-white shadow-[0_22px_55px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 md:bottom-8 md:left-8"
        >
          <MessageCircle size={28} fill="currentColor" aria-hidden="true" />
          <span className="sr-only">تواصل عبر واتساب</span>
        </a>

        <header className="relative overflow-hidden px-6 pb-24 pt-10 md:pb-32 md:pt-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,48,48,0.18),transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#c53030_0.6px,transparent_0.6px)] bg-size-[18px_18px]" />

          <div className="relative mx-auto max-w-6xl">
            <div className="mb-12 flex items-center justify-center gap-3 text-center">
              {quickFacts.map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-red-100 bg-white/80 px-4 py-2 text-sm font-extrabold text-red-700 shadow-sm backdrop-blur"
                >
                  {fact}
                </span>
              ))}
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="text-center lg:text-right">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-700">
                  <Sparkles size={16} aria-hidden="true" />
                  عجينة بيتزا جاهزة في ١٠ دقايق
                </div>

                <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-zinc-950 md:text-7xl lg:text-8xl">
                  <span className="text-[#c53030]">EASY</span>{" "}
                  <span className="text-zinc-900">PIZZA</span>
                </h1>

                <p className="mx-auto mb-10 max-w-2xl text-xl font-bold leading-relaxed text-zinc-600 md:text-2xl lg:mx-0">
                  مش مجرد عجينة، دي{" "}
                  <span className="text-red-600 underline decoration-red-200 underline-offset-8">
                    تجربة إيطالية
                  </span>{" "}
                  في مطبخك. اختار العرض المناسب، دخلها الفرن، واستمتع بطعم يفتح
                  النفس في ١٠ دقايق بس!
                </p>

                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <a
                    href="#menu"
                    className="group inline-flex items-center gap-3 rounded-2xl bg-zinc-950 px-8 py-4 text-lg font-black text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
                  >
                    شوف المنيو
                    <Flame
                      className="text-orange-300 transition-transform duration-300 group-hover:-rotate-6"
                      aria-hidden="true"
                    />
                  </a>

                  <a
                    href={`tel:+${phoneInternational}`}
                    className="inline-flex items-center gap-3 rounded-2xl border-2 border-zinc-900 bg-white/85 px-8 py-4 text-lg font-black text-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-200"
                  >
                    {phoneDisplay}
                    <Phone size={22} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-6 rounded-[3rem] bg-red-200/50 blur-3xl" />
                <div className="relative overflow-hidden rounded-[3rem] border border-white/80 bg-white/80 p-6 shadow-[0_28px_70px_rgba(0,0,0,0.12)] backdrop-blur">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700">
                      صنع في مصر بكل حب
                    </span>
                    <span className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-black text-white">
                      Fresh & Ready
                    </span>
                  </div>

                  <div className="relative mx-auto flex aspect-square max-w-68 items-center justify-center overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-inner">
                    <Image
                      src="/Logo.jpg"
                      alt="شعار Easy Pizza"
                      width={320}
                      height={320}
                      priority
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[1.75rem] bg-orange-50 p-4 text-center">
                      <p className="text-sm font-bold text-zinc-500">التحضير</p>
                      <p className="text-2xl font-black text-orange-600">
                        ١٠ دقائق
                      </p>
                    </div>
                    <div className="rounded-[1.75rem] bg-red-50 p-4 text-center">
                      <p className="text-sm font-bold text-zinc-500">المذاق</p>
                      <p className="text-2xl font-black text-red-600">فريش</p>
                    </div>
                    <div className="rounded-[1.75rem] bg-emerald-50 p-4 text-center">
                      <p className="text-sm font-bold text-zinc-500">الطلب</p>
                      <p className="text-2xl font-black text-emerald-600">
                        واتساب
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section id="menu" className="scroll-mt-24 px-6 py-24 md:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <div className="mb-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-zinc-400">
                  <span className="text-amber-500">✦</span>
                  Fresh & Ready
                </div>
                <h2 className="mb-6 text-4xl font-black text-zinc-950 md:text-6xl">
                  أقوى عروضنا
                </h2>
                <p className="mx-auto max-w-2xl text-lg font-bold leading-relaxed text-zinc-500">
                  اختار العرض المناسب ليك أو للعيلة، واطلبه مباشرة بخطوة واحدة.
                </p>

                {/* ── Category Filters ── */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-2xl border-2 px-5 py-2.5 text-sm font-black transition-all duration-200 ${
                        activeCategory === cat
                          ? "border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <article
                      className={`group h-full rounded-[2.5rem] border-2 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(15,23,42,0.1)] ${item.borderColor}`}
                    >
                      <div
                        className={`flex h-full flex-col rounded-4xl bg-linear-to-br ${item.gradient} p-8 md:p-10`}
                      >
                        <div className="mb-8 flex items-start justify-between gap-4">
                          <span className="rounded-full border border-white/60 bg-white/80 px-4 py-2 text-xs font-black text-zinc-800 shadow-sm backdrop-blur">
                            {item.tag}
                          </span>
                          <div className="rounded-2xl bg-white/70 p-3 text-red-600 transition-transform duration-300 group-hover:rotate-6">
                            <ShoppingBasket size={28} aria-hidden="true" />
                          </div>
                        </div>

                        <h3 className="mb-4 text-3xl font-black text-zinc-950 transition-transform duration-300 group-hover:-translate-x-1 md:text-4xl">
                          {item.name}
                        </h3>

                        <p className="mb-10 text-lg font-bold leading-relaxed text-zinc-600">
                          {item.description}
                        </p>

                        <div className="mt-auto flex items-end justify-between gap-4">
                          <div>
                            <span className="mb-1 block text-sm font-bold uppercase tracking-[0.25em] text-zinc-400">
                              السعر
                            </span>
                            <div className="flex items-end gap-2">
                              <span className="text-5xl font-black text-zinc-950 md:text-6xl">
                                {formatPrice(item.price)}
                              </span>
                              <span className="pb-2 text-lg font-black text-zinc-400">
                                LE
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedItem(item)}
                            aria-label={`اطلب ${item.name}`}
                            className="inline-flex items-center justify-center rounded-[1.75rem] bg-zinc-950 p-5 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
                          >
                            <CheckCircle2
                              size={30}
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mx-4 mb-8 overflow-hidden rounded-[3rem] bg-zinc-950 px-6 py-20 text-white md:mx-6 md:rounded-[4rem] md:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
              <div>
                <h2 className="mb-8 text-4xl font-black leading-tight md:text-6xl">
                  ليه تختار <br />
                  <span className="text-red-500">Easy Pizza؟</span>
                </h2>
                
                <ul className="grid gap-5">
                  {reasons.map((reason) => (
                    <li
                      key={reason.title}
                      className="rounded-4xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:bg-white/10"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/20">
                          <CheckCircle2 size={24} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-black">
                            {reason.title}
                          </h3>
                          <p className="text-base font-bold leading-relaxed text-zinc-300">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <section className="rounded-[3rem] bg-white p-8 text-zinc-950 shadow-2xl md:p-10">
                <h2 className="mb-8 flex items-center gap-3 text-3xl font-black md:text-4xl">
                  نورنا في المكان
                  <MapPin
                    className="text-red-600"
                    size={34}
                    aria-hidden="true"
                  />
                </h2>

                <div className="space-y-6">
                  <div className="rounded-4xl border border-zinc-100 bg-zinc-50 p-6">
                    <span className="mb-2 block text-sm font-black uppercase tracking-[0.2em] text-red-600">
                      Location
                    </span>
                    <address className="not-italic text-2xl font-black leading-snug text-zinc-950">
                      ١ ش أحمد سنان، سانت فاتيما، مصر الجديدة
                    </address>
                  </div>

                  <div className="flex items-center gap-4 rounded-4xl bg-amber-50 p-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white text-amber-600 shadow-sm">
                      <Clock size={32} aria-hidden="true" />
                    </div>
                    <p className="text-xl font-black leading-relaxed text-zinc-900 md:text-2xl">
                      ١٠ دقايق فرن.. وتبقى المعلم!
                    </p>
                  </div>

                  <div className="rounded-4xl bg-zinc-950 p-6 text-white">
                    <p className="mb-4 text-lg font-black">
                      اطلب مباشرة واحجز عرضك الآن
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedItem(menuItems[0])}
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-black text-white transition-transform duration-300 hover:-translate-y-1"
                      >
                        اطلب الآن
                        <MessageCircle size={18} aria-hidden="true" />
                      </button>
                      <a
                        href={`tel:+${phoneInternational}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-black text-white transition-transform duration-300 hover:-translate-y-1"
                      >
                        اتصال
                        <Phone size={18} aria-hidden="true" />
                      </a>
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-5">
                      <p className="mb-3 text-sm font-black text-zinc-300">
                        تابعنا على السوشيال
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {socialLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <a
                              key={link.name}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10"
                            >
                              {link.label}
                              <Icon size={18} aria-hidden="true" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>

        <footer className="px-6 py-16 text-center">
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
              EASY <span className="text-red-600">PIZZA</span>
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
              <span>Fresh</span>
              <span className="text-red-200">•</span>
              <span>Quality</span>
              <span className="text-red-200">•</span>
              <span>Easy</span>
            </div>
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`افتح ${link.label}`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-black text-zinc-700 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-red-200 hover:text-red-600"
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
            <p className="text-base font-bold text-zinc-500">
              © {currentYear} إيزي بيتزا - صنع في مصر بكل حب
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}