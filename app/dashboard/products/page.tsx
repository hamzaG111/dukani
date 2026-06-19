"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  category: string;
  available: boolean;
  icon: string;
  requests: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "جبادور جلدي بني داكن", price: 350, discount: 15, category: "أحذية", available: true, icon: "👞", requests: 18 },
  { id: 2, name: "جبادور بني فاتح", price: 350, discount: 0, category: "أحذية", available: true, icon: "👟", requests: 9 },
  { id: 3, name: "بيتزا عائلية كبيرة", price: 89, discount: 0, category: "أطعمة", available: true, icon: "🍕", requests: 14 },
  { id: 4, name: "شاحن آيفون أصلي", price: 120, discount: 10, category: "إلكترونيات", available: false, icon: "🔌", requests: 11 },
  { id: 5, name: "كريم الوجه الذهبي", price: 200, discount: 20, category: "تجميل", available: true, icon: "✨", requests: 9 },
];

function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const isNew = !product?.id;
  const [form, setForm] = useState<Partial<Product>>({
    name: "", price: 0, discount: 0, category: "", available: true, icon: "📦", requests: 0,
    ...product,
  });

  const icons = ["📦", "👕", "👞", "📱", "🍕", "✨", "💊", "🛋️", "🎁", "🔌"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-gold rounded-3xl border border-gold/20 p-6 w-full max-w-md shadow-gold"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-foreground font-black text-xl">{isNew ? "إضافة منتج" : "تعديل المنتج"}</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface transition-all">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Icon picker */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">أيقونة المنتج</label>
            <div className="flex gap-2 flex-wrap">
              {icons.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setForm({ ...form, icon: ic })}
                  className={`w-10 h-10 rounded-xl text-xl transition-all ${
                    form.icon === ic ? "bg-gold/20 border border-gold" : "bg-surface-2 border border-border hover:border-gold/30"
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">اسم المنتج</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: جبادور جلدي بني..."
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">السعر (درهم)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: +e.target.value })}
                className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                dir="ltr"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">خصم ٪ (اختياري)</label>
              <input
                type="number"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: +e.target.value })}
                min={0} max={99}
                className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">الفئة</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="أحذية، ملابس، إلكترونيات..."
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all text-sm"
            />
          </div>

          {/* Available toggle */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-2xl border border-border">
            <span className="text-foreground text-sm font-semibold">متوفر للبيع</span>
            <button
              onClick={() => setForm({ ...form, available: !form.available })}
              className={`relative w-12 h-6 rounded-full transition-colors ${form.available ? "bg-gold" : "bg-surface-2 border border-border"}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.available ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" onClick={onClose} className="flex-1">إلغاء</Button>
          <Button
            variant="primary"
            onClick={() => onSave({ ...form, id: product?.id ?? Date.now(), requests: form.requests ?? 0 } as Product)}
            disabled={!form.name}
            className="flex-1"
          >
            {isNew ? "إضافة المنتج" : "حفظ التغييرات"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modal, setModal] = useState<Partial<Product> | null | "new">(null);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (p: Product) => {
    setProducts((prev) =>
      prev.find((x) => x.id === p.id) ? prev.map((x) => (x.id === p.id ? p : x)) : [...prev, p]
    );
    setModal(null);
  };

  return (
    <>
      <TopBar title="إدارة المنتجات" subtitle={`${products.length} منتج مضاف`} />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header actions */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex-1 relative min-w-48">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-surface border border-border rounded-2xl pr-10 pl-4 py-2.5 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 transition-all text-sm"
            />
          </div>
          <Button variant="primary" size="sm" onClick={() => setModal("new")}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            إضافة منتج
          </Button>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-foreground font-bold text-lg mb-2">لا يوجد منتجات</h3>
            <p className="text-muted text-sm mb-6">ابدأ بإضافة منتجك الأول وسيتعلمه المساعد تلقائياً</p>
            <Button variant="primary" onClick={() => setModal("new")}>إضافة أول منتج</Button>
          </motion.div>
        )}

        {/* Products grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-3xl border border-border hover:border-gold/25 transition-all duration-300 p-5 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center text-2xl">
                      {product.icon}
                    </div>
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        product.available ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {product.available ? "متوفر" : "نفد"}
                      </span>
                      <p className="text-muted text-xs mt-0.5">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setModal(product)}
                      className="w-8 h-8 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold/30 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="w-8 h-8 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-red-400 hover:border-red-500/30 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <h3 className="text-foreground font-bold text-sm mb-3 leading-snug">{product.name}</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gold font-black text-lg">
                      {product.discount > 0
                        ? Math.round(product.price * (1 - product.discount / 100))
                        : product.price} د.م
                    </span>
                    {product.discount > 0 && (
                      <span className="text-muted text-xs line-through mr-2">{product.price}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted text-xs">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {product.requests} طلب
                  </div>
                </div>

                {product.discount > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    خصم {product.discount}٪
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add card */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setModal("new")}
            className="glass rounded-3xl border border-dashed border-border hover:border-gold/40 p-5 flex flex-col items-center justify-center gap-3 text-muted hover:text-gold transition-all duration-200 min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-2xl border border-dashed border-current flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-semibold">إضافة منتج جديد</span>
          </motion.button>
        </div>
      </main>

      {/* Product Modal */}
      <AnimatePresence>
        {modal !== null && (
          <ProductModal
            product={modal === "new" ? {} : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-3xl border border-red-500/20 p-6 w-full max-w-sm text-center"
            >
              <div className="text-4xl mb-4">🗑️</div>
              <h3 className="text-foreground font-black text-lg mb-2">حذف المنتج؟</h3>
              <p className="text-muted text-sm mb-6">هذا الإجراء لا يمكن التراجع عنه</p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">إلغاء</Button>
                <button
                  onClick={() => {
                    setProducts((p) => p.filter((x) => x.id !== deleteId));
                    setDeleteId(null);
                  }}
                  className="flex-1 bg-red-500/80 hover:bg-red-500 text-white font-bold py-3 rounded-2xl transition-colors"
                >
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
