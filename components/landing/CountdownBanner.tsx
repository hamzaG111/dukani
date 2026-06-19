"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CountdownBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [time, setTime] = useState({ h: 3, m: 47, s: 23 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-l from-[#1a0e00] to-[#0d0d0d] border-b border-gold/20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 flex-wrap text-center">
            <span className="text-gold/80 text-xs font-semibold">🔥 عرض محدود —</span>
            <span className="text-white text-xs">اشترك اليوم واحصل على شهر مجاني في الخطة الاحترافية</span>
            <div className="flex items-center gap-1.5 bg-black/30 border border-gold/20 rounded-lg px-3 py-1">
              <span className="text-gold font-black text-sm font-mono">{pad(time.h)}:{pad(time.m)}:{pad(time.s)}</span>
            </div>
            <a href="/auth/register" className="text-xs font-black text-background bg-gold px-3 py-1 rounded-lg hover:bg-[#E8C97A] transition-colors">
              استفد الآن
            </a>
            <button onClick={() => setDismissed(true)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-lg">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
