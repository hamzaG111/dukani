"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    storeName: "متجر الأطلس",
    description: "أحذية جلدية فاخرة بأسعار مناسبة — التوصيل متاح لجميع المدن",
    phone: "0661234567",
    hours: "من الإثنين إلى السبت: ٩ص - ٩م",
    address: "شارع محمد الخامس، الدار البيضاء",
    instagram: "@atlas.store",
    welcomeMsg: "مرحباً! 👋 أنا مساعد متجر الأطلس الذكي. كيف أخدمك اليوم؟",
    language: "darija",
    notifications: true,
  });

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <TopBar title="الإعدادات" subtitle="إعدادات المتجر والمساعد الذكي" />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl space-y-6">

          {/* Store info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl border border-border p-6"
          >
            <h3 className="text-foreground font-black text-lg mb-5 flex items-center gap-2">
              <span>🏪</span> معلومات المتجر
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">اسم المتجر</label>
                <input
                  value={form.storeName}
                  onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                  className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">وصف المتجر</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">رقم الهاتف</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    dir="ltr"
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">انستغرام</label>
                  <input
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    dir="ltr"
                    className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">ساعات العمل</label>
                <input
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: e.target.value })}
                  className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">العنوان</label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Assistant settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl border border-border p-6"
          >
            <h3 className="text-foreground font-black text-lg mb-5 flex items-center gap-2">
              <span>🤖</span> إعدادات المساعد الذكي
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">رسالة الترحيب</label>
                <textarea
                  value={form.welcomeMsg}
                  onChange={(e) => setForm({ ...form, welcomeMsg: e.target.value })}
                  rows={2}
                  className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm resize-none"
                />
                <p className="text-muted text-xs mt-1">هذه أول رسالة يراها عميلك عند فتح الشات</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">لغة المساعد الافتراضية</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/60 transition-all text-sm"
                >
                  <option value="darija">الدارجة المغربية</option>
                  <option value="arabic">العربية الفصحى</option>
                  <option value="french">Français</option>
                  <option value="auto">تلقائي (حسب لغة العميل)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl border border-border p-6"
          >
            <h3 className="text-foreground font-black text-lg mb-5 flex items-center gap-2">
              <span>🔔</span> الإشعارات
            </h3>
            <div className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-border">
              <div>
                <p className="text-foreground text-sm font-semibold">إشعارات واتساب</p>
                <p className="text-muted text-xs mt-0.5">اعلمني عند وصول طلب جديد</p>
              </div>
              <button
                onClick={() => setForm({ ...form, notifications: !form.notifications })}
                className={`relative w-12 h-6 rounded-full transition-colors ${form.notifications ? "bg-gold" : "bg-surface-2 border border-border"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.notifications ? "right-1" : "left-1"}`} />
              </button>
            </div>
          </motion.div>

          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl border border-red-500/15 p-6"
          >
            <h3 className="text-red-400 font-black text-lg mb-4">منطقة الخطر</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground text-sm font-semibold">حذف الحساب</p>
                <p className="text-muted text-xs">هذا الإجراء لا يمكن التراجع عنه</p>
              </div>
              <button className="px-4 py-2 text-sm font-semibold text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-colors">
                حذف الحساب
              </button>
            </div>
          </motion.div>

          {/* Save */}
          <div className="flex gap-3 pb-6">
            <Button variant="secondary" size="md" className="flex-1">إلغاء</Button>
            <Button variant="primary" size="md" onClick={save} className="flex-1">
              {saved ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  تم الحفظ!
                </>
              ) : "حفظ التغييرات"}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
