import React from 'react';
import { useApp } from '../../context/AppContext';

export const AuditLogs = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            System Security & Audit Log Stream
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Immutable chronological register of role switches, university approvals, and administrative mutations.
          </p>
        </div>

        <span className="bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 dark:border-slate-600">
          {auditLogs.length} Records Enrolled
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold">
              <th className="p-4">Timestamp</th>
              <th className="p-4">User Scope</th>
              <th className="p-4">Event Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-4 text-slate-400 dark:text-slate-500 text-[11px] shrink-0">{log.timestamp}</td>
                <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{log.user}</td>
                <td className="p-4 text-slate-700 dark:text-slate-300 font-sans text-xs">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
