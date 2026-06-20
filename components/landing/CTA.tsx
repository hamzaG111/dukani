"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#0A0A0A] to-[#0f0a00]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gold text-sm font-semibold">2000+ تاجر يستخدمونه الآن</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            جاهز لتحويل متجرك
            <br />
            <span className="text-gold-gradient">إلى آلة بيع ذكية؟</span>
          </h2>

          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
            انضم لآلاف التجار العرب الذين يبيعون أكثر، يعملون أقل، وينامون هانئين — دُكّاني يعمل نيابةً عنهم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button size="lg" variant="primary" className="text-lg px-10">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              ابدأ مجاناً — بدون بطاقة
            </Button>
            <Button size="lg" variant="outline">
              تحدث مع فريق المبيعات
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            {[
              "✓ إعداد في 5 دقائق",
              "✓ تجربة مجانية 14 يوم",
              "✓ إلغاء في أي وقت",
              "✓ دعم بالعربية",
            ].map((item, i) => (
              <span key={i} className="text-foreground/60">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
