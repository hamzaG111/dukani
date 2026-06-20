"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "📱",
    title: "رسائل بلا رد",
    description: "عملاؤك يرسلون على واتساب وانستغرام، وأنت لا تستطيع الرد على الجميع في آن واحد — فيهربون للمنافس.",
  },
  {
    icon: "🕐",
    title: "لا وقت للرد",
    description: "تشتغل من الصباح حتى الليل، لكن الردود تتأخر — والعميل الذي لا ينتظر يشتري من مكان آخر.",
  },
  {
    icon: "💸",
    title: "فرص بيع ضائعة",
    description: "كل سؤال بلا رد هو بيع ضائع. لا يوجد من يقترح المنتج المناسب أو يتابع العميل المتردد.",
  },
  {
    icon: "📊",
    title: "لا تعرف ماذا يريد عملاؤك",
    description: "لا معلومات عن أكثر المنتجات طلباً، ولا عن المشاكل المتكررة — تعمل بشكل عشوائي بلا بيانات.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-muted text-sm font-semibold tracking-widest uppercase mb-4 block">المشكلة</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            هل هذا يشبه يومك؟
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            كل تاجر ذكي يعاني من نفس المشاكل — ومعظمها له حل واحد
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative glass rounded-3xl p-6 border border-red-500/10 hover:border-red-500/25 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 rounded-t-3xl bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0" />
              <div className="text-3xl mb-4">{problem.icon}</div>
              <h3 className="text-foreground font-bold text-lg mb-2">{problem.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center glass-gold rounded-3xl p-8 border border-gold/20"
        >
          <p className="text-2xl font-black text-foreground">
            <span className="text-gold-gradient">دُكّاني</span> هو الحل الذي كنت تبحث عنه
          </p>
          <p className="text-muted mt-2">مساعد ذكي يعمل 24/7 — يرد، يقترح، يبيع نيابةً عنك</p>
        </motion.div>
      </div>
    </section>
  );
}
