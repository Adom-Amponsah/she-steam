'use client';

import React from 'react';
import { Button } from './ui/Button';
import { ArrowLeft, Calendar, MapPin, Award, Briefcase, GraduationCap, Trophy, ExternalLink, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';

const competitions = [
  {
    title: "Yaa Asantewaa Art Prize 2025",
    organizer: "Gallery 1957",
    deadline: "September 19, 2025",
    email: "applications@gallery1957.com",
    description: "Submit your artwork for the prestigious Yaa Asantewaa Art Prize.",
    type: "Art"
  },
  {
    title: "National Heritage Photo Competition 2025",
    organizer: "Ministry of Tourism, Arts and Culture",
    deadline: "Open",
    email: "heritagesites@motac.gov.gh",
    description: "Capture and showcase Ghana's rich cultural heritage through photography.",
    type: "Photography"
  },
  {
    title: "AIMS Girls in Mathematical Sciences Program (GMSP)",
    organizer: "AIMS Ghana",
    deadline: "2025",
    link: "aims.edu.gh/girls-in-mathematical-sciences-programme",
    description: "Join the prestigious program designed to empower girls in mathematical sciences.",
    type: "Mathematics"
  },
  {
    title: "Ghana STEM Explorer Prize (GSTEP) 2025",
    organizer: "GSTEP",
    deadline: "2025",
    link: "www.gstep.org.gh",
    description: "Showcase your STEM innovations and compete for the national prize.",
    type: "STEM"
  },
  {
    title: "Quantum Computing Challenge 2025",
    organizer: "Quantum Initiative",
    deadline: "2025",
    link: "quantum2025.org/news-link/uncertain-sea-principle",
    description: "Explore the frontiers of quantum computing in this innovative challenge.",
    type: "Technology"
  }
];

const CompetitionCard = ({ competition }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{competition.title}</h3>
        <p className="text-gray-600">{competition.organizer}</p>
      </div>
      <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium">
        {competition.type}
      </span>
    </div>

    <p className="text-gray-600 mb-4">{competition.description}</p>

    <div className="space-y-2 mb-4">
      <div className="flex items-center text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Deadline: {competition.deadline}</span>
      </div>
      {competition.email && (
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span>{competition.email}</span>
        </div>
      )}
    </div>

    {competition.link && (
      <Button 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        onClick={() => window.open(`https://${competition.link}`, '_blank')}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Apply Now
      </Button>
    )}
  </div>
);

const Opportunities = () => {
  const [selectedOpportunity, setSelectedOpportunity] = React.useState(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  function handleLearnMore(opportunity) {
    setSelectedOpportunity(opportunity);
    setShowDetailsModal(true);
  }

  function closeDetailsModal() {
    setShowDetailsModal(false);
    setSelectedOpportunity(null);
  }
  const router = useRouter();

  const opportunities = [
    {
      id: 1,
      type: 'Scholarship',
      icon: GraduationCap,
      title: 'TechWomen Africa Scholarship',
      description: 'Full tuition scholarship for African girls pursuing computer science or engineering degrees.',
      deadline: 'March 15, 2024',
      location: 'Pan-African',
      bgColor: 'from-purple-500 to-indigo-500'
    },
    {
      id: 2,
      type: 'Internship',
      icon: Briefcase,
      title: 'Google Summer Internship',
      description: 'Paid summer internship program for young women in technology and software development.',
      deadline: 'February 28, 2024',
      location: 'Lagos, Nigeria',
      bgColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 4,
      type: 'Career Program',
      icon: Award,
      title: 'STEM Leadership Academy',
      description: 'Year-long program developing leadership skills for future STEM professionals.',
      deadline: 'Rolling Admissions',
      location: 'Nairobi, Kenya',
      bgColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      type: 'Scholarship',
      icon: GraduationCap,
      title: 'Microsoft TEALS Scholarship',
      description: 'Scholarship program supporting girls pursuing computer science education.',
      deadline: 'May 15, 2024',
      location: 'Multiple Countries',
      bgColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 6,
      type: 'Internship',
      icon: Briefcase,
      title: 'IBM Research Internship',
      description: 'Research internship focusing on AI and machine learning for social good.',
      deadline: 'March 31, 2024',
      location: 'Johannesburg, SA',
      bgColor: 'from-violet-500 to-purple-500'
    }
  ];

  // --- Modal State ---
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({
    type: '',
    title: '',
    description: '',
    deadline: '',
    location: '',

    url: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [dynamicOpportunities, setDynamicOpportunities] = React.useState([]);

  // --- Fetch dynamic opportunities from Supabase ---
  React.useEffect(() => {
    async function fetchOpportunities() {
      try {
        setLoading(true);
        setError('');
        const { data, error } = await (await import('../lib/supabaseClient')).default
          .from('opportunities')
          .select('*')
          .order('created_at', { ascending: false });
        console.log('[fetchOpportunities] Raw Supabase data:', data);
        if (error) {
          console.error('[fetchOpportunities] Supabase error:', error);
          throw error;
        }
        // Map data to add icon and bgColor
        const mapped = (data || []).map((opp) => ({
          ...opp,
          icon:
            opp.type === 'Scholarship'
              ? GraduationCap
              : opp.type === 'Internship'
              ? Briefcase
              : opp.type === 'Career Program'
              ? Award
              : opp.type === 'Competition'
              ? Trophy
              : Briefcase,
          bgColor:
            opp.type === 'Scholarship'
              ? 'from-purple-500 to-indigo-500'
              : opp.type === 'Internship'
              ? 'from-pink-500 to-rose-500'
              : opp.type === 'Career Program'
              ? 'from-blue-500 to-cyan-500'
              : opp.type === 'Competition'
              ? 'from-orange-500 to-yellow-500'
              : 'from-purple-400 to-pink-400',
          id: opp.id || opp.title,
        }));
        console.log('[fetchOpportunities] Mapped opportunities:', mapped);
        setDynamicOpportunities(mapped);
      } catch (err) {
        setError('Could not load opportunities.');
      } finally {
        setLoading(false);
      }
    }
    fetchOpportunities();
  }, [success]);

  // --- Merge static and dynamic ---
  // Assign bgColor by type at render time
  function getBgColor(type) {
    switch (type) {
      case 'Scholarship': return 'from-purple-500 to-indigo-500';
      case 'Internship': return 'from-pink-500 to-rose-500';
      case 'Career Program': return 'from-blue-500 to-cyan-500';
      case 'Competition': return 'from-orange-500 to-yellow-500';
      default: return 'from-purple-400 to-pink-400';
    }
  }
  const allOpportunities = [
    ...dynamicOpportunities.map((opp) => ({
      ...opp,
      icon: opp.type === 'Scholarship'
  ? GraduationCap
  : opp.type === 'Internship'
  ? Briefcase
  : opp.type === 'Career Program'
  ? Award
  : opp.type === 'Competition'
  ? Trophy
  : Briefcase,
      id: opp.id || opp.title,
      bgColor: getBgColor(opp.type),
    })),
    ...opportunities,
  ];

  // --- Modal Form Handlers ---
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const { error } = await (await import('../lib/supabaseClient')).default
        .from('opportunities')
        .insert([
          { ...form }
        ]);
      if (error) throw error;
      setSuccess(true);
      setShowModal(false);
      setForm({ type: '', title: '', description: '', deadline: '', location: '', url: '' });
    } catch (err) {
      setError('Could not add opportunity.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                className="text-purple-700 hover:text-purple-800 p-2 sm:p-3"
                onClick={() => router.push('/home')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Back to Home</span>
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SheSTEAM
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {/* Add Opportunity Button */}
        <div className="flex justify-end mb-6">
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold text-base shadow-md"
            onClick={() => setShowModal(true)}
          >
            + Add Opportunity
          </Button>
        </div>

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-2 p-8 relative animate-fadeInUp">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4 text-purple-700">Add New Opportunity</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-900 bg-white"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Internship">Internship</option>
                    <option value="Career Program">Career Program</option>
                    <option value="Competition">Competition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-900"
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold text-base shadow-md mt-2"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Opportunity'}
                </Button>
                {success && <div className="text-green-600 text-sm mt-2">Opportunity added!</div>}
              </form>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Your Future Starts Here
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Opportunities for You
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Discover scholarships, internships, competitions, and career programs designed to empower your STEAM journey.
          </p>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="all" className="space-y-6 sm:space-y-8">
          <div className="overflow-x-auto -mx-4 px-4 sm:overflow-visible sm:px-0">
            <TabsList className="bg-white/50 p-1 rounded-2xl border border-purple-100 w-auto inline-flex sm:w-full">
              <TabsTrigger value="all" className="rounded-xl py-2 sm:py-3 px-4 sm:px-6 text-sm whitespace-nowrap">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                All Opportunities
              </TabsTrigger>
              <TabsTrigger value="scholarships" className="rounded-xl py-2 sm:py-3 px-4 sm:px-6 text-sm whitespace-nowrap">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Scholarships
              </TabsTrigger>
              <TabsTrigger value="internships" className="rounded-xl py-2 sm:py-3 px-4 sm:px-6 text-sm whitespace-nowrap">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Internships
              </TabsTrigger>
              <TabsTrigger value="competitions" className="rounded-xl py-2 sm:py-3 px-4 sm:px-6 text-sm whitespace-nowrap">
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Competitions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {allOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} onLearnMore={handleLearnMore} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {allOpportunities
                .filter(opp => opp.type === 'Scholarship')
                .map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} onLearnMore={handleLearnMore} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="internships">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {allOpportunities
                .filter(opp => opp.type === 'Internship')
                .map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} onLearnMore={handleLearnMore} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="competitions">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {allOpportunities
                .filter(opp => opp.type === 'Competition')
                .map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} onLearnMore={handleLearnMore} />
                ))}
              {competitions.map((competition, index) => (
                <CompetitionCard key={index} competition={competition} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Opportunity Details Modal */}
        {showDetailsModal && selectedOpportunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-2 p-8 relative animate-fadeInUp">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={closeDetailsModal}
                aria-label="Close"
              >
                ×
              </button>
              <div className={`bg-gradient-to-r ${selectedOpportunity.bgColor} p-4 rounded-xl mb-4 text-white flex items-center justify-between`}>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  {selectedOpportunity.type}
                </span>
                {selectedOpportunity.icon && (
                  <selectedOpportunity.icon className="w-6 h-6" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-purple-700 mb-2">{selectedOpportunity.title}</h2>
              <p className="mb-4 text-gray-700">{selectedOpportunity.description}</p>
              <div className="mb-2 flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Deadline: {selectedOpportunity.deadline}</span>
              </div>
              <div className="mb-2 flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Location: {selectedOpportunity.location}</span>
              </div>
              {selectedOpportunity.url && (
                <div className="mb-2">
                  <a href={selectedOpportunity.url.startsWith('http') ? selectedOpportunity.url : `https://${selectedOpportunity.url}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    {selectedOpportunity.url}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Don't See What You're Looking For?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-5 sm:mb-6">
              We're constantly adding new opportunities. Subscribe to our newsletter to get notified about the latest STEAM opportunities for young women.
            </p>
            <Button 
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
            >
              Subscribe for Updates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted OpportunityCard component for better organization and reusability
const OpportunityCard = ({ opportunity, onLearnMore }) => {
  const IconComponent = opportunity.icon;
  
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`bg-gradient-to-r ${opportunity.bgColor} p-4 sm:p-6 text-white`}>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
            {opportunity.type}
          </span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{opportunity.title}</h3>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          {opportunity.description}
        </p>
        
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
            <span>{opportunity.deadline}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
            <span>{opportunity.location}</span>
          </div>
        </div>

        <Button 
          className={`w-full bg-gradient-to-r ${opportunity.bgColor} hover:opacity-90 text-white font-semibold py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105`}
          onClick={() => onLearnMore(opportunity)}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Opportunities; 