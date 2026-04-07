import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { type ResultadoCalculo, loadConfig } from "@/lib/store";
import { formatCurrency } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ArrowLeft, TrendingUp, DollarSign, Layers, CheckCircle } from "lucide-react";

function BreakdownRow({ label, value, lang }: { label: string; value: number; lang: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{formatCurrency(value, lang as "pt" | "en")}</span>
    </div>
  );
}

function ParcelaRow({
  parcelas,
  taxa,
  valorTotal,
  valorParcela,
  valorAposComissao,
  lang,
  totalLabel,
  rateLabel,
  receiveLabel,
}: {
  parcelas: number;
  taxa: number;
  valorTotal: number;
  valorParcela: number;
  valorAposComissao: number;
  lang: string;
  totalLabel: string;
  rateLabel: string;
  receiveLabel: string;
}) {
  const fmt = (v: number) => formatCurrency(v, lang as "pt" | "en");
  return (
    <div className="flex items-center gap-2 py-2.5 border-b border-border last:border-0">
      <div className="w-12 shrink-0 text-center">
        <span className="text-sm font-bold text-foreground">{parcelas}x</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{fmt(valorParcela)}</p>
        <p className="text-xs text-muted-foreground">{totalLabel}: {fmt(valorTotal)}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-muted-foreground">{taxa.toFixed(1)}% {rateLabel}</p>
        <p className="text-xs text-primary font-medium">{receiveLabel}: {fmt(valorAposComissao)}</p>
      </div>
    </div>
  );
}

export default function ResultadoPage() {
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [, navigate] = useLocation();
  const { t, lang } = useLang();

  const fmt = (v: number) => formatCurrency(v, lang);

  useEffect(() => {
    const raw = sessionStorage.getItem("tattoo_resultado");
    if (raw) {
      setResultado(JSON.parse(raw));
    } else {
      navigate("/orcamento");
    }
  }, [navigate]);

  if (!resultado) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const config = loadConfig();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/orcamento")}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold text-foreground">{t.result.title}</h1>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div className="bg-primary/10 border border-primary/25 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm font-semibold text-primary tracking-wide uppercase">
              {t.result.mainLabel}
            </p>
          </div>
          <p className="text-4xl font-bold text-foreground mt-2">
            {fmt(resultado.valorCobrarSemJuros)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.result.afterCommission} ({config.percentualEstudio}%):&nbsp;
            <span className="font-semibold text-foreground">{fmt(resultado.valorAposComissao)}</span>
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">{t.result.section1}</h2>
          </div>
          <BreakdownRow label={t.result.materials} value={resultado.custoMateriais} lang={lang} />
          <BreakdownRow label={t.result.laborHours} value={resultado.custoHorasTrabalhadas} lang={lang} />
          <BreakdownRow label={t.result.fixedCosts} value={resultado.custosFixosPorTatuagem} lang={lang} />
          {resultado.custoAdmin > 0 && (
            <BreakdownRow label={t.result.adminCosts} value={resultado.custoAdmin} lang={lang} />
          )}
          <div className="flex items-center justify-between pt-3 mt-1">
            <span className="text-sm font-semibold text-foreground">{t.result.totalCost}</span>
            <span className="text-sm font-bold text-foreground">{fmt(resultado.valorReceber)}</span>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">{t.result.section2}</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{t.result.section2sub}</p>
          {resultado.parcelamentos.map((p) => (
            <ParcelaRow
              key={p.parcelas}
              {...p}
              lang={lang}
              totalLabel={t.result.totalLabel}
              rateLabel={t.result.rateLabel}
              receiveLabel={t.result.receiveLabel}
            />
          ))}
        </div>

        <div className="flex gap-3 pb-6">
          <button
            onClick={() => navigate("/orcamento")}
            className="flex-1 py-3 px-4 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            {t.result.newBudgetBtn}
          </button>
          <button
            onClick={() => navigate("/configuracoes")}
            className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity btn-primary-glow"
          >
            {t.result.configBtn}
          </button>
        </div>
      </main>
    </div>
  );
}
