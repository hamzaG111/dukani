import { NextRequest, NextResponse } from "next/server";
import { signToken, setSessionCookie } from "@/lib/auth";

// In production: replace with Supabase user creation
// import { getAdminClient } from "@/lib/supabase";
// import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone, password, storeName, storeCity, storeCategory } = body;

    const contact = email || phone;
    if (!contact || !password || !storeName) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    /* ── PRODUCTION: uncomment this block ──────────────────────────────────
    const db = getAdminClient();
    const hash = await bcrypt.hash(password, 12);

    // Check if user exists
    const { data: existing } = await db
      .from("users")
      .select("id")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .single();

    if (existing) {
      return NextResponse.json({ error: "الحساب موجود مسبقاً" }, { status: 409 });
    }

    const { data: user, error } = await db
      .from("users")
      .insert({
        email: email || null,
        phone: phone || null,
        password_hash: hash,
        store_name: storeName,
        store_city: storeCity,
        store_category: storeCategory,
        plan: "free",
        xp: 50,
        streak: 1,
        last_active: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (error) throw error;

    const token = await signToken({
      userId: user.id,
      email: user.email,
      storeName: user.store_name,
      plan: user.plan,
    });
    ─────────────────────────────────────────────────────────────────────── */

    // ── DEMO MODE: create mock user ──────────────────────────────────────
    const userId = `demo_${Date.now()}`;
    const token = await signToken({
      userId,
      email: email || `${phone}@demo.dukani.ma`,
      storeName,
      plan: "free",
    });
    // ─────────────────────────────────────────────────────────────────────

    setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: { userId, storeName, plan: "free" },
    });
  } catch (err) {
    console.error("[Auth/Register]", err);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
