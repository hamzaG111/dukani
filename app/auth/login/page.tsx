"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [method, setMethod] = useState<"email" | "phone">("phone");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

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
          <h1 className="text-2xl font-black text-foreground mb-2">أهلاً بعودتك 👋</h1>
          <p className="text-muted text-sm">سجّل دخولك لإدارة متجرك الذكي</p>
        </div>

        {/* Method toggle */}
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
            <label className="block text-sm font-semibold text-foreground mb-2">
              {method === "phone" ? "رقم الهاتف" : "البريد الإلكتروني"}
            </label>
            <input
              type={method === "phone" ? "tel" : "email"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={method === "phone" ? "06 12 34 56 78" : "you@example.com"}
              required
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-right"
              dir={method === "phone" ? "ltr" : "rtl"}
            />
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            إرسال رمز التحقق
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted text-sm">
            ليس لديك حساب؟{" "}
            <a href="/auth/register" className="text-gold hover:text-gold-light font-semibold transition-colors">
              سجّل مجاناً
            </a>
          </p>
        </div>
      </div>

      <p className="text-center text-muted text-xs mt-6">
        بتسجيل دخولك، أنت توافق على{" "}
        <a href="#" className="text-gold/70 hover:text-gold">شروط الاستخدام</a>
        {" "}و{" "}
        <a href="#" className="text-gold/70 hover:text-gold">سياسة الخصوصية</a>
      </p>
    </motion.div>
  );
}
