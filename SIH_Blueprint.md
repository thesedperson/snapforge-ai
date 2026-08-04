# SnapForge AI: SIH Submission Blueprint (Academic Assistant)

This blueprint maps the technical capabilities of SnapForge AI to the specific use case of an **AI-powered academic assistant for higher education institutions**. It follows the exact 20-slide structure required for the Smart India Hackathon (SIH) presentation, specifically highlighting its core AI feature pillars.

---

### **Slide 1: Cover Slide**
*   **Project Name:** SnapForge AI (Academic Edition) - The Autonomous, Privacy-First University Assistant
*   **Problem Statement ID & Title:** [Insert PS Number] - AI-Powered Academic Assistant for Higher Education Institutions
*   **Team Name:** [Insert Team Name]
*   **Institute:** [Insert Institute Name]
*   **Team Members:** [Insert Team Members]

---

### **Slide 2: Problem Statement**
*   **Existing Problem:** Universities face an overwhelming administrative load, students lack 24/7 personalized academic support, and researchers spend excessive time on literature reviews. Crucially, universities cannot use public cloud AI (like ChatGPT) for unpublished research or sensitive student data due to severe privacy risks (FERPA/GDPR).
*   **Stakeholders:** Students, Professors/Faculty, Researchers, University Administrators.
*   **Pain Points:** Generic rule-based chatbots fail at complex academic queries. Public AI leaks intellectual property.
*   **Statistics:** Faculty spend ~30% of their time on repetitive administrative/student queries.
*   **Why this matters:** Bridging the gap between high-quality AI assistance and strict institutional data privacy is essential for the future of education.

---

### **Slide 3: Existing Solutions & Gap Analysis**
*   **Current Solutions:** Cloud LLMs (ChatGPT, Claude), University LMS Chatbots (Canvas/Moodle basic bots), Perplexity.
*   **Limitations:** Cloud LLMs ingest sensitive university data. LMS bots are rigid and cannot perform multi-step reasoning.
*   **Gap Analysis / Opportunity:** There is a critical need for a **self-hosted, locally run AI agent** that offers cloud-tier intelligence while keeping 100% of the data within the university's firewalls.

---

### **Slide 4: Proposed Solution**
*   **Solution Overview:** SnapForge AI is a fully self-hosted, all-in-one autonomous academic workspace. It replaces fragmented tools by unifying six core pillars under one secure, on-premise system:
    1.  **AI Brain:** The central autonomous agent capable of multi-step reasoning, context management, and routing queries to the correct tool.
    2.  **AI Calendar & Tasks:** Intelligent scheduling for student-faculty meetings, coursework reminders, and automated syllabus tracking.
    3.  **AI Analyser & Comparer:** A tool to blindly compare research papers, analyze datasets, and evaluate the outputs of different local models side-by-side.
    4.  **AI Deep Research:** An automated pipeline that performs iterative *Think -> Search -> Extract -> Synthesize* loops for comprehensive literature reviews.
    5.  **AI Library:** A secure, semantic vector space (RAG) housing all uploaded university policies, syllabi, and internal research archives.
    6.  **AI Document Editor:** A markdown/LaTeX-aware writing environment with real-time AI collaboration for drafting theses and reports.
*   **Value Proposition:** "Cloud-tier AI assistance with absolute institutional data sovereignty."
*   **Innovation & USP:** 100% local model execution ("Cookbook" architecture) seamlessly tied to a unified suite of academic tools.

---

### **Slide 5: Objectives**
*   **Primary Goals:** Provide 24/7 personalized academic tutoring, automate literature reviews for researchers, and streamline faculty administrative tasks securely.
*   **Measurable Outcomes:** Reduce routine student queries to faculty by 40%. Decrease literature review synthesis time by 50%.
*   **Success Criteria:** High accuracy in RAG-based retrieval from the **AI Library**; zero data exfiltration.

---

### **Slide 6: System Architecture**
*   **High-Level Diagram Concept:** 
    *   *User Interface:* React/Vite Frontend (Dashboard, **AI Document Editor**, Chat).
    *   *Agent Core:* Python/FastAPI backend executing the **AI Brain** (`agent_loop.py`).
    *   *Data Layer:* SQLite (relational) + ChromaDB (Vector semantic search powering the **AI Library**).
*   **Data Flow:** User Query -> FastAPI -> **AI Brain** determines intent -> Queries **AI Library** or triggers **AI Deep Research** -> Local Model generates response -> Returns to User.

---

### **Slide 7: Technical Implementation**
*   **Tech Stack:** React 19, TailwindCSS v4, TanStack Router (Frontend); Python 3, FastAPI, SQLAlchemy (Backend).
*   **AI/ML Models:** Local models (e.g., Llama 3 8B, Qwen) via built-in serving, avoiding public API dependency.
*   **Frameworks:** Custom agent loop with Model Context Protocol (MCP) support for tool integration.
*   **Security:** Role-Based Access Control (Admin/Faculty vs. Student), strict prompt-injection hardening, local execution, and encrypted storage (`EncryptedText`).

