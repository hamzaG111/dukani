"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";

const STEPS = ["متجرك", "التواصل", "كلمة المرور"];

const CATEGORIES = [
  "ملابس وأحذية", "مطعم وكافيه", "إلكترونيات", "تجميل وعناية",
  "مواد غذائية", "أثاث وديكور", "رياضة", "صحة وطب",
  "خدمات", "أخرى",
];

const CITIES = [
  "الدار البيضاء", "الرباط", "مراكش", "فاس", "أكادير",
  "طنجة", "مكناس", "وجدة", "القنيطرة", "أخرى",
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    storeName: "",
    storeCategory: "",
    storeCity: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useAuth();
  const router = useRouter();

  const update = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const nextStep = () => {
    setError("");
    if (step === 0 && !form.storeName) { setError("أدخل اسم المتجر"); return; }
    if (step === 1 && !form.contact) { setError("أدخل بيانات التواصل"); return; }
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError("كلمتا المرور غير متطابقتان"); return; }
    if (form.password.length < 8) { setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل"); return; }
    setLoading(true);
    const { error: err } = await register({
      [method === "phone" ? "phone" : "email"]: form.contact,
      password: form.password,
      storeName: form.storeName,
      storeCity: form.storeCity,
      storeCategory: form.storeCategory,
    });
    if (err) { setError(err); setLoading(false); }
    else router.push("/dashboard");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="glass-gold rounded-3xl border border-gold/20 p-8 shadow-gold">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold">
            <span className="text-background font-black text-2xl">د</span>
          </div>
          <h1 className="text-2xl font-black text-foreground mb-1">انطلق مجاناً 🚀</h1>
          <p className="text-muted text-sm">أنشئ متجرك الذكي في دقيقة واحدة</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${
                i < step ? "bg-green-500 text-white" :
                i === step ? "bg-gold text-background" :
                "bg-surface-2 text-muted"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] font-semibold ${i === step ? "text-gold" : "text-muted"}`}>{label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={step < STEPS.length - 1 ? (e) => { e.preventDefault(); nextStep(); } : handleSubmit}
          className="space-y-4">

          <AnimatePresence mode="wait">
            {/* Step 0: Store info */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">اسم المتجر *</label>
                  <input
                    type="text" value={form.storeName} onChange={e => update("storeName", e.target.value)}
                    placeholder="متجر الأطلس" required autoFocus
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">نوع المتجر</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {CATEGORIES.map(cat => (
                      <button key={cat} type="button" onClick={() => update("storeCategory", cat)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-right ${
                          form.storeCategory === cat
                            ? "border-gold/50 bg-gold/15 text-gold"
                            : "border-border text-muted hover:border-gold/30 hover:text-foreground"
                        }`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">المدينة</label>
                  <select value={form.storeCity} onChange={e => update("storeCity", e.target.value)}
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground focus:outline-none focus:border-gold/60 transition-all">
                    <option value="">اختر مدينتك</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 1: Contact */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="flex rounded-2xl border border-border overflow-hidden bg-surface">
                  {(["phone", "email"] as const).map(m => (
                    <button key={m} type="button" onClick={() => setMethod(m)}
                      className={`flex-1 py-3 text-sm font-semibold transition-all ${method === m ? "bg-gold text-background" : "text-muted hover:text-foreground"}`}>
                      {m === "phone" ? "📱 هاتف" : "✉️ إيميل"}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {method === "phone" ? "رقم الهاتف" : "البريد الإلكتروني"}
                  </label>
                  <input
                    type={method === "phone" ? "tel" : "email"}
                    value={form.contact} onChange={e => update("contact", e.target.value)}
                    placeholder={method === "phone" ? "+212 6 12 34 56 78" : "you@example.com"}
                    required autoFocus dir={method === "phone" ? "ltr" : "rtl"}
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
                  />
                </div>
                <div className="p-3 bg-gold/5 border border-gold/15 rounded-2xl text-xs text-muted">
                  سيُستخدم هذا للدخول لحسابك وإرسال إشعارات مهمة
                </div>
              </motion.div>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password} onChange={e => update("password", e.target.value)}
                      placeholder="8 أحرف على الأقل" required dir="ltr" autoFocus
                      className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {/* Strength indicator */}
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4].map(n => (
                      <div key={n} className={`h-1 flex-1 rounded-full transition-all ${
                        form.password.length >= n * 2
                          ? n <= 2 ? "bg-red-400" : n === 3 ? "bg-yellow-400" : "bg-green-400"
                          : "bg-surface-2"
                      }`} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">تأكيد كلمة المرور</label>
                  <input
                    type="password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)}
                    placeholder="••••••••" required dir="ltr"
                    className={`w-full bg-surface border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted focus:outline-none focus:ring-1 transition-all ${
                      form.confirmPassword && form.password !== form.confirmPassword
                        ? "border-red-500/50 focus:ring-red-500/30"
                        : "border-border focus:border-gold/60 focus:ring-gold/30"
                    }`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            {step > 0 && (
              <button type="button" onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3.5 rounded-2xl border border-border text-muted hover:text-foreground hover:border-gold/30 font-semibold text-sm transition-all">
                رجوع
              </button>
            )}
            <Button type="submit" variant="primary" size="lg" loading={loading}
              className={step > 0 ? "flex-1" : "w-full"}>
              {step < STEPS.length - 1 ? "التالي →" : "🚀 إنشاء الحساب"}
            </Button>
          </div>
        </form>

        {/* Trust */}
        <div className="mt-5 flex items-center justify-center gap-4 text-xs text-muted">
          <span>✓ بدون بطاقة بنكية</span>
          <span>✓ 14 يوم مجاناً</span>
          <span>✓ إلغاء في أي وقت</span>
        </div>

        <div className="mt-4 text-center">
          <p className="text-muted text-sm">
            لديك حساب؟{" "}
            <a href="/auth/login" className="text-gold hover:text-gold-light font-semibold transition-colors">سجّل دخولك</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
