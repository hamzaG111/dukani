"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const stories = [
  {
    id: "atlas",
    name: "متجر الأطلس",
    owner: "محمد الكنزاوي",
    city: "الدار البيضاء",
    category: "أحذية جلدية",
    avatar: "م",
    before: { revenue: "٨٠٠٠", responses: "٤٠٪", sleepHours: "٥" },
    after: { revenue: "٢٨٠٠٠", responses: "١٠٠٪", sleepHours: "٨" },
    growth: "٢٥٠٪",
    duration: "٣ أشهر",
    quote: "كنت نعيش قلق دائم إنني كنخسر زبائن كيمشيو عند المنافسين. دابا الذكاء الاصطناعي كيبيع عوضا عني حتى وأنا نايم. مبيعاتي تلاتت.",
    longStory: `كان محمد يبيع الأحذية الجلدية اليدوية منذ ١٥ عاماً. المشكلة الكبرى كانت أنه وحده يدير المتجر، ولا يستطيع الرد على كل رسائل واتساب وانستغرام في نفس الوقت.

في اليوم الأول بعد تثبيت دُكّاني، باع ٣ أزواج بدون ما يرد على أي رسالة بنفسه. الذكاء الاصطناعي تكلم الدارجة مثله تماماً، عرف أسعار المنتجات، واقترح للعميل الحجم المناسب.

بعد ٣ أشهر، تضاعفت مبيعاته ٢.٥ مرة. الآن لديه وقت للتركيز على صنع منتجات أفضل.`,
    tags: ["أحذية", "الدار البيضاء", "تاجر فردي"],
    metrics: [
      { label: "مبيعات شهرية", before: "٨٠٠٠ د.م", after: "٢٨٠٠٠ د.م" },
      { label: "معدل الرد", before: "٤٠٪", after: "١٠٠٪" },
      { label: "ساعات نوم", before: "٥ ساعات", after: "٨ ساعات" },
      { label: "رضا العملاء", before: "٣.٨/٥", after: "٤.٩/٥" },
    ],
  },
  {
    id: "argan",
    name: "متجر أركان",
    owner: "فاطمة المرابط",
    city: "مراكش",
    category: "منتجات طبيعية",
    avatar: "ف",
    before: { revenue: "١٢٠٠٠", responses: "٣٥٪", sleepHours: "٤" },
    after: { revenue: "٤٥٠٠٠", responses: "١٠٠٪", sleepHours: "٨" },
    growth: "٢٧٥٪",
    duration: "٤ أشهر",
    quote: "المساعد الذكي كيعرف يشرح للعميل الأجنبي الفرنسي والعربي في نفس الوقت. وصلت طلبات من باريس وليون وبلجيكا!",
    longStory: `فاطمة تنتج زيت الأركان وكريمات الوجه الطبيعية في مراكش. كان تحدّيها الأكبر هو التواصل مع العملاء الأجانب الذين يتحدثون الفرنسية والإنجليزية.

دُكّاني فهم ذلك تلقائياً — يرد بالفرنسية للعملاء الأجانب وبالدارجة للمغاربة، دون أي ضبط من فاطمة.

في الشهر الثالث، بدأت تستقبل طلبات من فرنسا وبلجيكا وكندا. الآن صدّرت لأكثر من ٢٠ دولة.`,
    tags: ["منتجات طبيعية", "مراكش", "تصدير"],
    metrics: [
      { label: "مبيعات شهرية", before: "١٢٠٠٠ د.م", after: "٤٥٠٠٠ د.م" },
      { label: "دول التصدير", before: "١", after: "٢٠+" },
      { label: "لغات الرد", before: "١", after: "٣" },
      { label: "طلبات يومية", before: "١٢", after: "٥٨" },
    ],
  },
  {
    id: "honey",
    name: "عسل أكادير الأصيل",
    owner: "أمين البكالي",
    city: "أكادير",
    category: "عسل وزيوت",
    avatar: "أ",
    before: { revenue: "٦٠٠٠", responses: "٢٥٪", sleepHours: "٦" },
    after: { revenue: "٢٢٠٠٠", responses: "١٠٠٪", sleepHours: "٨" },
    growth: "٢٦٧٪",
    duration: "٢ شهر",
    quote: "في أول أسبوع بس، باعت دُكّاني عسل بـ٣٥٠٠ درهم في ليلة واحدة وأنا نايم. قلت إلى هذا حلم!",
    longStory: `أمين يملك مناحل في جنوب المغرب. كان يبيع عبر واتساب لكن لا يستطيع الرد في الليل على الطلبات.

في الأسبوع الأول مع دُكّاني، باع مخزون ٥ أيام في ليلة واحدة. المساعد الذكي شرح أنواع العسل، فوائده، وأسعاره للعملاء الذين راسلوا في الساعة ١١ ليلاً.

الآن يعتبر متجره أشهر متجر عسل في أكادير.`,
    tags: ["عسل", "أكادير", "منتجات طبيعية"],
    metrics: [
      { label: "مبيعات شهرية", before: "٦٠٠٠ د.م", after: "٢٢٠٠٠ د.م" },
      { label: "طلبات ليلية", before: "٠", after: "١٨/شهر" },
      { label: "متوسط الطلب", before: "١٥٠ د.م", after: "٣٨٠ د.م" },
      { label: "عملاء جدد", before: "٣/أسبوع", after: "١٢/أسبوع" },
    ],
  },
];

