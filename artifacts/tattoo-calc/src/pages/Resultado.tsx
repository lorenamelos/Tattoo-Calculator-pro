import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { type ResultadoCalculo, formatBRL, loadConfig } from "@/lib/store";
import { ArrowLeft, TrendingUp, DollarSign, Layers, CheckCircle } from "lucide-react";

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{formatBRL(value)}</span>
    </div>
  );
}

function ParcelaRow({
  parcelas,
  taxa,
  valorTotal,
  valorParcela,
  valorAposComissao,
}: {
  parcelas: number;
  taxa: number;
  valorTotal: number;
  valorParcela: number;
  valorAposComissao: number;
}) {
  return (
    <div className="flex items-center gap-2 py-2.5 border-b border-border last:border-0">
      <div className="w-12 shrink-0 text-center">
        <span className="text-sm font-bold text-foreground">{parcelas}x</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{formatBRL(valorParcela)}</p>
        <p className="text-xs text-muted-foreground">Total: {formatBRL(valorTotal)}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-muted-foreground">{taxa.toFixed(1)}% taxa</p>
        <p className="text-xs text-primary font-medium">Recebe: {formatBRL(valorAposComissao)}</p>
      </div>
    </div>
  );
}

export default function ResultadoPage() {
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [, navigate] = useLocation();

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
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const config = loadConfig();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/orcamento")}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Resultado</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <p className="text-sm font-semibold text-primary">VALOR A COBRAR — SEM JUROS</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary mt-2">
            {formatBRL(resultado.valorCobrarSemJuros)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Apos comissao do estudio ({config.percentualEstudio}%):&nbsp;
            <span className="font-semibold text-foreground">{formatBRL(resultado.valorAposComissao)}</span>
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">Composicao do custo</h2>
          </div>
          <BreakdownRow label="Materiais utilizados" value={resultado.custoMateriais} />
          <BreakdownRow label="Horas de trabalho" value={resultado.custoHorasTrabalhadas} />
          <BreakdownRow label="Custos fixos rateados" value={resultado.custosFixosPorTatuagem} />
          {resultado.custoAdmin > 0 && (
            <BreakdownRow label="Custos admin / lanche" value={resultado.custoAdmin} />
          )}
          <div className="flex items-center justify-between pt-3 mt-1">
            <span className="text-sm font-semibold text-foreground">Custo real (valor a receber)</span>
            <span className="text-sm font-bold text-foreground">{formatBRL(resultado.valorReceber)}</span>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">Valor com juros — maquininha</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Valores ajustados para cobrir taxa da maquininha e comissao do estudio
          </p>
          {resultado.parcelamentos.map((p) => (
            <ParcelaRow key={p.parcelas} {...p} />
          ))}
        </div>

        <div className="flex gap-3 pb-6">
          <button
            onClick={() => navigate("/orcamento")}
            className="flex-1 py-3 px-4 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Novo orcamento
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Configuracoes
          </button>
        </div>
      </main>
    </div>
  );
}
