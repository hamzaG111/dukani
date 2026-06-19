"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  category: string;
  badge?: string;
  stats?: string;
}

const integrations: Integration[] = [
  { id: "whatsapp",   name: "واتساب بيزنس",  description: "استقبل رسائل زبائنك وأرسل ردوداً ذكية مباشرةً من واتساب",  icon: "💬", connected: true,  category: "تواصل",    stats: "٢١٢ رسالة هذا الأسبوع" },
  { id: "instagram",  name: "انستغرام",       description: "رد على تعليقات ورسائل انستغرام بالذكاء الاصطناعي تلقائياً", icon: "📸", connected: true,  category: "تواصل",    stats: "٦٩ رسالة هذا الأسبوع" },
  { id: "facebook",   name: "فيسبوك ماسنجر", description: "تواصل مع زبائن فيسبوك بدون مغادرة لوحة دُكّاني",            icon: "📘", connected: false, category: "تواصل" },
  { id: "tiktok",     name: "تيك توك",        description: "حوّل متابعي تيك توك إلى زبائن بردود ذكية على التعليقات",    icon: "🎵", connected: false, category: "تواصل",    badge: "قريباً" },
  { id: "youcan",     name: "YouCan Shop",    description: "مزامنة منتجاتك وطلبياتك مع YouCan تلقائياً",               icon: "🛒", connected: false, category: "متاجر" },
  { id: "woocommerce",name: "WooCommerce",    description: "ربط متجر ووردبريس الخاص بك ومزامنة المخزون",               icon: "🟣", connected: false, category: "متاجر" },
  { id: "shopify",    name: "Shopify",        description: "ادمج دُكّاني مع متجر شوبيفاي في دقيقتين",                  icon: "🟢", connected: false, category: "متاجر",    badge: "جديد" },
  { id: "google",     name: "Google Analytics",description: "تتبع مصادر الزيارات وسلوك الزبائن بتفصيل كامل",           icon: "📊", connected: false, category: "تحليل" },
  { id: "mailchimp",  name: "Mailchimp",      description: "أرسل حملات بريدية تلقائية بناءً على سلوك زبائنك",          icon: "🐒", connected: false, category: "تسويق" },
  { id: "zapier",     name: "Zapier",         description: "اربط دُكّاني بأكثر من ٥٠٠٠ تطبيق عبر Zapier",             icon: "⚡", connected: false, category: "أتمتة",    badge: "قريباً" },
  { id: "stripe",     name: "Stripe",         description: "استقبل المدفوعات الإلكترونية مباشرة في محادثة واتساب",      icon: "💳", connected: false, category: "دفع" },
  { id: "cmimoney",   name: "CMI / HPS",      description: "الدفع الإلكتروني المغربي عبر بطاقات CMI و Visa / MC",     icon: "🏦", connected: false, category: "دفع",      badge: "قريباً" },
];

const categories = ["الكل", "تواصل", "متاجر", "دفع", "تحليل", "تسويق", "أتمتة"];

export default function IntegrationsPage() {
  const [list, setList]       = useState(integrations);
  const [cat, setCat]         = useState("الكل");
  const [connecting, setConn] = useState<string | null>(null);

  const toggle = (id: string) => {
    const item = list.find(i => i.id === id);
    if (item?.badge === "قريباً") return;
    setConn(id);
    setTimeout(() => {
      setList(prev => prev.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
      setConn(null);
    }, 1400);
  };

  const shown    = cat === "الكل" ? list : list.filter(i => i.category === cat);
  const connCount = list.filter(i => i.connected).length;

  return (
    <>
      <TopBar title="التكاملات" subtitle="اربط دُكّاني بجميع قنواتك وأدواتك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "متصل", value: connCount, icon: "🔗" },
            { label: "متاح للربط", value: list.filter(i => !i.connected && !i.badge).length, icon: "🔌" },
            { label: "قريباً", value: list.filter(i => i.badge === "قريباً").length, icon: "🚀" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border p-5 text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-gold font-black text-2xl">{s.value}</p>
              <p className="text-muted text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${cat === c ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Integrations grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {shown.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`glass rounded-2xl border p-5 transition-all ${item.connected ? "border-green-500/20 bg-green-500/3" : "border-border hover:border-gold/20"}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-foreground font-black text-sm">{item.name}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full border ${item.badge === "جديد" ? "text-blue-400 bg-blue-500/10 border-blue-500/20" : "text-muted bg-surface-2 border-border"}`}>
                        {item.badge}
                      </span>
                    )}
                    {item.connected && <span className="text-[10px] font-black text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full">● متصل</span>}
                  </div>
                  <p className="text-muted text-xs leading-relaxed mb-1">{item.description}</p>
                  {item.stats && <p className="text-gold text-xs font-bold">{item.stats}</p>}
                </div>
                <button
                  onClick={() => toggle(item.id)}
                  disabled={connecting === item.id || item.badge === "قريباً"}
                  className={`flex-shrink-0 text-xs font-black px-4 py-2 rounded-xl transition-all disabled:opacity-60 ${
                    item.connected
                      ? "glass border border-red-500/20 text-red-400 hover:bg-red-500/10"
                      : item.badge === "قريباً"
                      ? "glass border border-border text-muted cursor-default"
                      : "bg-gold-gradient text-background hover:shadow-gold"
                  }`}>
                  {connecting === item.id ? "..." : item.connected ? "فصل" : item.badge === "قريباً" ? "قريباً" : "ربط"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API hint */}
        <div className="glass-gold rounded-2xl border border-gold/20 p-5 flex items-center gap-4">
          <span className="text-3xl">🔑</span>
          <div className="flex-1">
            <p className="text-foreground font-bold">تكامل مخصص عبر API</p>
            <p className="text-muted text-sm">لا تجد التطبيق الذي تريده؟ استخدم API دُكّاني لبناء تكامل مخصص.</p>
          </div>
          <a href="/api-docs" className="text-xs font-black bg-gold/10 text-gold border border-gold/20 px-4 py-2 rounded-xl hover:bg-gold/20 transition-all">
            توثيق API
          </a>
        </div>
      </main>
    </>
  );
}
