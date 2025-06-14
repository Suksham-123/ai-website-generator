import React, { useState } from 'react';

export default function GeneratorForm({ onSubmit }) {
  const [command, setCommand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      onSubmit(command);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 space-y-4">
      <textarea
        className="w-full p-4 border border-gray-300 rounded shadow focus:outline-none focus:ring"
        rows={6}
        placeholder="Describe the website you want to generate..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
      >
        Generate Website
      </button>
    </form>
  );
}
