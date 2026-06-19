"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const stores = [
  {
    id: "atlas",
    name: "متجر الأطلس",
    category: "أحذية جلدية",
    avatar: "م",
    status: "active",
    chatsToday: 24,
    salesThisMonth: 8400,
    products: 6,
  },
  {
    id: "argan",
    name: "أركان فاطمة",
    category: "منتجات طبيعية",
    avatar: "أ",
    status: "active",
    chatsToday: 18,
    salesThisMonth: 12600,
    products: 18,
  },
];

export default function MultiStorePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");

  return (
    <>
      <TopBar title="إدارة المتاجر" subtitle="تحكم في جميع متاجرك من مكان واحد" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "متاجرك النشطة", value: stores.length, icon: "🏪" },
            { label: "إجمالي المحادثات", value: stores.reduce((s, st) => s + st.chatsToday, 0), icon: "💬" },
            { label: "إجمالي المبيعات", value: `${stores.reduce((s, st) => s + st.salesThisMonth, 0).toLocaleString("ar-MA")} د.م`, icon: "💰" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass rounded-2xl border border-border p-5 text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-gold font-black text-xl">{s.value}</p>
              <p className="text-muted text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Stores list */}
        <div className="space-y-4">
          {stores.map((store, i) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="glass rounded-3xl border border-border p-6 hover:border-gold/25 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center text-background font-black text-2xl flex-shrink-0">
                  {store.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-foreground font-black text-lg">{store.name}</h3>
                    <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">● نشط</span>
                  </div>
                  <p className="text-muted text-sm">{store.category} • {store.products} منتج</p>
                </div>
                <div className="hidden md:flex gap-6 text-center">
                  <div>
                    <p className="text-foreground font-black">{store.chatsToday}</p>
                    <p className="text-muted text-xs">محادثة اليوم</p>
                  </div>
                  <div>
                    <p className="text-gold font-black">{store.salesThisMonth.toLocaleString("ar-MA")} د.م</p>
                    <p className="text-muted text-xs">هذا الشهر</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href="/dashboard" className="text-xs font-bold bg-gold/10 text-gold border border-gold/20 px-3 py-1.5 rounded-xl hover:bg-gold/20 transition-all">
                    تحكم
                  </a>
                  <a href={`/store/${store.id}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold glass border border-border text-muted px-3 py-1.5 rounded-xl hover:text-foreground transition-all">
                    عرض
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add store */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setShowAddModal(true)}
          className="w-full glass-gold rounded-3xl border border-gold/20 border-dashed p-8 text-center hover:border-gold/40 transition-all group"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">➕</div>
          <p className="text-foreground font-black">أضف متجراً جديداً</p>
          <p className="text-muted text-sm mt-1">إدارة متاجر متعددة من لوحة تحكم واحدة</p>
        </motion.button>

        {/* Plans note */}
        <div className="glass rounded-2xl border border-gold/20 p-5 flex items-center gap-4">
          <div className="text-3xl">💎</div>
          <div className="flex-1">
            <p className="text-foreground font-bold">الخطة الاحترافية تشمل ٣ متاجر</p>
            <p className="text-muted text-sm">الخطة البلاتينية: متاجر غير محدودة</p>
          </div>
          <a href="/pricing" className="text-gold text-sm font-black hover:underline">ترقية →</a>
        </div>
      </main>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#141414] border border-border rounded-3xl p-8 w-full max-w-md"
            >
              <h3 className="text-foreground font-black text-xl mb-6">متجر جديد</h3>
              <div className="space-y-4">
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="اسم المتجر"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40"
                />
                <input
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="نوع المنتجات (مثال: ملابس، إلكترونيات)"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40"
                />
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-full bg-gold-gradient text-background font-black py-4 rounded-2xl hover:shadow-gold transition-all"
                >
                  إنشاء المتجر ⚡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
