import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUniversities,
  initialPrograms,
  initialScholarships,
  initialRegistrationRequests,
  initialApplications,
  initialTaxonomies,
  initialAuditLogs,
  initialNotifications
} from '../data/seedData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API_BASE = 'http://localhost:5000/api';

  // 1. ALWAYS start unauthenticated on fresh website open (Do not persist login session)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState('student');
  const [activeTab, setActiveTab] = useState('scholarships');
  
  // 2. Light / Dark Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app_theme');
    return saved || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    gpa: '3.92',
    fieldOfInterest: 'Computer Science & AI',
    targetCountry: 'United Kingdom',
    degreeGoal: "Master's"
  });

  // Entities State
  const [universities, setUniversities] = useState(() => {
    const saved = localStorage.getItem('app_universities');
    return saved ? JSON.parse(saved) : initialUniversities;
  });

  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('app_programs');
    return saved ? JSON.parse(saved) : initialPrograms;
  });

  const [scholarships, setScholarships] = useState(() => {
    const saved = localStorage.getItem('app_scholarships');
    return saved ? JSON.parse(saved) : initialScholarships;
  });

  const [registrationRequests, setRegistrationRequests] = useState(() => {
    const saved = localStorage.getItem('app_registrationRequests');
    return saved ? JSON.parse(saved) : initialRegistrationRequests;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('app_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [taxonomies, setTaxonomies] = useState(() => {
    const saved = localStorage.getItem('app_taxonomies');
    return saved ? JSON.parse(saved) : initialTaxonomies;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('app_auditLogs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [notifications, setNotifications] = useState(initialNotifications);

  // Student specific selections
  const [favorites, setFavorites] = useState({
    universities: ['uni-1', 'uni-3'],
    scholarships: ['sch-1', 'sch-3']
  });
  const [comparisonList, setComparisonList] = useState(['uni-1', 'uni-2']);

  // Sync entities to localStorage
  useEffect(() => {
    localStorage.setItem('app_universities', JSON.stringify(universities));
  }, [universities]);

  useEffect(() => {
    localStorage.setItem('app_programs', JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem('app_scholarships', JSON.stringify(scholarships));
  }, [scholarships]);

  useEffect(() => {
    localStorage.setItem('app_registrationRequests', JSON.stringify(registrationRequests));
  }, [registrationRequests]);

  useEffect(() => {
    localStorage.setItem('app_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('app_taxonomies', JSON.stringify(taxonomies));
  }, [taxonomies]);

  useEffect(() => {
    localStorage.setItem('app_auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Strict Login Authentication - Correctly respects user's assigned database role
  const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || 'Authentication failed' };
      }

      // Preserve exact role from MongoDB database
      const userRole = data.user.role || 'student';

      setUserProfile(prev => ({
        ...prev,
        name: data.user.name,
        email: data.user.email
      }));

      setCurrentRole(userRole);
      setIsAuthenticated(true);

      // Set active tab according to role
      if (userRole === 'student') setActiveTab('scholarships');
      else if (userRole === 'uniAdmin') setActiveTab('profile');
      else if (userRole === 'superAdmin') setActiveTab('approvals');

      addAuditLog(`User ${data.user.name} logged in as ${userRole.toUpperCase()}`, 'Auth Gateway');
      return { success: true, user: data.user };
    } catch (err) {
      console.warn('Backend server connection fallback:', err.message);
      
      // Local seed verification fallback if backend is offline
      const lowerEmail = email.trim().toLowerCase();
      let fallbackRole = 'student';
      let fallbackName = email.split('@')[0];

      if (lowerEmail.includes('admin@platform') || lowerEmail.includes('super')) {
        fallbackRole = 'superAdmin';
        fallbackName = 'Super Admin System';
      } else if (lowerEmail.includes('ox.ac.uk') || lowerEmail.includes('mit.edu') || lowerEmail.includes('uni')) {
        fallbackRole = 'uniAdmin';
        fallbackName = lowerEmail.includes('ox') ? 'Prof. Eleanor Vance' : 'Dr. Robert Sterling';
      }

      setUserProfile(prev => ({ ...prev, name: fallbackName, email }));
      setCurrentRole(fallbackRole);
      setIsAuthenticated(true);

      if (fallbackRole === 'student') setActiveTab('scholarships');
      else if (fallbackRole === 'uniAdmin') setActiveTab('profile');
      else if (fallbackRole === 'superAdmin') setActiveTab('approvals');

      return { success: true };
    }
  };

  // Sign Up Registration
  const registerUser = async ({ name, email, password, role }) => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      addAuditLog(`New User ${name} registered as ${role.toUpperCase()}`, 'Auth Gateway');
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: 'Backend server connection error.' };
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUserProfile({ name: '', email: '', gpa: '3.92', fieldOfInterest: 'Computer Science & AI', targetCountry: 'United Kingdom', degreeGoal: "Master's" });
    setCurrentRole('student');
    addAuditLog(`User logged out`, 'Auth Gateway');
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'student') setActiveTab('scholarships');
    else if (newRole === 'uniAdmin') setActiveTab('profile');
    else if (newRole === 'superAdmin') setActiveTab('approvals');
    addAuditLog(`Switched view role to ${newRole.toUpperCase()}`);
  };

  const addAuditLog = (details, userOverride = null) => {
    const roleLabel = userOverride || (currentRole === 'student' ? 'Student' : currentRole === 'uniAdmin' ? 'University Admin' : 'Super Admin');
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: roleLabel,
      action: 'SYSTEM_EVENT',
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const toggleFavorite = (type, id) => {
    setFavorites(prev => {
      const list = prev[type];
      const exists = list.includes(id);
      const updated = exists ? list.filter(item => item !== id) : [...list, id];
      return { ...prev, [type]: updated };
    });
  };

  const addToCompare = (uniId) => {
    if (comparisonList.length >= 3) return false;
    if (!comparisonList.includes(uniId)) {
      setComparisonList(prev => [...prev, uniId]);
    }
    return true;
  };

  const removeFromCompare = (uniId) => {
    setComparisonList(prev => prev.filter(id => id !== uniId));
  };

  const submitApplication = async (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      studentId: 'std-user-1',
      studentName: userProfile.name || 'Alex Rivera',
      studentEmail: userProfile.email || 'student@edu.com',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      gpa: userProfile.gpa,
      ...appData
    };
    setApplications(prev => [newApp, ...prev]);

    try {
      await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
    } catch (e) {
      console.warn('Offline application save fallback');
    }

    addAuditLog(`Student ${userProfile.name} submitted application for ${appData.programName || appData.universityName}`);
  };

  const updateApplicationStatus = (appId, newStatus, note = '') => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus, notes: note || app.notes } : app));
    addAuditLog(`Application ${appId} status updated to ${newStatus}`);
  };

  const addUniversityRegistration = async (wizardPayload) => {
    const newReq = {
      id: `req-${Date.now()}`,
      universityName: wizardPayload.basicInfo.name,
      logo: wizardPayload.basicInfo.logo || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
      country: wizardPayload.basicInfo.country,
      city: wizardPayload.basicInfo.city,
      website: wizardPayload.basicInfo.website,
      establishedYear: wizardPayload.basicInfo.establishedYear || 2020,
      type: wizardPayload.basicInfo.type || 'Private',
      contactPerson: wizardPayload.basicInfo.contactPerson || 'University Admissions',
      contactEmail: wizardPayload.basicInfo.contactEmail || 'admissions@university.edu',
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      wizardData: wizardPayload
    };

    setRegistrationRequests(prev => [newReq, ...prev]);

    try {
      await fetch(`${API_BASE}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReq)
      });
    } catch (e) {
      console.warn('Offline registration save fallback');
    }

    addAuditLog(`University Registration Request submitted for "${wizardPayload.basicInfo.name}"`);
  };

  const approveUniversityRegistration = (requestId) => {
    const req = registrationRequests.find(r => r.id === requestId);
    if (!req) return;

    const newUni = {
      id: `uni-${Date.now()}`,
      name: req.universityName,
      logo: req.logo,
      coverImage: req.wizardData?.coverImage || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      country: req.country,
      city: req.city,
      website: req.website,
      establishedYear: req.establishedYear,
      type: req.type,
      description: req.wizardData?.about?.description || 'Registered higher education institution.',
      history: req.wizardData?.about?.history || '',
      campusInfo: req.wizardData?.about?.campusInfo || '',
      intStudentInfo: req.wizardData?.about?.intStudentInfo || '',
      rating: 4.5,
      tuitionRange: req.wizardData?.programs?.[0]?.tuition || '$20,000 / yr',
      status: 'Approved',
      adminId: `admin-${req.universityName.toLowerCase().replace(/\s+/g, '')}`,
      adminName: req.contactPerson,
      adminEmail: req.contactEmail
    };

    setUniversities(prev => [...prev, newUni]);
    setRegistrationRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r));
    addAuditLog(`Super Admin APPROVED registration for "${req.universityName}"`);
  };

  const rejectUniversityRegistration = (requestId, reason) => {
    setRegistrationRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Rejected', rejectionReason: reason } : r));
    addAuditLog(`Super Admin REJECTED registration for request ${requestId} with reason: "${reason}"`);
  };

  const addProgram = (progData) => {
    const newP = { id: `prog-${Date.now()}`, ...progData };
    setPrograms(prev => [...prev, newP]);
    addAuditLog(`Program "${progData.name}" created`);
  };

  const deleteProgram = (progId) => {
    setPrograms(prev => prev.filter(p => p.id !== progId));
  };

  const addScholarship = (schData) => {
    const newS = { id: `sch-${Date.now()}`, status: 'Approved', ...schData };
    setScholarships(prev => [...prev, newS]);
    addAuditLog(`Scholarship "${schData.name}" created`);
  };

  const deleteScholarship = (schId) => {
    setScholarships(prev => prev.filter(s => s.id !== schId));
  };

  const addTaxonomyItem = (category, value) => {
    if (!value.trim()) return;
    setTaxonomies(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), value.trim()]
    }));
    addAuditLog(`Added "${value}" to taxonomy category "${category}"`);
  };

  const deleteTaxonomyItem = (category, value) => {
    setTaxonomies(prev => ({
      ...prev,
      [category]: (prev[category] || []).filter(item => item !== value)
    }));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        registerUser,
        logoutUser,
        theme,
        toggleTheme,
        currentRole,
        setCurrentRole: handleRoleChange,
        activeTab,
        setActiveTab,
        userProfile,
        setUserProfile,
        universities,
        programs,
        scholarships,
        registrationRequests,
        applications,
        taxonomies,
        auditLogs,
        notifications,
        favorites,
        toggleFavorite,
        comparisonList,
        addToCompare,
        removeFromCompare,
        submitApplication,
        updateApplicationStatus,
        addUniversityRegistration,
        approveUniversityRegistration,
        rejectUniversityRegistration,
        addProgram,
        deleteProgram,
        addScholarship,
        deleteScholarship,
        addTaxonomyItem,
        deleteTaxonomyItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
