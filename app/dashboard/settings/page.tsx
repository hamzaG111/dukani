"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

type Tab = "store" | "whatsapp" | "ai" | "account" | "notifications";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "store",         label: "معلومات المتجر",    icon: "🏪" },
  { id: "whatsapp",      label: "واتساب",             icon: "📱" },
  { id: "ai",            label: "المساعد الذكي",      icon: "🧠" },
  { id: "notifications", label: "الإشعارات",          icon: "🔔" },
  { id: "account",       label: "الحساب",             icon: "👤" },
];

function InputField({ label, value, onChange, type = "text", placeholder = "", dir = "rtl", hint = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; dir?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} dir={dir}
        className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm"
      />
      {hint && <p className="text-muted text-xs mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ label, sub, value, onChange }: { label: string; sub?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <p className="text-foreground text-sm font-semibold">{label}</p>
        {sub && <p className="text-muted text-xs mt-0.5">{sub}</p>}
      </div>
      <button onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${value ? "bg-gold" : "bg-surface-2 border border-border"}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? "right-1" : "left-1"}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("store");
  const [saved, setSaved] = useState(false);

  // Store info
  const [storeName, setStoreName] = useState(user?.storeName || "متجر الأطلس");
  const [storeDesc, setStoreDesc] = useState("متجر متعدد المنتجات — ملابس، إلكترونيات، وأكثر");
  const [storePhone, setStorePhone] = useState("+212 6 12 34 56 78");
  const [storeCity, setStoreCity] = useState("الدار البيضاء");
  const [storeAddress, setStoreAddress] = useState("");

  // WhatsApp
  const [waNumber, setWaNumber] = useState("");
  const [waPhoneId, setWaPhoneId] = useState("");
  const [waToken, setWaToken] = useState("");
  const [waProvider, setWaProvider] = useState<"meta" | "twilio">("meta");
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [waConnected, setWaConnected] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  // AI
  const [aiTone, setAiTone] = useState<"friendly" | "professional" | "fun">("friendly");
  const [aiLang, setAiLang] = useState<"darija" | "arabic" | "auto">("auto");
  const [aiGreeting, setAiGreeting] = useState("أهلاً! كيف نقدر نخدمك؟ 😊");
  const [aiSignature, setAiSignature] = useState("");

  // Notifications
  const [notifNewOrder, setNotifNewOrder] = useState(true);
  const [notifNewMsg, setNotifNewMsg] = useState(true);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(true);
  const [notifAchievements, setNotifAchievements] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const testWhatsApp = async () => {
    setTestLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setWaConnected(true);
    setTestLoading(false);
  };

  const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_APP_URL || "https://dukani.ma"}/api/whatsapp`;
  const VERIFY_TOKEN = "dukani-webhook-verify-2024";

  return (
    <>
      <TopBar title="الإعدادات" subtitle="إدارة متجرك وتفضيلاتك" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gold/15 text-gold border border-gold/30"
                    : "text-muted hover:text-foreground hover:bg-surface-2"
                }`}>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── Store Info ──────────────────────────────────────────────── */}
          {activeTab === "store" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="glass rounded-3xl border border-border p-6 space-y-4">
                <h3 className="text-foreground font-black">معلومات المتجر</h3>
                <InputField label="اسم المتجر" value={storeName} onChange={setStoreName} placeholder="متجر الأطلس" />
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">وصف المتجر</label>
                  <textarea value={storeDesc} onChange={e => setStoreDesc(e.target.value)} rows={3}
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all resize-none" />
                  <p className="text-muted text-xs mt-1">يُستخدم بواسطة الذكاء الاصطناعي ليعرّف متجرك للعملاء</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="رقم الهاتف" value={storePhone} onChange={setStorePhone} type="tel" dir="ltr" placeholder="+212 6 xx xx xx xx" />
                  <InputField label="المدينة" value={storeCity} onChange={setStoreCity} placeholder="الدار البيضاء" />
                </div>
                <InputField label="العنوان (اختياري)" value={storeAddress} onChange={setStoreAddress} placeholder="شارع محمد الخامس، الحي الصناعي" />
              </div>

              <div className="glass rounded-3xl border border-border p-6">
                <h3 className="text-foreground font-black mb-4">اللغة</h3>
                <LanguageSwitcher variant="dashboard" />
              </div>
            </motion.div>
          )}

          {/* ── WhatsApp ─────────────────────────────────────────────────── */}
          {activeTab === "whatsapp" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

              {/* Connection status */}
              <div className={`rounded-3xl border p-4 flex items-center gap-3 ${waConnected ? "border-green-500/30 bg-green-500/5" : "border-border glass"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${waConnected ? "bg-green-500/15" : "bg-surface-2"}`}>
                  {waConnected ? "✅" : "📱"}
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">{waConnected ? "واتساب متصل!" : "ربط واتساب"}</p>
                  <p className="text-muted text-xs">{waConnected ? `${waNumber || "+212 6xx"} — نشط` : "اربط رقمك لتبدأ الرد التلقائي على العملاء"}</p>
                </div>
                {waConnected && (
                  <button onClick={() => setWaConnected(false)} className="mr-auto text-red-400 text-xs hover:underline">
                    فصل
                  </button>
                )}
              </div>

              {/* Provider selector */}
              <div className="glass rounded-3xl border border-border p-6 space-y-5">
                <h3 className="text-foreground font-black">مزود الخدمة</h3>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { id: "meta" as const,   label: "Meta WhatsApp API",    badge: "رسمي",    icon: "🏢", desc: "الأكثر استقراراً، مجاني للبدء" },
                    { id: "twilio" as const, label: "Twilio",               badge: "سهل",     icon: "🔧", desc: "أسرع إعداداً، sandbox مجاني" },
                  ]).map(p => (
                    <button key={p.id} onClick={() => setWaProvider(p.id)}
                      className={`p-4 rounded-2xl border text-right transition-all ${waProvider === p.id ? "border-gold/50 bg-gold/10" : "border-border hover:border-gold/20"}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{p.icon}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${waProvider === p.id ? "bg-gold/30 text-gold" : "bg-surface-2 text-muted"}`}>{p.badge}</span>
                      </div>
                      <p className="text-foreground text-xs font-bold">{p.label}</p>
                      <p className="text-muted text-[10px] mt-0.5">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meta API fields */}
              {waProvider === "meta" && (
                <div className="glass rounded-3xl border border-border p-6 space-y-4">
                  <h3 className="text-foreground font-black">إعدادات Meta</h3>
                  <div className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-2xl text-xs text-muted space-y-1">
                    <p className="font-semibold text-blue-400">الخطوات:</p>
                    <p>1. افتح <span className="text-gold">developers.facebook.com</span> وأنشئ تطبيقاً</p>
                    <p>2. أضف منتج <span className="text-gold">WhatsApp Business</span></p>
                    <p>3. انسخ الـ Phone Number ID والـ Access Token</p>
                    <p>4. في قسم Webhooks، ضع هذا الرابط:</p>
                    <div className="bg-black/30 rounded-xl p-2 mt-1 font-mono text-green-400 break-all text-[10px]">
                      {WEBHOOK_URL}
                    </div>
                    <p>Verify Token: <span className="text-gold font-mono">{VERIFY_TOKEN}</span></p>
                  </div>
                  <InputField label="رقم الهاتف (WhatsApp)" value={waNumber} onChange={setWaNumber} type="tel" dir="ltr" placeholder="+212 6 xx xx xx xx" />
                  <InputField label="Phone Number ID" value={waPhoneId} onChange={setWaPhoneId} dir="ltr" placeholder="1234567890123456" />
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Access Token</label>
                    <textarea value={waToken} onChange={e => setWaToken(e.target.value)} rows={2} dir="ltr"
                      placeholder="EAAxxxxxxxxxx..."
                      className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-xs font-mono placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all resize-none" />
                  </div>
                </div>
              )}

              {/* Twilio fields */}
              {waProvider === "twilio" && (
                <div className="glass rounded-3xl border border-border p-6 space-y-4">
                  <h3 className="text-foreground font-black">إعدادات Twilio</h3>
                  <div className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-2xl text-xs text-muted space-y-1">
                    <p className="font-semibold text-blue-400">الخطوات:</p>
                    <p>1. افتح <span className="text-gold">twilio.com/console</span></p>
                    <p>2. انسخ Account SID و Auth Token</p>
                    <p>3. في Messaging → Sandbox for WhatsApp، ضع هذا Webhook:</p>
                    <div className="bg-black/30 rounded-xl p-2 mt-1 font-mono text-green-400 break-all text-[10px]">
                      {WEBHOOK_URL}
                    </div>
                  </div>
                  <InputField label="Account SID" value={twilioSid} onChange={setTwilioSid} dir="ltr" placeholder="ACxxxxxxxxxxxxxxxx" />
                  <InputField label="Auth Token" value={twilioToken} onChange={setTwilioToken} dir="ltr" placeholder="your-auth-token" />
                  <InputField label="رقم Sandbox (+14155238886)" value={waNumber} onChange={setWaNumber} dir="ltr" placeholder="+14155238886" />
                </div>
              )}

              <button onClick={testWhatsApp} disabled={testLoading}
                className="w-full py-3.5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-sm hover:bg-green-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {testLoading ? <><span className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />جاري الاختبار...</> : "🧪 اختبر الاتصال"}
              </button>
            </motion.div>
          )}

          {/* ── AI Settings ──────────────────────────────────────────────── */}
          {activeTab === "ai" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="glass rounded-3xl border border-border p-6 space-y-5">
                <h3 className="text-foreground font-black">شخصية المساعد</h3>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">نبرة الصوت</label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { id: "friendly" as const,      label: "ودود",          icon: "😊" },
                      { id: "professional" as const,  label: "احترافي",       icon: "💼" },
                      { id: "fun" as const,           label: "مرح",           icon: "🎉" },
                    ]).map(t => (
                      <button key={t.id} onClick={() => setAiTone(t.id)}
                        className={`p-3 rounded-2xl border text-center transition-all ${aiTone === t.id ? "border-gold/50 bg-gold/15 text-gold" : "border-border text-muted hover:border-gold/20"}`}>
                        <div className="text-2xl mb-1">{t.icon}</div>
                        <p className="text-xs font-semibold">{t.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">لغة الرد</label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { id: "auto" as const,    label: "تلقائي",       sub: "حسب العميل" },
                      { id: "darija" as const,  label: "دارجة",        sub: "مغربي دائماً" },
                      { id: "arabic" as const,  label: "عربي فصيح",   sub: "رسمي" },
                    ]).map(l => (
                      <button key={l.id} onClick={() => setAiLang(l.id)}
                        className={`p-3 rounded-2xl border text-center transition-all ${aiLang === l.id ? "border-gold/50 bg-gold/15 text-gold" : "border-border text-muted hover:border-gold/20"}`}>
                        <p className="text-xs font-bold">{l.label}</p>
                        <p className="text-[10px] mt-0.5 opacity-70">{l.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">رسالة الترحيب</label>
                  <textarea value={aiGreeting} onChange={e => setAiGreeting(e.target.value)} rows={2}
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">توقيع اختياري</label>
                  <input value={aiSignature} onChange={e => setAiSignature(e.target.value)}
                    placeholder="— متجر الأطلس | 06 xx xx xx xx"
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all" />
                </div>
              </div>

              {/* Test preview */}
              <div className="glass rounded-3xl border border-border p-6">
                <h3 className="text-foreground font-black mb-4">معاينة الرد</h3>
                <div className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-foreground max-w-[80%]">
                      كم سعر الجبادور؟
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="glass border border-border rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-foreground max-w-[80%]">
                      {aiGreeting}
                      <br />الجبادور الجلدي عندنا ب 350 درهم 👞 كاين فأحجام متعددة. واش بغيتي تشوف أكثر؟
                      {aiSignature && <><br /><span className="text-muted text-xs">{aiSignature}</span></>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Notifications ────────────────────────────────────────────── */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="glass rounded-3xl border border-border p-6">
                <h3 className="text-foreground font-black mb-4">إشعارات التطبيق</h3>
                <Toggle label="طلبية جديدة"         sub="عندما يصل طلب جديد"                    value={notifNewOrder}       onChange={setNotifNewOrder} />
                <Toggle label="رسالة جديدة"          sub="عندما يبدأ عميل محادثة"                value={notifNewMsg}         onChange={setNotifNewMsg} />
                <Toggle label="تنبيه مخزون منخفض"   sub="عندما يقل المخزون عن الحد المحدد"       value={notifLowStock}       onChange={setNotifLowStock} />
                <Toggle label="تقرير أسبوعي"         sub="ملخص أداء متجرك كل أحد"                value={notifWeekly}         onChange={setNotifWeekly} />
                <Toggle label="إنجازات وتحديات"      sub="عندما تكسب XP أو تفتح إنجازاً جديداً"  value={notifAchievements}   onChange={setNotifAchievements} />
              </div>
            </motion.div>
          )}

          {/* ── Account ──────────────────────────────────────────────────── */}
          {activeTab === "account" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="glass rounded-3xl border border-border p-6 space-y-4">
                <h3 className="text-foreground font-black">معلومات الحساب</h3>
                <div className="p-4 bg-surface-2 rounded-2xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center text-background font-black text-xl">
                    {(user?.storeName || "م")[0]}
                  </div>
                  <div>
                    <p className="text-foreground font-bold">{user?.storeName || "متجرك"}</p>
                    <p className="text-muted text-sm">{user?.email}</p>
                    <span className="text-[10px] bg-gold/15 text-gold px-2 py-0.5 rounded-full font-bold">
                      {user?.plan === "free" ? "مجاني" : user?.plan === "pro" ? "احترافي" : "مؤسسة"}
                    </span>
                  </div>
                </div>
                <InputField label="كلمة مرور جديدة" value="" onChange={() => {}} type="password" dir="ltr" placeholder="اتركه فارغاً إن لم تريد التغيير" />
              </div>

              <div className="glass rounded-3xl border border-red-500/20 p-6 space-y-3">
                <h3 className="text-red-400 font-black">منطقة الخطر</h3>
                <p className="text-muted text-sm">هذه الإجراءات لا يمكن التراجع عنها.</p>
                <div className="flex flex-col gap-2">
                  <button onClick={logout}
                    className="py-2.5 px-4 rounded-xl border border-border text-muted hover:text-foreground hover:border-gold/30 text-sm font-semibold transition-all text-right">
                    تسجيل الخروج
                  </button>
                  <button className="py-2.5 px-4 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/5 text-sm font-semibold transition-all text-right">
                    حذف الحساب نهائياً
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save button */}
          {activeTab !== "account" && (
            <button onClick={handleSave}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
                saved
                  ? "bg-green-500/15 border border-green-500/30 text-green-400"
                  : "bg-gold-gradient text-background hover:shadow-gold"
              }`}>
              {saved ? "✓ تم الحفظ!" : "حفظ التغييرات"}
            </button>
          )}
        </div>
      </main>
    </>
  );
}
