'use client';

import React, { useState } from 'react';
import { Linkedin, Mail, Globe, Twitter, X } from 'lucide-react';
import { mentors } from '../../lib/mentor-data';
import supabase from '@/lib/supabaseClient';

const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  const initials = names.map(n => n[0]).join('');
  return initials.slice(0, 2).toUpperCase();
};

const Avatar = ({ src, name, className }) => {
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    if (!imgError) {
      setImgError(true);
    }
  };

  // Reset error state if src changes
  React.useEffect(() => {
    setImgError(false);
  }, [src]);

  if (imgError || !src || src.includes('placeholder.png')) {
    return (
      <div className={`${className} flex items-center justify-center bg-purple-200 text-purple-700 font-bold text-4xl`}>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Portrait of ${name}`}
      className={className}
      onError={handleImgError}
    />
  );
};

const MentorModal = ({ mentor, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
        <X size={24} />
      </button>

      {/* Non-scrolling Header */}
      <div className="p-8 md:p-12 flex-shrink-0">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 text-center">
            <Avatar
              src={mentor.imageUrl}
              name={mentor.name}
              className="w-32 h-32 rounded-full mx-auto object-cover border-8 border-purple-100 shadow-md"
            />
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">{mentor.name}</h2>
            <p className="text-purple-700 font-semibold text-lg mt-1">{mentor.description}</p>
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center md:justify-start items-center space-x-5">
              {mentor.links.linkedin && (
                <a href={mentor.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Linkedin size={24} />
                </a>
              )}
              {mentor.links.website && (
                <a href={mentor.links.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Globe size={24} />
                </a>
              )}
              {mentor.links.twitter && (
                <a href={mentor.links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Twitter size={24} />
                </a>
              )}
              {mentor.links.email && (
                <a href={`mailto:${mentor.links.email}`} className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      {mentor.fullDescription && (
        <div className="px-8 md:px-12 pb-8 md:pb-12 border-t border-gray-200 overflow-y-auto flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About {mentor.name.split(' ')[0]}</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {mentor.fullDescription}
          </p>
        </div>
      )}
    </div>
  </div>
);

const MentorCard = ({ mentor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-lg flex flex-col h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <Avatar
        src={mentor.imageUrl}
        name={mentor.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-100"
      />
      <div className="text-center flex-grow">
        <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
        <p className="text-purple-600 font-medium text-sm mb-3">{mentor.description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-center text-xs text-gray-500 mb-3 font-semibold">CONNECT</p>
        <div className="flex justify-center items-center space-x-4">
          {mentor.links.linkedin && <Linkedin size={20} className="text-gray-400" />}
          {mentor.links.website && <Globe size={20} className="text-gray-400" />}
          {mentor.links.twitter && <Twitter size={20} className="text-gray-400" />}
          {mentor.links.email && <Mail size={20} className="text-gray-400" />}
        </div>
      </div>
    </div>
  );
};

const MentorsPage = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [dynamicMentors, setDynamicMentors] = useState([]);
  const fetchMentors = async () => {
    const { data, error } = await supabase.from('mentors').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setDynamicMentors(data.map(m => ({
        name: m.name,
        description: m.description,
        fullDescription: m.full_desc,
        imageUrl: m.image_url,
        links: {
          website: m.website,
          linkedin: m.linkedin,
          twitter: m.twitter,
          email: m.email,
        },
      })));
    }
  };
  React.useEffect(() => { fetchMentors(); }, []);

  // Callback for registration success
  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    fetchMentors();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
      <div className="flex justify-end mb-8">
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          type="button"
          onClick={() => setShowRegisterModal(true)}
        >
          Register to Become a Mentor
        </button>
      </div>
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowRegisterModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-2 sm:mx-auto p-4 md:p-8 relative overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600" onClick={() => setShowRegisterModal(false)}>
              <X size={24} />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Register as a Mentor</h2>
            <MultiStepMentorForm onSuccess={handleRegisterSuccess} />
          </div>
        </div>
      )}
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Meet Our Mentors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with inspiring women who are making a difference in STEAM.
            They are here to guide and support you on your journey.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...mentors, ...dynamicMentors].map((mentor, index) => (
            <MentorCard key={mentor.name + (mentor.email || index)} mentor={mentor} onClick={() => setSelectedMentor(mentor)} />
          ))}
        </div>
      </div>
      {selectedMentor && <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />}
    </div>
  );
};


// MultiStepMentorForm: Responsive, multi-step on mobile, single-step on desktop

const MultiStepMentorForm = ({ onSuccess }) => {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    fullDescription: '',
    image: null,
    website: '',
    linkedin: '',
    twitter: '',
    email: '',
  });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Handlers
  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };
  const next = e => { e && e.preventDefault(); setStep(s => s + 1); };
  const back = e => { e && e.preventDefault(); setStep(s => s - 1); };
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      let imageUrl = '';
      if (form.image) {
        const fileExt = form.image.name.split('.').pop();
        const fileName = `${form.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.${fileExt}`;
        const { data: storageData, error: storageError } = await supabase.storage
          .from('mentor-images')
          .upload(fileName, form.image, { upsert: true });
        if (storageError) throw storageError;
        const { data: publicUrlData } = supabase.storage
          .from('mentor-images')
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
      const { error: insertError } = await supabase
        .from('mentors')
        .insert([
          {
            name: form.name,
            description: form.description,
            full_desc: form.fullDescription,
            image_url: imageUrl,
            website: form.website,
            linkedin: form.linkedin,
            twitter: form.twitter,
            email: form.email,
          },
        ]);
      if (insertError) throw insertError;
      setSuccess(true);
      setForm({
        name: '',
        description: '',
        fullDescription: '',
        image: null,
        website: '',
        linkedin: '',
        twitter: '',
        email: '',
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Basic Info
  const Step1 = (
    <>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Name</label>
        <input name="name" value={form.name} onChange={handleChange} type="text" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" placeholder="Your full name" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Short Description</label>
        <input name="description" value={form.description} onChange={handleChange} type="text" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" placeholder="E.g. Aerospace Engineer at KNUST" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Full Description / Bio</label>
        <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" rows={4} placeholder="Tell us about yourself, your journey, and how you can help..." />
      </div>
    </>
  );
  // Step 2: Links & Image
  const Step2 = (
    <>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Profile Image</label>
        <input name="image" onChange={handleChange} type="file" accept="image/*" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Website</label>
          <input name="website" value={form.website} onChange={handleChange} type="url" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" placeholder="https://yourwebsite.com" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">LinkedIn</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange} type="url" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" placeholder="https://linkedin.com/in/yourprofile" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Twitter</label>
          <input name="twitter" value={form.twitter} onChange={handleChange} type="url" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" placeholder="https://twitter.com/yourhandle" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base" placeholder="you@email.com" />
        </div>
      </div>
    </>
  );

  // Render
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {loading && (
        <div className="w-full flex justify-center items-center mb-2">
          <span className="text-purple-600 font-semibold animate-pulse">Registering mentor, please wait...</span>
        </div>
      )}
      {success && (
        <div className="w-full flex justify-center items-center mb-2">
          <span className="text-green-600 font-semibold">Mentor registered successfully!</span>
        </div>
      )}
      {error && (
        <div className="w-full flex justify-center items-center mb-2">
          <span className="text-red-600 font-semibold">{error}</span>
        </div>
      )}
      {isMobile ? (
        <>
          {step === 1 && Step1}
          {step === 2 && Step2}
          <div className="flex justify-between mt-6">
            {step > 1 && <button onClick={back} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold">Back</button>}
            {step < 2 && <button onClick={next} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">Next</button>}
            {step === 2 && <button type="submit" disabled={loading} className={`px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700'}`}>Submit</button>}
          </div>
        </>
      ) : (
        <>
          {Step1}
          {Step2}
          <div className="flex justify-end mt-6">
            <button type="submit" disabled={loading} className={`px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700'}`}>Submit</button>
          </div>
        </>
      )}
    </form>
  );
};

export default MentorsPage;
