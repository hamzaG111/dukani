"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

type EntryType = "qa" | "policy" | "tip" | "objection";

interface Entry {
  id: number;
  type: EntryType;
  question: string;
  answer: string;
  active: boolean;
}

const typeConfig: Record<EntryType, { label: string; icon: string; color: string; border: string }> = {
  qa:        { label: "سؤال وجواب", icon: "💬", color: "text-blue-400",   border: "border-blue-500/20" },
  policy:    { label: "سياسة",       icon: "📋", color: "text-purple-400", border: "border-purple-500/20" },
  tip:       { label: "نصيحة بيع",   icon: "💡", color: "text-gold",       border: "border-gold/20" },
  objection: { label: "اعتراض",      icon: "🛡️", color: "text-green-400", border: "border-green-500/20" },
};

const defaultEntries: Entry[] = [
  { id: 1, type: "qa", question: "شحال تمن الجاكيت؟", answer: "الجاكيت بـ390 درهم 🔥 وعندنا توصيل مجاني للطلبات فوق 200 درهم!", active: true },
  { id: 2, type: "qa", question: "واش كاينين المقاسات؟", answer: "نعم! عندنا من S حتى XXL. إذا ما عرفتيش مقاسك، أخبريني قياساتك وغادي ننصحك 😊", active: true },
  { id: 3, type: "policy", question: "سياسة الإرجاع", answer: "كاين 14 يوم ديال ضمان الإرجاع. المنتج يكون ماشي مستعمل مع عبوته الأصلية. التوصيل ديال الإرجاع مجاني ✅", active: true },
  { id: 4, type: "policy", question: "مواعيد التوصيل", answer: "كازا: 24 ساعة • باقي المدن: 2-3 أيام • الدواوير: 4-5 أيام. نتابعك بـ SMS 📦", active: true },
  { id: 5, type: "tip", question: "كيفاش نغلق صفقة مع زبون متردد", answer: "قول ليه: 'عندي واحد كاتشري هاد المنتج دابا، باش ما تضيعش الفرصة اشترتيه؟' — الندرة تحرك الزبون 🎯", active: true },
  { id: 6, type: "objection", question: "الثمن غالي", answer: "فهمت! باش نقارن: هاد الجودة عادةً بـ500-600 درهم في الأسواق. معانا الثمن معقول مع ضمان الجودة والتوصيل المجاني 💯", active: true },
  { id: 7, type: "objection", question: "نفكر فيه وندير معاك", answer: "ماشي مشكل! جوابك معايا. باش أقدر نحجز ليك واحد؟ عندي كمية محدودة 😊", active: true },
];

