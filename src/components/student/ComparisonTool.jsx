import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { 
  Scale, 
  X, 
  MapPin, 
  Star, 
  Building2, 
  Globe, 
  GraduationCap, 
  Award,
  CheckCircle,
  Plus
} from 'lucide-react';

export const ComparisonTool = ({ onSelectTab }) => {
  const { comparisonList, removeFromCompare, universities, programs, scholarships } = useApp();

  const selectedUnis = universities.filter(u => comparisonList.includes(u.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 rounded-xl">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Side-by-Side University Comparison
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare key parameters across up to 3 selected higher education institutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            Selected: <strong className="text-indigo-700 dark:text-indigo-400">{selectedUnis.length} / 3</strong>
          </span>
          {selectedUnis.length < 3 && (
            <button
              onClick={() => onSelectTab && onSelectTab('universities')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add University
            </button>
          )}
        </div>
      </div>

      {selectedUnis.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
          <Scale className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Universities Selected for Comparison</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Go to University Discovery and click "+ Compare" on up to 3 universities.
            </p>
          </div>
          <button
            onClick={() => onSelectTab && onSelectTab('universities')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Browse Universities
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto transition-colors">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                <th className="p-4 w-48 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Parameters
                </th>
                {selectedUnis.map((uni) => (
                  <th key={uni.id} className="p-4 w-1/3 border-l border-slate-200 dark:border-slate-800">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 object-cover bg-white dark:bg-slate-800 shrink-0"
                        />
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{uni.name}</h3>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                            {uni.country}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCompare(uni.id)}
                        className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 p-1 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {/* Institution Type */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Institution Type</td>
                {selectedUnis.map(u => (
                  <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                    <Badge variant="indigo">{u.type}</Badge>
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Location</td>
                {selectedUnis.map(u => (
                  <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    {u.city}, {u.country}
                  </td>
                ))}
              </tr>

              {/* Established Year */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Established</td>
                {selectedUnis.map(u => (
                  <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    {u.establishedYear}
                  </td>
                ))}
              </tr>

              {/* Global Rating */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Global Score</td>
                {selectedUnis.map(u => (
                  <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1 font-extrabold text-amber-600 dark:text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {u.rating} / 5.0
                    </div>
                  </td>
                ))}
              </tr>

              {/* Tuition Range */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Tuition Range</td>
                {selectedUnis.map(u => (
                  <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800 font-extrabold text-indigo-700 dark:text-indigo-400">
                    {u.tuitionRange}
                  </td>
                ))}
              </tr>

              {/* Offered Programs Count */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Degree Programs</td>
                {selectedUnis.map(u => {
                  const uniProgs = programs.filter(p => p.universityId === u.id);
                  return (
                    <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 dark:text-white block">{uniProgs.length} Programs Listed</span>
                        <div className="space-y-1 mt-1">
                          {uniProgs.slice(0, 3).map(p => (
                            <span key={p.id} className="block text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-1 rounded font-medium truncate border border-transparent dark:border-slate-700">
                              {p.name} ({p.degree})
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Scholarships Available */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Available Scholarships</td>
                {selectedUnis.map(u => {
                  const uniSchs = scholarships.filter(s => s.universityId === u.id);
                  return (
                    <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800">
                      <div className="space-y-1">
                        {uniSchs.map(s => (
                          <div key={s.id} className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 p-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/50 font-medium text-[11px]">
                            <strong className="block text-emerald-900 dark:text-emerald-200">{s.name}</strong>
                            <span>{s.fundingType} ({s.amount})</span>
                          </div>
                        ))}
                        {uniSchs.length === 0 && <span className="text-slate-400 dark:text-slate-500">None listed</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* International Student Policy */}
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">Int'l Student Policy</td>
                {selectedUnis.map(u => (
                  <td key={u.id} className="p-4 border-l border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                    {u.intStudentInfo || 'Standard international application rules apply.'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
