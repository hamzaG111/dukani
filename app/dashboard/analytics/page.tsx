"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const periods = ["اليوم", "7 أيام", "30 يوماً", "90 يوماً"];

const weeklyData = [
  { day: "الأحد", chats: 28, sales: 8, revenue: 2800 },
  { day: "الاثنين", chats: 42, sales: 14, revenue: 4900 },
  { day: "الثلاثاء", chats: 35, sales: 11, revenue: 3850 },
  { day: "الأربعاء", chats: 51, sales: 18, revenue: 6300 },
  { day: "الخميس", chats: 63, sales: 22, revenue: 7700 },
  { day: "الجمعة", chats: 78, sales: 28, revenue: 9800 },
  { day: "السبت", chats: 89, sales: 31, revenue: 10850 },
];

const topProducts = [
  { name: "جاكيت جلد الأطلس", sales: 34, revenue: 13260, trend: "+12%" },
  { name: "عطر الورد المغربي", sales: 28, revenue: 7840, trend: "+8%" },
  { name: "حذاء جلد بني", sales: 21, revenue: 5250, trend: "+23%" },
  { name: "شال كاشمير", sales: 18, revenue: 5400, trend: "-3%" },
  { name: "حقيبة يد فاخرة", sales: 12, revenue: 7200, trend: "+41%" },
];

const channelStats = [
  { channel: "واتساب", icon: "💬", pct: 68, chats: 212, color: "bg-green-500" },
  { channel: "انستغرام", icon: "📸", pct: 22, chats: 69, color: "bg-pink-500" },
  { channel: "فيسبوك", icon: "📘", pct: 7, chats: 22, color: "bg-blue-500" },
  { channel: "موقع الويب", icon: "🌐", pct: 3, chats: 9, color: "bg-purple-500" },
];

const aiInsights = [
  { icon: "📈", text: "أفضل وقت للرد هو بين 7ص و10ص — معدل تحويل 42٪ مقابل 21٪ في الأوقات الأخرى" },
  { icon: "🎯", text: "زبائن الدار البيضاء ينفقون 35٪ أكثر من المتوسط — استهدفهم بحملة مخصصة" },
  { icon: "🔥", text: "منتج الحقيبة اليدوية يرتفع بنسبة 41٪ — فكر في رفع السعر أو إضافة نموذج فاخر" },
  { icon: "⚠️", text: "8 زبائن لم يرتدوا منذ 30+ يوم — أرسل حملة إعادة تفاعل قبل أن تفقدهم" },
];

