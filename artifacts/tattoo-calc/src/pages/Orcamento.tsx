import { useState } from "react";
import { useLocation } from "wouter";
import { loadConfig, calcular, type OrcamentoInput } from "@/lib/store";
import { ArrowLeft, ArrowRight, Calculator, Minus, Plus } from "lucide-react";

function NumInput({
  label,
  sublabel,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
  isCounter = false,
}: {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  isCounter?: boolean;
}) {
  if (isCounter) {
    return (
      <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChange(Math.max(min, value - step))}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-foreground">
            {value}
          </span>
          <button
            onClick={() => onChange(value + step)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      <div className="flex items-center border border-border rounded-lg overflow-hidden bg-card focus-within:ring-2 focus-within:ring-ring transition-all">
        {prefix && (
          <span className="px-3 py-2 bg-muted text-muted-foreground text-sm border-r border-border">
            {prefix}
          </span>
        )}
        <input
          type="number"
          step={step}
          min={min}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 px-3 py-2 text-sm bg-transparent text-foreground outline-none min-w-0"
        />
        {suffix && (
          <span className="px-3 py-2 bg-muted text-muted-foreground text-sm border-l border-border">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
      <h2 className="text-base font-semibold text-foreground mb-3">{title}</h2>
      {children}
    </div>
  );
}

const DEFAULT_ORCAMENTO: OrcamentoInput = {
  horasSessao: 2,
  horasCriacao: 1,
  qtdCartuchos: 2,
  qtdAgulhas: 0,
  qtdTintas: 3,
  qtdLuvas: 2,
  qtdTransfers: 1,
  custosAdmin: 0,
};

export default function OrcamentoPage() {
  const [orcamento, setOrcamento] = useState<OrcamentoInput>({ ...DEFAULT_ORCAMENTO });
  const [, navigate] = useLocation();

  function update(field: keyof OrcamentoInput, value: number) {
    setOrcamento((prev) => ({ ...prev, [field]: value }));
  }

  function handleCalcular() {
    const config = loadConfig();
    const resultado = calcular(config, orcamento);
    sessionStorage.setItem("tattoo_resultado", JSON.stringify(resultado));
    sessionStorage.setItem("tattoo_orcamento", JSON.stringify(orcamento));
    navigate("/resultado");
  }

  const totalHoras = orcamento.horasSessao + orcamento.horasCriacao;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Orcamento</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <Section title="Horas de Trabalho">
          <div className="grid grid-cols-2 gap-3">
            <NumInput
              label="Horas de sessao"
              value={orcamento.horasSessao}
              onChange={(v) => update("horasSessao", v)}
              suffix="h"
              step={0.5}
            />
            <NumInput
              label="Horas de criacao"
              value={orcamento.horasCriacao}
              onChange={(v) => update("horasCriacao", v)}
              suffix="h"
              step={0.5}
            />
          </div>
          <div className="mt-3 flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Total de horas cobradas</span>
            <span className="text-sm font-semibold text-foreground">{totalHoras}h</span>
          </div>
        </Section>

        <Section title="Materiais Utilizados">
          <div>
            <NumInput
              label="Cartuchos"
              sublabel="Cartuchos descartaveis"
              value={orcamento.qtdCartuchos}
              onChange={(v) => update("qtdCartuchos", v)}
              isCounter
              step={1}
            />
            <NumInput
              label="Agulhas avulsas"
              sublabel="Se nao usou cartucho"
              value={orcamento.qtdAgulhas}
              onChange={(v) => update("qtdAgulhas", v)}
              isCounter
              step={1}
            />
            <NumInput
              label="Tintas"
              sublabel="Quantidade de cores usadas"
              value={orcamento.qtdTintas}
              onChange={(v) => update("qtdTintas", v)}
              isCounter
              step={1}
            />
            <NumInput
              label="Pares de luvas"
              sublabel="Trocas durante a sessao"
              value={orcamento.qtdLuvas}
              onChange={(v) => update("qtdLuvas", v)}
              isCounter
              step={1}
            />
            <NumInput
              label="Papel transfer"
              sublabel="Folhas utilizadas"
              value={orcamento.qtdTransfers}
              onChange={(v) => update("qtdTransfers", v)}
              isCounter
              step={1}
            />
          </div>
        </Section>

        <Section title="Custos Extras">
          <NumInput
            label="Gastos administrativos / lanche"
            sublabel="Custos extras especificos para esta tatuagem"
            value={orcamento.custosAdmin}
            onChange={(v) => update("custosAdmin", v)}
            prefix="R$"
            step={5}
          />
        </Section>

        <button
          onClick={handleCalcular}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary text-primary-foreground rounded-xl text-base font-semibold hover:opacity-90 transition-opacity shadow-md mb-6"
        >
          Calcular preco
          <ArrowRight className="w-5 h-5" />
        </button>
      </main>
    </div>
  );
}
