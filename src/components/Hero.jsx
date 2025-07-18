'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Hero = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleJoinClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-200 rounded-full opacity-15 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Inspiring the Next Generation
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              Empower Her Future in STEAM
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl">
              Join a community of young African women breaking barriers in Science, Technology, Engineering, Arts, and Mathematics. Your journey to changing the world starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={handleJoinClick}
              >
                {user ? 'Go to Dashboard' : 'Join SheSTEAM'} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Watch Our Story
              </Button>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1705579608642-19a05c1b7b96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Young woman in STEM field working with technology"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-gray-600">Girls Mentored</div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-pink-100">
              <div className="text-2xl font-bold text-pink-600">50+</div>
              <div className="text-sm text-gray-600">STEAM Programs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
