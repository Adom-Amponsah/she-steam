'use client';

import { db } from '../config/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

// User Profile Operations
export const createUserProfile = async (userId, userData) => {
  try {
    // Create public profile
    await setDoc(doc(db, 'profiles', userId), {
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || '',
      bio: '',
      interests: [],
      socialLinks: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPublic: true
    });

    // Create private user data
    await setDoc(doc(db, 'users', userId), {
      email: userData.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });

    return { error: null };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { error: error.message };
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const profileRef = doc(db, 'profiles', userId);
    await updateDoc(profileRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { error: error.message };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const profileDoc = await getDoc(doc(db, 'profiles', userId));
    if (profileDoc.exists()) {
      return { profile: profileDoc.data(), error: null };
    }
    return { profile: null, error: 'Profile not found' };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { profile: null, error: error.message };
  }
};

// Program Applications
export const submitProgramApplication = async (userId, programId, applicationData) => {
  try {
    const applicationRef = doc(collection(db, 'applications'));
    await setDoc(applicationRef, {
      userId,
      programId,
      status: 'pending',
      ...applicationData,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { error: null, applicationId: applicationRef.id };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { error: error.message, applicationId: null };
  }
};

export const getUserApplications = async (userId) => {
  try {
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(applicationsQuery);
    const applications = [];
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return { applications, error: null };
  } catch (error) {
    console.error('Error fetching user applications:', error);
    return { applications: [], error: error.message };
  }
};

// STEAM Programs
export const getPrograms = async () => {
  try {
    const programsSnapshot = await getDocs(collection(db, 'programs'));
    const programs = [];
    programsSnapshot.forEach((doc) => {
      programs.push({ id: doc.id, ...doc.data() });
    });
    return { programs, error: null };
  } catch (error) {
    console.error('Error fetching programs:', error);
    return { programs: [], error: error.message };
  }
}; 