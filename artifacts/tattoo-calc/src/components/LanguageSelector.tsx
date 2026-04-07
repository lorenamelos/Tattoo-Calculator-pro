import { useLang } from "@/contexts/LangContext";

export function LanguageSelector() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-0.5 border border-border rounded-lg overflow-hidden text-xs font-semibold">
      <button
        onClick={() => setLang("pt")}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "pt"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
      >
        EN
      </button>
    </div>
  );
}
