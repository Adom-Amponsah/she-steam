'use client';

import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { User, Award, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOutUser } from '../services/auth.service';
import toast from 'react-hot-toast';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOutUser();
    if (!result.error) {
      toast.success('Logged out successfully');
      router.push('/');
    } else {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h1 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => router.push('/home')}
          >
            SheSTEAM
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
              onClick={() => router.push('/profile')}
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              {user?.displayName || 'My Profile'}
            </Button>
            <Button 
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
              onClick={() => router.push('/opportunities')}
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Opportunities
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
