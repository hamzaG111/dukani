"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

export interface Achievement {
  id: string;
  icon: string;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  xp: number;
  unlocked: boolean;
  unlockedAt?: string;
}

interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastActive: string;
  achievements: Achievement[];
  accountCompletion: number;
  totalConversations: number;
  totalOrders: number;
  pendingAchievement: Achievement | null;
}

interface GamificationContextType extends GamificationState {
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  dismissAchievement: () => void;
  levelInfo: { name: string; nameEn: string; nameFr: string; min: number; max: number; color: string };
  xpToNextLevel: number;
  xpProgress: number;
}

const LEVELS = [
  { min: 0,    max: 499,   name: "تاجر مبتدئ",   nameEn: "Beginner",  nameFr: "Débutant",  color: "#8B7355" },
  { min: 500,  max: 1499,  name: "تاجر نامٍ",    nameEn: "Growing",   nameFr: "En croissance", color: "#C0C0C0" },
  { min: 1500, max: 4999,  name: "تاجر محترف",   nameEn: "Pro",       nameFr: "Pro",       color: "#C9A84C" },
  { min: 5000, max: 14999, name: "تاجر نخبة",    nameEn: "Elite",     nameFr: "Élite",     color: "#00D4FF" },
  { min: 15000, max: Infinity, name: "تاجر أسطوري", nameEn: "Legend", nameFr: "Légende",  color: "#FF6B6B" },
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "first_login",    icon: "🌟", titleAr: "أول خطوة",        titleFr: "Premier pas",    titleEn: "First step",      xp: 50,  unlocked: true,  unlockedAt: new Date().toISOString() },
  { id: "first_product",  icon: "📦", titleAr: "أول منتج",        titleFr: "Premier produit", titleEn: "First product",   xp: 100, unlocked: false },
  { id: "first_chat",     icon: "💬", titleAr: "أول محادثة",      titleFr: "Premier chat",   titleEn: "First chat",      xp: 75,  unlocked: false },
  { id: "first_order",    icon: "🎉", titleAr: "أول بيعة",        titleFr: "Première vente", titleEn: "First sale",      xp: 200, unlocked: false },
  { id: "streak_3",       icon: "🔥", titleAr: "3 أيام متواصلة",  titleFr: "3 jours de suite",titleEn: "3-day streak",    xp: 150, unlocked: false },
  { id: "streak_7",       icon: "⚡", titleAr: "أسبوع كامل",      titleFr: "Une semaine",    titleEn: "Full week",       xp: 300, unlocked: false },
  { id: "streak_30",      icon: "👑", titleAr: "شهر متواصل",      titleFr: "Un mois complet", titleEn: "Full month",     xp: 1000, unlocked: false },
  { id: "ten_orders",     icon: "🚀", titleAr: "10 طلبيات",       titleFr: "10 commandes",   titleEn: "10 orders",       xp: 500, unlocked: false },
  { id: "knowledge_base", icon: "🧠", titleAr: "ذكاء مدرّب",      titleFr: "IA entraînée",   titleEn: "Trained AI",      xp: 250, unlocked: false },
  { id: "broadcast_sent", icon: "📢", titleAr: "أول بث جماعي",    titleFr: "Premier broadcast",titleEn: "First broadcast", xp: 150, unlocked: false },
  { id: "profile_100",    icon: "✅", titleAr: "ملف مكتمل 100٪",  titleFr: "Profil complet", titleEn: "Complete profile", xp: 200, unlocked: false },
  { id: "loyalty_setup",  icon: "❤️", titleAr: "برنامج الولاء",   titleFr: "Programme fidélité",titleEn: "Loyalty setup", xp: 175, unlocked: false },
];

const DEFAULT_STATE: GamificationState = {
  xp: 50,
  level: 0,
  streak: 1,
  longestStreak: 1,
  lastActive: new Date().toISOString().split("T")[0],
  achievements: DEFAULT_ACHIEVEMENTS,
  accountCompletion: 25,
  totalConversations: 24,
  totalOrders: 8,
  pendingAchievement: null,
};

const GamificationContext = createContext<GamificationContextType>({} as GamificationContextType);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GamificationState>(DEFAULT_STATE);

  useEffect(() => {
    const saved = localStorage.getItem("dukani_gamification");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const today = new Date().toISOString().split("T")[0];
        const lastActive = parsed.lastActive;
        const dayDiff = Math.floor((new Date(today).getTime() - new Date(lastActive).getTime()) / 86400000);

        let streak = parsed.streak || 1;
        let longestStreak = parsed.longestStreak || 1;

        if (dayDiff === 1) {
          streak += 1;
          if (streak > longestStreak) longestStreak = streak;
        } else if (dayDiff > 1) {
          streak = 1;
        }

        setState({ ...parsed, streak, longestStreak, lastActive: today, pendingAchievement: null });
      } catch {
        setState(DEFAULT_STATE);
      }
    } else {
      setState(DEFAULT_STATE);
    }
  }, []);

  useEffect(() => {
    if (state !== DEFAULT_STATE) {
      const { pendingAchievement, ...toSave } = state;
      localStorage.setItem("dukani_gamification", JSON.stringify(toSave));
    }
  }, [state]);

  const getLevelIndex = (xp: number) => LEVELS.findIndex((l, i) => xp >= l.min && (i === LEVELS.length - 1 || xp < LEVELS[i + 1].min));

  const addXP = useCallback((amount: number) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = getLevelIndex(newXP);
      return { ...prev, xp: newXP, level: Math.max(0, newLevel) };
    });
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setState(prev => {
      const achievement = prev.achievements.find(a => a.id === id);
      if (!achievement || achievement.unlocked) return prev;
      const updatedAchievement = { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() };
      return {
        ...prev,
        xp: prev.xp + achievement.xp,
        achievements: prev.achievements.map(a => a.id === id ? updatedAchievement : a),
        pendingAchievement: updatedAchievement,
      };
    });
  }, []);

  const dismissAchievement = useCallback(() => {
    setState(prev => ({ ...prev, pendingAchievement: null }));
  }, []);

  const levelInfo = LEVELS[Math.max(0, getLevelIndex(state.xp))] || LEVELS[0];
  const nextLevel = LEVELS[Math.min(LEVELS.length - 1, getLevelIndex(state.xp) + 1)];
  const xpToNextLevel = nextLevel.min - state.xp;
  const xpProgress = nextLevel.min === Infinity ? 100 : Math.round(((state.xp - levelInfo.min) / (nextLevel.min - levelInfo.min)) * 100);

  return (
    <GamificationContext.Provider value={{ ...state, addXP, unlockAchievement, dismissAchievement, levelInfo, xpToNextLevel, xpProgress }}>
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamification = () => useContext(GamificationContext);
