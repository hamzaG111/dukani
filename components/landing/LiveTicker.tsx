"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  { icon: "🎉", text: "تاجر جديد من الدار البيضاء انضم للتو", color: "text-green-400" },
  { icon: "💰", text: "بيع ناجح في مراكش — 350 درهم", color: "text-gold" },
  { icon: "💬", text: "8 محادثات جديدة في فاس خلال آخر ساعة", color: "text-blue-400" },
  { icon: "⭐", text: "تقييم 5 نجوم من عميل راضٍ في طنجة", color: "text-yellow-400" },
  { icon: "🚀", text: "متجر الأطلس رفع مبيعاته 67٪ هذا الشهر", color: "text-gold" },
  { icon: "🎉", text: "تاجر من الرباط أتم إعداده في 3 دقائق فقط", color: "text-green-400" },
  { icon: "💰", text: "طلب جديد في أكادير — جبادور بني داكن", color: "text-gold" },
  { icon: "📱", text: "23 محادثة نشطة الآن على المنصة", color: "text-purple-400" },
  { icon: "🔥", text: "خطة احترافية جديدة في وجدة", color: "text-red-400" },
  { icon: "💬", text: "عميل جديد من انستغرام في سلا", color: "text-blue-400" },
];

export default function LiveTicker() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(c => (c + 1) % events.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const ev = events[current];

  return (
    <div className="bg-surface border-y border-border py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-muted text-xs font-semibold uppercase tracking-widest whitespace-nowrap">مباشر</span>
        </div>
        <div className="h-4 w-px bg-border flex-shrink-0" />
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 min-w-0"
            >
              <span className="text-sm">{ev.icon}</span>
              <span className={`text-sm font-medium ${ev.color} truncate`}>{ev.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mr-auto flex items-center gap-1 flex-shrink-0">
          {events.map((_, i) => (
            <div key={i} className={`w-1 h-1 rounded-full transition-all ${i === current ? "bg-gold scale-125" : "bg-border"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
