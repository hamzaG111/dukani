"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const channels = [
  { icon: "💬", label: "واتساب",    value: "+212 6XX-XXXXXX", sub: "رد فوري — متاح 24/7", href: "#" },
  { icon: "📧", label: "البريد",    value: "support@dukani.ma", sub: "رد خلال 2 ساعة", href: "mailto:support@dukani.ma" },
  { icon: "📸", label: "انستغرام", value: "@dukani.ma",         sub: "رسائل مباشرة", href: "#" },
];

const faqs = [
  { q: "كم يستغرق الإعداد؟",                 a: "5 دقائق فقط! أكمل التسجيل، أضف منتجاتك، وشارك رابط شاتك." },
  { q: "هل يعمل بالدارجة المغربية؟",          a: "نعم! المساعد الذكي يتحدث بالدارجة والعربية والفرنسية بطلاقة." },
  { q: "ماذا يحدث إذا نفدت محادثاتي؟",       a: "يتوقف الرد التلقائي فقط، يمكنك الترقية في أي وقت." },
  { q: "هل بياناتي وبيانات زبائني محمية؟",    a: "نعم. نستخدم تشفير SSL وخوادم مؤمّنة. لا نشارك بياناتك أبداً." },
];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-xs font-black tracking-widest uppercase border border-gold/30 bg-gold/10 px-3 py-1 rounded-full mb-4 inline-block">نحن هنا لمساعدتك</span>
            <h1 className="text-4xl font-black text-foreground mb-3">تواصل معنا</h1>
            <p className="text-muted text-lg">فريقنا جاهز لمساعدتك في أي وقت. لا تتردد في التواصل معنا.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Contact form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-foreground font-black text-2xl mb-6">أرسل لنا رسالة</h2>
          {sent ? (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-gold rounded-3xl border border-gold/30 p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-foreground font-black text-xl mb-2">تم الإرسال!</p>
              <p className="text-muted">سنرد عليك خلال ساعتين على الأكثر.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-6 text-sm text-gold hover:underline">إرسال رسالة أخرى</button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                  placeholder="اسمك الكامل" required
                  className="bg-surface-2 border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/50" />
                <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))}
                  placeholder="بريدك الإلكتروني" required
                  className="bg-surface-2 border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/50" />
              </div>
              <select value={form.subject} onChange={e => setForm(p => ({...p, subject: e.target.value}))}
                className="w-full bg-surface-2 border border-border rounded-2xl px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-gold/50">
                <option value="">الموضوع</option>
                <option>دعم فني</option>
                <option>سؤال عن الأسعار</option>
                <option>طلب ديمو</option>
                <option>شراكة</option>
                <option>أخرى</option>
              </select>
              <textarea value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
                placeholder="رسالتك..." rows={5} required
                className="w-full bg-surface-2 border border-border rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/50 resize-none" />
              <button type="submit" disabled={sending}
                className="w-full bg-gold-gradient text-background font-black py-4 rounded-2xl hover:shadow-gold transition-all disabled:opacity-70 text-sm">
                {sending ? "جاري الإرسال..." : "إرسال الرسالة 📨"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Right side */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          {/* Channels */}
          <div>
            <h2 className="text-foreground font-black text-xl mb-4">تواصل مباشر</h2>
            <div className="space-y-3">
              {channels.map((c, i) => (
                <a key={i} href={c.href} className="glass rounded-2xl border border-border p-4 flex items-center gap-4 hover:border-gold/25 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-xl">{c.icon}</div>
                  <div>
                    <p className="text-foreground font-bold text-sm">{c.label}: <span className="text-gold">{c.value}</span></p>
                    <p className="text-muted text-xs">{c.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ mini */}
          <div>
            <h2 className="text-foreground font-black text-xl mb-4">أسئلة شائعة</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="glass rounded-xl border border-border p-4">
                  <p className="text-foreground font-bold text-sm mb-1">❓ {f.q}</p>
                  <p className="text-muted text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <a href="/faq" className="block text-center text-gold text-sm font-bold mt-4 hover:underline">عرض كل الأسئلة ←</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
