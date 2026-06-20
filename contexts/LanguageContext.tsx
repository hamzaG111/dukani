"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, translations, Translations } from "@/lib/i18n/translations";

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (l: Language) => void;
  dir: "rtl" | "ltr";
}

type AnyTranslation = typeof translations[Language];

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  t: translations.ar,
  setLang: () => {},
  dir: "rtl",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("dukani_lang") as Language | null;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
    localStorage.setItem("dukani_lang", lang);
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);

  const current = translations[lang] as AnyTranslation;
  return (
    <LanguageContext.Provider value={{ lang, t: current as Translations, setLang, dir: current.dir as "rtl" | "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
