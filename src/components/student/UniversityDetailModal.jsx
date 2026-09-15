import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { 
  X, 
  MapPin, 
  Globe, 
  Calendar, 
  Award, 
  BookOpen, 
  Star, 
  CheckCircle, 
  Send,
  Building,
  GraduationCap
} from 'lucide-react';

export const UniversityDetailModal = ({ uni, onClose, onApply }) => {
  const { programs, scholarships, favorites, toggleFavorite, comparisonList, addToCompare, removeFromCompare } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'programs' | 'scholarships'

  if (!uni) return null;

  const uniPrograms = programs.filter(p => p.universityId === uni.id);
  const uniScholarships = scholarships.filter(s => s.universityId === uni.id);
  const isCompared = comparisonList.includes(uni.id);
  const isSaved = favorites.universities.includes(uni.id);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Cover Header */}
        <div className="relative h-48 sm:h-56 bg-slate-800">
          <img
            src={uni.coverImage}
            alt={uni.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute right-4 top-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img
                src={uni.logo}
                alt={uni.name}
                className="w-20 h-20 rounded-2xl border-4 border-white dark:border-slate-800 object-cover bg-white dark:bg-slate-800 shadow-md"
              />
              <div className="text-white pb-1">
                <span className="bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  {uni.type}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-heading mt-1 leading-tight">{uni.name}</h2>
                <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {uni.city}, {uni.country}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 pb-1">
              <button
                onClick={() => toggleFavorite('universities', uni.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  isSaved ? 'bg-purple-600 text-white' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={() => isCompared ? removeFromCompare(uni.id) : addToCompare(uni.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  isCompared ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                }`}
              >
                {isCompared ? 'In Compare' : '+ Compare'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'overview' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overview & Campus
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'programs' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Degree Programs ({uniPrograms.length})
          </button>
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'scholarships' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Scholarships ({uniScholarships.length})
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-slate-900">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Est. Year</span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{uni.establishedYear}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Rating</span>
                  <p className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-0.5 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {uni.rating} / 5.0
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Tuition Range</span>
                  <p className="text-sm font-extrabold text-indigo-700 dark:text-indigo-400 mt-0.5">{uni.tuitionRange}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Official Web</span>
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mt-1 truncate"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    Visit Site
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">About the Institution</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{uni.description}</p>
              </div>

              {uni.history && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">History & Heritage</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{uni.history}</p>
                </div>
              )}

              {uni.campusInfo && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Campus Environment</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{uni.campusInfo}</p>
                </div>
              )}

              {uni.intStudentInfo && (
                <div className="bg-indigo-50/50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    International Student Policy
                  </h4>
                  <p className="text-xs text-indigo-800 dark:text-indigo-300 mt-1 leading-relaxed">{uni.intStudentInfo}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="space-y-4">
              {uniPrograms.map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="indigo">{p.degree}</Badge>
                      <Badge variant="purple">{p.field}</Badge>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{p.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Duration: {p.duration} | Tuition: {p.tuition}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2"><strong className="text-slate-900 dark:text-white">Entry Requirements:</strong> {p.requirements}</p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <button
                      onClick={() => {
                        onClose();
                        onApply && onApply({ universityName: uni.name, programName: p.name });
                      }}
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Apply Program
                    </button>
                  </div>
                </div>
              ))}
              {uniPrograms.length === 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-8">No degree programs currently listed.</p>
              )}
            </div>
          )}

          {activeTab === 'scholarships' && (
            <div className="space-y-4">
              {uniScholarships.map((s) => (
                <div key={s.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <Badge variant={s.fundingType === 'Fully Funded' ? 'success' : 'warning'}>{s.fundingType}</Badge>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">{s.name}</h4>
                    <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">Award: {s.amount}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Deadline: {s.deadline}</p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <button
                      onClick={() => {
                        onClose();
                        onApply && onApply({ universityName: uni.name, scholarshipName: s.name });
                      }}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Apply Grant
                    </button>
                  </div>
                </div>
              ))}
              {uniScholarships.length === 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-8">No dedicated scholarships listed for this university yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Official Partner Institution</span>
          <button
            onClick={() => {
              onClose();
              onApply && onApply({ universityName: uni.name });
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
          >
            Apply to {uni.name}
          </button>
        </div>
      </div>
    </div>
  );
};
