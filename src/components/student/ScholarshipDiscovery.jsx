import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { 
  Search, 
  Award, 
  GraduationCap, 
  Calendar, 
  Bookmark, 
  BookmarkCheck,
  Send,
  Sparkles,
  Info,
  DollarSign,
  ChevronRight,
  X,
  Globe,
  Building2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ScholarshipDiscovery = ({ onSelectScholarship, onApply }) => {
  const { scholarships, taxonomies, favorites, toggleFavorite } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [selectedField, setSelectedField] = useState('All');
  const [selectedFunding, setSelectedFunding] = useState('All');
  const [activeScholarshipDetail, setActiveScholarshipDetail] = useState(null);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(s => {
      const matchQuery = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCountry = selectedCountry === 'All' || s.country === selectedCountry;
      const matchDegree = selectedDegree === 'All' || s.degree === selectedDegree || s.degree === 'All Degrees';
      const matchField = selectedField === 'All' || s.field === selectedField || s.field === 'All Fields';
      const matchFunding = selectedFunding === 'All' || s.fundingType === selectedFunding;

      return matchQuery && matchCountry && matchDegree && matchField && matchFunding;
    });
  }, [scholarships, searchQuery, selectedCountry, selectedDegree, selectedField, selectedFunding]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('All');
    setSelectedDegree('All');
    setSelectedField('All');
    setSelectedFunding('All');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <Award className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            Global Grant Directory 2026
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Find Fully Funded Scholarships & Grants
          </h1>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base leading-relaxed">
            Discover thousands of degree scholarships, tuition waivers, and monthly stipends tailored to your academic background.
          </p>
        </div>
      </div>

      {/* Prominent Search Bar & Filters Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scholarships by title, provider, field, or keywords..."
            className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Countries</option>
              {taxonomies.countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Degree Level</label>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Degrees</option>
              {taxonomies.degreeLevels.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Field of Study</label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Fields</option>
              {taxonomies.fieldsOfStudy.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Funding Type</label>
            <select
              value={selectedFunding}
              onChange={(e) => setSelectedFunding(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Types</option>
              {taxonomies.fundingTypes.map(ft => <option key={ft} value={ft}>{ft}</option>)}
            </select>
          </div>
        </div>

        {/* Filter Reset bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-white">{filteredScholarships.length}</strong> available opportunities
          </span>
          {(searchQuery || selectedCountry !== 'All' || selectedDegree !== 'All' || selectedField !== 'All' || selectedFunding !== 'All') && (
            <button
              onClick={resetFilters}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScholarships.map((s) => {
          const isSaved = favorites.scholarships.includes(s.id);
          const isFullyFunded = s.fundingType === 'Fully Funded';

          return (
            <div
              key={s.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all p-6 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={isFullyFunded ? 'success' : 'warning'}>
                      {s.fundingType}
                    </Badge>
                    <Badge variant="indigo">
                      {s.country}
                    </Badge>
                  </div>

                  <button
                    onClick={() => toggleFavorite('scholarships', s.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isSaved
                        ? 'bg-purple-50 dark:bg-purple-950/80 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                    title={isSaved ? 'Remove from favorites' : 'Save scholarship'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Title & Provider */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  {s.provider}
                </p>

                {/* Key Details */}
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mr-1.5" />
                    <span className="font-bold text-slate-900 dark:text-white mr-1">Award:</span> {s.amount}
                  </div>
                  <div className="flex items-center text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mr-1.5" />
                    <span className="font-bold text-slate-900 dark:text-white mr-1">Deadline:</span> {s.deadline}
                  </div>
                  <div className="flex items-start text-xs text-slate-600 dark:text-slate-400">
                    <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mr-1.5 mt-0.5" />
                    <span><strong className="text-slate-800 dark:text-slate-200">Eligibility:</strong> {s.eligibility}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveScholarshipDetail(s)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
                >
                  View Requirements
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onApply && onApply({ scholarshipName: s.name, universityName: s.provider })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Apply Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {activeScholarshipDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setActiveScholarshipDetail(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <Badge variant="success">{activeScholarshipDetail.fundingType}</Badge>
              <Badge variant="indigo">{activeScholarshipDetail.country}</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">{activeScholarshipDetail.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{activeScholarshipDetail.provider}</p>

            <div className="space-y-3 pt-2">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Funding Details:</span>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{activeScholarshipDetail.amount}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Eligible Degrees:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeScholarshipDetail.degreeLevels?.map(d => (
                    <span key={d} className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-xs font-medium border border-indigo-200 dark:border-indigo-800">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Requirements & Criteria:</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{activeScholarshipDetail.requirements}</p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveScholarshipDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = activeScholarshipDetail;
                  setActiveScholarshipDetail(null);
                  onApply && onApply({ scholarshipName: target.name, universityName: target.provider });
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Start Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
