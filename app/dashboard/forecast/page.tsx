"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"];

const actual = [12400, 14800, 11200, 16900, 19200, 22400, null, null, null, null, null, null];
const forecast = [null, null, null, null, null, 22400, 26800, 31200, 29400, 34600, 41200, 48000];

const scenarios = [
  {
    id: "conservative",
    label: "متحفظ",
    icon: "🛡️",
    yearEnd: "٢٨٠,٠٠٠",
    growth: "+٢٨٪",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-surface-2",
    border: "border-blue-500/20",
    assumptions: ["نمو ثابت ١٠٪/شهر", "الحفاظ على قاعدة الزبائن الحالية", "بدون حملات تسويقية جديدة"],
  },
  {
    id: "base",
    label: "الأساسي",
    icon: "⭐",
    yearEnd: "٣٩٥,٠٠٠",
    growth: "+٤٢٪",
    color: "text-gold",
    bg: "from-gold/15 to-surface-2",
    border: "border-gold/30",
    assumptions: ["نمو ٢٠٪/شهر مع دُكّاني", "حملتان ترويجيتان/شهر", "إضافة ٥ منتجات جديدة"],
    recommended: true,
  },
  {
    id: "optimistic",
    label: "متفائل",
    icon: "🚀",
    yearEnd: "٥٨٠,٠٠٠",
    growth: "+٦٥٪",
    color: "text-green-400",
    bg: "from-green-500/10 to-surface-2",
    border: "border-green-500/20",
    assumptions: ["نمو ٣٠٪/شهر", "توسع لمتاجر متعددة", "برنامج الإحالة النشط"],
  },
];

const aiTips = [
  { icon: "📅", title: "موسم رمضان", text: "يونيوز-يوليوز ٢٠٢٦ — متوقع ارتفاع ٦٠٪ في المبيعات. ابدأ حملاتك الآن!", urgent: true },
  { icon: "🎯", title: "فرصة: منتجات الشتاء", text: "أكتوبر-نونبر: الطلب على الملابس الشتوية يرتفع ٨٥٪. اضف جاكيت جديد قبل شتنبر." },
  { icon: "💡", title: "زيادة السعر بأمان", text: "بيانات السوق تشير أن زبائنك يقبلون زيادة ١٠-١٥٪ على منتجاتك المميزة." },
  { icon: "🔄", title: "تحسين معدل التحويل", text: "إضافة صور إضافية للمنتجات يرفع التحويل ٣٣٪ — أضف ٣ صور لكل منتج." },
];

const maxVal = Math.max(...[...actual, ...forecast].filter(Boolean) as number[]);

export default function ForecastPage() {
  const [scenario, setScenario] = useState("base");
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  return (
    <>
      <TopBar title="توقعات الإيرادات" subtitle="ذكاء اصطناعي يتنبأ بمستقبل متجرك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl">
        {/* Year forecast cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {scenarios.map(s => (
            <motion.button key={s.id} onClick={() => setScenario(s.id)}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`relative text-right p-5 rounded-2xl border transition-all ${scenario === s.id ? `bg-gradient-to-br ${s.bg} ${s.border}` : "glass border-border hover:border-gold/20"}`}>
              {s.recommended && (
                <span className="absolute -top-2.5 right-4 text-[10px] font-black bg-gold text-background px-2 py-0.5 rounded-full">مُوصى به</span>
              )}
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className={`font-black text-sm ${s.color}`}>{s.label}</p>
              <p className="text-foreground font-black text-xl mt-1">{s.yearEnd} د.م</p>
              <p className="text-muted text-xs">نهاية ٢٠٢٦ • {s.growth}</p>
              {scenario === s.id && <span className="absolute top-3 left-3 text-gold text-xs">✓</span>}
            </motion.button>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="glass rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground font-black">منحنى الإيرادات ٢٠٢٦</h3>
              <p className="text-muted text-xs">الفعلي vs التوقع</p>
            </div>
            <div className="flex gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gold inline-block" />فعلي</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gold/40 border border-gold/40 inline-block" />متوقع</span>
            </div>
          </div>

          <div className="flex items-end gap-1.5 h-44 mb-3">
            {months.map((month, i) => {
              const val = actual[i] ?? forecast[i];
              const isActual = actual[i] !== null;
              const isForecast = !isActual && forecast[i] !== null;
              if (!val) return <div key={i} className="flex-1" />;
              const height = (val / maxVal) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center relative group"
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}>
                  {hoveredMonth === i && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-12 bg-[#111] border border-border rounded-xl px-2.5 py-1.5 text-xs whitespace-nowrap z-10">
                      <p className="text-gold font-black">{val.toLocaleString("ar-MA")} د.م</p>
                      <p className="text-muted">{month}</p>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.04, duration: 0.5 }}
                    className={`w-full rounded-t-md cursor-pointer transition-opacity ${isActual ? "bg-gold" : isForecast ? "bg-gold/35 border border-gold/30 border-b-0" : "bg-transparent"}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex gap-1.5">
            {months.map((m, i) => (
              <span key={i} className="flex-1 text-center text-[9px] text-muted">{m.slice(0, 3)}</span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-surface-2 border border-border">
            <span className="text-xl">📍</span>
            <p className="text-muted text-xs">الآن: يونيوز ٢٠٢٦ • الخط المتقطع = توقع الذكاء الاصطناعي</p>
          </div>
        </div>

        {/* Scenario assumptions */}
        <div className="glass rounded-2xl border border-border p-5">
          <h3 className="text-foreground font-black mb-4">افتراضات السيناريو المختار</h3>
          <div className="space-y-2">
            {scenarios.find(s => s.id === scenario)?.assumptions.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-xs flex items-center justify-center font-black flex-shrink-0">{i + 1}</span>
                <p className="text-muted text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h3 className="text-foreground font-black mb-4">🤖 فرص لا تفوّت</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {aiTips.map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className={`glass rounded-2xl border p-5 hover:border-gold/25 transition-all ${tip.urgent ? "border-gold/30 bg-gold/5" : "border-border"}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-foreground font-black text-sm">{tip.title}</p>
                      {tip.urgent && <span className="text-[10px] font-black text-gold bg-gold/10 border border-gold/20 px-1.5 py-0.5 rounded-full">عاجل</span>}
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="glass-gold rounded-2xl border border-gold/20 p-5 flex items-center gap-4">
          <div className="text-3xl">🎯</div>
          <div className="flex-1">
            <p className="text-foreground font-bold">لتحقيق السيناريو الأساسي</p>
            <p className="text-muted text-sm">أكمل هذه الخطوات هذا الأسبوع</p>
          </div>
          <div className="flex gap-2">
            <a href="/dashboard/broadcast" className="text-xs font-bold bg-gold text-background px-3 py-1.5 rounded-xl">أطلق حملة</a>
            <a href="/dashboard/products" className="text-xs font-bold glass border border-border text-muted px-3 py-1.5 rounded-xl hover:text-foreground transition-all">أضف منتج</a>
          </div>
        </div>
      </main>
    </>
  );
}
