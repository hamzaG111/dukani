import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// MAD pricing in fils (Moroccan currency smallest unit = centimes, but Stripe uses integers)
// 1 MAD = 100 centimes for Stripe
const PLAN_PRICES_MAD: Record<string, { monthly: number; yearly: number; name: string }> = {
  starter: { monthly: 99, yearly: 79, name: "الناشئ" },
  pro: { monthly: 249, yearly: 199, name: "الاحترافي" },
  elite: { monthly: 599, yearly: 479, name: "النخبة" },
};

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const { planId, billing } = await req.json() as { planId: string; billing: "monthly" | "yearly" };

    const plan = PLAN_PRICES_MAD[planId];
    if (!plan) {
      return NextResponse.json({ error: "خطة غير صالحة" }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      // Demo mode — return mock checkout URL
      return NextResponse.json({
        url: `/dashboard/subscription?demo=1&plan=${planId}&billing=${billing}`,
        demo: true,
      });
    }

    const priceInCentimes = plan[billing] * 100;
    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "payment_method_types[]": "card",
        "mode": "subscription",
        "line_items[0][price_data][currency]": "mad",
        "line_items[0][price_data][product_data][name]": `دُكّاني — ${plan.name}`,
        "line_items[0][price_data][unit_amount]": String(priceInCentimes),
        "line_items[0][price_data][recurring][interval]": billing === "yearly" ? "year" : "month",
        "line_items[0][quantity]": "1",
        "customer_email": session.email ?? "",
        "metadata[userId]": session.userId ?? "",
        "metadata[planId]": planId,
        "metadata[billing]": billing,
        "success_url": `${origin}/dashboard/subscription?success=1&plan=${planId}`,
        "cancel_url": `${origin}/dashboard/subscription?cancelled=1`,
        "allow_promotion_codes": "true",
        "subscription_data[trial_period_days]": "14",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Stripe error:", err);
      return NextResponse.json({ error: "خطأ في معالجة الدفع" }, { status: 500 });
    }

    const checkout = await response.json() as { url: string; id: string };
    return NextResponse.json({ url: checkout.url, sessionId: checkout.id });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
