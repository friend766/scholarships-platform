import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2 } from 'lucide-react';

export const TaxonomyManagement = () => {
  const { taxonomies, addTaxonomyItem, deleteTaxonomyItem } = useApp();
  const [activeCategory, setActiveCategory] = useState('countries');
  const [newValue, setNewValue] = useState('');

  const categoryLabels = {
    countries: 'Countries & Regions',
    degreeLevels: 'Degree Levels',
    fieldsOfStudy: 'Fields of Study',
    fundingTypes: 'Funding & Grant Types'
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newValue.trim()) {
      addTaxonomyItem(activeCategory, newValue.trim());
      setNewValue('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            Content Taxonomy & Search Metadata
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 4: Control global searchable taxonomy categories used across discovery engines.
          </p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-t-2xl px-4 transition-colors">
        {Object.keys(categoryLabels).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeCategory === cat ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {categoryLabels[cat]} ({taxonomies[cat]?.length || 0})
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-b-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
        <form onSubmit={handleAdd} className="flex gap-2 max-w-md">
          <input
            type="text"
            placeholder={`Add new item to ${categoryLabels[activeCategory]}...`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="flex-1 h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {taxonomies[activeCategory]?.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-3 py-1.5 rounded-xl font-medium"
            >
              {item}
              <button
                onClick={() => deleteTaxonomyItem(activeCategory, item)}
                className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
