"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const pastCampaigns = [
  { name: "عرض العيد الكبير 🎉", sent: 127, opened: 89, converted: 34, revenue: 9860, date: "١٤ يونيو ٢٠٢٦", status: "اكتملت" },
  { name: "إعادة استهداف الغائبين", sent: 43, opened: 31, converted: 12, revenue: 3240, date: "٨ يونيو ٢٠٢٦", status: "اكتملت" },
  { name: "منتجات جديدة — صيف ٢٠٢٦", sent: 92, opened: 67, converted: 28, revenue: 7560, date: "١ يونيو ٢٠٢٦", status: "اكتملت" },
];

const templates = [
  { id: "promo", icon: "🔥", name: "عرض ترويجي", preview: "السلام {اسم}! عندنا عرض خاص ليك اليوم فقط 🎁 احصل على {خصم} على {منتج}..." },
  { id: "winback", icon: "💝", name: "استعادة عميل", preview: "مرحباً {اسم}، وحشتنا! وصلنا جديد كاين يناسبك. ألق نظرة على مجموعتنا الجديدة..." },
  { id: "new-product", icon: "✨", name: "منتج جديد", preview: "خبر رائع {اسم}! وصلنا منتج جديد كنتي تبحث عنه: {منتج} بسعر {سعر} فقط..." },
  { id: "review", icon: "⭐", name: "طلب تقييم", preview: "شكراً {اسم} على طلبك! كيف كانت تجربتك؟ أي كلمة منك تسعدنا..." },
];

