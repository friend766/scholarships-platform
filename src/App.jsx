import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ScholarshipDiscovery } from './components/student/ScholarshipDiscovery';
import { UniversityDiscovery } from './components/student/UniversityDiscovery';
import { ComparisonTool } from './components/student/ComparisonTool';
import { MyApplications } from './components/student/MyApplications';
import { DeadlineTracker } from './components/student/DeadlineTracker';
import { Recommendations } from './components/student/Recommendations';
import { FavoritesView } from './components/student/FavoritesView';
import { ApplicationModal } from './components/student/ApplicationModal';

import { UniProfileEditor } from './components/uniAdmin/UniProfileEditor';
import { ProgramManager } from './components/uniAdmin/ProgramManager';
import { ScholarshipManager } from './components/uniAdmin/ScholarshipManager';
import { ApplicationsReview } from './components/uniAdmin/ApplicationsReview';
import { StudentDirectory } from './components/uniAdmin/StudentDirectory';
import { DocumentsHub } from './components/uniAdmin/DocumentsHub';

import { UniversityApprovals } from './components/superAdmin/UniversityApprovals';
import { UserManagement } from './components/superAdmin/UserManagement';
import { TaxonomyManagement } from './components/superAdmin/TaxonomyManagement';
import { AnalyticsDashboard } from './components/superAdmin/AnalyticsDashboard';
import { AuditLogs } from './components/superAdmin/AuditLogs';

import { LoginPage } from './components/auth/LoginPage';

const MainContent = () => {
  const { isAuthenticated, currentRole, activeTab, setActiveTab } = useApp();
  const [applyModalData, setApplyModalData] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Require fresh login on site open
  if (!isAuthenticated) {
    return <LoginPage isModal={false} />;
  }

  const handleOpenApply = (initialData = null) => {
    setApplyModalData(initialData);
    setApplyModalOpen(true);
  };

  const renderRoleView = () => {
    if (currentRole === 'student') {
      switch (activeTab) {
        case 'scholarships':
          return <ScholarshipDiscovery onApply={handleOpenApply} />;
        case 'universities':
          return <UniversityDiscovery onApply={handleOpenApply} />;
        case 'compare':
          return <ComparisonTool onSelectTab={setActiveTab} />;
        case 'favorites':
          return <FavoritesView onApply={handleOpenApply} />;
        case 'applications':
          return <MyApplications onOpenApply={() => handleOpenApply()} />;
        case 'deadlines':
          return <DeadlineTracker onApply={handleOpenApply} />;
        case 'recommendations':
          return <Recommendations onApply={handleOpenApply} />;
        default:
          return <ScholarshipDiscovery onApply={handleOpenApply} />;
      }
    } else if (currentRole === 'uniAdmin') {
      switch (activeTab) {
        case 'profile':
          return <UniProfileEditor />;
        case 'programs':
          return <ProgramManager />;
        case 'scholarships':
          return <ScholarshipManager />;
        case 'applications':
          return <ApplicationsReview />;
        case 'students':
          return <StudentDirectory />;
        case 'documents':
          return <DocumentsHub />;
        default:
          return <UniProfileEditor />;
      }
    } else if (currentRole === 'superAdmin') {
      switch (activeTab) {
        case 'approvals':
          return <UniversityApprovals />;
        case 'users':
          return <UserManagement />;
        case 'taxonomy':
          return <TaxonomyManagement />;
        case 'analytics':
          return <AnalyticsDashboard />;
        case 'logs':
          return <AuditLogs />;
        default:
          return <UniversityApprovals />;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
          {renderRoleView()}
        </main>
      </div>

      {applyModalOpen && (
        <ApplicationModal
          initialData={applyModalData}
          onClose={() => setApplyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
