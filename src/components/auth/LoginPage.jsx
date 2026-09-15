import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Mail, 
  KeyRound, 
  AlertCircle,
  UserPlus,
  LogIn,
  Sun,
  Moon,
  Building2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Upload,
  Send,
  FileText,
  Award,
  DollarSign,
  Globe,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Lock,
  HelpCircle,
  Info
} from 'lucide-react';

export const LoginPage = ({ isModal = false, onClose }) => {
  const { loginUser, registerUser, addUniversityRegistration, taxonomies, theme, toggleTheme } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Basic State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('student'); // 'student' | 'uniAdmin'

  // Wizard state for Uni Admin Registration (Section 7: 6 Steps)
  const [wizardStep, setWizardStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    country: 'United Kingdom',
    city: '',
    website: 'https://www.',
    establishedYear: '2020',
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
    { name: 'MSc Computer Science', degree: "Master's", field: 'Computer Science & AI', duration: '1 Year', tuition: '$25,000 / yr', requirements: 'Bachelor degree in CS with min GPA 3.2' }
  ]);

  const [scholarshipsList, setScholarshipsList] = useState([
    { name: 'Excellence Entrance Scholarship', amount: 'Full Tuition Waiver', fundingType: 'Fully Funded', eligibility: 'Top 5% international applicants', deadline: '2026-11-30', requirements: 'Academic transcripts' }
  ]);

  const [documentsList, setDocumentsList] = useState([
    { name: 'Official_Institutional_Prospectus_2026.pdf', size: '4.2 MB' }
  ]);

  // Alerts
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    const res = await loginUser({ email: loginEmail, password: loginPassword });
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Account not found or incorrect password. Please sign up first.');
    } else {
      if (isModal && onClose) onClose();
    }
  };

  const handleStudentRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const res = await registerUser({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: 'student'
    });
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Registration failed.');
    } else {
      setSuccessMsg('Student account created successfully! You are now logged in.');
      if (isModal && onClose) onClose();
    }
  };

  const handleUniAdminRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName || !regEmail || !regPassword || !basicInfo.name) {
      setErrorMsg('Please complete all required fields including university name.');
      return;
    }

    setLoading(true);

    // 1. Register User Account as uniAdmin
    const res = await registerUser({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: 'uniAdmin'
    });

    if (!res.success) {
      setLoading(false);
      setErrorMsg(res.error || 'University admin registration failed.');
      return;
    }

    // 2. Submit 6-Step University Submission Wizard to Super Admin queue
    await addUniversityRegistration({
      basicInfo: {
        ...basicInfo,
        contactPerson: regName,
        contactEmail: regEmail
      },
      about: aboutInfo,
      programs: programsList,
      scholarships: scholarshipsList,
      documents: documentsList
    });

    setLoading(false);
    setSuccessMsg(`University Admin Account & Registration for "${basicInfo.name}" submitted! Super Admin review is now Pending.`);
    setMode('login');
    setLoginEmail(regEmail);
    setLoginPassword('');
  };

  const containerClasses = isModal
    ? "bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row relative transition-all"
    : "min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-200";

  const stepTitles = ["Basic Info", "About", "Programs", "Scholarships", "Documents", "Finalize"];

  return (
    <div className={containerClasses}>
      <div className={`bg-white dark:bg-slate-900 rounded-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row relative transition-all ${
        mode === 'signup' && regRole === 'uniAdmin' ? 'max-w-6xl' : 'max-w-5xl'
      }`}>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Left 45%: Brand, Purpose & Detailed Portal Info */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-y-auto max-h-[90vh] shrink-0 border-b md:border-b-0 md:border-r border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner shrink-0">
                <GraduationCap className="w-6 h-6 text-indigo-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-300 block">Official Academic Portal</span>
                <h3 className="text-base font-bold text-white font-heading">Global Scholar Network</h3>
              </div>
            </div>

            {/* Purpose & Description */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-semibold backdrop-blur-md border border-white/20">
                <Sparkles className="w-3 h-3" />
                Global Higher Education Platform
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading leading-tight text-white">
                Connecting Students, Universities & Grants Worldwide
              </h2>
              <p className="text-[11px] sm:text-xs text-indigo-100/90 leading-relaxed pt-0.5">
                A unified higher-education portal designed to eliminate financial barriers. Discover thousands of fully-funded scholarships, compare accredited universities, track admissions real-time, and manage institutional profiles.
              </p>
            </div>

            {/* Platform Stats Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                <div className="flex items-center gap-1.5 text-indigo-300">
                  <Building2 className="w-3.5 h-3.5 text-indigo-300" />
                  <span className="text-[9px] font-bold uppercase">Universities</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">500+ Listed</p>
                <p className="text-[9px] text-indigo-200">Accredited Campuses</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                <div className="flex items-center gap-1.5 text-indigo-300">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[9px] font-bold uppercase">Active Grants</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">1,200+ Grants</p>
                <p className="text-[9px] text-indigo-200">Full & Partial Waivers</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                <div className="flex items-center gap-1.5 text-indigo-300">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-[9px] font-bold uppercase">Funding Pool</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">$120M+ Value</p>
                <p className="text-[9px] text-indigo-200">Tuition & Stipends</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                <div className="flex items-center gap-1.5 text-indigo-300">
                  <Globe className="w-3.5 h-3.5 text-purple-300" />
                  <span className="text-[9px] font-bold uppercase">Countries</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">45+ Nations</p>
                <p className="text-[9px] text-indigo-200">Global Study Access</p>
              </div>
            </div>

            {/* Detailed Platform Roles & Capabilities */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300 block">Who Can Use This Platform</span>
              
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
                    For International Students
                  </span>
                  <p className="text-indigo-200 text-[10px] leading-relaxed">
                    Search 1,200+ grants, use AI match scores, compare universities side-by-side, bookmark favorites, and track application progress live.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-300" />
                    For University Administrators
                  </span>
                  <p className="text-indigo-200 text-[10px] leading-relaxed">
                    Onboard via a 6-step wizard, publish degree programs & funding, review applicant documents, and connect with prospective students.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works 3-Step Guide */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300 block">3-Step Quick Start</span>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                  <span className="font-extrabold text-amber-300 block text-xs">1. Register</span>
                  <span className="text-indigo-200 text-[9px]">Student or Uni</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                  <span className="font-extrabold text-indigo-300 block text-xs">2. Discover</span>
                  <span className="text-indigo-200 text-[9px]">Match & Compare</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                  <span className="font-extrabold text-emerald-300 block text-xs">3. Apply</span>
                  <span className="text-indigo-200 text-[9px]">Track Live Status</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Notice & Features List */}
          <div className="relative z-10 pt-4 mt-4 border-t border-white/10 space-y-2 text-[11px] text-indigo-200 font-medium">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span><strong>Session Security:</strong> Credentials required on every session for transcript privacy.</span>
            </div>
          </div>
        </div>

        {/* Right 55%: Auth Form Card */}
        <div className="w-full md:w-[55%] p-6 sm:p-10 bg-white dark:bg-slate-900 flex flex-col justify-center space-y-5 overflow-y-auto max-h-[90vh]">
          
          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>

            <button
              onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Sign Up / Register
            </button>
          </div>

          {/* Header titles */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-heading">
              {mode === 'login' ? 'Account Sign In 👋' : 'Create New Account 🚀'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {mode === 'login' 
                ? 'Enter your registered credentials to sign in.' 
                : 'Register a new student account or submit your institution via the 6-Step Wizard.'}
            </p>
          </div>

          {/* Status Alerts */}
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Sign In Mode */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    placeholder="Enter your email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In to Access'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Sign Up / Register Mode */}
          {mode === 'signup' && (
            <div className="space-y-4">
              {/* Account Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Registration Type</label>
                <select
                  value={regRole}
                  onChange={(e) => {
                    setRegRole(e.target.value);
                    setWizardStep(1);
                  }}
                  className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-400"
                >
                  <option value="student">Student Account Registration</option>
                  <option value="uniAdmin">University / Government Administrator Registration (Includes 6-Step Info Submission Wizard)</option>
                </select>
              </div>

              {/* Student Sign Up Form */}
              {regRole === 'student' && (
                <form onSubmit={handleStudentRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="e.g. Sarah Jenkins"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      autoComplete="off"
                      placeholder="e.g. sarah.jenkins@student.edu"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Create password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 mt-3"
                  >
                    {loading ? 'Registering Account...' : 'Complete Student Sign Up'}
                    <UserPlus className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* University Admin 6-Step Submission Wizard */}
              {regRole === 'uniAdmin' && (
                <div className="space-y-4">
                  {/* Stepper Dots */}
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400">
                      University Wizard: Step {wizardStep} of 6
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {stepTitles[wizardStep - 1]}
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    {stepTitles.map((title, idx) => {
                      const stepNum = idx + 1;
                      const isDone = wizardStep > stepNum;
                      const isCurrent = wizardStep === stepNum;
                      return (
                        <div key={idx} className="h-1.5 rounded-full transition-all bg-slate-200 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              isDone ? 'bg-emerald-500' : isCurrent ? 'bg-blue-600' : 'bg-transparent'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Wizard Step 1 */}
                  {wizardStep === 1 && (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Full Name *</label>
                          <input
                            type="text"
                            required
                            autoComplete="off"
                            placeholder="e.g. Dr. Eleanor Vance"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full h-9 px-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Email *</label>
                          <input
                            type="email"
                            required
                            autoComplete="off"
                            placeholder="eleanor.vance@ox.ac.uk"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full h-9 px-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Account Password *</label>
                        <input
                          type="password"
                          required
                          autoComplete="new-password"
                          placeholder="Choose password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="w-full h-9 px-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">University Name *</label>
                        <input
                          type="text"
                          required
                          autoComplete="off"
                          placeholder="e.g. Imperial College London"
                          value={basicInfo.name}
                          onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                          className="w-full h-9 px-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Country</label>
                          <select
                            value={basicInfo.country}
                            onChange={(e) => setBasicInfo({ ...basicInfo, country: e.target.value })}
                            className="w-full h-9 px-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          >
                            {taxonomies.countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">City</label>
                          <input
                            type="text"
                            placeholder="e.g. London"
                            value={basicInfo.city}
                            onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })}
                            className="w-full h-9 px-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wizard Step 2 */}
                  {wizardStep === 2 && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">About / Overview Description *</label>
                        <textarea
                          rows={3}
                          placeholder="Overview of institutional academic mission and stature..."
                          value={aboutInfo.description}
                          onChange={(e) => setAboutInfo({ ...aboutInfo, description: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Campus Environment</label>
                        <textarea
                          rows={2}
                          placeholder="Campus details, facilities, libraries..."
                          value={aboutInfo.campusInfo}
                          onChange={(e) => setAboutInfo({ ...aboutInfo, campusInfo: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Wizard Step 3 */}
                  {wizardStep === 3 && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">Degree Programs Offered</span>
                        <button
                          type="button"
                          onClick={() => setProgramsList([...programsList, { name: '', degree: "Master's", field: 'Computer Science & AI', duration: '1 Year', tuition: '', requirements: '' }])}
                          className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Program
                        </button>
                      </div>
                      {programsList.map((p, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                          <input
                            type="text"
                            placeholder="Program Name (e.g. MSc Data Science)"
                            value={p.name}
                            onChange={(e) => {
                              const updated = [...programsList];
                              updated[idx].name = e.target.value;
                              setProgramsList(updated);
                            }}
                            className="w-full h-8 px-2.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Wizard Step 4 */}
                  {wizardStep === 4 && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">Scholarships Offered</span>
                        <button
                          type="button"
                          onClick={() => setScholarshipsList([...scholarshipsList, { name: '', amount: '', fundingType: 'Fully Funded', eligibility: '', deadline: '2026-12-31' }])}
                          className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Scholarship
                        </button>
                      </div>
                      {scholarshipsList.map((s, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                          <input
                            type="text"
                            placeholder="Scholarship Name"
                            value={s.name}
                            onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].name = e.target.value;
                              setScholarshipsList(updated);
                            }}
                            className="w-full h-8 px-2.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Wizard Step 5 (Government & University Document Upload) */}
                  {wizardStep === 5 && (
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">Government Accreditation & Official Documents</span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Upload official government charter, university accreditation certificate, tax authorization, or prospectus for verification.
                        </p>
                      </div>

                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {documentsList.map((d, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between">
                            <span className="flex items-center gap-1.5 truncate text-slate-800 dark:text-slate-200 font-medium">
                              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                              {d.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 font-mono">{d.size}</span>
                              <button
                                type="button"
                                onClick={() => setDocumentsList(documentsList.filter((_, i) => i !== idx))}
                                className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                                title="Remove file"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* File Upload Box */}
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative cursor-pointer">
                        <input
                          type="file"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            if (files.length) {
                              const uploaded = files.map(f => ({
                                name: f.name,
                                size: `${(f.size / 1024 / 1024).toFixed(1)} MB`
                              }));
                              setDocumentsList([...documentsList, ...uploaded]);
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">Click or Drag Government Authorization / Accreditation Documents to Upload</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">PDF, DOCX, ZIP up to 15MB</span>
                      </div>
                    </div>
                  )}

                  {/* Wizard Step 6 */}
                  {wizardStep === 6 && (
                    <div className="space-y-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[10px]">Review & Register</span>
                      <p className="text-slate-900 dark:text-white font-bold">{basicInfo.name || 'University'}</p>
                      <p className="text-slate-600 dark:text-slate-400">Admin: {regName} ({regEmail})</p>
                      <p className="text-slate-600 dark:text-slate-400">{basicInfo.city}, {basicInfo.country}</p>
                    </div>
                  )}

                  {/* Stepper Navigation Buttons */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={wizardStep === 1}
                      onClick={() => setWizardStep(s => Math.max(s - 1, 1))}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1 ${
                        wizardStep === 1 ? 'opacity-30 cursor-not-allowed' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Prev
                    </button>

                    {wizardStep < 6 ? (
                      <button
                        type="button"
                        onClick={() => setWizardStep(s => Math.min(s + 1, 6))}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        Next <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleUniAdminRegisterSubmit}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-lg shadow-md flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {loading ? 'Submitting...' : 'Register & Submit Wizard'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
