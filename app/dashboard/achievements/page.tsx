"use client";

import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import { useGamification } from "@/contexts/GamificationContext";

const LEVELS = [
  { name: "تاجر مبتدئ",   nameEn: "Beginner",  min: 0,     max: 499,   color: "#8B7355", icon: "🌱" },
  { name: "تاجر نامٍ",    nameEn: "Growing",   min: 500,   max: 1499,  color: "#C0C0C0", icon: "📈" },
  { name: "تاجر محترف",   nameEn: "Pro",       min: 1500,  max: 4999,  color: "#C9A84C", icon: "⭐" },
  { name: "تاجر نخبة",    nameEn: "Elite",     min: 5000,  max: 14999, color: "#00D4FF", icon: "💎" },
  { name: "تاجر أسطوري",  nameEn: "Legend",    min: 15000, max: Infinity, color: "#FF6B6B", icon: "👑" },
];

export default function AchievementsPage() {
  const { xp, streak, longestStreak, achievements, levelInfo, xpProgress, xpToNextLevel, totalConversations, totalOrders, unlockAchievement } = useGamification();
  const currentLevelIdx = LEVELS.findIndex(l => l.name === levelInfo.name);
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <>
      <TopBar title="الإنجازات والمستويات" subtitle="تتبع تقدمك واكسب المكافآت" />
      <main className="flex-1 p-6 overflow-y-auto space-y-6">

        {/* Hero XP card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-3xl border border-gold/30 p-6"
        >
          <div className="flex items-center gap-5 mb-6 flex-wrap">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-2"
              style={{ borderColor: levelInfo.color, background: `${levelInfo.color}15` }}
            >
              {LEVELS[currentLevelIdx]?.icon || "⭐"}
            </div>
            <div className="flex-1">
              <p className="text-muted text-sm mb-0.5">مستواك الحالي</p>
              <h2 className="text-foreground font-black text-2xl" style={{ color: levelInfo.color }}>
                {levelInfo.name}
              </h2>
              <div className="flex items-center gap-4 mt-1 flex-wrap">
                <span className="text-foreground font-bold">{xp.toLocaleString()} XP</span>
                <span className="text-muted text-sm">
                  {xpToNextLevel > 0 ? `${xpToNextLevel.toLocaleString()} XP للمستوى التالي` : "المستوى الأعلى 🎉"}
                </span>
              </div>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-black text-orange-400">🔥 {streak}</p>
                <p className="text-muted text-xs">أيام متواصلة</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gold">{unlocked}/{achievements.length}</p>
                <p className="text-muted text-xs">إنجازات</p>
              </div>
            </div>
          </div>

          {/* XP progress bar */}
          <div>
            <div className="flex justify-between text-xs text-muted mb-1.5">
              <span>{levelInfo.name}</span>
              <span>{xpProgress}%</span>
              <span>{LEVELS[Math.min(currentLevelIdx + 1, LEVELS.length - 1)]?.name}</span>
            </div>
            <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${levelInfo.color}60, ${levelInfo.color})` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔥", label: "الحالي",    value: `${streak} يوم`,  sub: "سلسلة الأيام" },
            { icon: "⚡", label: "الأفضل",    value: `${longestStreak} يوم`, sub: "أطول سلسلة" },
            { icon: "💬", label: "محادثات",   value: totalConversations.toLocaleString(), sub: "إجمالي" },
            { icon: "📦", label: "طلبيات",    value: totalOrders.toLocaleString(),        sub: "إجمالي" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border p-4 text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-foreground font-black text-xl">{s.value}</p>
              <p className="text-gold text-xs font-semibold">{s.label}</p>
              <p className="text-muted text-xs">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Level progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <h3 className="text-foreground font-black mb-5">مسار المستويات</h3>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {LEVELS.map((level, i) => {
              const isReached = xp >= level.min;
              const isCurrent = levelInfo.name === level.name;
              return (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className={`flex flex-col items-center gap-1.5 ${isCurrent ? "scale-110" : ""} transition-transform`}>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 transition-all ${
                        isReached ? "border-current" : "border-border opacity-40"
                      } ${isCurrent ? "shadow-lg" : ""}`}
                      style={isReached ? { borderColor: level.color, background: `${level.color}15`, color: level.color } : {}}
                    >
                      {level.icon}
                    </div>
                    <p className="text-xs font-bold whitespace-nowrap" style={isReached ? { color: level.color } : { color: "#666" }}>
                      {level.name}
                    </p>
                    <p className="text-[10px] text-muted">{level.min.toLocaleString()}+ XP</p>
                  </div>
                  {i < LEVELS.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 rounded-full ${xp >= LEVELS[i + 1].min ? "bg-gold" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-foreground font-black">الإنجازات</h3>
            <span className="text-muted text-xs">{unlocked} / {achievements.length} مكتسبة</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                className={`relative p-4 rounded-2xl border text-center transition-all duration-200 ${
                  a.unlocked
                    ? "border-gold/30 bg-gold/5 hover:border-gold/50"
                    : "border-border opacity-50 grayscale"
                }`}
              >
                {a.unlocked && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className={`text-xs font-bold ${a.unlocked ? "text-foreground" : "text-muted"}`}>
                  {a.titleAr}
                </p>
                <p className="text-gold text-xs font-semibold mt-1">+{a.xp} XP</p>
                {a.unlockedAt && (
                  <p className="text-muted text-[10px] mt-0.5">
                    {new Date(a.unlockedAt).toLocaleDateString("ar-MA")}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Streak tips — Cialdini: commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <h3 className="text-foreground font-black mb-4">كيف تكسب XP أكثر؟</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: "📅", action: "سجّل دخولك يومياً",         xp: "+10 XP / يوم" },
              { icon: "📦", action: "أضف منتجاً جديداً",          xp: "+25 XP" },
              { icon: "💬", action: "استقبل 10 محادثات",          xp: "+50 XP" },
              { icon: "🎉", action: "أنجز طلبية",                 xp: "+100 XP" },
              { icon: "🧠", action: "أضف سؤالاً لقاعدة المعرفة",  xp: "+30 XP" },
              { icon: "❤️", action: "فعّل برنامج الولاء",         xp: "+175 XP" },
              { icon: "📢", action: "أرسل بثاً جماعياً",          xp: "+150 XP" },
              { icon: "⭐", action: "رد على تقييم عميل",          xp: "+40 XP" },
            ].map((tip, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-surface-2 hover:bg-gold/5 transition-colors">
                <span className="text-xl">{tip.icon}</span>
                <span className="text-foreground text-sm flex-1">{tip.action}</span>
                <span className="text-gold text-xs font-bold whitespace-nowrap">{tip.xp}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </>
  );
}