export default function KnowledgePage() {
  const [entries, setEntries] = useState<Entry[]>(defaultEntries);
  const [filter, setFilter] = useState<EntryType | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEntry, setEditEntry] = useState<Entry | null>(null);
  const [newEntry, setNewEntry] = useState({ type: "qa" as EntryType, question: "", answer: "" });
  const [testInput, setTestInput] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [testing, setTesting] = useState(false);

  const filtered = filter === "all" ? entries : entries.filter(e => e.type === filter);
  const activeCount = entries.filter(e => e.active).length;

  const toggle = (id: number) => setEntries(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  const remove = (id: number) => setEntries(prev => prev.filter(e => e.id !== id));

  const addEntry = () => {
    if (!newEntry.question.trim() || !newEntry.answer.trim()) return;
    setEntries(prev => [...prev, { id: Date.now(), ...newEntry, active: true }]);
    setNewEntry({ type: "qa", question: "", answer: "" });
    setShowAddModal(false);
  };

  const handleTest = () => {
    if (!testInput.trim()) return;
    setTesting(true);
    setTimeout(() => {
      const match = entries.find(e => e.active && (
        e.question.includes(testInput.slice(0, 4)) ||
        testInput.toLowerCase().includes("تمن") ||
        testInput.toLowerCase().includes("سعر") ||
        testInput.toLowerCase().includes("price")
      ));
      setTestResponse(match?.answer || "مرحباً! كيف يمكنني مساعدتك؟ 😊 سأبذل قصارى جهدي للإجابة على سؤالك.");
      setTesting(false);
    }, 1200);
  };

  return (
    <>
      <TopBar title="قاعدة المعرفة" subtitle="علّم مساعدك الذكي كل شيء عن متجرك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "إجمالي المعلومات", value: entries.length, icon: "📚" },
            { label: "نشطة", value: activeCount, icon: "✅" },
            { label: "معدل الدقة", value: "97٪", icon: "🎯" },
            { label: "أسئلة غير مُجابة", value: "3", icon: "❓" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border p-4">
              <div className="text-xl mb-2">{s.icon}</div>
              <p className="text-gold font-black text-xl">{s.value}</p>
              <p className="text-muted text-xs">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Test Panel */}
        <div className="glass-gold rounded-2xl border border-gold/20 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🧪</span>
            <h3 className="text-foreground font-black">اختبر مساعدك الآن</h3>
          </div>
          <div className="flex gap-3 mb-3">
            <input
              value={testInput}
              onChange={e => setTestInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleTest()}
              placeholder="اكتب سؤال كأنك زبون... مثال: شحال تمن الجاكيت؟"
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/50"
            />
            <button onClick={handleTest} disabled={testing || !testInput}
              className="bg-gold-gradient text-background font-black px-5 py-3 rounded-xl disabled:opacity-50 transition-all">
              {testing ? "..." : "اختبر"}
            </button>
          </div>
          {testResponse && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="bg-surface-2 rounded-xl p-4 flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gold-gradient flex items-center justify-center text-background font-black flex-shrink-0">
                <span className="text-sm">د</span>
              </div>
              <p className="text-foreground text-sm leading-relaxed">{testResponse}</p>
            </motion.div>
          )}
        </div>

        {/* Filter + Add */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === "all" ? "bg-gold text-background" : "glass border border-border text-muted"}`}>
            الكل ({entries.length})
          </button>
          {(Object.entries(typeConfig) as [EntryType, typeof typeConfig[EntryType]][]).map(([type, cfg]) => (
            <button key={type} onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === type ? "bg-gold text-background" : "glass border border-border text-muted"}`}>
              {cfg.icon} {cfg.label} ({entries.filter(e => e.type === type).length})
            </button>
          ))}
          <button onClick={() => setShowAddModal(true)}
            className="mr-auto bg-gold/10 text-gold border border-gold/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gold/20 transition-all">
            + إضافة معلومة
          </button>
        </div>

        {/* Entries */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((entry, i) => {
              const cfg = typeConfig[entry.type];
              return (
                <motion.div key={entry.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`glass rounded-2xl border ${entry.active ? "border-border" : "border-border/40 opacity-50"} p-5`}>
                  <div className="flex items-start gap-4">
                    <div className={`text-xl flex-shrink-0 mt-0.5`}>{cfg.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-black border px-1.5 py-0.5 rounded-full ${cfg.color} ${cfg.border} bg-surface-2`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-foreground font-bold text-sm mb-1">{entry.question}</p>
                      <p className="text-muted text-sm leading-relaxed">{entry.answer}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => toggle(entry.id)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${entry.active ? "bg-gold" : "bg-surface-2 border border-border"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${entry.active ? "right-0.5" : "right-5"}`} />
                      </button>
                      <button onClick={() => { setEditEntry(entry); setShowAddModal(true); setNewEntry({ type: entry.type, question: entry.question, answer: entry.answer }); }}
                        className="text-muted hover:text-foreground transition-colors p-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => remove(entry.id)}
                        className="text-muted hover:text-red-400 transition-colors p-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Unanswered Questions */}
        <div className="glass rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">❓</span>
            <h3 className="text-foreground font-black">أسئلة لم يجب عليها الذكاء الاصطناعي</h3>
            <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full mr-auto">3 أسئلة</span>
          </div>
          <div className="space-y-2">
            {["واش كاين دليفري لإسبانيا؟", "كيفاش يمكنني أدفع بـPayPal؟", "واش كاين خصومات للطلبيات الكبيرة؟"].map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-border">
                <span className="text-muted text-sm flex-1">{q}</span>
                <button onClick={() => { setShowAddModal(true); setNewEntry({ type: "qa", question: q, answer: "" }); }}
                  className="text-xs font-bold text-gold hover:underline flex-shrink-0">
                  أجب الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setShowAddModal(false); setEditEntry(null); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#141414] border border-border rounded-3xl p-8 w-full max-w-lg">
              <h3 className="text-foreground font-black text-xl mb-6">
                {editEntry ? "تعديل المعلومة" : "معلومة جديدة"}
              </h3>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {(Object.entries(typeConfig) as [EntryType, typeof typeConfig[EntryType]][]).map(([type, cfg]) => (
                    <button key={type} onClick={() => setNewEntry(p => ({ ...p, type }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${newEntry.type === type ? "bg-gold text-background border-gold" : `glass ${cfg.border} ${cfg.color}`}`}>
                      {cfg.icon} {cfg.label}
                    </button>
                  ))}
                </div>
                <input
                  value={newEntry.question}
                  onChange={e => setNewEntry(p => ({ ...p, question: e.target.value }))}
                  placeholder="السؤال أو الموضوع..."
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40"
                />
                <textarea
                  value={newEntry.answer}
                  onChange={e => setNewEntry(p => ({ ...p, answer: e.target.value }))}
                  placeholder="الجواب الذي سيقوله الذكاء الاصطناعي..."
                  rows={4}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40 resize-none"
                />
                <button onClick={addEntry} disabled={!newEntry.question || !newEntry.answer}
                  className="w-full bg-gold-gradient text-background font-black py-4 rounded-2xl hover:shadow-gold transition-all disabled:opacity-40">
                  {editEntry ? "حفظ التعديلات ✓" : "إضافة للمعرفة 🧠"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
