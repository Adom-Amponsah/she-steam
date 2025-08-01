'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import Hero from '../components/Hero';

export default function RootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('🏠 Root Page Auth State:', { 
      isLoading: loading, 
      isAuthenticated: !!user,
      userEmail: user?.email 
    });

    if (!loading && user) {
      // If user is authenticated, redirect to home/dashboard
      console.log('✅ User authenticated, redirecting to home:', user.email);
      router.push('/home');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-purple-600">Loading...</div>
      </div>
    );
  }

  // If not authenticated, show Hero section
  if (!user) {
    return <Hero />;
  }

  // This will briefly show while redirecting to /home
  return null;
}
