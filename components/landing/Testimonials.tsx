"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "محمد الكنزاوي",
    role: "صاحب متجر ملابس — الدار البيضاء",
    avatar: "م",
    text: "كنت أفقد عملاء كثيرين لأنني لا أستطيع الرد في الوقت المناسب. منذ استخدمت دُكّاني، مبيعاتي ارتفعت 40٪ في أقل من شهر. المساعد يرد أحسن مني!",
    rating: 5,
    highlight: true,
  },
  {
    name: "فاطمة بنعلي",
    role: "بائعة عطور وإكسسوارات — مراكش",
    avatar: "ف",
    text: "الإعداد أخذ مني 4 دقائق فقط، والمساعد يتكلم الدارجة بشكل طبيعي جداً. عملاؤتي يعتقدون أن هناك موظف حقيقي يرد عليهم!",
    rating: 5,
    highlight: false,
  },
  {
    name: "يوسف الإدريسي",
    role: "مطعم وجبات سريعة — فاس",
    avatar: "ي",
    text: "أضفت قائمة المطعم والأسعار، والمساعد بدأ يأخذ الطلبات فوراً. وفّرت راتب موظف كامل بسعر دُكّاني الشهري.",
    rating: 5,
    highlight: false,
  },
  {
    name: "سلمى الغزالي",
    role: "صيدلية — الرباط",
    avatar: "س",
    text: "ما توقعت أن يكون بهذه السهولة. الآن عملاؤتي يسألون عن توفر الأدوية في أي وقت ويحجزون مواعيدهم بدون اتصال.",
    rating: 5,
    highlight: false,
  },
  {
    name: "حمزة المنصوري",
    role: "متجر إلكترونيات — طنجة",
    avatar: "ح",
    text: "التحليلات أوضحت لي أن 60٪ من العملاء يسألون عن شواحن الجوال — فأضفت تشكيلة أوسع وارتفعت مبيعاتي مباشرة!",
    rating: 5,
    highlight: false,
  },
  {
    name: "نادية بوهاشم",
    role: "حلواني وكيك ديزاين — أكادير",
    avatar: "ن",
    text: "عملاؤتي يريدون صور الكيك ومعرفة الأسعار في كل وقت. دُكّاني يجيب ويرسل الصور ويأخذ الطلبات — أنا أشتغل فقط في المطبخ!",
    rating: 5,
    highlight: false,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">قصص النجاح</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            تجار حقيقيون، نتائج حقيقية
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            من الدار البيضاء إلى أكادير — تجار من كل أنحاء المغرب يثقون في دُكّاني
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-gold ${
                t.highlight
                  ? "glass-gold border-gold/30"
                  : "glass border-border hover:border-gold/20"
              }`}
            >
              {t.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl bg-gold-gradient-h" />
              )}

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/85 text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-background font-black">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
