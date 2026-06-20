"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n/translations";

const LANGS: { code: Language; label: string; flag: string }[] = [
  { code: "ar", label: "العربية", flag: "🇲🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English",  flag: "🇬🇧" },
];

interface Props {
  variant?: "footer" | "navbar" | "dashboard";
}

export default function LanguageSwitcher({ variant = "footer" }: Props) {
  const { lang, setLang } = useLanguage();

  if (variant === "dashboard") {
    return (
      <div className="flex items-center gap-1 bg-surface-2 rounded-xl p-1">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              lang === l.code
                ? "bg-gold/20 text-gold border border-gold/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span>{l.flag}</span>
            <span className="hidden sm:inline">{l.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {LANGS.map((l, i) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`text-xs px-3 py-1 rounded-full transition-colors ${
            lang === l.code
              ? "bg-gold/15 text-gold border border-gold/30"
              : "text-muted hover:text-foreground"
          }`}
        >
          {variant === "navbar" ? `${l.flag} ${l.label}` : l.label}
        </button>
      ))}
    </div>
  );
}
