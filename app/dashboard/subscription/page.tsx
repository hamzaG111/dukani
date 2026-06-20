"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";

const PLANS = [
  {
    id: "free",
    name: "مجاني",
    nameEn: "Free",
    price: 0,
    yearlyPrice: 0,
    emoji: "🌱",
    color: "#6B7280",
    limits: { chats: 100, products: 3, stores: 1 },
    features: [
      { text: "100 محادثة / شهر", icon: "💬" },
      { text: "3 منتجات", icon: "📦" },
      { text: "رابط شات مجاني", icon: "🔗" },
      { text: "ردود بالعربية والدارجة", icon: "🌍" },
      { text: "لوحة تحكم أساسية", icon: "📊" },
    ],
    notIncluded: ["QR Code", "لغة فرنسية", "تحليلات متقدمة", "إزالة شعار دكاني"],
    cta: "خطتك الحالية",
    current: true,
  },
  {
    id: "starter",
    name: "الناشئ",
    nameEn: "Starter",
    price: 99,
    yearlyPrice: 79,
    emoji: "🚀",
    color: "#3B82F6",
    limits: { chats: 500, products: 25, stores: 1 },
    features: [
      { text: "500 محادثة / شهر", icon: "💬" },
      { text: "25 منتج", icon: "📦" },
      { text: "رابط مخصص بدومين", icon: "🔗" },
      { text: "3 لغات (ع / دار / فر)", icon: "🌍" },
      { text: "QR Code قابل للتحميل", icon: "📱" },
      { text: "تحليلات أساسية", icon: "📊" },
      { text: "دعم واتساب", icon: "🎧" },
    ],
    notIncluded: ["منتجات لا محدودة", "إزالة شعار دكاني", "API"],
    cta: "ابدأ بـ 99 درهم",
    popular: false,
  },
  {
    id: "pro",
    name: "الاحترافي",
    nameEn: "Pro",
    price: 249,
    yearlyPrice: 199,
    emoji: "⚡",
    color: "#C9A84C",
    limits: { chats: 2000, products: 100, stores: 1 },
    features: [
      { text: "2000 محادثة / شهر", icon: "💬" },
      { text: "100 منتج", icon: "📦" },
      { text: "رابط مخصص + QR Code", icon: "🔗" },
      { text: "4 لغات كاملة", icon: "🌍" },
      { text: "تحليلات متقدمة + تقارير", icon: "📊" },
      { text: "إزالة شعار دكاني", icon: "✨" },
      { text: "أولوية في الدعم", icon: "🎧" },
      { text: "حملات بث للعملاء", icon: "📣" },
    ],
    notIncluded: ["محادثات لا محدودة", "API مخصص"],
    cta: "الترقية لـ Pro",
    popular: true,
  },
  {
    id: "elite",
    name: "النخبة",
    nameEn: "Elite",
    price: 599,
    yearlyPrice: 479,
    emoji: "👑",
    color: "#8B5CF6",
    limits: { chats: Infinity, products: Infinity, stores: 3 },
    features: [
      { text: "محادثات لا محدودة", icon: "💬" },
      { text: "منتجات لا محدودة", icon: "📦" },
      { text: "3 متاجر / حساب واحد", icon: "🏪" },
      { text: "API مخصص للمطورين", icon: "⚙️" },
      { text: "تحليلات AI + توقعات", icon: "🤖" },
      { text: "مدير حساب خاص", icon: "👤" },
      { text: "دعم 24/7 أولوية قصوى", icon: "🎧" },
      { text: "تخصيص كامل للبوت", icon: "✨" },
    ],
    notIncluded: [],
    cta: "الترقية لـ Elite",
  },
];

const PAYMENT_METHODS = [
  { icon: "💳", name: "Visa / Mastercard", desc: "بطاقة بنكية دولية" },
  { icon: "🏦", name: "CMI", desc: "الدفع بالبطاقة المغربية" },
  { icon: "📱", name: "M-Wallet", desc: "محفظة إلكترونية (قريباً)" },
];

const FAQ = [
  { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "نعم، يمكنك الإلغاء في أي لحظة بدون رسوم إضافية. تبقى مزايا الاشتراك حتى نهاية الشهر المدفوع." },
  { q: "هل هناك تجربة مجانية للخطط المدفوعة؟", a: "نعم! تحصل على 14 يوم مجاني عند ترقيتك لأول مرة لأي خطة مدفوعة بدون الحاجة لإدخال بيانات البطاقة." },
  { q: "ما هي طرق الدفع المقبولة؟", a: "نقبل Visa وMastercard والبطاقات المغربية عبر CMI. الدفع يتم بالدرهم المغربي." },
  { q: "ماذا يحدث إذا تجاوزت حد المحادثات؟", a: "سيتوقف المساعد مؤقتاً حتى نهاية الشهر أو حتى الترقية. لن يتم فرض أي رسوم إضافية تلقائية." },
];

