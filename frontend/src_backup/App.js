import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    // Simulated HTML output for now
    setOutput(`<div class="p-4 text-center text-lg font-bold">Website based on prompt: "${prompt}"</div>`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-indigo-600">AI Website Generator</h1>
        <a
          href="#"
          className="text-sm text-indigo-500 hover:underline"
        >
          GitHub
        </a>
      </nav>

      {/* Main Section */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Generate a Website Instantly</h2>
        <p className="text-center text-gray-600 mb-10">
          Enter your idea or description, and we’ll build a responsive website for you using AI.
        </p>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <input
            type="text"
            placeholder="Describe your website..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Generate
          </button>
        </div>

        {/* Preview Section */}
        <div className="bg-white border shadow rounded p-6">
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <div
            className="border p-4 bg-gray-100 rounded"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Website Generator. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
