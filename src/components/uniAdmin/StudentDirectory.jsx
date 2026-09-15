import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Users, Search, Mail, FileText, CheckCircle2, GraduationCap, Filter, Star } from 'lucide-react';

export const StudentDirectory = () => {
  const { applications } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Enriched student roster from applications and seed data
  const studentsList = [
    {
      id: 'std-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@student.edu',
      gpa: '3.92',
      program: 'MSc in Advanced Computer Science',
      status: 'Accepted',
      country: 'United States',
      appliedDate: '2026-08-20',
      documentsCount: 3
    },
    {
      id: 'std-2',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@student.edu',
      gpa: '3.85',
      program: 'MSc Data Engineering and Analytics',
      status: 'Under Review',
      country: 'Canada',
      appliedDate: '2026-08-28',
      documentsCount: 2
    },
    {
      id: 'std-3',
      name: 'Michael Chen',
      email: 'm.chen@stanford.edu',
      gpa: '3.98',
      program: 'Ph.D. in Artificial Intelligence',
      status: 'Accepted',
      country: 'Singapore',
      appliedDate: '2026-09-01',
      documentsCount: 4
    },
    {
      id: 'std-4',
      name: 'Elena Rostova',
      email: 'e.rostova@cam.ac.uk',
      gpa: '3.78',
      program: 'BA in Philosophy, Politics and Economics',
      status: 'Pending',
      country: 'Germany',
      appliedDate: '2026-09-03',
      documentsCount: 2
    }
  ];

  // Include dynamic applications submitted by logged-in users
  applications.forEach((app, idx) => {
    if (!studentsList.some(s => s.email === app.studentEmail)) {
      studentsList.push({
        id: `std-dyn-${idx}`,
        name: app.studentName || 'Student Applicant',
        email: app.studentEmail || 'student@edu.com',
        gpa: app.gpa || '3.9',
        program: app.programName || 'Degree Program',
        status: app.status || 'Pending',
        country: 'International',
        appliedDate: app.appliedDate || '2026-09-05',
        documentsCount: app.documents?.length || 2
      });
    }
  });

  const filteredStudents = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Student & Applicant Directory
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View registered students, review academic credentials, GPAs, and enrollment statuses.
          </p>
        </div>

        <span className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-xl self-start sm:self-auto">
          Enrolled Roster: {filteredStudents.length}
        </span>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name, email, or degree program..."
            className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Under Review">Under Review</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Student Cards Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base font-heading">{student.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      {student.email}
                    </p>
                  </div>
                </div>

                <Badge variant={student.status === 'Accepted' ? 'success' : student.status === 'Under Review' ? 'info' : 'warning'}>
                  {student.status}
                </Badge>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl space-y-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Enrolled/Target Major:</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{student.program}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Academic Cumulative GPA:</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                    {student.gpa} / 4.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Country of Origin:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{student.country}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                {student.documentsCount} Files Attached
              </span>
              <span>Applied: {student.appliedDate}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Students Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search criteria or status filter.</p>
        </div>
      )}
    </div>
  );
};
