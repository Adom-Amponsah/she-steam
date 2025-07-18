'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar,
  Edit,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile, updateUserProfile } from '@/services/firestore.service';
import toast from 'react-hot-toast';

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    about: '',
    interests: []
  });
  const [editForm, setEditForm] = useState({
    about: '',
    interests: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.uid) return;
      
      try {
        const { profile, error } = await getUserProfile(user.uid);
        if (error) {
          toast.error('Failed to load profile data');
          return;
        }
        
        if (profile) {
          setUserProfile({
            about: profile.bio || '',
            interests: profile.interests || []
          });
          setEditForm({
            about: profile.bio || '',
            interests: (profile.interests || []).join(', ')
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    fetchUserProfile();
  }, [user?.uid]);

  const handleSaveProfile = async () => {
    if (!user?.uid) return;

    try {
      const interests = editForm.interests
        .split(',')
        .map(interest => interest.trim())
        .filter(interest => interest.length > 0);

      const updateData = {
        bio: editForm.about,
        interests,
      };

      const { error } = await updateUserProfile(user.uid, updateData);
      
      if (error) {
        toast.error('Failed to update profile');
        return;
      }

      setUserProfile({
        about: editForm.about,
        interests
      });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                className="mr-4 text-purple-700 hover:text-purple-800"
                onClick={() => router.push('/home')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-20 mb-6">
              <div className="w-40 h-40 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <User className="w-20 h-20 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.displayName || 'SheSTEAM Member'}
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
            {!isEditing && (
              <Button
                variant="ghost"
                className="text-purple-600 hover:text-purple-800"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Me
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                  value={editForm.about}
                  onChange={(e) => setEditForm(prev => ({ ...prev, about: e.target.value }))}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests (comma-separated)
                </label>
                <Input
                  value={editForm.interests}
                  onChange={(e) => setEditForm(prev => ({ ...prev, interests: e.target.value }))}
                  placeholder="Engineering, Coding, Space Enthusiast"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={handleSaveProfile}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({
                      about: userProfile.about,
                      interests: userProfile.interests.join(', ')
                    });
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {userProfile.about ? (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {userProfile.about}
                </p>
              ) : (
                <p className="text-gray-500 italic mb-6">
                  Add something about yourself...
                </p>
              )}

              <h4 className="text-xl font-bold text-gray-900 mb-4">Interests</h4>
              {userProfile.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests.map((interest) => (
                    <span 
                      key={interest}
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Add your interests...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;