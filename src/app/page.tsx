'use client';

import { generateQuoteFlow } from './genkit';
import { useEffect, useState } from 'react';

export default function Home() {
  const [quote, setQuote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function generateQuote() {
    setIsLoading(true);
    setQuote('');
    const suggestion = await generateQuoteFlow();
    setQuote(suggestion.quote);
  }

  useEffect(() => {
    if (quote !== '') {
      setIsLoading(false);
    }
  }, [quote]);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-black">
      {quote && <p className="w-4/5 text-4xl text-white font-bold">{quote}</p>}
      {isLoading && (
        <svg
          className="animate-spin h-16 w-16 text-[#FF44EC]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && (
        <div className="relative inline-flex mt-8 group">
          <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={generateQuote}
            title="Get quote now"
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button"
          >
            {quote ? 'Kata-kata lain Kak Gem' : 'Kata-kata hari ini Kak Gem'}
          </button>
        </div>
      )}
    </main>
  );
}
