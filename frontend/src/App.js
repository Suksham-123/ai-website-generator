import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneratorForm from './components/GeneratorForm';

function App() {
  const [output, setOutput] = useState('');

  const handleGenerate = async (prompt) => {
    setOutput('Generating website...');
    // This will call either OpenAI API or your backend in the next steps
    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOutput(data.code || 'No code returned');
    } catch (err) {
      setOutput('Error generating website: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <GeneratorForm onSubmit={handleGenerate} />
        <pre className="bg-gray-900 text-green-400 mt-6 p-4 rounded overflow-x-auto whitespace-pre-wrap">
          {output}
        </pre>
      </main>
      <Footer />
    </div>
  );
}

export default App;
