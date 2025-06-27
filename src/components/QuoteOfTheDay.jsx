
import React from 'react';
import { Quote } from 'lucide-react';

const QuoteOfTheDay = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
          <Quote className="w-12 h-12 text-white/80 mx-auto mb-6" />
          
          <h2 className="text-2xl font-bold text-white mb-6">Quote of the Day</h2>
          
          <blockquote className="text-xl lg:text-2xl text-white/90 font-medium italic leading-relaxed mb-4">
            "The future belongs to young people with an education and the imagination to create."
          </blockquote>
          
          <cite className="text-white/80 font-semibold">
            — Barack Obama
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