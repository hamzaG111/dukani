"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const customers = [
  { id: 1, name: "محمد الزياني", phone: "+212 661 234 001", city: "الدار البيضاء", orders: 7, ltv: 2190, lastSeen: "منذ ٢ ساعات", status: "vip", avatar: "مز", tags: ["مخلص", "يحب العروض"] },
  { id: 2, name: "فاطمة بنعلي", phone: "+212 661 234 002", city: "مراكش", orders: 3, ltv: 840, lastSeen: "منذ يوم", status: "active", avatar: "فب", tags: ["جديد"] },
  { id: 3, name: "يوسف الإدريسي", phone: "+212 661 234 003", city: "فاس", orders: 12, ltv: 3600, lastSeen: "منذ ٣ أيام", status: "vip", avatar: "يإ", tags: ["مخلص", "مشتري متكرر"] },
  { id: 4, name: "سارة المنصوري", phone: "+212 661 234 004", city: "طنجة", orders: 1, ltv: 297, lastSeen: "منذ أسبوع", status: "new", avatar: "سم", tags: ["جديد"] },
  { id: 5, name: "حسن الكنزاوي", phone: "+212 661 234 005", city: "الرباط", orders: 5, ltv: 1450, lastSeen: "منذ ساعة", status: "active", avatar: "حك", tags: ["يسأل كثيراً"] },
  { id: 6, name: "نجاة الغزلاني", phone: "+212 661 234 006", city: "أكادير", orders: 2, ltv: 560, lastSeen: "منذ ٤ أيام", status: "at-risk", avatar: "نغ", tags: ["غائب"] },
  { id: 7, name: "عمر التوارغي", phone: "+212 661 234 007", city: "وجدة", orders: 9, ltv: 2700, lastSeen: "منذ ساعتين", status: "vip", avatar: "عت", tags: ["مخلص", "يحب الجديد"] },
  { id: 8, name: "خديجة العلوي", phone: "+212 661 234 008", city: "مكناس", orders: 4, ltv: 980, lastSeen: "منذ ٥ أيام", status: "active", avatar: "خع", tags: ["يهتم بالسعر"] },
];

