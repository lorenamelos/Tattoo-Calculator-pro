import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { register } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LangContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function CadastroPage() {
  const [, navigate] = useLocation();
  const { session, loading } = useAuth();
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate("/configuracoes");
  }, [session, loading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError(t.auth.errorPasswordMatch);
      return;
    }
    setSubmitting(true);
    const result = await register(email, password);
    setSubmitting(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error ?? t.auth.errorEmpty);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground">{t.auth.successTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.auth.successMsg}</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity btn-primary-glow"
          >
            {t.auth.goToLogin}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.auth.back}
          </button>
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">{t.auth.registerTitle}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t.auth.registerSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                {t.auth.email}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.auth.emailPlaceholder}
                className="w-full px-4 py-3 bg-card border border-card-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                {t.auth.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordMin}
                  className="w-full px-4 py-3 pr-12 bg-card border border-card-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="confirm">
                {t.auth.confirmPassword}
              </label>
              <input
                id="confirm"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.auth.confirmPlaceholder}
                className="w-full px-4 py-3 bg-card border border-card-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            {error && (
              <p className="text-sm text-primary bg-primary/10 border border-primary/20 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all btn-primary-glow disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? t.auth.registerBtnLoading : t.auth.registerBtn}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t.auth.hasAccount}{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:opacity-80 transition-opacity font-medium"
            >
              {t.auth.loginLink}
            </button>
          </p>
        </div>
      </main>

      <footer className="py-5 text-center">
        <p className="text-xs text-muted-foreground">{t.footer}</p>
      </footer>
    </div>
  );
}
