'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Opportunities from '../../components/Opportunities';

export default function OpportunitiesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('🎯 Opportunities Page Auth State:', { 
      isLoading: loading, 
      isAuthenticated: !!user,
      userEmail: user?.email 
    });

    if (!loading && !user) {
      console.log('🔒 No authenticated user, redirecting to auth page...');
      router.push('/auth');
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

  return <Opportunities />;
} 