'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useAuth } from '../hooks/useAuth';
import { ArrowRight, Sparkles } from 'lucide-react';
import { handleRedirectResult } from '../services/auth.service';
import toast from 'react-hot-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { login, signup, loginWithGoogle, error: authError } = useAuth();
  const [error, setError] = useState(authError);
  const router = useRouter();

  useEffect(() => {
    console.log('🔍 Checking for Google redirect result...');
    // Check for redirect result when component mounts
    handleRedirectResult().then(({ user, error }) => {
      console.log('📱 Google Redirect Result:', { user: user?.email, error });
      setIsLoading(false);
      if (user) {
        console.log('✅ Google redirect sign-in successful:', user.email);
        toast.success('Successfully signed in with Google!');
        router.push('/home');
      } else if (error) {
        console.error('❌ Google redirect error:', error);
        setError(error);
        toast.error(error);
      }
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log('🔑 Attempting email/password auth:', { 
      method: isLogin ? 'login' : 'signup',
      email 
    });
    
    const result = isLogin 
      ? await login(email, password)
      : await signup(email, password);
    
    if (!result.error) {
      console.log('✅ Email/password auth successful:', {
        method: isLogin ? 'login' : 'signup',
        user: result.user?.email
      });
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      router.push('/home');
    } else {
      console.error('❌ Email/password auth error:', {
        method: isLogin ? 'login' : 'signup',
        error: result.error
      });
      setError(result.error);
      toast.error(result.error);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    console.log('🔍 Starting Google sign-in process...');
    const result = await loginWithGoogle();
    
    if (result.error) {
      console.error('❌ Google sign-in error:', result.error);
      setError(result.error);
      toast.error(result.error);
    } else if (result.user) {
      // If we got a user back (popup success), redirect to home
      console.log('✅ Google sign-in successful:', result.user.email);
      toast.success('Successfully signed in with Google!');
      router.push('/home');
    } else {
      console.log('📱 Google sign-in popup initiated, waiting for redirect...');
      // Don't do anything here - the redirect will happen automatically
    }
  };

  if (isLoading) {
    console.log('⌛ Auth component loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-purple-600">Loading...</div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-200 rounded-full opacity-15 animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              {isLogin ? 'Welcome Back!' : 'Join SheSTEAM'}
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
          >
            Sign in with Google
          </Button>

          {/* Toggle Login/Signup */}
          <p className="mt-6 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth; 