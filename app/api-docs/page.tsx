"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const endpoints = [
  {
    method: "POST",
    path: "/api/chat",
    title: "إرسال رسالة للمساعد الذكي",
    desc: "أرسل رسالة وبيانات المتجر للحصول على رد ذكي بالدارجة/العربية/الفرنسية",
    body: `{
  "message": "شحال تمن الجاكيت؟",
  "storeId": "store_abc123",
  "customerId": "cust_xyz",
  "language": "darija"
}`,
    response: `{
  "reply": "الجاكيت بـ390 درهم دابا 🔥 وعندنا توصيل مجاني!",
  "confidence": 0.97,
  "intent": "price_inquiry",
  "suggestedFollowUp": "هل تريد معرفة المقاسات المتاحة؟"
}`,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    method: "GET",
    path: "/api/products",
    title: "جلب قائمة المنتجات",
    desc: "استرجع جميع منتجات متجرك مع الأسعار والمخزون والوصف",
    body: null,
    response: `{
  "products": [
    {
      "id": "prod_001",
      "name": "جاكيت جلد الأطلس",
      "price": 390,
      "stock": 12,
      "category": "ملابس",
      "images": ["https://..."]
    }
  ],
  "total": 6,
  "page": 1
}`,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    method: "POST",
    path: "/api/products",
    title: "إضافة منتج جديد",
    desc: "أضف منتجاً جديداً لمتجرك مع وصف سيتم تحسينه تلقائياً بالذكاء الاصطناعي",
    body: `{
  "name": "عطر الورد المغربي",
  "price": 280,
  "stock": 50,
  "category": "عطور",
  "description": "عطر طبيعي"
}`,
    response: `{
  "id": "prod_new123",
  "name": "عطر الورد المغربي",
  "aiDescription": "عطر فاخر مستخلص من أجود ورود الطائف المغربية...",
  "status": "active"
}`,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    method: "GET",
    path: "/api/conversations",
    title: "جلب المحادثات",
    desc: "استرجع تاريخ المحادثات مع تحليلات المشاعر ودرجة الرضا",
    body: null,
    response: `{
  "conversations": [
    {
      "id": "conv_001",
      "customer": "فاطمة",
      "messages": 8,
      "outcome": "sale",
      "value": 390,
      "sentiment": "positive",
      "satisfaction": 4.8
    }
  ]
}`,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    method: "POST",
    path: "/api/campaigns/send",
    title: "إطلاق حملة واتساب",
    desc: "أرسل رسالة مستهدفة لشرائح محددة من زبائنك",
    body: `{
  "segment": "vip",
  "message": "عيد الفطر مبارك! خصم خاص 20٪ لكم ❤️",
  "scheduleAt": "2026-03-31T09:00:00Z"
}`,
    response: `{
  "campaignId": "camp_abc",
  "recipients": 47,
  "status": "scheduled",
  "estimatedDelivery": "2026-03-31T09:01:00Z"
}`,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    method: "GET",
    path: "/api/analytics",
    title: "بيانات التحليلات",
    desc: "احصل على إحصائيات مفصلة للمبيعات والمحادثات والتحويل",
    body: null,
    response: `{
  "period": "last_30_days",
  "conversations": 312,
  "sales": 89,
  "revenue": 34560,
  "conversionRate": 0.285,
  "avgResponseTime": "1.2s",
  "topProducts": ["جاكيت جلد", "عطر ورد"]
}`,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
];

const sdkCode = `// تثبيت الحزمة
npm install @dukani/sdk

// الاستخدام
import { Dukani } from '@dukani/sdk';

const dukani = new Dukani({
  apiKey: 'dk_live_xxxxxxxxxxxx',
  storeId: 'store_abc123',
  language: 'darija', // 'arabic' | 'french' | 'darija'
});

// إرسال رسالة
const reply = await dukani.chat({
  message: 'شحال تمن الجاكيت؟',
  customerId: 'cust_123',
});

console.log(reply.text); // "الجاكيت بـ390 درهم 🔥"`;

