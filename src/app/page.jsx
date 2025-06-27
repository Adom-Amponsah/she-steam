import React from 'react';
import Hero from '../components/Hero';  
import QuoteOfTheDay from '../components/QuoteOfTheDay';
import FeaturedVideo from '../components/FeaturedVideo';
import STEAMSections from '../components/STEAMSections';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import SplashScreen from '../features/SplashScreen/SplashScreen';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Hero />
      <QuoteOfTheDay />
      <FeaturedVideo />
      <STEAMSections />
      <CallToAction />
      <Footer />
    </div>
  );}
