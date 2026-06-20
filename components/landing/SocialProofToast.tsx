"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const proofEvents = [
  { name: "محمد ز.", city: "الدار البيضاء", action: "اشترك للتو في الخطة الاحترافية", time: "منذ 32 ثانية", icon: "🚀" },
  { name: "سلمى ب.", city: "مراكش", action: "ربح 420 درهم من محادثة واحدة", time: "منذ دقيقتين", icon: "💰" },
  { name: "يوسف ك.", city: "فاس", action: "أتم إعداد متجره في 4 دقائق", time: "منذ 5 دقائق", icon: "⚡" },
  { name: "نجاة إ.", city: "طنجة", action: "حصلت على 7 طلبات جديدة الليلة", time: "منذ 8 دقائق", icon: "🎉" },
  { name: "حسن م.", city: "الرباط", action: "بدأ نسخته المجانية الآن", time: "منذ 12 دقيقة", icon: "✅" },
  { name: "فاطمة ز.", city: "أكادير", action: "رفعت مبيعاتها 80٪ هذا الشهر", time: "منذ 15 دقيقة", icon: "📈" },
];

export default function SocialProofToast() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showToast = (idx: number) => {
      setCurrent(idx);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 4500);
    };

    const delays = [4000, 12000, 22000, 35000, 50000, 68000];
    const timers = delays.map((d, i) =>
      setTimeout(() => showToast(i % proofEvents.length), d)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  if (current === null) return null;
  const ev = proofEvents[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-6 z-40 max-w-xs"
        >
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-sm flex-shrink-0">
              {ev.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-white font-bold text-xs">{ev.name}</span>
                <span className="text-white/40 text-xs">•</span>
                <span className="text-white/40 text-xs">{ev.city}</span>
              </div>
              <p className="text-white/70 text-xs leading-tight">{ev.action}</p>
              <p className="text-white/30 text-[10px] mt-1">{ev.time}</p>
            </div>
            <span className="text-xl flex-shrink-0">{ev.icon}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
