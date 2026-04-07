import { createContext, useContext, useState, type ReactNode } from "react";
import { type Lang, translations, type Translations } from "@/lib/i18n";

const LANG_KEY = "tattoo_calc_lang";

function getSavedLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {}
  return "pt";
}

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "pt",
  setLang: () => {},
  t: translations.pt,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getSavedLang);

  function setLang(l: Lang) {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
