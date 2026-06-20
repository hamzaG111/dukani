"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/contexts/GamificationContext";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { xp, levelInfo, streak } = useGamification();
  const initial = (user?.storeName || "م")[0];

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div>
        <h1 className="text-foreground font-black text-lg leading-tight">{title}</h1>
        {subtitle && <p className="text-muted text-xs">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-gold/30 transition-all"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-gold border border-surface" />
          </button>

          {notifOpen && (
            <div className="absolute left-0 top-11 w-72 glass rounded-2xl border border-border shadow-card p-4 space-y-3">
              <p className="text-xs font-bold text-foreground border-b border-border pb-2">الإشعارات</p>
              {[
                { icon: "💬", text: "عميل جديد في الشات — قبل 5 دقائق", gold: true },
                { icon: "📦", text: "تم طلب منتج: جبادور بني داكن", gold: false },
                { icon: "⭐", text: "حصلت على تقييم 5 نجوم!", gold: false },
              ].map((n, i) => (
                <div key={i} className={`flex items-start gap-2.5 p-2 rounded-xl ${n.gold ? "bg-gold/10" : ""}`}>
                  <span className="text-lg">{n.icon}</span>
                  <p className="text-xs text-muted">{n.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* XP + streak pill */}
        <div className="hidden sm:flex items-center gap-2 bg-surface-2 rounded-xl px-3 py-1.5 border border-border">
          <span className="text-orange-400 text-xs font-black">🔥 {streak}</span>
          <span className="w-px h-3 bg-border" />
          <span className="text-gold text-xs font-bold">{xp} XP</span>
        </div>

        {/* Avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center text-background font-black text-sm cursor-pointer hover:shadow-gold transition-shadow"
          >
            {initial}
          </button>

          {avatarOpen && (
            <div className="absolute left-0 top-11 w-56 glass rounded-2xl border border-border shadow-card p-3 space-y-1">
              <div className="px-2 py-1.5 border-b border-border mb-2">
                <p className="text-foreground text-sm font-bold">{user?.storeName || "متجرك"}</p>
                <p className="text-muted text-xs">{user?.email}</p>
                <p className="text-xs mt-0.5" style={{ color: levelInfo.color }}>{levelInfo.name}</p>
              </div>
              {[
                { href: "/dashboard/settings", label: "الإعدادات", icon: "⚙️" },
                { href: "/dashboard/subscription", label: "الاشتراك", icon: "⭐" },
                { href: "/dashboard/achievements", label: "الإنجازات", icon: "🏆" },
              ].map(item => (
                <a key={item.href} href={item.href}
                  className="flex items-center gap-2 px-2 py-2 rounded-xl text-muted hover:text-foreground hover:bg-surface-2 text-sm transition-colors">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
              <button onClick={logout}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-red-400 hover:bg-red-500/5 text-sm transition-colors">
                <span>🚪</span>
                <span>تسجيل الخروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
