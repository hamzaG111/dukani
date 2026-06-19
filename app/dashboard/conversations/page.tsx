"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

interface Conversation {
  id: number;
  customer: string;
  avatar: string;
  lastMsg: string;
  time: string;
  status: "sale" | "browsing" | "ended" | "pending";
  messages: { from: "user" | "bot"; text: string; time: string }[];
  analysis: { intent: string; products: string[]; satisfaction: number; converted: boolean };
}

const conversations: Conversation[] = [
  {
    id: 1,
    customer: "محمد الكنزاوي",
    avatar: "م",
    lastMsg: "شكراً، سآخذ الجبادور البني داكن",
    time: "منذ ٢ دقيقة",
    status: "sale",
    messages: [
      { from: "user", text: "السلام عليكم، كم سعر الجبادور مقاس 42؟", time: "٧:٣١" },
      { from: "bot", text: "وعليكم السلام! 👋 الجبادور الجلدي البني داكن بمقاس 42 سعره ٢٩٧ درهم بعد خصم ١٥٪ (السعر الأصلي ٣٥٠ درهم). هل تريد مشاهدة باقي الألوان؟", time: "٧:٣١" },
      { from: "user", text: "نعم، أريد مشاهدة الألوان المتوفرة", time: "٧:٣٢" },
      { from: "bot", text: "عندنا:\n• بني داكن — ٢٩٧ درهم (خصم ١٥٪) ✅\n• بني فاتح — ٣٥٠ درهم ✅\n• أسود كلاسيكي — ٣٢٠ درهم ✅\n\nكل الألوان متوفرة بمقاس 42 🎉", time: "٧:٣٢" },
      { from: "user", text: "شكراً، سآخذ الجبادور البني داكن", time: "٧:٣٣" },
      { from: "bot", text: "رائع الاختيار! 🌟 اضغط هنا للتواصل مع التاجر وإتمام الطلب على واتساب:", time: "٧:٣٣" },
    ],
    analysis: { intent: "شراء أحذية", products: ["جبادور بني داكن"], satisfaction: 98, converted: true },
  },
  {
    id: 2,
    customer: "فاطمة بنعلي",
    avatar: "ف",
    lastMsg: "واش كاين توصيل لمراكش؟",
    time: "منذ ٨ دقائق",
    status: "pending",
    messages: [
      { from: "user", text: "كيفاش نطلب؟", time: "٧:٢٣" },
      { from: "bot", text: "سهلة! 😊 اختاري المنتج اللي تبغي، ثم اضغطي 'أريده' وسأوصلك مباشرة للتاجر على واتساب لإتمام الطلب في دقيقة.", time: "٧:٢٣" },
      { from: "user", text: "واش كاين توصيل لمراكش؟", time: "٧:٢٤" },
    ],
    analysis: { intent: "استفسار توصيل", products: [], satisfaction: 72, converted: false },
  },
  {
    id: 3,
    customer: "يوسف الإدريسي",
    avatar: "ي",
    lastMsg: "شكراً على المعلومات!",
    time: "منذ ٢٠ دقيقة",
    status: "ended",
    messages: [
      { from: "user", text: "عندكم مقاس 45؟", time: "٧:١٠" },
      { from: "bot", text: "مرحباً! للأسف مقاس 45 غير متوفر حالياً. المقاسات المتوفرة: 39 إلى 44 فقط. هل يناسبك مقاس آخر؟", time: "٧:١٠" },
      { from: "user", text: "لا، أريد 45 بالضبط", time: "٧:١١" },
      { from: "bot", text: "أفهمك تماماً 😊 سأُعلم التاجر بطلبك لمقاس 45 — يمكنه إعلامك عند توفره. هل تريد أن أترك له رسالة؟", time: "٧:١١" },
      { from: "user", text: "شكراً على المعلومات!", time: "٧:١٢" },
    ],
    analysis: { intent: "بحث عن مقاس", products: ["جبادور مقاس 45"], satisfaction: 65, converted: false },
  },
  {
    id: 4,
    customer: "سارة المنصوري",
    avatar: "س",
    lastMsg: "ممتاز، سأتواصل معكم لاحقاً",
    time: "منذ ٤٥ دقيقة",
    status: "browsing",
    messages: [
      { from: "user", text: "مرحبا، أريد أعرف عن جودة الجلد", time: "٦:٤٥" },
      { from: "bot", text: "أهلاً! 🌟 الجبادور مصنوع من جلد طبيعي أصلي، متين ومريح. مصنوع يدوياً من قبل حرفيين مغاربة بخبرة ٢٠ سنة.", time: "٦:٤٥" },
      { from: "user", text: "ممتاز، سأتواصل معكم لاحقاً", time: "٦:٤٦" },
    ],
    analysis: { intent: "استفسار جودة", products: [], satisfaction: 80, converted: false },
  },
  {
    id: 5,
    customer: "حمزة العلوي",
    avatar: "ح",
    lastMsg: "مبغيتش، سعرو غالي",
    time: "منذ ساعة",
    status: "ended",
    messages: [
      { from: "user", text: "كم سعر الجبادور؟", time: "٦:١٠" },
      { from: "bot", text: "سعر الجبادور الجلدي ٢٩٧ درهم بعد الخصم 🎉 جودة ممتازة بسعر مناسب جداً!", time: "٦:١٠" },
      { from: "user", text: "مبغيتش، سعرو غالي", time: "٦:١١" },
    ],
    analysis: { intent: "مقارنة أسعار", products: [], satisfaction: 30, converted: false },
  },
];

