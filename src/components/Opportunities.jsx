'use client';

import React from 'react';
import { Button } from './ui/Button';
import { ArrowLeft, Calendar, MapPin, Award, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';

const Opportunities = () => {
  const router = useRouter();

  const opportunities = [
    {
      id: 1,
      type: 'Scholarship',
      icon: GraduationCap,
      title: 'TechWomen Africa Scholarship',
      description: 'Full tuition scholarship for African girls pursuing computer science or engineering degrees.',
      deadline: 'March 15, 2024',
      location: 'Pan-African',
      bgColor: 'from-purple-500 to-indigo-500'
    },
    {
      id: 2,
      type: 'Internship',
      icon: Briefcase,
      title: 'Google Summer Internship',
      description: 'Paid summer internship program for young women in technology and software development.',
      deadline: 'February 28, 2024',
      location: 'Lagos, Nigeria',
      bgColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 3,
      type: 'Competition',
      icon: Trophy,
      title: 'African Girls Code Challenge',
      description: 'Annual coding competition with cash prizes and mentorship opportunities.',
      deadline: 'April 30, 2024',
      location: 'Online',
      bgColor: 'from-orange-500 to-amber-500'
    },
    {
      id: 4,
      type: 'Career Program',
      icon: Award,
      title: 'STEM Leadership Academy',
      description: 'Year-long program developing leadership skills for future STEM professionals.',
      deadline: 'Rolling Admissions',
      location: 'Nairobi, Kenya',
      bgColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      type: 'Scholarship',
      icon: GraduationCap,
      title: 'Microsoft TEALS Scholarship',
      description: 'Scholarship program supporting girls pursuing computer science education.',
      deadline: 'May 15, 2024',
      location: 'Multiple Countries',
      bgColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 6,
      type: 'Internship',
      icon: Briefcase,
      title: 'IBM Research Internship',
      description: 'Research internship focusing on AI and machine learning for social good.',
      deadline: 'March 31, 2024',
      location: 'Johannesburg, SA',
      bgColor: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                className="text-purple-700 hover:text-purple-800 p-2 sm:p-3"
                onClick={() => router.push('/home')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Back to Home</span>
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SheSTEAM
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Your Future Starts Here
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Opportunities for You
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Discover scholarships, internships, competitions, and career programs designed to empower your STEAM journey.
          </p>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="all" className="space-y-6 sm:space-y-8">
          <div className="overflow-x-auto -mx-4 px-4 sm:overflow-visible sm:px-0">
            <TabsList className="bg-white/50 p-1 rounded-2xl border border-purple-100 w-auto inline-flex sm:w-full">
              <TabsTrigger value="all" className="rounded-xl py-2 sm:py-3 px-4 sm:px-6 text-sm whitespace-nowrap">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                All Opportunities
              </TabsTrigger>
              <TabsTrigger value="scholarships" className="rounded-xl py-2 sm:py-3 px-4 sm:px-6 text-sm whitespace-nowrap">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Scholarships
              </TabsTrigger>
              <TabsTrigger value="internships" className="rounded-xl py-2 sm:py-3 px-4 sm:px-6 text-sm whitespace-nowrap">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Internships
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {opportunities
                .filter(opp => opp.type === 'Scholarship')
                .map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="internships">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {opportunities
                .filter(opp => opp.type === 'Internship')
                .map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Don't See What You're Looking For?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-5 sm:mb-6">
              We're constantly adding new opportunities. Subscribe to our newsletter to get notified about the latest STEAM opportunities for young women.
            </p>
            <Button 
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
            >
              Subscribe for Updates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted OpportunityCard component for better organization and reusability
const OpportunityCard = ({ opportunity }) => {
  const IconComponent = opportunity.icon;
  
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`bg-gradient-to-r ${opportunity.bgColor} p-4 sm:p-6 text-white`}>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
            {opportunity.type}
          </span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{opportunity.title}</h3>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          {opportunity.description}
        </p>
        
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
            <span>{opportunity.deadline}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
            <span>{opportunity.location}</span>
          </div>
        </div>

        <Button 
          className={`w-full bg-gradient-to-r ${opportunity.bgColor} hover:opacity-90 text-white font-semibold py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105`}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Opportunities; 