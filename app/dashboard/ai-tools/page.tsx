"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

const tools = [
  {
    id: "description",
    icon: "✍️",
    name: "كاتب المنتجات",
    desc: "أنشئ وصفاً جذاباً لأي منتج في ثوانٍ",
    color: "border-blue-500/20 bg-blue-500/5",
    accentColor: "text-blue-400",
  },
  {
    id: "whatsapp",
    icon: "💬",
    name: "رسائل واتساب المثالية",
    desc: "رسائل متابعة تحول العملاء المترددين",
    color: "border-[#25D366]/20 bg-[#25D366]/5",
    accentColor: "text-[#25D366]",
  },
  {
    id: "social",
    icon: "📸",
    name: "بوستات انستغرام",
    desc: "نصوص جذابة لمنشورات انستغرام وتيك توك",
    color: "border-pink-500/20 bg-pink-500/5",
    accentColor: "text-pink-400",
  },
  {
    id: "reply",
    icon: "🤝",
    name: "ردود على الاعتراضات",
    desc: "ردود احترافية على أسئلة السعر والمقارنة",
    color: "border-purple-500/20 bg-purple-500/5",
    accentColor: "text-purple-400",
  },
];

const examples = {
  description: {
    placeholder: "اكتب اسم المنتج ومميزاته الأساسية...\nمثال: جبادور جلدي بني، مقاسات 40-46، يدوي الصنع",
    outputs: [
      "جبادور جلدي بني داكن — تحفة في القدمين ✨\n\nمصنوع يدوياً من جلد طبيعي مغربي أصيل، هذا الجبادور يمزج بين الأناقة التراثية والراحة العصرية. تصميم كلاسيكي يناسب جميع المناسبات، بنعل مقوى يدوم سنوات.\n\n✅ جلد طبيعي 100٪\n✅ مقاسات 40 إلى 46\n✅ يدوي الصنع من حرفيين مغاربة\n✅ توصيل سريع لجميع أرجاء المغرب\n\nالسعر: 297 د.م فقط — العرض محدود! 🔥",
    ],
  },
  whatsapp: {
    placeholder: "صف الموقف: عميل سأل عن السعر ثم صمت...",
    outputs: [
      "السلام عليكم {الاسم}! 👋\n\nلاحظت أنك استفسرت عن [المنتج] ولم تكمل الطلب — طبيعي تأخذ وقتك في التفكير 😊\n\nبس باغي نقلك خبر مهم: هذا المنتج عندنا كمية محدودة فقط، وكثير من الزبائن كيطلبوه هذه الأيام.\n\nلو بغيتي نحجزه ليك قبل ما يخلص، قولي فقط 'واه' وأنا نرتب ليك كلشي 🛒\n\nشكراً على ثقتك فينا 🙏",
    ],
  },
  social: {
    placeholder: "اكتب عن المنتج أو العرض الذي تريد الترويج له...",
    outputs: [
      "🔥 وصل الجديد!\n\nجبادور جلدي بني داكن — الكلاسيكي اللي ما يخيبش 👞\n\nمصنوع يدوياً من جلد طبيعي مغربي 💎\nمتوفر بمقاسات 40-46\nالسعر: 297 درهم فقط\n\n📲 اكتب 'أريده' في التعليقات أو راسلنا مباشرة!\n\n#جبادور #أحذية_مغربية #صنع_مغربي #موضة #أحذية_جلدية",
    ],
  },
  reply: {
    placeholder: "اكتب اعتراض العميل...\nمثال: 'غالي بزاف، عند جارك بـ200 درهم!'",
    outputs: [
      "أفهمك تماماً، والسعر سؤال مشروع جداً 😊\n\nالفرق مع الرخيص اللي تقول عليه:\n\n✅ جلدنا طبيعي 100٪ — مو صناعي\n✅ مصنوع يدوياً من حرفيين ذوي خبرة 20+ سنة\n✅ يدوم 3-5 سنوات — يعني في السنة الواحدة يكلفك 60 درهم فقط!\n✅ ضمان شهرين على الصنعة\n\nاشتريت الرخيص مرتين = نفس السعر + إزعاج 😅\n\nبغيتي نحجزه ليك؟",
    ],
  },
};