const statusConfig = {
  sale: { label: "طلب ✅", color: "text-green-400 bg-green-500/10 border-green-500/20" },
  pending: { label: "ينتظر ⏳", color: "text-gold bg-gold/10 border-gold/20" },
  browsing: { label: "يتصفح 👀", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  ended: { label: "انتهى", color: "text-muted bg-surface-2 border-border" },
};

export default function ConversationsPage() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [filter, setFilter] = useState<"all" | "sale" | "pending" | "ended">("all");
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (search && !c.customer.toLowerCase().includes(search.toLowerCase()) && !c.lastMsg.includes(search)) return false;
    return true;
  });

  return (
    <>
      <TopBar title="سجل المحادثات" subtitle={`${conversations.length} محادثة إجمالاً`} />

      <main className="flex-1 flex overflow-hidden">
        {/* List panel */}
        <div className={`flex flex-col border-l border-border bg-surface ${selected ? "hidden lg:flex lg:w-96 flex-shrink-0" : "flex-1"}`}>
          {/* Filters */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث في المحادثات..."
                className="w-full bg-surface-2 border border-border rounded-xl pr-9 pl-4 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/50 transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["all", "sale", "pending", "ended"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                    filter === f ? "bg-gold text-background" : "bg-surface-2 text-muted hover:text-foreground border border-border"
                  }`}
                >
                  {f === "all" ? "الكل" : f === "sale" ? "طلبات" : f === "pending" ? "ينتظر" : "منتهية"}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">💬</div>
                <p className="text-muted text-sm">لا توجد محادثات</p>
              </div>
            )}
            {filtered.map((conv) => (
              <motion.button
                key={conv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelected(conv)}
                className={`w-full text-right p-4 hover:bg-surface-2 transition-colors ${
                  selected?.id === conv.id ? "bg-gold/5 border-r-2 border-gold" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-sm flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-foreground font-bold text-sm">{conv.customer}</span>
                      <span className="text-muted text-xs">{conv.time}</span>
                    </div>
                    <p className="text-muted text-xs truncate mb-2">{conv.lastMsg}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusConfig[conv.status].color}`}>
                      {statusConfig[conv.status].label}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-w-0"
            >
              {/* Header */}
              <div className="h-14 bg-surface border-b border-border flex items-center gap-3 px-4 flex-shrink-0">
                <button
                  onClick={() => setSelected(null)}
                  className="lg:hidden text-muted hover:text-foreground p-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-xs">
                  {selected.avatar}
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">{selected.customer}</p>
                  <p className="text-muted text-xs">{selected.time}</p>
                </div>
                <span className={`mr-auto text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig[selected.status].color}`}>
                  {statusConfig[selected.status].label}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50">
                {selected.messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.from === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-xs flex-shrink-0">
                        د
                      </div>
                    )}
                    <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "bot"
                        ? "bg-surface-2 text-foreground border border-border rounded-br-sm"
                        : "bg-gold/15 text-gold border border-gold/25 rounded-bl-sm"
                    }`}>
                      {msg.text}
                      <div className="text-xs mt-1 opacity-40">{msg.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Analysis panel */}
              <div className="border-t border-border bg-surface p-4 flex-shrink-0">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center text-base">🧠</div>
                  <span className="text-foreground font-bold text-sm">تحليل المحادثة</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-2xl border border-border p-3">
                    <p className="text-muted text-xs mb-1">نية العميل</p>
                    <p className="text-foreground font-bold text-sm">{selected.analysis.intent}</p>
                  </div>
                  <div className="glass rounded-2xl border border-border p-3">
                    <p className="text-muted text-xs mb-1">التحويل</p>
                    <p className={`font-bold text-sm ${selected.analysis.converted ? "text-green-400" : "text-muted"}`}>
                      {selected.analysis.converted ? "✅ تم الشراء" : "❌ لم يشترِ"}
                    </p>
                  </div>
                  <div className="glass rounded-2xl border border-border p-3 col-span-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-muted text-xs">رضا العميل</p>
                      <p className="text-foreground font-bold text-xs">{selected.analysis.satisfaction}٪</p>
                    </div>
                    <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selected.analysis.satisfaction}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${
                          selected.analysis.satisfaction >= 80 ? "bg-green-500"
                          : selected.analysis.satisfaction >= 50 ? "bg-gold"
                          : "bg-red-500"
                        }`}
                      />
                    </div>
                  </div>
                  {selected.analysis.products.length > 0 && (
                    <div className="glass rounded-2xl border border-border p-3 col-span-2">
                      <p className="text-muted text-xs mb-1">المنتجات المُذكورة</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.analysis.products.map((p, i) => (
                          <span key={i} className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden lg:flex flex-1 items-center justify-center flex-col gap-4 text-center p-8"
            >
              <div className="w-20 h-20 rounded-3xl bg-gold/10 border border-gold/20 flex items-center justify-center text-4xl">
                💬
              </div>
              <div>
                <h3 className="text-foreground font-bold text-lg mb-1">اختر محادثة</h3>
                <p className="text-muted text-sm max-w-xs">اختر محادثة من القائمة لمشاهدة تفاصيلها والتحليل الذكي</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
