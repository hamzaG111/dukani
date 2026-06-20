"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const categories = [
  {
    name: "البداية",
    icon: "🚀",
    faqs: [
      {
        q: "كيف أبدأ مع دُكّاني؟",
        a: "الأمر بسيط جداً! سجّل حساباً مجانياً، أدخل معلومات متجرك، أضف منتجاتك، وفي أقل من 5 دقائق يكون مساعدك الذكي جاهزاً للرد على عملائك.",
      },
      {
        q: "هل أحتاج إلى خبرة تقنية؟",
        a: "لا على الإطلاق! دُكّاني مصمم للتاجر العادي بدون أي خلفية تقنية. إذا كنت تستطيع استخدام واتساب، فأنت قادر على استخدام دُكّاني.",
      },
      {
        q: "كم يستغرق الإعداد؟",
        a: "معظم التجار يُتمون الإعداد في أقل من 5 دقائق. لدينا تجار أتموا الإعداد في أقل من دقيقتين!",
      },
      {
        q: "هل هناك فترة تجريبية مجانية؟",
        a: "نعم! الخطة المجانية تتيح لك 100 محادثة شهرياً بدون أي رسوم ودون الحاجة لبطاقة ائتمانية.",
      },
    ],
  },
  {
    name: "المساعد الذكي",
    icon: "🤖",
    faqs: [
      {
        q: "هل يفهم المساعد الدارجة المغربية؟",
        a: "نعم! هذه إحدى أبرز ميزات دُكّاني. المساعد يفهم الدارجة المغربية، الفرنسية، والعربية الفصحى — ويرد بنفس اللغة التي يكتب بها العميل.",
      },
      {
        q: "هل يستطيع المساعد إتمام البيع تلقائياً؟",
        a: "نعم! المساعد يعرض المنتجات، يجيب على الأسئلة، يقترح البدائل، ويوجّه العميل لإتمام الطلب عبر واتساب — كل ذلك بشكل تلقائي.",
      },
      {
        q: "ماذا يحدث إذا سأل العميل سؤالاً لا يعرف إجابته المساعد؟",
        a: "المساعد يطلب بلطف من العميل الانتظار ويُنبّهك برسالة مباشرة. يمكنك ضبط رسائل الاحتياط حسب رغبتك.",
      },
      {
        q: "هل يمكنني تخصيص ردود المساعد؟",
        a: "بالتأكيد! من لوحة التحكم، يمكنك تحديد: اسم المساعد، أسلوب الحديث، المنتجات المتاحة، الأسعار، سياسة التوصيل، والمزيد.",
      },
    ],
  },
  {
    name: "التسعير والدفع",
    icon: "💰",
    faqs: [
      {
        q: "ما هي طرق الدفع المتاحة؟",
        a: "نقبل البطاقات البنكية (Visa/Mastercard)، والتحويل البنكي، وقريباً CIH Pay و Wafacash للدفع المحلي.",
      },
      {
        q: "هل يمكنني إلغاء الاشتراك في أي وقت؟",
        a: "نعم بالطبع، لا يوجد أي التزام. يمكنك إلغاء اشتراكك في أي وقت من لوحة التحكم وستحتفظ بمزايا الخطة حتى نهاية الشهر.",
      },
      {
        q: "هل هناك تخفيض للدفع السنوي؟",
        a: "نعم! الاشتراك السنوي يوفر لك ما يعادل شهرين مجانيين مقارنة بالدفع الشهري.",
      },
      {
        q: "ماذا يحدث إذا تجاوزت حد المحادثات؟",
        a: "سنُنبّهك عند الاقتراب من الحد. يمكنك الترقية بنقرة واحدة، أو الانتظار حتى الشهر القادم — المساعد لن يتوقف فجأة.",
      },
    ],
  },
  {
    name: "الخصوصية والأمان",
    icon: "🔒",
    faqs: [
      {
        q: "هل بيانات متجري ومحادثاتي آمنة؟",
        a: "أمان بياناتك أولويتنا القصوى. جميع البيانات مشفّرة باستخدام معايير SSL/TLS، ولا نشارك بياناتك مع أي طرف ثالث.",
      },
      {
        q: "هل يتم حفظ محادثات العملاء؟",
        a: "نعم، يتم حفظها في لوحة تحكمك لمدة 90 يوماً لتمكينك من مراجعتها وتحسين خدمتك.",
      },
      {
        q: "هل دُكّاني متوافق مع قوانين حماية البيانات؟",
        a: "نعم، نلتزم تماماً بقوانين حماية البيانات المغربية والأوروبية (GDPR).",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors ${open ? "border-gold/30 bg-gold/5" : "border-border"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right px-6 py-5 flex items-center justify-between gap-4"
      >
        <span className="text-foreground font-semibold text-sm leading-relaxed">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ${open ? "border-gold text-gold" : "border-border text-muted"}`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-border/50 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 px-6">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%)`
          }} />
          <div className="max-w-3xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-6 block">الأسئلة الشائعة</span>
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                كل ما تريد معرفته
                <span className="text-gold-gradient"> عن دُكّاني</span>
              </h1>
              <p className="text-muted text-lg">لم تجد إجابتك؟ تواصل معنا مباشرة</p>
            </motion.div>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Category tabs */}
            <div className="flex gap-3 flex-wrap mb-8">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === i
                      ? "bg-gold text-background"
                      : "glass border border-border text-muted hover:text-foreground"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {categories[activeCategory].faqs.map((faq, i) => (
                  <FaqItem key={i} q={faq.q} a={faq.a} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 glass-gold rounded-3xl border border-gold/25 p-8 text-center"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-foreground font-black text-xl mb-2">لديك سؤال آخر؟</h3>
              <p className="text-muted mb-6">فريقنا يرد خلال أقل من 3 ساعات</p>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-bold px-6 py-3 rounded-xl hover:bg-[#25D366]/25 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.545-1.374A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
                تحدث معنا على واتساب
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
