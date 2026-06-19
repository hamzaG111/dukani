"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-6 text-center">
      <div className="fixed top-1/4 right-1/4 w-72 h-72 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-2 mb-12 group">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <span className="text-background font-black text-xl">د</span>
          </div>
          <span className="text-2xl font-black text-foreground">دُكّاني</span>
        </a>

        {/* 404 display */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="text-[120px] font-black leading-none select-none">
            <span className="text-gold-gradient">٤</span>
            <span className="text-foreground/20">٠</span>
            <span className="text-gold-gradient">٤</span>
          </div>
        </motion.div>

        <h1 className="text-2xl font-black text-foreground mb-3">
          عذراً، هذه الصفحة غير موجودة
        </h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          يبدو أن الصفحة التي تبحث عنها انتقلت لمكان آخر،<br />
          أو أن الرابط غير صحيح.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="md" onClick={() => window.location.href = "/"}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            العودة للرئيسية
          </Button>
          <Button variant="secondary" size="md" onClick={() => window.history.back()}>
            ← الصفحة السابقة
          </Button>
        </div>

        <div className="mt-10 text-muted text-sm">
          هل تعتقد أن هناك خطأ؟{" "}
          <a href="mailto:support@dukani.ma" className="text-gold hover:underline">
            تواصل مع الدعم
          </a>
        </div>
      </motion.div>
    </div>
  );
}
