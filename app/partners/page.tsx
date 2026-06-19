"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const tiers = [
  {
    name: "شريك فضي",
    icon: "🥈",
    commission: "٢٠٪",
    minReferrals: "٥",
    perks: ["٢٠٪ عمولة مدى الحياة", "لوحة تحكم للشركاء", "دعم مخصص", "مواد تسويقية"],
    color: "border-gray-400/30 bg-gray-500/5",
    textColor: "text-gray-300",
  },
  {
    name: "شريك ذهبي",
    icon: "🥇",
    commission: "٣٠٪",
    minReferrals: "٢٠",
    perks: ["٣٠٪ عمولة مدى الحياة", "صفحة شريك مخصصة", "مدير حساب شخصي", "تدريب مجاني", "شارة معتمد"],
    color: "border-gold/30 bg-gold/5",
    textColor: "text-gold",
    highlight: true,
  },
  {
    name: "شريك بلاتيني",
    icon: "💎",
    commission: "٤٠٪",
    minReferrals: "٥٠",
    perks: ["٤٠٪ عمولة مدى الحياة", "حصة من الأرباح", "أولوية في المميزات", "شراكة استراتيجية", "دعوة لمؤتمر سنوي"],
    color: "border-cyan-400/30 bg-cyan-500/5",
    textColor: "text-cyan-400",
  },
];

const partnerTypes = [
  { icon: "👔", title: "مستشارو الأعمال", desc: "تعمل مع التجار والشركات الصغيرة؟ اكسب عمولة دائمة لكل عميل تحوّله." },
  { icon: "🎓", title: "مدرّبو التجارة الإلكترونية", desc: "ادمج دُكّاني في دوراتك التدريبية وامنح طلابك أداة لا تقدّر بثمن." },
  { icon: "📣", title: "المؤثرون والمدوّنون", desc: "شارك رابطك مع متابعيك واكسب من كل تاجر ينضم — مدى الحياة." },
  { icon: "🏢", title: "وكالات التسويق", desc: "قدّم لعملائك حلاً ذكياً لإدارة المحادثات وزيادة مبيعاتهم." },
];

export default function PartnersPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 px-6">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 60%)`
          }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-6 block">برنامج الشركاء</span>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
                اكسب مع كل
                <span className="text-gold-gradient"> تاجر تُرشده</span>
              </h1>
              <p className="text-muted text-xl max-w-2xl mx-auto mb-10">
                انضم لشبكة شركائنا المتنامية واكسب عمولة تصل إلى ٤٠٪ من كل اشتراك — مدى الحياة.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply" className="bg-gold-gradient text-background font-black px-8 py-4 rounded-2xl text-lg hover:shadow-gold-strong transition-all hover:-translate-y-0.5">
                  قدّم طلبك الآن
                </a>
                <a href="#tiers" className="glass border border-border text-foreground font-bold px-8 py-4 rounded-2xl text-lg hover:border-gold/30 transition-all">
                  تعرف على الأنواع
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6 bg-surface-2">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "٤٠٪", label: "أعلى عمولة" },
              { value: "٢٠٠٠+", label: "تاجر في الشبكة" },
              { value: "مدى الحياة", label: "نوع العمولة" },
              { value: "٤٨ ساعة", label: "وقت الموافقة" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl font-black text-gold-gradient mb-1">{s.value}</p>
                <p className="text-muted text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partner types */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground">لمن هذا البرنامج؟</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {partnerTypes.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl border border-border p-6"
                >
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <h3 className="text-foreground font-black mb-2">{p.title}</h3>
                  <p className="text-muted text-sm">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section id="tiers" className="py-20 px-6 bg-surface-2">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground">مستويات الشراكة</h2>
              <p className="text-muted mt-2">كلما أحلت أكثر، زادت عمولتك</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass rounded-3xl border p-8 relative ${tier.color} ${tier.highlight ? "ring-1 ring-gold/30" : ""}`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-background text-xs font-black px-4 py-1 rounded-full">
                      الأكثر شيوعاً
                    </div>
                  )}
                  <div className="text-4xl mb-4">{tier.icon}</div>
                  <h3 className={`text-2xl font-black mb-1 ${tier.textColor}`}>{tier.name}</h3>
                  <p className={`text-5xl font-black mb-2 ${tier.textColor}`}>{tier.commission}</p>
                  <p className="text-muted text-sm mb-6">من كل اشتراك مدى الحياة</p>
                  <p className="text-muted text-xs mb-4">يتطلب: {tier.minReferrals}+ إحالة نشطة</p>
                  <ul className="space-y-2">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-foreground/80">
                        <svg className={`w-4 h-4 ${tier.textColor} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id="apply" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-black text-foreground">قدّم طلبك</h2>
              <p className="text-muted mt-2">سنراجع طلبك ونتواصل معك خلال ٤٨ ساعة</p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-gold rounded-3xl border border-gold/25 p-12 text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-black text-foreground mb-2">تم استلام طلبك!</h3>
                <p className="text-muted">سنتواصل معك خلال ٤٨ ساعة على بريدك الإلكتروني</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl border border-border p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-foreground text-sm font-semibold mb-2 block">الاسم الكامل</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40"
                      placeholder="اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="text-foreground text-sm font-semibold mb-2 block">البريد الإلكتروني</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40"
                      placeholder="email@example.com"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-foreground text-sm font-semibold mb-2 block">نوع الشراكة</label>
                  <select
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold/40"
                  >
                    <option value="">اختر نوع الشراكة</option>
                    <option>مستشار أعمال</option>
                    <option>مدرّب تجارة إلكترونية</option>
                    <option>مؤثر / مدوّن</option>
                    <option>وكالة تسويق</option>
                    <option>أخرى</option>
                  </select>
                </div>
                <div>
                  <label className="text-foreground text-sm font-semibold mb-2 block">كيف ستروّج لدُكّاني؟</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40 resize-none"
                    placeholder="أخبرنا عن جمهورك وكيف تخطط للترويج..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold-gradient text-background font-black py-4 rounded-2xl text-lg hover:shadow-gold-strong transition-all hover:-translate-y-0.5"
                >
                  إرسال الطلب ⚡
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
