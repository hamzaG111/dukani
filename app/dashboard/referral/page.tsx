"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";

const REFERRAL_CODE = "ATLAS2026";
const REFERRAL_LINK = `https://dukani.ma/join?ref=${REFERRAL_CODE}`;

const tiers = [
  { name: "برونز", icon: "🥉", refs: 0, reward: "10 درهم لكل إحالة", color: "text-orange-400 border-orange-400/30 bg-orange-500/10", current: true },
  { name: "فضي", icon: "🥈", refs: 5, reward: "20 درهم + شهر مجاني", color: "text-gray-300 border-gray-400/30 bg-gray-500/10", current: false },
  { name: "ذهبي", icon: "🥇", refs: 15, reward: "30 درهم + شهران مجانيان", color: "text-gold border-gold/30 bg-gold/10", current: false },
  { name: "بلاتيني", icon: "💎", refs: 30, reward: "50 درهم + حساب مجاني دائم", color: "text-cyan-400 border-cyan-400/30 bg-cyan-500/10", current: false },
];

const referralHistory = [
  { name: "محمد الكنزاوي", date: "15 يونيو 2026", status: "اشترك ✅", reward: "+10 درهم" },
  { name: "فاطمة بنعلي", date: "12 يونيو 2026", status: "ينتظر ⏳", reward: "—" },
  { name: "يوسف الإدريسي", date: "8 يونيو 2026", status: "اشترك ✅", reward: "+10 درهم" },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"link" | "history" | "tiers">("link");

  const copy = () => {
    navigator.clipboard.writeText(REFERRAL_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <TopBar title="برنامج الإحالة" subtitle="كسب مكافآت عبر دعوة زملائك التجار" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-3xl">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass-gold rounded-3xl border border-gold/25 p-8 overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient-h" />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/10 blur-2xl" />

          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-black text-foreground mb-2">ادعُ تاجراً — كسب معه</h2>
          <p className="text-muted mb-6">لكل تاجر ينضم بواسطة رابطك ويشترك، تحصل على مكافأة نقدية مباشرة على حسابك</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "إجمالي الإحالات", value: "3", icon: "👥" },
              { label: "المشتركون", value: "2", icon: "✅" },
              { label: "رصيدك", value: "20 د.م", icon: "💰" },
            ].map((s, i) => (
              <div key={i} className="bg-black/20 rounded-2xl p-3">
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className="text-gold font-black text-xl">{s.value}</p>
                <p className="text-muted text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["link", "tiers", "history"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}>
              {t === "link" ? "رابطي" : t === "tiers" ? "المستويات" : "السجل"}
            </button>
          ))}
        </div>

        {tab === "link" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Referral code */}
            <div className="glass rounded-3xl border border-border p-6 space-y-4">
              <h3 className="text-foreground font-black">كودك الخاص</h3>
              <div className="flex items-center gap-3 bg-surface-2 rounded-2xl p-4 border border-gold/20">
                <span className="text-3xl font-black text-gold-gradient tracking-widest flex-1 text-center font-mono">{REFERRAL_CODE}</span>
                <button onClick={copy} className="text-gold text-sm font-bold hover:underline flex-shrink-0">
                  {copied ? "✓ تم" : "نسخ"}
                </button>
              </div>

              <div>
                <p className="text-muted text-xs mb-2">أو شارك الرابط مباشرة</p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-muted text-xs overflow-hidden text-ellipsis whitespace-nowrap" dir="ltr">
                    {REFERRAL_LINK}
                  </div>
                  <button onClick={copy} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${copied ? "bg-green-500/20 text-green-400" : "bg-gold text-background"}`}>
                    {copied ? "✓" : "نسخ"}
                  </button>
                </div>
              </div>

              {/* Share buttons */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "واتساب", color: "bg-[#25D366]/15 text-[#25D366] border-[#25D366]/20",
                    href: `https://wa.me/?text=${encodeURIComponent(`جرّب دُكّاني — مساعد تجاري ذكي بالعربية! استخدم كودي ${REFERRAL_CODE} وابدأ مجاناً: ${REFERRAL_LINK}`)}` },
                  { label: "فيسبوك", color: "bg-blue-600/10 text-blue-400 border-blue-600/20",
                    href: "#" },
                  { label: "نسخ الرابط", color: "bg-gold/10 text-gold border-gold/20", href: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-sm font-semibold ${s.color} transition-all hover:opacity-80`}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="glass rounded-3xl border border-border p-6">
              <h3 className="text-foreground font-black mb-4">كيف يعمل؟</h3>
              <div className="space-y-4">
                {[
                  { step: "1", text: "شارك رابطك مع أي تاجر تعرفه" },
                  { step: "2", text: "يسجّل بواسطة رابطك ويجرّب دُكّاني مجاناً" },
                  { step: "3", text: "عند اشتراكه في أي خطة مدفوعة، تحصل على مكافأتك فوراً" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-background font-black text-sm flex-shrink-0">
                      {s.step}
                    </div>
                    <p className="text-foreground text-sm">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === "tiers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-muted text-sm">كلما دعوت أكثر، كلما كبرت مكافأتك</p>
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`glass rounded-2xl border p-5 flex items-center gap-4 ${tier.current ? "border-gold/30 bg-gold/5" : "border-border"}`}
              >
                <div className="text-4xl">{tier.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-black text-lg ${tier.color.split(" ")[0]}`}>{tier.name}</p>
                    {tier.current && <span className="text-xs bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-semibold">مستواك الحالي</span>}
                  </div>
                  <p className="text-muted text-sm">{tier.reward}</p>
                  <p className="text-muted/60 text-xs mt-1">يتطلب: {tier.refs === 0 ? "لا شرط" : `${tier.refs}+ إحالة`}</p>
                </div>
                {!tier.current && (
                  <div className="text-right">
                    <p className="text-muted text-xs">{tier.refs - 3} إحالة</p>
                    <p className="text-muted/60 text-xs">للوصول</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "history" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-foreground font-black">سجل إحالاتك</h3>
              <span className="text-muted text-xs">3 إحالات</span>
            </div>
            {referralHistory.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-sm">
                  {r.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm font-semibold">{r.name}</p>
                  <p className="text-muted text-xs">{r.date}</p>
                </div>
                <div className="text-left">
                  <p className="text-foreground text-xs font-semibold">{r.status}</p>
                  <p className="text-gold text-xs font-bold">{r.reward}</p>
                </div>
              </div>
            ))}
            <div className="p-4 bg-surface-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">إجمالي المكافآت</span>
                <span className="text-gold font-black">20 د.م</span>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}
