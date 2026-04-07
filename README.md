# AI Website Generator 🌐🤖

Built an AI-powered website generator that creates responsive websites from user prompts using OpenAI API. Designed an end-to-end workflow from prompt input to UI generation with real-time preview and deployed on Vercel. (Live generation is limited due to API quota; demo outputs included.)

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
