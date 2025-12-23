# Kenmark ITan AI ChatbotThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Live Demo : https://kenmark-chatbot-z7o2.vercel.app/

> **NMIMS Intern Technical Assignment** - Full-stack AI-powered chatbot for Kenmark ITan Solutions## Getting Started



An intelligent chatbot assistant that answers queries about Kenmark ITan Solutions using RAG (Retrieval-Augmented Generation) with knowledge from Excel files and website content.First, run the development server:



🌐 **Company**: [Kenmark ITan Solutions](https://kenmarkitan.com)```bash

npm run dev

---# or

yarn dev

## 🚀 Features# or

pnpm dev

- ✅ **AI-Powered Responses**: Uses local LLM (Ollama) or free APIs (Groq, OpenRouter)# or

- ✅ **RAG Architecture**: Retrieves relevant context before generating responsesbun dev

- ✅ **Excel Knowledge Base**: Loads FAQs and company info from `.xlsx` files```

- ✅ **Floating Chat Widget**: Modern UI with typing indicators and animations

- ✅ **Session Memory**: Chat history persists during user sessionOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- ✅ **Dark Mode**: Full dark mode support with Tailwind CSS

- ✅ **MongoDB Storage**: Knowledge entries and chat logs stored in MongoDB AtlasYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- ✅ **TypeScript**: Fully typed for better developer experience

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Learn More

## 📦 Tech Stack

To learn more about Next.js, take a look at the following resources:

| Category | Technology |

|----------|------------|- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

| **Backend** | Next.js API Routes, Node.js |

| **Database** | MongoDB Atlas, Prisma ORM 7 |You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

| **AI/LLM** | Ollama (local), Groq API, OpenRouter API |

| **Excel Parsing** | xlsx library |## Deploy on Vercel

| **Deployment** | Vercel / Netlify |

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

---

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** 20+ and npm
- **MongoDB Atlas** account (free tier): [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Ollama** (for local LLM) OR **Groq API key** (for cloud LLM)

### 1. Clone the Repository

\`\`\`powershell
git clone <your-repo-url>
cd kenmark-chatbot
\`\`\`

### 2. Install Dependencies

\`\`\`powershell
npm install
\`\`\`

### 3. Configure Environment Variables

Edit `.env` file in the project root:

\`\`\`env
# MongoDB Atlas Connection String
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/kenmark-chatbot?retryWrites=true&w=majority"

# AI Configuration (Choose ONE)

# Option 1: Ollama (Local LLM - Preferred)
OLLAMA_URL="http://localhost:11434"
OLLAMA_MODEL="llama2"

# Option 2: Groq (Free API - Fast)
# GROQ_MODEL="llama-3.1-70b-versatile"
\`\`\`

### 4. Setup Ollama (Option A - Preferred)

\`\`\`powershell
# Install from: https://ollama.com/download
ollama pull llama2
ollama serve
\`\`\`

### 5. Load Knowledge Base

\`\`\`powershell
npx prisma generate
npm run generate-excel
npm run load-knowledge
\`\`\`

### 6. Run Development Server

\`\`\`powershell
npm run dev
\`\`\`



---

## 🧪 Testing

Try these questions:
- "What services do you offer?"
- "Tell me about Kenmark ITan Solutions"
- "How can I contact you?"

---

## 📂 Project Structure

\`\`\`
kenmark-chatbot/
├── src/
│   ├── app/api/chat/route.ts       # Chat API endpoint
│   ├── components/Chatbot.tsx       # Chat widget
│   ├── lib/
│   │   ├── mongodb.ts               # Database connection
│   │   ├── retrieval.ts             # Knowledge search
│   │   └── llm.ts                   # AI integration
│   └── scripts/
│       ├── generate-excel.ts        # Create sample data
│       └── load-knowledge.ts        # Load to MongoDB
├── prisma/schema.prisma
└── public/knowledge/sample-faqs.xlsx
\`\`\`

---

## 🔄 How It Works (RAG Pipeline)

1. **User Query** → Question typed in chat
2. **Retrieval** → Search MongoDB for relevant entries
3. **Context** → Select top 3-5 matches
4. **LLM** → Generate answer using context
5. **Response** → Show with source categories

**Anti-Hallucination**: Only answers from knowledge base. Returns "I don't have that information yet" if no match found.

---

## 🚀 Deployment to Vercel

\`\`\`powershell
git init
git add .
git commit -m "Initial commit"
git push -u origin main
\`\`\`

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Add environment variables (DATABASE_URL, GROQ_API_KEY)
4. Deploy!

Then run: `npm run load-knowledge` with production DATABASE_URL

---

## 📊 Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run generate-excel` - Create sample Excel
- `npm run load-knowledge` - Load Excel to MongoDB
- `npm run prisma:studio` - Open database GUI

---

## 🎨 Customization

### Add Your Own Knowledge

1. Edit `public/knowledge/sample-faqs.xlsx`
2. Format: 3 columns (Category, Question, Answer)
3. Run: `npm run load-knowledge`

---

## 🐛 Troubleshooting

**MongoDB Connection Failed**
- Check DATABASE_URL in `.env`
- Whitelist your IP in MongoDB Atlas (0.0.0.0/0 for all)

**LLM Not Responding**
- Ollama: Run `ollama serve`
- Groq: Check API key validity

**No Knowledge Found**
- Run: `npm run load-knowledge`
- Check with: `npm run prisma:studio`





## 👨‍💻 Developer

**GAURAV SONIGRA**  

Kenmark  NMIMS Internship Assignment



