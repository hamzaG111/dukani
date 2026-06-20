"use client";

import { useState, useEffect, useCallback } from "react";

export interface ChatMessage {
  from: "user" | "bot";
  text: string;
  time: string;
}

export interface ConversationAnalysis {
  intent: string;
  products: string[];
  satisfaction: number;
  converted: boolean;
}

export interface Conversation {
  id: string;
  customer: string;
  phone?: string;
  avatar: string;
  lastMsg: string;
  time: string;
  status: "sale" | "browsing" | "ended" | "pending";
  messages: ChatMessage[];
  analysis: ConversationAnalysis;
  channel: "whatsapp" | "web" | "instagram";
  createdAt: string;
}

const STORAGE_KEY = "dukani_conversations";

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    customer: "محمد الكنزاوي",
    phone: "+212 661 234 001",
    avatar: "م",
    lastMsg: "شكراً، سآخذ الجبادور البني داكن",
    time: "منذ 2 دقيقة",
    status: "sale",
    channel: "whatsapp",
    messages: [
      { from: "user", text: "السلام عليكم، كم سعر الجبادور مقاس 42؟", time: "7:31" },
      { from: "bot", text: "وعليكم السلام! 👋 الجبادور الجلدي البني داكن بمقاس 42 سعره 297 درهم بعد خصم 15٪. هل تريد مشاهدة باقي الألوان؟", time: "7:31" },
      { from: "user", text: "نعم، أريد مشاهدة الألوان المتوفرة", time: "7:32" },
      { from: "bot", text: "عندنا: بني داكن 297 درهم ✅ | بني فاتح 350 درهم ✅ | أسود 320 درهم ✅", time: "7:32" },
      { from: "user", text: "شكراً، سآخذ الجبادور البني داكن", time: "7:33" },
    ],
    analysis: { intent: "شراء أحذية", products: ["جبادور بني داكن"], satisfaction: 98, converted: true },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    customer: "فاطمة بنعلي",
    phone: "+212 661 234 002",
    avatar: "ف",
    lastMsg: "واش كاين توصيل لمراكش؟",
    time: "منذ 8 دقائق",
    status: "pending",
    channel: "whatsapp",
    messages: [
      { from: "user", text: "كيفاش نطلب؟", time: "7:23" },
      { from: "bot", text: "سهلة! 😊 اختاري المنتج اللي تبغي، ثم اضغطي 'أريده' وسأوصلك للتاجر على واتساب.", time: "7:23" },
      { from: "user", text: "واش كاين توصيل لمراكش؟", time: "7:24" },
    ],
    analysis: { intent: "استفسار توصيل", products: [], satisfaction: 72, converted: false },
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    customer: "يوسف الإدريسي",
    phone: "+212 661 234 003",
    avatar: "ي",
    lastMsg: "شكراً على المعلومات!",
    time: "منذ 20 دقيقة",
    status: "ended",
    channel: "web",
    messages: [
      { from: "user", text: "عندكم مقاس 45؟", time: "7:10" },
      { from: "bot", text: "مرحباً! للأسف مقاس 45 غير متوفر حالياً. المقاسات المتوفرة: 39 إلى 44 فقط.", time: "7:10" },
      { from: "user", text: "شكراً على المعلومات!", time: "7:12" },
    ],
    analysis: { intent: "بحث عن مقاس", products: ["جبادور مقاس 45"], satisfaction: 65, converted: false },
    createdAt: new Date().toISOString(),
  },
];

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setConversations(saved ? JSON.parse(saved) : DEFAULT_CONVERSATIONS);
    } catch {
      setConversations(DEFAULT_CONVERSATIONS);
    }
    setLoading(false);
  }, []);

  const persist = useCallback((updated: Conversation[]) => {
    setConversations(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    // TODO: sync to Supabase
  }, []);

  const addConversation = useCallback((c: Omit<Conversation, "id" | "createdAt">) => {
    const newConv: Conversation = {
      ...c,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    persist([newConv, ...conversations]);
    return newConv;
  }, [conversations, persist]);

  const updateConversation = useCallback((id: string, updates: Partial<Conversation>) => {
    persist(conversations.map(c => c.id === id ? { ...c, ...updates } : c));
  }, [conversations, persist]);

  const addMessage = useCallback((convId: string, message: ChatMessage) => {
    persist(conversations.map(c =>
      c.id === convId
        ? { ...c, messages: [...c.messages, message], lastMsg: message.text, time: "الآن" }
        : c
    ));
  }, [conversations, persist]);

  const stats = {
    total: conversations.length,
    converted: conversations.filter(c => c.analysis.converted).length,
    pending: conversations.filter(c => c.status === "pending").length,
    avgSatisfaction: conversations.length
      ? Math.round(conversations.reduce((s, c) => s + c.analysis.satisfaction, 0) / conversations.length)
      : 0,
  };

  return { conversations, loading, addConversation, updateConversation, addMessage, stats };
}
