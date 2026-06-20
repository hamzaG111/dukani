"use client";

import { useState, useRef, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
  time: string;
  products?: ProductItem[];
}

interface ProductItem {
  name: string;
  price: number;
  discount: number;
  icon: string;
  available: boolean;
}

const STORE_DEFAULTS = {
  name: "متجر الأطلس",
  description: "أحذية جلدية فاخرة — صنع مغربي أصيل",
  phone: "212661234567",
  avatar: "م",
};

const PRODUCTS_DEFAULT: ProductItem[] = [
  { name: "جبادور جلدي بني داكن", price: 350, discount: 15, icon: "👞", available: true },
  { name: "جبادور بني فاتح", price: 350, discount: 0, icon: "👟", available: true },
  { name: "جبادور أسود كلاسيكي", price: 320, discount: 0, icon: "👞", available: true },
  { name: "صندل جلدي صيفي", price: 180, discount: 10, icon: "🥿", available: true },
];

const QUICK_REPLIES = [
  "أريد أعرف الأسعار 💰",
  "ما هي المقاسات؟ 📏",
  "عندكم توصيل؟ 🚚",
  "أريد أطلب 🛒",
];

function getTime() {
  return new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" });
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.545-1.374A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function ProductCard({ product, onOrder }: { product: ProductItem; onOrder: () => void }) {
  const finalPrice = product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1C1C1C] rounded-2xl border border-white/8 p-3 flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-2xl flex-shrink-0">
        {product.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-bold leading-snug">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#C9A84C] font-black text-sm">{finalPrice} د.م</span>
          {product.discount > 0 && (
            <>
              <span className="text-white/30 text-xs line-through">{product.price}</span>
              <span className="text-green-400 text-[10px] font-bold bg-green-400/10 px-1.5 py-0.5 rounded-full">-{product.discount}%</span>
            </>
          )}
        </div>
      </div>
      {product.available ? (
        <button
          onClick={onOrder}
          className="text-xs font-bold text-[#0A0A0A] bg-[#C9A84C] px-3 py-2 rounded-xl whitespace-nowrap hover:bg-[#E8C97A] transition-colors flex-shrink-0"
        >
          أريده
        </button>
      ) : (
        <span className="text-xs text-white/30 px-2">نفد</span>
      )}
    </motion.div>
  );
}

export default function ChatPage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = use(params);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  const store = STORE_DEFAULTS;
  const products = PRODUCTS_DEFAULT;

  useEffect(() => {
    const greeting: Message = {
      id: 1,
      from: "bot",
      text: `أهلاً بك في ${store.name}! 👋\nأنا مساعدك الذكي — اسألني عن أي منتج أو طلب وسأخدمك فوراً.`,
      time: getTime(),
    };
    setMessages([greeting]);
    conversationRef.current = [
      { role: "assistant", content: greeting.text },
    ];
  }, [store.name]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;
    setInput("");
    setShowQuickReplies(false);

    const userMsg: Message = { id: Date.now(), from: "user", text, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    conversationRef.current = [...conversationRef.current, { role: "user", content: text }];
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversationRef.current,
          storeId,
          storeInfo: { name: store.name, description: store.description, phone: store.phone },
          products: products.map(p => ({ name: p.name, price: p.price, discount: p.discount, available: p.available })),
        }),
      });

      const data = await res.json() as { reply?: string; error?: string };
      const replyText = data.reply ?? "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.";

      conversationRef.current = [...conversationRef.current, { role: "assistant", content: replyText }];

      const showProducts = replyText.toLowerCase().includes("منتج") ||
        text.toLowerCase().includes("سعر") ||
        text.toLowerCase().includes("أسعار") ||
        text.includes("💰");

      const botMsg: Message = {
        id: Date.now() + 1,
        from: "bot",
        text: replyText,
        time: getTime(),
        products: showProducts ? products.filter(p => p.available).slice(0, 3) : undefined,
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: "bot",
        text: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى. 🙏",
        time: getTime(),
      }]);
    } finally {
      setTyping(false);
    }
  };

  const openWhatsApp = (productName?: string) => {
    const msg = productName
      ? `السلام عليكم! أريد أطلب: ${productName}`
      : "السلام عليكم! أريد أتواصل معكم";
    window.open(`https://wa.me/${store.phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#141414]/95 backdrop-blur-sm border-b border-white/8 px-4 py-3 flex items-center gap-3 flex-shrink-0 z-10">
        <a href={`/store/${storeId}`} className="text-white/40 hover:text-white transition-colors ml-1 flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center font-black text-[#0A0A0A] text-lg flex-shrink-0">
          {store.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-bold text-sm truncate">{store.name}</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">مساعد ذكي متصل</span>
          </div>
        </div>
        <button
          onClick={() => openWhatsApp()}
          className="w-9 h-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/25 transition-colors flex-shrink-0"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Quick replies - shown once at start */}
        <AnimatePresence>
          {showQuickReplies && messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2 justify-center mt-2 mb-4"
            >
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q.replace(/ [^\s]+$/, ""))}
                  className="text-xs text-[#C9A84C] border border-[#C9A84C]/30 bg-[#C9A84C]/8 px-3 py-1.5 rounded-full hover:bg-[#C9A84C]/18 active:scale-95 transition-all"
                >
                  {q}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "bot" && (
                <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A0A0A] font-black text-xs flex-shrink-0 mb-1">
                  د
                </div>
              )}

              <div className={`max-w-[82%] space-y-2 flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === "bot"
                      ? "bg-[#1C1C1C] text-white border border-white/6 rounded-tl-sm"
                      : "bg-[#C9A84C]/18 text-[#E8C97A] border border-[#C9A84C]/25 rounded-tr-sm"
                  }`}
                >
                  {msg.text}
                  {msg.from === "bot" && (
                    msg.text.includes("واتساب") || msg.text.includes("طلب") || msg.text.includes("تواصل")
                  ) && (
                    <button
                      onClick={() => openWhatsApp()}
                      className="mt-3 flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2.5 rounded-xl w-full justify-center hover:bg-[#20ba5a] active:scale-95 transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      إتمام الطلب على واتساب
                    </button>
                  )}
                </div>

                {msg.products && msg.products.length > 0 && (
                  <div className="space-y-2 w-full max-w-xs">
                    {msg.products.map((p, j) => (
                      <ProductCard key={j} product={p} onOrder={() => openWhatsApp(p.name)} />
                    ))}
                  </div>
                )}

                <span className="text-white/20 text-[10px] px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-end gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A0A0A] font-black text-xs flex-shrink-0">
                د
              </div>
              <div className="bg-[#1C1C1C] border border-white/6 px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 h-1.5 rounded-full bg-white/40 block"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div className="bg-[#141414]/95 backdrop-blur-sm border-t border-white/8 px-4 py-3 flex-shrink-0">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك..."
            disabled={typing}
            className="flex-1 bg-[#1C1C1C] border border-white/8 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/40 transition-all disabled:opacity-50"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            disabled={!input.trim() || typing}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
              input.trim() && !typing ? "bg-[#C9A84C] text-[#0A0A0A] shadow-lg shadow-[#C9A84C]/20" : "bg-[#1C1C1C] text-white/20"
            }`}
          >
            <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </motion.button>
        </form>

        <p className="text-center text-white/15 text-[10px] mt-2">
          مدعوم بالذكاء الاصطناعي من{" "}
          <a href="/" className="text-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors">دُكّاني</a>
        </p>
      </div>
    </div>
  );
}
