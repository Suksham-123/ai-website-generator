import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneratorForm from './components/GeneratorForm';

function App() {
  const [mode, setMode] = useState('custom'); // 'openai' or 'custom'
  const [customType, setCustomType] = useState('landing');

  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [jsContent, setJsContent] = useState('');

  const handleGenerate = async (prompt) => {
    try {
      if (mode === 'openai') {
        const res = await fetch('http://localhost:5000/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        setHtmlContent(data.code || '');
        setCssContent('');
        setJsContent('');
      } else {
        const res = await fetch('http://localhost:5000/api/generate-custom', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: customType }),
        });
        const html = await res.text();
        setHtmlContent(html);
        setCssContent('');
        setJsContent('');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/download-custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: customType,
          html: htmlContent,
          css: cssContent,
          js: jsContent,
        }),
      });

      if (!res.ok || res.headers.get('Content-Type') !== 'application/zip') {
        const text = await res.text();
        alert('Download failed: ' + text);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${customType}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download error: ' + err.message);
    }
  };

  const getFullPreview = () => `
    <html>
    <head><style>${cssContent}</style></head>
    <body>
      ${htmlContent}
      <script>${jsContent}</script>
    </body>
    </html>
  `;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto p-6">
        <div className="mb-6 flex gap-4 items-center">
          <label className="font-semibold">Choose Generator:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="openai">OpenAI API</option>
            <option value="custom">Custom Editor</option>
          </select>

          {mode === 'custom' && (
            <select
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="landing">Landing</option>
              <option value="portfolio">Portfolio</option>
              <option value="blog">Blog</option>
            </select>
          )}
        </div>

        <GeneratorForm onSubmit={handleGenerate} />

        {/* Output for OpenAI */}
        {mode === 'openai' ? (
          <>
            <div className="mt-6 border rounded overflow-hidden h-[500px] shadow-lg">
              <iframe
                title="OpenAI Preview"
                srcDoc={getFullPreview()}
                className="w-full h-full"
                sandbox=""
              />
            </div>

            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleDownload}
            >
              Download Website (HTML+CSS+JS)
            </button>
          </>
        ) : (
          <>
            <div className="mt-6 border rounded overflow-hidden h-[500px] shadow-lg">
              <iframe
                title="Live Site Preview"
                srcDoc={getFullPreview()}
                className="w-full h-full"
                sandbox=""
              />
            </div>

            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleDownload}
            >
              Download Website (HTML+CSS+JS)
            </button>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
