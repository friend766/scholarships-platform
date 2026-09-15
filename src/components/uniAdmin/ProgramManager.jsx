import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { GraduationCap, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

export const ProgramManager = () => {
  const { programs, addProgram, deleteProgram, taxonomies } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [newProg, setNewProg] = useState({
    universityId: 'uni-1',
    name: '',
    degree: "Master's",
    field: 'Computer Science & AI',
    duration: '1 Year',
    tuition: '$30,000 / yr',
    requirements: 'Bachelor in CS'
  });

  const handleSave = (e) => {
    e.preventDefault();
    addProgram(newProg);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            Degree Programs Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maintain your university's active degree offerings and entry prerequisites.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold">
              <th className="p-4">Program Name</th>
              <th className="p-4">Degree</th>
              <th className="p-4">Field</th>
              <th className="p-4">Duration & Tuition</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {programs.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{p.name}</td>
                <td className="p-4"><Badge variant="indigo">{p.degree}</Badge></td>
                <td className="p-4 text-slate-700 dark:text-slate-300">{p.field}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{p.duration} • <strong className="text-slate-900 dark:text-white">{p.tuition}</strong></td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteProgram(p.id)}
                    className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1 transition-colors"
                    title="Delete Program"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Add New Degree Program</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Program Title</label>
                <input
                  type="text"
                  required
                  value={newProg.name}
                  onChange={(e) => setNewProg({ ...newProg, name: e.target.value })}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Degree Level</label>
                <select
                  value={newProg.degree}
                  onChange={(e) => setNewProg({ ...newProg, degree: e.target.value })}
                  className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg"
                >
                  {taxonomies.degreeLevels.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tuition Fee</label>
                <input
                  type="text"
                  value={newProg.tuition}
                  onChange={(e) => setNewProg({ ...newProg, tuition: e.target.value })}
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
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
