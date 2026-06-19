"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "المميزات", href: "/#features" },
  { label: "كيف يعمل", href: "/#how-it-works" },
  { label: "الأسعار", href: "/pricing" },
  { label: "المتاجر", href: "/stores" },
  { label: "من نحن", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <span className="text-background font-black text-lg leading-none">د</span>
          </div>
          <span className="text-xl font-black text-foreground tracking-tight">
            دُكّاني
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-foreground text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/auth/login" className="text-muted hover:text-foreground text-sm font-medium transition-colors px-4 py-2">
            تسجيل الدخول
          </a>
          <a href="/auth/register">
            <Button size="sm" variant="primary">
              ابدأ مجاناً
            </Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-muted hover:text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="القائمة"
        >
          <div className="space-y-1.5 w-6">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass border-t border-white/5 px-6 py-4"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-muted hover:text-foreground font-medium py-2 border-b border-border/50"
              >
                {link.label}
              </a>
            ))}
            <Button size="md" variant="primary" className="mt-2 w-full">
              ابدأ مجاناً
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
