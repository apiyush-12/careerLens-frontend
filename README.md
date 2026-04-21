# 🚀 CareerLens - Smart Career and Skill Gap Analyzer

CareerLens is an AI-powered career guidance platform that analyzes user resumes, identifies skill gaps based on a target role, and generates personalized learning roadmaps to help users become job-ready.

## 📌 Features

* 📄 **Resume Upload & Parsing**

  * Upload PDF resumes
  * Extract skills using NLP techniques

* 🎯 **Career Goal Selection**

  * Choose target roles (Frontend, Backend, Data Scientist, etc.)

* 📊 **Skill Gap Analysis**

  * Compare user skills with industry-required skills
  * Show:

    * ✅ Matched Skills
    * ❌ Missing Skills
    * 📈 Readiness Score

* 📈 **Data Visualization**

  * Graphical representation of skill distribution

* 🧠 **Learning Roadmap**

  * Personalized roadmap based on missing skills
  * Structured in phases with learning modules

* 🔐 **Authentication**

  * Login / Signup using Supabase
  * Forgot Password & Reset Password flow


## 🛠️ Tech Stack

### 🔹 Frontend

* Next.js (React Framework)
* TypeScript
* Tailwind CSS
* ShadCN UI
* Recharts (for charts)
* Supabase Auth (client)

### 🔹 Backend

* Python
* Flask
* Flask-CORS
* pdfplumber (Resume parsing)
* pdfminer.six
* Supabase (Python SDK)

### 🔹 Deployment

* Vercel (Frontend)
* Render (Backend)


## 📂 Project Structure

```
CareerLens/
│
├── Frontend/              # Next.js App
│   ├── app/
│   ├── components/
│   ├── lib/
│
├── backend/               # Flask API
│   ├── app.py
│   ├── skill_gap.py
│   ├── resume_parser.py
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/careerLens.git
cd careerLens
```

---

### 🔹 2. Backend Setup (Flask)

```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file:

```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
```

Run server:

```bash
python app.py
```

---

### 🔹 3. Frontend Setup (Next.js)

```bash
cd Frontend
npm install
npm run dev
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## 🌐 API Endpoints

| Endpoint         | Method   | Description                    |
| ---------------- | -------- | ------------------------------ |
| `/resume/upload` | POST     | Upload resume & extract skills |
| `/skill-gap`     | POST     | Analyze skill gap              |
| `/roadmap`       | POST     | Generate learning roadmap      |
| `/skills`        | GET/POST | Manage user skills             |

---

## 🚀 Deployment

### 🔹 Backend (Render)

* Build Command: `pip install -r requirements.txt`
* Start Command: `python app.py`
* Add environment variables in Render dashboard

### 🔹 Frontend (Vercel)

* Connect GitHub repo
* Add environment variables:

  * `NEXT_PUBLIC_SUPABASE_URL`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🧠 How It Works

1. User selects a **target career role**
2. Uploads their **resume**
3. Backend extracts **skills**
4. System compares with **required role skills**
5. Generates:

   * Skill Gap Analysis
   * Readiness Score
6. Missing skills are used to generate a **Learning Roadmap**

---

## 📸 Screenshots

<img width="1920" height="911" alt="{F9330CBC-5987-4CAD-BAED-93EA18AB472A}" src="https://github.com/user-attachments/assets/6546f3b2-1f45-42ea-907c-62e6a4aa0d21" />


---

## 🎯 Future Improvements

* AI-based skill extraction using advanced NLP
* Personalized recommendations using ML models
* Integration with job APIs
* Real-time progress tracking
* Resume improvement suggestions

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and improve the project.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Piyush Kumar**

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
