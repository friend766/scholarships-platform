import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { FileCheck, Building2, Calendar, FileText, CheckCircle2, Clock, XCircle, AlertCircle, Download } from 'lucide-react';

export const MyApplications = ({ onOpenApply }) => {
  const { applications } = useApp();

  const handleDownload = (fileName) => {
    const fileBlob = new Blob([`Official Application Document File: ${fileName}\nSubmitted via Global Scholar Network Admissions Portal.`], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'Under Review':
        return <Badge variant="info">Under Review</Badge>;
      case 'Rejected':
        return <Badge variant="error">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending Review</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 rounded-xl">
              <FileCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Application Portal & Status Tracker
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your live university admissions and scholarship funding submissions.
          </p>
        </div>

        <button
          onClick={onOpenApply}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          + Submit New Application
        </button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">REF: #{app.id}</span>
                  {getStatusBadge(app.status)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{app.universityName}</h3>
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                  {app.programName || 'Degree Program'} • {app.scholarshipName || 'No Scholarship Attached'}
                </p>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium sm:text-right">
                <span>Applied Date: <strong className="text-slate-700 dark:text-slate-200">{app.appliedDate}</strong></span>
              </div>
            </div>

            {/* Status Progress Bar */}
            <div className="py-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-indigo-600 dark:text-indigo-400">Step 1: Submitted</span>
                <span className={app.status !== 'Pending' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600'}>Step 2: Under Review</span>
                <span className={app.status === 'Accepted' ? 'text-emerald-600 dark:text-emerald-400' : app.status === 'Rejected' ? 'text-red-600 dark:text-red-400' : 'text-slate-400 dark:text-slate-600'}>
                  Step 3: Final Decision
                </span>
              </div>

              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-600 dark:bg-indigo-500 w-1/3" />
                <div className={`h-full ${app.status !== 'Pending' ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'} w-1/3`} />
                <div className={`h-full ${app.status === 'Accepted' ? 'bg-emerald-500' : app.status === 'Rejected' ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'} w-1/3`} />
              </div>
            </div>

            {/* Notes & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Admissions Notes:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{app.notes || 'Your application documents are safely recorded with the registrar.'}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Attached Files ({app.documents?.length || 0}):</span>
                <div className="space-y-1.5 mt-1">
                  {app.documents?.map((d, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-600 dark:text-slate-300 font-medium">
                      <span className="flex items-center gap-1.5 truncate">
                        <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        {d.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{d.size}</span>
                        <button
                          onClick={() => handleDownload(d.name)}
                          className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-0.5 rounded bg-indigo-100/60 dark:bg-indigo-950/60 transition-colors"
                          title="Download Document"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 transition-colors">
            <FileCheck className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">No Submitted Applications</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Submit your first application to track your admissions journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};
