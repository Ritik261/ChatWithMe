<div align="center">

# 🤖 ChatWithMe

### Intelligent RAG-Powered Document Chat Application

Upload your documents. Ask questions. Get instant AI-powered answers.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python_3.10+-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE)

[Live Demo](https://chatwithme.fastapicloud.dev) · [Report Bug](https://github.com/Ritik261/ChatWithMe/issues) · [Request Feature](https://github.com/Ritik261/ChatWithMe/issues)

</div>

---

## 📖 About

**ChatWithMe** is a full-stack **Retrieval-Augmented Generation (RAG)** application that lets users upload PDF documents and have intelligent conversations with their content. Powered by Azure OpenAI for embeddings & chat completions, Supabase for vector storage, and a modern React frontend with Clerk authentication.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 📂 | **PDF Upload & Chunking** | Upload PDFs that are automatically split, embedded, and indexed for retrieval |
| 💬 | **Contextual AI Chat** | Ask natural-language questions and get accurate, sourced answers from your documents |
| 🔐 | **Clerk Authentication** | Secure sign-in/sign-up with email, Google, and more via Clerk |
| 👤 | **Per-User Document Isolation** | Each user only sees and queries their own uploaded documents |
| ⚡ | **Async & Rate-Limited** | Fully async FastAPI backend with built-in rate limiting for API calls |
| 🚀 | **One-Click Deploy** | Pre-configured for Vercel deployment (frontend + backend) |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Frontend (React + Vite)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ HomePage │  │ ChatPage │  │UploadPage│  │  AboutPage  │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘  │
│        │             │             │                          │
│        └─────────────┴─────────────┘                         │
│                      │  Axios + Clerk Auth                   │
└──────────────────────┼───────────────────────────────────────┘
                       │  REST API
┌──────────────────────┼───────────────────────────────────────┐
│              Backend (FastAPI)                               │
│  ┌───────────────────┴───────────────────────────┐           │
│  │              API Routes                       │           │
│  │   POST /upload  ·  POST /chat  ·  GET /api    │           │
│  └───────────────────┬───────────────────────────┘           │
│            ┌─────────┴──────────┐                            │
│      ┌─────┴─────┐       ┌─────┴─────┐                      │
│      │file_upload│       │ rag_setup │                       │
│      └─────┬─────┘       └─────┬─────┘                      │
│            │                   │                             │
│    ┌───────┴───────┐   ┌───────┴───────┐                     │
│    │  PyMuPDFLoader │   │  LangChain   │                     │
│    │  TextSplitter  │   │  LCEL Chain  │                     │
│    └───────┬───────┘   └───────┬───────┘                     │
│            └───────┬───────────┘                             │
│                    │                                         │
└────────────────────┼─────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
  ┌─────┴──────┐          ┌──────┴───────┐
  │  Supabase  │          │  Azure OpenAI │
  │  pgvector  │          │  Embeddings + │
  │  Documents │          │  Chat (GPT)   │
  └────────────┘          └──────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | Async Python web framework |
| [LangChain](https://www.langchain.com/) | LLM orchestration & RAG chain |
| [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) | Chat completions & text embeddings |
| [Supabase](https://supabase.com/) + pgvector | Vector database & document storage |
| [PyMuPDF](https://pymupdf.readthedocs.io/) | PDF parsing & text extraction |

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Clerk](https://clerk.com/) | Authentication & user management |
| [React Router](https://reactrouter.com/) | Client-side routing |

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+
- **Azure OpenAI** resource with a chat deployment and an embeddings deployment
- **Supabase** project with a `documents` table and `match_documents` RPC function
- **Clerk** application for authentication

### 1. Clone the Repository

```bash
git clone https://github.com/Ritik261/ChatWithMe.git
cd ChatWithMe
```

### 2. Backend Setup

```bash
# Create and activate a virtual environment
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your actual keys (see below)
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Clerk key and backend URL
```

### 4. Environment Variables

<details>
<summary><b>Backend</b> — <code>backend/.env</code></summary>

| Variable | Description |
|---|---|
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI resource endpoint URL |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key |
| `AZURE_OPENAI_API_VERSION` | API version (e.g. `2025-04-14`) |
| `AZURE_OPENAI_CHAT_DEPLOYMENT` | Chat model deployment name |
| `AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT` | Embeddings model deployment name |
| `api_version` | Embeddings API version (e.g. `2024-02-01`) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase service role key |

> See [`backend/.env.example`](backend/.env.example) for a template.

</details>

<details>
<summary><b>Frontend</b> — <code>frontend/.env</code></summary>

| Variable | Description |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `VITE_BACKEND_URL` | Backend API URL (`http://localhost:8000` for local dev) |

> See [`frontend/.env.example`](frontend/.env.example) for a template.

</details>

### 5. Run Locally

```bash
# Terminal 1 — Backend
cd backend
uvicorn app.main:app --reload
# → http://localhost:8000

# Terminal 2 — Frontend
cd frontend
npm run dev
# → http://localhost:5173
```

---

## 🛣️ API Reference

| Method | Endpoint | Description | Auth |
|:---|:---|:---|:---|
| `GET` | `/` | Health check | — |
| `GET` | `/api` | API status check | — |
| `POST` | `/upload?email={email}` | Upload a PDF document | Clerk |
| `POST` | `/chat` | Query documents via RAG | Clerk |

### `POST /upload`

```bash
curl -X POST "http://localhost:8000/upload?email=user@example.com" \
  -F "file=@document.pdf"
```

### `POST /chat`

```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is this document about?", "email": "user@example.com"}'
```

---

## 📁 Project Structure

```
ChatWithMe/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point & CORS config
│   │   ├── model/
│   │   │   └── message_model.py # Pydantic request/response schemas
│   │   ├── routes/
│   │   │   └── chat_route.py    # /upload, /chat, /api endpoints
│   │   └── services/
│   │       ├── file_upload.py   # PDF parsing, chunking & embedding
│   │       ├── rag_setup.py     # LangChain RAG chain & query logic
│   │       └── supabase_client.py # Supabase client initialization
│   ├── requirements.txt
│   ├── vercel.json              # Vercel serverless config
│   ├── .env.example             # Environment variable template
│   └── .env                     # Actual secrets (git-ignored)
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx             # React entry point with Clerk provider
│   │   ├── App.jsx              # Router & layout
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Landing page
│   │   │   ├── ChatPage.jsx     # Chat interface
│   │   │   ├── UploadPage.jsx   # Document upload page
│   │   │   └── AboutPage.jsx    # About page
│   │   └── components/
│   │       ├── Navbar.jsx       # Navigation bar
│   │       ├── Hero.jsx         # Hero section
│   │       ├── ChatSection.jsx  # Chat UI with message bubbles
│   │       ├── UploadSection.jsx# File upload with drag & drop
│   │       ├── LoadingScreen.jsx# Loading spinner
│   │       └── Footer.jsx       # Footer
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json              # Vercel SPA rewrite config
│   ├── .env.example             # Environment variable template
│   └── .env                     # Actual secrets (git-ignored)
│
├── .gitignore
├── LICENSE                      # Apache 2.0
└── README.md
```

---

## ☁️ Deployment

Both the frontend and backend are pre-configured for **Vercel**:

- **Backend**: Uses `@vercel/python` builder with `app/main.py` as the entry point.
- **Frontend**: Standard Vite build (`npm run build`) with SPA rewrite rules.

> **Tip**: Set all environment variables in your Vercel project settings under *Settings → Environment Variables*.

---

## 🗺️ Roadmap

- [ ] Support for `.docx`, `.txt`, and `.csv` file uploads
- [ ] Chat history persistence per user
- [ ] Streaming responses for real-time chat
- [ ] Multi-document cross-referencing
- [ ] Admin dashboard for usage analytics

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

Distributed under the **Apache License 2.0**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

**[⬆ Back to Top](#-chatwithme)**

Made with ❤️ by [Ritik Singh](https://github.com/Ritik261)

[![GitHub](https://img.shields.io/badge/GitHub-Ritik261-181717?style=for-the-badge&logo=github)](https://github.com/Ritik261)

</div>
