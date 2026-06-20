"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const store = {
  name: "متجر الأطلس",
  tagline: "أحذية جلدية فاخرة — صنع مغربي أصيل",
  description: "نحن متخصصون في الأحذية الجلدية المصنوعة يدوياً من قِبل حرفيين مغاربة بخبرة تمتد لعقود. جودة تدوم، وأسعار تناسب الجميع.",
  avatar: "م",
  rating: 4.9,
  reviews: 127,
  responseTime: "أقل من 3 دقائق",
  location: "الدار البيضاء، المغرب",
  hours: "الإثنين-السبت: 9ص–9م",
  phone: "+212 661 234 567",
  instagram: "@atlas.store",
  products: [
    { name: "جبادور جلدي بني داكن", price: 297, original: 350, icon: "👞", category: "أحذية", available: true, hot: true },
    { name: "جبادور بني فاتح", price: 350, original: null, icon: "👟", category: "أحذية", available: true, hot: false },
    { name: "جبادور أسود كلاسيكي", price: 320, original: null, icon: "👞", category: "أحذية", available: true, hot: false },
    { name: "صندل جلدي صيفي", price: 180, original: 220, icon: "🥿", category: "صنادل", available: true, hot: false },
    { name: "شبشب جلدي مريح", price: 120, original: null, icon: "🩴", category: "صنادل", available: false, hot: false },
    { name: "حزام جلدي فاخر", price: 85, original: null, icon: "👜", category: "إكسسوارات", available: true, hot: false },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.floor(rating) ? "text-gold" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = ["الكل", ...Array.from(new Set(store.products.map((p) => p.category)))];
  const filtered = activeCategory === "الكل" ? store.products : store.products.filter((p) => p.category === activeCategory);

  const toggleWishlist = (name: string) => {
    setWishlist((w) => w.includes(name) ? w.filter((x) => x !== name) : [...w, name]);
  };

  const openChat = () => window.location.href = "/chat/atlas-store";
  const openWhatsApp = (product?: string) => {
    const msg = product ? `السلام عليكم! أريد أعرف أكثر عن: ${product}` : "السلام عليكم!";
    window.open(`https://wa.me/212661234567?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Cover */}
      <div className="h-48 md:h-64 relative bg-gradient-to-br from-[#1a1100] via-[#0A0A0A] to-[#0d0a00] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.2) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.1) 0%, transparent 50%)`
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

        {/* Top bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <a href="/" className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.share?.({ title: store.name, url: window.location.href }).catch(() => {})}
              className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Profile section */}
      <div className="max-w-2xl mx-auto px-4 -mt-14 relative z-10">
        <div className="flex items-end gap-4 mb-4">
          <div className="w-24 h-24 rounded-3xl bg-gold-gradient flex items-center justify-center text-[#0A0A0A] font-black text-4xl border-4 border-[#0A0A0A] shadow-gold flex-shrink-0">
            {store.avatar}
          </div>
          <div className="pb-1">
            <h1 className="text-white font-black text-2xl leading-tight">{store.name}</h1>
            <p className="text-[#C9A84C] text-sm font-medium">{store.tagline}</p>
          </div>
        </div>

        {/* Rating & info */}
        <div className="flex items-center gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-2">
            <StarRating rating={store.rating} />
            <span className="text-white font-bold text-sm">{store.rating}</span>
            <span className="text-white/40 text-xs">({store.reviews} تقييم)</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            يرد في {store.responseTime}
          </div>
          <div className="text-white/50 text-xs">📍 {store.location}</div>
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-6">{store.description}</p>

        {/* Action buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={openChat}
            className="flex-1 bg-gold-gradient text-[#0A0A0A] font-black py-4 rounded-2xl text-base flex items-center justify-center gap-2 hover:shadow-gold transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            تحدث مع المساعد
          </button>
          <button
            onClick={() => openWhatsApp()}
            className="w-14 bg-[#25D366]/15 border border-[#25D366]/30 rounded-2xl flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/25 transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.545-1.374A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
          </button>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: "🕐", label: "ساعات العمل", value: store.hours },
            { icon: "📍", label: "الموقع", value: store.location },
          ].map((info, i) => (
            <div key={i} className="bg-[#141414] rounded-2xl border border-white/6 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span>{info.icon}</span>
                <span className="text-white/40 text-xs">{info.label}</span>
              </div>
              <p className="text-white text-sm font-semibold">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="mb-6">
          <h2 className="text-white font-black text-xl mb-4">المنتجات ({store.products.length})</h2>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm px-4 py-1.5 rounded-full font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#C9A84C] text-[#0A0A0A]"
                    : "bg-[#1C1C1C] text-white/40 border border-white/8 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`bg-[#141414] rounded-2xl border overflow-hidden group ${
                  product.available ? "border-white/6 hover:border-[#C9A84C]/30" : "border-white/4 opacity-60"
                } transition-all`}
              >
                {/* Product image placeholder */}
                <div className="h-32 bg-[#1C1C1C] flex items-center justify-center relative">
                  <span className="text-5xl">{product.icon}</span>
                  {product.hot && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      🔥 رائج
                    </div>
                  )}
                  {!product.available && (
                    <div className="absolute inset-0 bg-[#0A0A0A]/60 flex items-center justify-center">
                      <span className="text-white/60 text-xs font-semibold">نفد المخزون</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.name)}
                    className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center"
                  >
                    <svg className={`w-4 h-4 ${wishlist.includes(product.name) ? "text-red-400" : "text-white/40"}`} fill={wishlist.includes(product.name) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="p-3">
                  <p className="text-white text-xs font-bold leading-snug mb-2">{product.name}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#C9A84C] font-black text-base">{product.price}</span>
                      <span className="text-white/40 text-xs mr-1">د.م</span>
                      {product.original && (
                        <div className="text-white/30 text-xs line-through">{product.original}</div>
                      )}
                    </div>
                    {product.available && (
                      <button
                        onClick={() => openWhatsApp(product.name)}
                        className="text-[10px] font-black text-[#0A0A0A] bg-[#C9A84C] px-2.5 py-1.5 rounded-xl hover:bg-[#E8C97A] transition-colors"
                      >
                        أريده
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center py-6 border-t border-white/5">
          <p className="text-white/20 text-xs">
            مدعوم بـ{" "}
            <a href="/" className="text-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors font-semibold">
              دُكّاني
            </a>
            {" "}— ابنِ متجرك الذكي أنت أيضاً
          </p>
        </div>
      </div>
    </div>
  );
}
