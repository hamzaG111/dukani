"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const team = [
  { name: "حمزة المنصوري", role: "المؤسس والرئيس التنفيذي", avatar: "ح", bio: "رائد أعمال مغربي شغوف بتمكين التجار العرب من أحدث أدوات التكنولوجيا. أمضى 10 سنوات في مجال ريادة الأعمال الرقمية." },
  { name: "سارة الإدريسي", role: "مديرة المنتج", avatar: "س", bio: "خبرة 7 سنوات في بناء منتجات SaaS. متخصصة في تجربة المستخدم العربي وتحويله إلى عميل مخلص." },
  { name: "ياسين الكنزاوي", role: "كبير المهندسين", avatar: "ي", bio: "مهندس برمجيات من فاس. بنى أنظمة ذكاء اصطناعي لخدمة ملايين المستخدمين. يعشق الكود النظيف والبنية المتينة." },
  { name: "نور بنعلي", role: "مديرة نجاح العملاء", avatar: "ن", bio: "ساعدت أكثر من 500 تاجر على إطلاق متاجرهم الذكية. تؤمن أن نجاح عملائنا هو نجاحنا." },
];

const milestones = [
  { year: "2024", event: "الفكرة تولد من مشكلة حقيقية: تاجر مغربي يخسر 3000 درهم يومياً لأنه لا يستطيع الرد على كل العملاء" },
  { year: "مارس 2025", event: "إطلاق النسخة التجريبية لـ50 تاجر محلي في الدار البيضاء" },
  { year: "يونيو 2025", event: "500 تاجر، مبيعات تجاوزت 2 مليون درهم عبر المنصة" },
  { year: "2026", event: "2000+ تاجر، توسع في المغرب والجزائر وتونس، جولة استثمارية جديدة" },
];

const values = [
  { icon: "🇲🇦", title: "عروبة حقيقية", desc: "نحن لا نترجم — نبني من الصفر بالدارجة والعربية والفرنسية لأن التاجر العربي يستحق الأفضل" },
  { icon: "💡", title: "البساطة تسبق التعقيد", desc: "كل ميزة نبنيها يجب أن يفهمها تاجر في الدرب دون أي تدريب مسبق" },
  { icon: "🤝", title: "نجاحك نجاحنا", desc: "نربح فقط عندما تربح. هذا ليس شعاراً — هو نموذج عملنا" },
  { icon: "🚀", title: "التكنولوجيا في خدمة الإنسان", desc: "الذكاء الاصطناعي لدينا يُعزز قدرات التاجر — لا يستبدله" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 px-6">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%)`
          }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-6 block">قصتنا</span>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
                بُنيت من
                <span className="text-gold-gradient"> الأسواق الشعبية</span>
                <br />لعصر الذكاء الاصطناعي
              </h1>
              <p className="text-muted text-xl max-w-2xl mx-auto leading-relaxed">
                دُكّاني وُلدت من مشكلة حقيقية عاشها تاجر مغربي. اليوم، نحن نحل تلك المشكلة لآلاف التجار في العالم العربي.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Origin story */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-gold rounded-3xl border border-gold/25 p-8 md:p-12"
            >
              <div className="text-5xl mb-6">💡</div>
              <h2 className="text-2xl font-black text-foreground mb-6">كيف بدأت القصة</h2>
              <div className="space-y-4 text-muted text-lg leading-relaxed">
                <p>
                  في عام 2024، زار مؤسسنا متجراً لبيع الأحذية الجلدية في درب عمر بالدار البيضاء. رأى التاجر يركض بين الزبائن في المحل، وهاتفه يرن بلا توقف من واتساب وانستغرام.
                </p>
                <p>
                  قال التاجر: <span className="text-foreground font-bold">"كل يوم نعرف أننا نخسر زبائن كيمشيو لعند منافسينا لأن ما عندناش وقت نردو عليهم."</span>
                </p>
                <p>
                  في تلك اللحظة، وُلدت دُكّاني. ليس من مكتب في سيليكون فالي — بل من قلب السوق المغربي.
                </p>
                <p>
                  اليوم، المساعد الذكي في دُكّاني يرد على عملاء ذلك التاجر على مدار الساعة، ويبيع أكثر مما كان يبيع في أيامه المزدحمة، ويتكلم الدارجة مثل صاحب المحل تماماً.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 bg-surface-2">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground">قيمنا</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl border border-border p-6"
                >
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="text-foreground font-black text-lg mb-2">{v.title}</h3>
                  <p className="text-muted">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground">رحلتنا حتى الآن</h2>
            </motion.div>
            <div className="relative">
              <div className="absolute right-8 top-0 bottom-0 w-px bg-gold/20" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-6 pr-20 relative"
                  >
                    <div className="absolute right-5 top-1 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-background" />
                    </div>
                    <div>
                      <p className="text-gold font-black text-sm mb-1">{m.year}</p>
                      <p className="text-foreground">{m.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6 bg-surface-2">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground">الفريق</h2>
              <p className="text-muted mt-2">بشر حقيقيون يعملون ليل نهار لأجلك</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl border border-border p-6 flex gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center text-background font-black text-xl flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-foreground font-black">{member.name}</p>
                    <p className="text-gold text-sm mb-2">{member.role}</p>
                    <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl mb-6">🚀</div>
              <h2 className="text-3xl font-black text-foreground mb-4">كن جزءاً من القصة</h2>
              <p className="text-muted text-lg mb-8">انضم لـ2000+ تاجر يبنون مستقبلهم مع دُكّاني</p>
              <a
                href="/auth/register"
                className="inline-block bg-gold-gradient text-background font-black px-10 py-5 rounded-2xl text-xl hover:shadow-gold-strong transition-all hover:-translate-y-0.5"
              >
                ابدأ مجاناً الآن ⚡
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