export default function AiToolsPage() {
  const [activeTool, setActiveTool] = useState(tools[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    await new Promise(r => setTimeout(r, 1800));
    const ex = examples[activeTool.id as keyof typeof examples];
    setOutput(ex.outputs[0]);
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <TopBar title="أدوات الذكاء الاصطناعي" subtitle="اكتب بسرعة، بِع أكثر" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl">
        {/* Tool selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map((tool, i) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => { setActiveTool(tool); setInput(""); setOutput(""); }}
              className={`glass rounded-2xl border p-4 text-right transition-all hover:scale-105 ${
                activeTool.id === tool.id ? tool.color + " " + tool.accentColor.replace("text-", "border-").replace("400", "400/50") : "border-border"
              }`}
            >
              <div className="text-2xl mb-2">{tool.icon}</div>
              <p className={`font-black text-sm ${activeTool.id === tool.id ? tool.accentColor : "text-foreground"}`}>
                {tool.name}
              </p>
              <p className="text-muted text-xs mt-1 leading-tight">{tool.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Active tool */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-3xl border border-border overflow-hidden"
          >
            {/* Tool header */}
            <div className={`p-5 border-b border-border flex items-center gap-3 ${activeTool.color}`}>
              <span className="text-3xl">{activeTool.icon}</span>
              <div>
                <h3 className={`font-black text-lg ${activeTool.accentColor}`}>{activeTool.name}</h3>
                <p className="text-muted text-sm">{activeTool.desc}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Input */}
              <div>
                <label className="text-foreground text-sm font-semibold mb-2 block">المدخلات</label>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={4}
                  placeholder={examples[activeTool.id as keyof typeof examples].placeholder}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 text-sm focus:outline-none focus:border-gold/40 resize-none"
                />
              </div>

              <button
                onClick={generate}
                disabled={loading || !input.trim()}
                className="w-full bg-gold-gradient text-background font-black py-4 rounded-2xl text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-gold transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    يكتب الذكاء الاصطناعي...
                  </>
                ) : (
                  <>⚡ أنشئ الآن</>
                )}
              </button>

              {/* Output */}
              <AnimatePresence>
                {output && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-foreground text-sm font-semibold">النتيجة</label>
                      <button
                        onClick={copy}
                        className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                          copied ? "bg-green-500/20 text-green-400" : "bg-gold/10 text-gold hover:bg-gold/20"
                        }`}
                      >
                        {copied ? "✓ تم النسخ" : "📋 نسخ"}
                      </button>
                    </div>
                    <div className="bg-surface-2 border border-gold/15 rounded-2xl p-5">
                      <pre className="text-foreground text-sm leading-relaxed whitespace-pre-wrap font-cairo">{output}</pre>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={generate}
                        className="flex-1 glass border border-border text-muted text-sm font-semibold py-2.5 rounded-xl hover:text-foreground transition-colors"
                      >
                        🔄 نسخة أخرى
                      </button>
                      <button className="flex-1 glass border border-[#25D366]/30 text-[#25D366] text-sm font-semibold py-2.5 rounded-xl hover:bg-[#25D366]/10 transition-colors">
                        📤 أرسل على واتساب
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Usage stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground font-bold text-sm">الاستخدام هذا الشهر</h3>
            <span className="text-muted text-xs">47 / 200 نص</span>
          </div>
          <div className="h-2 bg-surface-2 rounded-full overflow-hidden mb-2">
            <div className="h-full w-[23%] bg-gold-gradient-h rounded-full" />
          </div>
          <p className="text-muted text-xs">153 نص متبقٍ — <a href="/pricing" className="text-gold hover:underline">ترقية للاحترافي</a> للحصول على نصوص غير محدودة</p>
        </motion.div>
      </main>
    </>
  );
}
