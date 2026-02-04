# JobBuddyAi Frontend

A modern, minimalist authentication frontend for JobBuddyAi - your AI-powered job search companion.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript

## Features

- 🔐 **Authentication Pages**
  - User registration
  - Login
  - Forgot password
  - Reset password

- 🎨 **Design**
  - Minimalist white/black/ash theme
  - Responsive layouts
  - Clean, modern UI

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start with Turbopack (faster)
pnpm dev:turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm dev:turbo` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm type-check` | TypeScript type checking |

## Project Structure

```
frontend/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── auth/
│   └── ui/
└── lib/
    ├── api.ts
    ├── auth-context.tsx
    └── utils.ts
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
