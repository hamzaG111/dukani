"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const tiers = [
  {
    name: "برونزي",
    icon: "🥉",
    color: "from-amber-700/20 to-amber-900/20",
    border: "border-amber-700/30",
    textColor: "text-amber-500",
    minPoints: 0,
    maxPoints: 499,
    perks: ["خصم ٥٪ دائم", "أولوية الدعم الفني", "وصول للمقالات المميزة"],
    customers: 142,
  },
  {
    name: "فضي",
    icon: "🥈",
    color: "from-slate-500/20 to-slate-700/20",
    border: "border-slate-500/30",
    textColor: "text-slate-400",
    minPoints: 500,
    maxPoints: 1499,
    perks: ["خصم ١٠٪ دائم", "شحن مجاني", "هدايا عيد الميلاد", "وصول مبكر للمنتجات"],
    customers: 68,
  },
  {
    name: "ذهبي",
    icon: "🥇",
    color: "from-gold/20 to-amber-500/20",
    border: "border-gold/30",
    textColor: "text-gold",
    minPoints: 1500,
    maxPoints: 4999,
    perks: ["خصم ١٥٪ دائم", "شحن سريع مجاني", "هدايا موسمية", "مدير حساب خاص", "دعوة لفعاليات VIP"],
    customers: 23,
  },
  {
    name: "بلاتيني",
    icon: "💎",
    color: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/30",
    textColor: "text-purple-400",
    minPoints: 5000,
    maxPoints: Infinity,
    perks: ["خصم ٢٠٪ دائم", "كل ما في الذهبي +", "منتجات حصرية", "بطاقة ولاء مادية", "تجربة تسوق VIP شخصية"],
    customers: 7,
  },
];

const topCustomers = [
  { name: "فاطمة الزهراء", points: 7240, tier: "بلاتيني", spent: "٤٥,٢٠٠", lastPurchase: "أمس" },
  { name: "كريم بنعلي", points: 5890, tier: "بلاتيني", spent: "٣٨,٩٠٠", lastPurchase: "منذ ٣ أيام" },
  { name: "سناء المنصوري", points: 4320, tier: "ذهبي", spent: "٢٩,٤٠٠", lastPurchase: "منذ أسبوع" },
  { name: "يوسف الأمين", points: 3190, tier: "ذهبي", spent: "٢١,٥٠٠", lastPurchase: "البارحة" },
  { name: "هند الرحالي", points: 1760, tier: "ذهبي", spent: "١٢,٨٠٠", lastPurchase: "اليوم" },
];

