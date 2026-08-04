# SnapForge AI ⚡

<p align="center">
  <b>The Next-Generation Local-First Autonomous AI OS & Multi-Agent Orchestration Platform</b>
</p>

---

## 🌟 Overview

**SnapForge AI** is an open-source, local-first AI agent platform designed for multi-model execution, persistent memory retrieval, natural-language task scheduling, and isolated subagent orchestration. 

Built with a high-performance Python FastAPI backend and a responsive React 19 frontend, SnapForge AI brings state-of-the-art AI OS capabilities directly to your desktop and workspace.

---

## ✨ Key Features

- **🌐 Multi-Model Gateway**: Native integration with Aerolink Claude Gateway, Anthropic, CommandCode, OpenAI, and custom local endpoints with automatic fallback resilience.
- **⚡ Persistent Multi-Dock Dashboard**: Edge-dockable workspace modules including Cookbook, Memory, Research, Tasks, Notes, Email Library, and Document Vault.
- **🧠 Autonomous Agent Execution**: Background task scheduling, tool execution, and reflective task evaluation powered by `@nexus-os/agent-runtime`.
- **🔍 Vector RAG Memory**: High-speed local embeddings using Fastembed & ChromaDB for contextual long-term memory.
- **🎨 Modern Visual Design**: Artisanal UI geometry, dark-mode glassmorphism, dynamic micro-animations, and unified branding across web and dashboard environments.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19, Vite, TanStack Router
- **Styling**: Vanilla CSS with modern custom tokens, dark mode design system
- **TypeScript**: Strict type definitions & router auto-generation

### **Backend**
- **Server**: Python 3.10+ with FastAPI, Starlette & Uvicorn
- **Database**: SQLite (SQLAlchemy / Async Engine)
- **Vector DB**: ChromaDB & Fastembed
- **Networking**: Async HTTPX & PyCurl fallback engines

---

## 🚀 Quick Start

### 1. Clone & Setup Repository

```bash
git clone https://github.com/thesedperson/snapforgeai.git
cd snapforgeai
```

### 2. Frontend Setup

Install dependencies and start the development server:

```bash
# Using npm
npm install
npm run dev

# Or using Bun
bun install
bun run dev
```

### 3. Backend Setup

Initialize Python virtual environment and install backend requirements:

```bash
cd dashboard
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start the dashboard backend server
python app.py
```

Open `http://localhost:8080/dashboard` in your browser to access the live dashboard.

---

## 📁 Repository Structure

```
├── dashboard/               # FastAPI Backend & Dashboard Static Assets
│   ├── app.py              # Main FastAPI Application Entrypoint
│   ├── routes/             # API Endpoint Handlers (LLM, Tasks, Memory, etc.)
│   ├── src/                # Core AI Kernel & Execution Engines
│   └── static/             # Dashboard JS Modules & CSS Styling
├── src/                    # React 19 Frontend Landing Page
│   ├── components/         # UI Components & Site Sections
│   └── routes/             # TanStack App Router & Page Layouts
├── public/                 # Static Assets & Favicons
├── SIH_Blueprint.md        # System Architecture Blueprint
└── README.md               # Project Documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes, feature enhancements, or performance optimizations.

---

## 📄 License

This project is licensed under the MIT License.
