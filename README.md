# AI Website Generator 🌐🤖

A full-stack web application that allows users to generate responsive websites by simply entering prompts in **English, Hindi**, or any other language — no coding required!

## 🚀 Live Website

🔗 [Visit Live Site](https://ai-website-generator.vercel.app)

## 🧠 How It Works

- Users enter a description like "I want a portfolio website for a web developer" in any language.
- The backend (Node.js) classifies the prompt and sends a matching custom HTML template.
- The frontend (React) previews the result live and allows the user to download it as a ZIP.

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vercel (deployed)

### Backend
- Node.js + Express.js
- Language Classification Logic
- Render (deployed)

## 📁 Folder Structure

ai-website-generator/
├── frontend/ # React app
├── backend/ # Express server
│ ├── templates/ # HTML templates (landing, blog, portfolio)
│ └── index.js
