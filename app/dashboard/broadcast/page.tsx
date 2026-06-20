"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const templates = [
  {
    id: "welcome",
    label: "ترحيب بالزبون الجديد",
    icon: "👋",
    text: "مرحباً {الاسم}! شكراً على تواصلك مع {المتجر}. كيف يمكنني مساعدتك اليوم؟ 😊",
    tags: ["ترحيب", "أتمتة"],
  },
  {
    id: "promo",
    label: "عرض ترويجي",
    icon: "🔥",
    text: "🎉 خبر رائع {الاسم}! عندنا تخفيض {٪} على جميع المنتجات اليوم فقط. لا تفوّت الفرصة! 🛒",
    tags: ["ترويج", "FOMO"],
  },
  {
    id: "followup",
    label: "متابعة بعد الشراء",
    icon: "📦",
    text: "مرحباً {الاسم}، وصل طلبك؟ 📦 نتمنى يعجبك! إذا عندك أي سؤال أنا هنا. ⭐",
    tags: ["متابعة", "ولاء"],
  },
  {
    id: "abandoned",
    label: "استرداد السلة المتروكة",
    icon: "🛒",
    text: "مرحباً {الاسم}! لاحظنا أنك شفت {المنتج} ولم تكمل الشراء. هل تحتاج مساعدة؟ 🤝",
    tags: ["استرداد", "تحويل"],
  },
  {
    id: "birthday",
    label: "تهنئة عيد الميلاد",
    icon: "🎂",
    text: "كل عام وأنت بخير {الاسم}! 🎂 هدية منا بمناسبة عيد ميلادك: كود {BDAY20} خصم 20٪ 🎁",
    tags: ["ولاء", "شخصي"],
  },
  {
    id: "reengagement",
    label: "إعادة تفاعل الزبائن",
    icon: "💌",
    text: "وحشتنا {الاسم}! 💌 مرت فترة منذ آخر زيارتك. عندنا منتجات جديدة قد تعجبك 👀",
    tags: ["إعادة تفاعل"],
  },
];

const segments = [
  { id: "all", label: "كل الزبائن", count: 312, icon: "👥" },
  { id: "vip", label: "VIP", count: 47, icon: "💎" },
  { id: "active", label: "نشطون (7 أيام)", count: 128, icon: "🔥" },
  { id: "inactive", label: "غير نشطين (30+ يوم)", count: 89, icon: "😴" },
  { id: "new", label: "زبائن جدد", count: 48, icon: "✨" },
];

const history = [
  { name: "حملة رمضان 2026", sent: 289, opened: 231, replied: 94, date: "15 مارس", status: "مكتملة" },
  { name: "عيد الأضحى — عرض خاص", sent: 156, opened: 134, replied: 61, date: "28 مارس", status: "مكتملة" },
  { name: "منتج جديد: حقيبة يد فاخرة", sent: 200, opened: 178, replied: 89, date: "5 أبريل", status: "مكتملة" },
];

