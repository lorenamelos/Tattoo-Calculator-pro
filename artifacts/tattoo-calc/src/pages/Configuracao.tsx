import { useState } from "react";
import { useLocation } from "wouter";
import { loadConfig, saveConfig, DEFAULT_CONFIG, type Configuracao } from "@/lib/store";
import { logout } from "@/lib/auth";
import { useLang } from "@/contexts/LangContext";
import { LanguageSelector } from "@/components/LanguageSelector";
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
  const { t, lang } = useLang();

  const currencyPrefix = lang === "pt" ? "R$" : "$";

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

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">{t.config.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {saved && <span className="text-xs text-primary font-medium">{t.config.saved}</span>}
            <LanguageSelector />
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              {t.config.reset}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <Section title={t.config.section1}>
          <div className="grid grid-cols-2 gap-3">
            <NumInput label={t.config.studioPercent} value={config.percentualEstudio} onChange={(v) => update("percentualEstudio", v)} suffix="%" step={0.5} />
            <NumInput label={t.config.materialPercent} value={config.percentualMaterial} onChange={(v) => update("percentualMaterial", v)} suffix="%" step={0.5} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumInput label={t.config.hourlyRate} value={config.valorHora} onChange={(v) => update("valorHora", v)} prefix={currencyPrefix} step={10} />
            <NumInput label={t.config.tattoosPerYear} value={config.tatuagensPorAno} onChange={(v) => update("tatuagensPorAno", v)} step={1} />
          </div>
        </Section>

        <Section title={t.config.section2}>
          <div className="grid grid-cols-2 gap-3">
            <NumInput label={t.config.cartridge} value={config.precoCartucho} onChange={(v) => update("precoCartucho", v)} prefix={currencyPrefix} step={0.5} />
            <NumInput label={t.config.needle} value={config.precoAgulha} onChange={(v) => update("precoAgulha", v)} prefix={currencyPrefix} step={0.5} />
            <NumInput label={t.config.ink} value={config.precoTinta} onChange={(v) => update("precoTinta", v)} prefix={currencyPrefix} step={0.5} />
            <NumInput label={t.config.gloves} value={config.precoLuvas} onChange={(v) => update("precoLuvas", v)} prefix={currencyPrefix} step={0.5} />
            <NumInput label={t.config.transfer} value={config.precoTransfer} onChange={(v) => update("precoTransfer", v)} prefix={currencyPrefix} step={0.5} />
          </div>
        </Section>

        <Section title={t.config.section3}>
          <div className="grid grid-cols-2 gap-3">
            <NumInput label={t.config.apps} value={config.custoApps} onChange={(v) => update("custoApps", v)} prefix={currencyPrefix} step={10} />
            <NumInput label={t.config.traffic} value={config.custoTrafego} onChange={(v) => update("custoTrafego", v)} prefix={currencyPrefix} step={50} />
          </div>
        </Section>

        <Section title={t.config.section4}>
          <div className="grid grid-cols-2 gap-3">
            <NumInput label={t.config.ipad} value={config.depreciacaoIpad} onChange={(v) => update("depreciacaoIpad", v)} prefix={currencyPrefix} step={10} />
            <NumInput label={t.config.machine} value={config.depreciacaoMaquina} onChange={(v) => update("depreciacaoMaquina", v)} prefix={currencyPrefix} step={10} />
          </div>
        </Section>

        <Section title={t.config.section5}>
          <p className="text-xs text-muted-foreground -mt-1">{t.config.section5sub}</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(config.taxasCartao)
              .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
              .map(([parcelas, taxa]) => (
                <NumInput key={parcelas} label={`${parcelas}x`} value={taxa} onChange={(v) => updateTaxa(parcelas, v)} suffix="%" step={0.1} />
              ))}
          </div>
        </Section>

        <div className="flex gap-3 pb-6">
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            {t.config.saveBtn}
          </button>
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity btn-primary-glow"
          >
            {t.config.nextBtn}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
