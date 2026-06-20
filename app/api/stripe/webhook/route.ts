import { NextRequest, NextResponse } from "next/server";

// Stripe webhook secret from dashboard → Developers → Webhooks
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

interface StripeEvent {
  type: string;
  data: {
    object: {
      metadata?: { userId?: string; planId?: string };
      customer?: string;
      status?: string;
      current_period_end?: number;
    };
  };
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  if (!WEBHOOK_SECRET) {
    console.warn("STRIPE_WEBHOOK_SECRET not set — skipping verification in dev");
    return NextResponse.json({ received: true });
  }

  // Verify signature using Web Crypto (no stripe SDK needed)
  const isValid = await verifyStripeSignature(payload, signature, WEBHOOK_SECRET);
  if (!isValid) {
    return NextResponse.json({ error: "توقيع غير صالح" }, { status: 400 });
  }

  const event: StripeEvent = JSON.parse(payload);

  switch (event.type) {
    case "checkout.session.completed": {
      const { metadata } = event.data.object;
      if (metadata?.userId && metadata?.planId) {
        console.log(`✅ Subscription activated: user=${metadata.userId}, plan=${metadata.planId}`);
        // TODO: Update user plan in Supabase:
        // await supabaseAdmin.from("users").update({ plan: metadata.planId, plan_expires_at: ... }).eq("id", metadata.userId)
      }
      break;
    }

    case "customer.subscription.deleted": {
      const { metadata } = event.data.object;
      if (metadata?.userId) {
        console.log(`❌ Subscription cancelled: user=${metadata.userId}`);
        // TODO: Downgrade user to free plan in Supabase
      }
      break;
    }

    case "invoice.payment_failed": {
      const { metadata } = event.data.object;
      if (metadata?.userId) {
        console.log(`⚠️ Payment failed: user=${metadata.userId}`);
        // TODO: Send notification email
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function verifyStripeSignature(payload: string, header: string, secret: string): Promise<boolean> {
  try {
    const parts = header.split(",").reduce<Record<string, string>>((acc, part) => {
      const [key, val] = part.split("=");
      acc[key] = val;
      return acc;
    }, {});

    const timestamp = parts["t"];
    const signature = parts["v1"];
    if (!timestamp || !signature) return false;

    const signedPayload = `${timestamp}.${payload}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
    const computed = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, "0")).join("");

    return computed === signature;
  } catch {
    return false;
  }
}