const recentActivity = [
  { customer: "فاطمة الزهراء", action: "ربحت ١٢٠ نقطة", sub: "بعد شراء عطر الورد", time: "منذ ٥ دقائق", icon: "⬆️" },
  { customer: "كريم بنعلي", action: "استبدل ٥٠٠ نقطة", sub: "بخصم ٥٠ درهم", time: "منذ ٢٠ دقيقة", icon: "🎁" },
  { customer: "سناء المنصوري", action: "ترقّت للمستوى الذهبي", sub: "مبروك! مكافأة ٢٠٠ نقطة", time: "منذ ساعة", icon: "🥇" },
  { customer: "أحمد رضا", action: "انضم لبرنامج الولاء", sub: "مرحباً بعضو جديد!", time: "منذ ٣ ساعات", icon: "👋" },
];

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "tiers" | "activity">("overview");
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);

  const totalMembers = tiers.reduce((s, t) => s + t.customers, 0);
  const tierMap: Record<string, string> = { "بلاتيني": "text-purple-400", "ذهبي": "text-gold", "فضي": "text-slate-400", "برونزي": "text-amber-500" };

  return (
    <>
      <TopBar title="برنامج الولاء" subtitle="كافئ زبائنك الأوفياء وارفع مبيعاتك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "أعضاء الولاء", value: totalMembers, icon: "👥", sub: "+١٢ هذا الأسبوع" },
            { label: "نقاط موزّعة", value: "٢٤,٨٠٠", icon: "⭐", sub: "هذا الشهر" },
            { label: "مكافآت مُستبدلة", value: "٨٩", icon: "🎁", sub: "قيمة: ٣,٢٠٠ د.م" },
            { label: "الإيرادات المحققة", value: "٦٨,٤٠٠ د.م", icon: "💰", sub: "من الأعضاء" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border p-4">
              <div className="text-xl mb-2">{s.icon}</div>
              <p className="text-gold font-black text-xl">{s.value}</p>
              <p className="text-foreground text-xs font-semibold">{s.label}</p>
              <p className="text-muted text-xs">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["overview", "tiers", "activity"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}>
              {tab === "overview" ? "أفضل الأعضاء" : tab === "tiers" ? "مستويات الولاء" : "النشاط الأخير"}
            </button>
          ))}
          <button onClick={() => setShowAddRewardModal(true)}
            className="mr-auto text-xs font-bold bg-gold/10 text-gold border border-gold/20 px-4 py-2 rounded-xl hover:bg-gold/20 transition-all">
            + إضافة مكافأة
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* Overview tab */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="glass rounded-2xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-foreground font-black">أكثر الزبائن ولاءً</h3>
                  <span className="text-muted text-xs">{totalMembers} عضو إجمالاً</span>
                </div>
                <div className="divide-y divide-border">
                  {topCustomers.map((c, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-surface-2 transition-colors">
                      <span className="text-lg w-6 text-center">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</span>
                      <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-sm font-black text-gold flex-shrink-0">
                        {c.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-bold text-sm">{c.name}</p>
                        <p className="text-muted text-xs">آخر شراء: {c.lastPurchase}</p>
                      </div>
                      <div className="text-center hidden md:block">
                        <p className="text-foreground font-black text-sm">{c.points.toLocaleString("ar-MA")} نقطة</p>
                        <p className="text-muted text-xs">النقاط</p>
                      </div>
                      <div className="text-center hidden md:block">
                        <p className="text-gold font-black text-sm">{c.spent} د.م</p>
                        <p className="text-muted text-xs">إجمالي الإنفاق</p>
                      </div>
                      <span className={`text-xs font-black ${tierMap[c.tier] || "text-muted"}`}>{c.tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tiers tab */}
          {activeTab === "tiers" && (
            <motion.div key="tiers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {tiers.map((tier, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className={`glass rounded-2xl border ${tier.border} p-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-3xl border ${tier.border}`}>
                      {tier.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-black text-xl ${tier.textColor}`}>{tier.name}</h3>
                        <span className="text-muted text-xs">{tier.customers} زبون</span>
                      </div>
                      <p className="text-muted text-sm mb-3">
                        {tier.maxPoints === Infinity
                          ? `${tier.minPoints.toLocaleString("ar-MA")}+ نقطة`
                          : `${tier.minPoints.toLocaleString("ar-MA")} – ${tier.maxPoints.toLocaleString("ar-MA")} نقطة`}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tier.perks.map((perk, j) => (
                          <span key={j} className={`text-xs font-semibold bg-surface-2 border ${tier.border} ${tier.textColor} px-2.5 py-1 rounded-full`}>
                            ✓ {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Activity tab */}
          {activeTab === "activity" && (
            <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="glass rounded-2xl border border-border overflow-hidden">
                <div className="divide-y divide-border">
                  {recentActivity.map((a, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                      className="p-4 flex items-center gap-4 hover:bg-surface-2 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-xl">
                        {a.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-bold text-sm">{a.customer}</p>
                        <p className="text-muted text-xs">{a.action} — {a.sub}</p>
                      </div>
                      <span className="text-muted text-xs">{a.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Setup guide */}
        <div className="glass-gold rounded-2xl border border-gold/20 p-5">
          <div className="flex items-center gap-4">
            <div className="text-3xl">⚙️</div>
            <div className="flex-1">
              <p className="text-foreground font-bold">إعداد برنامج الولاء</p>
              <p className="text-muted text-sm">حدد كيفية احتساب النقاط لكل درهم ينفقه زبائنك</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted text-sm">١ نقطة = ١ درهم</span>
              <button className="text-xs font-bold bg-gold/10 text-gold border border-gold/20 px-3 py-1.5 rounded-xl hover:bg-gold/20 transition-all">
                تعديل
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Reward Modal */}
      <AnimatePresence>
        {showAddRewardModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddRewardModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#141414] border border-border rounded-3xl p-8 w-full max-w-md">
              <h3 className="text-foreground font-black text-xl mb-6">مكافأة جديدة</h3>
              <div className="space-y-4">
                <input placeholder="اسم المكافأة (مثال: خصم ٣٠ درهم)" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40" />
                <input type="number" placeholder="النقاط المطلوبة" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40" />
                <select className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold/40">
                  <option>خصم على الشراء</option>
                  <option>منتج مجاني</option>
                  <option>شحن مجاني</option>
                  <option>هدية خاصة</option>
                </select>
                <button onClick={() => setShowAddRewardModal(false)}
                  className="w-full bg-gold-gradient text-background font-black py-4 rounded-2xl hover:shadow-gold transition-all">
                  إضافة المكافأة ⭐
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
