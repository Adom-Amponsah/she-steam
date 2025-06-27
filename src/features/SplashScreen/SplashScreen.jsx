"use client"

import React, { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [redirect, setRedirect] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const phaseTimer = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);

    const timer = setTimeout(() => {
      setRedirect(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(phaseTimer);
    };
  }, []);

  //   if (redirect && mounted) {
  //     window.location.href = '/signin';
  //     return null;
  //   }

  const steamWords = ['Science', 'Technology', 'Engineering', 'Arts', 'Mathematics'];
  const steamColors = [
    'from-emerald-400 to-teal-600',
    'from-blue-400 to-indigo-600',
    'from-purple-400 to-violet-600',
    'from-pink-400 to-rose-600',
    'from-amber-400 to-orange-600'
  ];

  const womenImages = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616c0c0b5c8?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop&crop=face'
  ];

  if (!mounted) {
    return (
      <div className="splash-screen min-h-screen bg-black flex items-center justify-center">
        <div className="text-4xl text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="splash-screen min-h-screen relative bg-black overflow-hidden">
      {/* Matrix-style Digital Rain */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 text-green-400 text-xs font-mono opacity-70"
            style={{
              left: `${i * 5}%`,
              animation: `digitalRain ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Array.from({ length: 50 }, () => String.fromCharCode(33 + Math.random() * 94)).join('')}
          </div>
        ))}
      </div>

      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,255,255,0.3)" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="hologram" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00ffff', stopOpacity: 0.5 }} />
              <stop offset="50%" style={{ stopColor: '#ff00ff', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#ffff00', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#hologram)" className="animate-pulse" />
        </svg>
      </div>

      {/* Floating Women Portraits */}
      <div className="absolute inset-0 pointer-events-none">
        {womenImages.map((image, index) => (
          <div
            key={index}
            className="absolute opacity-80"
            style={{
              left: `${15 + index * 17}%`,
              top: `${index % 2 === 0 ? '10%' : '55%'}`,
              animation: `portraitFloat ${4 + index}s ease-in-out infinite`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            <div className="relative group">
              {/* Holographic Border */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Portrait - Made Larger */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-cyan-400/50 backdrop-blur-sm">
                <img
                  src={image}
                  alt={`STEAM Woman ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20 mix-blend-overlay" />
              </div>

              {/* STEAM Field Labels */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${steamColors[index]} text-white`}>
                  {steamWords[index]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content with 3D Effect */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4">
        {/* Ultra-Premium Logo */}
        <div className="text-center mb-16">
          <div className="relative inline-block perspective-1000">
            {/* Main Title with 3D Transform */}
            <h1 className="text-8xl md:text-[12rem] font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-amber-400 bg-clip-text text-transparent transform-gpu">
              <span className="inline-block animate-bounce-3d" style={{ animationDelay: '0s' }}>S</span>
              <span className="inline-block animate-bounce-3d" style={{ animationDelay: '0.1s' }}>h</span>
              <span className="inline-block animate-bounce-3d" style={{ animationDelay: '0.2s' }}>e</span>
            </h1>

            {/* Particle Explosion Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  style={{
                    left: `${Math.cos(i * 12) * 100}px`,
                    top: `${Math.sin(i * 12) * 100}px`,
                    animation: `particleExplode ${2 + Math.random()}s ease-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* STEAM Letters with Morphing Effect */}
          {/*
          <div className="flex justify-center items-center space-x-6 mb-12">
            {['S', 'T', 'E', 'A', 'M'].map((letter, index) => (
              <div
                key={letter}
                className={`relative text-6xl md:text-8xl font-black bg-gradient-to-r ${steamColors[index]} bg-clip-text text-transparent cursor-pointer group`}
                style={{
                  animation: `letterMorph ${3 + index * 0.3}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {letter}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/0 group-hover:border-cyan-400/50 transform scale-150 transition-all duration-500" />
                <div className="absolute inset-0 rounded-full border border-purple-500/0 group-hover:border-purple-500/30 transform scale-200 transition-all duration-700 delay-100" />
              </div>
            ))}
          </div>
          */}

        </div>

        {/* Dynamic Message with Typewriter Effect */}
        <div className="text-center mb-16 max-w-6xl">
          <p className="text-2xl md:text-4xl font-light text-white/90 mb-8 leading-relaxed">
            Where
            <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse-glow">
              {' '}brilliant women{' '}
            </span>
            shape the future through
          </p>

          {/* Morphing STEAM Words with Images */}
          <div className="h-20 flex justify-center items-center relative">
            <div className="relative">
              <span className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${steamColors[animationPhase]} bg-clip-text text-transparent transition-all duration-1000 transform scale-110 drop-shadow-2xl`}>
                {steamWords[animationPhase]}
              </span>

              {/* Rotating Energy Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border border-cyan-400/30 rounded-full animate-spin-slow" />
                <div className="absolute w-32 h-32 border border-purple-500/40 rounded-full animate-spin-reverse" />
                <div className="absolute w-16 h-16 border border-pink-400/50 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA Section */}
        <div className="flex flex-col items-center space-y-12">
          {/* Futuristic Button */}
          <div className="relative group cursor-pointer transform-gpu transition-transform duration-300 hover:scale-105">
            {/* Button Glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

            {/* Button Container */}
            <div className="relative bg-black/70 backdrop-blur-xl border-2 border-cyan-400/30 rounded-3xl px-12 py-6 group-hover:border-purple-500/50 transition-all duration-500">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-white">Launch Into STEAM</span>
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="flex items-center space-x-6">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${i <= animationPhase
                      ? `bg-gradient-to-r ${steamColors[i]} scale-125 shadow-lg`
                      : 'bg-white/20'
                    }`}
                  style={{
                    animation: i <= animationPhase ? 'pulse-intense 1s ease-in-out infinite' : 'none'
                  }}
                />
                <div className={`mt-2 text-xs transition-opacity duration-500 ${i <= animationPhase ? 'text-cyan-400' : 'text-white/40'}`}>
                  {steamWords[i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empowering Quote */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center max-w-4xl">
          <p className="text-xl md:text-2xl text-white/80 italic mb-4 font-light">
            "The future will be built by those brave enough to dream it into existence"
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-2" />
          <p className="text-sm text-cyan-400 font-medium">SheSTEAM Manifesto</p>
        </div>
      </div>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes digitalRain {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes portraitFloat {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          33% { transform: translateY(-15px) scale(1.05) rotate(2deg); }
          66% { transform: translateY(-5px) scale(0.98) rotate(-1deg); }
        }
        
        @keyframes bounce-3d {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateX(10deg) rotateY(5deg); }
        }
        
        @keyframes letterMorph {
          0%, 100% { transform: scale(1) rotateY(0deg) skew(0deg); }
          25% { transform: scale(1.1) rotateY(10deg) skew(2deg); }
          50% { transform: scale(0.95) rotateY(0deg) skew(-1deg); }
          75% { transform: scale(1.05) rotateY(-5deg) skew(1deg); }
        }
        
        @keyframes particleExplode {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.5); }
        }
        
        @keyframes pulse-intense {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-bounce-3d {
          animation: bounce-3d 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
}