const segments = [
  { label: "الكل", count: customers.length, color: "bg-gold text-background" },
  { label: "VIP", count: customers.filter(c => c.status === "vip").length, color: "bg-purple-500/20 text-purple-400 border border-purple-500/30" },
  { label: "نشط", count: customers.filter(c => c.status === "active").length, color: "bg-green-500/20 text-green-400 border border-green-500/30" },
  { label: "جديد", count: customers.filter(c => c.status === "new").length, color: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
  { label: "معرض للخطر", count: customers.filter(c => c.status === "at-risk").length, color: "bg-red-500/20 text-red-400 border border-red-500/30" },
];

const statusConfig = {
  vip: { label: "VIP 👑", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  active: { label: "نشط", color: "text-green-400 bg-green-500/10 border-green-500/20" },
  new: { label: "جديد ✨", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  "at-risk": { label: "⚠️ غائب", color: "text-red-400 bg-red-500/10 border-red-500/20" },
};

function CustomerDetail({ customer, onClose }: { customer: typeof customers[0]; onClose: () => void }) {
  const mockMessages = [
    { from: "customer", text: "السلام، عندكم جبادور بني؟", time: "١٠:٢٣" },
    { from: "ai", text: "وعليكم السلام! نعم عندنا 3 ألوان. البني الداكن بـ٢٩٧ د.م", time: "١٠:٢٣" },
    { from: "customer", text: "باغيه بمقاس ٤٣", time: "١٠:٢٤" },
    { from: "ai", text: "ممتاز! مقاس ٤٣ موجود. هل تبغي نضيفه للطلب؟", time: "١٠:٢٤" },
    { from: "customer", text: "واه، عطيني الرابط", time: "١٠:٢٤" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#141414] border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center text-background font-black text-2xl">
            {customer.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-foreground font-black text-xl">{customer.name}</h2>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusConfig[customer.status as keyof typeof statusConfig].color}`}>
                {statusConfig[customer.status as keyof typeof statusConfig].label}
              </span>
            </div>
            <p className="text-muted text-sm">{customer.phone} • 📍 {customer.city}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground text-2xl">×</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "إجمالي الطلبات", value: customer.orders },
              { label: "القيمة الإجمالية", value: `${customer.ltv} د.م` },
              { label: "متوسط الطلب", value: `${Math.round(customer.ltv / customer.orders)} د.م` },
            ].map((s, i) => (
              <div key={i} className="bg-surface-2 rounded-2xl p-4 text-center">
                <p className="text-gold font-black text-xl">{s.value}</p>
                <p className="text-muted text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <p className="text-muted text-xs mb-2">التصنيفات</p>
            <div className="flex gap-2 flex-wrap">
              {customer.tags.map(tag => (
                <span key={tag} className="text-xs bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          {/* Message history */}
          <div>
            <p className="text-muted text-xs mb-3">آخر محادثة</p>
            <div className="bg-[#0d0d0d] rounded-2xl p-4 space-y-3">
              {mockMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs ${
                    msg.from === "customer" ? "bg-gold/20 text-gold rounded-br-sm" : "bg-surface-2 text-foreground rounded-bl-sm"
                  }`}>
                    {msg.text}
                    <span className="text-muted/50 text-[10px] mr-2">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://wa.me/${customer.phone.replace(/\s/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] py-3 rounded-xl text-sm font-bold hover:bg-[#25D366]/25 transition-all"
            >
              💬 تواصل على واتساب
            </a>
            <button className="flex items-center justify-center gap-2 bg-gold/10 border border-gold/20 text-gold py-3 rounded-xl text-sm font-bold hover:bg-gold/20 transition-all">
              📤 أرسل عرضاً خاصاً
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CustomersPage() {
  const [activeSegment, setActiveSegment] = useState("الكل");
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter(c => {
    const matchSeg = activeSegment === "الكل" || statusConfig[c.status as keyof typeof statusConfig]?.label.includes(
      activeSegment === "VIP" ? "VIP" : activeSegment === "نشط" ? "نشط" : activeSegment === "جديد" ? "جديد" : "⚠️"
    );
    const matchSearch = c.name.includes(search) || c.city.includes(search) || c.phone.includes(search);
    return matchSeg && matchSearch;
  });

  const totalLtv = customers.reduce((sum, c) => sum + c.ltv, 0);
  const avgLtv = Math.round(totalLtv / customers.length);

  return (
    <>
      <TopBar title="العملاء" subtitle="نظام إدارة علاقات العملاء" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* KPI bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "إجمالي العملاء", value: customers.length, icon: "👥", color: "text-foreground" },
            { label: "القيمة الإجمالية", value: `${totalLtv.toLocaleString("ar-MA")} د.م`, icon: "💰", color: "text-gold" },
            { label: "متوسط القيمة", value: `${avgLtv} د.م`, icon: "📊", color: "text-blue-400" },
            { label: "عملاء VIP", value: customers.filter(c => c.status === "vip").length, icon: "👑", color: "text-purple-400" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border p-5"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-muted text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-2xl border border-gold/20 p-4 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-xl flex-shrink-0">🧠</div>
          <div className="flex-1">
            <p className="text-foreground font-bold text-sm">رؤية ذكية</p>
            <p className="text-muted text-xs mt-0.5">
              نجاة الغزلاني لم تشترِ منذ ٤ أيام — أرسل لها عرضاً شخصياً بخصم ١٠٪ لاستعادتها.
              يوسف الإدريسي مشترٍ متكرر — يُرجَّح أنه سيشتري مجدداً قريباً.
            </p>
          </div>
          <button className="text-gold text-xs font-bold hover:underline whitespace-nowrap">تصرف الآن</button>
        </motion.div>

        {/* Segments + Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {segments.map(seg => (
              <button
                key={seg.label}
                onClick={() => setActiveSegment(seg.label)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeSegment === seg.label ? seg.color : "glass border border-border text-muted"
                }`}
              >
                {seg.label}
                <span className="bg-black/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{seg.count}</span>
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم، رقم الهاتف، أو المدينة..."
              className="w-full bg-surface border border-border rounded-xl py-2 pr-9 pl-4 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40"
            />
          </div>
        </div>

        {/* Customer table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl border border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-foreground font-black">{filtered.length} عميل</h3>
            <button className="text-gold text-xs font-bold hover:underline flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              تصدير CSV
            </button>
          </div>
          {filtered.map((customer, i) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedCustomer(customer)}
              className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-background font-black text-sm flex-shrink-0">
                {customer.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-foreground font-bold text-sm">{customer.name}</p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${statusConfig[customer.status as keyof typeof statusConfig].color}`}>
                    {statusConfig[customer.status as keyof typeof statusConfig].label}
                  </span>
                </div>
                <p className="text-muted text-xs truncate">{customer.phone} • 📍 {customer.city}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <p className="text-gold font-black text-sm">{customer.ltv} د.م</p>
                <p className="text-muted text-xs">{customer.orders} طلبات</p>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-muted text-xs">{customer.lastSeen}</p>
              </div>
              <div className="flex gap-1">
                {customer.tags.slice(0, 1).map(tag => (
                  <span key={tag} className="hidden lg:block text-[10px] bg-surface-2 text-muted border border-border px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedCustomer && (
          <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
