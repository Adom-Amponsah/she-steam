"use client";

import React, { useState, useEffect } from 'react';
import { QuoteIcon } from 'lucide-react';

const QuoteOfTheDay = () => {
  const quotes = [
    {
      text: "When I was doing math, that was all I needed.",
      author: "Dr. Angela Tabiri"
    },
    {
      text: "Using space to show girls they belong.",
      author: "Kellie Gerardi"
    },
    {
      text: "STEM can be fun… embrace it and apply it… there are so many opportunities out there waiting for you.",
      author: "Ohemaa Adjei Andoh"
    },
    {
      text: "Science is not a boy's game, it's not a girl's game. It's everyone's game. It's about where we are and where we're going.",
      author: "Nichelle Nichols"
    },
    {
      text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
      author: "Marie Curie"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
          <QuoteIcon className="w-12 h-12 text-white/80 mx-auto mb-6" />
          
          <h2 className="text-2xl font-bold text-white mb-6">Quote of the Day</h2>
          
          <blockquote className="text-xl lg:text-2xl text-white/90 font-medium italic leading-relaxed mb-4">
            "{quotes[currentQuote].text}"
          </blockquote>
          
          <cite className="text-white/80 font-semibold">
            — {quotes[currentQuote].author}
          </cite>
          
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteOfTheDay;