// WhatsApp Business API (Meta) + Twilio helper

export interface WAMessage {
  from: string;
  body: string;
  messageId: string;
  timestamp: number;
  name?: string;
}

// ─── Meta WhatsApp Business API ───────────────────────────────────────────

export async function sendWhatsAppMessage(
  to: string,
  message: string,
  phoneNumberId?: string,
  token?: string
): Promise<boolean> {
  const phoneId = phoneNumberId || process.env.WHATSAPP_PHONE_ID;
  const accessToken = token || process.env.WHATSAPP_TOKEN;

  if (!phoneId || !accessToken) {
    console.warn("[WhatsApp] Missing WHATSAPP_PHONE_ID or WHATSAPP_TOKEN");
    return false;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to.replace(/\D/g, ""),
          type: "text",
          text: { body: message },
        }),
      }
    );
    return res.ok;
  } catch (err) {
    console.error("[WhatsApp] Send error:", err);
    return false;
  }
}

// ─── Parse incoming Meta webhook payload ──────────────────────────────────

export function parseMetaWebhook(body: Record<string, unknown>): WAMessage | null {
  try {
    const entry = (body.entry as Record<string, unknown>[])?.[0];
    const change = (entry?.changes as Record<string, unknown>[])?.[0];
    const value = change?.value as Record<string, unknown>;
    const message = (value?.messages as Record<string, unknown>[])?.[0];

    if (!message || message.type !== "text") return null;

    const contacts = value?.contacts as Record<string, unknown>[];
    const name = (contacts?.[0]?.profile as Record<string, string>)?.name;

    return {
      from: message.from as string,
      body: ((message.text as Record<string, string>)?.body || "").trim(),
      messageId: message.id as string,
      timestamp: message.timestamp as number,
      name,
    };
  } catch {
    return null;
  }
}

// ─── Parse Twilio webhook payload ─────────────────────────────────────────

export function parseTwilioWebhook(formData: FormData): WAMessage | null {
  const body = formData.get("Body") as string;
  const from = formData.get("From") as string; // "whatsapp:+212..."
  const profileName = formData.get("ProfileName") as string;

  if (!body || !from) return null;

  return {
    from: from.replace("whatsapp:", ""),
    body: body.trim(),
    messageId: `twilio-${Date.now()}`,
    timestamp: Math.floor(Date.now() / 1000),
    name: profileName,
  };
}

// ─── Send via Twilio ───────────────────────────────────────────────────────

export async function sendTwilioMessage(to: string, message: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!sid || !token || !from) return false;

  const toWA = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: toWA, From: from, Body: message }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}
