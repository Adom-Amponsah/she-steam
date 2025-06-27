
import React from 'react';
import { Play, Clock, Users } from 'lucide-react';
import { Button } from './ui/Button';

const FeaturedVideo = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Featured STEAM Story
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch inspiring stories from young African women making waves in STEAM fields
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Preview */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Featured STEAM video preview"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button 
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-full p-6 transition-all duration-300 transform hover:scale-110"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </Button>
              </div>
            </div>
            
            {/* Video stats */}
            <div className="absolute -bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  12:45
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  2.4K views
                </div>
              </div>
            </div>
          </div>

          {/* Video Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-3">
                Engineering Excellence
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                From Accra to Silicon Valley: Adaora's Journey
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Meet Akosua, a 19-year-old software engineer from Accra who built her first app at 16 and now works with tech giants. Her story shows how passion, mentorship, and perseverance can open doors to unlimited possibilities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">16</div>
                <div className="text-sm text-purple-700">Age Started Coding</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-xl">
                <div className="text-2xl font-bold text-pink-600">5</div>
                <div className="text-sm text-pink-700">Apps Published</div>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Watch Full Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;