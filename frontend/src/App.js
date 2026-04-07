import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneratorForm from './components/GeneratorForm';

function App() {
  const [prompt, setPrompt] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [jsContent, setJsContent] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState('custom');

  const BACKEND = 'https://ai-website-generator.onrender.com';

  // 🔥 Generate Website
  const handleGenerate = async (customPrompt) => {
    const finalPrompt = customPrompt || prompt;

    try {
      const endpoint =
        mode === 'openai'
          ? `${BACKEND}/api/generate-openai`
          : `${BACKEND}/api/generate-custom`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (mode === 'openai') {
        const { code } = await res.json();
        setHtmlContent(code);
      } else {
        const html = await res.text();
        setHtmlContent(html);
      }

      setCssContent('');
      setJsContent('');
    } catch (err) {
      alert('Error generating site: ' + err.message);
    }
  };

  // 📦 Download ZIP
  const handleDownload = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/download-custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'website',
          html: htmlContent,
          css: cssContent,
          js: jsContent,
        }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download error: ' + err.message);
    }
  };

  // 🔍 Live Preview
  const getFullPreview = () =>
    `<html>
      <head><style>${cssContent}</style></head>
      <body>
        ${htmlContent}
        <script>${jsContent}</script>
      </body>
    </html>`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto p-6">

        {/* 🌐 Language + Mode */}
        <div className="flex gap-4 mb-4 flex-wrap">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="custom">Custom Template</option>
            <option value="openai">OpenAI</option>
          </select>
        </div>

        {/* ⚠️ Warning */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
          ⚠️ AI generation is limited due to API quota. You can explore demo outputs.
        </div>

        {/* 🎯 Demo Buttons */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <button
            onClick={() => {
              const demo = 'Create a modern business landing page';
              setPrompt(demo);
              handleGenerate(demo);
            }}
            className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            Try Demo 1
          </button>

          <button
            onClick={() => {
              const demo = 'Build a developer portfolio website';
              setPrompt(demo);
              handleGenerate(demo);
            }}
            className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            Try Demo 2
          </button>

          <button
            onClick={() => {
              const demo = 'Create a blog website for tech articles';
              setPrompt(demo);
              handleGenerate(demo);
            }}
            className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            Try Demo 3
          </button>
        </div>

        {/* 🧠 Input */}
        <GeneratorForm
          onSubmit={(val) => {
            setPrompt(val);
            handleGenerate(val);
          }}
          placeholder={
            language === 'hi'
              ? 'अपनी वेबसाइट के बारे में लिखें...'
              : 'Describe your website...'
          }
        />

        {/* 🛠 Editors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder="HTML"
            className="border p-2 rounded text-sm font-mono h-48"
          />
          <textarea
            value={cssContent}
            onChange={(e) => setCssContent(e.target.value)}
            placeholder="CSS"
            className="border p-2 rounded text-sm font-mono h-48"
          />
          <textarea
            value={jsContent}
            onChange={(e) => setJsContent(e.target.value)}
            placeholder="JavaScript"
            className="border p-2 rounded text-sm font-mono h-48"
          />
        </div>

        {/* 🔍 Preview */}
        <div className="mt-6 border rounded h-[500px] overflow-hidden shadow-lg">
          <iframe
            title="Preview"
            srcDoc={getFullPreview()}
            className="w-full h-full"
          />
        </div>

        {/* 📦 Download */}
        <button
          onClick={handleDownload}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download Website
        </button>

        {/* 💡 Tech Line (IMPORTANT for Resume) */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Built using OpenAI API, React, and cloud deployment for real-time website generation.
        </p>

      </main>

      <Footer />
    </div>
  );
}

export default App;