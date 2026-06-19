import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "دُكّاني — تسجيل الدخول",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      {/* Decorative orbs */}
      <div className="fixed top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/4 blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/3 blur-2xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 justify-center mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <span className="text-background font-black text-xl">د</span>
          </div>
          <span className="text-2xl font-black text-foreground">دُكّاني</span>
        </a>

        {children}
      </div>
    </div>
  );
}
