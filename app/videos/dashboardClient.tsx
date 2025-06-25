// app/videos/dashboard-client.tsx
'use client';
import { useState, useEffect } from 'react';

export default function AICoach() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleAsk = () => {
    setResponse(
      question.toLowerCase().includes('aapl')
        ? 'AAPL is trading at $200.30. Consider market trends and your risk tolerance before investing.'
        : 'Ask a specific question about the market for tailored insights!'
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 dark:bg-gray-100">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <p className="text-lg font-medium dark:text-gray-800">Ask our AI Coach for market insights!</p>
      <input
        type="text"
        placeholder="e.g., Should I invest in AAPL?"
        className="w-full p-3 mt-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-gray-900"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        onClick={handleAsk}
      >
        Ask
      </button>
      {response && (
        <p className="mt-3 text-sm text-gray-300 animate-fade-in dark:text-gray-600">{response}</p>
      )}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
