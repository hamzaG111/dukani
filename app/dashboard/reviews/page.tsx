"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const reviews = [
  { id: 1, customer: "فاطمة الزهراء", rating: 5, product: "جاكيت جلد الأطلس", text: "الجودة ممتازة والتوصيل كان سريع جداً. المساعد الذكي ساعدني في اختيار المقاس الصحيح 🔥", date: "منذ يوم", replied: false, channel: "واتساب" },
  { id: 2, customer: "كريم بنعلي", rating: 5, product: "عطر الورد المغربي", text: "رائحة رائعة وتدوم طويلاً. سأشتري مرة أخرى بالتأكيد", date: "منذ يومين", replied: true, channel: "انستغرام" },
  { id: 3, customer: "سناء المنصوري", rating: 4, product: "حذاء جلد بني", text: "الحذاء جميل لكن التوصيل تأخر يوم إضافي. بشكل عام تجربة ممتازة", date: "منذ 3 أيام", replied: true, channel: "واتساب" },
  { id: 4, customer: "يوسف الأمين", rating: 5, product: "حقيبة يد فاخرة", text: "هدية مثالية لزوجتي! الحقيبة أجمل من الصور وجودتها عالية جداً", date: "منذ أسبوع", replied: false, channel: "فيسبوك" },
  { id: 5, customer: "هند الرحالي", rating: 3, product: "شال كاشمير", text: "الشال جيد لكن اللون كان مختلف قليلاً عن الصورة. الخدمة كانت ممتازة", date: "منذ أسبوع", replied: false, channel: "واتساب" },
  { id: 6, customer: "أحمد رضا", rating: 5, product: "جاكيت جلد الأطلس", text: "أفضل متجر في المغرب! السعر معقول والجودة عالية. نصحت 3 أصدقاء", date: "منذ أسبوعين", replied: true, channel: "انستغرام" },
];

const stars = (n: number) => "⭐".repeat(n) + "☆".repeat(5 - n);
const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
const dist = [5,4,3,2,1].map(r => ({ r, count: reviews.filter(rv => rv.rating === r).length }));

export default function ReviewsPage() {
  const [filter, setFilter] = useState<number | "all">("all");
  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered = filter === "all" ? reviews : reviews.filter(r => r.rating === filter);

  return (
    <>
      <TopBar title="التقييمات" subtitle="ابنِ سمعتك بردود احترافية على كل تقييم" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl">
        {/* Summary */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass-gold rounded-2xl border border-gold/20 p-6">
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="text-6xl font-black text-gold">{avg}</p>
                <p className="text-yellow-400 text-lg">{"⭐".repeat(Math.round(parseFloat(avg)))}</p>
                <p className="text-muted text-xs mt-1">{reviews.length} تقييم</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {dist.map(d => (
                  <div key={d.r} className="flex items-center gap-2">
                    <span className="text-muted text-xs w-3">{d.r}</span>
                    <span className="text-yellow-400 text-xs">★</span>
                    <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(d.count / reviews.length) * 100}%` }}
                        transition={{ duration: 0.5, delay: (5 - d.r) * 0.1 }}
                        className="h-full bg-gold rounded-full" />
                    </div>
                    <span className="text-muted text-xs w-3">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "غير مُجاب", value: reviews.filter(r => !r.replied).length, icon: "📭", urgent: true },
              { label: "معدل الرد", value: `${Math.round((reviews.filter(r => r.replied).length / reviews.length) * 100)}٪`, icon: "💬" },
              { label: "5 نجوم", value: reviews.filter(r => r.rating === 5).length, icon: "🌟" },
              { label: "يحتاج تحسين", value: reviews.filter(r => r.rating <= 3).length, icon: "📈" },
            ].map((s, i) => (
              <div key={i} className={`glass rounded-2xl border p-4 ${s.urgent ? "border-yellow-500/30" : "border-border"}`}>
                <div className="text-xl mb-1">{s.icon}</div>
                <p className={`font-black text-2xl ${s.urgent ? "text-yellow-400" : "text-gold"}`}>{s.value}</p>
                <p className="text-muted text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === "all" ? "bg-gold text-background" : "glass border border-border text-muted"}`}>الكل</button>
          {[5,4,3,2,1].map(r => (
            <button key={r} onClick={() => setFilter(r)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === r ? "bg-gold text-background" : "glass border border-border text-muted"}`}>
              {r}★
            </button>
          ))}
        </div>

        {/* Reviews list */}
        <div className="space-y-4">
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl border border-border p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-sm font-black text-gold flex-shrink-0">
                  {r.customer[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="text-foreground font-black text-sm">{r.customer}</span>
                    <span className="text-yellow-400 text-sm">{stars(r.rating)}</span>
                    <span className="text-muted text-xs">{r.date}</span>
                    <span className="text-xs text-muted border border-border px-2 py-0.5 rounded-full">{r.channel}</span>
                    {r.replied
                      ? <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">✓ تم الرد</span>
                      : <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">بانتظار الرد</span>}
                  </div>
                  <p className="text-muted text-xs mb-1">منتج: <span className="text-foreground">{r.product}</span></p>
                  <p className="text-foreground text-sm leading-relaxed">{r.text}</p>

                  {!r.replied && replyId !== r.id && (
                    <button onClick={() => { setReplyId(r.id); setReplyText(""); }}
                      className="mt-3 text-xs font-bold text-gold hover:underline">رد الآن →</button>
                  )}

                  <AnimatePresence>
                    {replyId === r.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 space-y-2">
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={3}
                          placeholder="اكتب ردك هنا... مثال: شكراً جزيلاً على تقييمك الرائع! يسعدنا أنك راضٍ عن تجربتك 😊"
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40 resize-none" />
                        <div className="flex gap-2">
                          <button onClick={() => setReplyId(null)} className="px-4 py-2 rounded-xl text-xs font-bold glass border border-border text-muted">إلغاء</button>
                          <button onClick={() => setReplyId(null)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-gold-gradient text-background">إرسال الرد</button>
                          <button onClick={() => setReplyText("شكراً جزيلاً على تقييمك الرائع! يسعدنا أن تجربتك كانت ممتازة. نتمنى رؤيتك قريباً 😊🌟")}
                            className="px-4 py-2 rounded-xl text-xs font-bold border border-gold/20 text-gold hover:bg-gold/10 transition-all">🤖 رد ذكي</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}
