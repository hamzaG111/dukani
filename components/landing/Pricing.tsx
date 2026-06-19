"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";

const plans = [
  {
    name: "مجاني",
    nameEn: "Free",
    price: { monthly: 0, yearly: 0 },
    currency: "درهم",
    description: "ابدأ مجاناً واكتشف قوة دُكّاني",
    features: [
      "١٠٠ محادثة شهرياً",
      "منتج واحد",
      "رابط شات واحد",
      "ردود بالعربية والدارجة",
      "دعم عبر البريد",
    ],
    unavailable: ["تحليلات متقدمة", "QR Code", "إزالة شعار دكاني", "دعم أولوية"],
    cta: "ابدأ مجاناً",
    highlight: false,
    badge: null,
  },
  {
    name: "الأساسي",
    nameEn: "Basic",
    price: { monthly: 149, yearly: 99 },
    currency: "درهم/شهر",
    description: "للتاجر الجاد الذي يريد النمو",
    features: [
      "١٠٠٠ محادثة شهرياً",
      "٥٠ منتج",
      "رابط شات مخصص",
      "ردود بـ ٤ لغات",
      "QR Code قابل للتحميل",
      "تحليلات أساسية",
      "دعم واتساب",
    ],
    unavailable: ["إزالة شعار دكاني", "API مخصص"],
    cta: "ابدأ الآن",
    highlight: true,
    badge: "الأكثر شيوعاً",
  },
  {
    name: "الاحترافي",
    nameEn: "Pro",
    price: { monthly: 399, yearly: 269 },
    currency: "درهم/شهر",
    description: "للتجار الكبار والمتاجر المتعددة",
    features: [
      "محادثات غير محدودة",
      "منتجات غير محدودة",
      "روابط شات متعددة",
      "جميع اللغات",
      "QR Code + مواد تسويقية",
      "تحليلات متقدمة + تنبؤية",
      "إزالة كاملة لشعار دكاني",
      "API مخصص",
      "دعم أولوية ٢٤/٧",
    ],
    unavailable: [],
    cta: "ابدأ الاحترافي",
    highlight: false,
    badge: null,
  },
];

const faqs = [
  {
    q: "هل أحتاج بطاقة بنكية للتجربة المجانية؟",
    a: "لا! التجربة مجانية تماماً بدون أي بيانات بنكية. ستُطلب منك فقط عند الترقية لخطة مدفوعة.",
  },
  {
    q: "هل يمكنني إلغاء اشتراكي في أي وقت؟",
    a: "نعم، يمكنك الإلغاء في أي لحظة من لوحة التحكم. لا عقود، لا رسوم خفية.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نقبل بطاقات Visa وMastercard، ونعمل على إضافة الدفع عبر CMI وPayPal قريباً.",
  },
  {
    q: "هل يدعم المتاجر المتعددة؟",
    a: "نعم! في الخطة الاحترافية يمكنك إدارة متاجر متعددة بروابط شات مستقلة لكل واحد.",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 relative bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">الأسعار</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            سعر يناسب كل تاجر
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
            ابدأ مجاناً وانتقل للخطة المدفوعة عندما تكون جاهزاً
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-full p-1 border border-border">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                !yearly ? "bg-gold text-background" : "text-muted hover:text-foreground"
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                yearly ? "bg-gold text-background" : "text-muted hover:text-foreground"
              }`}
            >
              سنوي
              <span className="bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded-full">وفّر ٣٣٪</span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "glass-gold border-gold/40 shadow-gold"
                  : "glass border-border"
              }`}
            >
              {plan.highlight && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl bg-gold-gradient-h" />
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-gold-gradient text-background text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}
                </>
              )}

              <div className="mb-6">
                <h3 className="text-foreground font-black text-2xl mb-1">{plan.name}</h3>
                <p className="text-muted text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-gold-gradient">
                    {yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted text-sm mb-2 mr-1">{plan.currency}</span>
                  )}
                  {plan.price.monthly === 0 && (
                    <span className="text-muted text-sm mb-2 mr-1">للأبد</span>
                  )}
                </div>
                {yearly && plan.price.monthly > 0 && (
                  <p className="text-muted text-xs mt-1">
                    بدلاً من <span className="line-through">{plan.price.monthly}</span> درهم/شهر
                  </p>
                )}
              </div>

              <Button
                variant={plan.highlight ? "primary" : "secondary"}
                className="w-full mb-8"
                size="md"
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-foreground">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
                {plan.unavailable.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-muted/40">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            { icon: "🔒", text: "لا حاجة لبطاقة" },
            { icon: "↩️", text: "استرجاع خلال ٧ أيام" },
            { icon: "🚀", text: "إعداد فوري" },
            { icon: "💬", text: "دعم بالعربية" },
          ].map((g, i) => (
            <div key={i} className="flex items-center gap-2 text-muted text-sm">
              <span className="text-lg">{g.icon}</span>
              {g.text}
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-black text-foreground text-center mb-8">أسئلة متكررة</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right"
                >
                  <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold text-xl font-light flex-shrink-0 mr-4"
                  >
                    +
                  </motion.span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
