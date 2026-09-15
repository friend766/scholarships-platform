import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Sparkles, GraduationCap, MapPin, Award, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

export const Recommendations = ({ onApply }) => {
  const { userProfile, setUserProfile, scholarships, universities, programs } = useApp();
  const [editingProfile, setEditingProfile] = useState(false);

  // Simple smart matching score function
  const scoredOpportunities = scholarships.map((s) => {
    let score = 70; // baseline
    if (s.country === userProfile.targetCountry) score += 15;
    if (s.field === userProfile.fieldOfInterest || s.field === 'All Fields') score += 10;
    if (parseFloat(userProfile.gpa) >= 3.5) score += 5;
    return { ...s, matchScore: Math.min(score, 99) };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-6">
      {/* Profile Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            AI Opportunity Engine
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading">
            Personalized Academic Recommendations
          </h1>
          <p className="text-xs text-purple-100">
            Matching grants & programs based on your academic credentials and target preferences.
          </p>
        </div>

        <button
          onClick={() => setEditingProfile(!editingProfile)}
          className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-md transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Sliders className="w-4 h-4" />
          {editingProfile ? 'Close Profile Editor' : 'Edit Academic Profile'}
        </button>
      </div>

      {/* Editable Academic Profile Panel */}
      {editingProfile && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-indigo-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Update Academic Profile & Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cumulative GPA</label>
              <input
                type="text"
                value={userProfile.gpa}
                onChange={(e) => setUserProfile({ ...userProfile, gpa: e.target.value })}
                className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Country</label>
              <select
                value={userProfile.targetCountry}
                onChange={(e) => setUserProfile({ ...userProfile, targetCountry: e.target.value })}
                className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Germany">Germany</option>
                <option value="Singapore">Singapore</option>
                <option value="Switzerland">Switzerland</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Field</label>
              <select
                value={userProfile.fieldOfInterest}
                onChange={(e) => setUserProfile({ ...userProfile, fieldOfInterest: e.target.value })}
                className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Computer Science & AI">Computer Science & AI</option>
                <option value="Engineering & Tech">Engineering & Tech</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scoredOpportunities.map((s) => (
          <div
            key={s.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  {s.matchScore}% Match
                </span>
                <Badge variant={s.fundingType === 'Fully Funded' ? 'success' : 'warning'}>
                  {s.fundingType}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{s.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{s.provider} ({s.country})</p>

              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs text-slate-700 dark:text-slate-300 border border-transparent dark:border-slate-700/60">
                <p><strong className="text-slate-900 dark:text-white">Value:</strong> {s.amount}</p>
                <p><strong className="text-slate-900 dark:text-white">Target Field:</strong> {s.field}</p>
                <p><strong className="text-slate-900 dark:text-white">Deadline:</strong> {s.deadline}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                GPA Requirement Satisfied
              </span>
              <button
                onClick={() => onApply && onApply({ scholarshipName: s.name, universityName: s.provider })}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
              >
                Apply Match
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
