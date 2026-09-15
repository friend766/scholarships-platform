import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Award, Plus, Trash2 } from 'lucide-react';

export const ScholarshipManager = () => {
  const { scholarships, addScholarship, deleteScholarship } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [newSch, setNewSch] = useState({
    name: '',
    provider: 'University Admin',
    amount: 'Full Tuition Waiver',
    fundingType: 'Fully Funded',
    eligibility: 'International Applicants',
    deadline: '2026-11-30',
    country: 'United Kingdom'
  });

  const handleSave = (e) => {
    e.preventDefault();
    addScholarship(newSch);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            Institutional Scholarship Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create, update, and manage funding offers available to prospective students.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Scholarship
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scholarships.map((s) => (
          <div key={s.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative transition-colors">
            <button
              onClick={() => deleteScholarship(s.id)}
              className="absolute right-4 top-4 text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <Badge variant={s.fundingType === 'Fully Funded' ? 'success' : 'warning'}>{s.fundingType}</Badge>
            <h3 className="font-bold text-slate-900 dark:text-white text-base font-heading">{s.name}</h3>
            <p className="text-xs text-indigo-700 dark:text-indigo-400 font-bold">Award: {s.amount}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Deadline: {s.deadline}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Create New Scholarship</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Scholarship Title</label>
                <input
                  type="text"
                  required
                  value={newSch.name}
                  onChange={(e) => setNewSch({ ...newSch, name: e.target.value })}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Funding Type</label>
                <select
                  value={newSch.fundingType}
                  onChange={(e) => setNewSch({ ...newSch, fundingType: e.target.value })}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg"
                >
                  <option value="Fully Funded">Fully Funded</option>
                  <option value="Partial Funding">Partial Funding</option>
                  <option value="Stipend Only">Stipend Only</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Amount / Coverage</label>
                <input
                  type="text"
                  value={newSch.amount}
                  onChange={(e) => setNewSch({ ...newSch, amount: e.target.value })}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
                <input
                  type="date"
                  value={newSch.deadline}
                  onChange={(e) => setNewSch({ ...newSch, deadline: e.target.value })}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-xs"
                >
                  Publish Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
