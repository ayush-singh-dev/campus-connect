# 🎓 Smart Campus

### AI-Powered Academic Discussion and Learning Platform

Smart Campus is a full-stack academic discussion platform designed to connect students and teachers in a collaborative digital learning environment.

The platform allows students to join academic channels, ask questions, receive answers from teachers and peers, and use AI-powered features to improve their learning experience.

---

## 🚀 Live Demo

🌐 **Live Project:** https://campus-connect-vert-two.vercel.app/

💻 **GitHub Repository:** https://github.com/ayush-singh-dev/campus-connect

> The live application is deployed using Vercel.

---

## 📌 Problem Statement

Traditional academic discussions are often scattered across messaging applications, classroom discussions, and different learning platforms.

Students may struggle to:

- Ask questions in the right academic context
- Find useful answers later
- Identify reliable teacher responses
- Improve poorly written questions
- Get quick explanations when teachers are unavailable
- Track their academic participation

Smart Campus addresses these problems by providing a centralized academic discussion and learning platform with AI assistance.

---

## 💡 Solution

Smart Campus provides a structured environment where:

- Teachers create academic channels
- Students join channels using access codes
- Students post academic questions
- Teachers and students can answer questions
- Questions and answers can be voted on
- Teachers receive verified badges
- AI helps improve student questions
- AI Professor generates educational explanations
- Students can maintain profiles and achievements
- Academic activity can be synchronized in real time

---

# ✨ Features

## 👨‍🎓 Student Features

- Student authentication
- Join academic channels
- View joined courses/channels
- Ask academic questions
- Add descriptions and tags
- Improve questions using AI
- View teacher and student answers
- Vote on questions
- Track personal questions
- Manage profile information
- Add academic achievements
- View academic statistics
- View leaderboard

---

## 👨‍🏫 Teacher Features

- Teacher authentication
- Create academic channels
- Generate channel access codes
- Manage created channels
- View questions from their channels
- Answer student questions
- Teacher verification badge
- Monitor academic discussions

---

## 🤖 AI Features

### AI Question Improvement

Students can use AI to improve the quality and clarity of their questions before posting.

The system helps transform unclear questions into more structured academic questions.

### AI Professor

The AI Professor generates educational responses containing:

- Explanation
- Key points
- Examples
- Step-by-step guidance
- Learning resources
- Diagrams where applicable

The goal is not simply to provide an answer, but to help students understand the concept.

---

## ⚡ Realtime Collaboration

Smart Campus is designed to support realtime academic discussions using Supabase Realtime.

Realtime updates can be used for:

- New questions
- New answers
- Question votes
- Channel updates
- Profile updates

This allows connected users to see changes without manually refreshing the page.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Students       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │   Vite + Tailwind    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐    ┌────────────┐   ┌────────────┐
        │  Clerk   │    │  Supabase  │   │  Gemini AI │
        │   Auth   │    │ PostgreSQL │   │    API     │
        └──────────┘    └─────┬──────┘   └────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              Supabase Realtime    Edge Functions
                    │                   │
                    ▼                   ▼
              Live Updates        AI Processing

```


```markdown
# 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Routing | React Router |
| Authentication | Clerk |
| Database | Supabase PostgreSQL |
| Backend | Supabase Edge Functions |
| Realtime | Supabase Realtime |
| AI | Google Gemini API |
| Icons | Lucide React |
| Deployment | Vercel |
| Version Control | Git & GitHub |
