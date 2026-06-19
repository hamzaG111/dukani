"use client";

import { motion } from "framer-motion";

const solutions = [
  {
    before: "رسائل بلا رد تضيع في الليل",
    after: "مساعد يرد فوراً ٢٤/٧ — حتى وأنت نائم",
    icon: "💬",
  },
  {
    before: "لا وقت لإعداد أداة معقدة",
    after: "إعداد في ٥ دقائق، بالدارجة، بدون خبرة",
    icon: "⚡",
  },
  {
    before: "عملاء يتركون بدون شراء",
    after: "مساعد يقترح ويقود نحو البيع بذكاء",
    icon: "🎯",
  },
  {
    before: "لا تعرف ماذا يريد عملاؤك",
    after: "تحليلات واضحة تريك كل شيء",
    icon: "📊",
  },
];

export default function Solution() {
  return (
    <section className="py-24 relative bg-surface-2">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">الحل</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            من المشكلة إلى الحل
            <br />
            <span className="text-gold-gradient">مع دُكّاني</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            كل مشكلة تواجهها كتاجر، دُكّاني صُمِّم خصيصاً لحلها
          </p>
        </motion.div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {solutions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center"
            >
              {/* Before */}
              <div className="glass rounded-2xl p-5 border border-red-500/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-muted text-sm">{item.before}</p>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">{item.icon}</span>
                <svg className="w-5 h-5 text-gold md:rotate-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* After */}
              <div className="glass-gold rounded-2xl p-5 border border-gold/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-foreground text-sm font-medium">{item.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
