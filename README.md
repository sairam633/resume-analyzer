# 📄 Resume Analyzer

An AI-powered web application that analyzes resumes, extracts structured data, and provides actionable feedback & upskilling suggestions.  
Built as part of the NXTwave placement assignment.

---

## 🚀 Features
- Upload resumes (PDF format).
- Extracts key information (contact info, education, experience, skills).
- AI-driven analysis using **Google Gemini API**.
- Resume rating (1–10) + improvement areas.
- Personalized upskilling suggestions.
- Local browser history (resumes are stored in Local Storage, not mixed with other users).
- Clean UI with loader, modals, and history table.
- One-click **Clear History** button.

---

## 🛠️ Tech Stack
- **Frontend**: React + Styled Components  
- **Backend**: Node.js + Express  
- **Database**: PostgreSQL (Neon for deployment, but history disabled in final version)  
- **AI Integration**: Google Gemini API (`@google/generative-ai`)  
- **Deployment**:  
  - Backend → Render  
  - Frontend → Vercel  

---

## 📂 Project Structure


resume-analyzer/
├── backend/ # Express.js backend
├── frontend/ # React frontend
├── sample_data/ # PDFs for testing
├── screenshots/ # UI screenshots
└── README.md # Project documentation



Backend Setup

cd backend
npm install


Create .env file:

PORT=5000
DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=resume_analyzer
DB_PASSWORD=your_postgres_password
DB_PORT=5432
GOOGLE_API_KEY=your_gemini_api_key



Run locally:

Run locally:


Frontend Setup

cd frontend
npm install
npm start



Deployment

Backend deployed on Render → https://your-backend.onrender.com

Frontend deployed on Vercel → https://your-frontend.vercel.app


Evaluation Criteria

Code Quality: Modular, well-documented.

Data Extraction: Accurate structured fields.

AI Suggestions: Relevant and actionable.

UI/UX: Clean, intuitive, responsive.

Robustness: Handles missing data & errors.


Author

Sai Ram V.V. – Developer

ChatGPT (OpenAI GPT-5) – Guidance, architecture & code generation


