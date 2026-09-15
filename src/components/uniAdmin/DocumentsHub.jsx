import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { FolderOpen, Upload, FileText, Download, Trash2, Search, Plus, CheckCircle2 } from 'lucide-react';

export const DocumentsHub = () => {
  const [docsList, setDocsList] = useState([
    {
      id: 'doc-1',
      title: 'Official_Institutional_Prospectus_2026.pdf',
      category: 'Prospectus',
      size: '4.8 MB',
      updated: '2026-08-15',
      downloads: 142
    },
    {
      id: 'doc-2',
      title: 'International_Student_Admission_Policy.pdf',
      category: 'Admission Policy',
      size: '1.2 MB',
      updated: '2026-08-20',
      downloads: 89
    },
    {
      id: 'doc-3',
      title: 'Global_Accreditation_Certificate_ISO9001.pdf',
      category: 'Accreditation',
      size: '2.5 MB',
      updated: '2026-07-10',
      downloads: 210
    },
    {
      id: 'doc-4',
      title: 'Computer_Science_Course_Syllabus_2026.pdf',
      category: 'Syllabus',
      size: '3.1 MB',
      updated: '2026-08-01',
      downloads: 67
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setTimeout(() => {
      const newDocs = files.map((f, idx) => ({
        id: `doc-${Date.now()}-${idx}`,
        title: f.name,
        category: 'Official File',
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        updated: new Date().toISOString().split('T')[0],
        downloads: 0
      }));
      setDocsList(prev => [...newDocs, ...prev]);
      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 600);
  };

  const handleDelete = (id) => {
    setDocsList(prev => prev.filter(d => d.id !== id));
  };

  const filteredDocs = docsList.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-xl">
              <FolderOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Institutional Documents Hub
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage university prospectuses, accreditation PDFs, brochures, and supporting admission guidelines.
          </p>
        </div>

        {uploadSuccess && (
          <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Document Uploaded!
          </span>
        )}
      </div>

      {/* Upload Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Upload New Document</h3>
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
            {uploading ? 'Processing & Uploading Files...' : 'Click or Drag files to upload to Institutional Repository'}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">PDF, DOCX, ZIP up to 50MB</span>
        </div>
      </div>

      {/* Search & Document Roster */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search document title or category..."
              className="w-full h-9 pl-9 pr-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>

          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Total Files: {filteredDocs.length}
          </span>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold">
              <th className="p-4">Document Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">File Size</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="truncate max-w-xs">{doc.title}</span>
                </td>
                <td className="p-4">
                  <Badge variant="indigo">{doc.category}</Badge>
                </td>
                <td className="p-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">{doc.size}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{doc.updated}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleFileDownload(doc.title)}
                    className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                    title="Delete Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDocs.length === 0 && (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-8">No documents found matching query.</p>
        )}
      </div>
    </div>
  );
};
