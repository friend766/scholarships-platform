import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Calendar, Clock, AlertTriangle, CheckCircle2, ArrowRight, Bell } from 'lucide-react';

export const DeadlineTracker = ({ onApply }) => {
  const { scholarships } = useApp();

  // Helper to calculate days remaining from current date (2026-09-05)
  const calculateDaysRemaining = (deadlineStr) => {
    const today = new Date('2026-09-05');
    const deadline = new Date(deadlineStr);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedScholarships = [...scholarships].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Global Scholarship Deadline Tracker
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Stay updated with upcoming application cutoffs, living stipends, and document submission targets.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Automatic Reminders Active</span>
        </div>
      </div>

      {/* Deadline Cards List */}
      <div className="space-y-4">
        {sortedScholarships.map((s) => {
          const daysLeft = calculateDaysRemaining(s.deadline);
          
          let badgeVariant = 'success';
          let statusText = `${daysLeft} Days Left`;
          
          if (daysLeft < 0) {
            badgeVariant = 'gray';
            statusText = 'Closed';
          } else if (daysLeft <= 14) {
            badgeVariant = 'error';
            statusText = `CLOSING SOON: ${daysLeft} Days`;
          } else if (daysLeft <= 30) {
            badgeVariant = 'warning';
            statusText = `${daysLeft} Days Left`;
          }

          return (
            <div
              key={s.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={badgeVariant}>{statusText}</Badge>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Cutoff Date: {s.deadline}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{s.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Provided by <strong className="text-slate-700 dark:text-slate-300">{s.provider}</strong> ({s.country}) • {s.amount}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => onApply && onApply({ scholarshipName: s.name, universityName: s.provider })}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Start Application
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
