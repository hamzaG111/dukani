import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dukani-dev-secret-change-in-production"
);

const PUBLIC_PATHS = [
  "/",
  "/pricing",
  "/about",
  "/blog",
  "/contact",
  "/faq",
  "/stores",
  "/mobile",
  "/api-docs",
  "/partners",
  "/success-stories",
  "/legal",
  "/onboarding",
  "/auth",
  "/api/auth",
  "/api/whatsapp",
  "/api/chat",
  "/store",
  "/manifest.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  // Protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("dukani_session")?.value;

    if (!token) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("dukani_session");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
};
