"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 6) return;
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/onboarding";
    }, 1200);
  };

  const isComplete = otp.join("").length === 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-gold rounded-3xl border border-gold/20 p-8 shadow-gold text-center">
        <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6 text-3xl">
          📲
        </div>

        <h1 className="text-2xl font-black text-foreground mb-2">تحقق من هاتفك</h1>
        <p className="text-muted text-sm mb-8">
          أرسلنا رمز مكوّن من 6 أرقام إلى{" "}
          <span className="text-foreground font-semibold">+212 6** *** **78</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP inputs */}
          <div className="flex gap-3 justify-center mb-8 direction-ltr" dir="ltr">
            {otp.map((digit, i) => (
              <motion.input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`w-12 h-14 text-center text-xl font-black rounded-2xl border transition-all outline-none ${
                  digit
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border bg-surface text-foreground focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
                }`}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={!isComplete}
            className="w-full mb-6"
          >
            تأكيد الرمز
          </Button>
        </form>

        <div className="text-sm text-muted">
          {resendTimer > 0 ? (
            <span>إعادة الإرسال خلال {resendTimer} ثانية</span>
          ) : (
            <button
              onClick={() => setResendTimer(59)}
              className="text-gold hover:text-gold-light font-semibold transition-colors"
            >
              إعادة إرسال الرمز
            </button>
          )}
        </div>

        <div className="mt-4">
          <a href="/auth/login" className="text-muted text-xs hover:text-foreground transition-colors">
            ← تغيير رقم الهاتف
          </a>
        </div>
      </div>
    </motion.div>
  );
}
