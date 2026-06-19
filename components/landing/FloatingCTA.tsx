"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 600 && !dismissed) setVisible(true);
      else if (window.scrollY < 600) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#0A0A0A] border border-gold/30 rounded-2xl px-5 py-3 shadow-gold backdrop-blur-xl"
          style={{ maxWidth: "calc(100vw - 2rem)" }}
        >
          <div className="w-8 h-8 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0">
            <span className="text-background font-black text-sm">د</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-black text-sm whitespace-nowrap">ابدأ مجاناً اليوم</p>
            <p className="text-muted text-xs whitespace-nowrap">لا يلزم بطاقة · إعداد في ٥ دقائق</p>
          </div>
          <a
            href="/auth/register"
            className="bg-gold-gradient text-background font-black text-sm px-4 py-2 rounded-xl flex-shrink-0 hover:shadow-gold-strong transition-all"
          >
            ابدأ ⚡
          </a>
          <button
            onClick={() => { setDismissed(true); setVisible(false); }}
            className="text-muted hover:text-foreground text-lg leading-none flex-shrink-0 -mr-1"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
