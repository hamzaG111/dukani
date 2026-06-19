"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    icon: "🧠",
    title: "ذكاء اصطناعي يبيع بدلاً عنك",
    description: "المساعد لا يجاوب فقط — يقترح المنتج المناسب، يتفاوض بأدب، ويقود العميل نحو الشراء بذكاء طبيعي.",
    highlight: true,
  },
  {
    icon: "🌍",
    title: "يتكلم الدارجة والعربية والفرنسية",
    description: "يرد بنفس لغة العميل تلقائياً — دارجة مغربية، عربية فصحى، أو فرنسية. عميلك يشعر أنه يكلّم إنساناً.",
    highlight: false,
  },
  {
    icon: "📦",
    title: "كتالوج منتجات ذكي",
    description: "أضف منتجاتك مع الصور والأسعار والتفاصيل. المساعد يعرضها داخل المحادثة ببطاقات جذابة.",
    highlight: false,
  },
  {
    icon: "📲",
    title: "تحويل مباشر لواتساب",
    description: "زر واحد يحوّل المحادثة لرسالة واتساب جاهزة بتفاصيل الطلب — لك ولعميلك بدون عناء.",
    highlight: false,
  },
  {
    icon: "📊",
    title: "لوحة تحكم ذكية",
    description: "اعرف ماذا يسأل عملاؤك أكثر، وأي منتجاتك الأكثر طلباً، واحصل على توصيات لتحسين مبيعاتك.",
    highlight: false,
  },
  {
    icon: "⚡",
    title: "إعداد خاطف في ٥ دقائق",
    description: "بدون كود، بدون خبرة تقنية، بدون تعقيد. التاجر المغربي البسيط يُعدّ كل شيء في أقل من ٥ دقائق.",
    highlight: false,
  },
  {
    icon: "🎨",
    title: "تخصيص كامل بهويتك",
    description: "شعارك، ألوانك، اسمك. صفحة الشات تبدو وكأنك بنيتها بنفسك — احترافية ١٠٠٪.",
    highlight: false,
  },
  {
    icon: "🔗",
    title: "رابط وQR Code جاهز",
    description: "رابط قابل للمشاركة على كل منصة + QR Code للطباعة على بطاقاتك والعلب والمتجر.",
    highlight: false,
  },
];

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">المميزات</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            كل ما يحتاجه التاجر الذكي
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            أدوات مدروسة بعناية للتاجر العربي — لا زيادة ولا نقصان
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className={`relative group rounded-3xl p-6 border transition-all duration-300 cursor-default ${
                feature.highlight
                  ? "glass-gold border-gold/30 col-span-full md:col-span-2"
                  : "glass border-border hover:border-gold/30"
              } ${hovered === i ? "shadow-gold -translate-y-1" : ""}`}
            >
              {feature.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl bg-gold-gradient-h" />
              )}

              <div className={`text-4xl mb-4 ${feature.highlight ? "text-5xl" : ""}`}>
                {feature.icon}
              </div>

              <h3 className={`font-bold text-foreground mb-2 ${feature.highlight ? "text-xl" : "text-base"}`}>
                {feature.title}
              </h3>

              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>

              {feature.highlight && (
                <div className="mt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold border border-gold/30 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    الميزة الأساسية
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
