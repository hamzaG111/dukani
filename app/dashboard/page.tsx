"use client";

import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const stats = [
  {
    label: "محادثات اليوم",
    value: "٢٤",
    change: "+١٢٪",
    positive: true,
    icon: "💬",
    sub: "مقارنة بالأمس",
  },
  {
    label: "فرص بيع",
    value: "٨",
    change: "+٣٣٪",
    positive: true,
    icon: "🎯",
    sub: "طلبات جديدة",
  },
  {
    label: "أكثر سؤال",
    value: "السعر",
    change: "١٤ مرة",
    positive: null,
    icon: "❓",
    sub: "اليوم",
  },
  {
    label: "حالة الاشتراك",
    value: "مجاني",
    change: "٧٣ محادثة",
    positive: null,
    icon: "⭐",
    sub: "متبقية",
  },
];

const recentChats = [
  { name: "محمد أ.", time: "منذ ٢ دقيقة", msg: "كم سعر الجبادور مقاس 42؟", status: "يتصفح", statusColor: "text-gold" },
  { name: "فاطمة ب.", time: "منذ ٨ دقائق", msg: "عندكم شوارع USB للآيفون؟", status: "طلب", statusColor: "text-green-400" },
  { name: "يوسف خ.", time: "منذ ١٥ دقيقة", msg: "أبغى البيتزا العائلية", status: "طلب", statusColor: "text-green-400" },
  { name: "سارة م.", time: "منذ ٣٢ دقيقة", msg: "الكريم ذاك واش كاين؟", status: "يتصفح", statusColor: "text-gold" },
  { name: "كريم ع.", time: "منذ ساعة", msg: "عندكم توصيل؟", status: "انتهى", statusColor: "text-muted" },
];

const topProducts = [
  { name: "جبادور جلدي بني", requests: 18, icon: "👞" },
  { name: "بيتزا عائلية", requests: 14, icon: "🍕" },
  { name: "شاحن آيفون أصلي", requests: 11, icon: "🔌" },
  { name: "كريم الوجه الذهبي", requests: 9, icon: "✨" },
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
        {stat.positive !== null && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            stat.positive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          }`}>
            {stat.change}
          </span>
        )}
        {stat.positive === null && (
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
  return (
    <>
      <TopBar
        title="نظرة عامة"
        subtitle={`الخميس، ${new Date().toLocaleDateString("ar-MA", { day: "numeric", month: "long", year: "numeric" })}`}
      />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* AI Insight Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-2xl border border-gold/20 p-4 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-xl flex-shrink-0">
            🧠
          </div>
          <div>
            <p className="text-foreground text-sm font-bold">توصية ذكية</p>
            <p className="text-muted text-xs">عملاؤك يسألون كثيراً عن شواحن اللابتوب — فكّر في إضافتها لمنتجاتك!</p>
          </div>
          <button className="mr-auto text-gold text-sm font-bold hover:underline whitespace-nowrap">
            إضافة →
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => <StatCard key={i} stat={stat} i={i} />)}
        </div>

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
              <a href="/dashboard/analytics" className="text-gold text-xs font-semibold hover:underline">
                عرض الكل
              </a>
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
                  <span className={`text-xs font-semibold whitespace-nowrap ${chat.statusColor}`}>
                    {chat.status}
                  </span>
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
                      <div
                        className="h-full bg-gold-gradient-h rounded-full"
                        style={{ width: `${(p.requests / 18) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-gold text-xs font-bold flex-shrink-0">{p.requests}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <a
                href="/dashboard/products"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-gold hover:underline"
              >
                إدارة المنتجات
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { href: "/dashboard/products", icon: "➕", label: "إضافة منتج" },
            { href: "/dashboard/chat-link", icon: "🔗", label: "مشاركة الرابط" },
            { href: "/dashboard/settings", icon: "🎨", label: "تخصيص الشات" },
            { href: "/pricing", icon: "⚡", label: "ترقية الخطة" },
          ].map((action, i) => (
            <a
              key={i}
              href={action.href}
              className="glass rounded-2xl border border-border p-4 flex items-center gap-3 hover:border-gold/30 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-foreground text-sm font-semibold group-hover:text-gold transition-colors">
                {action.label}
              </span>
            </a>
          ))}
        </motion.div>
      </main>
    </>
  );
}