function StoryCard({ story, index, onClick }: { story: typeof stories[0]; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="glass rounded-3xl border border-border hover:border-gold/30 transition-all cursor-pointer group overflow-hidden"
    >
      {/* Gradient top */}
      <div className="h-2 bg-gold-gradient-h opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center text-background font-black text-2xl">
            {story.avatar}
          </div>
          <div>
            <h3 className="text-foreground font-black text-lg">{story.name}</h3>
            <p className="text-muted text-sm">{story.owner} • 📍 {story.city}</p>
          </div>
          <div className="mr-auto text-left">
            <p className="text-green-400 font-black text-2xl">{story.growth}</p>
            <p className="text-muted text-xs">نمو في {story.duration}</p>
          </div>
        </div>

        <blockquote className="text-foreground/80 text-sm leading-relaxed italic border-r-2 border-gold/40 pr-4 mb-5">
          "{story.quote}"
        </blockquote>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {story.metrics.slice(0, 2).map((m, i) => (
            <div key={i} className="bg-surface-2 rounded-xl p-3">
              <p className="text-muted text-xs mb-1">{m.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-red-400/60 text-xs line-through">{m.before}</span>
                <span className="text-gold font-black text-sm">{m.after}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {story.tags.map(tag => (
            <span key={tag} className="text-xs bg-surface-2 text-muted border border-border px-2 py-0.5 rounded-full">{tag}</span>
          ))}
          <span className="mr-auto text-gold text-sm font-bold group-hover:underline">اقرأ القصة كاملة →</span>
        </div>
      </div>
    </motion.div>
  );
}

function StoryModal({ story, onClose }: { story: typeof stories[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#0A0A0A] border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="h-1.5 bg-gold-gradient-h" />
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center text-background font-black text-2xl">
                {story.avatar}
              </div>
              <div>
                <h2 className="text-white font-black text-2xl">{story.name}</h2>
                <p className="text-white/50">{story.owner} • {story.city}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white text-3xl">×</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {story.metrics.map((m, i) => (
              <div key={i} className="bg-[#141414] rounded-xl p-3 text-center">
                <p className="text-white/40 text-xs mb-2">{m.label}</p>
                <p className="text-red-400/60 text-xs line-through">{m.before}</p>
                <p className="text-[#C9A84C] font-black">{m.after}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 mb-6 border-r-4 border-[#C9A84C]">
            <p className="text-white text-lg italic leading-relaxed">"{story.quote}"</p>
            <p className="text-white/40 text-sm mt-3">— {story.owner}</p>
          </div>

          <div className="text-white/70 leading-relaxed whitespace-pre-line mb-8">{story.longStory}</div>

          <div className="flex gap-4">
            <a
              href="/auth/register"
              className="flex-1 bg-gradient-to-l from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-black py-4 rounded-2xl text-center text-lg hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all"
            >
              ابدأ قصة نجاحك الآن ⚡
            </a>
            <button onClick={onClose} className="glass border border-border text-white/60 px-6 rounded-2xl font-semibold hover:text-white transition-colors">
              إغلاق
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SuccessStoriesPage() {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 px-6">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 60%)`
          }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-6 block">قصص النجاح</span>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                تجار حقيقيون
                <span className="text-gold-gradient"> نتائج حقيقية</span>
              </h1>
              <p className="text-muted text-xl max-w-2xl mx-auto">
                اقرأ كيف غيّر دُكّاني حياة التجار المغاربة — بأرقام حقيقية لا بكلام فارغ
              </p>
            </motion.div>
          </div>
        </section>

        {/* Aggregate stats */}
        <section className="py-12 bg-surface-2 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "٢٠٠٠+", label: "قصة نجاح" },
              { value: "٢٦٧٪", label: "متوسط نمو المبيعات" },
              { value: "٤.٩/٥", label: "متوسط رضا العملاء" },
              { value: "٩٨٪", label: "معدل الاحتفاظ بالتجار" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl font-black text-gold-gradient mb-1">{s.value}</p>
                <p className="text-muted text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stories */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {stories.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} onClick={() => setSelectedStory(story)} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-surface-2">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl mb-6">🏆</div>
              <h2 className="text-3xl font-black text-foreground mb-4">قصتك التالية</h2>
              <p className="text-muted text-lg mb-8">انضم لآلاف التجار وابدأ قصة نجاحك اليوم</p>
              <a href="/auth/register" className="inline-block bg-gold-gradient text-background font-black px-10 py-5 rounded-2xl text-xl hover:shadow-gold-strong transition-all hover:-translate-y-0.5">
                ابدأ مجاناً — الإعداد في ٥ دقائق ⚡
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {selectedStory && <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />}
    </>
  );
}
