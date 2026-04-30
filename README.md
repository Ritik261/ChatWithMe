# 🤖 ChatWithMe - Intelligent RAG-Based Chat Application

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com/)

**ChatWithMe** is a powerful Retrieval-Augmented Generation (RAG) backend built with FastAPI. It allows users to upload documents and chat with them using advanced AI models, leveraging Supabase for storage and LangChain for retrieval logic.

---

## ✨ Key Features

- 📂 **Smart File Upload**: Easily upload documents and have them processed for retrieval.
- 💬 **Contextual Chat**: Ask questions about your uploaded documents and get accurate, AI-generated answers.
- 🚀 **FastAPI Backend**: High-performance, asynchronous API endpoints.
- 🛠️ **RAG Architecture**: Uses FAISS for efficient similarity search and LangChain for building robust LLM chains.
- ☁️ **Supabase Integration**: Securely manage your data and file storage.

---

## 🛠️ Tech Stack

- **Backend Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **AI Framework**: [LangChain](https://www.langchain.com/)
- **Vector Database**: [FAISS](https://github.com/facebookresearch/faiss)
- **Database & Storage**: [Supabase](https://supabase.com/)
- **Language**: Python 3.x

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.10+
- A Supabase Account

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/Ritik261/ChatWithMe.git
cd ChatWithMe
```

Set up a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r backend/requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory with the following:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Running the Application
```bash
cd backend
uvicorn app.main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

---

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check route |
| `POST` | `/upload` | Upload a file to the RAG system |
| `POST` | `/chat` | Send a query to the RAG system |

---

## 📁 Project Structure

```text
ChatWithMe/
├── backend/
│   ├── app/
│   │   ├── model/         # Data models (Pydantic)
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic (RAG, Uploads)
│   │   └── main.py        # Entry point
│   ├── requirements.txt
│   └── .env               # Environment variables (git ignored)
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ by <a href="https://github.com/Ritik261">Ritik Singh</a></p>
