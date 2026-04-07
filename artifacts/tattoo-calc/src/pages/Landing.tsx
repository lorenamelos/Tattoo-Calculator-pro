import { useLocation } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Landing() {
  const [, navigate] = useLocation();
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex justify-end px-4 pt-4">
        <LanguageSelector />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="space-y-2">
            <div className="mb-4">
              <svg viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg" className="w-20 h-24 drop-shadow-md">
                <path
                  d="M50 6 C62 22 86 50 86 73 A36 36 0 1 1 14 73 C14 50 38 22 50 6 Z"
                  fill="#1a365d"
                />
                <path
                  d="M50 44 C57 55 67 66 67 76 A17 17 0 1 1 33 76 C33 66 43 55 50 44 Z"
                  fill="#d4a017"
                />
                <ellipse
                  cx="57"
                  cy="66"
                  rx="4"
                  ry="6"
                  transform="rotate(-20 57 66)"
                  fill="white"
                  fillOpacity="0.55"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-foreground leading-tight tracking-tight">
              {t.landing.title}
              <br />
              <span className="text-primary">{t.landing.titleHighlight}</span>
            </h1>

            <p className="text-base text-muted-foreground mt-3 leading-relaxed">
              {t.landing.subtitle}
              <br />
              {t.landing.tagline}
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-5 text-left space-y-3">
            {t.landing.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary text-primary-foreground rounded-xl text-base font-semibold hover:opacity-90 transition-all btn-primary-glow"
            >
              {t.landing.cta}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/cadastro")}
              className="w-full py-3 px-6 border border-border text-muted-foreground rounded-xl text-sm hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {t.landing.createAccount}
            </button>
          </div>
        </div>
      </main>

      <footer className="py-5 text-center">
        <p className="text-xs text-muted-foreground">
          {t.footer}
        </p>
      </footer>
    </div>
  );
}
