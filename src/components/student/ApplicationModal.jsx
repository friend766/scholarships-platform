import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Upload, CheckCircle2, FileText, Send, AlertCircle } from 'lucide-react';

export const ApplicationModal = ({ initialData, onClose }) => {
  const { submitApplication, universities, programs, scholarships, userProfile } = useApp();

  const [selectedUniId, setSelectedUniId] = useState(
    initialData?.universityName
      ? universities.find(u => u.name === initialData.universityName)?.id || universities[0]?.id
      : universities[0]?.id
  );
  
  const [selectedProgName, setSelectedProgName] = useState(initialData?.programName || '');
  const [selectedSchName, setSelectedSchName] = useState(initialData?.scholarshipName || '');
  const [documents, setDocuments] = useState([
    { name: 'Academic_Transcript_Official.pdf', size: '1.4 MB' },
    { name: 'Statement_of_Purpose_2026.pdf', size: '820 KB' }
  ]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedUni = universities.find(u => u.id === selectedUniId) || universities[0];
  const uniProgs = programs.filter(p => p.universityId === selectedUni?.id);
  const uniSchs = scholarships.filter(s => s.universityId === selectedUni?.id);

  const handleSimulatedUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setTimeout(() => {
      const newDocs = files.map(f => ({
        name: f.name,
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`
      }));
      setDocuments(prev => [...prev, ...newDocs]);
      setUploading(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitApplication({
      universityId: selectedUni.id,
      universityName: selectedUni.name,
      programName: selectedProgName || (uniProgs[0]?.name || 'General Admission'),
      scholarshipName: selectedSchName || (uniSchs[0]?.name || 'Standard Tuition Waiver'),
      documents
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative border border-slate-200 dark:border-slate-800 transition-colors">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">Application Submitted Successfully!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Your application for <strong className="text-slate-800 dark:text-slate-200">{selectedUni.name}</strong> has been transmitted to the university admissions committee. You can track your status real-time in <em>"My Applications"</em>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Official Application Portal</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">Submit University & Grant Application</h2>
            </div>

            {/* Applicant summary */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-white">{userProfile.name}</span>
                <p className="text-slate-500 dark:text-slate-400">{userProfile.email} | GPA: {userProfile.gpa}</p>
              </div>
              <span className="bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Verified Student
              </span>
            </div>

            {/* Target University Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target University</label>
              <select
                value={selectedUniId}
                onChange={(e) => {
                  setSelectedUniId(e.target.value);
                  setSelectedProgName('');
                  setSelectedSchName('');
                }}
                className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                {universities.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.country})</option>
                ))}
              </select>
            </div>

            {/* Degree Program */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Degree Program</label>
              <select
                value={selectedProgName}
                onChange={(e) => setSelectedProgName(e.target.value)}
                className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Degree Program...</option>
                {uniProgs.map(p => (
                  <option key={p.id} value={p.name}>{p.name} ({p.degree})</option>
                ))}
              </select>
            </div>

            {/* Scholarship */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Scholarship / Financial Support</label>
              <select
                value={selectedSchName}
                onChange={(e) => setSelectedSchName(e.target.value)}
                className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Scholarship (or None)...</option>
                {uniSchs.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.fundingType})</option>
                ))}
              </select>
            </div>

            {/* Document Upload Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Supporting Documents (Transcripts, SOP, LOR)</label>
              
              <div className="space-y-2">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{doc.size}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleSimulatedUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 text-slate-400 dark:text-slate-500 mx-auto mb-1" />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">Click or Drag additional documents to upload</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">PDF, DOCX up to 10MB</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
