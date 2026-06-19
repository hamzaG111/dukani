"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const stores = [
  { id: "atlas-store", name: "متجر الأطلس", category: "أحذية جلدية", avatar: "م", location: "الدار البيضاء", rating: 4.9, reviews: 127, products: 6, hot: true, responseTime: "أقل من ٣ دقائق" },
  { id: "najmat-tanger", name: "نجمة طنجة", category: "مجوهرات يدوية", avatar: "ن", location: "طنجة", rating: 4.8, reviews: 89, products: 24, hot: false, responseTime: "أقل من ٥ دقائق" },
  { id: "argan-marrakech", name: "أركان مراكش", category: "منتجات طبيعية", avatar: "أ", location: "مراكش", rating: 5.0, reviews: 203, products: 18, hot: true, responseTime: "أقل من دقيقتين" },
  { id: "honey-agadir", name: "عسل أكادير", category: "عسل وزيوت", avatar: "ع", location: "أكادير", rating: 4.7, reviews: 56, products: 9, hot: false, responseTime: "أقل من ١٠ دقائق" },
  { id: "fashion-rabat", name: "فاشون الرباط", category: "ملابس عصرية", avatar: "ف", location: "الرباط", rating: 4.6, reviews: 144, products: 47, hot: false, responseTime: "أقل من ٥ دقائق" },
  { id: "ceramique-fes", name: "خزف فاس", category: "سيراميك وفخار", avatar: "خ", location: "فاس", rating: 4.9, reviews: 78, products: 32, hot: true, responseTime: "أقل من ٣ دقائق" },
  { id: "electronics-casa", name: "تكنو الدار البيضاء", category: "إلكترونيات", avatar: "ت", location: "الدار البيضاء", rating: 4.5, reviews: 312, products: 89, hot: false, responseTime: "أقل من ١٥ دقيقة" },
  { id: "plants-meknes", name: "نباتات مكناس", category: "نباتات وأزهار", avatar: "ب", location: "مكناس", rating: 4.8, reviews: 41, products: 65, hot: false, responseTime: "أقل من ٥ دقائق" },
  { id: "coffee-oujda", name: "قهوة وجدة", category: "قهوة ومشروبات", avatar: "ق", location: "وجدة", rating: 4.9, reviews: 95, products: 12, hot: true, responseTime: "أقل من دقيقتين" },
];

const categories = ["الكل", "أحذية جلدية", "مجوهرات يدوية", "منتجات طبيعية", "عسل وزيوت", "ملابس عصرية", "سيراميك وفخار", "إلكترونيات"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.floor(rating) ? "text-[#C9A84C]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function StoresPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filtered = stores.filter((s) => {
    const matchCat = activeCategory === "الكل" || s.category === activeCategory;
    const matchSearch = s.name.includes(search) || s.category.includes(search) || s.location.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d0900] to-[#0A0A0A] py-16 px-4">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%)`
        }} />

        <a href="/" className="absolute top-6 right-6 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          دُكّاني
        </a>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {stores.length * 223}+ متجر نشط
            </div>
            <h1 className="text-white font-black text-4xl md:text-5xl mb-4">
              اكتشف أفضل
              <span className="text-[#C9A84C]"> المتاجر المغربية</span>
            </h1>
            <p className="text-white/50 text-lg mb-8">جميع المتاجر مدعومة بمساعد ذكي يرد فوراً</p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن متجر، منتج، أو مدينة..."
                className="w-full bg-[#141414] border border-white/10 rounded-2xl py-3.5 pr-12 pl-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C9A84C]/40"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0 z-20 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#C9A84C] text-[#0A0A0A]"
                    : "bg-[#1C1C1C] text-white/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stores grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-white/30 text-sm mb-6">{filtered.length} متجر</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((store, i) => (
            <motion.a
              key={store.id}
              href={`/store/${store.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#141414] rounded-2xl border border-white/6 p-4 hover:border-[#C9A84C]/30 transition-all group block"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center text-[#0A0A0A] font-black text-lg flex-shrink-0">
                  {store.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-bold text-sm truncate">{store.name}</p>
                    {store.hot && <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">🔥</span>}
                  </div>
                  <p className="text-white/40 text-xs truncate">{store.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={store.rating} />
                <span className="text-white/60 text-xs font-semibold">{store.rating}</span>
                <span className="text-white/30 text-xs">({store.reviews})</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">📍 {store.location}</span>
                <span className="text-white/40">{store.products} منتج</span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {store.responseTime}
                </div>
                <span className="text-[#C9A84C] text-xs font-bold group-hover:underline">زيارة ←</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Open your own */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-[#1a1100] to-[#141414] rounded-3xl border border-[#C9A84C]/20 p-8 text-center"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-white font-black text-2xl mb-2">افتح متجرك الذكي</h2>
          <p className="text-white/50 mb-6">انضم لـ{stores.length * 223}+ تاجر ويبدأ مساعدك الذكي يبيع فوراً</p>
          <a
            href="/auth/register"
            className="inline-block bg-gradient-to-l from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-black px-8 py-4 rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all hover:-translate-y-0.5"
          >
            ابدأ مجاناً — لا يلزم بطاقة
          </a>
        </motion.div>
      </div>
    </div>
  );
}
