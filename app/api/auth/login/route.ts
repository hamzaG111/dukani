import { NextRequest, NextResponse } from "next/server";
import { signToken, setSessionCookie } from "@/lib/auth";

// In production: replace with Supabase lookup + bcrypt compare
// import { getAdminClient } from "@/lib/supabase";
// import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone, password } = body;

    const contact = email || phone;
    if (!contact || !password) {
      return NextResponse.json({ error: "أدخل بياناتك كاملة" }, { status: 400 });
    }

    /* ── PRODUCTION: uncomment this block ──────────────────────────────────
    const db = getAdminClient();

    const { data: user } = await db
      .from("users")
      .select("*")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .single();

    if (!user) {
      return NextResponse.json({ error: "الحساب غير موجود" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      storeName: user.store_name,
      plan: user.plan,
    });
    ─────────────────────────────────────────────────────────────────────── */

    // ── DEMO MODE: accept any credentials ────────────────────────────────
    const token = await signToken({
      userId: `demo_user`,
      email: email || `${phone}@dukani.ma`,
      storeName: "متجر الأطلس",
      plan: "free",
    });
    // ─────────────────────────────────────────────────────────────────────

    setSessionCookie(token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Auth/Login]", err);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
