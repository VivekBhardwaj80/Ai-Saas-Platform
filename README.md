# AI Interview Mocker 🚀

> An AI-powered SaaS platform that generates interview questions, evaluates answers, and provides detailed feedback — helping job seekers prepare for real-world interviews.

---

## ⚠️ Status

> 🚧 **Under Maintenance** — Core functionality is implemented. Some pages (Questions, Upgrade, How it Works) are currently under maintenance.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 13 (App Router) |
| Authentication | Clerk |
| Database | MongoDB + Mongoose |
| Styling | Tailwind CSS |
| AI Service | Google Gemini API (`@google/genai`) |
| HTTP Client | Axios |
| Icons | Lucide React |
| Webcam | React Webcam |
| Speech-to-Text | React Speech Recognition |
| Notifications | React Hot Toast |

---

## ✅ Features

### Implemented
- 🔐 User authentication and session management via **Clerk**
- 🧑‍💻 Auto-creates MongoDB user on first login
- 📋 Dashboard to create and manage mock interviews
- 🤖 AI-generated interview questions via **Google Gemini API**
- 🎙️ Webcam + microphone-based answer recording
- 🗣️ Speech-to-text transcription using browser's Web Speech API
- 📊 AI-evaluated answers with score, feedback, and expected answer
- 📝 Final interview report (overall rating, strengths, weaknesses, areas to improve)
- 🗑️ Delete interviews from the dashboard
- 📱 Fully responsive UI with Tailwind CSS

### Upcoming
- 📈 Analytics dashboard with performance charts
- 📄 Exportable interview PDF reports
- 🌍 Multi-language support
- 💳 Subscription/upgrade system

---

## 📂 Project Structure

```
ai-saas-platform/
│
├── app/
│   ├── (auth)/                        # Clerk auth pages (sign-in, sign-up)
│   ├── api/
│   │   ├── interview/
│   │   │   ├── [id]/                  # GET, DELETE interview by ID
│   │   │   │   └── route.ts
│   │   │   ├── report/
│   │   │   │   └── [id]/route.ts      # GET final AI report
│   │   │   ├── start/
│   │   │   │   ├── route.ts           # POST start interview (generate questions)
│   │   │   │   └── evaluate/route.ts  # POST evaluate answer
│   │   │   └── total/
│   │   │       └── route.ts           # GET all interviews for a user
│   │   └── user/
│   │       └── route.ts               # GET / auto-create current user
│   ├── dashboard/
│   │   ├── interview/
│   │   │   └── [interview]/
│   │   │       ├── page.tsx           # Interview detail + webcam page
│   │   │       ├── start/page.tsx     # Start interview (Q&A flow)
│   │   │       └── feedback/page.tsx  # View feedback & scores
│   │   ├── questions/page.tsx         # 🚧 Under Maintenance
│   │   ├── upgrade/page.tsx           # 🚧 Under Maintenance
│   │   ├── work/page.tsx              # 🚧 Under Maintenance
│   │   ├── layout.tsx                 # Dashboard layout (with Header)
│   │   └── page.tsx                   # Main dashboard
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/                            # Shadcn/Tailwind UI primitives
│   ├── AddNewInterview.tsx            # Dialog to create new interview
│   ├── Header.tsx                     # Navigation bar
│   ├── InterviewItemCard.tsx          # Card: start, feedback, delete
│   ├── InterviewList.tsx              # Grid of previous interviews
│   ├── QuestionSection.tsx            # Question display + TTS
│   └── RecordAnswerSection.tsx        # Webcam + mic + speech-to-text
│
├── models/
│   ├── mockInterview.model.ts         # Interview Mongoose schema
│   ├── user.model.ts                  # User Mongoose schema
│   └── finalReport.ts                 # Report schema
│
├── services/
│   └── ai.service.ts                  # Gemini API: generate / evaluate / report
│
├── utils/
│   └── db.ts                          # MongoDB connection helper
│
├── types/
│   └── types.ts                       # Shared TypeScript types (Question, etc.)
│
├── lib/
├── public/
│   ├── logo.svg
│   └── webCamImage.png
│
├── .env.local                         # Environment variables (not committed)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json
└── README.md
```

---

## 🔌 API Reference