export default function SubscriptionPage() {
  const [yearly, setYearly] = useState(false);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [payModal, setPayModal] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { products } = useProducts();
  const currentPlan = PLANS[0];
  const usage = {
    chats: 27,
    chatsLimit: currentPlan.limits.chats,
    products: products.length,
    productsLimit: currentPlan.limits.products,
  };

  const chatsPercent = Math.round((usage.chats / usage.chatsLimit) * 100);
  const productsPercent = Math.min(100, Math.round((usage.products / usage.productsLimit) * 100));

  const handleUpgrade = (planId: string) => {
    setPayModal(planId);
  };

  const selectedPlan = PLANS.find(p => p.id === payModal);

  return (
    <>
      <TopBar title="الاشتراك والفوترة" subtitle="إدارة خطتك وطرق الدفع" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl">

        {/* Current plan card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-3xl border border-gold/20 p-6"
        >
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <p className="text-muted text-xs font-semibold uppercase tracking-widest mb-1">خطتك الحالية</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentPlan.emoji}</span>
                <h2 className="text-foreground font-black text-2xl">{currentPlan.name}</h2>
                <span className="bg-green-500/15 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">نشطة</span>
              </div>
              <p className="text-muted text-sm mt-1">الخطة المجانية — لا تنتهي</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-foreground">0</div>
              <p className="text-muted text-xs">درهم / شهر</p>
            </div>
          </div>

          {/* Usage meters */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground text-sm font-semibold">💬 المحادثات</span>
                <span className={`text-xs font-bold ${chatsPercent > 80 ? "text-red-400" : "text-muted"}`}>
                  {usage.chats} / {usage.chatsLimit}
                </span>
              </div>
              <div className="h-2.5 bg-surface rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${chatsPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${chatsPercent > 80 ? "bg-red-500" : chatsPercent > 60 ? "bg-gold" : "bg-green-500"}`}
                />
              </div>
              {chatsPercent > 70 && (
                <p className="text-gold text-xs mt-1">⚠️ قاربت على الحد — الترقية تتيح 500 محادثة</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground text-sm font-semibold">📦 المنتجات</span>
                <span className={`text-xs font-bold ${productsPercent >= 100 ? "text-red-400" : "text-muted"}`}>
                  {usage.products} / {usage.productsLimit}
                </span>
              </div>
              <div className="h-2.5 bg-surface rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${productsPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className={`h-full rounded-full ${productsPercent >= 100 ? "bg-red-500" : "bg-green-500"}`}
                />
              </div>
              {productsPercent >= 100 && (
                <p className="text-red-400 text-xs mt-1">⚠️ تجاوزت الحد — الترقية تتيح 25 منتج</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex items-center justify-between">
          <h3 className="text-foreground font-black text-lg">خطط الاشتراك</h3>
          <div className="flex items-center gap-2 bg-surface rounded-2xl p-1 border border-border">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${!yearly ? "bg-gold text-background" : "text-muted"}`}
            >
              شهري
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${yearly ? "bg-gold text-background" : "text-muted"}`}
            >
              سنوي
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${yearly ? "bg-background/20 text-background" : "bg-green-500/20 text-green-400"}`}>
                وفّر 20٪
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan, i) => {
            const displayPrice = yearly ? plan.yearlyPrice : plan.price;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`relative rounded-3xl border p-5 flex flex-col transition-all ${
                  plan.current
                    ? "glass border-border"
                    : plan.popular
                    ? "glass-gold border-gold/40 shadow-gold"
                    : "glass border-border hover:border-gold/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-gold-gradient text-background text-[10px] font-black px-3 py-0.5 rounded-full whitespace-nowrap shadow-gold">
                    الأكثر شيوعاً ⭐
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-surface border border-border text-muted text-[10px] font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                    خطتك الآن
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2 mb-3">
                  <span className="text-2xl">{plan.emoji}</span>
                  <div>
                    <h4 className="text-foreground font-black text-base leading-tight">{plan.name}</h4>
                    <p className="text-muted text-[10px]">{plan.nameEn}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-end gap-1">
                    <span className={`text-3xl font-black ${plan.price === 0 ? "text-muted" : "text-foreground"}`}>
                      {displayPrice}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted text-xs mb-1">درهم/شهر</span>
                    )}
                    {plan.price === 0 && (
                      <span className="text-muted text-xs mb-1">مجاني دائماً</span>
                    )}
                  </div>
                  {yearly && plan.price > 0 && (
                    <p className="text-green-400 text-xs mt-0.5">
                      وفّر {plan.price - plan.yearlyPrice} درهم/شهر
                    </p>
                  )}
                </div>

                <ul className="space-y-2 mb-5 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground/80">
                      <span className="text-sm leading-tight flex-shrink-0">{f.icon}</span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                  {plan.notIncluded.slice(0, 2).map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted/50 line-through">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <div className="text-center text-muted text-xs py-2.5 border border-border rounded-2xl">
                    ✓ خطتك الحالية
                  </div>
                ) : (
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    size="sm"
                    loading={upgrading === plan.id}
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Feature comparison note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-border p-4 flex items-center gap-4"
        >
          <div className="text-2xl flex-shrink-0">🔒</div>
          <div>
            <p className="text-foreground text-sm font-bold">14 يوم مجاني بدون بطاقة بنكية</p>
            <p className="text-muted text-xs">جرّب أي خطة مدفوعة 14 يوماً مجاناً. إذا لم تعجبك، لا تدفع شيئاً.</p>
          </div>
          <Button variant="primary" size="sm" className="flex-shrink-0" onClick={() => handleUpgrade("pro")}>
            جرّب مجاناً
          </Button>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <h3 className="text-foreground font-black text-lg mb-4">أسئلة شائعة</h3>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-right hover:bg-surface-2 transition-colors"
                >
                  <span className="text-foreground text-sm font-semibold">{item.q}</span>
                  <motion.svg
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-muted flex-shrink-0 mr-2"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-muted text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Billing history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <h3 className="text-foreground font-black text-lg mb-4">سجل الفواتير</h3>
          <div className="text-center py-10 space-y-2">
            <div className="text-4xl">🧾</div>
            <p className="text-foreground text-sm font-semibold">لا توجد فواتير بعد</p>
            <p className="text-muted text-xs">فواتيرك ستظهر هنا عند الاشتراك في خطة مدفوعة</p>
          </div>
        </motion.div>
      </main>

      {/* Payment modal */}
      <AnimatePresence>
        {payModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setPayModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="glass-gold rounded-3xl border border-gold/20 p-6 w-full max-w-md shadow-gold"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-muted text-xs">ترقية إلى</p>
                  <h3 className="text-foreground font-black text-xl flex items-center gap-2">
                    {selectedPlan.emoji} {selectedPlan.name}
                  </h3>
                </div>
                <button onClick={() => setPayModal(null)} className="text-muted hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-surface rounded-2xl p-4 mb-5 flex items-center justify-between">
                <div>
                  <p className="text-foreground font-bold text-lg">{yearly ? selectedPlan.yearlyPrice : selectedPlan.price} درهم</p>
                  <p className="text-muted text-xs">يُدفع {yearly ? "سنوياً" : "شهرياً"}</p>
                </div>
                <div className="bg-green-500/15 text-green-400 text-xs font-bold px-3 py-1.5 rounded-xl">
                  14 يوم مجاناً
                </div>
              </div>

              <p className="text-foreground text-sm font-bold mb-3">اختر طريقة الدفع</p>
              <div className="space-y-2 mb-5">
                {PAYMENT_METHODS.map((m, i) => (
                  <button
                    key={i}
                    disabled={m.name.includes("قريباً")}
                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-border hover:border-gold/40 hover:bg-gold/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-right"
                  >
                    <span className="text-xl">{m.icon}</span>
                    <div>
                      <p className="text-foreground text-sm font-semibold">{m.name}</p>
                      <p className="text-muted text-xs">{m.desc}</p>
                    </div>
                    {!m.name.includes("قريباً") && (
                      <svg className="w-4 h-4 text-muted mr-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-muted text-xs mb-4">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                دفع آمن ومشفر بـ SSL · إلغاء في أي وقت
              </div>

              <Button variant="primary" size="lg" className="w-full" loading={paymentLoading} onClick={async () => {
                setPaymentLoading(true);
                try {
                  const res = await fetch("/api/stripe/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ planId: selectedPlan.id, billing: yearly ? "yearly" : "monthly" }),
                  });
                  const data = await res.json() as { url?: string; demo?: boolean };
                  if (data.url) {
                    window.location.href = data.url;
                  }
                } catch {
                  // silently fail — show success anyway for demo
                } finally {
                  setPaymentLoading(false);
                  if (!process.env.NEXT_PUBLIC_STRIPE_KEY) setPayModal(null);
                }
              }}>
                ابدأ 14 يوم مجاناً →
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
