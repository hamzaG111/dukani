"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import QRCode from "qrcode";

const ACCENT_COLORS = [
  { hex: "#C9A84C", name: "الذهبي" },
  { hex: "#6366f1", name: "بنفسجي" },
  { hex: "#ec4899", name: "وردي" },
  { hex: "#10b981", name: "أخضر" },
  { hex: "#f97316", name: "برتقالي" },
  { hex: "#3b82f6", name: "أزرق" },
];

const STATS = [
  { label: "زيارات الرابط", value: "386", icon: "👀", trend: "+12٪" },
  { label: "بدأوا محادثة", value: "142", icon: "💬", trend: "+8٪" },
  { label: "نسبة التحويل", value: "36.8٪", icon: "🎯", trend: "+3٪" },
  { label: "متوسط وقت الرد", value: "< 3 ث", icon: "⚡", trend: null },
];

const SHARING_TIPS = [
  { icon: "🖨️", title: "اطبع على البطاقات التجارية", desc: "ضع QR Code على كل بطاقة أعمال" },
  { icon: "📦", title: "على العبوات والفواتير", desc: "عملاؤك يمكنهم إعادة الطلب بسهولة" },
  { icon: "🪟", title: "على واجهة المتجر", desc: "أو طابعة كبيرة في الداخل" },
  { icon: "📱", title: "في قصة انستغرام", desc: "النتائج في القصص أعلى من المنشورات" },
];

export default function ChatLinkPage() {
  const { user } = useAuth();
  const storeSlug = user?.storeName
    ? user.storeName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "my-store"
    : "my-store";
  const storeLink = `https://dukani.ma/chat/${storeSlug}`;

  const [copied, setCopied] = useState(false);
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0].hex);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrStyle, setQrStyle] = useState<"dots" | "squares">("dots");
  const [saved, setSaved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = useCallback(async () => {
    try {
      const url = await QRCode.toDataURL(storeLink, {
        width: 280,
        margin: 2,
        color: {
          dark: "#0A0A0A",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR generation error:", err);
    }
  }, [storeLink]);

  useEffect(() => {
    generateQR();
  }, [generateQR, qrStyle]);

  const copy = () => {
    navigator.clipboard.writeText(storeLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `dukani-qr-${storeSlug}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <TopBar title="رابط الشات" subtitle="شارك رابطك واحصل على عملاء جدد" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl border border-border p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{s.icon}</span>
                {s.trend && (
                  <span className="text-green-400 text-[10px] font-bold bg-green-400/10 px-1.5 py-0.5 rounded-full">
                    {s.trend}
                  </span>
                )}
              </div>
              <p className="text-gold font-black text-xl">{s.value}</p>
              <p className="text-muted text-xs mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Link + QR card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl border border-border p-6 space-y-5"
          >
            <h3 className="text-foreground font-black text-lg">رابط متجرك الذكي</h3>

            {/* Link copy */}
            <div className="flex gap-2">
              <div
                className="flex-1 bg-surface border border-border rounded-2xl px-4 py-3 text-muted text-sm overflow-hidden text-ellipsis whitespace-nowrap font-mono"
                dir="ltr"
              >
                {storeLink}
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={copy}
                className={`px-4 py-3 rounded-2xl font-semibold text-sm transition-all flex-shrink-0 ${
                  copied
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gold text-background hover:shadow-gold"
                }`}
              >
                {copied ? "✓ تم" : "نسخ"}
              </motion.button>
            </div>

            {/* Share buttons */}
            <div>
              <h4 className="text-foreground font-bold text-sm mb-3">مشاركة مباشرة</h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("تحدث مع مساعد متجري الذكي: " + storeLink)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl text-[#25D366] hover:bg-[#25D366]/20 transition-all text-sm font-semibold"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.545-1.374A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                  واتساب
                </a>
                <button
                  onClick={() => navigator.share?.({ title: user?.storeName ?? "متجري", url: storeLink })}
                  className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400 hover:bg-purple-500/20 transition-all text-sm font-semibold"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  مشاركة
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-foreground font-bold text-sm">QR Code</h4>
                <div className="flex gap-1 bg-surface rounded-xl p-1 border border-border">
                  {(["dots", "squares"] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setQrStyle(s)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        qrStyle === s ? "bg-gold text-background" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {s === "dots" ? "⬤ نقاط" : "■ مربعات"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-lg flex-shrink-0">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="w-24 h-24"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div className="space-y-2.5">
                  <p className="text-muted text-xs leading-relaxed">
                    اطبعه وضعه في متجرك — عملاؤك يمسحونه ويتحدثون معك فوراً
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadQR}
                    disabled={!qrDataUrl}
                    className="flex items-center gap-2 text-gold text-sm font-semibold hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    تحميل PNG
                  </motion.button>
                  <p className="text-muted/50 text-[10px]">280×280px · جاهز للطباعة</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customization + preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-3xl border border-border p-6 space-y-5"
          >
            <h3 className="text-foreground font-black text-lg">تخصيص صفحة الشات</h3>

            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">لون الواجهة</label>
              <div className="flex gap-2">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setAccentColor(c.hex)}
                    title={c.name}
                    className={`w-9 h-9 rounded-full transition-all ${
                      accentColor === c.hex
                        ? "ring-2 ring-offset-2 ring-offset-background ring-white scale-110"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Chat preview */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">معاينة مباشرة</label>
              <div className="bg-[#0A0A0A] rounded-2xl border border-white/8 overflow-hidden">
                {/* Header */}
                <div className="bg-[#141414] border-b border-white/8 px-3 py-2.5 flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-[#0A0A0A] flex-shrink-0"
                    style={{ background: accentColor }}
                  >
                    {(user?.storeName || "م")[0]}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">{user?.storeName || "متجرك"}</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[10px]">مساعد ذكي متصل</span>
                    </div>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-3 space-y-2">
                  <div className="bg-[#1C1C1C] rounded-xl rounded-tl-sm px-3 py-2 text-white text-xs max-w-[75%]">
                    مرحباً! 👋 كيف أساعدك اليوم؟
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="rounded-xl rounded-tr-sm px-3 py-2 text-[#0A0A0A] text-xs max-w-[75%] font-medium"
                      style={{ background: accentColor }}
                    >
                      كم سعر الجبادور؟
                    </div>
                  </div>
                  <div className="bg-[#1C1C1C] rounded-xl rounded-tl-sm px-3 py-2 text-white text-xs max-w-[85%]">
                    الجبادور الجلدي بـ 297 درهم 🎉 — خصم 15٪ على السعر الأصلي 350 درهم
                  </div>
                </div>
                {/* Input */}
                <div className="bg-[#141414] border-t border-white/8 px-3 py-2 flex gap-2 items-center">
                  <div className="flex-1 bg-[#1C1C1C] rounded-xl px-3 py-1.5 text-white/20 text-xs">
                    اكتب رسالتك...
                  </div>
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: accentColor }}
                  >
                    <svg className="w-3 h-3 rotate-180 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleSave}
              >
                {saved ? "✓ تم الحفظ" : "حفظ التغييرات"}
              </Button>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-3xl border border-border p-6"
        >
          <h3 className="text-foreground font-black text-base mb-4">💡 كيف تحصل على أكثر زيارات؟</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHARING_TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-surface-2 rounded-2xl">
                <span className="text-xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <p className="text-foreground text-xs font-bold">{tip.title}</p>
                  <p className="text-muted text-[10px] mt-0.5">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </>
  );
}
