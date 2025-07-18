'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Globe } from 'lucide-react';
import { Button } from './ui/Button';

const stories = [
  {
    name: "Prof. Elsie Effah Kaufmann",
    title: "First Female Dean of Engineering Sciences, University of Ghana",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSTjCH5hX0AitnjBUBH01I_suuOm5pwfpFQ&s",
    description: "Pioneer in biomedical engineering education in Ghana, longtime quiz mistress of NSMQ. Focuses on developing low-cost biomedical devices and mentoring through her foundation.",
    impact: {
      stat1: { value: "1st", label: "Female Dean" },
      stat2: { value: "20+", label: "Years in STEM" }
    },
    category: "Engineering Pioneer"
  },
  {
    name: "Dr. Angela Tabiri",
    title: "Mathematician & Founder of Femafricmaths",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyl0CdB5mY49v8NIZkRlQWhUc8s1LHHb3abg&s",
    description: "Ghanaian mathematician who earned her PhD in algebraic geometry. Founded Femafricmaths to inspire more African girls to pursue mathematics, breaking barriers and challenging stereotypes.",
    impact: {
      stat1: { value: "PhD", label: "Algebraic Geometry" },
      stat2: { value: "100s", label: "Girls Inspired" }
    },
    category: "Mathematics Leader"
  },
  {
    name: "Regina Honu",
    title: "Founder of Soronko Academy",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ60Eb06O6RMyCBxlAcT07GegGXVp4wmH3ZVQ&s",
    description: "Founder of Africa's first coding school for girls. Through Soronko Academy, she has trained over 20,000 girls in coding and digital skills, featured on CNN & BBC 100 Women.",
    impact: {
      stat1: { value: "1st", label: "Girls Coding School" },
      stat2: { value: "20K+", label: "Girls Trained" }
    },
    category: "Tech Pioneer"
  },
  {
    name: "Farida Bedwei",
    title: "Co-founder of Logiciel",
    image: "https://ejscenter.org/wp-content/uploads/2023/02/800x800-farida.png",
    description: "Fintech pioneer and coding prodigy living with cerebral palsy. Co-founded Logiciel, emphasizing that 'Disability is not inability' while inspiring with her story of resilience and innovation.",
    impact: {
      stat1: { value: "30+", label: "Years in Tech" },
      stat2: { value: "∞", label: "Lives Inspired" }
    },
    category: "Tech Innovator"
  },
  {
    name: "Dr. Priscilla Kolibea Mante",
    title: "Neuropharmacologist at KNUST",
    image: "https://i1.rgstatic.net/ii/profile.image/703424643481603-1544720912600_Q512/Priscilla-Mante.jpg",
    description: "Pioneering researcher in plant-based epilepsy treatments, bridging traditional medicine and neuroscience. Her work is revolutionizing accessible healthcare solutions in Africa.",
    impact: {
      stat1: { value: "New", label: "Treatments" },
      stat2: { value: "100s", label: "Research Citations" }
    },
    category: "Medical Pioneer"
  },
  {
    name: "Ohemaa Adjei Andoh",
    title: "Geological Engineer & GIST Co-founder",
    image: "https://www.gstep.org.gh/wp-content/uploads/2022/02/Ohemaa-Adjei-Andoh.jpeg",
    description: "Co-founder of Girls in Science & Technology (GIST) and PM STEAM Academy. Advocates that 'STEM can be fun', encouraging teamwork, creativity, and early exposure to STEAM.",
    impact: {
      stat1: { value: "2", label: "Organizations Founded" },
      stat2: { value: "1000+", label: "Girls Mentored" }
    },
    category: "STEM Educator"
  },
  {
    name: "Dr. Hayat Sindi",
    title: "Biotechnology Pioneer",
    image: "https://assets.entrepreneur.com/content/3x2/2000/20181125133010-DrHayatSindhi-2.jpeg",
    description: "First Saudi woman to earn a Ph.D. in biotechnology from Cambridge. Breaking barriers in science and inspiring a new generation of women in STEM across the Middle East.",
    impact: {
      stat1: { value: "1st", label: "Saudi PhD in Biotech" },
      stat2: { value: "40+", label: "Patents & Papers" }
    },
    category: "Biotech Pioneer"
  },
  {
    name: "Dr. Fei-Fei Li",
    title: "AI Pioneer & Stanford Professor",
    image: "https://hai.stanford.edu/_next/image?url=https%3A%2F%2Fhai.stanford.edu%2Fassets%2Fimages%2F2020-03%2Fhai_1512feifei.png&w=3840&q=100",
    description: "Co-director of Stanford's Human-Centered AI Institute. Pioneering researcher in computer vision and AI, advocating for ethical and inclusive artificial intelligence.",
    impact: {
      stat1: { value: "150K+", label: "Citations" },
      stat2: { value: "1M+", label: "Students Reached" }
    },
    category: "AI Leader"
  },
  {
    name: "Gitanjali Rao",
    title: "Young Inventor & TIME Kid of the Year",
    image: "https://cdn.shopify.com/s/files/1/0591/9493/articles/Gitanjali-Rao.jpg?v=1621430729",
    description: "Invented devices for water contamination detection and cyberbullying prevention. TIME Magazine's first Kid of the Year, inspiring young innovators worldwide.",
    impact: {
      stat1: { value: "5+", label: "Major Inventions" },
      stat2: { value: "30K+", label: "Students Mentored" }
    },
    category: "Young Innovator"
  },
  {
    name: "Prof. Tebello Nyokong",
    title: "Chemistry Pioneer",
    image: "https://lh3.googleusercontent.com/9vkoBXR9ducsqka1N-PLmUQ_JRCv9tK625rW99IiQhLDek1XsbthThi-LLYDvXL6hI4eWp4e-C4F2CVsR5ISOG_D6WwW3xH-rzzyAMsa5AGjfw=s750",
    description: "South African chemist pioneering photodynamic therapy for cancer treatment. From humble beginnings in Lesotho to becoming one of Africa's most influential scientists.",
    impact: {
      stat1: { value: "600+", label: "Research Papers" },
      stat2: { value: "50+", label: "Awards" }
    },
    category: "Chemistry Pioneer"
  },
  {
    name: "Reshma Saujani",
    title: "Founder of Girls Who Code",
    image: "https://aspenideasfestival.imgix.net/637392f0-9128-4698-8d4a-0b43705feda1/AIF24_Saujani_Reshma.jpeg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=0%2C321%2C3568%2C3572",
    description: "Founded Girls Who Code in 2012, supporting over half a million girls worldwide in tech education. Advocate for women in technology and fighting impostor syndrome.",
    impact: {
      stat1: { value: "500K+", label: "Girls Reached" },
      stat2: { value: "90K+", label: "Projects Created" }
    },
    category: "Tech Education"
  },
  {
    name: "Kimberly Bryant",
    title: "Founder of Black Girls CODE",
    image: "https://s3.amazonaws.com/tesla-media/speaker_media/asset/31696/portrait_xl_70_kimberlybryant.jpg",
    description: "Electrical engineer who founded Black Girls CODE in 2011. Transforming the tech landscape by empowering young women of color to become innovators in STEM fields.",
    impact: {
      stat1: { value: "30K+", label: "Girls Trained" },
      stat2: { value: "15+", label: "Global Chapters" }
    },
    category: "Tech Educator"
  },
  {
    name: "Debbie Sterling",
    title: "Founder of GoldieBlox",
    image: "https://www.engineergirl.org/File.aspx?id=13515",
    description: "Stanford engineer who created GoldieBlox to inspire the next generation of female engineers. Revolutionizing the toy industry with STEM-focused products for girls.",
    impact: {
      stat1: { value: "1M+", label: "Toys Sold" },
      stat2: { value: "6+", label: "Award-Winning Products" }
    },
    category: "STEM Education"
  },
  {
    name: "Saran Kaba Jones",
    title: "Clean Water Advocate",
    image: "https://assets.weforum.org/sf_account/image/rbG4ZqtECdQPF7qKwRF6cKIDJVIhUScKSC5GkfFhUmY.jpeg",
    description: "Founded FACE Africa, providing clean water access across Liberia. Harvard graduate using technology and innovation to solve critical infrastructure challenges.",
    impact: {
      stat1: { value: "100K+", label: "Lives Impacted" },
      stat2: { value: "50+", label: "Water Projects" }
    },
    category: "Social Innovation"
  },
  {
    name: "Anne-Marie Imafidon",
    title: "Tech Leader & Stemettes Founder",
    image: "https://cdn.speakerscorner.co.uk/files/2023/05/541cbe80-fae8-11ed-9237-6f8ede02fbe1-425b6e15624f0f971a29191cef13e770.jpg",
    description: "Child prodigy who passed A-level computing at age 11. Founded Stemettes to inspire the next generation of women in STEM fields, reaching thousands of young people.",
    impact: {
      stat1: { value: "50K+", label: "Girls Reached" },
      stat2: { value: "20+", label: "Industry Awards" }
    },
    category: "Tech Education"
  },
  {
    name: "Dana Bolles",
    title: "NASA Engineer & Disability Advocate",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4ThOZBVFVwQNNDiL9u6MMdEJLa7LVsP_aw&s",
    description: "NASA engineer born without arms or legs who became a powerful advocate for disability inclusion in STEM. Proving that space exploration is for everyone.",
    impact: {
      stat1: { value: "20+", label: "Years at NASA" },
      stat2: { value: "∞", label: "Barriers Broken" }
    },
    category: "Space Pioneer"
  }
];

const FeaturedStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextStory = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }
  };

  const prevStory = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const story = stories[currentIndex];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Featured STEAM Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet inspiring African women breaking barriers and leading innovation in STEAM
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Preview */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={story.image}
                alt={`${story.name} - Featured STEAM leader`}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
              
              {/* Navigation Buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2"
                  onClick={prevStory}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2"
                  onClick={nextStory}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute -bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-center space-x-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-purple-600 w-4' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Story Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-3">
                {story.category}
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {story.name}
              </h3>
              <div className="text-lg font-medium text-purple-600 mb-4">
                {story.title}
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {story.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{story.impact.stat1.value}</div>
                <div className="text-sm text-purple-700">{story.impact.stat1.label}</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-xl">
                <div className="text-2xl font-bold text-pink-600">{story.impact.stat2.value}</div>
                <div className="text-sm text-pink-700">{story.impact.stat2.label}</div>
              </div>
            </div>

            <Button 
              onClick={() => window.open('https://en.wikipedia.org/wiki/' + story.name.replace(/ /g, '_'), '_blank')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Globe className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;