---

### **Slide 8: Workflow / Methodology**
*   **Step-by-Step Process:**
    1.  **Ingestion:** University uploads syllabus and papers to the **AI Library**.
    2.  **Query:** Student asks a complex question (e.g., "Compare the findings of these two physics papers").
    3.  **Routing:** The **AI Brain** triggers the **AI Analyser & Comparer** to evaluate the documents.
    4.  **Synthesis:** If more context is needed, it triggers **AI Deep Research**.
    5.  **Drafting:** The assistant securely returns a personalized, cited response directly into the **AI Document Editor**.

---

### **Slide 9: Feasibility Analysis**
*   **Technical:** Highly feasible. The core **AI Brain**, RAG pipeline, and Dockerized deployment are already built and tested.
*   **Operational:** Easy to deploy via `docker compose up` on standard university IT infrastructure.
*   **Economic:** Saves universities thousands in recurring SaaS AI licenses by utilizing open-source models on existing hardware.
*   **Legal:** Ensures 100% compliance with data protection laws (FERPA/GDPR/IP policies) since no data leaves the server.

---

### **Slide 10: Innovation & Uniqueness**
*   **Novel Features:** 
    *   The **AI Deep Research** pipeline acts like a tireless PhD assistant, capable of navigating academic databases autonomously.
    *   The **AI Analyser & Comparer** allows researchers to juxtapose hypotheses securely.
*   **Uniqueness:** Unlike fragmented tools (using one app for chat, another for writing), SnapForge tightly couples the **AI Brain** with the **AI Document Editor** and **AI Calendar & Tasks**, creating a seamless, uninterrupted academic workflow.

---

### **Slide 11: Scalability & Sustainability**
*   **Future Growth:** The architecture is decoupled. The FastAPI backend and ChromaDB (**AI Library**) can scale horizontally across multiple nodes.
*   **Deployment Strategy:** Can be deployed centrally by the University IT department, or individually by research labs using the native desktop launchers (macOS/Windows/Linux).

---

### **Slide 12: Impact Analysis**
*   **Social Impact:** Democratizes access to high-quality, personalized tutoring for all students regardless of background.
*   **Economic Impact:** Significant cost reduction for institutions in administrative overhead.
*   **SDGs:** Directly addresses **SDG 4: Quality Education** by enhancing learning environments and educational outcomes.

---

### **Slide 13: Business Model**
*   **Revenue Model:** Open-core model. Free for individual researchers/students. Enterprise licensing and SLA support for institution-wide deployment (B2B SaaS/On-Premise).
*   **Maintenance:** Automated updates via Docker; lightweight SQLite database requires minimal DBA overhead.

---

### **Slide 14: Implementation Roadmap**
*   **Phase 1 (M1-M2):** Core **AI Brain** rollout, **AI Library** integration with basic university documents, Local Model deployment.
*   **Phase 2 (M3-M4):** **AI Deep Research** and **AI Analyser & Comparer** integration for academic literature, advanced UI for the **AI Document Editor**.
*   **Phase 3 (M5-M6):** **AI Calendar & Tasks** integration with standard LMS (Canvas/Moodle/Blackboard), faculty dashboard rollout.

---

### **Slide 15: Risk Analysis**
*   **Risks:** AI Hallucinations providing incorrect academic info; hardware constraints for running large models locally.
*   **Mitigation Strategies:** Strict grounding of the **AI Brain** using the **AI Library** (forcing it to cite university-provided documents); utilizing highly optimized quantized models that run efficiently on consumer hardware.

---

### **Slide 16: Prototype / UI Screens**
*   *Slide Content Idea:* 
    *   Screenshot 1: The **AI Brain** Chat Interface showing a student querying course material.
    *   Screenshot 2: The **AI Document Editor** showing an AI-assisted research draft and the **AI Analyser** view.
    *   Screenshot 3: The **AI Calendar & Tasks** view showing scheduled study sessions.

---

### **Slide 17: Demo Flow**
*   **0:00 - 0:30:** Student asks a complex, multi-part research question.
*   **0:30 - 1:30:** **AI Brain** enters **AI Deep Research** mode, autonomously searching the **AI Library** and academic databases, extracting key points.
*   **1:30 - 2:30:** Agent synthesizes a complete, cited academic report directly into the built-in **AI Document Editor**.

---

### **Slide 18: Future Enhancements**
*   **Planned Features:** Multi-modal support (analyzing recorded lecture videos/audio), direct API integrations with plagiarism checkers (Turnitin), and automated grading assistants for faculty seamlessly tied to the **AI Calendar & Tasks**.

---

### **Slide 19: Team Expertise**
*   *Slide Content Idea:* List team members with their specific roles mapping to the project's needs (e.g., Full-Stack React/Python Dev, AI/ML Engineer handling local models, UI/UX Designer for the artisanal dashboard, Security Specialist).

---

### **Slide 20: Thank You / Q&A**
*   *Slide Content Idea:* Contact details, GitHub repository link, QR Code to a live/video demo.
