'use client';

import React, { useState } from 'react';
import { Linkedin, Mail, Globe, Twitter, X } from 'lucide-react';
import { mentors } from '../../lib/mentor-data';

const MentorModal = ({ mentor, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
        <X size={24} />
      </button>
      
      {/* Non-scrolling Header */}
      <div className="p-8 md:p-12 flex-shrink-0">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 text-center">
            <img 
              src={mentor.imageUrl} 
              alt={`Portrait of ${mentor.name}`}
              className="w-32 h-32 rounded-full mx-auto object-cover border-8 border-purple-100 shadow-md"
              onError={(e) => { e.target.onerror = null; e.target.src='/images/mentors/placeholder.png'}}
            />
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">{mentor.name}</h2>
            <p className="text-purple-700 font-semibold text-lg mt-1">{mentor.description}</p>
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center md:justify-start items-center space-x-5">
              {mentor.links.linkedin && (
                <a href={mentor.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Linkedin size={24} />
                </a>
              )}
              {mentor.links.website && (
                <a href={mentor.links.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Globe size={24} />
                </a>
              )}
              {mentor.links.twitter && (
                <a href={mentor.links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Twitter size={24} />
                </a>
              )}
              {mentor.links.email && (
                <a href={`mailto:${mentor.links.email}`} className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      {mentor.fullDescription && (
        <div className="px-8 md:px-12 pb-8 md:pb-12 border-t border-gray-200 overflow-y-auto flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About {mentor.name.split(' ')[0]}</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {mentor.fullDescription}
          </p>
        </div>
      )}
    </div>
  </div>
);

const MentorCard = ({ mentor, onClick }) => {
  const isClickable = !!mentor.fullDescription;

  return (
    <div 
      onClick={isClickable ? onClick : undefined} 
      className={`bg-white rounded-2xl p-6 shadow-lg flex flex-col h-full ${isClickable ? 'hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer' : 'cursor-default'}`}>
      <img 
        src={mentor.imageUrl} 
        alt={`Portrait of ${mentor.name}`}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-100"
        onError={(e) => { e.target.onerror = null; e.target.src='/images/mentors/placeholder.png'}}
      />
      <div className="text-center flex-grow">
        <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
        <p className="text-purple-600 font-medium text-sm mb-3">{mentor.description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-center text-xs text-gray-500 mb-3 font-semibold">CONNECT</p>
        <div className="flex justify-center items-center space-x-4">
          {mentor.links.linkedin && <Linkedin size={20} className="text-gray-400"/>}
          {mentor.links.website && <Globe size={20} className="text-gray-400"/>}
          {mentor.links.twitter && <Twitter size={20} className="text-gray-400"/>}
          {mentor.links.email && <Mail size={20} className="text-gray-400"/>}
        </div>
      </div>
    </div>
  );
};

const MentorsPage = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Meet Our Mentors
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with inspiring women who are making a difference in STEAM. 
                They are here to guide and support you on your journey.
            </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <MentorCard key={index} mentor={mentor} onClick={() => setSelectedMentor(mentor)} />
          ))}
        </div>
      </div>
      {selectedMentor && <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />}
    </div>
  );
};

export default MentorsPage;
