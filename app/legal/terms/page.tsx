import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دُكّاني — شروط الاستخدام",
  description: "شروط وأحكام استخدام منصة دُكّاني",
};

const sections = [
  {
    title: "1. قبول الشروط",
    content: "باستخدام منصة دُكّاني، توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي منها، يرجى التوقف عن استخدام المنصة.",
  },
  {
    title: "2. وصف الخدمة",
    content: "دُكّاني هي منصة تجارة ذكية تتيح للتجار استخدام الذكاء الاصطناعي للرد على زبائنهم وإدارة مبيعاتهم عبر واتساب وقنوات التواصل الاجتماعي.",
  },
  {
    title: "3. حساب المستخدم",
    content: "أنت مسؤول عن الحفاظ على سرية بيانات تسجيل الدخول. يجب أن تكون فوق 18 عاماً. تمنع مشاركة الحساب مع أطراف أخرى. نحتفظ بحق تعليق الحسابات المخالفة.",
  },
  {
    title: "4. الاستخدام المقبول",
    content: "يُسمح: بيع المنتجات والخدمات المشروعة، التواصل مع زبائنك، استخدام الذكاء الاصطناعي للمبيعات. يُحظر: الرسائل المزعجة (Spam)، بيع منتجات مقلدة أو محظورة، استخدام المنصة لأغراض غير قانونية.",
  },
  {
    title: "5. الاشتراكات والدفع",
    content: "تُجدَّد الاشتراكات تلقائياً في بداية كل دورة فوترة. يمكنك إلغاء الاشتراك في أي وقت. لا نسترد رسوم الأشهر المنقضية. نحتفظ بحق تعديل الأسعار مع إشعار مسبق 30 يوماً.",
  },
  {
    title: "6. الملكية الفكرية",
    content: "جميع حقوق الملكية الفكرية لمنصة دُكّاني (الكود، التصميم، العلامة التجارية) محفوظة لشركة دُكّاني. محتوى متجرك (منتجاتك، صورك، نصوصك) يظل ملكاً لك.",
  },
  {
    title: "7. حدود المسؤولية",
    content: "دُكّاني أداة مساعدة وليست ضامنة للمبيعات. لا نتحمل مسؤولية النزاعات بين التجار وزبائنهم. الذكاء الاصطناعي قد يخطئ أحياناً — أنت مسؤول عن مراجعة ردوده.",
  },
  {
    title: "8. إنهاء الخدمة",
    content: "يمكنك إنهاء حسابك في أي وقت من الإعدادات. يمكننا تعليق أو إنهاء حسابات تنتهك هذه الشروط. عند الإنهاء، يمكنك تصدير بياناتك خلال 30 يوماً.",
  },
  {
    title: "9. القانون المطبّق",
    content: "تخضع هذه الشروط للقانون المغربي. أي نزاعات تُحال إلى المحاكم المختصة في الدار البيضاء، المغرب.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <span className="text-gold text-xs font-black tracking-widest uppercase border border-gold/30 bg-gold/10 px-3 py-1 rounded-full mb-4 inline-block">قانوني</span>
          <h1 className="text-4xl font-black text-foreground mb-2">شروط الاستخدام</h1>
          <p className="text-muted">آخر تحديث: 19 يونيو 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        {sections.map((sec, i) => (
          <div key={i} className="glass rounded-2xl border border-border p-6">
            <h2 className="text-foreground font-black mb-3">{sec.title}</h2>
            <p className="text-muted text-sm leading-relaxed">{sec.content}</p>
          </div>
        ))}

        <div className="glass-gold rounded-2xl border border-gold/20 p-5 text-center">
          <p className="text-muted text-sm mb-3">هل لديك سؤال حول شروط الاستخدام؟</p>
          <a href="/contact" className="text-gold font-black hover:underline">تواصل مع فريقنا القانوني →</a>
        </div>

        <div className="flex justify-center gap-6">
          <a href="/legal/privacy" className="text-gold text-sm hover:underline">سياسة الخصوصية</a>
          <a href="/faq" className="text-gold text-sm hover:underline">الأسئلة الشائعة</a>
        </div>
      </div>
    </div>
  );
}
