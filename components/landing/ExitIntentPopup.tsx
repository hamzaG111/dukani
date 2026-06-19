"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !dismissed && !visible) {
        setVisible(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed, visible]);

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setVisible(false);
      setDismissed(true);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-full max-w-md px-4"
          >
            <div className="bg-[#0A0A0A] border border-gold/25 rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient-h" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />

              <button
                onClick={handleClose}
                className="absolute top-4 left-4 text-white/30 hover:text-white/60 text-2xl leading-none transition-colors"
              >
                ×
              </button>

              {!submitted ? (
                <>
                  <div className="text-5xl mb-4">🎁</div>
                  <h2 className="text-2xl font-black text-white mb-2">
                    انتظر! هدية قبل ما تمشي
                  </h2>
                  <p className="text-white/60 mb-6 text-sm leading-relaxed">
                    احصل مجاناً على <strong className="text-gold">دليل ٢٠ رسالة مبيعات بالدارجة</strong> — تستخدمها لرفع مبيعاتك فوراً
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="بريدك الإلكتروني"
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/40"
                      dir="ltr"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gold-gradient text-[#0A0A0A] font-black py-3.5 rounded-xl text-base hover:shadow-gold-strong transition-all"
                    >
                      أرسل لي الدليل مجاناً ⚡
                    </button>
                  </form>

                  <button onClick={handleClose} className="mt-4 text-white/30 text-xs hover:text-white/50 transition-colors">
                    لا شكراً، لست مهتماً بزيادة مبيعاتي
                  </button>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="text-2xl font-black text-white mb-2">تم الإرسال!</h2>
                  <p className="text-white/60 text-sm">تفقد بريدك الإلكتروني — الدليل في طريقه إليك</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
