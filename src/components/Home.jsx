'use client';

import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { Play, Users, ArrowRight, Quote, Sparkles, Award, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import FeaturedVideo from './FeaturedVideo';
import MentorsPage from '../app/mentors/page';
import Header from './Header';

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />

      {/* Tabs */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'home'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-purple-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('mentors')}
              className={`py-4 px-2 border-b-2 transition-colors flex items-center ${
                activeTab === 'mentors'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-purple-600'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Mentors
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {activeTab === 'home' ? (
          <>
            {/* Welcome Section */}
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Welcome back, {user?.displayName || 'Future Innovator'}!
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Your STEAM Journey Continues
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Ready to explore, learn, and create something amazing today?
              </p>
            </div>

            {/* Quote of the Day Section */}
            <section className="mb-8 sm:mb-12">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-4 right-4 w-16 sm:w-20 h-16 sm:h-20 bg-white/10 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full opacity-30"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-white/80 mr-2 sm:mr-3" />
                    <h3 className="text-xl sm:text-2xl font-bold">Quote of the Day</h3>
                  </div>
                  
                  <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium italic leading-relaxed mb-3 sm:mb-4">
                    "{quotes[currentQuote].text}"
                  </blockquote>
                  
                  <cite className="text-white/90 font-semibold text-sm sm:text-base">
                    — {quotes[currentQuote].author}
                  </cite>
                  
                  <div className="mt-4 sm:mt-6 flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Video Section */}
            <section className="mb-8 sm:mb-12">
              <FeaturedVideo />
            </section>

            {/* Quick Actions Section */}
            <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <QuickActionCard
                icon={Users}
                title="Find a Mentor"
                description="Connect with successful women in STEAM who can guide your journey."
                gradient="from-purple-500 to-indigo-500"
                linkText="Explore Mentors"
                onClick={() => router.push('/mentors')}
              />

              <QuickActionCard
                icon={Play}
                title="Learning Hub"
                description="Access courses, tutorials, and resources to advance your STEAM skills."
                gradient="from-pink-500 to-rose-500"
                linkText="Start Learning"
              />

              

              <QuickActionCard
                icon={Award}
                title="Explore Opportunities"
                description="Discover scholarships, internships, and local STEAM programs."
                gradient="from-orange-500 to-amber-500"
                linkText="View Opportunities"
                onClick={() => router.push('/opportunities')}
              />
            </section>
          </>
        ) : (
          <MentorsPage />
        )}
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon: Icon, title, description, gradient, linkText, onClick }) => (
  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className={`w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4`}>
      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
    </div>
    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <Button 
      variant="ghost" 
      className="text-purple-600 hover:text-purple-700 font-semibold p-0 h-auto text-sm sm:text-base"
      onClick={onClick}
    >
      {linkText} <ArrowRight className="ml-2 w-4 h-4" />
    </Button>
  </div>
);

export default Home;