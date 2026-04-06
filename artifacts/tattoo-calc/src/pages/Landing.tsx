import { useLocation } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "Inclui custos reais de material por sessao",
  "Calcula parcelamento com taxas da maquininha",
  "Considera depreciacao de equipamentos",
  "Rateia custos fixos mensais por tatuagem",
];

export default function Landing() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-16">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 mb-4">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <path
                  d="M8 32 L20 8 L32 32"
                  stroke="hsl(0 72% 48%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 24 L28 24"
                  stroke="hsl(0 72% 48%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="8" r="2" fill="hsl(0 72% 48%)" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-foreground leading-tight tracking-tight">
              Calculadora de Precos
              <br />
              <span className="text-primary">para Tatuadores</span>
            </h1>

            <p className="text-base text-muted-foreground mt-3 leading-relaxed">
              Saiba exatamente quanto cobrar pelo seu trabalho.
              <br />
              Sem chute. Sem perda.
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-5 text-left space-y-3">
            {benefits.map((benefit) => (
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
              Acessar calculadora
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/cadastro")}
              className="w-full py-3 px-6 border border-border text-muted-foreground rounded-xl text-sm hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Criar conta gratis
            </button>
          </div>
        </div>
      </main>

      <footer className="py-5 text-center">
        <p className="text-xs text-muted-foreground">
          Criado por{" "}
          <span className="text-foreground font-medium">Lorena Melo</span>
        </p>
      </footer>
    </div>
  );
}
