import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { FileCheck, CheckCircle2, XCircle, Clock, FileText, User, Download } from 'lucide-react';

export const ApplicationsReview = () => {
  const { applications, updateApplicationStatus } = useApp();

  const handleDownload = (fileName) => {
    const fileBlob = new Blob([`Official Student Transcript / Document File: ${fileName}\nSubmitted via Global Scholar Network Admissions Portal.`], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            Student Admissions Applications Review
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review applicant documents, evaluate credentials, and grant admission or scholarship status.
          </p>
        </div>

        <span className="bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-xl">
          Total Received: {applications.length}
        </span>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                  {app.studentName?.charAt(0) || 'S'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base font-heading">{app.studentName}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{app.studentEmail} • GPA: <strong className="text-slate-800 dark:text-slate-200">{app.gpa || '3.9'}</strong></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={app.status === 'Accepted' ? 'success' : app.status === 'Rejected' ? 'error' : 'warning'}>
                  {app.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Applied Program</span>
                <p className="font-bold text-slate-900 dark:text-white">{app.programName || 'General Entry'}</p>
                <span className="text-slate-400 uppercase text-[10px] font-bold block pt-1">Target University</span>
                <p className="text-slate-700 dark:text-slate-300">{app.universityName}</p>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1">Attached Student Credentials ({app.documents?.length || 0})</span>
                <div className="space-y-1 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  {app.documents?.map((d, i) => (
                    <div key={i} className="flex items-center justify-between font-medium text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1.5 truncate">
                        <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        {d.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{d.size}</span>
                        <button
                          onClick={() => handleDownload(d.name)}
                          className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 transition-colors"
                          title="Download Student Document"
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

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">Submission Date: {app.appliedDate}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Under Review', 'Currently being reviewed by department panel.')}
                  className="px-3 py-1.5 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 hover:bg-sky-100 rounded-xl text-xs font-bold border border-sky-200 dark:border-sky-800"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Rejected', 'Does not meet current admissions cohort thresholds.')}
                  className="px-3 py-1.5 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 hover:bg-red-100 rounded-xl text-xs font-bold border border-red-200 dark:border-red-800 flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Accepted', 'Congratulations! Admissions offer issued with grant award.')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Accept Student
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
