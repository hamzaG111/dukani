"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [form, setForm] = useState({ name: "", contact: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/auth/verify";
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-gold rounded-3xl border border-gold/20 p-8 shadow-gold">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-foreground mb-2">انطلق مجاناً 🚀</h1>
          <p className="text-muted text-sm">أنشئ حسابك في ثوانٍ — بدون بطاقة بنكية</p>
        </div>

        <div className="flex rounded-2xl border border-border overflow-hidden mb-6 bg-surface">
          <button
            onClick={() => setMethod("phone")}
            className={`flex-1 py-3 text-sm font-semibold transition-all ${
              method === "phone" ? "bg-gold text-background" : "text-muted hover:text-foreground"
            }`}
          >
            📱 رقم الهاتف
          </button>
          <button
            onClick={() => setMethod("email")}
            className={`flex-1 py-3 text-sm font-semibold transition-all ${
              method === "email" ? "bg-gold text-background" : "text-muted hover:text-foreground"
            }`}
          >
            ✉️ البريد الإلكتروني
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">اسمك الكامل</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="محمد الكنزاوي"
              required
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {method === "phone" ? "رقم الهاتف" : "البريد الإلكتروني"}
            </label>
            <input
              type={method === "phone" ? "tel" : "email"}
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              placeholder={method === "phone" ? "06 12 34 56 78" : "you@example.com"}
              required
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
              dir={method === "phone" ? "ltr" : "rtl"}
            />
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            إنشاء الحساب مجاناً
          </Button>
        </form>

        {/* Trust signals */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted">
          <span>✓ بدون بطاقة</span>
          <span>✓ 14 يوم مجاناً</span>
          <span>✓ إلغاء في أي وقت</span>
        </div>

        <div className="mt-4 text-center">
          <p className="text-muted text-sm">
            لديك حساب؟{" "}
            <a href="/auth/login" className="text-gold hover:text-gold-light font-semibold transition-colors">
              سجّل دخولك
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
