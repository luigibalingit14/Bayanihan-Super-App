# 🌺 Bayanihan Super App

> **InterCICSkwela Hackathon 2026** — One platform. Six missions. Serving every Filipino.
> 
> **Owner**: [Luigi Balingit](https://github.com/luigibalingit14)
> **Repository**: [https://github.com/luigibalingit14/Bayanihan-Super-App.git](https://github.com/luigibalingit14/Bayanihan-Super-App.git)

A full-stack civic super app built with **Next.js 14**, **Supabase**, **GSAP**, and **Tailwind CSS** that addresses all 6 hackathon challenges through modular, glassmorphism-styled feature pages.

---

## 🚀 Modules

| # | Module | Challenge | Route |
|---|--------|-----------|-------|
| 1 | 🚌 Smart Mobility | Road reporting & transit | `/modules/mobility` |
| 2 | 🔍 VibeCheck PH | Misinformation flagging | `/modules/disinfo` |
| 3 | 🏛️ Good Governance | Budget tracker & complaints | `/modules/governance` |
| 4 | 💼 Jobs & Livelihood | Job board & applications | `/modules/employment` |
| 5 | 🏥 Healthcare Access | Clinic finder & booking | `/modules/healthcare` |
| 6 | 🌾 Agri Connect | Market prices & farmer posts | `/modules/agriculture` |

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom glassmorphism CSS
- **Database**: Supabase (PostgreSQL + RLS)
- **Animations**: GSAP 3
- **Validation**: Zod
- **Deployment**: Vercel

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database
Run `supabase/schema.sql` in your [Supabase SQL Editor](https://supabase.com/dashboard).

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
```

---

## 🗂 Project Structure

```
app/
├── layout.tsx          # Root layout + nav
├── page.tsx            # Dashboard (6 module cards)
├── loading.tsx         # Root skeleton
├── error.tsx           # Error boundary
├── actions/            # Server Actions
│   ├── reports.ts
│   ├── posts.ts
│   └── bookings.ts
└── modules/
    ├── mobility/
    ├── disinfo/
    ├── governance/
    ├── employment/
    ├── healthcare/
    └── agriculture/
components/
├── ui/
│   ├── GlassCard.tsx
│   └── GlassButton.tsx
└── nav/
    └── ResponsiveNav.tsx
lib/
├── supabaseClient.ts
└── animations.ts
supabase/
└── schema.sql
```

---

## 🤖 AI Disclosure

See [AI_DISCLOSURE.md](./AI_DISCLOSURE.md) for full details on AI tool usage.

---

## 📜 License

MIT — Built for hackathon purposes.
