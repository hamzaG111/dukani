"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) { setDisplayed(value); clearInterval(timer); }
      else setDisplayed(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{displayed.toLocaleString("ar-MA")}{suffix}</span>;
}

export default function RoiCalculator() {
  const [step, setStep] = useState(0);
  const [dailyCustomers, setDailyCustomers] = useState(20);
  const [responseRate, setResponseRate] = useState(40);
  const [avgOrder, setAvgOrder] = useState(200);
  const [showResult, setShowResult] = useState(false);

  const missedDaily = Math.round(dailyCustomers * (1 - responseRate / 100));
  const lostMonthly = missedDaily * avgOrder * 30;
  const dukaniGain = Math.round(lostMonthly * 0.7);
  const plan = 149;
  const roi = Math.round(((dukaniGain - plan) / plan) * 100);

  const steps = [
    {
      question: "كم عميل يتواصل معك يومياً عبر واتساب وانستغرام؟",
      sub: "المتوسط للتاجر المغربي: ١٥-٣٠ عميل/يوم",
      component: (
        <div className="space-y-4">
          <div className="text-5xl font-black text-gold-gradient text-center">{dailyCustomers}</div>
          <input type="range" min={5} max={200} value={dailyCustomers}
            onChange={e => setDailyCustomers(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to left, #C9A84C ${(dailyCustomers/200)*100}%, #2A2A2A ${(dailyCustomers/200)*100}%)` }}
          />
          <div className="flex justify-between text-muted text-xs"><span>٥</span><span>٢٠٠+</span></div>
        </div>
      ),
    },
    {
      question: "كم نسبة الردود في الوقت المناسب؟ (خلال ساعة)",
      sub: "العميل الذي لا يُرد عليه فوراً يذهب للمنافس في ٧٣٪ من الحالات",
      component: (
        <div className="space-y-4">
          <div className="text-5xl font-black text-gold-gradient text-center">{responseRate}٪</div>
          <input type="range" min={10} max={100} value={responseRate}
            onChange={e => setResponseRate(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to left, #C9A84C ${responseRate}%, #2A2A2A ${responseRate}%)` }}
          />
          <div className="flex justify-between text-muted text-xs"><span>١٠٪</span><span>١٠٠٪</span></div>
        </div>
      ),
    },
    {
      question: "ما متوسط قيمة الطلب الواحد؟ (بالدرهم)",
      sub: "الدخل المتوقع من كل عميل يشتري منك",
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-black text-gold-gradient">{avgOrder}</span>
            <span className="text-muted">درهم</span>
          </div>
          <input type="range" min={50} max={2000} step={50} value={avgOrder}
            onChange={e => setAvgOrder(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to left, #C9A84C ${(avgOrder/2000)*100}%, #2A2A2A ${(avgOrder/2000)*100}%)` }}
          />
          <div className="flex justify-between text-muted text-xs"><span>٥٠ د.م</span><span>٢٠٠٠+ د.م</span></div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else setShowResult(true);
  };

  return (
    <section id="roi-calculator" className="py-24 relative bg-surface-2 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">اكتشف الحقيقة</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            كم تخسر كل شهر
            <br /><span className="text-gold-gradient">بدون دُكّاني؟</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            حساب دقيق مبني على بيانات ٢٠٠٠+ تاجر عربي
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="glass-gold rounded-3xl border border-gold/25 p-8 shadow-gold"
              >
                {/* Progress */}
                <div className="flex gap-2 mb-8">
                  {steps.map((_, i) => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-500 ${i <= step ? "bg-gold" : "bg-border"}`} />
                  ))}
                </div>

                <h3 className="text-foreground font-black text-xl mb-2 leading-snug">{steps[step].question}</h3>
                <p className="text-muted text-sm mb-8">{steps[step].sub}</p>

                {steps[step].component}

                <button
                  onClick={handleNext}
                  className="mt-8 w-full bg-gold-gradient text-background font-black py-4 rounded-2xl text-lg hover:shadow-gold-strong transition-all hover:-translate-y-0.5"
                >
                  {step < steps.length - 1 ? "التالي ←" : "احسب الآن 🔥"}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Loss card */}
                <div className="glass rounded-3xl border border-red-500/25 p-6 text-center">
                  <div className="text-4xl mb-3">😰</div>
                  <p className="text-muted text-sm mb-2">أنت تخسر كل شهر بسبب العملاء غير المُجابين</p>
                  <div className="text-5xl font-black text-red-400 mb-2">
                    <AnimatedNumber value={lostMonthly} suffix=" د.م" />
                  </div>
                  <p className="text-muted/60 text-xs">
                    {missedDaily} عميل/يوم × {avgOrder} درهم × ٣٠ يوم
                  </p>
                </div>

                {/* Gain card */}
                <div className="glass-gold rounded-3xl border border-gold/35 p-6 text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <p className="text-muted text-sm mb-2">مع دُكّاني، يمكنك كسب إضافياً كل شهر</p>
                  <div className="text-5xl font-black text-gold-gradient mb-2">
                    <AnimatedNumber value={dukaniGain} suffix=" د.م" />
                  </div>
                  <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold">
                    <span>عائد استثمار</span>
                    <span className="text-lg"><AnimatedNumber value={roi} suffix="٪" /></span>
                  </div>
                </div>

                {/* ROI summary */}
                <div className="glass rounded-3xl border border-border p-5">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted">تكلفة دُكّاني الأساسي</span>
                    <span className="text-foreground font-bold">{plan} درهم/شهر</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-muted">صافي الربح الإضافي</span>
                    <span className="text-green-400 font-black text-lg">{(dukaniGain - plan).toLocaleString("ar-MA")} درهم/شهر</span>
                  </div>
                  <div className="h-px bg-border mb-4" />
                  <p className="text-muted text-xs text-center">
                    يعني في السنة الأولى، دُكّاني يربحك{" "}
                    <span className="text-gold font-black">{((dukaniGain - plan) * 12).toLocaleString("ar-MA")} درهم</span>
                  </p>
                </div>

                <a
                  href="/auth/register"
                  className="block w-full text-center bg-gold-gradient text-background font-black py-5 rounded-2xl text-xl hover:shadow-gold-strong transition-all hover:-translate-y-0.5"
                >
                  ابدأ الآن — واسترجع أموالك المفقودة ⚡
                </a>

                <button
                  onClick={() => { setShowResult(false); setStep(0); }}
                  className="w-full text-muted text-sm hover:text-foreground transition-colors py-2"
                >
                  إعادة الحساب
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
