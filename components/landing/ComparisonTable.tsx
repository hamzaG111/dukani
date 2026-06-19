"use client";

import { motion } from "framer-motion";

const features = [
  { label: "يتكلم الدارجة المغربية", dukani: true, intercom: false, tidio: false, whatsapp: false },
  { label: "إعداد في أقل من ٥ دقائق", dukani: true, intercom: false, tidio: false, whatsapp: true },
  { label: "ذكاء اصطناعي يبيع بدلاً عنك", dukani: true, intercom: "جزئياً", tidio: "جزئياً", whatsapp: false },
  { label: "عرض بطاقات منتجات في الشات", dukani: true, intercom: false, tidio: false, whatsapp: false },
  { label: "تحليلات ذكية للمبيعات", dukani: true, intercom: true, tidio: "جزئياً", whatsapp: false },
  { label: "واجهة عربية RTL حقيقية", dukani: true, intercom: false, tidio: false, whatsapp: true },
  { label: "رابط شات + QR Code جاهز", dukani: true, intercom: false, tidio: false, whatsapp: false },
  { label: "سعر يناسب التاجر العربي", dukani: true, intercom: false, tidio: "جزئياً", whatsapp: true },
  { label: "تحويل مباشر لواتساب", dukani: true, intercom: false, tidio: false, whatsapp: true },
  { label: "دعم باللغة العربية", dukani: true, intercom: false, tidio: false, whatsapp: false },
];

const columns = [
  { id: "dukani", name: "دُكّاني", logo: "د", color: "bg-gold-gradient", highlight: true },
  { id: "intercom", name: "Intercom", logo: "I", color: "bg-blue-600" },
  { id: "tidio", name: "Tidio", logo: "T", color: "bg-purple-600" },
  { id: "whatsapp", name: "واتساب فقط", logo: "W", color: "bg-[#25D366]" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <span className="text-green-400 text-xl">✓</span>;
  if (value === false) return <span className="text-red-400/60 text-xl">✕</span>;
  return <span className="text-gold text-xs font-semibold bg-gold/10 px-2 py-0.5 rounded-full">جزئياً</span>;
}

export default function ComparisonTable() {
  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">المقارنة</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            لماذا التجار يتركون الأدوات الأجنبية
            <br /><span className="text-gold-gradient">ويختارون دُكّاني؟</span>
          </h2>
          <p className="text-muted text-lg">لأننا بنينا ما بنوه — لكن للتاجر العربي تحديداً</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-5 border-b border-border">
            <div className="p-4 border-l border-border" />
            {columns.map((col) => (
              <div
                key={col.id}
                className={`p-4 text-center border-l border-border ${col.highlight ? "bg-gold/5" : ""}`}
              >
                {col.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient-h" />}
                <div className={`w-9 h-9 rounded-xl ${col.color} flex items-center justify-center mx-auto mb-2 text-white font-black text-sm`}>
                  {col.logo}
                </div>
                <p className={`text-sm font-black ${col.highlight ? "text-gold" : "text-muted"}`}>{col.name}</p>
                {col.highlight && (
                  <span className="text-[10px] text-gold/60 font-semibold">الأفضل</span>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`grid grid-cols-5 border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-surface/30"}`}
            >
              <div className="p-4 border-l border-border">
                <span className="text-foreground/80 text-sm">{feature.label}</span>
              </div>
              {columns.map((col) => (
                <div
                  key={col.id}
                  className={`p-4 border-l border-border flex items-center justify-center ${col.highlight ? "bg-gold/5" : ""}`}
                >
                  <Cell value={feature[col.id as keyof typeof feature] as boolean | string} />
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Score summary */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { name: "دُكّاني", score: 10, color: "text-gold", bg: "bg-gold/10 border-gold/30" },
            { name: "Intercom", score: 4, color: "text-muted", bg: "bg-surface border-border" },
            { name: "Tidio", score: 3, color: "text-muted", bg: "bg-surface border-border" },
            { name: "واتساب", score: 4, color: "text-muted", bg: "bg-surface border-border" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl border p-4 text-center ${s.bg}`}
            >
              <p className="text-muted text-xs mb-2">{s.name}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.score}/١٠</p>
              <div className="mt-2 h-1 bg-surface rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${i === 0 ? "bg-gold" : "bg-muted/30"}`} style={{ width: `${s.score * 10}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
