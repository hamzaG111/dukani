"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const categories = ["الكل", "مبيعات", "تسويق", "ذكاء اصطناعي", "قصص نجاح", "نصائح"];

const posts = [
  {
    id: 1,
    category: "مبيعات",
    title: "٢٠ رسالة واتساب تضاعف مبيعاتك في رمضان",
    excerpt: "اكتشف أسرار الرسائل التي تحقق أعلى معدلات فتح وتحويل في شهر رمضان المبارك. قوالب جاهزة للاستخدام الفوري.",
    author: "فريق دُكّاني",
    date: "١٥ يونيو ٢٠٢٦",
    readTime: "٥ دقائق",
    image: "💬",
    featured: true,
    views: "١٢,٤٠٠",
  },
  {
    id: 2,
    category: "ذكاء اصطناعي",
    title: "كيف يرد الذكاء الاصطناعي على اعتراضات العملاء بالدارجة",
    excerpt: "تعمق في فهم كيف يتعامل نظام دُكّاني مع ٥٠+ اعتراض شائع ويحوّلها إلى فرص بيع.",
    author: "يوسف العمراني",
    date: "١٢ يونيو ٢٠٢٦",
    readTime: "٧ دقائق",
    image: "🤖",
    featured: false,
    views: "٨,٩٠٠",
  },
  {
    id: 3,
    category: "قصص نجاح",
    title: "من ٠ إلى ٥٠٠ مبيعة في ٣٠ يوم: قصة سلمى من فاس",
    excerpt: "كيف بدأت سلمى متجرها للعطور المغربية واستخدمت دُكّاني لتحقيق ٢٠٠٪ نمو في الشهر الأول.",
    author: "نجوى الكاتب",
    date: "١٠ يونيو ٢٠٢٦",
    readTime: "٨ دقائق",
    image: "🌹",
    featured: false,
    views: "٢٣,١٠٠",
  },
  {
    id: 4,
    category: "تسويق",
    title: "استراتيجية المحتوى للتاجر المغربي على إنستغرام ٢٠٢٦",
    excerpt: "دليل شامل لبناء محتوى يجذب عملاء حقيقيين وليس مجرد متابعين. ٣٠ فكرة بوست جاهزة.",
    author: "أيمن الصغير",
    date: "٨ يونيو ٢٠٢٦",
    readTime: "١٠ دقائق",
    image: "📸",
    featured: false,
    views: "١٥,٢٠٠",
  },
  {
    id: 5,
    category: "نصائح",
    title: "أخطاء ٩٠٪ من التجار يرتكبونها في الرد على الزبائن",
    excerpt: "اكتشف الأخطاء القاتلة التي تُهرّب زبائنك وكيف يتجنبها التجار الناجحون باستخدام الذكاء الاصطناعي.",
    author: "فريق دُكّاني",
    date: "٥ يونيو ٢٠٢٦",
    readTime: "٦ دقائق",
    image: "⚠️",
    featured: false,
    views: "١٩,٨٠٠",
  },
  {
    id: 6,
    category: "مبيعات",
    title: "علم النفس خلف إغلاق الصفقة: ٧ تقنيات يستخدمها دُكّاني",
    excerpt: "من مبدأ الندرة إلى تأثير المعاملة بالمثل — كيف يوظّف الذكاء الاصطناعي علم النفس في كل محادثة.",
    author: "يوسف العمراني",
    date: "٢ يونيو ٢٠٢٦",
    readTime: "٩ دقائق",
    image: "🧠",
    featured: false,
    views: "٢٨,٤٠٠",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === "الكل" || p.category === activeCategory;
    const matchSearch = !search || p.title.includes(search) || p.excerpt.includes(search);
    return matchCat && matchSearch;
  });

  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">مدوّنة دُكّاني</span>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              معرفة تحوّل متجرك
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              نصائح مجربة، قصص نجاح حقيقية، وأسرار التجارة من أنجح تجار المغرب العربي
            </p>

            {/* Search */}
            <div className="mt-8 max-w-md mx-auto relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث في المقالات..."
                className="w-full bg-surface-2 border border-border rounded-2xl px-5 py-3.5 text-foreground placeholder:text-muted pr-12 focus:outline-none focus:border-gold/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">🔍</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-gold text-background"
                  : "glass border border-border text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl border border-border overflow-hidden mb-10 hover:border-gold/25 transition-all cursor-pointer group"
          >
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-gold/10 to-surface-2 flex items-center justify-center p-16 text-8xl">
                {featured.image}
              </div>
              <div className="p-8 md:w-3/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-gold bg-gold/10 border border-gold/20 px-2 py-1 rounded-full">{featured.category}</span>
                  <span className="text-xs text-muted">• مقالة مميزة</span>
                </div>
                <h2 className="text-2xl font-black text-foreground mb-3 group-hover:text-gold transition-colors leading-relaxed">
                  {featured.title}
                </h2>
                <p className="text-muted leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span>✍️ {featured.author}</span>
                  <span>📅 {featured.date}</span>
                  <span>⏱ {featured.readTime}</span>
                  <span>👁 {featured.views}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl border border-border overflow-hidden hover:border-gold/25 transition-all cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-surface-2 to-surface h-32 flex items-center justify-center text-5xl">
                {post.image}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-[10px] text-muted">{post.readTime}</span>
                </div>
                <h3 className="text-foreground font-black mb-2 group-hover:text-gold transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted border-t border-border pt-3">
                  <span>{post.author}</span>
                  <span>👁 {post.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass-gold rounded-3xl border border-gold/20 p-10 text-center"
        >
          <div className="text-5xl mb-4">📬</div>
          <h3 className="text-2xl font-black text-foreground mb-2">لا تفوّت نصيحة واحدة</h3>
          <p className="text-muted mb-6">اشترك في نشرتنا الأسبوعية واحصل على أفضل نصائح المبيعات مباشرة في بريدك</p>
          <form className="flex gap-3 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/50"
            />
            <button className="bg-gold-gradient text-background font-black px-5 py-3 rounded-xl text-sm">
              اشترك
            </button>
          </form>
          <p className="text-muted text-xs mt-3">+٨,٤٠٠ تاجر يتلقون النشرة أسبوعياً</p>
        </motion.div>
      </div>
    </div>
  );
}
