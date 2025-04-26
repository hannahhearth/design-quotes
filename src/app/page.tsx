'use client';

import { useState } from 'react';
import { quotes } from './data/quotes';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const previousQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const currentQuote = quotes[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <main className="w-full max-w-2xl mx-auto text-centCer">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 min-h-[300px] flex flex-col justify-center">
          <blockquote className="mb-6">
            <p className="text-2xl font-serif italic mb-6 text-gray-800 dark:text-gray-200">
              "{currentQuote.text}"
            </p>
            <footer className="text-gray-600 dark:text-gray-400">
              <p className="font-semibold text-lg">{currentQuote.author}</p>
              {currentQuote.role && (
                <p className="text-sm">
                  {currentQuote.role}
                  {currentQuote.year ? `, ${currentQuote.year}` : ''}
                </p>
              )}
            </footer>
          </blockquote>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={previousQuote}
            className="px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous quote"
          >
            ←
          </button>
          <button
            onClick={nextQuote}
            className="px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next quote"
          >
            →
          </button>
        </div>
      </main>
    </div>
  );
}
