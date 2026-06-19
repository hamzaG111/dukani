"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const businessTypes = [
  { id: "clothes", icon: "👕", label: "ملابس وأزياء" },
  { id: "food", icon: "🍕", label: "مطعم أو كافيه" },
  { id: "electronics", icon: "📱", label: "إلكترونيات" },
  { id: "beauty", icon: "💄", label: "تجميل وعناية" },
  { id: "pharmacy", icon: "💊", label: "صيدلية" },
  { id: "sweets", icon: "🍰", label: "حلويات وكيك" },
  { id: "furniture", icon: "🛋️", label: "أثاث وديكور" },
  { id: "other", icon: "🏪", label: "نشاط آخر" },
];

const languages = [
  { id: "darija", flag: "🇲🇦", label: "الدارجة المغربية" },
  { id: "arabic", flag: "🌍", label: "العربية الفصحى" },
  { id: "french", flag: "🇫🇷", label: "Français" },
  { id: "mixed", flag: "✨", label: "متعدد اللغات" },
];

const STEPS = 4;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    storeName: "",
    businessType: "",
    language: "",
    logo: null as File | null,
  });
  const [completing, setCompleting] = useState(false);

  const progress = (step / STEPS) * 100;

  const next = () => {
    if (step < STEPS) setStep(step + 1);
    else {
      setCompleting(true);
      setTimeout(() => { window.location.href = "/dashboard"; }, 2000);
    }
  };

  const prev = () => { if (step > 1) setStep(step - 1); };

  const canProceed = () => {
    if (step === 1) return form.storeName.trim().length > 0;
    if (step === 2) return form.businessType !== "";
    if (step === 3) return form.language !== "";
    return true;
  };

  if (completing) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-black text-gold-gradient mb-3">متجرك جاهز!</h2>
          <p className="text-muted">جاري توجيهك للوحة التحكم...</p>
          <div className="mt-6 flex justify-center">
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-2 rounded-full bg-gold"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <span className="text-background font-black text-xl">د</span>
          </div>
          <span className="text-2xl font-black text-foreground">دُكّاني</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted mb-2">
            <span>الخطوة {step} من {STEPS}</span>
            <span>{Math.round(progress)}٪</span>
          </div>
          <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-gold-gradient-h rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-gold rounded-3xl border border-gold/20 p-8 shadow-gold">

              {/* Step 1: Store name */}
              {step === 1 && (
                <div>
                  <div className="text-4xl mb-4">🏪</div>
                  <h2 className="text-2xl font-black text-foreground mb-2">ما اسم متجرك؟</h2>
                  <p className="text-muted text-sm mb-6">هذا هو الاسم الذي سيظهر لعملائك</p>
                  <input
                    type="text"
                    autoFocus
                    value={form.storeName}
                    onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                    placeholder="مثال: متجر الأطلس، محل الأمين..."
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-4 text-foreground text-lg placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all"
                  />
                </div>
              )}

              {/* Step 2: Business type */}
              {step === 2 && (
                <div>
                  <div className="text-4xl mb-4">🎯</div>
                  <h2 className="text-2xl font-black text-foreground mb-2">نوع نشاطك التجاري؟</h2>
                  <p className="text-muted text-sm mb-6">سنضبط المساعد ليناسب مجالك تماماً</p>
                  <div className="grid grid-cols-2 gap-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setForm({ ...form, businessType: type.id })}
                        className={`flex items-center gap-3 p-4 rounded-2xl border text-right transition-all ${
                          form.businessType === type.id
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border bg-surface text-muted hover:border-gold/40 hover:text-foreground"
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className="text-sm font-semibold">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Language */}
              {step === 3 && (
                <div>
                  <div className="text-4xl mb-4">🌍</div>
                  <h2 className="text-2xl font-black text-foreground mb-2">بأي لغة يتكلم عملاؤك؟</h2>
                  <p className="text-muted text-sm mb-6">المساعد سيرد بنفس اللغة التي يكتب بها عميلك</p>
                  <div className="space-y-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setForm({ ...form, language: lang.id })}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-right transition-all ${
                          form.language === lang.id
                            ? "border-gold bg-gold/10"
                            : "border-border bg-surface hover:border-gold/40"
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className={`font-semibold text-sm ${form.language === lang.id ? "text-gold" : "text-foreground"}`}>
                          {lang.label}
                        </span>
                        {form.language === lang.id && (
                          <svg className="w-5 h-5 text-gold mr-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Logo */}
              {step === 4 && (
                <div>
                  <div className="text-4xl mb-4">🎨</div>
                  <h2 className="text-2xl font-black text-foreground mb-2">أضف شعار متجرك</h2>
                  <p className="text-muted text-sm mb-6">اختياري — يمكنك إضافته لاحقاً من الإعدادات</p>

                  <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-3xl p-10 text-center hover:border-gold/40 transition-all group">
                      {form.logo ? (
                        <div>
                          <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-3 text-4xl">
                            🖼️
                          </div>
                          <p className="text-gold font-semibold text-sm">{form.logo.name}</p>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-2xl bg-surface-2 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors">
                            <svg className="w-7 h-7 text-muted group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-muted text-sm">اضغط لرفع الشعار</p>
                          <p className="text-muted/50 text-xs mt-1">PNG, JPG — بحد أقصى ٥ ميغا</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setForm({ ...form, logo: e.target.files?.[0] ?? null })}
                    />
                  </label>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <Button variant="secondary" size="md" onClick={prev} className="px-6">
                    ← رجوع
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="md"
                  onClick={next}
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  {step === STEPS ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      إطلاق متجري!
                    </>
                  ) : (
                    "التالي →"
                  )}
                </Button>
              </div>

              {step === 4 && (
                <button onClick={next} className="w-full text-center text-muted text-sm mt-3 hover:text-foreground transition-colors">
                  تخطي — سأضيف الشعار لاحقاً
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
