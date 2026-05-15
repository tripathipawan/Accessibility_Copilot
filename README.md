# ♿ AccessCopilot — AI-Powered Accessibility Auditor

> Paste your HTML or React code. Get a WCAG score, detailed issue breakdown, and auto-fixed code — all in under 2 seconds.

**🔗 Live Demo:** `[(https://accesscopilot.vercel.app/)]`

---

## 📌 Table of Contents

1. [What is AccessCopilot?](#what-is-accesscopilot)
2. [Why I Built This](#why-i-built-this)
3. [What It Can Do](#what-it-can-do)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Features In Detail](#features-in-detail)
7. [Scoring System](#scoring-system)
8. [Getting Started](#getting-started)
9. [Environment Variables](#environment-variables)
10. [Known Limitations](#known-limitations)
11. [Challenges & How I Solved Them](#challenges--how-i-solved-them)
12. [What I Learned](#what-i-learned)

---

## 🧠 What is AccessCopilot?

**AccessCopilot** is a web application that audits HTML and React/JSX code for accessibility violations and generates fixed code automatically using AI.

Most developers write inaccessible code not because they don't care — but because they don't know what's wrong. Accessibility checkers like Lighthouse give you a score but don't explain what to actually change. AccessCopilot goes a step further: it tells you what is broken, why it matters, which WCAG rule it violates, and gives you the corrected code right away.

The AI model (Llama 3.3 70B via Groq) analyzes the code, scores it across 6 accessibility categories, lists every issue with severity labels, and produces a complete fixed version — all in one API call.

---

## 💡 Why I Built This

Web accessibility is often treated as an afterthought. Most developers skip it during development and only think about it when they get a bug report or a compliance requirement. At the same time, learning WCAG guidelines from scratch takes time and the tooling around it is either too complex or too shallow.

I built AccessCopilot to make accessibility auditing as simple as pasting code and clicking a button. The goal was to give any developer — beginner or experienced — instant, actionable feedback on how accessible their code is, without needing to read a 200-page spec first.

---

## ✅ What It Can Do

- 🔍 **Audit HTML, React JSX, and TSX code** for WCAG 2.1 violations
- 📊 **Score your code out of 100** across 6 weighted categories
- 🛠️ **Auto-generate fixed code** with correct semantic elements, ARIA attributes, and labels
- 📋 **Show every issue** with type (critical / warning / good), description, affected element, line number, and exact WCAG criteria
- 📄 **Export a full PDF report** with before/after scores and all issue details
- 🗂️ **Save audit history** so you can track how your code improves over time
- 📈 **Dashboard with charts** to visualize audit trends
- 🌙 **Dark and light mode** support
- 🔐 **Authentication** via Clerk so your dashboard is personal

---

## ⚙️ Tech Stack

| Category         | Technology                    |
| ---------------- | ----------------------------- |
| Framework        | React 19 + TypeScript         |
| Build Tool       | Vite 8                        |
| Styling          | Tailwind CSS v4               |
| UI Components    | shadcn/ui + Radix UI          |
| Animations       | Framer Motion 12              |
| State Management | Redux Toolkit + Redux Persist |
| Routing          | React Router v7               |
| Authentication   | Clerk                         |
| AI Model         | Llama 3.3 70B (via Groq API)  |
| Charts           | Recharts                      |
| PDF Export       | jsPDF                         |
| Icons            | Lucide React                  |
| Fonts            | Geist Variable                |

---

## 📁 Project Structure

```
accessibility-copilot/
├── src/
│   ├── components/
│   │   ├── audit/
│   │   │   ├── AuditInput/          # Code input panel (paste, upload, URL tabs)
│   │   │   │   ├── index.tsx        # Tab container with Run Audit button
│   │   │   │   ├── PasteTab.tsx     # Code textarea
│   │   │   │   ├── UploadTab.tsx    # File drag-and-drop
│   │   │   │   └── UrlTab.tsx       # URL input (UI only, needs backend)
│   │   │   ├── AuditResults/        # Results panel shown after audit
│   │   │   │   ├── index.tsx        # Orchestrates all result components
│   │   │   │   ├── ScoreCard.tsx    # Overall score + issue count summary
│   │   │   │   ├── ScoreRing.tsx    # SVG circular score ring
│   │   │   │   ├── CodeViewer.tsx   # Before / After code comparison
│   │   │   │   ├── IssuesPanel.tsx  # List of all detected issues
│   │   │   │   ├── IssueCard.tsx    # Single issue card (type, WCAG, fix)
│   │   │   │   └── LoadingSkeleton.tsx
│   │   │   ├── aiService.ts         # Groq API integration + prompt builder
│   │   │   └── types.ts             # TypeScript types for audit data
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.tsx  # Page header
│   │   │   ├── DashboardStats.tsx   # 4 stat cards (total audits, avg score etc.)
│   │   │   ├── DashboardChart.tsx   # Score trend chart (Recharts)
│   │   │   ├── DashboardAuditList.tsx # Past audit history list
│   │   │   └── DashboardSidebar.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx      # Landing headline + CTA + code demo
│   │   │   ├── TrustedBy.tsx        # Logo scroll strip
│   │   │   ├── StatsSection.tsx     # Animated counter stats
│   │   │   ├── FeaturesSection.tsx  # 6-feature card grid
│   │   │   ├── HowItWorks.tsx       # 3-step process
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── ScoreSection.tsx     # Scoring system explainer with ring + bars
│   │   │   ├── FAQSection.tsx       # Accordion FAQ
│   │   │   └── CTASection.tsx       # Bottom sign-up CTA
│   │   ├── report/
│   │   │   ├── ReportHeader.tsx     # File name, date, score badge
│   │   │   ├── ReportScoreCard.tsx  # Score ring with issue counts
│   │   │   ├── ReportCategories.tsx # Category breakdown bars
│   │   │   ├── ReportCodeViewer.tsx # Before/after code diff
│   │   │   ├── ReportIssues.tsx     # Full issue list
│   │   │   └── ReportActions.tsx    # PDF download + share buttons
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Fixed nav with scroll detection + mobile menu
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx           # Wraps all public pages
│   │   └── ui/                      # shadcn/ui primitives
│   ├── pages/
│   │   ├── Home/                    # Public landing page
│   │   ├── Audit/                   # Main audit tool (protected)
│   │   ├── Dashboard/               # Audit history (protected)
│   │   ├── Report/                  # Full report view (protected)
│   │   └── Auth/                    # Sign in / Sign up (Clerk)
│   ├── store/
│   │   ├── slices/
│   │   │   ├── auditSlice.ts        # Current audit + history state
│   │   │   └── themeSlice.ts        # Dark/light mode toggle
│   │   └── index.ts                 # Redux store + redux-persist config
│   ├── constants/
│   │   └── index.ts                 # NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS
│   ├── hooks/
│   │   └── useAppDispatch.ts        # Typed Redux hooks
│   └── lib/
│       └── utils.ts                 # cn() class utility
├── public/
├── .env                             # API keys (not committed)
├── package.json
└── vite.config.ts
```

---

## 🔬 Features In Detail

### 🎯 Audit Tool

The core of the app. It accepts code in 3 ways:

- **Paste Code** — Type or paste HTML / React / JSX directly into a textarea. The footer shows live line count and file size.
- **Upload File** — Drag and drop or browse to upload a `.html`, `.jsx`, or `.tsx` file. The file content is read client-side.
- **URL Input** — Enter a URL to audit. _(Currently UI-only — see Limitations section.)_

Clicking **Run Audit** sends the code to Groq's API with a carefully structured prompt. The response is parsed and displayed in the results panel on the right side.

### 📊 Results Panel

After the audit, the results panel shows:

- A **score ring** with the overall accessibility score (0–100)
- **Issue counts** broken into critical, warning, and good
- A **before/after code viewer** with syntax highlighting, showing both the original and the AI-fixed version side by side
- A **predicted fixed score** calculated as: `originalScore + (100 - originalScore) × 0.75`
- An **issues panel** listing every detected issue — each one has a type badge, title, description, the specific HTML element that caused it, an optional line number, a suggested fix, and the exact WCAG 2.1 criterion it maps to

### 📋 Full Report Page

Accessible from the audit results via "View Full Report". This is a comprehensive, print-ready page that includes all audit data and has a **PDF export** button powered by jsPDF.

### 📈 Dashboard

A protected page showing:

- 4 stat cards: Total Audits, Critical Issues Found, Average Score, Last Audit Date
- A line chart of score history over time (Recharts)
- A list of all past audits with scores and issue counts
- All data comes from Redux Persist (stored in `localStorage`) — no backend database needed

### 🔐 Authentication

Handled entirely by Clerk. Sign-up / sign-in pages are at `/sign-up` and `/sign-in`. The audit tool, dashboard, and report page are protected routes — unauthenticated users are redirected to sign-in automatically.

### 🌙 Dark Mode

The theme is stored in Redux and toggled via the sun/moon button in the navbar. The preference persists across sessions via Redux Persist.

---

## 📐 Scoring System

Each audit produces a score out of 100. The AI model returns individual scores for 6 categories:

| Category        | Weight |
| --------------- | ------ |
| Semantic HTML   | 20 pts |
| Form Labels     | 20 pts |
| Keyboard Access | 20 pts |
| Image Alt Text  | 15 pts |
| Color Contrast  | 15 pts |
| ARIA Roles      | 10 pts |

The final score is the sum of all category scores. A score of 80+ is considered good; below 60 means significant work is needed.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Groq API key (free at [console.groq.com](https://console.groq.com))
- A Clerk account (free at [clerk.com](https://clerk.com))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tripathipawan/Accessibility_Copilot.git
cd Accessibility_Copilot

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Then fill in your keys (see below)

# 4. Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env` file in the root with these values:

```env
# Groq API Keys (get from console.groq.com)
# Two keys are supported for automatic fallback if one hits rate limits
VITE_GROK_API_KEY1=your_first_groq_api_key
VITE_GROK_API_KEY2=your_second_groq_api_key

# Clerk Authentication (get from clerk.com dashboard)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## ⚠️ Known Limitations

| Limitation                         | Details                                                                                                                                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **URL auditing is not functional** | The URL tab is built in the UI but cannot fetch live websites due to CORS restrictions. It would need a backend proxy server to work. For now, copy the page source manually and use the Paste tab. |
| **No persistent backend**          | Audit history is stored in the browser via Redux Persist (`localStorage`). Clearing browser data or using a different device will lose your history.                                                |
| **Rate limits on Groq**            | Groq's free tier has per-minute token limits. The app automatically tries a second API key if the first one fails, but if both hit limits you'll need to wait a minute.                             |
| **Large files may fail**           | Very large components (2000+ lines) can exceed Groq's max token limit of 4096 tokens in a single request. Breaking the file into smaller components is the workaround.                              |
| **Fixed score is an estimate**     | The "score after fix" shown in the results is not a real second audit — it is calculated as a 75% improvement estimate. Running a fresh audit on the fixed code will give the actual score.         |
| **No real-time collaboration**     | This is a single-user tool. There is no sharing, team workspaces, or real-time collaboration.                                                                                                       |

---

## 🧩 Challenges & How I Solved Them

### 1. 🔄 AI Returning Inconsistent JSON Format

This was the most frustrating issue during development. Groq's model sometimes returned the response wrapped in markdown code fences (` ```json ... ``` `), sometimes with extra explanation text before the JSON, and occasionally with escaped characters that broke `JSON.parse()`.

I wrote a `parseResponse()` function that strips markdown fences using regex before parsing, and a `formatFixedCode()` function that handles escaped newlines (`\n`), tabs (`\t`), and quotes from the AI response. I also set `temperature: 0.1` in the API call to make the model's output more deterministic and consistent. I researched how other developers handled LLM output parsing and found that strict prompt engineering (adding "Return ONLY a valid JSON object. No markdown, no backticks") combined with a cleanup function was the most reliable approach.

### 2. 🔑 API Rate Limits Causing Silent Failures

Groq's free tier throttles requests after a certain number of tokens per minute. Early on, users would see a generic error when the API failed, with no way to recover. I solved this by implementing a **key rotation system** — the app stores 2 Groq API keys and automatically falls back to the second key if the first one returns an error. The retry logic is inside `runAudit()` in `aiService.ts`. I also added specific error messages so the user knows whether to wait or try again.

### 3. 💾 Persisting Audit History Without a Database

Building a backend database was out of scope for this project, but users still needed their audit history to survive a page refresh. I used **Redux Persist** with `localStorage` as the storage engine. The challenge was configuring it correctly — `redux-persist` requires a specific setup with `PersistGate` and the store needs to be structured so only the `audit.history` slice is persisted, not the loading/error states. I read through the redux-persist documentation and looked at examples on GitHub to get the configuration right.

### 4. 📱 Making the Layout Responsive

The audit page has a two-column layout (input panel on the left, results on the right) that doesn't translate well to mobile. The original layout broke on screens under 768px. I restructured it using Tailwind's responsive grid utilities — on mobile, the columns stack vertically, with the results panel appearing below the input. The navbar also needed a separate mobile menu with an animated drawer using Framer Motion's `AnimatePresence`.

### 5. 🔗 Fixed Navbar Breaking Anchor Scroll

After adding a fixed navbar (height 64px), clicking the "Scoring System" link in the nav would scroll to the section but hide the top 64px behind the navbar. I solved this by adding `scroll-mt-20` (Tailwind's `scroll-margin-top` utility) to the target section. This is a CSS-native solution that tells the browser to add extra scroll margin when jumping to an anchor — no JavaScript needed.

---

## 📚 What I Learned

Working on this project taught me several things I had not used in depth before:

- **Prompt engineering for structured output** — Getting an LLM to return consistent, parseable JSON requires very specific prompt design, not just asking nicely
- **Redux Persist** — Setting up persistent state without a backend is a legitimate and practical pattern for client-side apps
- **Clerk authentication** — Integrating a full auth system with protected routes in under an hour, which would have taken days with a custom solution
- **Framer Motion's `AnimatePresence`** — Handling enter/exit animations for components that mount and unmount conditionally
- **Groq API** — A faster and cheaper alternative to OpenAI for inference on open-source models, with a very clean API that mirrors the OpenAI format

---

## 📬 Contact

**Pawan Tripathi**
GitHub: [@tripathipawan](https://github.com/tripathipawan)

---

> Built with curiosity, a lot of debugging, and genuine care for making the web more accessible. 🌐
