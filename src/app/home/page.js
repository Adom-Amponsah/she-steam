'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Home from '../../components/Home';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('🏠 Dashboard Auth State:', { 
      isLoading: loading, 
      isAuthenticated: !!user,
      userEmail: user?.email 
    });

    if (!loading && !user) {
      // If not authenticated, redirect to auth page
      console.log('🔒 No authenticated user, redirecting to auth page...');
      router.push('/auth');
    } else if (!loading && user) {
      console.log('✅ User authenticated, showing dashboard:', user.email);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-purple-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Home />;
} 