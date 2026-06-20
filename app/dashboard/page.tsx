"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TopBar from "@/components/dashboard/TopBar";
import { useGamification } from "@/contexts/GamificationContext";

const stats = [
  { label: "محادثات اليوم",   value: "24",    change: "+12%",  positive: true,  icon: "💬", sub: "مقارنة بالأمس" },
  { label: "فرص بيع",        value: "8",     change: "+33%",  positive: true,  icon: "🎯", sub: "طلبات جديدة" },
  { label: "أكثر سؤال",      value: "السعر", change: "14 مرة", positive: null, icon: "❓", sub: "اليوم" },
  { label: "حالة الاشتراك",  value: "مجاني", change: "73 محادثة", positive: null, icon: "⭐", sub: "متبقية" },
];

const recentChats = [
  { name: "محمد أ.",  time: "منذ 2 دقيقة",  msg: "كم سعر الجبادور مقاس 42؟",   status: "يتصفح", statusColor: "text-gold" },
  { name: "فاطمة ب.", time: "منذ 8 دقائق",  msg: "عندكم شوارع USB للآيفون؟",  status: "طلب",    statusColor: "text-green-400" },
  { name: "يوسف خ.", time: "منذ 15 دقيقة", msg: "أبغى البيتزا العائلية",       status: "طلب",    statusColor: "text-green-400" },
  { name: "سارة م.", time: "منذ 32 دقيقة", msg: "الكريم ذاك واش كاين؟",        status: "يتصفح", statusColor: "text-gold" },
  { name: "كريم ع.", time: "منذ ساعة",      msg: "عندكم توصيل؟",               status: "انتهى",  statusColor: "text-muted" },
];

const topProducts = [
  { name: "جبادور جلدي بني",   requests: 18, icon: "👞" },
  { name: "بيتزا عائلية",      requests: 14, icon: "🍕" },
  { name: "شاحن آيفون أصلي",  requests: 11, icon: "🔌" },
  { name: "كريم الوجه الذهبي", requests: 9,  icon: "✨" },
];

const onboardingSteps = [
  { id: 1, icon: "📦", label: "أضف أول منتج",       done: true,  href: "/dashboard/products",  xp: 100 },
  { id: 2, icon: "🧠", label: "درّب المساعد الذكي", done: false, href: "/dashboard/knowledge", xp: 150 },
  { id: 3, icon: "🔗", label: "شارك رابط الشات",    done: false, href: "/dashboard/chat-link", xp: 75  },
  { id: 4, icon: "🎉", label: "استقبل أول طلبية",   done: false, href: "/dashboard/orders",    xp: 200 },
  { id: 5, icon: "❤️", label: "فعّل برنامج الولاء", done: false, href: "/dashboard/loyalty",   xp: 175 },
];

const liveActivity = [
  "تاجر في الدار البيضاء 🛒 أضاف 8 منتجات للتو",
  "تاجرة في الرباط 💰 حققت 3,200 درهم هذا الأسبوع",
  "47 تاجر انضموا اليوم ⚡",
  "تاجر في مراكش 🚀 رفع معدل تحويله إلى 41%",
  "فاطمة من فاس 🔥 أنهت أسبوعها بـ 28 طلبية",
];

