'use client';

import React from 'react';
import { ExternalLink, Calendar, Trophy, Mail } from 'lucide-react';
import { Button } from './ui/Button';

const competitions = [
  {
    title: "Yaa Asantewaa Art Prize 2025",
    organizer: "Gallery 1957",
    deadline: "September 19, 2025",
    email: "applications@gallery1957.com",
    description: "Submit your artwork for the prestigious Yaa Asantewaa Art Prize.",
    type: "Art"
  },
  {
    title: "National Heritage Photo Competition 2025",
    organizer: "Ministry of Tourism, Arts and Culture",
    deadline: "Open",
    email: "heritagesites@motac.gov.gh",
    description: "Capture and showcase Ghana's rich cultural heritage through photography.",
    type: "Photography"
  },
  {
    title: "AIMS Girls in Mathematical Sciences Program (GMSP)",
    organizer: "AIMS Ghana",
    deadline: "2025",
    link: "aims.edu.gh/girls-in-mathematical-sciences-programme",
    description: "Join the prestigious program designed to empower girls in mathematical sciences.",
    type: "Mathematics"
  },
  {
    title: "Ghana STEM Explorer Prize (GSTEP) 2025",
    organizer: "GSTEP",
    deadline: "2025",
    link: "www.gstep.org.gh",
    description: "Showcase your STEM innovations and compete for the national prize.",
    type: "STEM"
  },
  {
    title: "Quantum Computing Challenge 2025",
    organizer: "Quantum Initiative",
    deadline: "2025",
    link: "quantum2025.org/news-link/uncertain-sea-principle",
    description: "Explore the frontiers of quantum computing in this innovative challenge.",
    type: "Technology"
  }
];

const CompetitionCard = ({ competition }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{competition.title}</h3>
        <p className="text-gray-600">{competition.organizer}</p>
      </div>
      <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium">
        {competition.type}
      </span>
    </div>

    <p className="text-gray-600 mb-4">{competition.description}</p>

    <div className="space-y-2 mb-4">
      <div className="flex items-center text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Deadline: {competition.deadline}</span>
      </div>
      {competition.email && (
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span>{competition.email}</span>
        </div>
      )}
    </div>

    {competition.link && (
      <Button 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        onClick={() => window.open(`https://${competition.link}`, '_blank')}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Apply Now
      </Button>
    )}
  </div>
);

const Competitions = () => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Competitions & Opportunities
          </h2>
          <p className="text-gray-600">
            Discover exciting competitions and opportunities in STEAM fields
          </p>
        </div>
        <Trophy className="w-12 h-12 text-purple-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {competitions.map((competition, index) => (
          <CompetitionCard key={index} competition={competition} />
        ))}
      </div>
    </div>
  );
};

export default Competitions; 