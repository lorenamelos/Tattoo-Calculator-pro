export type Lang = "pt" | "en";

export function formatCurrency(value: number, lang: Lang): string {
  if (lang === "pt") {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const translations = {
  pt: {
    currency: "R$",
    lang: "PT",
    footer: "Criado por Lorena Melo",

    splash: {
      appName: "Tattoo Price Calculator",
      subtitle: "Precificação inteligente para tatuadores",
      signIn: "Entrar",
    },

    landing: {
      title: "Calculadora de Preços",
      titleHighlight: "para Tatuadores",
      subtitle: "Saiba exatamente quanto cobrar pelo seu trabalho.",
      tagline: "Sem chute. Sem perda.",
      benefits: [
        "Inclui custos reais de material por sessão",
        "Calcula parcelamento com taxas da maquininha",
        "Considera depreciação de equipamentos",
        "Rateia custos fixos mensais por tatuagem",
      ],
      cta: "Acessar calculadora",
      createAccount: "Criar conta grátis",
    },

    auth: {
      loginTitle: "Entrar",
      loginSubtitle: "Acesse sua conta para continuar",
      registerTitle: "Criar conta",
      registerSubtitle: "Grátis. Dados salvos com segurança.",
      email: "E-mail",
      emailPlaceholder: "seu@email.com",
      password: "Senha",
      passwordPlaceholder: "Sua senha",
      passwordMin: "Mínimo 6 caracteres",
      confirmPassword: "Confirmar senha",
      confirmPlaceholder: "Repita a senha",
      loginBtn: "Entrar",
      loginBtnLoading: "Entrando...",
      registerBtn: "Criar conta",
      registerBtnLoading: "Criando conta...",
      noAccount: "Ainda não tem conta?",
      createLink: "Criar conta",
      hasAccount: "Já tem conta?",
      loginLink: "Entrar",
      back: "Voltar",
      successTitle: "Conta criada!",
      successMsg: "Verifique seu e-mail para confirmar a conta e depois faça o login.",
      goToLogin: "Ir para o login",
      errorEmpty: "Preencha todos os campos.",
      errorPasswordMin: "A senha deve ter pelo menos 6 caracteres.",
      errorPasswordMatch: "As senhas não coincidem.",
      errorEmailExists: "Este e-mail já está cadastrado.",
      errorInvalid: "E-mail ou senha incorretos.",
    },

    config: {
      title: "Configurações",
      reset: "Resetar",
      saved: "Salvo!",
      saveBtn: "Salvar configurações",
      nextBtn: "Fazer orçamento",

      section1: "Percentuais e Valores Base",
      studioPercent: "Comissão do estúdio",
      materialPercent: "Reserva de material",
      hourlyRate: "Valor da hora",
      tattoosPerYear: "Tatuagens por ano",

      section2: "Preço dos Materiais (por unidade)",
      cartridge: "Cartucho",
      needle: "Agulha avulsa",
      ink: "Tinta (uso)",
      gloves: "Par de luvas",
      transfer: "Papel transfer",

      section3: "Custos Fixos Mensais",
      apps: "Apps e software",
      traffic: "Tráfego pago",

      section4: "Depreciação de Equipamentos (mensal)",
      ipad: "iPad / tablet",
      machine: "Máquina de tatuar",

      section5: "Taxas da Maquininha por Parcelamento",
      section5sub: "Taxa cobrada pela maquininha em cada número de parcelas",
    },

    budget: {
      title: "Orçamento",
      back: "Voltar",

      section1: "Horas de Trabalho",
      sessionHours: "Horas de sessão",
      artHours: "Horas de criação",
      totalHours: "Total de horas cobradas",

      section2: "Materiais Utilizados",
      cartridges: "Cartuchos",
      cartridgesSub: "Cartuchos descartáveis",
      needles: "Agulhas avulsas",
      needlesSub: "Se não usou cartucho",
      inks: "Tintas",
      inksSub: "Quantidade de cores usadas",
      gloves: "Pares de luvas",
      glovesSub: "Trocas durante a sessão",
      transfers: "Papel transfer",
      transfersSub: "Folhas utilizadas",

      section3: "Custos Extras",
      adminCosts: "Gastos administrativos / lanche",
      adminCostsSub: "Custos extras específicos para esta tatuagem",

      calculateBtn: "Calcular preço",
    },

    result: {
      title: "Resultado",
      mainLabel: "VALOR A COBRAR — SEM JUROS",
      afterCommission: "Após comissão do estúdio",
      youReceive: "Você recebe",

      section1: "Composição do custo",
      materials: "Materiais utilizados",
      laborHours: "Horas de trabalho",
      fixedCosts: "Custos fixos rateados",
      adminCosts: "Custos admin / lanche",
      totalCost: "Custo real (valor a receber)",

      section2: "Com juros — maquininha",
      section2sub: "Valores ajustados para cobrir taxa da maquininha e comissão do estúdio",
      totalLabel: "Total",
      rateLabel: "taxa",
      receiveLabel: "Recebe",

      newBudgetBtn: "Novo orçamento",
      configBtn: "Configurações",
    },
  },

  en: {
    currency: "$",
    lang: "EN",
    footer: "Created by Lorena Melo",

    splash: {
      appName: "Tattoo Price Calculator",
      subtitle: "Smart pricing for tattoo artists",
      signIn: "Sign in",
    },

    landing: {
      title: "Pricing Calculator",
      titleHighlight: "for Tattoo Artists",
      subtitle: "Know exactly what to charge for your work.",
      tagline: "No guessing. No losses.",
      benefits: [
        "Includes real material costs per session",
        "Calculates installments with card processing fees",
        "Accounts for equipment depreciation",
        "Spreads monthly fixed costs per tattoo",
      ],
      cta: "Open calculator",
      createAccount: "Create free account",
    },

    auth: {
      loginTitle: "Sign in",
      loginSubtitle: "Access your account to continue",
      registerTitle: "Create account",
      registerSubtitle: "Free. Your data stored securely.",
      email: "Email",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "Your password",
      passwordMin: "At least 6 characters",
      confirmPassword: "Confirm password",
      confirmPlaceholder: "Repeat password",
      loginBtn: "Sign in",
      loginBtnLoading: "Signing in...",
      registerBtn: "Create account",
      registerBtnLoading: "Creating account...",
      noAccount: "Don't have an account?",
      createLink: "Create account",
      hasAccount: "Already have an account?",
      loginLink: "Sign in",
      back: "Back",
      successTitle: "Account created!",
      successMsg: "Check your email to confirm your account, then sign in.",
      goToLogin: "Go to sign in",
      errorEmpty: "Please fill in all fields.",
      errorPasswordMin: "Password must be at least 6 characters.",
      errorPasswordMatch: "Passwords do not match.",
      errorEmailExists: "This email is already registered.",
      errorInvalid: "Invalid email or password.",
    },

    config: {
      title: "Settings",
      reset: "Reset",
      saved: "Saved!",
      saveBtn: "Save settings",
      nextBtn: "Make a quote",

      section1: "Percentages and Base Values",
      studioPercent: "Studio commission",
      materialPercent: "Material reserve",
      hourlyRate: "Hourly rate",
      tattoosPerYear: "Tattoos per year",

      section2: "Material Prices (per unit)",
      cartridge: "Cartridge",
      needle: "Single needle",
      ink: "Ink (use)",
      gloves: "Pair of gloves",
      transfer: "Transfer paper",

      section3: "Monthly Fixed Costs",
      apps: "Apps & software",
      traffic: "Paid traffic / ads",

      section4: "Equipment Depreciation (monthly)",
      ipad: "iPad / tablet",
      machine: "Tattoo machine",

      section5: "Card Processing Fees by Installment",
      section5sub: "Fee charged by card processor for each number of installments",
    },

    budget: {
      title: "Quote",
      back: "Back",

      section1: "Work Hours",
      sessionHours: "Session hours",
      artHours: "Design hours",
      totalHours: "Total billed hours",

      section2: "Materials Used",
      cartridges: "Cartridges",
      cartridgesSub: "Disposable cartridges",
      needles: "Single needles",
      needlesSub: "If cartridge was not used",
      inks: "Inks",
      inksSub: "Number of colors used",
      gloves: "Pairs of gloves",
      glovesSub: "Changes during session",
      transfers: "Transfer paper",
      transfersSub: "Sheets used",

      section3: "Extra Costs",
      adminCosts: "Admin costs / snacks",
      adminCostsSub: "Extra costs specific to this tattoo",

      calculateBtn: "Calculate price",
    },

    result: {
      title: "Result",
      mainLabel: "PRICE TO CHARGE — NO FEES",
      afterCommission: "After studio commission",
      youReceive: "You receive",

      section1: "Cost breakdown",
      materials: "Materials used",
      laborHours: "Labor hours",
      fixedCosts: "Allocated fixed costs",
      adminCosts: "Admin / snack costs",
      totalCost: "Real cost (amount to receive)",

      section2: "With fees — card processor",
      section2sub: "Adjusted values to cover card processing fees and studio commission",
      totalLabel: "Total",
      rateLabel: "fee",
      receiveLabel: "Receive",

      newBudgetBtn: "New quote",
      configBtn: "Settings",
    },
  },
} as const;

export type Translations = typeof translations.pt;
