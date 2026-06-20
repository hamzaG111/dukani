import { NextRequest, NextResponse } from "next/server";
import { parseMetaWebhook, parseTwilioWebhook, sendWhatsAppMessage, sendTwilioMessage } from "@/lib/whatsapp";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── GET: WhatsApp webhook verification ──────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// ─── POST: Receive WhatsApp message ──────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let waMsg = null;
    let provider: "meta" | "twilio" = "meta";

    if (contentType.includes("application/json")) {
      // Meta WhatsApp Business API
      const body = await req.json();
      waMsg = parseMetaWebhook(body);
      provider = "meta";
    } else {
      // Twilio
      const formData = await req.formData();
      waMsg = parseTwilioWebhook(formData);
      provider = "twilio";
    }

    if (!waMsg) {
      return NextResponse.json({ status: "ignored" });
    }

    // ── Find merchant by WhatsApp number ─────────────────────────────────
    // In production: look up user in Supabase by whatsapp_number
    // const db = getAdminClient();
    // const { data: merchant } = await db.from("users").select("*").eq("whatsapp_number", waMsg.to).single();
    //
    // For demo: use env-defined store info
    const merchant = {
      storeName: process.env.DEMO_STORE_NAME || "متجر دُكّاني",
      storeDescription: "متجر متعدد المنتجات",
      whatsappPhoneId: process.env.WHATSAPP_PHONE_ID || "",
      whatsappToken: process.env.WHATSAPP_TOKEN || "",
      products: [
        { name: "جبادور جلدي بني", price: 350, available: true },
        { name: "شاحن آيفون أصلي", price: 120, available: true },
        { name: "كريم الوجه الذهبي", price: 85, available: true },
      ],
    };

    // ── Build conversation history ────────────────────────────────────────
    // In production: load last N messages from DB
    const messages: { role: "user" | "assistant"; content: string }[] = [
      { role: "user", content: waMsg.body },
    ];

    // ── Generate AI reply ─────────────────────────────────────────────────
    const systemPrompt = buildSystemPrompt(merchant);
    let reply = "";

    if (process.env.ANTHROPIC_API_KEY) {
      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: systemPrompt,
        messages,
      });
      reply = (response.content[0] as { type: string; text: string }).text || "";
    } else {
      reply = `مرحباً! شكراً على تواصلك مع ${merchant.storeName}. سنرد عليك قريباً 😊`;
    }

    // ── Save to DB ────────────────────────────────────────────────────────
    // In production: upsert conversation + insert messages
    // await saveConversation(merchant.id, waMsg, reply);

    // ── Send reply ────────────────────────────────────────────────────────
    if (provider === "meta") {
      await sendWhatsAppMessage(waMsg.from, reply, merchant.whatsappPhoneId, merchant.whatsappToken);
    } else {
      await sendTwilioMessage(waMsg.from, reply);
    }

    return NextResponse.json({ status: "sent", reply });
  } catch (err) {
    console.error("[WhatsApp Webhook]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function buildSystemPrompt(merchant: {
  storeName: string;
  storeDescription: string;
  products: { name: string; price: number; available: boolean }[];
}): string {
  const productsList = merchant.products
    .map(p => `• ${p.name} — ${p.price} درهم — ${p.available ? "متوفر ✅" : "نفذ ❌"}`)
    .join("\n");

  return `أنت مساعد تجاري ذكي لمتجر "${merchant.storeName}".
وصف المتجر: ${merchant.storeDescription}

مهمتك: مساعدة الزبائن، الرد على أسئلتهم، واقتراح المنتجات المناسبة لهم.

قواعد مهمة:
- رد بنفس لغة الزبون (دارجة / عربية فصحى / فرنسية)
- كن ودوداً ومختصراً — لا تتجاوز 3 جمل
- لا تذكر أبداً أنك نموذج ذكاء اصطناعي
- إذا طلب الزبون منتجاً غير موجود، اعتذر بلطف واقترح بديلاً
- عند الطلب الجدي: "سأحوّلك لإتمام الطلب — ما هو عنوانك؟"

المنتجات المتاحة:
${productsList}`;
}
