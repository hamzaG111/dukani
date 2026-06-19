"use client";

import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const weekData = [
  { day: "الأحد", chats: 12, sales: 4 },
  { day: "الإثنين", chats: 19, sales: 7 },
  { day: "الثلاثاء", chats: 8, sales: 2 },
  { day: "الأربعاء", chats: 24, sales: 9 },
  { day: "الخميس", chats: 31, sales: 13 },
  { day: "الجمعة", chats: 28, sales: 11 },
  { day: "السبت", chats: 22, sales: 8 },
];
const maxChats = Math.max(...weekData.map((d) => d.chats));

const topQuestions = [
  { q: "كم السعر؟", count: 87 },
  { q: "واش كاين التوصيل؟", count: 64 },
  { q: "المقاسات المتوفرة؟", count: 51 },
  { q: "كيفاش نطلب؟", count: 43 },
  { q: "عندكم خصم؟", count: 38 },
];

const insights = [
  { icon: "🔥", text: "أوج النشاط يكون بين ٧م و١٠م — تأكد من توفر المنتجات في هذا الوقت", type: "info" },
  { icon: "💡", text: "٦٤ عميل سأل عن التوصيل — فكّر في إضافة خدمة توصيل أو توضيح السياسة", type: "suggestion" },
  { icon: "⚠️", text: "منتج 'جبادور أسود مقاس ٤٤' طُلب ٩ مرات لكنه غير موجود — أضفه!", type: "alert" },
  { icon: "✅", text: "نسبة التحويل من محادثة إلى طلب ٣٦٪ — أعلى من المعدل بـ١٢٪", type: "success" },
];

export default function AnalyticsPage() {
  return (
    <>
      <TopBar title="التحليلات" subtitle="آخر ٧ أيام" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "إجمالي المحادثات", value: "١٤٤", change: "+٢٢٪", icon: "💬", up: true },
            { label: "فرص بيع", value: "٥٤", change: "+١٨٪", icon: "🎯", up: true },
            { label: "متوسط وقت الرد", value: "١.٢ث", change: "-٠.٣ث", icon: "⚡", up: true },
            { label: "تقييم العملاء", value: "٤.٩", change: "٥ تقييمات", icon: "⭐", up: null },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-3xl border border-border p-5"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <p className="text-3xl font-black text-foreground mb-1">{s.value}</p>
              <p className="text-muted text-sm">{s.label}</p>
              <p className={`text-xs font-semibold mt-1 ${s.up === true ? "text-green-400" : s.up === false ? "text-red-400" : "text-muted"}`}>
                {s.change}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass rounded-3xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground font-black">نشاط المحادثات</h3>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-gold" />محادثات
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-green-500/60" />طلبات
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3 h-40">
              {weekData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex flex-col items-center gap-1 relative h-32">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.chats / maxChats) * 100}%` }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
                      className="w-full bg-gold/25 rounded-t-lg absolute bottom-0 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.sales / d.chats) * 100}%` }}
                        transition={{ delay: i * 0.06 + 0.3, duration: 0.4 }}
                        className="w-full bg-green-500/50 rounded-t-lg absolute bottom-0"
                      />
                    </motion.div>
                  </div>
                  <span className="text-muted text-xs">{d.day.slice(0, 2)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-3xl border border-border p-6"
          >
            <h3 className="text-foreground font-black mb-5">أكثر الأسئلة</h3>
            <div className="space-y-4">
              {topQuestions.map((q, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-foreground text-xs font-semibold">{q.q}</span>
                    <span className="text-gold text-xs font-bold">{q.count}</span>
                  </div>
                  <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(q.count / 87) * 100}%` }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="h-full bg-gold-gradient-h rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center text-xl">🧠</div>
            <div>
              <h3 className="text-foreground font-black">الذكاء البيعي — رؤى وتوصيات</h3>
              <p className="text-muted text-xs">مبنية على تحليل محادثات متجرك</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {insights.map((ins, i) => {
              const colors = {
                info: "border-blue-500/20 bg-blue-500/5",
                suggestion: "border-gold/20 bg-gold/5",
                alert: "border-red-500/20 bg-red-500/5",
                success: "border-green-500/20 bg-green-500/5",
              };
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className={`rounded-2xl border p-4 flex items-start gap-3 ${colors[ins.type as keyof typeof colors]}`}
                >
                  <span className="text-xl flex-shrink-0">{ins.icon}</span>
                  <p className="text-foreground/80 text-sm leading-relaxed">{ins.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </>
  );
}
