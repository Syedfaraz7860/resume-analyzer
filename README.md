# resume-analyzer
Resume Analyzer – A MERN-based web application that analyzes resumes, extracts key information, evaluates skills and sections, generates a resume score, and provides personalized improvement suggestions using rule-based analysis.
# 📄 Resume Analyzer

A full-stack **MERN-based Resume Analyzer** that allows users to upload resumes and automatically analyze their content using rule-based processing.

The application extracts resume text, detects technical skills, checks important resume sections, calculates a resume score, and provides suggestions to improve the resume.

> **Note:** This project uses rule-based analysis and does not require a paid AI/API key.

---

## 🚀 Features

* 🔐 User Signup & Login
* 📄 Resume Upload
* 📑 PDF, DOCX, TXT, XLSX and XLS support
* 🔍 Resume text extraction
* 💻 Technical skill detection
* 📊 Resume score calculation
* 📌 Missing skills detection
* 📚 Resume section detection
* 📧 Email and phone detection
* 🔗 GitHub and LinkedIn profile detection
* 💪 Strengths identification
* ⚠️ Weakness detection
* 💡 Resume improvement suggestions
* 📈 Analysis results dashboard
* 🗄️ MongoDB data storage

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer

### Resume Processing

* pdf-parse
* Mammoth
* SheetJS / XLSX

---

## 📂 Project Structure

```text
resume/
│
├── backend/
│   ├── config/
│   ├── controler/
│   ├── model/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── app.js
│   └── package.json
│
├── resume-analyzer/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd resume
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create Backend `.env`

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start Backend

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:4500
```

---

## 💻 Frontend Setup

Open

