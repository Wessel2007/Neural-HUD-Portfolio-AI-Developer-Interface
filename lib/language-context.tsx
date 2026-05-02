"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { content, type Lang } from "./content";

interface LangContextValue {
  lang: Lang;
  c: (typeof content)[Lang];
  toggleLang: () => void;
}

const LanguageContext = createContext<LangContextValue>({
  lang: "en",
  c: content.en,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    if (saved === "en" || saved === "pt") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "pt" : "en";
      localStorage.setItem("portfolio-lang", next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, c: content[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
