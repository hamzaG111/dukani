"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";

function LoginForm() {
  const [method, setMethod] = useState<"email" | "phone">("phone");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await login(contact, password, method === "phone");
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      router.push(redirect);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="glass-gold rounded-3xl border border-gold/20 p-8 shadow-gold">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold">
            <span className="text-background font-black text-2xl">د</span>
          </div>
          <h1 className="text-2xl font-black text-foreground mb-1">أهلاً بعودتك 👋</h1>
          <p className="text-muted text-sm">سجّل دخولك لإدارة متجرك الذكي</p>
        </div>

        {/* Method toggle */}
        <div className="flex rounded-2xl border border-border overflow-hidden mb-6 bg-surface">
          {(["phone", "email"] as const).map(m => (
            <button key={m} onClick={() => setMethod(m)}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${method === m ? "bg-gold text-background" : "text-muted hover:text-foreground"}`}>
              {m === "phone" ? "📱 رقم الهاتف" : "✉️ البريد الإلكتروني"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {method === "phone" ? "رقم الهاتف" : "البريد الإلكتروني"}
            </label>
            <input
              type={method === "phone" ? "tel" : "email"}
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder={method === "phone" ? "06 12 34 56 78" : "you@example.com"}
              required
              dir={method === "phone" ? "ltr" : "rtl"}
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                dir="ltr"
                className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="flex justify-start mt-1">
              <a href="/auth/forgot" className="text-gold/70 hover:text-gold text-xs transition-colors">
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            تسجيل الدخول
          </Button>
        </form>

        {/* Social proof */}
        <div className="mt-5 p-3 bg-green-500/5 border border-green-500/15 rounded-2xl text-center">
          <p className="text-green-400 text-xs font-semibold">🟢 2,000+ تاجر نشط الآن</p>
        </div>

        <div className="mt-4 text-center">
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
        <a href="/legal/terms" className="text-gold/70 hover:text-gold">شروط الاستخدام</a>
        {" "}و{" "}
        <a href="/legal/privacy" className="text-gold/70 hover:text-gold">سياسة الخصوصية</a>
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
