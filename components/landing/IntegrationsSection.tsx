"use client";

import { motion } from "framer-motion";

const integrations = [
  { name: "واتساب", icon: "💬", color: "bg-[#25D366]/10 border-[#25D366]/20 text-[#25D366]", description: "ربط تلقائي مع رسائل واتساب" },
  { name: "انستغرام", icon: "📸", color: "bg-pink-500/10 border-pink-500/20 text-pink-400", description: "رد على DMs انستغرام تلقائياً" },
  { name: "فيسبوك", icon: "👥", color: "bg-blue-600/10 border-blue-600/20 text-blue-400", description: "Messenger وتعليقات الصفحة" },
  { name: "تيك توك", icon: "🎵", color: "bg-red-500/10 border-red-500/20 text-red-400", description: "رسائل TikTok Shop" },
  { name: "تيليغرام", icon: "✈️", color: "bg-sky-500/10 border-sky-500/20 text-sky-400", description: "بوت تيليغرام خاص بمتجرك" },
  { name: "WooCommerce", icon: "🛒", color: "bg-purple-500/10 border-purple-500/20 text-purple-400", description: "مزامنة المنتجات تلقائياً" },
  { name: "Shopify", icon: "🏪", color: "bg-green-500/10 border-green-500/20 text-green-400", description: "استيراد كتالوج Shopify" },
  { name: "Youcan", icon: "🇲🇦", color: "bg-gold/10 border-gold/20 text-gold", description: "تكامل مع YouCan المغربية" },
];

const stats = [
  { value: "٨+", label: "منصة مربوطة" },
  { value: "٢ دقيقة", label: "وقت الإعداد" },
  { value: "٩٩.٩٪", label: "وقت التشغيل" },
  { value: "٠", label: "كود مطلوب" },
];

export default function IntegrationsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">التكاملات</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            يعمل مع كل أدواتك
            <br /><span className="text-gold-gradient">بدون تعقيد</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            وصّل دُكّاني بقنواتك المفضلة في دقيقتين — بدون كود، بدون خبرة تقنية
          </p>
        </motion.div>

        {/* Center graphic */}
        <div className="relative flex items-center justify-center mb-12">
          {/* Dukani center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 w-20 h-20 rounded-3xl bg-gold-gradient flex items-center justify-center shadow-gold"
          >
            <span className="text-background font-black text-3xl">د</span>
          </motion.div>

          {/* Pulse rings */}
          <div className="absolute w-20 h-20 rounded-3xl bg-gold/20 animate-ping opacity-30" />
          <div className="absolute w-36 h-36 rounded-full border border-gold/10" />
          <div className="absolute w-56 h-56 rounded-full border border-gold/6" />
          <div className="absolute w-80 h-80 rounded-full border border-gold/4" />

          {/* Orbiting integration icons */}
          {integrations.slice(0, 6).map((intg, i) => {
            const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
            const radius = 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={intg.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="absolute"
              >
                <div className={`w-12 h-12 rounded-2xl border ${intg.color} flex items-center justify-center text-xl backdrop-blur-sm`}>
                  {intg.icon}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Integration cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {integrations.map((intg, i) => (
            <motion.div
              key={intg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`glass rounded-2xl border p-4 flex flex-col items-center text-center gap-2 hover:scale-105 transition-transform cursor-default ${intg.color}`}
            >
              <span className="text-2xl">{intg.icon}</span>
              <p className="font-black text-sm">{intg.name}</p>
              <p className="text-muted text-xs leading-tight">{intg.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-black text-gold-gradient mb-1">{s.value}</p>
              <p className="text-muted text-xs">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
