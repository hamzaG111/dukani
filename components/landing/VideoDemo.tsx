"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const demoMessages = [
  { from: "customer", text: "السلام عليكم، عندكم جبادور بالمقاس 43؟", time: "10:23" },
  { from: "ai", text: "وعليكم السلام! نعم عندنا جبادور بالمقاس 43 في 3 ألوان: بني داكن، بني فاتح، وأسود. أي لون يعجبك؟ 😊", time: "10:23" },
  { from: "customer", text: "البني داكن بشحال؟", time: "10:24" },
  { from: "ai", text: "الجبادور البني داكن بـ 297 درهم فقط (بدل 350 — توفير 53 درهم! 🔥). هل تبغي أضيفه للطلب؟", time: "10:24" },
  { from: "customer", text: "واه باغيه، كيفاش نسلم؟", time: "10:25" },
  { from: "ai", text: "ممتاز! عندنا توصيل لجميع أرجاء المغرب خلال 24-48 ساعة 🚚 ما عليك غير تعطيني عنوانك وأنا كنتولى بكل شيء!", time: "10:25" },
];

const highlights = [
  { icon: "⚡", text: "يرد في ثوانٍ" },
  { icon: "🌙", text: "متاح 24/7" },
  { icon: "💰", text: "يبيع بدلاً عنك" },
  { icon: "🇲🇦", text: "يفهم الدارجة" },
];

export default function VideoDemo() {
  const [playing, setPlaying] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const startDemo = () => {
    setPlaying(true);
    setVisibleMessages(0);
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    demoMessages.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleMessages(i + 1);
      }, i * 1200 + 300);
      timerRef.current.push(t);
    });

    const end = setTimeout(() => setPlaying(false), demoMessages.length * 1200 + 1500);
    timerRef.current.push(end);
  };

  return (
    <section className="py-24 relative bg-surface-2 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">شاهد الفرق</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            دُكّاني يبيع
            <br /><span className="text-gold-gradient">أنت تربح</span>
          </h2>
          <p className="text-muted text-lg">شاهد كيف يرد مساعدك الذكي على العملاء ويُتم البيع تلقائياً</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-72">
              {/* Phone frame */}
              <div className="bg-[#111] rounded-[3rem] border-4 border-[#333] shadow-2xl overflow-hidden" style={{ aspectRatio: "9/19" }}>
                {/* Status bar */}
                <div className="bg-[#111] px-6 py-3 flex items-center justify-between">
                  <span className="text-white text-xs font-medium">10:23</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-1.5 rounded-sm bg-white/60" />
                    <div className="w-1 h-1.5 rounded-sm bg-white/40" />
                  </div>
                </div>

                {/* Chat header */}
                <div className="bg-[#0A0A0A] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-sm">م</div>
                  <div>
                    <p className="text-white text-xs font-bold">متجر الأطلس</p>
                    <p className="text-green-400 text-[10px]">● نشط الآن</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 bg-[#0d0d0d] px-3 py-4 space-y-3 overflow-hidden" style={{ minHeight: "400px" }}>
                  <AnimatePresence>
                    {demoMessages.slice(0, visibleMessages).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${
                          msg.from === "customer"
                            ? "bg-[#C9A84C] text-[#0A0A0A] rounded-br-sm"
                            : "bg-[#1C1C1C] text-white rounded-bl-sm border border-white/5"
                        }`}>
                          {msg.text}
                          <div className={`text-[9px] mt-0.5 ${msg.from === "customer" ? "text-[#0A0A0A]/50" : "text-white/30"}`}>
                            {msg.time}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {playing && visibleMessages < demoMessages.length && visibleMessages % 2 === 1 && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-[#1C1C1C] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                          {[0, 1, 2].map((j) => (
                            <div key={j} className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: `${j * 150}ms` }} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input bar */}
                <div className="bg-[#111] px-3 py-2 flex items-center gap-2 border-t border-white/5">
                  <div className="flex-1 bg-[#1C1C1C] rounded-full px-3 py-1.5 text-white/20 text-[10px]">اكتب رسالتك...</div>
                  <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <svg className="w-3 h-3 text-background rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Play button overlay */}
              {!playing && visibleMessages === 0 && (
                <button
                  onClick={startDemo}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[3rem] backdrop-blur-sm group"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-background mr-[-2px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Replay button */}
              {!playing && visibleMessages > 0 && (
                <button
                  onClick={startDemo}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gold text-background text-xs font-black px-4 py-2 rounded-full shadow-gold hover:shadow-gold-strong transition-all"
                >
                  ↺ أعد التشغيل
                </button>
              )}
            </div>
          </motion.div>

          {/* Right side content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 glass rounded-2xl border border-border p-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {h.icon}
                  </div>
                  <p className="text-foreground font-bold">{h.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass-gold rounded-2xl border border-gold/25 p-5">
              <p className="text-gold font-black mb-1">النتيجة في 3 دقائق</p>
              <p className="text-foreground text-2xl font-black">بيع مكتمل = 297 درهم 💰</p>
              <p className="text-muted text-sm mt-1">بدون أي تدخل منك</p>
            </div>

            <a
              href="/auth/register"
              className="block w-full text-center bg-gold-gradient text-background font-black py-4 rounded-2xl text-lg hover:shadow-gold-strong transition-all hover:-translate-y-0.5"
            >
              جرب مجاناً — لا يلزم بطاقة ائتمان
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
