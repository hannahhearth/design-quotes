'use client';

import { useState, useEffect } from 'react';
import { quotes } from './data/quotes';
import { people } from './data/people';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getQuizRound() {
  // Pick a random quote
  const quoteIndex = getRandomInt(quotes.length);
  const quote = quotes[quoteIndex];

  // Get 2 random distractors (not the author)
  const distractors: string[] = [];
  const possibleDistractors = people.filter((p) => p !== quote.author);
  while (distractors.length < 2) {
    const idx = getRandomInt(possibleDistractors.length);
    const name = possibleDistractors[idx];
    if (!distractors.includes(name)) {
      distractors.push(name);
    }
  }

  // Shuffle options
  const options = [quote.author, ...distractors].sort(() => Math.random() - 0.5);

  return {
    quote,
    options,
    answer: quote.author,
  };
}

export default function Home() {
  // Start with null so SSR and client match
  const [quiz, setQuiz] = useState<ReturnType<typeof getQuizRound> | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Only generate quiz on client
  useEffect(() => {
    setQuiz(getQuizRound());
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (option === quiz?.answer) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  const handlePlayAgain = () => {
    setQuiz(getQuizRound());
    setSelected(null);
    setStatus('idle');
  };

  if (!quiz) {
    // Optionally, show a loading state while quiz is being generated on client
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent p-6">
      <main className="w-full max-w-2xl mx-auto text-center">
        <div className="rounded-2xl p-8 mb-8 min-h-[220px] flex flex-col justify-center">
          <blockquote className="mb-6">
            <p className="text-xl sm:text-2xl italic mb-6 text-gray-800 dark:text-gray-200">
              &ldquo;{quiz.quote.text}&rdquo;
            </p>
          </blockquote>
          <div className="flex flex-col gap-4">
            {quiz.options.map((option) => {
              let buttonStyle =
                'px-6 py-3 rounded-full border transition-colors font-medium text-base bg-gray-100 border-gray-200 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-800';

              // Only show feedback if correct
              if (status === 'correct') {
                if (option === quiz.answer) {
                  buttonStyle =
                    'px-6 py-3 rounded-full border font-medium text-base bg-green-100 border-green-400 text-green-800';
                } else {
                  buttonStyle =
                    'px-6 py-3 rounded-full border font-medium text-base bg-gray-100 border-gray-200 text-gray-600';
                }
              } else if (status === 'incorrect' && selected === option) {
                // Only the selected wrong answer is marked red
                buttonStyle =
                  'px-6 py-3 rounded-full border font-medium text-base bg-red-100 border-red-400 text-red-800';
              }

              return (
                <button
                  key={option}
                  onClick={() => {
                    if (status !== 'correct') handleSelect(option);
                  }}
                  disabled={status === 'correct'}
                  className={buttonStyle}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        {status === 'correct' && (
          <div className="mb-6 text-green-700 px-4 py-2 transition-all">
            🎉 Correct! {quiz.answer} said this. <br />
            <button
              onClick={handlePlayAgain}
              className="mt-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              Play Again
            </button>
          </div>
        )}
        {status === 'incorrect' && (
          <div className="mb-6 text-red-700 px-4 py-2 transition-all">
            ❌ Not quite! Try again.
          </div>
        )}
      </main>
    </div>
  );
}