function CampaignComposer({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [message, setMessage] = useState(templates[0].preview);
  const [audience, setAudience] = useState("الكل");
  const [scheduled, setScheduled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#141414] border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-foreground font-black text-xl">حملة جديدة 📤</h2>
            <p className="text-muted text-sm">الخطوة {step} من ٣</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground text-2xl">×</button>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 px-6 pt-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= step ? "bg-gold" : "bg-border"}`} />
          ))}
        </div>

        <div className="p-6 space-y-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-foreground font-black mb-4">اختر قالباً</h3>
              <div className="space-y-3">
                {templates.map(t => (
                  <div
                    key={t.id}
                    onClick={() => { setSelectedTemplate(t); setMessage(t.preview); }}
                    className={`glass rounded-2xl border p-4 cursor-pointer transition-all ${selectedTemplate.id === t.id ? "border-gold/40 bg-gold/5" : "border-border hover:border-gold/20"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{t.icon}</span>
                      <p className="text-foreground font-bold text-sm">{t.name}</p>
                      {selectedTemplate.id === t.id && <span className="mr-auto text-gold text-xs">✓ مختار</span>}
                    </div>
                    <p className="text-muted text-xs leading-relaxed truncate">{t.preview}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div>
                <h3 className="text-foreground font-black mb-4">اكتب الرسالة</h3>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold/40 resize-none"
                />
                <p className="text-muted text-xs mt-2">
                  المتغيرات المتاحة: <span className="text-gold">{"{اسم}"}</span> · <span className="text-gold">{"{منتج}"}</span> · <span className="text-gold">{"{خصم}"}</span> · <span className="text-gold">{"{سعر}"}</span>
                </p>
              </div>

              <div>
                <p className="text-foreground font-semibold text-sm mb-2">الجمهور المستهدف</p>
                <div className="grid grid-cols-2 gap-2">
                  {["الكل", "VIP", "الغائبون (٧+ أيام)", "الجدد فقط"].map(a => (
                    <button
                      key={a}
                      onClick={() => setAudience(a)}
                      className={`text-sm py-2 rounded-xl font-semibold transition-all ${audience === a ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h3 className="text-foreground font-black">مراجعة وإرسال</h3>
              <div className="glass rounded-2xl border border-border p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">القالب</span>
                  <span className="text-foreground font-semibold">{selectedTemplate.icon} {selectedTemplate.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">الجمهور</span>
                  <span className="text-foreground font-semibold">{audience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">عدد المستلمين المتوقع</span>
                  <span className="text-gold font-black">
                    {audience === "الكل" ? "١٢٧" : audience === "VIP" ? "٣٢" : audience === "الغائبون (٧+ أيام)" ? "٤٣" : "١٨"} عميل
                  </span>
                </div>
              </div>

              <div>
                <p className="text-foreground font-semibold text-sm mb-3">توقيت الإرسال</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setScheduled(false)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${!scheduled ? "bg-gold text-background" : "glass border border-border text-muted"}`}
                  >
                    ⚡ الآن فوراً
                  </button>
                  <button
                    onClick={() => setScheduled(true)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${scheduled ? "bg-gold text-background" : "glass border border-border text-muted"}`}
                  >
                    🕐 جدولة
                  </button>
                </div>
                {scheduled && (
                  <input type="datetime-local" className="mt-3 w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none" />
                )}
              </div>

              <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-4">
                <p className="text-green-400 text-sm font-semibold">🎯 التوقعات بالذكاء الاصطناعي</p>
                <p className="text-muted text-xs mt-1">
                  بناءً على حملاتك السابقة، نتوقع معدل فتح ٧٠٪ ومعدل تحويل ٢٧٪ — أي حوالي ٣٤ طلب جديد
                </p>
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 glass border border-border text-foreground font-bold py-3 rounded-xl hover:border-gold/20 transition-all"
              >
                ← رجوع
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(s => s + 1) : onClose()}
              className="flex-1 bg-gold-gradient text-background font-black py-3 rounded-xl hover:shadow-gold transition-all"
            >
              {step === 3 ? "🚀 إرسال الحملة!" : "التالي →"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CampaignsPage() {
  const [showComposer, setShowComposer] = useState(false);

  const totalRevenue = pastCampaigns.reduce((s, c) => s + c.revenue, 0);
  const totalConverted = pastCampaigns.reduce((s, c) => s + c.converted, 0);

  return (
    <>
      <TopBar title="الحملات" subtitle="بث رسائل مخصصة لعملائك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "حملات منجزة", value: pastCampaigns.length, icon: "📤", color: "text-foreground" },
            { label: "إجمالي المرسل", value: "٢٦٢", icon: "👥", color: "text-blue-400" },
            { label: "طلبات محولة", value: totalConverted, icon: "🛒", color: "text-green-400" },
            { label: "إيرادات الحملات", value: `${totalRevenue.toLocaleString("ar-MA")} د.م`, icon: "💰", color: "text-gold" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass rounded-2xl border border-border p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-muted text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* New campaign CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-gold rounded-3xl border border-gold/25 p-6 flex items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-foreground font-black text-lg">أطلق حملة جديدة 🚀</h3>
            <p className="text-muted text-sm mt-1">أرسل رسائل مخصصة لعملائك وراقب النتائج مباشرة</p>
          </div>
          <button
            onClick={() => setShowComposer(true)}
            className="bg-gold-gradient text-background font-black px-6 py-3 rounded-2xl hover:shadow-gold transition-all flex-shrink-0"
          >
            + حملة جديدة
          </button>
        </motion.div>

        {/* Campaign history */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-3xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-foreground font-black">سجل الحملات</h3>
          </div>
          {pastCampaigns.map((campaign, i) => (
            <div key={i} className="p-5 border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-foreground font-bold">{campaign.name}</p>
                  <p className="text-muted text-xs">{campaign.date}</p>
                </div>
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full font-semibold">{campaign.status}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "مُرسل", value: campaign.sent, color: "text-foreground" },
                  { label: "فُتح", value: `${Math.round((campaign.opened / campaign.sent) * 100)}٪`, color: "text-blue-400" },
                  { label: "محوّل", value: campaign.converted, color: "text-green-400" },
                  { label: "إيراد", value: `${campaign.revenue.toLocaleString("ar-MA")} د.م`, color: "text-gold" },
                ].map((s, j) => (
                  <div key={j} className="text-center bg-surface-2 rounded-xl p-2">
                    <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
                    <p className="text-muted text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {showComposer && <CampaignComposer onClose={() => setShowComposer(false)} />}
      </AnimatePresence>
    </>
  );
}
