import { useLang } from "@/contexts/LangContext";

interface Props {
  variant?: "light" | "dark";
}

export function LanguageSelector({ variant = "light" }: Props) {
  const { lang, setLang } = useLang();

  if (variant === "dark") {
    return (
      <div
        className="flex items-center gap-0.5 rounded-lg overflow-hidden text-xs font-semibold"
        style={{ border: "1px solid rgba(255,255,255,0.25)" }}
      >
        <button
          onClick={() => setLang("pt")}
          style={
            lang === "pt"
              ? { background: "#d4a017", color: "#1a365d" }
              : { background: "transparent", color: "rgba(255,255,255,0.6)" }
          }
          className="px-2.5 py-1.5 transition-colors hover:opacity-90"
        >
          PT
        </button>
        <button
          onClick={() => setLang("en")}
          style={
            lang === "en"
              ? { background: "#d4a017", color: "#1a365d" }
              : { background: "transparent", color: "rgba(255,255,255,0.6)" }
          }
          className="px-2.5 py-1.5 transition-colors hover:opacity-90"
        >
          EN
        </button>
      </div>
    );
  }

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
