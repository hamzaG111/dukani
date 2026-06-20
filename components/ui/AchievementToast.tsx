"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamification } from "@/contexts/GamificationContext";

export default function AchievementToast() {
  const { pendingAchievement, dismissAchievement } = useGamification();

  useEffect(() => {
    if (pendingAchievement) {
      const t = setTimeout(dismissAchievement, 5000);
      return () => clearTimeout(t);
    }
  }, [pendingAchievement, dismissAchievement]);

  return (
    <AnimatePresence>
      {pendingAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="glass-gold border border-gold/40 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-[0_0_40px_rgba(201,168,76,0.3)] min-w-[280px]">
            <div className="text-4xl animate-bounce">{pendingAchievement.icon}</div>
            <div>
              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-0.5">إنجاز جديد! 🎉</p>
              <p className="text-foreground font-black text-base">{pendingAchievement.titleAr}</p>
              <p className="text-green-400 text-xs font-semibold">+{pendingAchievement.xp} XP</p>
            </div>
            <div className="flex flex-col items-center gap-1 mr-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
