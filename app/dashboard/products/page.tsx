"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";
import { useProducts, Product } from "@/hooks/useProducts";
import { useGamification } from "@/contexts/GamificationContext";

const ICONS = ["📦", "👕", "👞", "📱", "🍕", "✨", "💊", "🛋️", "🎁", "🔌", "🧴", "🍰", "🥤", "👜", "🔧", "📚"];
const CATEGORIES = ["أحذية", "ملابس", "إلكترونيات", "أطعمة", "تجميل", "صيدلية", "حلويات", "أثاث", "رياضة", "أخرى"];

function ProductModal({ product, onClose, onSave }: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (p: Omit<Product, "id" | "requests" | "createdAt">) => void;
}) {
  const isNew = !product?.id;
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice,
    discount: product?.discount || 0,
    category: product?.category || "",
    description: product?.description || "",
    available: product?.available ?? true,
    stockCount: product?.stockCount,
    icon: product?.icon || "📦",
  });

  const finalPrice = form.discount > 0 ? Math.round(form.price * (1 - form.discount / 100)) : form.price;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="glass-gold rounded-3xl border border-gold/20 p-6 w-full max-w-md shadow-gold max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-foreground font-black text-xl">{isNew ? "إضافة منتج" : "تعديل المنتج"}</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface transition-all">✕</button>
        </div>

        <div className="space-y-4">
          {/* Icon picker */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">أيقونة المنتج</label>
            <div className="flex gap-2 flex-wrap">
              {ICONS.map(ic => (
                <button key={ic} type="button" onClick={() => setForm(f => ({ ...f, icon: ic }))}
                  className={`w-10 h-10 rounded-xl text-xl transition-all ${form.icon === ic ? "bg-gold/20 border border-gold" : "bg-surface-2 border border-border hover:border-gold/30"}`}>
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">اسم المنتج *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="مثال: جبادور جلدي بني..." autoFocus
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all text-sm" />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">وصف المنتج</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="وصف مختصر — يساعد الذكاء الاصطناعي في الإجابة على أسئلة العملاء..." rows={2}
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all text-sm resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">السعر (درهم) *</label>
              <input type="number" min={0} value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))}
                dir="ltr" className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">خصم % (اختياري)</label>
              <input type="number" min={0} max={99} value={form.discount} onChange={e => setForm(f => ({ ...f, discount: +e.target.value }))}
                dir="ltr" className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm" />
            </div>
          </div>

          {form.discount > 0 && (
            <div className="p-2 bg-green-500/5 border border-green-500/15 rounded-xl text-center text-sm">
              <span className="text-muted line-through ml-2">{form.price} د.م</span>
              <span className="text-green-400 font-black">{finalPrice} د.م</span>
              <span className="text-gold text-xs mr-2">خصم {form.discount}%</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">الفئة</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm">
                <option value="">اختر...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">المخزون</label>
              <input type="number" min={0} value={form.stockCount ?? ""} onChange={e => setForm(f => ({ ...f, stockCount: e.target.value ? +e.target.value : undefined }))}
                placeholder="∞" dir="ltr"
                className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all text-sm" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface rounded-2xl border border-border">
            <span className="text-foreground text-sm font-semibold">متوفر للبيع</span>
            <button type="button" onClick={() => setForm(f => ({ ...f, available: !f.available }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${form.available ? "bg-gold" : "bg-surface-2 border border-border"}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.available ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" onClick={onClose} className="flex-1">إلغاء</Button>
          <Button variant="primary" onClick={() => form.name && onSave(form)} disabled={!form.name || !form.price} className="flex-1">
            {isNew ? "➕ إضافة المنتج" : "💾 حفظ التغييرات"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct, toggleAvailable } = useProducts();
  const { addXP, unlockAchievement } = useGamification();
  const [modal, setModal] = useState<"new" | Product | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("الكل");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const cats = ["الكل", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
  const filtered = products.filter(p =>
    (filterCat === "الكل" || p.category === filterCat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (data: Omit<Product, "id" | "requests" | "createdAt">) => {
    if (modal === "new") {
      const created = addProduct(data);
      setSavedId(created.id);
      addXP(25);
      if (products.length === 0) unlockAchievement("first_product");
      setTimeout(() => setSavedId(null), 2000);
    } else if (modal && typeof modal !== "string") {
      updateProduct(modal.id, data);
    }
    setModal(null);
  };

  if (loading) return <div className="flex-1 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" /></div>;

  return (
    <>
      <TopBar title="إدارة المنتجات" subtitle={`${products.length} منتج · ${products.filter(p => p.available).length} متوفر`} />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header actions */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex-1 relative min-w-48">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن منتج..."
              className="w-full bg-surface border border-border rounded-2xl pr-10 pl-4 py-2.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all text-sm" />
          </div>
          <Button variant="primary" size="sm" onClick={() => setModal("new")}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            إضافة منتج
          </Button>
        </div>

        {/* Category filter */}
        {cats.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
            {cats.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filterCat === cat ? "bg-gold/15 text-gold border border-gold/30" : "bg-surface text-muted border border-border hover:border-gold/20"}`}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-foreground font-bold text-lg mb-2">لا يوجد منتجات</h3>
            <p className="text-muted text-sm mb-6">ابدأ بإضافة منتجك الأول — المساعد الذكي سيتعلمه فوراً</p>
            <Button variant="primary" onClick={() => setModal("new")}>إضافة أول منتج ← +100 XP</Button>
          </motion.div>
        )}

        {/* Products grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div key={product.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                className={`glass rounded-3xl border transition-all duration-300 p-5 group relative ${
                  savedId === product.id ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]" : "border-border hover:border-gold/25"
                }`}>
                {savedId === product.id && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 left-3 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</motion.div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center text-2xl">{product.icon}</div>
                    <div>
                      <button onClick={() => toggleAvailable(product.id)}
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold cursor-pointer transition-all ${product.available ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" : "bg-red-500/10 text-red-400 hover:bg-red-500/20"}`}>
                        {product.available ? "✓ متوفر" : "✗ نفد"}
                      </button>
                      <p className="text-muted text-xs mt-0.5">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setModal(product)}
                      className="w-8 h-8 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold/30 transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => setDeleteId(product.id)}
                      className="w-8 h-8 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-red-400 hover:border-red-500/30 transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>

                <h3 className="text-foreground font-bold text-sm mb-1 leading-snug">{product.name}</h3>
                {product.description && <p className="text-muted text-xs mb-3 line-clamp-2">{product.description}</p>}

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-gold font-black text-lg">
                      {product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price} د.م
                    </span>
                    {product.discount > 0 && <span className="text-muted text-xs line-through">{product.price}</span>}
                    {product.discount > 0 && <span className="text-green-400 text-[10px] font-bold">-{product.discount}%</span>}
                  </div>
                  <div className="flex items-center gap-3 text-muted text-xs">
                    {product.stockCount !== undefined && (
                      <span className={product.stockCount <= 3 ? "text-red-400 font-bold" : ""}>
                        {product.stockCount <= 3 ? `⚠️ ${product.stockCount}` : `📦 ${product.stockCount}`}
                      </span>
                    )}
                    <span>💬 {product.requests}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add card */}
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setModal("new")}
            className="glass rounded-3xl border border-dashed border-border hover:border-gold/40 p-5 flex flex-col items-center justify-center gap-3 text-muted hover:text-gold transition-all duration-200 min-h-[160px]">
            <div className="w-12 h-12 rounded-2xl border border-dashed border-current flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <span className="text-sm font-semibold">إضافة منتج +25 XP</span>
          </motion.button>
        </div>
      </main>

      <AnimatePresence>
        {modal !== null && (
          <ProductModal product={modal === "new" ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="glass rounded-3xl border border-red-500/20 p-6 w-full max-w-sm text-center">
              <div className="text-4xl mb-4">🗑️</div>
              <h3 className="text-foreground font-black text-lg mb-2">حذف المنتج؟</h3>
              <p className="text-muted text-sm mb-6">هذا الإجراء لا يمكن التراجع عنه</p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">إلغاء</Button>
                <button onClick={() => { deleteProduct(deleteId!); setDeleteId(null); }}
                  className="flex-1 bg-red-500/80 hover:bg-red-500 text-white font-bold py-3 rounded-2xl transition-colors">
                  حذف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
