# Tattoo Price Calculator

A bilingual web application that helps tattoo artists calculate fair pricing for their work, considering materials, equipment depreciation, fixed costs, and payment processing fees.

**Live app:** [ink-price.vercel.app](https://ink-price.vercel.app)

---

## Overview

Pricing tattoos is complex. Artists need to account for session time, consumable materials, equipment wear, studio fees, and card machine rates — all while staying competitive. This calculator automates that math, giving artists a clear breakdown of costs and a final price that ensures profitability.

### Features

- **Cost calculation** — Materials per session, equipment depreciation, fixed monthly costs
- **Installment simulation** — Shows price adjustments for 2x to 10x payments with card machine fees
- **Bilingual interface** — Full support for Portuguese (BRL) and English (USD)
- **User authentication** — Secure login with Supabase Auth
- **Responsive design** — Works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Routing | Wouter |
| Auth | Supabase Auth |
| Deployment | Vercel |
| Package Manager | pnpm (monorepo) |

---

## Project Structure

```
artifacts/tattoo-calc/
├── src/
│   ├── components/     # UI components
│   ├── contexts/       # React contexts (Auth, Language)
│   ├── pages/          # Route pages
│   ├── lib/            # Supabase client, utilities
│   └── App.tsx         # Main app component
├── public/             # Static assets
└── vite.config.ts      # Vite configuration
```

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/lorenamelos/Tattoo-Calculator-pro.git
cd Tattoo-Calculator-pro

# Install dependencies
pnpm install

# Start development server
pnpm --filter @workspace/tattoo-calc run dev
```

### Environment Variables

Create a `.env` file in `artifacts/tattoo-calc/` with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Building for Production

```bash
pnpm --filter @workspace/tattoo-calc run build
```

Output is generated in `artifacts/tattoo-calc/dist/` — static files ready for deployment.

---

## Screenshots

| Splash Screen | Calculator | Results |
|---------------|------------|---------|
| Dark blue splash with language selector | Input form for hours, materials, costs | Price breakdown with installment table |

---

## Background

This project started as an Excel spreadsheet I sold on Hotmart when I worked as a tattoo artist. The spreadsheet helped artists price their work correctly, but it had limitations — hard to use on mobile, no cloud sync, manual updates.

Converting it to a web app solved those problems while also serving as a portfolio piece demonstrating:

- Full-stack development (React + Supabase)
- Authentication implementation
- Internationalization (i18n)
- Deployment pipeline (GitHub → Vercel)

---

## Author

**Lorena Melo** — AI Engineer

- [LinkedIn](https://linkedin.com/in/lorenameloengr)
- [GitHub](https://github.com/lorenamelos)
- [Portfolio](https://lorenamelos.github.io)

---

## License

MIT
