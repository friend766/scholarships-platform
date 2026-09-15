import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { UniversityDetailModal } from './UniversityDetailModal';
import { Badge } from '../common/Badge';
import { 
  Search, 
  Building2, 
  MapPin, 
  Star, 
  Bookmark, 
  BookmarkCheck, 
  Scale, 
  Eye, 
  X,
  ShieldCheck,
  CheckCircle2,
  Globe
} from 'lucide-react';

export const UniversityDiscovery = ({ onApply }) => {
  const { universities, programs, taxonomies, favorites, toggleFavorite, comparisonList, addToCompare, removeFromCompare } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedUniDetail, setSelectedUniDetail] = useState(null);

  const filteredUniversities = useMemo(() => {
    return universities.filter(u => {
      if (u.status !== 'Approved') return false;

      const matchQuery = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCountry = selectedCountry === 'All' || u.country === selectedCountry;
      const matchType = selectedType === 'All' || u.type === selectedType;

      return matchQuery && matchCountry && matchType;
    });
  }, [universities, searchQuery, selectedCountry, selectedType]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-md mb-3 border border-white/20">
            <Building2 className="w-3.5 h-3.5" />
            Accredited Universities
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Explore Leading Global Universities
          </h1>
          <p className="mt-2 text-blue-100 text-sm sm:text-base leading-relaxed">
            Browse institution profiles, degree programs, campus life, entry criteria, and compare tuition options.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search universities by name, city, or country..."
            className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Filter by Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Countries</option>
              {taxonomies.countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Institution Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Types</option>
              <option value="Public Research">Public Research</option>
              <option value="Private Research">Private Research</option>
              <option value="Public Technical">Public Technical</option>
              <option value="Autonomous Research">Autonomous Research</option>
            </select>
          </div>
        </div>
      </div>

      {/* University Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((uni) => {
          const isSaved = favorites.universities.includes(uni.id);
          const isCompared = comparisonList.includes(uni.id);
          const uniProgs = programs.filter(p => p.universityId === uni.id);

          return (
            <div
              key={uni.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Cover Header */}
                <div className="relative h-36 bg-slate-800">
                  <img
                    src={uni.coverImage}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  
                  <button
                    onClick={() => toggleFavorite('universities', uni.id)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                      isSaved
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-900/60 text-white hover:bg-slate-900'
                    }`}
                    title={isSaved ? 'Saved' : 'Save university'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>

                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <img
                      src={uni.logo}
                      alt={uni.name}
                      className="w-14 h-14 rounded-xl border-2 border-white object-cover bg-white shadow-sm"
                    />
                    <Badge variant="indigo" size="sm">{uni.type}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {uni.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      {uni.city}, {uni.country}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {uni.rating}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 font-semibold">
                      Tuition: <strong className="text-slate-900 dark:text-white">{uni.tuitionRange}</strong>
                    </div>
                  </div>

                  {/* Programs */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Featured Programs:</span>
                    <div className="flex flex-wrap gap-1">
                      {uniProgs.slice(0, 2).map(p => (
                        <span key={p.id} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] px-2 py-0.5 rounded-md font-medium truncate max-w-full">
                          {p.name}
                        </span>
                      ))}
                      {uniProgs.length > 2 && (
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] px-2 py-0.5 rounded-md font-medium">
                          +{uniProgs.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => isCompared ? removeFromCompare(uni.id) : addToCompare(uni.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1 ${
                    isCompared
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  {isCompared ? 'Comparing' : '+ Compare'}
                </button>

                <button
                  onClick={() => setSelectedUniDetail(uni)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal */}
      {selectedUniDetail && (
        <UniversityDetailModal
          uni={selectedUniDetail}
          onClose={() => setSelectedUniDetail(null)}
          onApply={onApply}
        />
      )}
    </div>
  );
};
