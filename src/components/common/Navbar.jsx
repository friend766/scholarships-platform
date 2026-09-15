import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Bell, 
  Bookmark, 
  Scale, 
  LogOut, 
  CheckCircle2,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentRole, 
    activeTab, 
    setActiveTab, 
    favorites, 
    comparisonList, 
    notifications,
    userProfile,
    logoutUser,
    theme,
    toggleTheme
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);

  const roleAccents = {
    student: {
      label: 'Student Portal',
      badgeBg: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      accentColor: '#4338CA'
    },
    uniAdmin: {
      label: 'University Admin',
      badgeBg: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      accentColor: '#1D4ED8'
    },
    superAdmin: {
      label: 'Super Admin',
      badgeBg: 'bg-slate-800 dark:bg-slate-800 text-white border-slate-700 dark:border-slate-600',
      accentColor: '#312E81'
    }
  };

  const currentAccent = roleAccents[currentRole] || roleAccents.student;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-250">
      <div 
        className="h-1 w-full transition-all duration-300" 
        style={{ backgroundColor: currentAccent.accentColor }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-sm font-bold text-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight font-heading">
                Scholarships<span className="text-indigo-600 dark:text-indigo-400">&</span>Uni
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${currentAccent.badgeBg}`}>
                {currentAccent.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Global Education & Grant Directory</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Student Shortcuts */}
          {currentRole === 'student' && (
            <>
              <button
                onClick={() => setActiveTab('compare')}
                className={`relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium ${
                  activeTab === 'compare' ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold' : ''
                }`}
              >
                <Scale className="w-4 h-4" />
                <span className="hidden lg:inline">Compare</span>
                {comparisonList.length > 0 && (
                  <span className="ml-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {comparisonList.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium ${
                  activeTab === 'favorites' ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold' : ''
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden lg:inline">Favorites</span>
                {(favorites.universities.length + favorites.scholarships.length) > 0 && (
                  <span className="ml-1 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {favorites.universities.length + favorites.scholarships.length}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 p-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</h4>
                  <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">Real-time</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications
                    .filter(n => n.recipientRole === currentRole || n.recipientRole === 'all')
                    .map((n) => (
                      <div key={n.id} className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{n.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 p-1.5 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
              {userProfile.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block text-left pr-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-none">{userProfile.name || 'User'}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block capitalize mt-0.5">{currentRole}</span>
            </div>
            <button
              onClick={logoutUser}
              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/80 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
