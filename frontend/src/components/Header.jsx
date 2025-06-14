import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Website Builder</h1>
        <span className="text-sm">Powered by OpenAI</span>
      </div>
    </header>
  );
}
