"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  from: "user" | "bot";
  text?: string;
  products?: Product[];
  time: string;
}

interface Product {
  name: string;
  price: number;
  discount: number;
  icon: string;
  available: boolean;
}

const storeProducts: Product[] = [
  { name: "جبادور جلدي بني داكن", price: 350, discount: 15, icon: "👞", available: true },
  { name: "جبادور بني فاتح", price: 350, discount: 0, icon: "👟", available: true },
  { name: "جبادور أسود كلاسيكي", price: 320, discount: 0, icon: "👞", available: true },
];

const suggestions = [
  "أريد أعرف الأسعار",
  "ما هي المقاسات المتوفرة؟",
  "كيفاش نطلب؟",
  "عندكم توصيل؟",
];

const botReplies: Record<string, Message> = {
  default: {
    id: 0, from: "bot", time: "",
    text: "مرحباً! 👋 أنا مساعد متجر الأطلس الذكي. كيف أخدمك اليوم؟",
  },
};

function getTime() {
  return new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" });
}

function generateBotReply(userMsg: string): Omit<Message, "id"> {
  const msg = userMsg.toLowerCase();

  if (msg.includes("سعر") || msg.includes("ثمن") || msg.includes("أسعار") || msg.includes("prix")) {
    return {
      from: "bot", time: getTime(),
      text: "هذي هي منتجاتنا المتوفرة الآن 👇 كلها جلد أصلي بجودة عالية:",
      products: storeProducts,
    };
  }
  if (msg.includes("مقاس") || msg.includes("تايل") || msg.includes("pointure")) {
    return {
      from: "bot", time: getTime(),
      text: "المقاسات المتوفرة عندنا: 39 | 40 | 41 | 42 | 43 | 44 👞\n\nأي مقاس تبحث عنه؟",
    };
  }
  if (msg.includes("توصيل") || msg.includes("livraison") || msg.includes("delivery")) {
    return {
      from: "bot", time: getTime(),
      text: "نعم! عندنا توصيل لجميع المدن المغربية 🚚\n\n• الدار البيضاء والرباط: ٢٤ ساعة — مجاناً على طلبات فوق ٢٠٠ درهم\n• باقي المدن: ٢٤-٤٨ ساعة — ٢٥ درهم\n\nتحب تطلب؟",
    };
  }
  if (msg.includes("طلب") || msg.includes("شري") || msg.includes("commander") || msg.includes("أريده")) {
    return {
      from: "bot", time: getTime(),
      text: "ممتاز! 🎉 اضغط الزر أسفله وسأحولك مباشرة لواتساب مع التاجر لإتمام الطلب في دقيقة واحدة:",
    };
  }
  if (msg.includes("خصم") || msg.includes("promo") || msg.includes("solde")) {
    return {
      from: "bot", time: getTime(),
      text: "يس! 🔥 عندنا الآن خصم ١٥٪ على الجبادور الجلدي البني الداكن — من ٣٥٠ إلى ٢٩٧ درهم فقط!\n\nالعرض محدود، تحب نحجز لك واحد؟",
    };
  }
  if (msg.includes("مرحبا") || msg.includes("سلام") || msg.includes("ازيك") || msg.includes("كيداير")) {
    return {
      from: "bot", time: getTime(),
      text: "لاباس والحمد لله! 😊 مرحباً بيك في متجر الأطلس. كيف أخدمك؟",
    };
  }

  return {
    from: "bot", time: getTime(),
    text: "شكراً على سؤالك 🙏 للمساعدة الفورية، يمكنك التواصل مع التاجر مباشرة على واتساب، أو جرب أحد الأسئلة أسفله:",
  };
}

function ProductCard({ product, onOrder }: { product: Product; onOrder: () => void }) {
  const finalPrice = product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <div className="bg-[#1C1C1C] rounded-2xl border border-white/8 p-3 flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-2xl flex-shrink-0">
        {product.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-bold leading-snug truncate">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#C9A84C] font-black text-sm">{finalPrice} د.م</span>
          {product.discount > 0 && (
            <span className="text-white/40 text-xs line-through">{product.price}</span>
          )}
          {product.discount > 0 && (
            <span className="text-green-400 text-xs font-bold">-{product.discount}٪</span>
          )}
        </div>
      </div>
      <button
        onClick={onOrder}
        className="text-xs font-bold text-[#0A0A0A] bg-[#C9A84C] px-3 py-1.5 rounded-xl whitespace-nowrap hover:bg-[#E8C97A] transition-colors flex-shrink-0"
      >
        أريده
      </button>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "bot", text: "مرحباً! 👋 أنا مساعد متجر الأطلس الذكي. كيف أخدمك اليوم؟", time: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(text);
      setMessages((prev) => [...prev, { ...reply, id: Date.now() + 1 }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const openWhatsApp = (productName?: string) => {
    const msg = productName
      ? `السلام عليكم! أريد أطلب: ${productName}`
      : "السلام عليكم! أريد أتواصل معكم لإتمام طلبي";
    window.open(`https://wa.me/212661234567?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-[#141414] border-b border-white/8 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <a href="/" className="text-white/40 hover:text-white transition-colors ml-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center font-black text-[#0A0A0A] flex-shrink-0">
          م
        </div>
        <div className="flex-1">
          <h1 className="text-white font-bold text-sm">متجر الأطلس</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">متصل الآن</span>
          </div>
        </div>
        <button
          onClick={() => openWhatsApp()}
          className="w-9 h-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
          title="واتساب"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.545-1.374A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Suggestions (shown at top) */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mt-2 mb-4"
          >
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs text-[#C9A84C] border border-[#C9A84C]/30 bg-[#C9A84C]/8 px-3 py-1.5 rounded-full hover:bg-[#C9A84C]/15 transition-colors"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "bot" && (
                <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A0A0A] font-black text-xs flex-shrink-0 mb-1">
                  د
                </div>
              )}

              <div className={`max-w-[80%] space-y-2 ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col`}>
                {msg.text && (
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "bot"
                        ? "bg-[#1C1C1C] text-white border border-white/6 rounded-br-sm"
                        : "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/25 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                    {msg.from === "bot" && msg.text.includes("واتساب") && !msg.products && (
                      <button
                        onClick={() => openWhatsApp()}
                        className="mt-3 flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-xl w-full justify-center hover:bg-[#20ba5a] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.545-1.374A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                        </svg>
                        إتمام الطلب على واتساب
                      </button>
                    )}
                  </div>
                )}
                {msg.products && (
                  <div className="space-y-2 w-full max-w-xs">
                    {msg.products.map((p, j) => (
                      <ProductCard key={j} product={p} onOrder={() => openWhatsApp(p.name)} />
                    ))}
                  </div>
                )}
                <span className="text-white/25 text-xs px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A0A0A] font-black text-xs flex-shrink-0">
              د
            </div>
            <div className="bg-[#1C1C1C] border border-white/6 px-4 py-3 rounded-2xl rounded-br-sm flex items-center gap-1.5">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </motion.div>
        )}

        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div className="bg-[#141414] border-t border-white/8 px-4 py-3 flex-shrink-0">
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
            className="flex-1 bg-[#1C1C1C] border border-white/8 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/40 transition-all"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.92 }}
            disabled={!input.trim()}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
              input.trim() ? "bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#E8C97A]" : "bg-[#1C1C1C] text-white/20"
            }`}
          >
            <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </motion.button>
        </form>

        <p className="text-center text-white/20 text-xs mt-2">
          مدعوم بـ{" "}
          <a href="/" className="text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">دُكّاني</a>
        </p>
      </div>
    </div>
  );
}
