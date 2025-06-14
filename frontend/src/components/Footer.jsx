import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 text-center mt-8">
      <p>&copy; {new Date().getFullYear()} AI Website Builder. All rights reserved.</p>
    </footer>
  );
}
