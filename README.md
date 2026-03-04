# Pdify - AI PDF Summarizer 📄✨

Transform any PDF into concise summaries instantly with Pdify. This application uses Google's Gemini AI to analyze your PDF documents and generate beautiful, actionable, and structured "summary reels" in seconds.

## 🚀 Features

- **AI-Powered Summaries**: Leverage Google Gemini to deeply understand and summarize complex PDFs.
- **Fast & Secure Uploads**: Upload documents securely utilizing UploadThing.
- **Seamless Authentication**: User management and protected routes powered by Clerk.
- **Fully Responsive UI**: A beautiful, premium, and fully responsive design across all devices (Mobile to 4K Desktop) built with Tailwind CSS v4 and Framer Motion.
- **Dashboard Archive**: Authenticated users can access all their past PDF summaries in their personal dashboard.
- **Modern Architecture**: Built on the bleeding edge using Next.js 16 (App Router) and React 19.

---

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [Lucide React](https://lucide.dev/) (Icons)
- [Shadcn UI](https://ui.shadcn.com/) (Accessible Components)

**Backend & Infrastructure:**
- **AI Engine:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
- **Authentication:** [Clerk](https://clerk.com/)
- **File Storage:** [UploadThing](https://uploadthing.com/)
- **Database:** [Neon Serverless Postgres](https://neon.tech/)

---

## 🏃‍♂️ Local Development

### Prerequisites
Make sure you have Node.js 18+ installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/aditya4635/pdf-summary.git
cd pdf-summary
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` or `.env.local` file in the root of your project and add the following keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# UploadThing (Storage)
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Database (Neon Serverless Postgres)
DATABASE_URL=your_neon_database_connection_string

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the Development Server
```bash
npm run dev
```

The application will be running at `http://localhost:3000`.

---

## 📜 Scripts

- `npm run dev`: Starts the local development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the compiled production build.
- `npm run lint`: Runs ESLint to catch syntax and styling issues.

---

## 🎨 Design Philosophy
Pdify prioritizes a "premium feel" with a clean, dark-mode accessible UI, leveraging glassmorphism effects, dynamic CSS variables, and fluid motion animations to ensure the user experience feels instantaneous and high-quality.
