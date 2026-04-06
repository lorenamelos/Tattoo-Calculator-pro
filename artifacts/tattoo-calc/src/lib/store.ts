export interface CardRates {
  [parcelas: string]: number;
}

export interface Configuracao {
  percentualEstudio: number;
  percentualMaterial: number;
  valorHora: number;
  tatuagensPorAno: number;
  precoCartucho: number;
  precoAgulha: number;
  precoTinta: number;
  precoLuvas: number;
  precoTransfer: number;
  custoApps: number;
  custoTrafego: number;
  depreciacaoIpad: number;
  depreciacaoMaquina: number;
  taxasCartao: CardRates;
}

export const DEFAULT_CONFIG: Configuracao = {
  percentualEstudio: 30,
  percentualMaterial: 10,
  valorHora: 200,
  tatuagensPorAno: 192,
  precoCartucho: 8,
  precoAgulha: 5,
  precoTinta: 3,
  precoLuvas: 2,
  precoTransfer: 2,
  custoApps: 150,
  custoTrafego: 300,
  depreciacaoIpad: 200,
  depreciacaoMaquina: 100,
  taxasCartao: {
    "2": 3.5,
    "3": 4.0,
    "4": 4.5,
    "5": 5.0,
    "6": 5.5,
    "7": 6.0,
    "8": 6.5,
    "9": 7.0,
    "10": 7.5,
  },
};

const CONFIG_KEY = "tattoo_calc_config";

export function loadConfig(): Configuracao {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch {}
  return { ...DEFAULT_CONFIG };
}

export function saveConfig(config: Configuracao): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export interface OrcamentoInput {
  horasSessao: number;
  horasCriacao: number;
  qtdCartuchos: number;
  qtdAgulhas: number;
  qtdTintas: number;
  qtdLuvas: number;
  qtdTransfers: number;
  custosAdmin: number;
}

export interface ResultadoCalculo {
  custoMateriais: number;
  custoHorasTrabalhadas: number;
  custosFixosPorTatuagem: number;
  custoAdmin: number;
  valorReceber: number;
  valorCobrarSemJuros: number;
  valorAposComissao: number;
  parcelamentos: { parcelas: number; taxa: number; valorTotal: number; valorParcela: number; valorAposComissao: number }[];
}

export function calcular(config: Configuracao, orcamento: OrcamentoInput): ResultadoCalculo {
  const custoMateriais =
    orcamento.qtdCartuchos * config.precoCartucho +
    orcamento.qtdAgulhas * config.precoAgulha +
    orcamento.qtdTintas * config.precoTinta +
    orcamento.qtdLuvas * config.precoLuvas +
    orcamento.qtdTransfers * config.precoTransfer;

  const totalHoras = orcamento.horasSessao + orcamento.horasCriacao;
  const custoHorasTrabalhadas = totalHoras * config.valorHora;

  const custoFixoMensal = config.custoApps + config.custoTrafego + config.depreciacaoIpad + config.depreciacaoMaquina;
  const tatuagensPorMes = config.tatuagensPorAno / 12;
  const custosFixosPorTatuagem = custoFixoMensal / tatuagensPorMes;

  const custoAdmin = orcamento.custosAdmin;

  const custoTotal = custoMateriais + custoHorasTrabalhadas + custosFixosPorTatuagem + custoAdmin;

  const pMaterial = config.percentualMaterial / 100;
  const custoComReservaMaterial = custoTotal / (1 - pMaterial);

  const valorReceber = custoComReservaMaterial;

  const pEstudio = config.percentualEstudio / 100;
  const valorCobrarSemJuros = valorReceber / (1 - pEstudio);

  const valorAposComissao = valorCobrarSemJuros * (1 - pEstudio);

  const parcelamentos = Object.entries(config.taxasCartao).map(([key, taxa]) => {
    const numParcelas = parseInt(key);
    const pMaquina = taxa / 100;
    const valorTotal = valorReceber / (1 - pEstudio - pMaquina);
    const valorParcela = valorTotal / numParcelas;
    const valorAposComissaoParc = valorTotal * (1 - pEstudio - pMaquina);
    return {
      parcelas: numParcelas,
      taxa,
      valorTotal,
      valorParcela,
      valorAposComissao: valorAposComissaoParc,
    };
  }).sort((a, b) => a.parcelas - b.parcelas);

  return {
    custoMateriais,
    custoHorasTrabalhadas,
    custosFixosPorTatuagem,
    custoAdmin,
    valorReceber,
    valorCobrarSemJuros,
    valorAposComissao,
    parcelamentos,
  };
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
