"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  sold: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "جاكيت جلد الأطلس",     sku: "ATL-JKT-01", category: "ملابس",   stock: 2,  minStock: 5,  price: 390, sold: 34, image: "🧥" },
  { id: 2, name: "عطر الورد المغربي",    sku: "MRC-PRF-01", category: "عطور",    stock: 18, minStock: 10, price: 280, sold: 28, image: "🌹" },
  { id: 3, name: "حذاء جلد بني",        sku: "ATL-SH-03",  category: "أحذية",   stock: 7,  minStock: 5,  price: 250, sold: 21, image: "👞" },
  { id: 4, name: "شال كاشمير",          sku: "CSH-SCF-01", category: "إكسسوار", stock: 0,  minStock: 3,  price: 300, sold: 18, image: "🧣" },
  { id: 5, name: "حقيبة يد فاخرة",     sku: "LUX-BG-01",  category: "حقائب",   stock: 4,  minStock: 3,  price: 600, sold: 12, image: "👜" },
  { id: 6, name: "حزام جلد أسود",      sku: "ATL-BLT-02", category: "إكسسوار", stock: 11, minStock: 5,  price: 120, sold: 9,  image: "👔" },
];

const getStatus = (stock: number, min: number) => {
  if (stock === 0) return { label: "نفد المخزون", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" };
  if (stock <= min) return { label: "مخزون منخفض",  color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" };
  return                  { label: "متوفر",          color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" };
};

export default function InventoryPage() {
  const [items, setItems] = useState<Product[]>(products);
  const [editId, setEditId] = useState<number | null>(null);
  const [newStock, setNewStock] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");

  const filtered = items.filter(p => {
    const matchSearch = !search || p.name.includes(search) || p.sku.includes(search);
    const matchFilter = filter === "all" || (filter === "low" && p.stock <= p.minStock && p.stock > 0) || (filter === "out" && p.stock === 0);
    return matchSearch && matchFilter;
  });

  const updateStock = (id: number) => {
    const val = parseInt(newStock);
    if (isNaN(val) || val < 0) return;
    setItems(prev => prev.map(p => p.id === id ? { ...p, stock: val } : p));
    setEditId(null); setNewStock("");
  };

  const outCount = items.filter(p => p.stock === 0).length;
  const lowCount = items.filter(p => p.stock > 0 && p.stock <= p.minStock).length;

  return (
    <>
      <TopBar title="إدارة المخزون" subtitle="تتبع مخزونك وتجنب نفاد المنتجات" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "إجمالي المنتجات", value: items.length,   icon: "📦" },
            { label: "نفد المخزون",      value: outCount,      icon: "❌", urgent: outCount > 0 },
            { label: "مخزون منخفض",     value: lowCount,      icon: "⚠️", warn: lowCount > 0 },
            { label: "قيمة المخزون",    value: `${items.reduce((s,p) => s + p.stock * p.price, 0).toLocaleString("ar-MA")} د.م`, icon: "💰" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`glass rounded-2xl border p-4 ${s.urgent ? "border-red-500/30 bg-red-500/5" : s.warn ? "border-yellow-500/30 bg-yellow-500/5" : "border-border"}`}>
              <div className="text-xl mb-2">{s.icon}</div>
              <p className={`font-black text-xl ${s.urgent ? "text-red-400" : s.warn ? "text-yellow-400" : "text-gold"}`}>{s.value}</p>
              <p className="text-muted text-xs">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap items-center">
          {[{ id: "all", label: "الكل" }, { id: "low", label: "⚠️ منخفض" }, { id: "out", label: "❌ نفد" }].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id as "all" | "low" | "out")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === f.id ? "bg-gold text-background" : "glass border border-border text-muted hover:text-foreground"}`}>
              {f.label}
            </button>
          ))}
          <div className="mr-auto relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالاسم أو SKU..."
              className="glass border border-border rounded-xl px-4 py-2 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40 pr-9 w-48" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-border text-xs text-muted font-bold">
            <span className="col-span-2">المنتج</span>
            <span>SKU</span>
            <span>المخزون</span>
            <span>الحالة</span>
            <span>إجراء</span>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((p, i) => {
              const status = getStatus(p.stock, p.minStock);
              return (
                <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-6 gap-4 px-5 py-4 items-center hover:bg-surface-2 transition-colors">
                  <div className="col-span-2 flex items-center gap-3">
                    <span className="text-2xl">{p.image}</span>
                    <div>
                      <p className="text-foreground font-bold text-sm">{p.name}</p>
                      <p className="text-muted text-xs">{p.category} • {p.price} د.م</p>
                    </div>
                  </div>
                  <span className="text-muted text-xs font-mono">{p.sku}</span>
                  <div>
                    {editId === p.id ? (
                      <div className="flex gap-1">
                        <input type="number" value={newStock} onChange={e => setNewStock(e.target.value)} min={0}
                          onKeyDown={e => e.key === "Enter" && updateStock(p.id)}
                          className="w-16 bg-surface border border-gold/40 rounded-lg px-2 py-1 text-foreground text-sm focus:outline-none" />
                        <button onClick={() => updateStock(p.id)} className="text-gold text-xs font-black">✓</button>
                        <button onClick={() => setEditId(null)} className="text-muted text-xs">✕</button>
                      </div>
                    ) : (
                      <span className={`font-black text-lg ${p.stock === 0 ? "text-red-400" : p.stock <= p.minStock ? "text-yellow-400" : "text-foreground"}`}>
                        {p.stock}
                      </span>
                    )}
                    <p className="text-muted text-xs">الحد الأدنى: {p.minStock}</p>
                  </div>
                  <span className={`text-xs font-bold border px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>{status.label}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditId(p.id); setNewStock(String(p.stock)); }}
                      className="text-xs font-bold text-gold border border-gold/20 bg-gold/10 px-2.5 py-1 rounded-lg hover:bg-gold/20 transition-all">
                      تعديل
                    </button>
                    {p.stock <= p.minStock && (
                      <button className="text-xs font-bold text-background bg-gold-gradient px-2.5 py-1 rounded-lg">
                        طلب
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Restock alert */}
        {(outCount > 0 || lowCount > 0) && (
          <div className="glass rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-center gap-4">
            <span className="text-3xl">🚨</span>
            <div className="flex-1">
              <p className="text-foreground font-bold">تنبيه المخزون</p>
              <p className="text-muted text-sm">
                {outCount > 0 && `${outCount} منتج نفد مخزونه. `}
                {lowCount > 0 && `${lowCount} منتج بمخزون منخفض.`}
                {" "}اطلب الكميات قبل أن تفقد مبيعات.
              </p>
            </div>
            <button className="text-xs font-black bg-gold text-background px-4 py-2 rounded-xl">إرسال طلب شراء</button>
          </div>
        )}
      </main>
    </>
  );
}
