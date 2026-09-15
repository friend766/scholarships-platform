import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Bookmark, Building2, Award, Trash2, ArrowRight } from 'lucide-react';

export const FavoritesView = ({ onApply }) => {
  const { favorites, toggleFavorite, universities, scholarships } = useApp();

  const savedUnis = universities.filter(u => favorites.universities.includes(u.id));
  const savedSchs = scholarships.filter(s => favorites.scholarships.includes(s.id));

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 rounded-xl">
              <Bookmark className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Your Bookmarked Opportunities
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access your saved university profiles and preferred scholarship opportunities.
          </p>
        </div>
      </div>

      {/* Saved Universities */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Saved Universities ({savedUnis.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedUnis.map(u => (
            <div key={u.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3">
                <img src={u.logo} alt={u.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{u.city}, {u.country}</span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite('universities', u.id)}
                className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 p-2 transition-colors"
                title="Remove favorite"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {savedUnis.length === 0 && (
            <p className="text-xs text-slate-400 dark:text-slate-500 py-4 italic">No universities saved yet.</p>
          )}
        </div>
      </div>

      {/* Saved Scholarships */}
      <div className="space-y-3 pt-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Saved Scholarships ({savedSchs.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedSchs.map(s => (
            <div key={s.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between gap-4 transition-colors">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</h4>
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mt-0.5">{s.amount}</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">Deadline: {s.deadline}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onApply && onApply({ scholarshipName: s.name, universityName: s.provider })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => toggleFavorite('scholarships', s.id)}
                  className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 p-2 transition-colors"
                  title="Remove favorite"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {savedSchs.length === 0 && (
            <p className="text-xs text-slate-400 dark:text-slate-500 py-4 italic">No scholarships saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
