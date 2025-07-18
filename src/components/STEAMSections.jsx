'use client';

import React from 'react';
import { Users, Briefcase, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const STEAMSections = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLearnMore = () => {
    if (!user) {
      toast.error('Please login to access this feature');
      router.push('/auth');
      return;
    }
    router.push('/home');
  };

  const sections = [
    {
      icon: Users,
      title: "Mentorship Program",
      description: "Connect with successful women in STEAM who guide, inspire, and support your journey to excellence.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "from-purple-500 to-indigo-500",
      stats: "200+ Mentors"
    },
    {
      icon: Briefcase,
      title: "Internship Opportunities",
      description: "Get hands-on experience with leading companies and startups across Africa and beyond.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "from-pink-500 to-rose-500",
      stats: "150+ Partners"
    },
    {
      icon: BookOpen,
      title: "Success Stories",
      description: "Be inspired by the journeys of young African women who are already making their mark in STEAM.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "from-orange-500 to-amber-500",
      stats: "100+ Stories"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Path to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">STEAM Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the resources, connections, and opportunities that will accelerate your journey in Science, Technology, Engineering, Arts, and Mathematics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${section.color} opacity-80`}></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-4 left-4 text-white font-semibold">
                  {section.stats}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {section.description}
                </p>
                <Button 
                  variant="ghost" 
                  className="group/btn text-purple-600 hover:text-purple-700 font-semibold p-0 h-auto"
                  onClick={handleLearnMore}
                >
                  Learn More 
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default STEAMSections;