export default function ApiDocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeTab, setActiveTab] = useState<"rest" | "sdk">("rest");

  const handleCopyKey = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-xs font-black tracking-widest uppercase border border-gold/30 bg-gold/10 px-3 py-1 rounded-full mb-4 inline-block">
              مركز المطورين
            </span>
            <h1 className="text-4xl font-black text-foreground mb-3">توثيق API دُكّاني</h1>
            <p className="text-muted text-lg max-w-2xl">
              ادمج قدرات دُكّاني في تطبيقك بسهولة. API بسيط، موثوق، وسريع.
            </p>

            {/* API Key */}
            <div className="mt-6 flex items-center gap-3 bg-surface-2 border border-border rounded-2xl px-5 py-3.5 max-w-lg">
              <span className="text-muted text-xs font-bold">مفتاح API:</span>
              <code className="text-gold font-mono text-sm flex-1">dk_test_•••••••••••••••••••</code>
              <button
                onClick={handleCopyKey}
                className="text-xs font-bold text-background bg-gold px-3 py-1 rounded-lg transition-all"
              >
                {copiedKey ? "تم النسخ ✓" : "نسخ"}
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-6">
              <button onClick={() => setActiveTab("rest")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "rest" ? "bg-gold text-background" : "glass border border-border text-muted"}`}>
                REST API
              </button>
              <button onClick={() => setActiveTab("sdk")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "sdk" ? "bg-gold text-background" : "glass border border-border text-muted"}`}>
                JavaScript SDK
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {activeTab === "sdk" ? (
            <motion.div key="sdk" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="glass rounded-2xl border border-border overflow-hidden">
              <div className="bg-surface-2 border-b border-border px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/50" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <span className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-muted text-xs mr-2">dukani-example.js</span>
              </div>
              <pre className="p-6 text-sm text-foreground font-mono leading-relaxed overflow-x-auto">
                <code>{sdkCode}</code>
              </pre>
            </motion.div>
          ) : (
            <motion.div key="rest" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-6">
              {/* Endpoint list */}
              <div className="space-y-2">
                <p className="text-muted text-xs font-bold uppercase tracking-wider mb-3">نقاط النهاية</p>
                {endpoints.map((ep, i) => (
                  <button key={i} onClick={() => setActiveEndpoint(i)}
                    className={`w-full text-right flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeEndpoint === i ? "bg-gold/10 border border-gold/20" : "hover:bg-surface-2"}`}>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${ep.bg} ${ep.color}`}>
                      {ep.method}
                    </span>
                    <span className="text-foreground text-xs font-mono truncate">{ep.path}</span>
                  </button>
                ))}
              </div>

              {/* Endpoint detail */}
              <div className="md:col-span-2 space-y-4">
                <motion.div key={activeEndpoint} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="glass rounded-2xl border border-border p-6 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-black px-2 py-1 rounded border ${endpoints[activeEndpoint].bg} ${endpoints[activeEndpoint].color}`}>
                        {endpoints[activeEndpoint].method}
                      </span>
                      <code className="text-foreground font-mono text-sm">{endpoints[activeEndpoint].path}</code>
                    </div>
                    <h3 className="text-foreground font-black text-lg mb-1">{endpoints[activeEndpoint].title}</h3>
                    <p className="text-muted text-sm">{endpoints[activeEndpoint].desc}</p>
                  </div>

                  {endpoints[activeEndpoint].body && (
                    <div className="glass rounded-2xl border border-border overflow-hidden mb-4">
                      <div className="bg-surface-2 border-b border-border px-4 py-2.5 flex justify-between">
                        <span className="text-muted text-xs font-bold">Request Body</span>
                        <span className="text-gold text-xs">application/json</span>
                      </div>
                      <pre className="p-4 text-xs text-foreground font-mono overflow-x-auto leading-relaxed">
                        <code>{endpoints[activeEndpoint].body}</code>
                      </pre>
                    </div>
                  )}

                  <div className="glass rounded-2xl border border-border overflow-hidden">
                    <div className="bg-surface-2 border-b border-border px-4 py-2.5 flex justify-between">
                      <span className="text-muted text-xs font-bold">Response</span>
                      <span className="text-green-400 text-xs">200 OK</span>
                    </div>
                    <pre className="p-4 text-xs text-foreground font-mono overflow-x-auto leading-relaxed">
                      <code>{endpoints[activeEndpoint].response}</code>
                    </pre>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-10 glass rounded-2xl border border-border p-6">
          <h3 className="text-foreground font-black mb-4">🔐 المصادقة</h3>
          <p className="text-muted text-sm mb-4">أضف مفتاح API في كل طلب كـ Bearer token:</p>
          <div className="bg-surface-2 rounded-xl p-4 font-mono text-sm">
            <span className="text-muted">Authorization: </span>
            <span className="text-gold">Bearer dk_live_xxxxxxxxxxxx</span>
          </div>
        </motion.div>

        {/* Rate limits */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { plan: "مجاني", requests: "100/يوم", icon: "🆓" },
            { plan: "احترافي", requests: "10,000/يوم", icon: "⭐" },
            { plan: "بلاتيني", requests: "غير محدود", icon: "💎" },
          ].map((r, i) => (
            <div key={i} className="glass rounded-xl border border-border p-4 text-center">
              <div className="text-2xl mb-2">{r.icon}</div>
              <p className="text-foreground font-bold text-sm">{r.plan}</p>
              <p className="text-gold font-black">{r.requests}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
