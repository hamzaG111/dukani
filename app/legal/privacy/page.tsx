import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دُكّاني — سياسة الخصوصية",
  description: "كيف نحمي بياناتك وبيانات زبائنك",
};

const sections = [
  {
    title: "1. المعلومات التي نجمعها",
    content: [
      "معلومات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف.",
      "بيانات المتجر: قائمة المنتجات، الأسعار، ساعات العمل.",
      "بيانات المحادثات: الرسائل المتبادلة مع زبائنك لتحسين الذكاء الاصطناعي.",
      "بيانات الاستخدام: عدد المحادثات، المبيعات، معدلات التحويل.",
    ],
  },
  {
    title: "2. كيف نستخدم معلوماتك",
    content: [
      "تشغيل خدمة المساعد الذكي والرد على زبائنك.",
      "تحسين دقة الذكاء الاصطناعي وفهمه للدارجة المغربية.",
      "إرسال تقارير دورية عن أداء متجرك.",
      "التواصل معك بشأن التحديثات والعروض (مع إمكانية إلغاء الاشتراك).",
    ],
  },
  {
    title: "3. مشاركة البيانات",
    content: [
      "لا نبيع بياناتك أو بيانات زبائنك لأي طرف ثالث.",
      "نشارك البيانات فقط مع مزودي الخدمة الضروريين (مثل خوادم السحابة) وبموجب اتفاقيات صارمة.",
      "قد نفصح عن البيانات إذا طُلب منا قانونياً.",
    ],
  },
  {
    title: "4. أمان البيانات",
    content: [
      "تشفير كامل لجميع البيانات أثناء النقل (SSL/TLS).",
      "تشفير قواعد البيانات أثناء التخزين.",
      "مراجعات أمنية دورية واختبارات اختراق.",
      "الوصول إلى البيانات مقيّد بمبدأ الحاجة الدنيا.",
    ],
  },
  {
    title: "5. حقوقك",
    content: [
      "الوصول إلى جميع بياناتك المحفوظة لدينا.",
      "طلب تصحيح أو حذف بياناتك في أي وقت.",
      "تصدير بياناتك بصيغة قابلة للقراءة (CSV/JSON).",
      "إلغاء اشتراكك وحذف حسابك بالكامل.",
    ],
  },
  {
    title: "6. ملفات تعريف الارتباط (Cookies)",
    content: [
      "نستخدم ملفات تعريف الارتباط الضرورية لتشغيل المنصة.",
      "ملفات التحليل (مجهولة الهوية) لتحسين تجربة الاستخدام.",
      "يمكنك تعطيل ملفات الارتباط غير الضرورية من إعدادات متصفحك.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <span className="text-gold text-xs font-black tracking-widest uppercase border border-gold/30 bg-gold/10 px-3 py-1 rounded-full mb-4 inline-block">قانوني</span>
          <h1 className="text-4xl font-black text-foreground mb-2">سياسة الخصوصية</h1>
          <p className="text-muted">آخر تحديث: 19 يونيو 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <div className="glass-gold rounded-2xl border border-gold/20 p-5 flex gap-4">
          <span className="text-2xl">🔒</span>
          <p className="text-muted leading-relaxed text-sm">
            خصوصيتك وخصوصية زبائنك أولويتنا القصوى. نلتزم بالشفافية الكاملة حول كيفية جمع واستخدام وحماية بياناتك.
            إذا كان لديك أي سؤال، تواصل معنا عبر <a href="mailto:privacy@dukani.ma" className="text-gold hover:underline">privacy@dukani.ma</a>
          </p>
        </div>

        {sections.map((sec, i) => (
          <div key={i} className="glass rounded-2xl border border-border p-6">
            <h2 className="text-foreground font-black text-lg mb-4">{sec.title}</h2>
            <ul className="space-y-2">
              {sec.content.map((item, j) => (
                <li key={j} className="flex gap-3 text-muted text-sm leading-relaxed">
                  <span className="text-gold flex-shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-center py-4">
          <p className="text-muted text-sm">للاستفسارات: <a href="mailto:privacy@dukani.ma" className="text-gold hover:underline">privacy@dukani.ma</a></p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="/legal/terms" className="text-gold text-sm hover:underline">شروط الاستخدام</a>
            <a href="/contact" className="text-gold text-sm hover:underline">تواصل معنا</a>
          </div>
        </div>
      </div>
    </div>
  );
}
