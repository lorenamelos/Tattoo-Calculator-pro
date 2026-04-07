import { useLocation } from "wouter";
import { useLang } from "@/contexts/LangContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Splash() {
  const [, navigate] = useLocation();
  const { t } = useLang();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#1a365d" }}
    >
      <div className="flex justify-end px-5 pt-5">
        <LanguageSelector variant="dark" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <svg
          viewBox="0 0 100 125"
          xmlns="http://www.w3.org/2000/svg"
          className="w-52 h-64 drop-shadow-2xl mb-8"
        >
          <path
            d="M50 6 C62 22 86 50 86 73 A36 36 0 1 1 14 73 C14 50 38 22 50 6 Z"
            fill="white"
            fillOpacity="0.15"
          />
          <path
            d="M50 6 C62 22 86 50 86 73 A36 36 0 1 1 14 73 C14 50 38 22 50 6 Z"
            fill="white"
            fillOpacity="0.92"
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
            fillOpacity="0.5"
          />
        </svg>

        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "white" }}>
          {t.splash.appName}
        </h1>
        <p
          className="mt-3 text-base font-light tracking-wide"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {t.splash.subtitle}
        </p>
      </main>

      <div className="px-6 pb-12">
        <button
          onClick={() => navigate("/login")}
          className="w-full max-w-sm mx-auto flex items-center justify-center py-4 px-6 rounded-2xl text-base font-bold tracking-wide transition-all btn-primary-glow"
          style={{
            background: "#d4a017",
            color: "#1a365d",
            display: "flex",
          }}
        >
          {t.splash.signIn}
        </button>
      </div>
    </div>
  );
}
