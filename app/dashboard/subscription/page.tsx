"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";

const plans = [
  {
    id: "free",
    name: "مجاني",
    price: 0,
    features: ["١٠٠ محادثة/شهر", "منتج واحد", "رابط شات", "ردود بالعربية"],
    current: true,
  },
  {
    id: "basic",
    name: "الأساسي",
    price: 149,
    features: ["١٠٠٠ محادثة/شهر", "٥٠ منتج", "رابط مخصص", "٤ لغات", "QR Code", "تحليلات أساسية", "دعم واتساب"],
    current: false,
    popular: true,
  },
  {
    id: "pro",
    name: "الاحترافي",
    price: 399,
    features: ["محادثات لا محدودة", "منتجات لا محدودة", "روابط متعددة", "تحليلات متقدمة", "إزالة شعار دكاني", "API مخصص", "دعم ٢٤/٧"],
    current: false,
  },
];

const history = [
  { date: "١ يونيو ٢٠٢٦", plan: "مجاني", amount: "٠ درهم", status: "تجربة" },
  { date: "١ مايو ٢٠٢٦", plan: "مجاني", amount: "٠ درهم", status: "تجربة" },
];

export default function SubscriptionPage() {
  const [upgrading, setUpgrading] = useState<string | null>(null);

  const usage = { chats: 27, chatsLimit: 100, products: 5, productsLimit: 1 };
  const usagePercent = Math.round((usage.chats / usage.chatsLimit) * 100);

  return (
    <>
      <TopBar title="الاشتراك والفوترة" subtitle="إدارة خطتك وفواتيرك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl">
        {/* Current plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-3xl border border-gold/20 p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-muted text-xs font-semibold uppercase tracking-widest mb-1">خطتك الحالية</p>
              <h2 className="text-foreground font-black text-2xl">الخطة المجانية</h2>
              <p className="text-muted text-sm mt-1">تجربة مجانية — لا تنتهي</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-gold-gradient">٠</span>
              <span className="text-muted text-sm mr-1">درهم/شهر</span>
            </div>
          </div>

          {/* Usage */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground text-sm font-semibold">المحادثات</span>
                <span className="text-muted text-xs">{usage.chats} / {usage.chatsLimit}</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${usagePercent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`h-full rounded-full ${usagePercent > 80 ? "bg-red-500" : usagePercent > 60 ? "bg-gold" : "bg-green-500"}`}
                />
              </div>
              {usagePercent > 70 && (
                <p className="text-gold text-xs mt-1">⚠️ اقتربت من الحد الأقصى — فكّر في الترقية</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground text-sm font-semibold">المنتجات المضافة</span>
                <span className="text-muted text-xs">٥ / ١ (تجاوزت الحد — الترقية مطلوبة)</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full w-full bg-red-500 rounded-full" />
              </div>
              <p className="text-red-400 text-xs mt-1">⚠️ تجاوزت حد المنتجات — يرجى الترقية لإضافة المزيد</p>
            </div>
          </div>
        </motion.div>

        {/* Upgrade plans */}
        <div>
          <h3 className="text-foreground font-black text-lg mb-4">الترقية للاستفادة الكاملة</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-3xl border p-5 transition-all ${
                  plan.current
                    ? "glass border-gold/20 bg-gold/5"
                    : plan.popular
                    ? "glass-gold border-gold/35"
                    : "glass border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-gold-gradient text-background text-xs font-black px-3 py-0.5 rounded-full whitespace-nowrap">
                    الأكثر شيوعاً
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-surface-2 border border-border text-muted text-xs font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                    خطتك الحالية
                  </div>
                )}

                <h4 className="text-foreground font-black text-lg mt-2 mb-1">{plan.name}</h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className={`text-3xl font-black ${plan.price === 0 ? "text-muted" : "text-gold-gradient"}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted text-xs mb-1">{plan.price === 0 ? "مجاني" : "درهم/شهر"}</span>
                </div>

                <ul className="space-y-2 mb-5">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-foreground/80">
                      <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <div className="text-center text-muted text-xs py-2.5 border border-border rounded-xl">
                    خطتك الحالية
                  </div>
                ) : (
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    size="sm"
                    loading={upgrading === plan.id}
                    onClick={() => {
                      setUpgrading(plan.id);
                      setTimeout(() => setUpgrading(null), 2000);
                    }}
                    className="w-full"
                  >
                    الترقية لـ {plan.name}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Billing history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <h3 className="text-foreground font-black text-lg mb-5">سجل الفواتير</h3>
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted text-sm">لا توجد فواتير بعد</div>
          ) : (
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-surface-2 flex items-center justify-center text-base">🧾</div>
                    <div>
                      <p className="text-foreground text-sm font-semibold">{h.plan}</p>
                      <p className="text-muted text-xs">{h.date}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-sm font-bold">{h.amount}</p>
                    <span className="text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Payment method placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground font-black text-lg">طريقة الدفع</h3>
            <button className="text-gold text-sm font-semibold hover:underline">إضافة بطاقة</button>
          </div>
          <div className="flex items-center gap-4 p-4 bg-surface-2 rounded-2xl border border-border">
            <div className="text-3xl">💳</div>
            <div>
              <p className="text-foreground text-sm font-semibold">لا توجد بطاقة مضافة</p>
              <p className="text-muted text-xs">أضف بطاقة Visa أو Mastercard لتفعيل الاشتراك</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-muted text-xs">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            دفع آمن ومشفر بـ SSL
          </div>
        </motion.div>
      </main>
    </>
  );
}