### Interview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/interview/start` | Start interview — generates AI questions |
| `POST` | `/api/interview/start/evaluate` | Evaluate a candidate's answer |
| `GET` | `/api/interview/:id` | Fetch interview by ID |
| `DELETE` | `/api/interview/:id` | Delete interview by ID |
| `GET` | `/api/interview/report/:id` | Generate final AI report |
| `GET` | `/api/interview/total?userId=` | Get all interviews for a user |

### User

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/user` | Get or auto-create current Clerk user in MongoDB |

---

## 🧩 Components Overview

### `Header.tsx`
Navigation bar with links to **Dashboard**, **Questions**, **Upgrade**, and **How it Works**. Uses `usePathname` to highlight the active route. Dynamically loads `UserButton` from Clerk with `ssr: false`.

### `AddNewInterview.tsx`
Dialog form to create a new interview. Collects:
- Job Position, Job Description, Level (`junior` / `mid` / `advance`), Question Count

Sends a `POST` to `/api/interview/start` and redirects to the interview page on success.

### `InterviewList.tsx`
Fetches all previous interviews from `/api/interview/total` filtered by the current Clerk user ID. Renders an `InterviewItemCard` for each result.

### `InterviewItemCard.tsx`
Card for each interview showing position, level, and creation date. Supports:
- **Start** → navigate to interview page
- **Feedback** → navigate to feedback page
- **Delete** → calls `DELETE /api/interview/:id` and removes from UI

### `QuestionSection.tsx`
Renders all question tabs and highlights the active one. Shows the current question text with a **Text-to-Speech** button using the Web Speech API.

### `RecordAnswerSection.tsx`
Webcam preview + microphone recording UI. Uses `react-speech-recognition` for speech-to-text. On stop, sends the transcribed answer to `/api/interview/start/evaluate`.

---

## 🤖 AI Service (`services/ai.service.ts`)

Built on `@google/genai` with `gemini-3-flash-preview` model.

### `generate(params)`
Generates `count` interview questions for the given `position`, `description`, and `level`. Returns a JSON array of `{ question, answer, level }`.

### `evaluateAnswer(question, answer, level, position)`
Evaluates a candidate's answer and returns:
```json
{
  "score": 0-10,
  "feedback": "detailed feedback string",
  "correctAnswer": "ideal answer string"
}
```
Includes automatic retry on `429 Rate Limited` with a 7-second delay.

### `finalReport(interview)`
Analyzes all answered questions and returns:
```json
{
  "overallRating": 7,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "areasToImprove": ["..."]
}
```

---

## 🔐 Authentication (Clerk)

- All protected API routes use `currentUser()` from `@clerk/nextjs/server`
- Returns `401 Unauthorized` if not logged in
- On first login, a MongoDB `User` document is auto-created with `clerkId`, `email`, `firstName`, `lastName`, `imageUrl`
- Client-side: `useUser()` and dynamic `<UserButton />` component

---

## 🗄️ Database Models

### `mockInterview.model.ts`
```
user         → ObjectId (ref: User)
clerkId      → String
position     → String
description  → String
level        → "junior" | "mid" | "advance"
count        → Number
totalScore   → Number
questions[]  → { question, answer, level, userAnswer, score, feedback, expectedAnswer }
```

### `user.model.ts`
```
clerkId    → String (unique)
email      → String
firstName  → String
lastName   → String
imageUrl   → String
```

---

## 🔁 User Flow

```
1. User signs in via Clerk
        ↓
2. /api/user auto-creates MongoDB user on first visit
        ↓
3. Dashboard: click "+ Add New" → fill form → POST /api/interview/start
        ↓
4. Gemini AI generates questions → stored in MongoDB
        ↓
5. User lands on Interview page → enables webcam
        ↓
6. Start Interview → answer questions via microphone
        ↓
7. Each answer → POST /api/interview/start/evaluate → AI scores & stores
        ↓
8. Submit Interview → GET /api/interview/report/:id → final AI report
        ↓
9. Feedback page shows: scores, strengths, weaknesses, areas to improve
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ai-saas-platform.git
cd ai-saas-platform

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Fill in your keys

# 4. Run the development server
npm run dev
```


---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Vivek Sharma** — [GitHub](https://github.com/VivekBhardwaj80)

---

> Built with ❤️ using **Next.js**, **Tailwind CSS**, **MongoDB**, **Clerk**, and **Google Gemini AI**