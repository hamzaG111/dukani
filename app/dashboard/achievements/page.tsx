"use client";

import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const achievements = [
  {
    id: "first-sale",
    icon: "🎉",
    name: "أول بيع!",
    desc: "أتممت أول صفقة بيع عبر دُكّاني",
    earned: true,
    date: "١٢ مايو ٢٠٢٦",
    xp: 100,
    rarity: "عادي",
    rarityColor: "text-gray-400",
  },
  {
    id: "speed-seller",
    icon: "⚡",
    name: "البائع السريع",
    desc: "أتممت ١٠ صفقات في يوم واحد",
    earned: true,
    date: "٢٠ مايو ٢٠٢٦",
    xp: 250,
    rarity: "نادر",
    rarityColor: "text-blue-400",
  },
  {
    id: "vip-maker",
    icon: "👑",
    name: "صانع VIP",
    desc: "حولت ٣ عملاء عاديين إلى VIP",
    earned: true,
    date: "٢٨ مايو ٢٠٢٦",
    xp: 500,
    rarity: "نادر جداً",
    rarityColor: "text-purple-400",
  },
  {
    id: "night-owl",
    icon: "🦉",
    name: "بائع الليل",
    desc: "أُتمَّت ٥ صفقات بعد منتصف الليل تلقائياً",
    earned: true,
    date: "٣ يونيو ٢٠٢٦",
    xp: 300,
    rarity: "نادر",
    rarityColor: "text-blue-400",
  },
  {
    id: "viral-store",
    icon: "🔥",
    name: "المتجر الفيروسي",
    desc: "تجاوز متجرك ١٠٠ زيارة في يوم واحد",
    earned: false,
    progress: 67,
    progressMax: 100,
    xp: 750,
    rarity: "أسطوري",
    rarityColor: "text-gold",
  },
  {
    id: "millionaire",
    icon: "💎",
    name: "المليون درهم",
    desc: "حققت مبيعات إجمالية بمليون درهم",
    earned: false,
    progress: 0.02,
    progressMax: 1,
    xp: 5000,
    rarity: "أسطوري",
    rarityColor: "text-gold",
  },
  {
    id: "referral-king",
    icon: "🤝",
    name: "ملك الإحالات",
    desc: "أحلت ١٠ تجار ناجحين",
    earned: false,
    progress: 3,
    progressMax: 10,
    xp: 1000,
    rarity: "نادر جداً",
    rarityColor: "text-purple-400",
  },
  {
    id: "five-stars",
    icon: "⭐",
    name: "الخمس نجوم",
    desc: "حافظت على تقييم ٥/٥ لمدة شهر كامل",
    earned: false,
    progress: 18,
    progressMax: 30,
    xp: 600,
    rarity: "نادر",
    rarityColor: "text-blue-400",
  },
];

const level = { current: 12, name: "تاجر نشط", xp: 2150, nextXp: 3000, nextName: "تاجر محترف" };

const leaderboard = [
  { rank: 1, name: "متجر الأطلس", city: "الدار البيضاء", xp: 8420, avatar: "م" },
  { rank: 2, name: "خزف فاس", city: "فاس", xp: 7310, avatar: "خ" },
  { rank: 3, name: "أركان مراكش", city: "مراكش", xp: 6890, avatar: "أ" },
  { rank: 4, name: "أنت 🏆", city: "—", xp: level.xp, avatar: "ت", isMe: true },
  { rank: 5, name: "نجمة طنجة", city: "طنجة", xp: 1890, avatar: "ن" },
];

export default function AchievementsPage() {
  const earnedCount = achievements.filter(a => a.earned).length;
  const totalXp = achievements.filter(a => a.earned).reduce((s, a) => s + a.xp, 0);

  return (
    <>
      <TopBar title="الإنجازات" subtitle="مستواك، عطاءاتك، شرفك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl">
        {/* Level card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-3xl border border-gold/25 p-6 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient-h" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gold-gradient flex items-center justify-center text-background font-black text-3xl shadow-gold">
                ت
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold border-2 border-[#141414] flex items-center justify-center text-background font-black text-xs">
                {level.current}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-foreground font-black text-xl">المستوى {level.current}</p>
                <span className="text-xs bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded-full">{level.name}</span>
              </div>
              <p className="text-muted text-sm mb-3">
                {level.xp.toLocaleString("ar-MA")} / {level.nextXp.toLocaleString("ar-MA")} XP — التالي: {level.nextName}
              </p>
              <div className="h-2.5 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(level.xp / level.nextXp) * 100}%` }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="h-full bg-gold-gradient-h rounded-full"
                />
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <p className="text-gold font-black text-3xl">{earnedCount}</p>
              <p className="text-muted text-xs">إنجاز</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Achievements grid */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-foreground font-black">الإنجازات ({earnedCount}/{achievements.length})</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass rounded-2xl border p-4 relative overflow-hidden transition-all ${
                    ach.earned
                      ? "border-gold/20 bg-gold/5"
                      : "border-border opacity-70"
                  }`}
                >
                  {ach.earned && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient-h" />}

                  <div className="flex items-start gap-3">
                    <div className={`text-3xl flex-shrink-0 ${!ach.earned ? "grayscale opacity-40" : ""}`}>
                      {ach.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className={`font-black text-sm ${ach.earned ? "text-foreground" : "text-muted"}`}>{ach.name}</p>
                        <span className={`text-[10px] font-bold ${ach.rarityColor}`}>{ach.rarity}</span>
                      </div>
                      <p className="text-muted text-xs leading-tight">{ach.desc}</p>

                      {ach.earned ? (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-gold text-xs font-bold">+{ach.xp} XP</span>
                          <span className="text-muted text-xs">• {ach.date}</span>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted mb-1">
                            <span>التقدم</span>
                            <span>{ach.progress} / {ach.progressMax}</span>
                          </div>
                          <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-muted/30 rounded-full"
                              style={{ width: `${((ach.progress as number) / (ach.progressMax as number)) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h3 className="text-foreground font-black mb-4">لوحة المتصدرين 🏆</h3>
            <div className="glass rounded-2xl border border-border overflow-hidden">
              {leaderboard.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-3 p-4 border-b border-border last:border-0 ${
                    entry.isMe ? "bg-gold/5 border-gold/20" : ""
                  }`}
                >
                  <span className={`w-6 text-center font-black text-sm ${
                    entry.rank === 1 ? "text-gold" : entry.rank === 2 ? "text-gray-300" : entry.rank === 3 ? "text-orange-400" : "text-muted"
                  }`}>
                    {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-background font-black text-sm ${entry.isMe ? "bg-gold-gradient" : "bg-surface-2 text-foreground"}`}>
                    {entry.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${entry.isMe ? "text-gold" : "text-foreground"}`}>{entry.name}</p>
                    {entry.city !== "—" && <p className="text-muted text-[10px]">{entry.city}</p>}
                  </div>
                  <span className={`text-xs font-black ${entry.isMe ? "text-gold" : "text-muted"}`}>
                    {entry.xp.toLocaleString("ar-MA")}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 glass-gold rounded-2xl border border-gold/20 p-4 text-center">
              <p className="text-gold font-black">+{level.nextXp - level.xp} XP</p>
              <p className="text-muted text-xs">للوصول للمستوى التالي</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
