'use client';

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { createUserProfile } from './firestore.service';

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user profile after successful signup
    await createUserProfile(userCredential.user.uid, {
      email: userCredential.user.email,
      displayName: email.split('@')[0], // Default display name from email
      photoURL: ''
    });
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error: error.message };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error: error.message };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    // First try popup
    try {
      console.log('Attempting Google sign in with popup...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Popup sign-in successful:', result.user.email);
      await handleGoogleSignInResult(result);
      return { user: result.user, error: null };
    } catch (popupError) {
      console.log('Popup failed:', popupError.code, 'Trying redirect...');
      
      // If popup fails (e.g., mobile browser, popup blocked), try redirect
      if (
        popupError.code === 'auth/popup-blocked' ||
        popupError.code === 'auth/popup-closed-by-user' ||
        popupError.code === 'auth/cancelled-popup-request'
      ) {
        await signInWithRedirect(auth, googleProvider);
        return { user: null, error: null }; // Page will reload after redirect
      }
      
      return { user: null, error: popupError.message };
    }
  } catch (error) {
    console.error('Google sign in error:', error);
    return { user: null, error: error.message };
  }
};

// Handle redirect result
export const handleRedirectResult = async () => {
  try {
    console.log('Checking for redirect result...');
    const result = await getRedirectResult(auth);
    if (result) {
      console.log('Redirect result found:', result.user.email);
      await handleGoogleSignInResult(result);
      return { user: result.user, error: null };
    }
    console.log('No redirect result found');
    return { user: null, error: null };
  } catch (error) {
    console.error('Redirect result error:', error);
    return { user: null, error: error.message };
  }
};

// Helper function to handle Google sign-in result
async function handleGoogleSignInResult(result) {
  if (result.user) {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    
    // Create or update user profile
    await createUserProfile(result.user.uid, {
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      accessToken: token // Store the access token if needed
    });
  }
}

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: error.message };
  }
};

// Auth state observer
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}; 