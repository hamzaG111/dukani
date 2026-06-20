"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";

const STORE_LINK = "https://dukani.ma/chat/atlas-store";

export default function ChatLinkPage() {
  const [copied, setCopied] = useState(false);
  const [activeColor, setActiveColor] = useState("#C9A84C");

  const colors = ["#C9A84C", "#6366f1", "#ec4899", "#10b981", "#f97316", "#3b82f6"];

  const copy = () => {
    navigator.clipboard.writeText(STORE_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <TopBar title="رابط الشات" subtitle="شارك رابطك مع عملائك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Link card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl border border-border p-6 space-y-6"
          >
            <div>
              <h3 className="text-foreground font-black text-lg mb-4">رابط متجرك الذكي</h3>
              <div className="flex gap-2">
                <div className="flex-1 bg-surface border border-border rounded-2xl px-4 py-3 text-muted text-sm overflow-hidden text-ellipsis whitespace-nowrap" dir="ltr">
                  {STORE_LINK}
                </div>
                <button
                  onClick={copy}
                  className={`px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
                    copied ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gold text-background hover:shadow-gold"
                  }`}
                >
                  {copied ? "✓ تم النسخ" : "نسخ"}
                </button>
              </div>
            </div>

            {/* Share buttons */}
            <div>
              <h4 className="text-foreground font-bold text-sm mb-3">مشاركة مباشرة</h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("تحدث مع مساعد متجري الذكي: " + STORE_LINK)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl text-[#25D366] hover:bg-[#25D366]/20 transition-all text-sm font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.545-1.374A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                  واتساب
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-pink-500/10 border border-pink-500/20 rounded-2xl text-pink-400 hover:bg-pink-500/20 transition-all text-sm font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  انستغرام
                </a>
              </div>
            </div>

            {/* QR placeholder */}
            <div>
              <h4 className="text-foreground font-bold text-sm mb-3">QR Code</h4>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center p-2 flex-shrink-0">
                  <div className="w-full h-full grid grid-cols-5 gap-0.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-sm"
                        style={{ background: Math.random() > 0.4 ? "#0A0A0A" : "transparent" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted text-sm">اطبعه على بطاقاتك وعلبك وواجهة متجرك</p>
                  <button className="flex items-center gap-2 text-gold text-sm font-semibold hover:underline">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    تحميل QR Code
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl border border-border p-6 space-y-6"
          >
            <h3 className="text-foreground font-black text-lg">تخصيص صفحة الشات</h3>

            {/* Color picker */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">لون الواجهة</label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setActiveColor(color)}
                    className={`w-9 h-9 rounded-full transition-all ${
                      activeColor === color ? "ring-2 ring-offset-2 ring-offset-background ring-white scale-110" : "hover:scale-105"
                    }`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">معاينة</label>
              <div className="bg-[#0A0A0A] rounded-2xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-background" style={{ background: activeColor }}>
                    م
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">متجر الأطلس</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-green-400 text-xs">متصل</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#1C1C1C] rounded-xl rounded-br-sm px-3 py-2 text-white text-xs max-w-[80%]">
                    مرحباً! كيف أساعدك اليوم؟ 😊
                  </div>
                  <div className="flex justify-end">
                    <div className="rounded-xl rounded-bl-sm px-3 py-2 text-background text-xs max-w-[80%]" style={{ background: activeColor }}>
                      كم سعر الجبادور؟
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full">
              حفظ التغييرات
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: "زيارات الرابط", value: "386", icon: "👀" },
            { label: "بدأوا محادثة", value: "142", icon: "💬" },
            { label: "نسبة التحويل", value: "36.8٪", icon: "🎯" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl border border-border p-4 text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-gold font-black text-2xl">{s.value}</p>
              <p className="text-muted text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </>
  );
}
