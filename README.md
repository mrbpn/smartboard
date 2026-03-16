# DeepBoard — Smart Classroom Platform

AI-powered lesson management web app for Dahua DeepHub smartboards.
Built with Next.js 14, TypeScript, Tailwind CSS, Zustand, Recharts, Socket.io.

---

## Pages

| Route | Description |
|---|---|
| `/login` | Teacher sign-in |
| `/register` | New account |
| `/dashboard` | Overview, analytics, quick actions |
| `/lessons` | Lesson library (grid, filter, search) |
| `/lessons/new` | Create lesson — manual or AI-generated |
| `/lessons/[id]` | Slide editor |
| `/quizzes` | Quiz library + live session launcher |
| `/quizzes/new` | Quiz builder + AI question generator |
| `/whiteboard` | Full interactive canvas (pen, marker, eraser, shapes, OCR) |
| `/recordings` | Session recordings with video player |
| `/settings` | Profile, notifications, security, API keys |
| `/join/[code]` | Student quiz join page (no auth) |

---

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub

```bash
cd smartboard-app
git init
git add .
git commit -m "Initial commit — DeepBoard"
gh repo create smartboard-app --public --push
```

### 2. Import in Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Add environment variables (see below)
5. Click **Deploy**

### 3. Environment variables (set in Vercel dashboard)

```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://api.your-backend.com/v1
NEXT_PUBLIC_WS_URL=wss://api.your-backend.com
```

> API keys (Gemini, Cloud Vision) go in the **backend** `.env` — never in Vercel.

---

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
# → http://localhost:3000
```

Demo credentials: `teacher@school.edu` / `password`

---

## Project structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── (auth)/            # Login + register (no sidebar)
│   ├── dashboard/         # Main dashboard
│   ├── lessons/           # Lesson management
│   ├── quizzes/           # Quiz management + live sessions
│   ├── whiteboard/        # Interactive canvas
│   ├── recordings/        # Session recordings
│   ├── settings/          # Account settings
│   └── join/[code]/       # Student quiz join (public)
├── components/
│   ├── ui/                # Button, Card, Modal, Input, Badge, EmptyState
│   ├── layout/            # Sidebar, AppLayout, PageHeader
│   └── dashboard/         # StatCard
├── lib/
│   ├── api.ts             # Axios client + all API endpoints
│   ├── store.ts           # Zustand auth store
│   ├── utils.ts           # Helpers
│   └── mock.ts            # Demo data (replace with real API)
├── types/
│   └── index.ts           # All TypeScript interfaces
└── styles/
    └── globals.css        # Cormorant Garamond + DM Sans + animations
```

---

## Connecting to the backend

Replace mock data with real API calls:

```typescript
// Example: replace MOCK_LESSONS in lessons/page.tsx
import { lessonsApi } from "@/lib/api";
const { data } = await lessonsApi.list({ status: "published" });
```

All API functions are ready in `src/lib/api.ts`.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design system |
| State | Zustand (auth + persist) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP | Axios (auto JWT refresh) |
| Real-time | Socket.io client |
| Fonts | Cormorant Garamond + DM Sans + DM Mono |
| Deploy | Vercel |
