"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  { icon: "🔔", title: "إشعارات فورية", desc: "اعرف على الفور عندما يراسلك زبون جديد أو يتم إغلاق صفقة" },
  { icon: "📊", title: "تقارير مباشرة", desc: "تابع أداء متجرك في الوقت الحقيقي من أي مكان" },
  { icon: "🤖", title: "تحكم بالذكاء الاصطناعي", desc: "وجّه مساعدك الذكي وعدّل إعداداته بنقرة واحدة" },
  { icon: "💬", title: "تدخّل متى تريد", desc: "استلم المحادثة من الذكاء الاصطناعي عند الحاجة بسلاسة تامة" },
  { icon: "🎯", title: "حملات بنقرة", desc: "أطلق حملات واتساب مستهدفة مباشرة من هاتفك" },
  { icon: "📦", title: "إدارة المنتجات", desc: "أضف وعدّل منتجاتك وأسعارها أينما كنت" },
];

const screenshots = [
  { label: "لوحة التحكم", bg: "from-gold/20 to-surface-2", content: "📊" },
  { label: "المحادثات", bg: "from-green-500/20 to-surface-2", content: "💬" },
  { label: "التقارير", bg: "from-blue-500/20 to-surface-2", content: "📈" },
];

export default function MobileAppPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#C9A84C20_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-gold text-xs font-black tracking-widest uppercase border border-gold/30 bg-gold/10 px-3 py-1 rounded-full mb-6 inline-block">
                📱 قريباً على iOS و Android
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight">
                دُكّاني في جيبك
                <span className="text-gold block">في أي مكان</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-8">
                تطبيق دُكّاني المحمول يجعلك متصلاً بمتجرك ٢٤/٧. راقب مبيعاتك، استقبل محادثاتك، وتحكم في ذكائك الاصطناعي — كل ذلك من شاشة هاتفك.
              </p>

              {!submitted ? (
                <div>
                  <p className="text-foreground text-sm font-bold mb-3">كن أول من يجرّب التطبيق</p>
                  <form
                    onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }}
                    className="flex gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="بريدك الإلكتروني"
                      className="flex-1 bg-surface-2 border border-border rounded-2xl px-5 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/50"
                    />
                    <button type="submit" className="bg-gold-gradient text-background font-black px-6 py-3.5 rounded-2xl">
                      تنبّهني
                    </button>
                  </form>
                  <p className="text-muted text-xs mt-2">+٣,٤٠٠ تاجر في قائمة الانتظار</p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-gold rounded-2xl border border-gold/30 p-5 text-center"
                >
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-gold font-black">تم تسجيلك!</p>
                  <p className="text-muted text-sm">سنبلّغك فور إطلاق التطبيق</p>
                </motion.div>
              )}

              {/* Store badges placeholder */}
              <div className="flex gap-3 mt-6">
                <div className="glass border border-border rounded-xl px-4 py-2.5 flex items-center gap-2 opacity-60">
                  <span className="text-xl">🍎</span>
                  <div>
                    <p className="text-muted text-[9px]">قريباً على</p>
                    <p className="text-foreground text-xs font-bold">App Store</p>
                  </div>
                </div>
                <div className="glass border border-border rounded-xl px-4 py-2.5 flex items-center gap-2 opacity-60">
                  <span className="text-xl">🤖</span>
                  <div>
                    <p className="text-muted text-[9px]">قريباً على</p>
                    <p className="text-foreground text-xs font-bold">Google Play</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Phone frame */}
                <div className="w-64 h-[500px] bg-[#0a0a0a] rounded-[3rem] border-4 border-[#333] shadow-2xl shadow-gold/10 overflow-hidden relative">
                  {/* Status bar */}
                  <div className="bg-[#111] px-5 pt-3 pb-2 flex justify-between items-center">
                    <span className="text-white text-[10px]">٩:٤١</span>
                    <div className="w-20 h-5 bg-[#111] rounded-full border border-[#333]" />
                    <span className="text-white text-[10px]">●●●</span>
                  </div>

                  {/* Screen content */}
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`h-full bg-gradient-to-b ${screenshots[activeScreen].bg} flex flex-col items-center justify-center gap-4`}
                  >
                    <div className="text-7xl">{screenshots[activeScreen].content}</div>
                    <p className="text-white font-bold">{screenshots[activeScreen].label}</p>
                    <div className="flex gap-1">
                      {screenshots.map((_, i) => (
                        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === activeScreen ? "bg-gold" : "bg-white/20"}`} />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Glow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-gold/20 rounded-full blur-xl" />
              </div>
            </motion.div>
          </div>

          {/* Screen switcher */}
          <div className="flex justify-center gap-3 mt-8">
            {screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveScreen(i)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                  activeScreen === i ? "bg-gold text-background" : "glass border border-border text-muted"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={ref} className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-black text-foreground mb-3">كل شيء بمتناول يدك</h2>
          <p className="text-muted">التطبيق الأكثر شمولاً لإدارة التجارة الإلكترونية في المغرب</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl border border-border p-6 hover:border-gold/25 transition-all"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-foreground font-black mb-1">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface border-y border-border py-14">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "< ٢ ثانية", label: "زمن الاستجابة" },
            { value: "٩٩.٩٪", label: "وقت التشغيل" },
            { value: "٤.٩ ⭐", label: "تقييم متوقع" },
            { value: "٢٤/٧", label: "دعم فني" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-gold font-black text-2xl mb-1">{s.value}</p>
              <p className="text-muted text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-5">🚀</div>
        <h2 className="text-3xl font-black text-foreground mb-4">كن على القائمة</h2>
        <p className="text-muted mb-8">أول ٥٠٠ تاجر سيحصلون على الإصدار التجريبي مجاناً مع مكافآت حصرية</p>
        {!submitted && (
          <form
            onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }}
            className="flex gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-surface-2 border border-border rounded-2xl px-5 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/50"
            />
            <button type="submit" className="bg-gold-gradient text-background font-black px-6 py-3.5 rounded-2xl">
              انضم
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
