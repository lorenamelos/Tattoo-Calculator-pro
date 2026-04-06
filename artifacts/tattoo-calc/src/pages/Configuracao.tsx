import { useState } from "react";
import { useLocation } from "wouter";
import { loadConfig, saveConfig, DEFAULT_CONFIG, type Configuracao } from "@/lib/store";
import { logout } from "@/lib/auth";
import { ArrowRight, Settings, RotateCcw, LogOut } from "lucide-react";

function NumInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center border border-border rounded-lg overflow-hidden bg-card focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all">
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
    <div className="bg-card border border-card-border rounded-xl p-5 space-y-4 shadow-sm">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

export default function ConfiguracaoPage() {
  const [config, setConfig] = useState<Configuracao>(() => loadConfig());
  const [saved, setSaved] = useState(false);
  const [, navigate] = useLocation();

  function update(field: keyof Configuracao, value: number) {
    setConfig((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function updateTaxa(parcelas: string, value: number) {
    setConfig((prev) => ({
      ...prev,
      taxasCartao: { ...prev.taxasCartao, [parcelas]: value },
    }));
    setSaved(false);
  }

  function handleSave() {
    saveConfig(config);
    setSaved(true);
  }

  function handleReset() {
    setConfig({ ...DEFAULT_CONFIG });
    setSaved(false);
  }

  function handleNext() {
    saveConfig(config);
    navigate("/orcamento");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Configuracoes</h1>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-xs text-primary font-medium">Salvo!</span>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Resetar
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <Section title="Percentuais e Valores Base">
          <div className="grid grid-cols-2 gap-3">
            <NumInput
              label="Comissao do estudio"
              value={config.percentualEstudio}
              onChange={(v) => update("percentualEstudio", v)}
              suffix="%"
              step={0.5}
            />
            <NumInput
              label="Reserva de material"
              value={config.percentualMaterial}
              onChange={(v) => update("percentualMaterial", v)}
              suffix="%"
              step={0.5}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumInput
              label="Valor da hora"
              value={config.valorHora}
              onChange={(v) => update("valorHora", v)}
              prefix="R$"
              step={10}
            />
            <NumInput
              label="Tatuagens por ano"
              value={config.tatuagensPorAno}
              onChange={(v) => update("tatuagensPorAno", v)}
              step={1}
            />
          </div>
        </Section>

        <Section title="Preco dos Materiais (por unidade)">
          <div className="grid grid-cols-2 gap-3">
            <NumInput
              label="Cartucho"
              value={config.precoCartucho}
              onChange={(v) => update("precoCartucho", v)}
              prefix="R$"
              step={0.5}
            />
            <NumInput
              label="Agulha avulsa"
              value={config.precoAgulha}
              onChange={(v) => update("precoAgulha", v)}
              prefix="R$"
              step={0.5}
            />
            <NumInput
              label="Tinta (uso)"
              value={config.precoTinta}
              onChange={(v) => update("precoTinta", v)}
              prefix="R$"
              step={0.5}
            />
            <NumInput
              label="Par de luvas"
              value={config.precoLuvas}
              onChange={(v) => update("precoLuvas", v)}
              prefix="R$"
              step={0.5}
            />
            <NumInput
              label="Papel transfer"
              value={config.precoTransfer}
              onChange={(v) => update("precoTransfer", v)}
              prefix="R$"
              step={0.5}
            />
          </div>
        </Section>

        <Section title="Custos Fixos Mensais">
          <div className="grid grid-cols-2 gap-3">
            <NumInput
              label="Apps e software"
              value={config.custoApps}
              onChange={(v) => update("custoApps", v)}
              prefix="R$"
              step={10}
            />
            <NumInput
              label="Trafego pago"
              value={config.custoTrafego}
              onChange={(v) => update("custoTrafego", v)}
              prefix="R$"
              step={50}
            />
          </div>
        </Section>

        <Section title="Depreciacao de Equipamentos (mensal)">
          <div className="grid grid-cols-2 gap-3">
            <NumInput
              label="iPad / tablet"
              value={config.depreciacaoIpad}
              onChange={(v) => update("depreciacaoIpad", v)}
              prefix="R$"
              step={10}
            />
            <NumInput
              label="Maquina de tatuar"
              value={config.depreciacaoMaquina}
              onChange={(v) => update("depreciacaoMaquina", v)}
              prefix="R$"
              step={10}
            />
          </div>
        </Section>

        <Section title="Taxas da Maquininha por Parcelamento">
          <p className="text-xs text-muted-foreground -mt-1">
            Taxa cobrada pela maquininha em cada numero de parcelas
          </p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(config.taxasCartao)
              .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
              .map(([parcelas, taxa]) => (
                <NumInput
                  key={parcelas}
                  label={`${parcelas}x`}
                  value={taxa}
                  onChange={(v) => updateTaxa(parcelas, v)}
                  suffix="%"
                  step={0.1}
                />
              ))}
          </div>
        </Section>

        <div className="flex gap-3 pb-6">
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Salvar configuracoes
          </button>
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity btn-primary-glow"
          >
            Fazer orcamento
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
