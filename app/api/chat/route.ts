import { NextRequest, NextResponse } from "next/server";

// Dukani AI chat endpoint — connects to Anthropic Claude
// Replace ANTHROPIC_API_KEY in .env.local to activate real AI responses

const SYSTEM_PROMPT = `أنت مساعد تجاري ذكي لمتجر عربي اسمه "{storeName}".
مهمتك: مساعدة العملاء، الإجابة على أسئلتهم، اقتراح المنتجات المناسبة، وإقناعهم بالشراء بأدب واحترافية.

قواعد مهمة:
- رد دائماً بنفس لغة العميل (دارجة / عربية / فرنسية)
- كن ودوداً، إيجابياً، ومختصراً
- اقترح منتجات عند الملاءمة
- عند الطلب الجدي، وجّه للتواصل عبر واتساب
- لا تذكر أبداً أنك نموذج AI — أنت مساعد المتجر فقط
- استخدم الإيموجي باعتدال لإضفاء دفء بشري

معلومات المتجر:
{storeInfo}

المنتجات المتاحة:
{products}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, storeId, storeInfo, products } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
      storeId: string;
      storeInfo?: { name: string; description: string; phone: string };
      products?: { name: string; price: number; discount: number; available: boolean }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "رسائل غير صالحة" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Without API key, return a smart rule-based response
    if (!apiKey) {
      const lastMsg = messages[messages.length - 1]?.content ?? "";
      const reply = generateFallbackReply(lastMsg, storeInfo, products);
      return NextResponse.json({ reply, model: "fallback" });
    }

    // Real Claude API call
    const systemPrompt = SYSTEM_PROMPT
      .replace("{storeName}", storeInfo?.name ?? "المتجر")
      .replace("{storeInfo}", JSON.stringify(storeInfo ?? {}))
      .replace("{products}", JSON.stringify(products ?? []));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ error: "خطأ في خدمة الذكاء الاصطناعي" }, { status: 500 });
    }

    const data = await response.json() as {
      content: { type: string; text: string }[];
      model: string;
    };
    const reply = data.content[0]?.text ?? "عذراً، لم أفهم سؤالك. هل يمكنك إعادة الصياغة؟";

    return NextResponse.json({ reply, model: data.model });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "خطأ داخلي في الخادم" }, { status: 500 });
  }
}

function generateFallbackReply(
  msg: string,
  storeInfo?: { name?: string },
  products?: { name: string; price: number; discount: number }[]
): string {
  const m = msg.toLowerCase();
  const storeName = storeInfo?.name ?? "المتجر";

  if (m.includes("سعر") || m.includes("ثمن") || m.includes("prix") || m.includes("كم")) {
    if (products && products.length > 0) {
      const list = products.slice(0, 3).map((p) => {
        const final = p.discount > 0 ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
        return `• ${p.name}: ${final} درهم${p.discount > 0 ? ` (خصم ${p.discount}٪)` : ""}`;
      }).join("\n");
      return `أسعارنا في ${storeName}:\n\n${list}\n\nهل يعجبك أحد المنتجات؟ 😊`;
    }
    return `أهلاً! تفضل بزيارة قائمة منتجاتنا لمعرفة الأسعار الكاملة. هل تريد أن أساعدك في شيء محدد؟`;
  }

  if (m.includes("توصيل") || m.includes("livraison")) {
    return `نعم! نوصّل لجميع مدن المغرب 🚚\n• الدار البيضاء والرباط: 24 ساعة\n• باقي المدن: 24-48 ساعة\n\nهل تريد طلب منتج؟`;
  }

  if (m.includes("مرحب") || m.includes("سلام") || m.includes("bonjour") || m.includes("hello")) {
    return `أهلاً وسهلاً! 👋 أنا مساعد ${storeName} الذكي. كيف أخدمك اليوم؟`;
  }

  if (m.includes("شكر") || m.includes("merci") || m.includes("thank")) {
    return `شكراً لك! 🙏 يسعدنا دائماً خدمتك. هل تحتاج لمساعدة أخرى؟`;
  }

  return `شكراً على تواصلك مع ${storeName}! 😊 هل تريد معرفة أسعار منتجاتنا أو لديك سؤال محدد؟`;
}
