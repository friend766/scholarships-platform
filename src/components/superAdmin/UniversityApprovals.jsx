import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Clock, CheckCircle2, XCircle, Eye, X } from 'lucide-react';

export const UniversityApprovals = () => {
  const { registrationRequests, approveUniversityRegistration, rejectUniversityRegistration } = useApp();
  const [selectedReq, setSelectedReq] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState(null);

  const pendingList = registrationRequests.filter(r => r.status === 'Pending');
  const historyList = registrationRequests.filter(r => r.status !== 'Pending');

  const handleConfirmReject = () => {
    if (rejectTargetId) {
      rejectUniversityRegistration(rejectTargetId, rejectionReason || 'Failed verification checks.');
      setRejectModalOpen(false);
      setRejectionReason('');
      setRejectTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg flex items-center justify-between border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
              Section 3 & 4 Workflow
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading mt-1">
            University Approval & Governance Portal
          </h1>
          <p className="text-xs text-slate-300">
            Review institution registration requests, validate 6-step submission payloads, approve or record rejection reasons.
          </p>
        </div>

        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-center">
          <span className="text-slate-400 font-bold block">Pending Requests</span>
          <span className="text-xl font-extrabold text-amber-400">{pendingList.length}</span>
        </div>
      </div>

      {/* Pending Requests Queue */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 font-heading">
          <Clock className="w-5 h-5 text-amber-500" />
          Pending Approval Requests ({pendingList.length})
        </h3>

        {pendingList.map((req) => (
          <div key={req.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <img src={req.logo} alt={req.universityName} className="w-14 h-14 rounded-2xl border border-slate-200 dark:border-slate-700 object-cover bg-white" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{req.universityName}</h3>
                    <Badge variant="warning">Pending Review</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {req.city}, {req.country} • Est. {req.establishedYear} • Contact: <strong className="text-slate-800 dark:text-slate-200">{req.contactPerson}</strong> ({req.contactEmail})
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono text-slate-400">Submitted: {req.submissionDate}</span>
            </div>

            {/* Wizard Payload Summary Preview */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Submitted Wizard Highlights:</span>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{req.wizardData?.description || 'No description provided.'}</p>
              <div className="flex flex-wrap gap-4 text-slate-700 dark:text-slate-300 pt-1 font-semibold">
                <span>Programs: <strong>{req.wizardData?.programs?.length || 0}</strong></span>
                <span>Scholarships: <strong>{req.wizardData?.scholarships?.length || 0}</strong></span>
                <span>Website: <a href={req.website} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">{req.website}</a></span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedReq(req)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
              >
                <Eye className="w-4 h-4" /> Inspect Full 6-Step Submission
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRejectTargetId(req.id);
                    setRejectModalOpen(true);
                  }}
                  className="bg-red-50 dark:bg-red-950/80 hover:bg-red-100 text-red-700 dark:text-red-300 font-bold text-xs px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Reject Request
                </button>
                <button
                  onClick={() => approveUniversityRegistration(req.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve Institution
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendingList.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 transition-colors">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Pending Requests</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">All university registration submissions have been audited and processed.</p>
          </div>
        )}
      </div>

      {/* Inspection Modal */}
      {selectedReq && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto relative">
            <button onClick={() => setSelectedReq(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Submission Details: {selectedReq.universityName}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Full 6-Step Registration Payload</p>

            <div className="space-y-3 text-xs pt-2">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="block text-slate-800 dark:text-slate-200">Description:</strong>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{selectedReq.wizardData?.description}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="block text-slate-800 dark:text-slate-200">History:</strong>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{selectedReq.wizardData?.history}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="block text-slate-800 dark:text-slate-200">Campus & Int'l Info:</strong>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{selectedReq.wizardData?.campusInfo}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setSelectedReq(null);
                  approveUniversityRegistration(selectedReq.id);
                }}
                className="bg-emerald-600 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs"
              >
                Approve Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Reject University Request</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Reason for Rejection (Recorded for audit)</label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Specify compliance or document deficiency reasons..."
                className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
              <button onClick={() => setRejectModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400">Cancel</button>
              <button onClick={handleConfirmReject} className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-xs">Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