export default function BroadcastPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState("");
  const [customMsg, setCustomMsg] = useState("");
  const [segment, setSegment] = useState("all");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState<"compose" | "history">("compose");

  const selectedTemplate = templates.find(t => t.id === selected);
  const selectedSegment = segments.find(s => s.id === segment);
  const messageText = customMsg || selectedTemplate?.text || "";

  const handleSend = () => {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 2000);
  };

  return (
    <>
      <TopBar title="البث الجماعي" subtitle="أرسل رسائل مستهدفة لزبائنك بنقرة واحدة" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-2">
          {[{ id: "compose", label: "إنشاء حملة" }, { id: "history", label: "سجل الحملات" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as "compose" | "history")}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${tab === t.id ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "history" ? (
            <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="glass rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-foreground font-black">الحملات السابقة</h3>
              </div>
              <div className="divide-y divide-border">
                {history.map((h, i) => (
                  <div key={i} className="p-4 hover:bg-surface-2 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-foreground font-bold">{h.name}</p>
                        <p className="text-muted text-xs">{h.date}</p>
                      </div>
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                        {h.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "أُرسلت", value: h.sent, icon: "📤" },
                        { label: "فُتحت", value: h.opened, icon: "👁", pct: Math.round((h.opened / h.sent) * 100) },
                        { label: "ردّوا", value: h.replied, icon: "💬", pct: Math.round((h.replied / h.sent) * 100) },
                      ].map((s, j) => (
                        <div key={j} className="text-center bg-surface-2 rounded-xl p-3">
                          <p className="text-lg mb-1">{s.icon}</p>
                          <p className="text-foreground font-black">{s.value}</p>
                          <p className="text-muted text-xs">{s.label}{s.pct ? ` (${s.pct}٪)` : ""}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : sent ? (
            <motion.div key="sent" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="glass-gold rounded-3xl border border-gold/30 p-12 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-black text-foreground mb-2">تم إرسال الحملة!</h3>
              <p className="text-muted mb-2">تم إرسال الرسالة إلى <span className="text-gold font-black">{selectedSegment?.count}</span> زبون</p>
              <p className="text-muted text-sm">ستصل الردود تدريجياً في قسم المحادثات</p>
              <button onClick={() => { setSent(false); setStep(1); setSelected(""); setCustomMsg(""); }}
                className="mt-6 bg-gold-gradient text-background font-black px-8 py-3 rounded-2xl">
                حملة جديدة
              </button>
            </motion.div>
          ) : (
            <motion.div key="compose" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center gap-3">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? "bg-gold text-background" : "glass border border-border text-muted"}`}>
                      {step > s ? "✓" : s}
                    </div>
                    <span className={`text-sm ${step === s ? "text-foreground font-bold" : "text-muted"}`}>
                      {s === 1 ? "القالب" : s === 2 ? "الجمهور" : "المراجعة"}
                    </span>
                    {s < 3 && <span className="text-border mx-1">→</span>}
                  </div>
                ))}
              </div>

              {/* Step 1: Template */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="text-foreground font-black">اختر قالب الرسالة</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {templates.map(t => (
                      <button key={t.id} onClick={() => setSelected(t.id)}
                        className={`text-right p-4 rounded-2xl border transition-all ${selected === t.id ? "border-gold/40 bg-gold/10" : "glass border-border hover:border-gold/20"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{t.icon}</span>
                          <span className="text-foreground font-bold text-sm">{t.label}</span>
                          {selected === t.id && <span className="mr-auto text-gold text-xs">✓</span>}
                        </div>
                        <p className="text-muted text-xs line-clamp-2 mb-2">{t.text}</p>
                        <div className="flex gap-1">
                          {t.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-surface-2 border border-border text-muted px-1.5 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="glass rounded-2xl border border-border p-4">
                    <p className="text-foreground font-bold text-sm mb-2">أو اكتب رسالتك الخاصة</p>
                    <textarea
                      value={customMsg}
                      onChange={e => { setCustomMsg(e.target.value); setSelected(""); }}
                      placeholder="اكتب رسالتك هنا... يمكنك استخدام {الاسم} لتخصيص الرسالة"
                      rows={4}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40 resize-none"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-muted text-xs">{customMsg.length}/1000 حرف</span>
                      <span className="text-muted text-xs">واتساب يدعم حتى 1600 حرف</span>
                    </div>
                  </div>

                  <button disabled={!selected && !customMsg}
                    onClick={() => setStep(2)}
                    className="w-full bg-gold-gradient text-background font-black py-4 rounded-2xl disabled:opacity-40 transition-all hover:shadow-gold">
                    التالي: اختر الجمهور →
                  </button>
                </motion.div>
              )}

              {/* Step 2: Audience */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="text-foreground font-black">اختر الجمهور المستهدف</h3>
                  <div className="space-y-3">
                    {segments.map(seg => (
                      <button key={seg.id} onClick={() => setSegment(seg.id)}
                        className={`w-full text-right flex items-center gap-4 p-4 rounded-2xl border transition-all ${segment === seg.id ? "border-gold/40 bg-gold/10" : "glass border-border hover:border-gold/20"}`}>
                        <span className="text-2xl">{seg.icon}</span>
                        <div className="flex-1">
                          <p className="text-foreground font-bold">{seg.label}</p>
                          <p className="text-muted text-sm">{seg.count} جهة اتصال</p>
                        </div>
                        {segment === seg.id && <span className="text-gold text-lg">✓</span>}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 glass border border-border text-muted py-4 rounded-2xl font-bold hover:text-foreground transition-all">
                      → رجوع
                    </button>
                    <button onClick={() => setStep(3)} className="flex-1 bg-gold-gradient text-background font-black py-4 rounded-2xl hover:shadow-gold transition-all">
                      مراجعة الحملة ←
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="text-foreground font-black">مراجعة قبل الإرسال</h3>

                  <div className="glass rounded-2xl border border-border p-5 space-y-4">
                    <div>
                      <p className="text-muted text-xs mb-1">الرسالة</p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="text-foreground text-sm leading-relaxed">{messageText}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted text-xs mb-1">الجمهور</p>
                        <p className="text-foreground font-bold">{selectedSegment?.label}</p>
                        <p className="text-gold text-sm font-black">{selectedSegment?.count} جهة اتصال</p>
                      </div>
                      <div>
                        <p className="text-muted text-xs mb-1">التوقيت</p>
                        <p className="text-foreground font-bold">فوري</p>
                        <p className="text-muted text-xs">الآن مباشرة</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-gold rounded-2xl border border-gold/20 p-4 flex items-center gap-3">
                    <span className="text-2xl">💡</span>
                    <p className="text-muted text-sm">أفضل وقت للإرسال هو بين 9ص و11ص — معدل فتح أعلى بـ40٪</p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 glass border border-border text-muted py-4 rounded-2xl font-bold hover:text-foreground transition-all">
                      → رجوع
                    </button>
                    <button onClick={handleSend} disabled={sending}
                      className="flex-1 bg-gold-gradient text-background font-black py-4 rounded-2xl hover:shadow-gold transition-all disabled:opacity-70">
                      {sending ? "جاري الإرسال..." : `إرسال لـ ${selectedSegment?.count} زبون 🚀`}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