const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7 أيام");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <>
      <TopBar title="التحليلات" subtitle="فهم عميق لأداء متجرك وسلوك زبائنك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Period selector */}
        <div className="flex gap-2 flex-wrap">
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${period === p ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}>
              {p}
            </button>
          ))}
          <div className="mr-auto glass border border-border rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-muted text-xs">تصدير:</span>
            <button className="text-gold text-xs font-bold hover:underline">PDF</button>
            <span className="text-border">|</span>
            <button className="text-gold text-xs font-bold hover:underline">CSV</button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "إجمالي المحادثات", value: "312", change: "+28٪", up: true, icon: "💬" },
            { label: "مبيعات مغلقة", value: "89", change: "+16٪", up: true, icon: "✅" },
            { label: "الإيرادات", value: "46,150 د.م", change: "+34٪", up: true, icon: "💰" },
            { label: "معدل التحويل", value: "28.5٪", change: "-2٪", up: false, icon: "📊" },
          ].map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{k.icon}</span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${k.up ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
                  {k.change}
                </span>
              </div>
              <p className="text-gold font-black text-xl">{k.value}</p>
              <p className="text-muted text-xs">{k.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 glass rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-foreground font-black">الإيرادات اليومية</h3>
                <p className="text-muted text-xs">آخر 7 أيام</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1"><span className="w-3 h-1 bg-gold rounded-full inline-block" /> إيرادات</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-2 h-40 mb-2">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 relative group"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}>
                  {hoveredBar === i && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-14 bg-[#111] border border-border rounded-xl px-3 py-2 text-xs whitespace-nowrap z-10">
                      <p className="text-gold font-black">{d.revenue.toLocaleString("ar-MA")} د.م</p>
                      <p className="text-muted">{d.sales} مبيعة</p>
                    </motion.div>
                  )}
                  <div
                    className="w-full rounded-t-lg transition-all duration-200 cursor-pointer"
                    style={{
                      height: `${(d.revenue / maxRevenue) * 100}%`,
                      background: hoveredBar === i
                        ? "linear-gradient(to top, #C9A84C, #F0D080)"
                        : "linear-gradient(to top, #C9A84C40, #C9A84C80)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {weeklyData.map(d => (
                <span key={d.day} className="flex-1 text-center text-[10px] text-muted">{d.day.slice(0, 3)}</span>
              ))}
            </div>
          </div>

          {/* Channel breakdown */}
          <div className="glass rounded-2xl border border-border p-6">
            <h3 className="text-foreground font-black mb-1">مصادر المحادثات</h3>
            <p className="text-muted text-xs mb-5">توزيع القنوات هذا الأسبوع</p>
            <div className="space-y-4">
              {channelStats.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground flex items-center gap-2">
                      <span>{c.icon}</span> {c.channel}
                    </span>
                    <span className="text-gold text-xs font-black">{c.pct}٪</span>
                  </div>
                  <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className={`h-full rounded-full ${c.color}`}
                    />
                  </div>
                  <p className="text-muted text-xs mt-0.5">{c.chats} محادثة</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top products */}
          <div className="glass rounded-2xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-foreground font-black">أفضل المنتجات مبيعاً</h3>
            </div>
            <div className="divide-y divide-border">
              {topProducts.map((p, i) => (
                <div key={i} className="p-4 flex items-center gap-3 hover:bg-surface-2 transition-colors">
                  <span className="text-muted text-xs w-5 text-center font-black">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-bold">{p.name}</p>
                    <p className="text-muted text-xs">{p.sales} وحدة مباعة</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gold font-black text-sm">{p.revenue.toLocaleString("ar-MA")} د.م</p>
                    <span className={`text-xs font-bold ${p.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {p.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="glass rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="text-foreground font-black">رؤى الذكاء الاصطناعي</h3>
                <p className="text-muted text-xs">توصيات مخصصة لمتجرك</p>
              </div>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex gap-3 p-3 rounded-xl bg-surface-2 border border-border hover:border-gold/20 transition-colors">
                  <span className="text-xl flex-shrink-0 mt-0.5">{insight.icon}</span>
                  <p className="text-muted text-sm leading-relaxed">{insight.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Funnel */}
        <div className="glass rounded-2xl border border-border p-6">
          <h3 className="text-foreground font-black mb-6">قمع المبيعات</h3>
          <div className="flex items-end gap-3">
            {[
              { label: "بدأوا محادثة", value: 312, pct: 100, color: "bg-blue-500/60" },
              { label: "أبدوا اهتماماً", value: 218, pct: 70, color: "bg-purple-500/60" },
              { label: "طلبوا السعر", value: 156, pct: 50, color: "bg-gold/60" },
              { label: "أضافوا للسلة", value: 112, pct: 36, color: "bg-orange-500/60" },
              { label: "أكملوا الشراء", value: 89, pct: 29, color: "bg-green-500/60" },
            ].map((stage, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <p className="text-foreground font-black text-sm">{stage.value}</p>
                <motion.div
                  className={`w-full rounded-t-xl ${stage.color}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${stage.pct * 1.6}px` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                />
                <p className="text-muted text-[10px] text-center leading-tight">{stage.label}</p>
                <p className="text-gold text-xs font-black">{stage.pct}٪</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
