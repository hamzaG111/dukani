"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const chatMessages = [
  { from: "user", text: "كم سعر الجبادور المقاس 42؟", delay: 0 },
  { from: "bot", text: "مرحباً! 👋 سعر الجبادور المقاس 42 هو 350 درهم فقط، وعندنا الآن خصم 15% على كل الأحذية الجلدية 🎉", delay: 1200 },
  { from: "user", text: "واش كاين باللون البني؟", delay: 2600 },
  { from: "bot", text: "نعم! عندنا البني الفاتح والبني الداكن، كلاهما متوفر بالمقاس 42. تحب نحجزلك واحد؟ 😊", delay: 3800 },
  { from: "user", text: "آه، حجز البني الداكن", delay: 5200 },
  { from: "bot", text: "✅ تم الحجز! سأرسل لك على واتساب رقم التتبع. شكراً على ثقتك في متجر الأطلس 🌟", delay: 6400 },
];

function ChatBubble({ msg, visible }: { msg: typeof chatMessages[0]; visible: boolean }) {
  if (!visible) return null;
  const isBot = msg.from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex items-end gap-2 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 mb-1">
          <span className="text-background text-xs font-black">د</span>
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? "bg-surface-2 text-foreground rounded-br-sm border border-border"
            : "bg-gold/20 text-gold border border-gold/30 rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

function LiveChat() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    chatMessages.forEach((msg, i) => {
      if (msg.from === "bot") {
        timers.push(setTimeout(() => setTyping(true), msg.delay - 800));
      }
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setVisibleCount(i + 1);
        }, msg.delay)
      );
    });
    timers.push(
      setTimeout(() => {
        setVisibleCount(0);
        setTyping(false);
      }, 9000)
    );
    return () => timers.forEach(clearTimeout);
  }, [visibleCount === 0 ? 0 : null]);

  useEffect(() => {
    if (visibleCount === 0) {
      const t = setTimeout(() => setVisibleCount(0), 100);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  // Auto-restart
  useEffect(() => {
    if (visibleCount !== 0) return;
    const t = setTimeout(() => {
      chatMessages.forEach((msg, i) => {
        if (msg.from === "bot") {
          setTimeout(() => setTyping(true), msg.delay - 800);
        }
        setTimeout(() => {
          setTyping(false);
          setVisibleCount(i + 1);
        }, msg.delay);
      });
      setTimeout(() => {
        setVisibleCount(0);
        setTyping(false);
      }, 9000);
    }, 1500);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div className="glass-gold rounded-3xl p-4 w-full max-w-sm shadow-gold">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-3">
        <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center">
          <span className="text-background text-sm font-black">د</span>
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">مساعد متجر الأطلس</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">متصل الآن</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 min-h-[240px] flex flex-col justify-end">
        {chatMessages.map((msg, i) => (
          <ChatBubble key={i} msg={msg} visible={i < visibleCount} />
        ))}
        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
              <span className="text-background text-xs font-black">د</span>
            </div>
            <div className="bg-surface-2 border border-border px-4 py-3 rounded-2xl rounded-br-sm flex items-center gap-1.5">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
        <div className="flex-1 bg-surface rounded-xl px-4 py-2.5 text-sm text-muted">
          اكتب سؤالك...
        </div>
        <button className="w-9 h-9 bg-gold-gradient rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-background rotate-180" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen mesh-bg flex items-center pt-24 pb-16 overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gold/4 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="gold" className="mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              نظام تجاري ذكي — الأول من نوعه بالعربية
            </Badge>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="text-foreground">مساعدك الذكي</span>
            <br />
            <span className="text-gold-gradient">يبيع نيابةً عنك</span>
            <br />
            <span className="text-foreground">على مدار الساعة</span>
          </h1>

          <p className="text-muted text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
            حوّل كل سؤال من عميلك إلى فرصة بيع حقيقية. دُكّاني يفهم الدارجة، يقترح المنتجات، ويجمع الطلبات — بينما أنت ترتاح.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" variant="primary" className="group">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              ابدأ مجاناً الآن
            </Button>
            <Button size="lg" variant="secondary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              شاهد كيف يعمل
            </Button>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gold-gradient flex items-center justify-center text-xs font-bold text-background">
                  {["م","ي","ح","ف"][i-1]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-foreground font-bold text-sm">+٢٠٠٠ تاجر</p>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-muted text-xs mr-1">٤.٩/٥</span>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-foreground font-bold text-sm">بدون بطاقة بنكية</p>
              <p className="text-muted text-xs">تجربة مجانية ١٤ يوم</p>
            </div>
          </div>
        </motion.div>

        {/* Chat side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <LiveChat />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted text-xs">اكتشف المزيد</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-muted/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
