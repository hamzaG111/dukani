"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "سجّل متجرك في دقيقتين",
    description: "أضف اسم متجرك، نوع نشاطك، وشعارك — بدون أي مصطلح تقني. أسهل من إنشاء حساب في واتساب.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "أضف منتجاتك بسهولة",
    description: "أضف منتجاتك مع الصور والأسعار والتفاصيل — المساعد سيتعلم كل شيء تلقائياً ويرد على عملائك باحترافية.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "شارك رابطك وابدأ البيع",
    description: "احصل على رابط متجرك الذكي وشاركه على واتساب وانستغرام — المساعد يبدأ البيع فوراً بينما أنت ترتاح.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">كيف يعمل</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            ٣ خطوات وأنت جاهز
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            لا حاجة لخبرة تقنية. إذا كنت تعرف كيف ترسل رسالة واتساب، يمكنك إعداد دُكّاني
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent -translate-y-1/2 pointer-events-none" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative"
              >
                <div className="glass rounded-3xl p-8 border border-border hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold text-center">
                  {/* Step number */}
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gold text-background text-xs font-black px-3 py-1 rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6 text-gold group-hover:bg-gold/20 transition-colors duration-300">
                    {step.icon}
                  </div>

                  <h3 className="text-foreground font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted text-sm mb-4">جاهز في أقل من ٥ دقائق — مضمون</p>
          <button className="inline-flex items-center gap-2 bg-gold-gradient text-background font-bold px-8 py-4 rounded-2xl hover:shadow-gold-strong transition-shadow duration-300 hover:-translate-y-0.5 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            جربه مجاناً الآن
          </button>
        </motion.div>
      </div>
    </section>
  );
}
