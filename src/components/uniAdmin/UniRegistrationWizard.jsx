import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Upload, 
  Send,
  FileText,
  AlertCircle
} from 'lucide-react';

export const UniRegistrationWizard = ({ onFinished }) => {
  const { addUniversityRegistration, taxonomies } = useApp();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State corresponding to Section 7 steps
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    country: 'United Kingdom',
    city: '',
    website: 'https://www.',
    establishedYear: '1995',
    type: 'Public Research',
    contactPerson: '',
    contactEmail: ''
  });

  const [aboutInfo, setAboutInfo] = useState({
    description: '',
    history: '',
    campusInfo: '',
    intStudentInfo: ''
  });

  const [programsList, setProgramsList] = useState([
    { name: 'MSc Computer Science', degree: "Master's", field: 'Computer Science & AI', duration: '1 Year', tuition: '$25,000 / yr', requirements: 'Bachelor in CS with min GPA 3.2' }
  ]);

  const [scholarshipsList, setScholarshipsList] = useState([
    { name: 'Excellence Entrance Scholarship', amount: 'Full Tuition Waiver', fundingType: 'Fully Funded', eligibility: 'Top 5% international applicants', deadline: '2026-11-30', requirements: 'Academic transcript & recommendation letters' }
  ]);

  const [documentsList, setDocumentsList] = useState([
    { name: 'Official_Institutional_Prospectus_2026.pdf', size: '4.2 MB' }
  ]);

  const handleAddProgram = () => {
    setProgramsList([
      ...programsList,
      { name: '', degree: "Master's", field: 'Engineering & Tech', duration: '2 Years', tuition: '', requirements: '' }
    ]);
  };

  const handleRemoveProgram = (idx) => {
    setProgramsList(programsList.filter((_, i) => i !== idx));
  };

  const handleAddScholarship = () => {
    setScholarshipsList([
      ...scholarshipsList,
      { name: '', amount: '', fundingType: 'Fully Funded', eligibility: '', deadline: '2026-12-31', requirements: '' }
    ]);
  };

  const handleRemoveScholarship = (idx) => {
    setScholarshipsList(scholarshipsList.filter((_, i) => i !== idx));
  };

  const handleSubmitAll = (e) => {
    e.preventDefault();
    addUniversityRegistration({
      basicInfo,
      about: aboutInfo,
      programs: programsList,
      scholarships: scholarshipsList,
      documents: documentsList
    });
    setSubmitted(true);
  };

  const stepTitles = [
    'Basic Information',
    'About University',
    'Degree Programs',
    'Scholarships',
    'Documents',
    'Review & Submit'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Step Stepper Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
              University Submission Wizard
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 font-heading mt-1">
              Section 7: University Information Registration
            </h1>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Step {step} of 6
          </span>
        </div>

        {/* Stepper Dots */}
        <div className="grid grid-cols-6 gap-2">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <div key={idx} className="space-y-1">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isDone ? 'bg-emerald-500' : isCurrent ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
                <span className={`text-[10px] font-bold block truncate ${isCurrent ? 'text-blue-700' : 'text-slate-400'}`}>
                  {stepNum}. {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Body */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              Submission Sent to Super Admin!
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your university registration profile for <strong>{basicInfo.name}</strong> has been placed into the Super Admin approval workflow in status <code>Pending</code>.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  onFinished && onFinished();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 1: Basic University Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">University Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Imperial College London"
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country *</label>
                    <select
                      value={basicInfo.country}
                      onChange={(e) => setBasicInfo({ ...basicInfo, country: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                      {taxonomies.countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      placeholder="e.g. London"
                      value={basicInfo.city}
                      onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Website URL</label>
                    <input
                      type="text"
                      value={basicInfo.website}
                      onChange={(e) => setBasicInfo({ ...basicInfo, website: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Established Year</label>
                    <input
                      type="number"
                      value={basicInfo.establishedYear}
                      onChange={(e) => setBasicInfo({ ...basicInfo, establishedYear: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">University Type</label>
                    <select
                      value={basicInfo.type}
                      onChange={(e) => setBasicInfo({ ...basicInfo, type: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                      <option value="Public Research">Public Research</option>
                      <option value="Private Research">Private Research</option>
                      <option value="Public Technical">Public Technical</option>
                      <option value="Autonomous Research">Autonomous Research</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      placeholder="admissions@university.edu"
                      value={basicInfo.contactEmail}
                      onChange={(e) => setBasicInfo({ ...basicInfo, contactEmail: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: About University */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 2: About University</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Institutional Description *</label>
                    <textarea
                      rows={3}
                      placeholder="Provide an overview of academic stature, campus life, and mission..."
                      value={aboutInfo.description}
                      onChange={(e) => setAboutInfo({ ...aboutInfo, description: e.target.value })}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">History & Heritage</label>
                    <textarea
                      rows={2}
                      placeholder="Brief historical highlights and founding details..."
                      value={aboutInfo.history}
                      onChange={(e) => setAboutInfo({ ...aboutInfo, history: e.target.value })}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Campus Information</label>
                    <textarea
                      rows={2}
                      placeholder="Location, facilities, libraries, dormitories..."
                      value={aboutInfo.campusInfo}
                      onChange={(e) => setAboutInfo({ ...aboutInfo, campusInfo: e.target.value })}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">International Student Support & Policies</label>
                    <textarea
                      rows={2}
                      placeholder="Visa support, language support, orientation programs..."
                      value={aboutInfo.intStudentInfo}
                      onChange={(e) => setAboutInfo({ ...aboutInfo, intStudentInfo: e.target.value })}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Programs */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-base font-bold text-slate-900">Step 3: Degree Programs offered</h3>
                  <button
                    onClick={handleAddProgram}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Program
                  </button>
                </div>

                <div className="space-y-4">
                  {programsList.map((prog, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative space-y-3">
                      <button
                        onClick={() => handleRemoveProgram(idx)}
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Program Name *</label>
                          <input
                            type="text"
                            placeholder="e.g. MSc Data Science"
                            value={prog.name}
                            onChange={(e) => {
                              const updated = [...programsList];
                              updated[idx].name = e.target.value;
                              setProgramsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Degree Level</label>
                          <select
                            value={prog.degree}
                            onChange={(e) => {
                              const updated = [...programsList];
                              updated[idx].degree = e.target.value;
                              setProgramsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          >
                            {taxonomies.degreeLevels.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Field of Study</label>
                          <select
                            value={prog.field}
                            onChange={(e) => {
                              const updated = [...programsList];
                              updated[idx].field = e.target.value;
                              setProgramsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          >
                            {taxonomies.fieldsOfStudy.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Duration</label>
                          <input
                            type="text"
                            placeholder="e.g. 2 Years"
                            value={prog.duration}
                            onChange={(e) => {
                              const updated = [...programsList];
                              updated[idx].duration = e.target.value;
                              setProgramsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Tuition Fee</label>
                          <input
                            type="text"
                            placeholder="e.g. $22,000 / yr"
                            value={prog.tuition}
                            onChange={(e) => {
                              const updated = [...programsList];
                              updated[idx].tuition = e.target.value;
                              setProgramsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block font-bold text-slate-700 mb-1">Admission Requirements</label>
                          <input
                            type="text"
                            placeholder="e.g. Minimum GPA 3.3, IELTS 7.0"
                            value={prog.requirements}
                            onChange={(e) => {
                              const updated = [...programsList];
                              updated[idx].requirements = e.target.value;
                              setProgramsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Scholarships */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-base font-bold text-slate-900">Step 4: Scholarships offered</h3>
                  <button
                    onClick={handleAddScholarship}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Scholarship
                  </button>
                </div>

                <div className="space-y-4">
                  {scholarshipsList.map((sch, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative space-y-3">
                      <button
                        onClick={() => handleRemoveScholarship(idx)}
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Scholarship Name *</label>
                          <input
                            type="text"
                            placeholder="e.g. Chancellor’s Global Grant"
                            value={sch.name}
                            onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].name = e.target.value;
                              setScholarshipsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Funding Type</label>
                          <select
                            value={sch.fundingType}
                            onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].fundingType = e.target.value;
                              setScholarshipsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          >
                            {taxonomies.fundingTypes.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Funding Amount</label>
                          <input
                            type="text"
                            placeholder="e.g. Full Tuition + $15k Stipend"
                            value={sch.amount}
                            onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].amount = e.target.value;
                              setScholarshipsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Deadline</label>
                          <input
                            type="date"
                            value={sch.deadline}
                            onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].deadline = e.target.value;
                              setScholarshipsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                          <input
                            type="text"
                            placeholder="e.g. Open to international graduate students"
                            value={sch.eligibility}
                            onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].eligibility = e.target.value;
                              setScholarshipsList(updated);
                            }}
                            className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Documents */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 5: Prospectus & Official Documents</h3>
                <p className="text-xs text-slate-500">Upload official accreditation documents, brochures, or PDF prospectuses.</p>

                <div className="space-y-2">
                  {documentsList.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-slate-800">{doc.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{doc.size}</span>
                    </div>
                  ))}
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs font-bold text-blue-600 block">Click to upload prospectus files</span>
                  <span className="text-[10px] text-slate-400">PDF, ZIP up to 25MB</span>
                </div>
              </div>
            )}

            {/* Step 6: Review & Submit */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="border-b pb-2">
                  <h3 className="text-base font-bold text-slate-900">Step 6: Review All Information & Submit</h3>
                  <p className="text-xs text-slate-500">Verify your entered institutional details prior to sending to Super Admin approval queue.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">1. Basic Summary</span>
                    <p className="text-sm font-bold text-slate-900">{basicInfo.name || 'Untitled University'}</p>
                    <p className="text-slate-600">{basicInfo.city}, {basicInfo.country} • Est. {basicInfo.establishedYear} • {basicInfo.type}</p>
                    <p className="text-slate-500">Website: {basicInfo.website}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">2. Programs ({programsList.length})</span>
                    {programsList.map((p, i) => (
                      <div key={i} className="text-slate-700">
                        • <strong>{p.name}</strong> ({p.degree}) - {p.tuition}
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">3. Scholarships ({scholarshipsList.length})</span>
                    {scholarshipsList.map((s, i) => (
                      <div key={i} className="text-slate-700">
                        • <strong>{s.name}</strong> ({s.fundingType}) - {s.amount}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep(s => Math.max(s - 1, 1))}
                className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors ${
                  step === 1 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>

              {step < 6 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => Math.min(s + 1, 6))}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs flex items-center gap-1 transition-colors"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAll}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Submit for Super Admin Approval
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
