"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

type NType = "sale" | "message" | "alert" | "system" | "achievement";

interface Notif {
  id: number;
  type: NType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  action?: string;
}

const typeConfig: Record<NType, { icon: string; color: string; bg: string }> = {
  sale:        { icon: "💰", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
  message:     { icon: "💬", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  alert:       { icon: "⚠️", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  system:      { icon: "⚙️", color: "text-muted",      bg: "bg-surface-2 border-border" },
  achievement: { icon: "🏆", color: "text-gold",       bg: "bg-gold/10 border-gold/20" },
};

const initial: Notif[] = [
  { id: 1,  type: "sale",        title: "مبيعة جديدة! 🎉",              body: "فاطمة الزهراء اشترت جاكيت جلد الأطلس بـ390 درهم",        time: "منذ 3 دقائق",  read: false, action: "/dashboard/orders" },
  { id: 2,  type: "message",     title: "رسالة جديدة",                    body: "كريم بنعلي يسأل عن توفر حذاء بمقاس 42",                   time: "منذ 8 دقائق",  read: false, action: "/dashboard/conversations" },
  { id: 3,  type: "achievement", title: "إنجاز جديد! 🏆",               body: "حققت هدف 100 محادثة الشهرية — حصلت على شارة المتحدث",      time: "منذ 20 دقيقة", read: false, action: "/dashboard/achievements" },
  { id: 4,  type: "alert",       title: "مخزون منخفض",                   body: "جاكيت جلد الأطلس (L): تبقى 2 قطعة فقط!",                  time: "منذ ساعة",     read: false, action: "/dashboard/inventory" },
  { id: 5,  type: "sale",        title: "مبيعة جديدة! 🎉",              body: "يوسف الأمين اشترى حقيبة يد فاخرة بـ600 درهم",             time: "منذ 2 ساعة",   read: true,  action: "/dashboard/orders" },
  { id: 6,  type: "message",     title: "3 رسائل لم تُقرأ",             body: "عندك 3 محادثات تحتاج ردك في أسرع وقت",                    time: "منذ 3 ساعات",  read: true,  action: "/dashboard/conversations" },
  { id: 7,  type: "system",      title: "تحديث النظام",                   body: "تم تحديث مساعدك الذكي بإمكانيات أفضل للتعامل بالدارجة",    time: "أمس",          read: true  },
  { id: 8,  type: "alert",       title: "تقرب من الحد الأقصى",           body: "استخدمت 73 محادثة من 100 — فكّر في الترقية قبل النفاذ",   time: "أمس",          read: true,  action: "/dashboard/subscription" },
  { id: 9,  type: "achievement", title: "أسبوع ممتاز! 🔥",              body: "حققت 28 مبيعة هذا الأسبوع — أعلى من الأسبوع الماضي بـ40٪", time: "منذ يومين",    read: true,  action: "/dashboard/analytics" },
  { id: 10, type: "sale",        title: "أعلى مبيعة اليوم",              body: "هند الرحالي اشترت منتجات بـ490 درهم دفعة واحدة",          time: "منذ يومين",    read: true,  action: "/dashboard/orders" },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>(initial);
  const [filter, setFilter] = useState<NType | "all" | "unread">("all");

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead    = (id: number) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const remove      = (id: number) => setNotifs(prev => prev.filter(n => n.id !== id));

  const filtered = notifs.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "all")    return true;
    return n.type === filter;
  });

  return (
    <>
      <TopBar title="الإشعارات" subtitle="ابق على اطلاع بكل ما يحدث في متجرك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-5 max-w-3xl">
        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {([
              { id: "all",         label: `الكل (${notifs.length})` },
              { id: "unread",      label: `غير مقروء (${unreadCount})` },
              { id: "sale",        label: "مبيعات" },
              { id: "message",     label: "رسائل" },
              { id: "alert",       label: "تنبيهات" },
              { id: "achievement", label: "إنجازات" },
            ] as { id: NType | "all" | "unread"; label: string }[]).map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === f.id ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}>
                {f.label}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              className="mr-auto text-xs text-gold hover:underline font-bold">
              تحديد الكل كمقروء
            </button>
          )}
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted">
              <div className="text-5xl mb-3">🔕</div>
              <p>لا توجد إشعارات</p>
            </motion.div>
          )}

          {filtered.map((n, i) => {
            const cfg = typeConfig[n.type];
            return (
              <motion.div key={n.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => markRead(n.id)}
                className={`relative glass rounded-2xl border p-5 cursor-pointer transition-all hover:border-gold/20 ${n.read ? "border-border opacity-70" : "border-gold/15 bg-gold/3"}`}>
                {!n.read && (
                  <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gold" />
                )}
                <div className="flex gap-4">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-xl flex-shrink-0 ${cfg.bg}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`font-black text-sm ${n.read ? "text-foreground/80" : "text-foreground"}`}>{n.title}</p>
                      <span className="text-muted text-xs flex-shrink-0">{n.time}</span>
                    </div>
                    <p className="text-muted text-sm mt-0.5 leading-relaxed">{n.body}</p>
                    <div className="flex gap-3 mt-2">
                      {n.action && (
                        <a href={n.action} className={`text-xs font-bold ${cfg.color} hover:underline`}>
                          عرض التفاصيل →
                        </a>
                      )}
                      <button onClick={e => { e.stopPropagation(); remove(n.id); }}
                        className="text-xs text-muted hover:text-red-400 transition-colors">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Settings */}
        <div className="glass rounded-2xl border border-border p-5">
          <h3 className="text-foreground font-black mb-4">إعدادات الإشعارات</h3>
          <div className="space-y-3">
            {[
              { label: "إشعارات المبيعات الجديدة", on: true },
              { label: "الرسائل الواردة", on: true },
              { label: "تنبيهات المخزون المنخفض", on: true },
              { label: "تقارير أسبوعية عبر واتساب", on: false },
              { label: "تحديثات النظام", on: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-foreground text-sm">{s.label}</span>
                <div className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${s.on ? "bg-gold" : "bg-surface-2 border border-border"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${s.on ? "right-0.5" : "right-5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
