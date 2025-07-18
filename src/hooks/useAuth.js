'use client';

import { useState, useEffect } from 'react';
import { 
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  subscribeToAuthChanges
} from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    setError(null);
    const result = await signUpWithEmail(email, password);
    if (result.error) setError(result.error);
    return result;
  };

  const login = async (email, password) => {
    setError(null);
    const result = await signInWithEmail(email, password);
    if (result.error) setError(result.error);
    return result;
  };

  const loginWithGoogle = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (result.error) setError(result.error);
    return result;
  };

  const logout = async () => {
    setError(null);
    const result = await signOutUser();
    if (result.error) setError(result.error);
    return result;
  };

  return {
    user,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout
  };
}; 