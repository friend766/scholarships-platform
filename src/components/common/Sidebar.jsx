import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Building,
  Scale,
  Bookmark,
  FileCheck,
  Calendar,
  Sparkles,
  GraduationCap,
  Award,
  Users,
  Layers,
  BarChart3,
  Shield,
  Clock,
  FolderOpen
} from 'lucide-react';

export const Sidebar = () => {
  const { currentRole, activeTab, setActiveTab, registrationRequests } = useApp();

  const pendingRequestsCount = registrationRequests.filter(r => r.status === 'Pending').length;

  const studentNav = [
    { id: 'scholarships', label: 'Scholarship Discovery', icon: Search },
    { id: 'universities', label: 'University Discovery', icon: Building },
    { id: 'compare', label: 'Compare Universities', icon: Scale },
    { id: 'favorites', label: 'Saved Favorites', icon: Bookmark },
    { id: 'applications', label: 'My Applications', icon: FileCheck },
    { id: 'deadlines', label: 'Deadline Tracker', icon: Calendar },
    { id: 'recommendations', label: 'AI Match & Recs', icon: Sparkles }
  ];

  // University Admin nav without wizard (wizard is now on Sign Up page)
  const uniAdminNav = [
    { id: 'profile', label: 'University Profile', icon: Building },
    { id: 'programs', label: 'Degree Programs', icon: GraduationCap },
    { id: 'scholarships', label: 'Scholarships Offered', icon: Award },
    { id: 'applications', label: 'Student Applications', icon: FileCheck },
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'documents', label: 'Documents Hub', icon: FolderOpen }
  ];

  const superAdminNav = [
    { 
      id: 'approvals', 
      label: 'University Approvals', 
      icon: Clock,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null
    },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'scholarships', label: 'Global Scholarships', icon: Award },
    { id: 'taxonomy', label: 'Taxonomy & Categories', icon: Layers },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
    { id: 'logs', label: 'Security & Audit Logs', icon: Shield }
  ];

  const navItems = 
    currentRole === 'student' ? studentNav :
    currentRole === 'uniAdmin' ? uniAdminNav :
    superAdminNav;

  const roleTheme = {
    student: {
      activeBg: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border-r-4 border-indigo-600',
      hoverBg: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    uniAdmin: {
      activeBg: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border-r-4 border-blue-600',
      hoverBg: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    superAdmin: {
      activeBg: 'bg-slate-900 dark:bg-slate-800 text-white font-bold border-r-4 border-slate-700',
      hoverBg: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
    }
  };

  const theme = roleTheme[currentRole] || roleTheme.student;

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 min-h-[calc(100vh-4.25rem)] hidden md:block transition-colors duration-200">
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Menu Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${
                isActive ? theme.activeBg : theme.hoverBg
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? '' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