function StatCard({ stat, i }: { stat: typeof stats[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}
      className="glass rounded-3xl p-5 border border-border hover:border-gold/25 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl bg-surface-2 flex items-center justify-center text-2xl group-hover:bg-gold/10 transition-colors">
          {stat.icon}
        </div>
        {stat.positive !== null ? (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            stat.positive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          }`}>{stat.change}</span>
        ) : (
          <span className="text-xs font-bold text-muted">{stat.change}</span>
        )}
      </div>
      <p className="text-3xl font-black text-foreground mb-1">{stat.value}</p>
      <p className="text-muted text-sm">{stat.label}</p>
      <p className="text-muted/60 text-xs mt-0.5">{stat.sub}</p>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { streak, xp, xpProgress, xpToNextLevel, levelInfo, unlockAchievement } = useGamification();
  const [activityIdx, setActivityIdx] = useState(0);
  const [showStreakBanner, setShowStreakBanner] = useState(false);
  const completedSteps = onboardingSteps.filter(s => s.done).length;
  const completionPct = Math.round((completedSteps / onboardingSteps.length) * 100);

  useEffect(() => {
    const t = setInterval(() => setActivityIdx(i => (i + 1) % liveActivity.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (streak >= 3) {
      setShowStreakBanner(true);
      if (streak === 3) unlockAchievement("streak_3");
      if (streak === 7) unlockAchievement("streak_7");
      if (streak === 30) unlockAchievement("streak_30");
      const t = setTimeout(() => setShowStreakBanner(false), 5000);
      return () => clearTimeout(t);
    }
  }, [streak, unlockAchievement]);

  return (
    <>
      <TopBar
        title="نظرة عامة"
        subtitle={`الجمعة، ${new Date().toLocaleDateString("ar-MA", { day: "numeric", month: "long", year: "numeric" })}`}
      />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">

        {/* Streak celebration */}
        <AnimatePresence>
          {showStreakBanner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="glass-gold rounded-2xl border border-gold/30 p-4 flex items-center gap-4"
            >
              <div className="text-4xl animate-bounce">🔥</div>
              <div>
                <p className="text-gold font-black text-lg">{streak} أيام متواصلة!</p>
                <p className="text-muted text-sm">أنت من أفضل 10% التجار نشاطاً — استمر على هذا المنوال!</p>
              </div>
              <div className="mr-auto text-green-400 font-black">+150 XP</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Insight + Live ticker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-2xl border border-gold/20 p-4 flex items-center gap-4 flex-wrap"
        >
          <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-xl flex-shrink-0">🧠</div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground text-sm font-bold">توصية ذكية</p>
            <p className="text-muted text-xs">عملاؤك يسألون كثيراً عن شواحن اللابتوب — فكّر في إضافتها!</p>
          </div>
          <div className="flex items-center gap-2 bg-black/20 rounded-xl px-3 py-2 max-w-[260px] hidden lg:flex">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <AnimatePresence mode="wait">
              <motion.p
                key={activityIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-muted text-xs truncate"
              >
                {liveActivity[activityIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
          <a href="/dashboard/products" className="text-gold text-sm font-bold hover:underline whitespace-nowrap">
            إضافة →
          </a>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => <StatCard key={i} stat={stat} i={i} />)}
        </div>

        {/* Onboarding / XP progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-xl">🚀</div>
              <div>
                <h3 className="text-foreground font-black">أكمل إعداد متجرك</h3>
                <p className="text-muted text-xs">{completedSteps} من {onboardingSteps.length} خطوات · {completionPct}% مكتمل</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-gold font-black text-xl">{xp} XP</p>
              <p className="text-muted text-xs">المستوى: <span style={{ color: levelInfo.color }}>{levelInfo.name}</span></p>
            </div>
          </div>
          <div className="h-2 bg-surface-2 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gold-gradient-h rounded-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {onboardingSteps.map((step) => (
              <a
                key={step.id}
                href={step.href}
                className={`flex sm:flex-col items-center gap-2 sm:gap-1 p-3 rounded-2xl border transition-all duration-200 ${
                  step.done
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-border hover:border-gold/30 hover:bg-gold/5 cursor-pointer"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${step.done ? "bg-green-500/20" : "bg-surface-2"}`}>
                  {step.done ? "✅" : step.icon}
                </div>
                <p className={`text-xs font-semibold text-center ${step.done ? "text-green-400" : "text-muted"}`}>
                  {step.label}
                </p>
                {!step.done && <span className="text-[10px] text-gold font-bold sm:mt-auto">+{step.xp} XP</span>}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent chats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 glass rounded-3xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground font-black">آخر المحادثات</h3>
              <a href="/dashboard/analytics" className="text-gold text-xs font-semibold hover:underline">عرض الكل</a>
            </div>
            <div className="space-y-3">
              {recentChats.map((chat, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-surface-2 transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-sm flex-shrink-0">
                    {chat.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground text-sm font-semibold">{chat.name}</span>
                      <span className="text-muted text-xs">{chat.time}</span>
                    </div>
                    <p className="text-muted text-xs truncate mt-0.5">{chat.msg}</p>
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap ${chat.statusColor}`}>{chat.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground font-black">الأكثر طلباً</h3>
              <span className="text-muted text-xs">اليوم</span>
            </div>
            <div className="space-y-4">
              {topProducts.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{p.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-xs font-semibold truncate">{p.name}</p>
                    <div className="mt-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(p.requests / 18) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        className="h-full bg-gold-gradient-h rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-gold text-xs font-bold flex-shrink-0">{p.requests}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <a href="/dashboard/products" className="flex items-center justify-center gap-2 text-sm font-semibold text-gold hover:underline">
                إدارة المنتجات
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Revenue Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="glass-gold rounded-3xl border border-gold/25 p-6"
        >
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-xl">🔮</div>
            <div>
              <h3 className="text-foreground font-black">توقعات الإيرادات — الشهر القادم</h3>
              <p className="text-muted text-xs">مبنية على معدل محادثاتك وسلوك عملائك</p>
            </div>
            <div className="mr-auto text-left">
              <p className="text-gold font-black text-2xl">4,800 د.م</p>
              <p className="text-green-400 text-xs font-semibold">↑ +34% عن الشهر الماضي</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "محادثات متوقعة", value: "720", icon: "💬" },
              { label: "طلبات متوقعة",   value: "260", icon: "🛒" },
              { label: "معدل التحويل",   value: "36%", icon: "🎯" },
            ].map((s, i) => (
              <div key={i} className="bg-black/20 rounded-2xl p-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="text-gold font-black text-lg">{s.value}</p>
                <p className="text-muted text-xs">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-500/5 border border-green-500/15 rounded-2xl">
            <p className="text-green-400 text-sm font-semibold">💡 رؤية الذكاء الاصطناعي:</p>
            <p className="text-muted text-xs mt-1">إذا أضفت خدمة التوصيل المجاني للطلبات فوق 300 درهم، يمكنك رفع معدل التحويل إلى 45% وتحقيق +1,200 درهم إضافية شهرياً.</p>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <h3 className="text-foreground font-black mb-4">وصول سريع</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/dashboard/orders",       icon: "📦", label: "الطلبيات",       badge: "2" },
              { href: "/dashboard/broadcast",    icon: "📢", label: "بث جماعي" },
              { href: "/dashboard/inventory",    icon: "🗃️", label: "المخزون",        badge: "!" },
              { href: "/dashboard/knowledge",    icon: "🧠", label: "قاعدة المعرفة" },
              { href: "/dashboard/loyalty",      icon: "❤️", label: "الولاء" },
              { href: "/dashboard/integrations", icon: "🔌", label: "التكاملات" },
              { href: "/dashboard/forecast",     icon: "📈", label: "التوقعات" },
              { href: "/dashboard/referral",     icon: "🤝", label: "الإحالة" },
              { href: "/dashboard/products",     icon: "➕", label: "إضافة منتج" },
              { href: "/dashboard/chat-link",    icon: "🔗", label: "رابط الشات" },
              { href: "/dashboard/reviews",      icon: "⭐", label: "التقييمات" },
              { href: "/pricing",                icon: "⚡", label: "ترقية الخطة" },
            ].map((action, i) => (
              <a
                key={i}
                href={action.href}
                className="relative glass rounded-2xl border border-border p-4 flex items-center gap-3 hover:border-gold/30 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                {action.badge && (
                  <span className="absolute top-2 left-2 w-4 h-4 rounded-full bg-gold text-background text-[9px] font-black flex items-center justify-center">
                    {action.badge}
                  </span>
                )}
                <span className="text-lg">{action.icon}</span>
                <span className="text-foreground text-xs font-semibold group-hover:text-gold transition-colors">{action.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  );
}
